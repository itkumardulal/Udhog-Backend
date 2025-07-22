const { notices } = require("../database/connection");
const uploadToR2 = require("../util/r2Upload");
const addNotice = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  let pdfUrl = null;
  let pdfName = null;

  if (req.file) {
    const result = await uploadToR2(req.file);
    pdfUrl = result.fileUrl;
    pdfName = result.fileName;
  }

  await notices.create({
    title,
    description,
    pdfUrl,
    pdfName,
  });

  return res.status(201).json({ message: "Notice added successfully" });
};

const fetchNotice = async (req, res) => {
  const data = await notices.findAll();
  return res.status(200).json({
    message: "notice fetched successfully",
    data,
  });
};

const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Please provide title and description",
    });
  }

  let pdfUrl = req.body.pdfUrl || null;
  let pdfName = req.body.pdfName || null;

  if (req.file) {
    const result = await uploadToR2(req.file);
    pdfUrl = result.fileUrl;
    pdfName = result.fileName;
  }

  await notices.update(
    {
      title,
      description,
      pdfUrl,
      pdfName,
    },
    {
      where: { id },
    }
  );

  return res.status(200).json({
    message: "Notice updated successfully",
  });
};

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  await notices.destroy({
    where: {
      id,
    },
  });
  return res.status(200).json({
    message: "notice deleted successfully",
  });
};

const fetchSingleNotice = async (req, res) => {
  const { id } = req.params;
  const data = await notices.findByPk(id);

  res.status(200).json({
    message: "single notice fetched successfully",
    data,
  });
};
module.exports = {
  addNotice,
  fetchNotice,
  updateNotice,
  deleteNotice,
  fetchSingleNotice,
};
