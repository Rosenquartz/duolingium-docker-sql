const express = require("express");
const http = require("http");
const app = express();
const socket = require('socket.io');

const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: '*'
    }
});

console.log('setting up sockets');

io.on('connection', (socket) => {

    socket.on('joinAsConductor', (data)=>{
        console.log("joining as conductor")
        socket.join(data.contestId);
    })

    socket.on('joinAsContestant', (data)=>{
        socket.join(data.contestId);
        socket.to(data.contestId).emit("userJoined", data.users);
    })

    socket.on("userJoined", (data)=>{
        console.log(data);
    })

    socket.on("startGame", (data)=>{
        socket.to(data.contestId).emit("startGame");
    })

    socket.on("nextItem", (data) => {
        socket.to(data.contestId).emit("loadItem", data)
    })

    socket.on("contestantAnswer", (data) => {
        console.log("Sockets, contestantAnswer", data);
        socket.to(data.contestId).emit("contestantAnswered", data);
    })

    socket.on("startPettyTimer", (data) => {
        socket.to(data.contestId).emit("startPettyTimer", data)
    })

    socket.on("startTimer", (data) => {
        socket.to(data.contestId).emit("startTimer", data)
    })

    socket.on("timerUpdate", (data) => {
        socket.to(data.contestId).emit("timerUpdate", data)
    })

    socket.on("showRankings", (data) => {
        socket.to(data.contestId).emit("userShowRankings", data)
    })

    socket.on("hideRankings", (data) => {
        socket.to(data.contestId).emit("hideShowRankings")
    })

    socket.on("showFinalRankings", (data) => {
        socket.to(data.contestId).emit("showFinalRankings", data)
    })

    socket.on("updateCurrentItem", (data) => {
        socket.to(data.contestId).emit("updateCurrentItem", data)
    })

});

const data = {
    app: app,
    server: server,
    io: io
};

module.exports = data;