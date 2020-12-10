import Button from 'react-bootstrap/Button';

import { socket } from '../util/Sockets';

function AdminControls(){
  var onResponse = () => socket.emit("next question");

  return (
    <Button variant="danger" onClick={onResponse}>Nächste Frage</Button>
  );
}

export default AdminControls;
