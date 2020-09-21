import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Firebase, { FirebaseContext } from './Components/Firebase';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(


  <React.StrictMode>
    {/* New instance of Firebase with method */}
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')

);

serviceWorker.unregister();
