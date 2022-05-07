const http = require("http");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const { connect } = require('http2')
require("dotenv").config();

const socketServer = require("./socketServer");

const authRoute = require("./routes/authRoute");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");
const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Register the routes
app.use("/api/auth", authRoute);
app.use("/api/friend-invitation", friendInvitationRoutes);
const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is conneted on port number ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log("Mongoose not connected");
    console.log(error);
  });
