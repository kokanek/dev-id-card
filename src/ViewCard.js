import React, { useState, useEffect } from 'react';
import '../node_modules/papercss/dist/paper.min.css';
import './App.css';
import { API } from 'aws-amplify';
import { listCards } from './graphql/queries';
import { useParams } from "react-router-dom";

const logoMapping = {
  Twitter: "logo-twitter",
  Linkedin: "logo-linkedin",
  YouTube: "logo-youtube",
  Blog: "logo-wordpress",
  Portfolio: "briefcase",
  Github: "logo-github"
}

function ViewCard() {
  const [note, setNote] = useState([]);
  let { cardId } = useParams();

  useEffect(() => {
    fetchNoteByEasylink(cardId);
  }, [cardId]);

  async function fetchNoteByEasylink(easyLink) {
    console.log('fetch notes for link: ', easyLink);
    let filter = {
      easyLink: {
        eq: easyLink
      }
    };
    const apiData = await API.graphql({ query: listCards, variables: { filter: filter} });
    console.log('api data fetched: ', apiData);
    setNote(apiData.data.listCards.items && apiData.data.listCards.items[0]);
  }

  return (
    <div className="container">
      <div className="App card">
        {note && <>
          <div className="emoji">
            <ion-icon name="person-circle"></ion-icon>
          </div>
          <h1 style={{marginBottom: 0, marginTop: 12}}>{note.name}</h1>
          <h5 class="text-success" style={{marginTop: 4}}>{note.position}</h5>
          <p style={{marginBottom: 4}}>{note.description}</p>
          <div class="row flex-spaces">
            <p>{note && note.tags && note.tags.map(tag => <kbd style={{margin: 4}}>{tag}</kbd>)}</p>
          </div>
          <div class="grid-container">
            {note && note.Links && note.Links.map(link => 
              <a class="grid-item border row flex-center padding-small background-success" href={link.link} target="_blank" key={link.name}>
                <span style={{marginRight: 12}}><ion-icon name={logoMapping[link.name]}></ion-icon></span><span>{link.name}</span>
              </a>
            )}
          </div>
        </>}
        {!note && <p>There is no note created with that identifier!</p>}      
      </div>
    </div>
  );
}

export default ViewCard;