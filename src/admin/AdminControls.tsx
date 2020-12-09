import { Button } from '../base/Button';
import { socket } from '../util/Sockets';

function AdminControls(){
  var onResponse = () => socket.emit("next question");

  return (
    <Button onClick={onResponse}>Nächste Frage</Button>
  );
}

export default AdminControls;
