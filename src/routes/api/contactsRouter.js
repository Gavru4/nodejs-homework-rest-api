const express = require("express");
const router = express.Router();

const {
  getContact,
  getByIdContact,
  postContact,
  deleteContact,
  putContact,
  patchContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const {
  addPostValidation,
  patchValidation,
  patchStatusValidation,
} = require("../../middlewares/validationSchema");

router.get("/", getContact);

router.get("/:contactId", getByIdContact);

router.post("/", addPostValidation, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", addPostValidation, putContact);

router.patch("/:contactId", patchValidation, patchContact);

router.patch(
  "/:contactId/favorite",
  patchStatusValidation,
  updateStatusContact
);

module.exports = { contactsRouter: router };
