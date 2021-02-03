import { useState } from 'react';

import { Question } from './Question';
import { Answer } from './Answer';

import {socket} from '../util/Sockets'
import { Button, Grid, Slider } from '@material-ui/core';

export function EstimationResponse({ question, answer } : {question: Question, answer: Answer}) {
    const [ value, setValue ] = useState(50);

    if (answer && (answer.estimate || answer.estimate === 0))
      return (<p>Du hast geschätzt, dass <b>{answer.estimate}%</b> der MitspielerInnen "Ja" geantwortet haben.</p>)
    else if (question.isActive) {
      var onEstimate = () => socket.emit("estimate", {id: question.id, estimate: value})
      const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number);
      };
      return (
        <>
          <h4 id="estimation-slieder" >
            Was schätzst du, wie viele % der Teilnehmer haben mit 'Ja' geantwortet?
          </h4>
          <Grid container spacing={2}>
            <Grid item xs>
              <Slider value={value} onChange={handleChange} aria-labelledby="estimation-slieder" />
            </Grid>
            <Grid item>
            <Button variant="contained" color="primary" onClick={onEstimate}>Schätzung abgeben ({value}%)</Button>
            </Grid>
          </Grid>
        </>)
    } else
      return <p>Du hast für diese Frage keine Schätzung abgegeben.</p>;
  }