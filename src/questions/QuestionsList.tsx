import { useState } from 'react';
import QuestionView from './QuestionView';
import { Question } from './Question';
import { Answer } from './Answer';
import { Statistics } from './Statistics';
import { useSubscription } from '../util/Sockets'

function QuestionsList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  useSubscription("questions", (q: Question[]) => {console.log(JSON.stringify(q));setQuestions(q)});
  useSubscription("answers", setAnswers);
  useSubscription("statistics", setStatistics);

  return (
    <div>
      {questions.map((question, index) =>
        <QuestionView key={question.id}
                  question={question} answer={answers[index]} statistics={statistics[index]}/>
      )}
    </div>
  );
}

export default QuestionsList;
