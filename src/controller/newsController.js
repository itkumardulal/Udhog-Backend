const { news } = require("../database/connection");

const addNews = async (req, res) => {
  const { title, description, imgUrl } = req.body;

  if (!title || !description || !imgUrl || !imgName) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  await news.create({
    title,
    description,
    fileUrl,
    imgName
  });

  return res.status(201).json({
    message: "News added successfully",
  });
};

const fetchNews = async (req, res) => {
  const data = await news.findAll();
  return res.status(200).json({
    message: "News fetched successfully",
    data,
  });
};


const fetchSingleNews = async (req, res) => {
  const { id } = req.params;
  const data = await news.findByPk(id);
  if (!data) {
    return res.status(404).json({ message: "News not found" });
  }
  res.status(200).json({
    message: "Single news fetched successfully",
    data,
  });
};

const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  const [rowsAffected] = await news.update(
    {
      title,
      description,
  
    },
    {
      where: { id },
    }
  );

  if (rowsAffected === 0) {
    return res.status(404).json({ message: "News not found" });
  }

  return res.status(200).json({
    message: "News updated successfully",
  });
};


const deleteNews = async (req, res) => {
  const { id } = req.params;

  const file = await news.findByPk(id);
  if (!file) {
    return res.status(404).json({ message: "News not found" });
  }

  await news.destroy({ where: { id } });

  return res.status(200).json({
    message: "News deleted successfully",
  });
};

module.exports = {
  addNews,
  fetchNews,
  updateNews,
  deleteNews,
  fetchSingleNews,
};
