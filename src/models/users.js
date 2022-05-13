
const { Users } = require("../db/userModal");
const bcryptjs = required("bcryptjs")

const userSingUp = async ({ email, password, subscription }) => {
  const nevUser = await Users.create({
    email,
    password: await bcryptjs.hach{password, process.env.BCRYPT_SALT_ROUNDS 
    }
  });
};
module.exports = { userSingUp };
