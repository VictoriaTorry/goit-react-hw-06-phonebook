import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAddingAction } from '../../redux/contacts.slice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const existingName = contacts.map(item => item.name).includes(name);
    const existingNumber = contacts.map(item => item.number).includes(number);

    existingName || existingNumber
      ? alert(`${existingNumber ? number : name} is already in contacts`)
      : dispatch(onAddingAction(newContact));
    onReset();
  };

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
        break;
    }
  };

  const onReset = () => {
    setName('');
    setNumber('');
  };

  const idForLabelName = nanoid();
  const idForLabelNumber = nanoid();

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <label htmlFor={idForLabelName} className={css.label}>
        Name
      </label>
      <input
        id={idForLabelName}
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />
      <label htmlFor={idForLabelNumber} className={css.label}>
        Number
      </label>
      <input
        id={idForLabelNumber}
        className={css.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />
      <button className={css.btn}>Add contact</button>
    </form>
  );
};
