const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully");
  } catch (error) {
    console.log("erroe while connection to database" + error);
  }
};
module.exports = connectDb;

// const mongoose = require("mongoose");

// const connectDb = async () => {
//   try {
//     const result = await mongoose.connect('mongodb://localhost:27017/auth');
//     console.log("database connected successfully");
//   } catch (error) {
//     console.log("erroe while connection to database" + error);
//   }
// };
// module.exports = connectDb;
