const { mongooseConnect } = require("./db/connaction");

const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3005;

const serverConnaction = async () => {
  try {
    await mongooseConnect();
    console.log("Database connection successful");

    app.listen(PORT, (err) => {
      if (err) console.error("Error at server launch:", err);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Error at server launch ${error.message}`);
    process.exit(1);
  }
};

serverConnaction();
