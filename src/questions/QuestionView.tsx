import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { Question } from './Question';
import { Answer } from './Answer';
import { Statistics } from './Statistics';
import { StatisticsView } from './StatisticsView';
import { QuestionResponseView } from './QuestionResponseView';


function QuestionView({ question, answer, statistics } : {question: Question, answer: Answer, statistics: Statistics}) {
  return (
    <Card>
    <style type="text/css">
      {`
      .accordion .card-header .btn-link {
        font-weight: bold;
        font-size: 1.3em;
        text-align: left;
      }
      `}
    </style>
      <Card.Header>
        <Accordion.Toggle as={Button} variant={question.isActive?"link":"button"} eventKey={String(question.id)}>
          { question.question }
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={String(question.id)}>
        <Card.Body>
          <QuestionResponseView question={question} answer={answer}/>
          <br/>
          <StatisticsView statistics={statistics}/>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default QuestionView;
