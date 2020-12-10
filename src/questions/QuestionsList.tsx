import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import QuestionView from './QuestionView';
import { Question } from './Question';
import { Answer } from './Answer';
import { Statistics } from './Statistics';
import { useSubscription } from '../util/Sockets'

function QuestionsList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [statistics, setStatistics] = useState<Statistics[]>([])
  const [activeQuestion, setActiveQuestion] = useState<string>("0");

  function onNewQuestions(newQuestions: Question[]){
    newQuestions.reverse(); // newest Quesion on the top
    setQuestions(newQuestions);
    var newActive = newQuestions.find(q => q.isActive);
    if (newActive)
      setActiveQuestion(String(newActive.id));
  }

  function onSelect(eventKey: string | null, _event: any) {
    if (eventKey)
      setActiveQuestion(eventKey);
  }

  useSubscription("questions", onNewQuestions);
  useSubscription("answers", setAnswers);
  useSubscription("statistics", (s: Statistics[]) => {setStatistics(s); console.log(s)});

  return (
    <Accordion defaultActiveKey="0" activeKey={activeQuestion} onSelect={onSelect}>
      {questions.map(question =>
        <QuestionView key={question.id}
                  question={question} answer={answers[question.id]} statistics={statistics[question.id]}/>
      )}
    </Accordion>
  );
}

export default QuestionsList;
