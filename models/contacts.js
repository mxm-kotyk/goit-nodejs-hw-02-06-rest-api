import fs from "fs/promises";
import path from "path";
import uniqid from "uniqid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContactsFile = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);
  await updateContactsFile(contacts);
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: uniqid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContactsFile(contacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, name, email, phone };

  await updateContactsFile(contacts);
  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
