import { configureStore } from '@reduxjs/toolkit';
import { contacts } from './contacts/contacts-reducers';
import { filter } from './contacts/contacts-reducers';

export const store = configureStore({
  reducer: {
    contacts,
    filter,
  },
});
