import * as express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
var cors = require('cors');
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer);

// QUESTIONS

type AnswerType = "yes" | "no";

class Question {
  id: number;
  question: string;
  isActive: boolean;

  constructor(id: number, question: string) {
    this.id = id;
    this.question = question;
    this.isActive = true;
  }
}

class Answer {
  id: number;
  answer?: AnswerType;

  constructor(id: number) {
    this.id = id;
  }
}

class Statistics {
  id: number;
  yesAnswers = 0;
  noAnswers = 0;

  constructor(id: number) {
    this.id = id;
  }

  addAnswer(answer: AnswerType){
    if (answer === "yes") {
      this.yesAnswers++;
    } else if (answer === "no") {
      this.noAnswers++;
    }
  }
}

class Client {
  socket: Socket;
  answers: Answer[];
  statistics: Statistics[];
  constructor(socket: Socket) {
    this.socket = socket;
    this.answers = rawQuestions.map((_q, index) => new Answer(index));
    this.statistics = new Array(questions.length);
  }
}

const rawQuestions = [
  'Ich habe schon mal im Büro geschlafen.',
  'Ich habe schon mal bei andrena geduscht.',
  'Ich habe schon mal eine Spülmaschine nicht ausgeräumt, obwohl ich die Zeit hatte.',
  'Ich habe schon mal ein privates Packet zu andrena bestellt.',
  'Ich habe schon mal länger als 3 Monate vegan gelebt.',
  'Ich habe schon mal mein Essen im Kühlschrank vergessen.',
  'Ich habe schon mal einen Arbeitstag mit einem Bier/Wein begonnen.',
  'Ich habe schon mal einem Meeting auf dem Klo gefolgt.',
];
const questions: Question[] = [];
const statistics: Statistics[] = [];

var currentQuestionIndex = -1;
var dirty = true;
var clients = {};

function nextQuestion(){
  if (currentQuestionIndex < rawQuestions.length)
    currentQuestionIndex++;
  if (currentQuestionIndex < rawQuestions.length) {
    questions.push(new Question(currentQuestionIndex, rawQuestions[currentQuestionIndex]));
    statistics.push(new Statistics(currentQuestionIndex));
    if (currentQuestionIndex > 0)
      questions[currentQuestionIndex-1].isActive = false;
  }
  console.log("switching to question "+currentQuestionIndex);
  dirty = true;
  sendUpdateToAllSockets();
}

function sendUpdateToAllSockets() {
  if (dirty) {
    dirty = false;
    Object.values(clients).forEach(sendUpdatesToSocket);
  }
}

function sendUpdatesToSocket(client: Client) {
  client.socket.emit("questions", questions);
  client.socket.emit("statistics", client.statistics);
}

function isAnswerValid(answerObj: Answer) {
  var a = answerObj.answer
  if (!(a === "yes" || a === "no")){
    console.log("Illegal answer received:" + a);
    return false;
  }

  var id = answerObj.id;
  if ( id < 0 || id > questions.length || !questions[id].isActive ) {
    console.log("Illegal answer id received: " + id + " but current id is " + currentQuestionIndex);
    return false;
  }

  return true;
}

io.on("connection", (socket: Socket) => {
  console.log("client connected " + socket.id);
  clients[socket.id] = new Client(socket);
  socket.emit("questions", questions);

  socket.on("disconnect", _reason => {
    delete clients[socket.id];
  })

  socket.on("answer", a => {
    if (isAnswerValid(a)) {
      console.log("received answer " + JSON.stringify(a));
      var client = clients[socket.id];
      client.answers[a.id].answer =  a.answer;
      statistics[a.id].addAnswer(a.answer);
      client.statistics[a.id] = statistics[a.id];
      dirty = true;
      socket.emit("answers", client.answers);
    }
  })

  socket.on("next question", nextQuestion);
});

setInterval(sendUpdateToAllSockets, 1000);


//////////////// Server setup
const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname+'/build'));

httpServer.listen(PORT, () => console.log('listening on port ' + PORT));
