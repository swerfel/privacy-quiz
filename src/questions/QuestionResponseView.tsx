import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';

import { Question } from './Question';
import { Answer } from './Answer';

import {socket} from '../util/Sockets'

function YesNoResponse({ question, answer } : {question: Question, answer: Answer}) {
  if (answer && (answer.answer === "yes" || answer.answer === "no"))
    return (<p>Du hast "{answer.answer === "yes" ? "Ja": "Nein"}" geantwortet.</p>)
  else if (question.isActive) {
    var onResponse = (response: string) => {
      return () => socket.emit("answer", {id: question.id, answer: response})
    }
    return (<p>
            Und? Hast du?: <Button variant="primary" onClick={onResponse("yes")}>Ja</Button>
            <Button variant="primary" onClick={onResponse("no")}>Nein</Button>
      </p>)
  } else
    return <p>Du hast auf diese Frage nicht geantwortet.</p>;
}

function PercentageEstimateResponse({ question, answer } : {question: Question, answer: Answer}) {
  const [ value, setValue ] = useState(50);
  if (answer && answer.estimate)
    return (<p>Du hast geschätzt, dass {answer.estimate}% der MitspielerInnen "Ja" geantwortet haben.</p>)
  else if (question.isActive) {
    var onEstimate = () => socket.emit("estimate", {id: question.id, estimate: value})
    var handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
    };
    return (<>
      <Form>
        <Form.Group controlId="formBasicRange">
          <Form.Label>Was schätzst du, wie viele % der Teilnehmer haben mit "Ja" geantwortet?</Form.Label>
          <Form.Control type="range" onChange={handleChange}/>
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={onEstimate}>Schätzung abgeben ({value}%)</Button>
      </>)
  } else
    return <p>Du hast für diese Frage keine Schätzung abgegeben.</p>;
}

export function QuestionResponseView({ question, answer } : {question: Question, answer: Answer}) {
  return (<>
    <style type="text/css">
      {`
      .btn-primary {
        margin: 0.1em;
      }
      `}
    </style>
    <Card>
      <Card.Body>
        <Card.Title>Deine Antworten:</Card.Title>
        <Card.Text>
          <YesNoResponse question={question} answer={answer}/>
          <PercentageEstimateResponse question={question} answer={answer}/>
        </Card.Text>
      </Card.Body>
    </Card>
    </>)
}
