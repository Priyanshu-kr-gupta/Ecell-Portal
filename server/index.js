const express = require('express')
const cors = require('cors');

const app = express();
app.use(express.json())  
app.use(cors());

const connectToMongo=require('./config/dbConnect')

const AuthRouter = require("./router/AuthRouter")
const UserRouter = require("./router/UserRouter")
const PublicRouter = require("./router/PublicRouter")
const AdminRouter = require("./router/AdminRouter")



app.use("/api/Auth",AuthRouter)
app.use("/api/User",UserRouter)
app.use("/api/Public",PublicRouter)
app.use("/api/Admin",AdminRouter)




const PORT = 5000;
app.listen(PORT,()=>console.log("server is on"));
connectToMongo('mongodb://localhost:27017/eCell-Portal');