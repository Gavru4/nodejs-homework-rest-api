const { Contact } = require("../db/contactsModel");

const listContacts = async () => await Contact.find();

const getContactById = async (contactId) => await Contact.findById(contactId);

const removeContact = async (contactId) =>
  await Contact.findByIdAndDelete({ _id: contactId });

const addContact = async (name, email, phone, favorite) => {
  const contact = new Contact({ name, email, phone, favorite });

  return await contact.save();
};
const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const updateContactById = Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });

  return await updateContactById;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
