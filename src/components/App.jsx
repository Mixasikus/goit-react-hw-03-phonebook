import React, { Component } from 'react';
import Form from './PhoneBook/Form';
import Contacts from './PhoneBook/Contacts';
import Filter from './PhoneBook/Filter';
import { nanoid } from 'nanoid';
import { ContainerForm } from './PhoneBook/PhoneBook.module';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const namesArray = this.state.contacts.map(contact => {
      return contact.name;
    });

    if (namesArray.find(person => person === name)) {
      alert('такое уже есть');
    } else {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = this.state.filter.toLowerCase();

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <ContainerForm>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContacts} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <Contacts
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </ContainerForm>
    );
  }
}
