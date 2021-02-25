import React, { useState, useEffect } from 'react';
import '../node_modules/papercss/dist/paper.min.css';
import './App.css';
import { Auth, API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listCards } from './graphql/queries';
import { useHistory } from "react-router-dom";
import { deleteCard as deleteCardMutation } from './graphql/mutations';
import { Link } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    Auth.currentUserInfo()
      .then(userData => {
        console.log('userData: ', userData);
        setUser(userData.id);
        fetchNotes(userData.id);
      })
  }, []);

  async function fetchNotes(id) {
    console.log('fetch notes for id: ', id);
    let filter = {
      userId: {
        eq: id
      }
    };
    const apiData = await API.graphql({ query: listCards, variables: { filter: filter} });
    console.log('api data fetched: ', apiData);
    setNotes(apiData.data.listCards.items);
  }

  async function createCard() {
    history.push('/create');
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteCardMutation, variables: { input: { id } }});
  }

  return (
    <div className="container">
      <div className="App card">
        <div className="emoji"><ion-icon name="heart-outline"></ion-icon></div>
        <h1>My Paper Card</h1>
        <button onClick={createCard} style={{marginBottom: 30, marginTop: 30}} className="btn-success">Create Card<ion-icon name="add-circle-outline" ></ion-icon></button>
        {notes.length !== 0 && <div >
          <p>Cards created by you: </p>
          {
            notes.map(note => (
              <div key={note.id || note.name} className="cardListItem">
                <h2 style={{marginBottom: 12, marginTop: 12}}>{note.name}</h2>
                <p>{note.description}</p>
                <Link to={`/view/${note.id}`}>
                  <button className="btn-primary">View Card</button>
                </Link>
                
              </div>
            ))
          }
        </div>}
        {notes.length === 0 && <p>You do not have any cards created</p>}
        
        <hr />
        <div class="row flex-right child-borders">
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