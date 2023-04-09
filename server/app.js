const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const router = require("./routes");
const { mongoConnect } = require("./config/mongoConnection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// (async () => {
//   try {
//     await mongoConnect();
//     app.listen(port, (_) => console.log(`App is listening at port ${port}`));
//   } catch (err) {
//     console.log(`Failed to connect to mongodb`);
//   }
// })();

const server = app.listen(port, (_) => console.log(`App is listening at port ${port}`));
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to DB Successfull");
    server;
  })
  .catch((err) => {
    console.log(err.message);
  });
