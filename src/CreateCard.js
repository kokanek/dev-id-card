import React, { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '../node_modules/papercss/dist/paper.min.css';
import './App.css';
import { Auth, API } from 'aws-amplify';
import { listCards } from './graphql/queries';
import { createCard as createCardMutation } from './graphql/mutations';

const logoMapper = {
  Twitter: 'logo-twitter',
  Linkedin: 'logo-linkedin',
  YouTube: 'logo-youtube',
  Blog: 'logo-wordpress',
  Portfolio: 'briefcase-outline',
  Github: 'logo-github',
  Dribbble: 'logo-dribbble',
  Twitch: 'logo-twitch',
}
const initialFormState = { name: '', description: '', easyLink: '', position: '', tags: '' }
const initialLinkState = [
  {
    name: 'Twitter',
    link: ''
  },
  {
    name: 'Linkedin',
    link: ''
  },
  {
    name: 'YouTube',
    link: ''
  },
  {
    name: 'Blog',
    link: ''
  },
  {
    name: 'Portfolio',
    link: ''
  },
  {
    name: 'Github',
    link: ''
  },
  {
    name: 'Dribbble',
    link: ''
  },
  {
    name: 'Twitch',
    link: ''
  },
];

function CreateCard() {
  const [error, setError] = useState(['test']);
  const [formData, setFormData] = useState(initialFormState);
  const [linkData, setLinks] = useState(initialLinkState);
  const [user, setUser] = useState();

  useEffect(() => {
    Auth.currentUserInfo()
      .then(userData => {
        console.log('userData: ', userData);
        setUser(userData.id);
      })
  }, []);

  async function fetchNoteById(id) {
    console.log('fetch notes for id: ', id);
    let filter = {
      id: {
        eq: id
      }
    };
    const apiData = await API.graphql({ query: listCards, variables: { filter: filter} });
    return apiData;
  }

  function onChangeLink(e, itemName, setLinks, linkData) {
    const tempLinkData = [...linkData];
    const item = tempLinkData.find(item => item.name === itemName);
    item.link = e.target.value;
    setLinks(tempLinkData);
  }

  async function createNote() {
    console.log('reached crete function: ', formData, linkData);
    console.log('creting note for user: ', user);
    
    if (formData.name.trim() === '') {
      setError(['username cannot be empty']);
    } else {
      setError([]);
    }
    // await API.graphql({ query: createCardMutation, variables: { input: cardData } });
  }

  return (
    <div className="container">
      <div className="App card" style={{padding: 24}}>
        <div className="emoji"><ion-icon name="add-outline"></ion-icon></div>
        <h1 style={{marginBottom: 12, marginTop: 12}}>Create Card</h1>
        <p style={{marginTop: 4}}>Let's create your very own paper card!</p>
        <div className="create-form padding">
          <p class="text-primary">Easy Link</p>
          <input
            style={{width: '100%'}}
            onChange={e => setFormData({ ...formData, 'easyLink': e.target.value})}
            placeholder="This link will identify your card in the url you share"
            value={formData.easyLink}
          />
          <p class="text-primary">Name</p>
          <input
            style={{width: '60%'}}
            onChange={e => setFormData({ ...formData, 'name': e.target.value})}
            placeholder="Your name"
            value={formData.name}
          />
          <p class="text-primary">Description</p>
          <input
            style={{width: '100%'}}
            onChange={e => setFormData({ ...formData, 'description': e.target.value})}
            placeholder="A short description about yourself"
            value={formData.description}
          />
          <p class="text-primary">Job Title</p>
          <input
            style={{width: '80%'}}
            onChange={e => setFormData({ ...formData, 'position': e.target.value})}
            placeholder="Your job title, e.g. SDE 2"
            value={formData.position}
          />
          <p class="text-primary">Tags</p>
          <input
            style={{width: '90%'}}
            onChange={e => setFormData({ ...formData, 'tags': e.target.value})}
            placeholder="Comma separated tags that you indentify with (max 4)"
            value={formData.tags}
          />
          <div className="separator"></div>

          <p className="text-primary margin">Social Links</p>
          {linkData && linkData.map(item => 
            <div className="row margin flex-spaces flex-middle">
              <ion-icon name={logoMapper[item.name]} size="large"></ion-icon>
              <input
                style={{width: '85%'}}
                onChange={e => 
                  onChangeLink(e, item.name, setLinks, linkData)
                }
                placeholder={item.name}
                value={item.link}
              />
            </div>
          )}  
          
          <div className="row flex-center">
            <button onClick={createNote} style={{marginTop: 30, width: '40%'}} className="btn-success">Create</button> 
          </div> 

          {error.map(err => 
            <div class="alert alert-danger">{err}</div>
          )}
        </div>  
      </div>
    </div>
  );
}

export default withAuthenticator(CreateCard);