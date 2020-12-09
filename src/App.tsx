import React from 'react';
import './App.css';
import Header from './Header';
import QuestionsList from './questions/QuestionsList';
import AdminControls from './admin/AdminControls';

function App() {
  return (
    <div className="App">
      <Header/>
      <AdminControls/>
      <QuestionsList/>
    </div>
  );
}

export default App;
