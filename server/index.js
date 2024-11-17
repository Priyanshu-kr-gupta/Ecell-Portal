require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser=require("body-parser")
const app = express();
app.use(express.json())  

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

const connectDB = require('./config/dbConnect');

const AuthRouter = require("./router/AuthRouter")
const UserRouter = require("./router/UserRouter")
const PublicRouter = require("./router/PublicRouter")
const AdminRouter = require("./router/AdminRouter")



app.use("/api/Auth",AuthRouter)
app.use("/api/User",UserRouter)
app.use("/api/public",PublicRouter)
app.use("/api/admin",AdminRouter)




// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log('DB connection failed', error);
  });
