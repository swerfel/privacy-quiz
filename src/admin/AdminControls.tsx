import { Button } from '@material-ui/core';
import {useState} from 'react';

import { socket, useSubscription } from '../util/Sockets';


function AdminControls(){
const [admin, setAdmin] = useState(false);
  var onResponse = () => socket.emit("next question");

  useSubscription("you are admin", () => setAdmin(true));

  if (admin)
    return (
      <Button variant="contained" color="secondary" onClick={onResponse}>Nächste Frage</Button>
    );
  else
    return null;
}

export default AdminControls;
