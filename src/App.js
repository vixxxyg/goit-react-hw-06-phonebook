import { useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Section from './components/Section';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from './redux/contacts/contacts-selectors';
import { getContacts } from './redux/contacts/contacts-selectors';
import { localstorageContacts } from './redux/contacts/contacts-actions';

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
        <ContactForm></ContactForm>
      </Section>
      <Section title="Contacts">
        <Filter />
        <ContactList contacts={concurrentContact}></ContactList>
      </Section>
    </>
  );
}
