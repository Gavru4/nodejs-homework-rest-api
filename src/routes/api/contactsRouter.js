const express = require("express");
const router = express.Router();

const {
  getContact,
  getByIdContact,
  postContact,
  deleteContact,
  putContact,
  patchContact,
} = require("../../controllers/postsController");

const {
  addPostValidation,
  patchValidation,
} = require("../../middlewares/validationSchema");

router.get("/", getContact);

router.get("/:contactId", getByIdContact);

router.post("/", addPostValidation, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", addPostValidation, putContact);

router.patch("/:contactId", patchValidation, patchContact);

module.exports = { contactsRouter: router };