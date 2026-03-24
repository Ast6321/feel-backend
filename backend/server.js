const express= require("express");
const app = express();
const cors =require("cors");
const connectdb = require("./config/db.js");
connectdb();
const routes = require("./routes/routes")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/",routes);

app.listen(8000,()=>{
    console.log("server is running on port 8000")
});

