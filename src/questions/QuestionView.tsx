
import { Question } from './Question';
import { Answer } from './Answer';
import { Statistics } from './Statistics';
import { Button } from '../base/Button'
import { socket } from '../util/Sockets';

function AnsweredButton({ answer } : {answer: Answer}) {
  let text = "<nicht beantwortet>";
  if (answer.answer === "yes")
    text = "Ja"
  if (answer.answer === "no")
    text = "Nein"
  return (
    <Button disabled>{text}</Button>
  );
}

function Results({ statistics } : {statistics: Statistics}) {
  if (statistics && (statistics.yesAnswers + statistics.noAnswers) > 0) {
    var total = statistics.yesAnswers + statistics.noAnswers;
    var persentage = statistics.yesAnswers / total * 100;
    var roundedPercentage = Math.round(persentage);
    return (
      <span>{roundedPercentage}% der andrenas haben auf diese Frage mit "Ja" geantwortet</span>
    );
  } else
    return null;
}

function QuestionControls({ question, answer } : {question: Question, answer: Answer}) {
  if (answer && (answer.answer === "yes" || answer.answer === "no"))
    return (<AnsweredButton answer={answer}/>)
  else if (question.isActive) {
    var onResponse = (response: string) => {
      return () => socket.emit("answer", {id: question.id, answer: response})
    }
    return (<div>
        <Button onClick={onResponse("yes")}>Ja</Button>
        <Button onClick={onResponse("no")}>Nein</Button>
      </div>)
  } else
    return null;
}

function QuestionView({ question, answer, statistics } : {question: Question, answer: Answer, statistics: Statistics}) {
  return (
    <div>
      <h3>
        { question.question }
      </h3>
      <div>
        <span>Deine Antwort: </span>
        <QuestionControls question={question} answer={answer}/>
      </div>
      <Results statistics={statistics}/>
    </div>
  );
}

export default QuestionView;
