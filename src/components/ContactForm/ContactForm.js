import { useState } from 'react';
import s from './ContactForm.module.css';
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/contacts/contacts-selectors.js';
import { addContact } from '../../redux/contacts/contacts-actions';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // const nameInContact = name.toLowerCase().trim();
    const contactAlreadyExists = findExistedName(name);

    if (contactAlreadyExists) {
      alert(`${name} already exists`);
      return;
    }
    dispatch(addContact({ name, number }));

    setName('');
    setNumber('');
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

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId} className={s.label}>
        Name:
        <input
          className={s.fieldInput}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          id={nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label htmlFor={numberInputId} className={s.label}>
        Number:
        <input
          className={s.fieldInput}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          placeholder="+380 (12) 345-67-89"
          id={numberInputId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}
