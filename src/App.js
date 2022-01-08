import { useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Section from './components/Section';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from './redux/contacts/contacts-selectors';
import { getContacts } from './redux/contacts/contacts-selectors';
import {
  addContact,
  deleteContact,
  localstorageContacts,
} from './redux/contacts/contacts-actions';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  useEffect(() => {
    const contactsInStorage = localStorage.getItem('contacts');

    if (contactsInStorage) {
      dispatch(localstorageContacts(JSON.parse(contactsInStorage)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    const contactAlreadyExists = findExistedName(name);

    if (contactAlreadyExists === false) {
      dispatch(addContact({ name, number }));
    } else {
      alert(`${name} already exists`);
    }
  };

  const findExistedName = name => {
    let existedName = false;
    for (let i = 0; i < contacts.length; i += 1) {
      const normalizeContactsName = contacts[i].name.toLowerCase();
      const normalizeName = name.toLowerCase();
      if (normalizeContactsName === normalizeName) {
        return (existedName = true);
      } else {
        existedName = false;
      }
    }
    return existedName;
  };

  const deleteContacts = contactId => {
    dispatch(deleteContact({ contactId }));
  };

  const searchContactByName = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  const concurrentContact = searchContactByName();

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContacts}></ContactForm>
      </Section>
      <Section title="Contacts">
        <Filter />
        <ContactList
          contacts={concurrentContact}
          onDeleteContact={deleteContacts}
        ></ContactList>
      </Section>
    </>
  );
}
