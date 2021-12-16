import {  ReactNode, useCallback, useState } from 'react';

import { Question } from './Question';
import { Answer } from './Answer';
import { Statistics } from './Statistics';
import { useSubscription } from '../util/Sockets'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid } from '@material-ui/core';
import { StatisticsView } from './StatisticsView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { YesNoResponse } from './YesNoResponseView';
import { EstimationResponse } from './EstimationResponseView';
import { Histogram } from './Histogram';

function AccordionHeader({isActive, children}: {isActive: boolean, children: ReactNode}) {
  if(isActive)
    return <Box fontSize="h5.fontSize">{children}</Box> 
  else
    return <Box>{children}</Box>
}

function QuestionsList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [statistics, setStatistics] = useState<Statistics[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<number>(-1);

  var onNewQuestions = useCallback((newQuestions: Question[]) => {
    newQuestions.reverse(); // newest Quesion on the top
    setQuestions(newQuestions);
    var newActive = newQuestions.find(q => q.isActive);
    if (newActive)
      setSelectedQuestion(newActive.id);
  }, [setQuestions, setSelectedQuestion]);

  const handleChange = (question: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setSelectedQuestion(isExpanded ? question : -1);
  };

  useSubscription("questions", onNewQuestions);
  useSubscription("answers", useCallback(setAnswers, [setAnswers]));
  useSubscription("statistics", useCallback(setStatistics, [setStatistics]));

  return (<>
    {questions.map(question =>
      <Accordion key={question.id} expanded={question.id === selectedQuestion} onChange={handleChange(question.id)} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={ question.question }
          id={String(question.id)}
        >
          <AccordionHeader isActive={question.id === selectedQuestion}>
            { (question.isActive ? "Aktulle Aussage: " : "") + question.question }
          </AccordionHeader>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={1}>
            {statistics[question.id] && 
              <Grid item>
                <h4>Antworten deiner Mitspieler*innen:</h4>
                <StatisticsView statistics={statistics[question.id]}/>
                <h4>Schätzungen deiner Mitspieler*innen:</h4>
                <Histogram values={statistics[question.id].estimates}/>
              </Grid>
            }
            {answers[question.id]?.answer && <Grid item>
              <h4>Deine Schätzung:</h4>
              <EstimationResponse  question={question} answer={answers[question.id]}/>
            </Grid>}
            <Grid item>
              <h4>Deine Antwort:</h4>
              <YesNoResponse question={question} answer={answers[question.id]}/>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    )}
    </>
  );
}

export default QuestionsList;
