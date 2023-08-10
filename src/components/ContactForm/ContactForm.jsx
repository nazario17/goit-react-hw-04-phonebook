import React, { useState } from 'react';
import { nanoid } from 'nanoid';

export const ContactForms = ({onSubmit}) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      number: '',
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }))
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    onSubmit(formData);
    resetForm();
  };

  const uniqueId1 = nanoid();

  return (
    <form className="forms" onSubmit={handleSubmitForm}>
      <label htmlFor={uniqueId1}>
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          id={uniqueId1}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor={uniqueId1}>
        Number
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          id={uniqueId1}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};
