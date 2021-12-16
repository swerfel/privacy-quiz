
import { Question } from './Question';
import { Answer } from './Answer';

import {socket} from '../util/Sockets'
import { Box, Button, Grid } from '@material-ui/core';



export function YesNoResponse({ question, answer } : {question: Question, answer: Answer}) {
    if (answer && (answer.answer === "yes" || answer.answer === "no"))
      return (<Box>Du hast <b>"{answer.answer === "yes" ? "Ja": "Nein"}"</b> geantwortet.</Box>)
    else if (question.isActive) {
      var onResponse = (response: string) => {
        return () => socket.emit("answer", {id: question.id, answer: response})
      }
      return (
        <Grid container spacing={2}>
          <Grid item><Box>Stimmt die Aussage für dich?:</Box></Grid>
          <Grid item><Button variant="contained" color="primary" onClick={onResponse("yes")}>Ja</Button></Grid>
          <Grid item><Button variant="contained" color="primary" onClick={onResponse("no")}>Nein</Button></Grid>
        </Grid>)
    } else
      return <p>Du hast auf diese Frage nicht geantwortet.</p>;
  }