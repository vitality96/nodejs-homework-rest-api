const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error)
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === id);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
      return null;
    }

    const [removeContact] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return removeContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: v4(), ...body };
    contacts.push(newContact);
    await updateContacts(contacts)
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { id, ...body };
    await updateContacts(contacts);
    return contacts[idx];
  } catch (error) {
    console.log(error);
  }
};


const updateContacts = async (contact) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contact));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateContact
}
