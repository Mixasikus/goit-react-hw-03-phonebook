import { ContactsListItem } from './PhoneBook.module';
import PropTypes from 'prop-types';

export default function ContactsArray({ name, number, id, onDeleteContact }) {
  return (
    <>
      <ContactsListItem>
        {name}: {number}
        <button onClick={() => onDeleteContact(id)}>Delete</button>
      </ContactsListItem>
    </>
  );
}

ContactsArray.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
