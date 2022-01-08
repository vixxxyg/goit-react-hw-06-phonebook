import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-actions';

const ContactListItem = ({ id, name, number, onDeleteContact }) => {
  const dispatch = useDispatch();
  const deleteContacts = contactId => {
    dispatch(deleteContact({ contactId }));
  };

  return (
    <li>
      <p>
        {name}: {number}
      </p>{' '}
      <button type="button" onClick={() => deleteContacts(id)}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactListItem;
