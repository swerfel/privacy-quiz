"use strict";
exports.__esModule = true;
var express = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express();
var cors = require('cors');
app.use(cors());
var httpServer = http_1.createServer(app);
var io = new socket_io_1.Server(httpServer);
var Question = /** @class */ (function () {
    function Question(id, question) {
        this.id = id;
        this.question = question;
        this.isActive = true;
    }
    return Question;
}());
var Answer = /** @class */ (function () {
    function Answer(id) {
        this.id = id;
    }
    return Answer;
}());
var Statistics = /** @class */ (function () {
    function Statistics(id) {
        this.yesAnswers = 0;
        this.noAnswers = 0;
        this.id = id;
    }
    Statistics.prototype.addAnswer = function (answer) {
        if (answer === "yes") {
            this.yesAnswers++;
        }
        else if (answer === "no") {
            this.noAnswers++;
        }
    };
    return Statistics;
}());
var Client = /** @class */ (function () {
    function Client(socket) {
        this.socket = socket;
        this.answers = rawQuestions.map(function (_q, index) { return new Answer(index); });
        this.statistics = new Array(questions.length);
    }
    return Client;
}());
var rawQuestions = [
    'Ich habe schon mal im Büro geschlafen.',
    'Ich habe schon mal bei andrena geduscht.',
    'Ich habe schon mal eine Spülmaschine nicht ausgeräumt, obwohl ich die Zeit hatte.',
    'Ich habe schon mal ein privates Packet zu andrena bestellt.',
    'Ich habe schon mal länger als 3 Monate vegan gelebt.',
    'Ich habe schon mal mein Essen im Kühlschrank vergessen.',
    'Ich habe schon mal einen Arbeitstag mit einem Bier/Wein begonnen.',
    'Ich habe schon mal einem Meeting auf dem Klo gefolgt.',
];
var questions = [];
var statistics = [];
var currentQuestionIndex = -1;
var dirty = true;
var clients = {};
function nextQuestion() {
    if (currentQuestionIndex < rawQuestions.length)
        currentQuestionIndex++;
    if (currentQuestionIndex < rawQuestions.length) {
        questions.push(new Question(currentQuestionIndex, rawQuestions[currentQuestionIndex]));
        statistics.push(new Statistics(currentQuestionIndex));
        if (currentQuestionIndex > 0)
            questions[currentQuestionIndex - 1].isActive = false;
    }
    console.log("switching to question " + currentQuestionIndex);
    dirty = true;
    sendUpdateToAllSockets();
}
function sendUpdateToAllSockets() {
    if (dirty) {
        dirty = false;
        Object.values(clients).forEach(sendUpdatesToSocket);
    }
}
function sendUpdatesToSocket(client) {
    client.socket.emit("questions", questions);
    client.socket.emit("statistics", client.statistics);
}
function isAnswerValid(answerObj) {
    var a = answerObj.answer;
    if (!(a === "yes" || a === "no")) {
        console.log("Illegal answer received:" + a);
        return false;
    }
    var id = answerObj.id;
    if (id < 0 || id > questions.length || !questions[id].isActive) {
        console.log("Illegal answer id received: " + id + " but current id is " + currentQuestionIndex);
        return false;
    }
    return true;
}
io.on("connection", function (socket) {
    console.log("client connected " + socket.id);
    clients[socket.id] = new Client(socket);
    socket.emit("questions", questions);
    socket.on("disconnect", function (_reason) {
        delete clients[socket.id];
    });
    socket.on("answer", function (a) {
        if (isAnswerValid(a)) {
            console.log("received answer " + JSON.stringify(a));
            var client = clients[socket.id];
            client.answers[a.id].answer = a.answer;
            statistics[a.id].addAnswer(a.answer);
            client.statistics[a.id] = statistics[a.id];
            dirty = true;
            socket.emit("answers", client.answers);
        }
    });
    socket.on("next question", nextQuestion);
});
setInterval(sendUpdateToAllSockets, 1000);
//////////////// Server setup
var PORT = process.env.PORT || 3001;
app.use(express.static(__dirname + '/build'));
httpServer.listen(PORT, function () { return console.log('listening on port ' + PORT); });
