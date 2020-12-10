import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { useSubscription } from '../util/Sockets';

import {Score} from './Score';

function HallOfFame() {
  const [scores, setScores] = useState<Score[]>([]);
  useSubscription("scores", (s: Score[]) => {setScores(s); console.log(s)});

  return (
    <Card>
      <Card.Header>Beste Schätzer:</Card.Header>
      <ListGroup variant="flush">
        {scores.map(score =>
          <ListGroup.Item key={score.playerName}>{score.playerName}: {score.score}</ListGroup.Item>
        )}
      </ListGroup>
      <Card.Footer className="text-muted">Score: Summe der Differenzen der Andrena-Antworten zu der eigenen Schätzung. D.h. kleiner ist besser ;)</Card.Footer>
    </Card>

  );
}

export default HallOfFame;
