import React, { useState, useEffect } from 'react';
import '../node_modules/papercss/dist/paper.min.css';
import './App.css';
import { API } from 'aws-amplify';
import { listCards } from './graphql/queries';
import { useParams } from "react-router-dom";

function ViewCard() {
  const [note, setNote] = useState([]);
  let { cardId } = useParams();

  useEffect(() => {
    fetchNoteById(cardId);
  }, [cardId]);

  async function fetchNoteById(id) {
    console.log('fetch notes for id: ', id);
    let filter = {
      id: {
        eq: id
      }
    };
    const apiData = await API.graphql({ query: listCards, variables: { filter: filter} });
    console.log('api data fetched: ', apiData);
    setNote(apiData.data.listCards.items && apiData.data.listCards.items[0]);
  }

  return (
    <div className="container">
      <div className="App">
        {note && <>
        <div className="emoji"><ion-icon name="person"></ion-icon></div>
        <h1>{note.name}</h1>
        <p>{note.description}</p>
        {/* <div >
          <div key={note.id || note.name} className="cardListItem">
            <h2 style={{marginBottom: 12, marginTop: 12}}>{note.name}</h2>
            <p>{note.description}</p>
            <button className="btn-primary">View Card</button>
          </div>
        </div> */}
        </>}
        {!note && <p>There is no note created with that identifier!</p>}      
      </div>
    </div>
  );
}

export default ViewCard;