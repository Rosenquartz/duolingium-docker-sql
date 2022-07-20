const joinLobby = async (socket, contestId) => {
    socket.join(contestId)
}

module.exports = {
    joinLobby: joinLobby
};