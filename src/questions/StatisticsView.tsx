
import Card from 'react-bootstrap/Card';

import { Statistics } from './Statistics';

export function StatisticsView({ statistics } : {statistics: Statistics}) {
  if (statistics && (statistics.yesAnswers + statistics.noAnswers) > 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Antworten deiner MitspielerInnen:</Card.Title>
          <Card.Text>
            {statistics.percentage}% der andrenas haben auf diese Frage mit "Ja" geantwortet
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else
    return null;
}
