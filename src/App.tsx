import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import QuestionsList from './questions/QuestionsList';

function App() {
  return (
    <div className="App">
      <Header/>
      <QuestionsList/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
    </div>
  );
}

export default App;
