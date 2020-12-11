import {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import  { socket } from '../util/Sockets';

function NameView(){
  const [name, setName] = useState("");
  var onApply = () => socket.emit("name", name);
  var handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(String(e.target.value));
  };
  return (
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="nameLabel">Dein Name</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Bitte Name eingeben. (Die Antworten werden nicht gespeichert, nur deine Schätzabweichung wird anderen angezeigt)"
      aria-label="Spielername"
      aria-describedby="nameLabel"
      onChange={handleChange}
    />
    <InputGroup.Append>
      <Button variant="success" onClick={onApply}>Übernehmen</Button>
    </InputGroup.Append>
  </InputGroup>);
}

export default NameView;
