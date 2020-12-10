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
    Answer.prototype.isEverythingAnswered = function () {
        return (this.answer === "yes" || this.answer === "no") && (typeof this.estimate !== 'undefined' && this.estimate >= 0 && this.estimate <= 100);
    };
    return Answer;
}());
var Statistics = /** @class */ (function () {
    function Statistics(id) {
        this.yesAnswers = 0;
        this.noAnswers = 0;
        this.percentage = 50;
        this.id = id;
    }
    Statistics.prototype.addAnswer = function (answer) {
        if (answer === "yes") {
            this.yesAnswers++;
        }
        else if (answer === "no") {
            this.noAnswers++;
        }
        this.updatePercentage();
    };
    Statistics.prototype.updatePercentage = function () {
        var total = this.yesAnswers + this.noAnswers;
        if (total > 0)
            this.percentage = Math.round(this.yesAnswers / total * 100);
    };
    return Statistics;
}());
var Client = /** @class */ (function () {
    function Client(socket) {
        this.score = 0;
        this.scoredEstimates = 0;
        this.socket = socket;
        this.answers = rawQuestions.map(function (_q, index) { return new Answer(index); });
        this.statistics = new Array(questions.length);
    }
    return Client;
}());
var rawQuestions = [
    'Hast du schon mal im Büro geschlafen?',
    'Hast du schon mal bei andrena geduscht?',
    'Hast du schon mal eine Spülmaschine nicht ausgeräumt, obwohl ich die Zeit hatte?',
    'Hast du schon mal ein privates Packet zu andrena bestellt?',
    'Hast du schon mal länger als 3 Monate vegan gelebt?',
    'Hast du schon mal mein Essen im Kühlschrank vergessen?',
    'Hast du schon mal einen Arbeitstag mit einem Bier/Wein begonnen?',
    'Hast du schon mal einem Meeting auf dem Klo gefolgt?',
];
var questions = [];
var statistics = [];
var currentQuestionIndex = -1;
var dirty = true;
var clients = {};
function nextQuestion() {
    if (currentQuestionIndex < rawQuestions.length) {
        if (currentQuestionIndex >= 0)
            finalizeCurrentQuestion();
        currentQuestionIndex++;
    }
    if (currentQuestionIndex < rawQuestions.length) {
        questions.push(new Question(currentQuestionIndex, rawQuestions[currentQuestionIndex]));
        statistics.push(new Statistics(currentQuestionIndex));
    }
    console.log("switching to question " + currentQuestionIndex);
    dirty = true;
    sendUpdateToAllSockets();
}
function finalizeCurrentQuestion() {
    questions[currentQuestionIndex].isActive = false;
    Object.values(clients).forEach(computeScore);
}
function computeDifference(client, questionIndex) {
    var realValue = statistics[questionIndex].percentage;
    var estimate = client.answers[questionIndex].estimate;
    if (!estimate) {
        estimate = (realValue < 50) ? 100 : 0;
    }
    return Math.abs(realValue - estimate);
}
function computeScore(client) {
    client.scoredEstimates++;
    client.score = computeDifference(client, currentQuestionIndex);
}
function sendUpdateToAllSockets() {
    if (dirty) {
        dirty = false;
        io.emit("questions", questions);
        Object.values(clients).forEach(sendUpdatesToSocket);
        io.emit("scores", computeCurrentScores());
    }
}
function sendUpdatesToSocket(client) {
    client.socket.emit("statistics", client.statistics);
}
function computeCurrentScores() {
    var scores = Object.values(clients).map(function (client) { return { playerName: client.socket.id, score: client.score }; });
    scores.sort(function (a, b) {
        if (a.score != b.score)
            return a.score - b.score;
        var x = a.playerName.toLowerCase();
        var y = b.playerName.toLowerCase();
        if (x < y) {
            return -1;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    });
    console.log("scores: " + JSON.stringify(scores));
    return scores;
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
function isEstimateValid(answerObj) {
    var estimate = answerObj.estimate;
    if (!(typeof estimate !== 'undefined' && estimate >= 0 && estimate <= 100)) {
        console.log("Illegal estimate received:" + estimate);
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
    if (clients[socket.id].scoredEstimates < currentQuestionIndex) {
        var score = 0;
        for (var i = 0; i <= currentQuestionIndex; i++) {
            score += computeDifference(clients[socket.id], i);
        }
        clients[socket.id].scoredEstimates = currentQuestionIndex + 1;
        clients[socket.id].score = score;
    }
    dirty = true;
    socket.on("disconnect", function (_reason) {
        delete clients[socket.id];
    });
    socket.on("answer", function (a) {
        console.log("received answer " + JSON.stringify(a));
        if (isAnswerValid(a)) {
            var client = clients[socket.id];
            client.answers[a.id].answer = a.answer;
            statistics[a.id].addAnswer(a.answer);
            if (client.answers[a.id].isEverythingAnswered()) {
                client.statistics[a.id] = statistics[a.id];
            }
            dirty = true;
            socket.emit("answers", client.answers);
        }
    });
    socket.on("estimate", function (a) {
        console.log("received estimate " + JSON.stringify(a));
        if (isEstimateValid(a)) {
            var client = clients[socket.id];
            client.answers[a.id].estimate = a.estimate;
            if (client.answers[a.id].isEverythingAnswered()) {
                client.statistics[a.id] = statistics[a.id];
            }
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
