require('./src/database/connection')
const app = require('./app')
const { envPort } = require('./src/config/config')


function startServer(){
    const port = envPort.port
    app.listen(port,()=>{
        console.log(`server has sucessfully started at ${port}`)
    })
}

startServer()