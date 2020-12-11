import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
      <Card.Header>Beste Schätzer:</Card.Header>
      <ListGroup variant="flush">
        {scores.map(score =>
          <ListGroup.Item key={score.playerName}>
            <ScoreView score={score}/>
          </ListGroup.Item>
        )}
      </ListGroup>
      <Card.Footer className="text-muted">Score: Summe der Differenzen der Andrena-Antworten zu der eigenen Schätzung. D.h. kleiner ist besser ;)</Card.Footer>
    </Card>

  );
}

export default HallOfFame;
