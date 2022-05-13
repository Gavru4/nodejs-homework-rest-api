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
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  }
};

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  // const contactById = await getContactById(contactId);
  // if (!contactById) {
  //   return res.status(404).json({ status: "Not found" });
  // } else {
  //   const updateContactItem = await updateContact(contactId, {
  //     name,
  //     email,
  //     phone,
  //     favorite,
  //   });
  //   res.status(200).json({ status: "success", updateContactItem });
  // }

  const updateContactItem = await updateContact(contactId, {
    name,
    email,
    phone,
    favorite,
  });
  res.status(200).json({ status: "success", updateContactItem });

  if (!updateContactItem) res.status(404).json({ status: "Not found" });
};

const patchContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  // const contactById = await getContactById(contactId);
  // if (!contactById) {
  //   return res.status(404).json({ status: "Not found" });
  // } else {
  //   const updateContactItem = await updateContact(contactId, {
  //     name,
  //     email,
  //     phone,
  //     favorite,
  //   });
  //   res.status(200).json({ status: "success", updateContactItem });
  // }
  // const contactById = await getContactById(contactId);
  const updateContactItem = await updateContact(contactId, {
    name,
    email,
    phone,
    favorite,
  });
  res.status(200).json({ status: "success", updateContactItem });

  if (!updateContactItem) res.status(404).json({ status: "Not found" });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  // const contactById = await getContactById(contactId);
  // if (!contactById) {
  //   return res.status(404).json({ status: "Not found" });
  // } else {
  //   const updateContactItem = await updateContact(contactId, { favorite });
  //   res.status(200).json({ status: "success", updateContactItem });
  // }

  const updateContactItem = await updateContact(contactId, { favorite });
  res.status(200).json({ status: "success", updateContactItem });

  console.log(updateContactItem);

  if (!updateContactItem) res.status(404).json({ status: "Not found" });
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
