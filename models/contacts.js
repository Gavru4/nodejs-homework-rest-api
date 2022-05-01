// const fs = require('fs/promises')

const listContacts = async () => {
  try {
    const data = FsPromises.readFile(contactsPath, "utf-8");
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactsById = JSON.parse(contacts).find(
      (obj) => obj.id === String(contactId)
    );
    return contactsById;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = JSON.parse(contacts).filter(
      (obj) => obj.id !== String(contactId)
    );
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const parseContacts = JSON.parse(contacts);
    const nextIdNumber = Number(parseContacts[parseContacts.length - 1].id) + 1;

    const newContact = {
      id: String(nextIdNumber),
      // name: name,
      // email: email,
      // phone: phone,
    };

    parseContacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(parseContacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

const path = require("path");
const fs = require("fs");
const FsPromises = fs.promises;

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

module.exports = { listContacts, getContactById, removeContact, addContact };
