
import Card from 'react-bootstrap/Card';

import { Statistics } from './Statistics';

export function StatisticsView({ statistics } : {statistics: Statistics}) {
  if (statistics && (statistics.yesAnswers + statistics.noAnswers) > 0) {
    var total = statistics.yesAnswers + statistics.noAnswers;
    var persentage = statistics.yesAnswers / total * 100;
    var roundedPercentage = Math.round(persentage);
    return (
      <Card>
        <Card.Body>
          <Card.Title>Antworten deiner MitspielerInnen:</Card.Title>
          <Card.Text>
            {roundedPercentage}% der andrenas haben auf diese Frage mit "Ja" geantwortet
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else
    return null;
}
