import { ContactItem } from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { onDeleteAction } from '../../redux/contacts.slice';
import { selectContacts, selectFilter } from '../../redux/selectors';

export const ContactList = () => {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    const filterName = filter.toLowerCase();
    const filtered = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filterName);
    });
    return filtered;
  };

  const filteredContacts = getFilteredContacts();

  const onDelete = contactId => {
    dispatch(onDeleteAction(contactId));
  };

  return (
    <ul className={css.contactList}>
      {filteredContacts?.map(contact => {
        return (
          <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
        );
      })}
    </ul>
  );
};
