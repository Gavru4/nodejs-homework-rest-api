const { Contact } = require("../db/contactsModel");

const listContacts = async () => {
  try {
    const data = await Contact.find();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactById = Contact.findById(contactId);
    return await contactById;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const newContacts = Contact.findByIdAndDelete({ _id: contactId });
    return await newContacts;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (name, email, phone, favorite) => {
  try {
    const contact = new Contact({ name, email, phone, favorite });
    return await contact.save();
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;

    const updateContactById = Contact.findByIdAndUpdate(contactId, {
      $set: { name, email, phone },
    });

    return await updateContactById;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
