const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");
const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findedContact = contacts.find(
    (contact) => contact.id === `${contactId}`
  );
  if (!findedContact) {
    return null;
  }
  return findedContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContacts = { id: v4(), name, email, phone };
  contacts.push(newContacts);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContacts;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId.toString(), name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
