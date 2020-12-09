
import { Question } from './Question';

function QuestionView({ question } : {question: Question}) {

  return (
    <div>
      <p>
        { question.question }
      </p>
    </div>
  );
}

export default QuestionView;
