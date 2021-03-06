import React from 'react';
import '../node_modules/papercss/dist/paper.min.css';
import './App.css';
import step1 from './images/step1.svg';
import step2 from './images/step2.svg';
import step3 from './images/step3.svg';

import { useHistory } from "react-router-dom";

function LandingPage() {
  const history = useHistory();

  function gotoHome() {
    history.push('/home')
  }
  return (
    <div className="container">
      <div className="App card" style={{paddingLeft: 36, paddingRight: 36}}>
        <div className="emoji">
          <ion-icon name="heart-outline"></ion-icon>
          <ion-icon name="document-outline"></ion-icon>
        </div>
        
        <h1 style={{marginBottom: 4, marginTop: 12}}>Paper Card</h1>
        <h4 style={{marginBottom: 24, marginTop: 4}} className="text-success">Welcome to Paper Card!</h4>
        <p>Paper card let's you create your very own <strong>digital paper card</strong> with all your <strong>social links</strong> in one place in less than 5 minutes</p>
        
        <div className="separator"></div>
        <h3 className="text-primary" style={{marginTop: 4, marginBottom: 12}}>Three easy steps!</h3>
        
        <div className="landing-assets">
          {/* Step 1 */}
          <div style={{alignSelf: 'flex-start'}}>
            <h5 className="text-primary" style={{marginBottom: 24, textAlign: 'left'}}>1. Sign up/Login with your email</h5>
            <img src={step1} alt="sign up or login" style={{width: 300, marginBottom: 24}}/>
          </div>

          {/* Step 2 */}
          <div style={{alignSelf: 'flex-end'}}>
            <h5 className="text-primary" style={{marginBottom: 24, textAlign: 'left'}}>2. Create your card with social links</h5>
            <img src={step2} alt="create card" style={{width: 300, marginBottom: 24}}/>
          </div>

          {/* Step 3 */}
          <div style={{alignSelf: 'flex-start'}}>
            <h5 className="text-primary" style={{marginBottom: 24, textAlign: 'left'}}>3. Share your card with the world!</h5>
            <img src={step3} alt="share card" style={{width: 300, marginBottom: 24}}/>
          </div>
        </div>
        
        <div class="row flex-right child-borders">
          <button onClick={gotoHome} style={{marginBottom: 30, marginTop: 48}} className="btn-success">Let's get started!</button>
        </div>

        <hr />
        <p>Built with 🖤 by <a href="https://twitter.com/Kokaneka" target="_blank"><strong>kokaneka</strong></a>, 
          powered by <a href="https://aws.amazon.com/amplify/" target="_blank"></a><strong>Amplify</strong></p>
        
      </div>
    </div>
  );
}

export default LandingPage;