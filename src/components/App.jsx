import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import '../index.css';
import { ContactForms } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitData = data => {
    const isDuplicateName = contacts.some(contact =>
      contact.name.toLowerCase().includes(data.name.toLowerCase())
    );

    if (isDuplicateName) {
      alert(`${data.name} is alredy to contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, { ...data, id: nanoid() }]);
  };

  const changeFilterData = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const renderFilterContacts = () => {
    const normalized = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalized)
    );
  };

  const deleteContact = deleteContactID => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== deleteContactID)
    );
  };

  return (
    <>
      <div className="wrapper">
        <h1>Phonebook</h1>
        <ContactForms onSubmit={formSubmitData} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilterData} />
        <ContactList
          users={renderFilterContacts()}
          deleteContact={deleteContact}
        />
      </div>
    </>
  );
};

export default App;
