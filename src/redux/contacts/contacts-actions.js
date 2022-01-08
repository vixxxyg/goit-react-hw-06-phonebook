import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contacts/add');
const deleteContact = createAction('contacts/delete');
const localstorageContacts = createAction('contacts/set');
const changeFilter = createAction('contacts/changeFilter');

export { addContact, deleteContact, localstorageContacts, changeFilter };
