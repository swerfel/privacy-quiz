import React from 'react';

import './App.css';
import Header from './Header';
import NameView from './personal/NameView';
import QuestionsList from './questions/QuestionsList';
import AdminControls from './admin/AdminControls';
import HallOfFame from './scoring/HallOfFame';
import { Container,  Grid } from '@material-ui/core';

function App() {
  return (
    <Container  className="App">
      <Header/>
      <main>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NameView/>
          </Grid>
          <Grid item xs={12}>
            <AdminControls/>
          </Grid>
          <Grid item xs={8}>
            <QuestionsList/>
          </Grid>
          <Grid item xs={4}>
            <HallOfFame/>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default App;
