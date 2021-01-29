import { Box, IconButton, Paper, TextField } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import {FormEvent, useState} from 'react';

import  { socket } from '../util/Sockets';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

function NameView(){
  const classes = useStyles();
  const [name, setName] = useState("");
  var onApply = () => socket.emit("name", name);
  var handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  var submitName = (e: FormEvent) => {
    e.preventDefault();
    onApply();
  };
  return (
        <Paper>
          <form onSubmit={submitName}>
            <Box display="flex"> 
              <Box flexGrow={1}>
                <TextField fullWidth className={classes.margin} onChange={handleChange} id="name" label="Name" value={name}
                  placeholder="Name (Die Antworten werden nicht gespeichert, nur deine Schätzabweichung wird den Anderen angezeigt)"/>
              </Box>
              <Box>
                <IconButton aria-label="Übernehmen" onClick={onApply} color="primary"  className={classes.margin}>
                  <SendIcon/>
                </IconButton></Box>
            </Box>
          </form>
        </Paper>
  );
}

export default NameView;
