import React, { useState, useEffect } from 'react';
import '../node_modules/papercss/dist/paper.min.css';
import './App.css';
import { Auth, API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listCards } from './graphql/queries';
import { createCard as createCardMutation, deleteCard as deleteCardMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    Auth.currentUserInfo()
      .then(data => console.log('logged in user info', data))
      .catch(err => console.log('error while fetching logged in user', err));

    fetchNotes();
  }, []);

  async function fetchNotes() {
    let filter = {
      name: {
        eq: 'test'
      }
    };
    const apiData = await API.graphql({ query: listCards, variables: { filter: filter} });
    console.log('api data fetched: ', apiData);
    setNotes(apiData.data.listCards.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createCardMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteCardMutation, variables: { input: { id } }});
  }

  return (
    <div className="container">
      <div className="App">
        <div className="emoji"><ion-icon name="heart-outline"></ion-icon><ion-icon name="person"></ion-icon></div>
        <h1>My Paper Card</h1>
        <button onClick={createNote} style={{marginBottom: 30, marginTop: 30}} className="btn-success">Create Card<ion-icon name="add-circle-outline" ></ion-icon></button>
        {notes.length !== 0 && <div >
          <p>Cards created by you: </p>
          {
            notes.map(note => (
              <div key={note.id || note.name} className="cardListItem">
                <h2 style={{marginBottom: 12, marginTop: 12}}>{note.name}</h2>
                <p>{note.description}</p>
                <button onClick={() => deleteNote(note)} className="btn-primary">View Card</button>
              </div>
            ))
          }
        </div>}
        {notes.length === 0 && <p>You do not have any cards created</p>}
        {/* <input
          onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          placeholder="Note name"
          value={formData.name}
        />
        <input
          onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          placeholder="Note description"
          value={formData.description}
        /> */}
        
        <div class="row flex-spaces child-borders">
          <label class="paper-btn margin btn-danger" for="modal-1">Sign Out</label>
        </div>
        <input class="modal-state" id="modal-1" type="checkbox" />
        <div class="modal">
          <label class="modal-bg" for="modal-1"></label>
          <div class="modal-body">
            <label class="btn-close" for="modal-1">X</label>
            <h4 class="modal-title">Sign Out</h4>
            <p class="modal-text">Are you sure you want to sign out?</p>
            <label for="modal-1"><AmplifySignOut/></label>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default withAuthenticator(App);