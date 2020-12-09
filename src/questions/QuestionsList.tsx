import { useState } from 'react';
import QuestionView from './QuestionView';

function QuestionsList() {
  const [questions, setQuestions] = useState([
    {id: 1, question: "Frage 1?"},
    {id: 2, question: "Frage 2?"}]);

  return (
    <div>
      {questions.map((question) =>
        <QuestionView key={question.id}
                  question={question} />
      )}
    </div>
  );
}

export default QuestionsList;
