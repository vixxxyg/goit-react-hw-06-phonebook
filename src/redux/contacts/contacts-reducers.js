import {
  addContact,
  deleteContact,
  localstorageContacts,
  changeFilter,
} from './contacts-actions';
import { createReducer } from '@reduxjs/toolkit';
import shortid from 'shortid';

export const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

export const contacts = createReducer([], {
  [addContact]: (state, { payload }) => [
    ...state,
    { id: shortid.generate(), name: payload.name, number: payload.number },
  ],
  [localstorageContacts]: (_, { payload }) => payload,
  [deleteContact]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload.contactId),
});
