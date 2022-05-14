const mongoose = require("mongoose");

async function mongooseConnect() {
  return mongoose.connect(process.env.MONGODB_URL);
}

module.exports = { mongooseConnect };
