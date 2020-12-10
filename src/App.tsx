import React from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';
import Header from './Header';
import NameView from './personal/NameView';
import QuestionsList from './questions/QuestionsList';
import AdminControls from './admin/AdminControls';
import HallOfFame from './scoring/HallOfFame';

function App() {
  return (
    <Container  className="App">
      <Row>
        <Col><Header/></Col>
      </Row>
      <Row>
        <Col><NameView/></Col>
      </Row>
      <Row>
        <Col><AdminControls/></Col>
      </Row>
      <Row>
        <Col sm={8}><QuestionsList/></Col>
        <Col sm={4}><HallOfFame/></Col>
      </Row>
    </Container>
  );
}

export default App;
