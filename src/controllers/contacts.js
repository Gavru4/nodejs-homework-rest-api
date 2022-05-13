const { catchErrors } = require("../middlewares/cathErrors");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContact = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  }
  res.status(200).json(contactById);
};

const postContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  const newContact = await addContact(name, email, phone, favorite);

  res.status(201).json({ status: "success", newContact });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const delcontactById = await removeContact(contactId);

  if (!delcontactById) {
    return res.status(404).json({ status: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;

  const updateContactItem = await updateContact(contactId, {
    name,
    email,
    phone,
    favorite,
  });
  if (!updateContactItem) {
    return res.status(404).json({ status: "Not found" });
  }
  res.status(200).json({ status: "success", updateContactItem });
};

const patchContact = catchErrors(async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;

  const updateContactItem = await updateContact(contactId, {
    name,
    email,
    phone,
    favorite,
  });
  if (!updateContactItem) {
    return res.status(404).json({ status: "Not found" });
  }
  res.status(200).json({ status: "success", updateContactItem });
});

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updateContactItem = await updateContact(contactId, { favorite });

  if (!updateContactItem) {
    return res.status(404).json({ status: "Not found" });
  }

  res.status(200).json({ status: "success", updateContactItem });
};

module.exports = {
  getContact,
  getByIdContact,
  postContact,
  deleteContact,
  patchContact,
  putContact,
  updateStatusContact,
};
