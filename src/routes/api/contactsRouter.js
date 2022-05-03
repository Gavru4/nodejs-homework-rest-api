const express = require("express");
const router = express.Router();

// const {
//   getContact,
//   getByIdContact,
//   postContact,
//   deleteContact,
//   putContact,
//   patchContact,
// } = require("../../controllers/postsController");

// router.get("/", getContact);

// router.get("/:contactId", getByIdContact);

// router.post("/", addPostValidation, postContact);

// router.delete("/:contactId", deleteContact);

// router.put("/:contactId", addPostValidation, putContact);

// router.patch("/:contactId", patchValidation, patchContact);

// module.exports = { contactsRouter: router };

const {
  addPostValidation,
  patchValidation,
} = require("../../middlewares/validationSchema");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res) => {
  const contacts = await listContacts();

  res.json(contacts);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  }
  res.status(200).json(contactById);
});

router.post("/", addPostValidation, async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  res.status(201).json({ status: "success", newContact });
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  }
});

router.put("/:contactId", addPostValidation, async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
    });
    res.status(200).json({ status: "success", updateContactItem });
  }
});

router.patch("/:contactId", patchValidation, async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
    });
    res.status(200).json({ status: "success", updateContactItem });
  }
});
module.exports = router;
