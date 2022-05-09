const mongoose = require("mongoose");

// main().catch((err) => console.log(err));

async function mongooseConnect() {
  return mongoose.connect(process.env.MONGODB_URL);
}

module.exports = { mongooseConnect };
