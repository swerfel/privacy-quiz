
import { Histogram } from './Histogram';
import { Statistics } from './Statistics';

export function StatisticsView({ statistics } : {statistics: Statistics}) {
  return (
    <>
        <b>{statistics.percentage}%</b> der andrenas haben auf diese Frage mit "Ja" geantwortet.
        (Ja: {statistics.yesAnswers}, Nein: {statistics.noAnswers}, Antworten gesamt: {statistics.yesAnswers+statistics.noAnswers})
    </>
  );
}
