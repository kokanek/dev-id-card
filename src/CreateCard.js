import React, { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '../node_modules/papercss/dist/paper.min.css';
import './App.css';
import { Auth, API } from 'aws-amplify';
import { createCard as createCardMutation } from './graphql/mutations';
import { listCards } from './graphql/queries';
import { useParams } from "react-router-dom";

const initialFormState = { name: '', description: '' }

function CreateCard() {
  const [note, setNote] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [user, setUser] = useState();

  useEffect(() => {
    Auth.currentUserInfo()
      .then(userData => {
        console.log('userData: ', userData);
        setUser(userData.id);
      })
  }, []);

  async function createNote() {
    console.log('reached crete function: ');
    console.log('creting note for user: ', user);
    const cardData = {
      name: 'ComScience Simplified',
      userId: user,
      description: 'Coder by day, content creator by night',
      position: 'Tech Lead',
      tags: ['javascript','react.js', 'node.js', 'angular'],
      Links: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/Kokaneka'
        },
        {
          name: 'Linkedin',
          link: 'https://www.linkedin.com/in/kapeel-kokane-30b81973/'
        },
        {
          name: 'YouTube',
          link: 'https://bit.ly/CsSimpl'
        },
        {
          name: 'Blog',
          link: 'https://dev.to/comscience'
        },
        {
          name: 'Portfolio',
          link: 'http://comscience.now.sh/'
        },
        {
          name: 'Github',
          link: 'http://github.com/kokanek'
        },
      ]
    }
    await API.graphql({ query: createCardMutation, variables: { input: cardData } });
  }

  return (
    <div className="container">
      <div className="App card" style={{padding: 24}}>
        <div className="emoji"><ion-icon name="person"></ion-icon></div>
        <h1 style={{marginBottom: 12, marginTop: 12}}>Create Note</h1>
        <p>Let's create your very own paper card!</p>
        <div className="create-form padding">
          <p class="text-primary">Name</p>
          <input
            style={{width: '60%'}}
            onChange={e => setFormData({ ...formData, 'name': e.target.value})}
            placeholder="Note name"
            value={formData.name}
          />
          <p class="text-primary">Description</p>
          <input
            style={{width: '100%'}}
            onChange={e => setFormData({ ...formData, 'description': e.target.value})}
            placeholder="Note description"
            value={formData.description}
          />
        </div>
             
      </div>
    </div>
  );
}

export default withAuthenticator(CreateCard);