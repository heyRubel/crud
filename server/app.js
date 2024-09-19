const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb.js");
const router=require("./routes/router.js")
const cors = require("cors");
dotenv.config();
//connect database
connectDb();
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());
//load router
app.use(router)

app.listen(PORT, () => {
  console.log(`server is running o ${PORT}`);
});
