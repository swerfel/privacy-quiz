import { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem } from '@material-ui/core';

import { useSubscription, socket } from '../util/Sockets';

import {Score} from './Score';

function ScoreView({score}: {score: Score}) {
  if (score.id === socket.id)  {
    return (<b>{score.playerName}(Du): {score.score}</b>);
  } else {
    return (<>{score.playerName}: {score.score}</>);
  }
}

function HallOfFame() {
  const [scores, setScores] = useState<Score[]>([]);
  useSubscription("scores", setScores);

  return (
    
    <Card>
      <CardContent>
        <h3>
          Bestenliste:
        </h3>
        <List>
        {scores.map(score =>
          <ListItem key={score.id}>
            <ScoreView score={score}/>
          </ListItem>
        )}
        </List>
        <Typography gutterBottom>
          Score: Summe der Differenzen der Andrena-Antworten zu der eigenen Schätzung. D.h. kleiner ist besser ;)
        </Typography>
      </CardContent>
    </Card>

  );
}

export default HallOfFame;
