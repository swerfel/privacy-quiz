import {useState} from 'react';

import { socket, useSubscription } from '../util/Sockets';

import Button from 'react-bootstrap/Button';

function AdminControls(){
const [admin, setAdmin] = useState(false);
  var onResponse = () => socket.emit("next question");

  useSubscription("you are admin", () => setAdmin(true));

  if (admin)
    return (
      <Button variant="danger" onClick={onResponse}>Nächste Frage</Button>
    );
  else
    return null;
}

export default AdminControls;
