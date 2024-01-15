require("dotenv").config();
const express = require("express");
const upload = require("express-fileupload");
const cors = require("cors");
const app = express();
const pool = require('./config/database')

const { Server } = require('socket.io');
const { createServer } = require('http');
const path = require('path');

const httpServer = createServer(app);
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN
    },
});

app.set("io", io);
app.use(express.static('resources'))
const teamRouter = require("./src/user/Router/Team.router");
const loginRouter = require("./src/user/Router/Login.router");
const countryRouter = require("./src/user/Router/country.router");
const playerRouter = require("./src/user/Router/Player.router");
const userRouter = require("./src/user/Router/userRegister.router");
const fileRouter = require("./src/user/Router/fileUpload.router");
const playOffTypeRouter = require("./src/user/Router/playOffType.router");
const gameTypeRouter = require("./src/user/Router/gameType.router");
const groupTypeRouter = require("./src/user/Router/groupType.router");
const tournamentRouter = require("./src/user/Router/tournament.router");
const searchFriendRouter = require("./src/user/Router/searchFriend.router");
const addFriendRouter = require("./src/user/Router/userFriend.router");
const matchRouter=require("./src/user/Router/match.router");
const allFriendsRouter=require("./src/user/Router/allFriends.router");
const teamPlayersRouter = require("./src/user/Router/getPlayerByTeam.router");
const searchAccptedFriendsrouter = require("./src/user/Router/searchAccptedFriends.router");
const MatchResultRouter=require("./src/user/Router/MatchResult.router");
const chattingRouter = require("./src/user/Router/chatting.router");
const matchChattingRouter = require("./src/user/Router/matchChatting.router");
const latestMatchRouter = require("./src/user/Router/latestMatch.router");
const PlayerAttributeDetail=require("./src/user/Router/PlayerAttributeDetail.Router")
const PlayerAttribute=require("./src/user/Router/getPlayerAttribute.router")
const MatchFinish=require("./src/user/Router/MetchFinish.router")
app.use(express.json());
app.use(cors());
app.use(upload());
app.use("/src/team",teamRouter);
app.use("/src/Login",loginRouter);
app.use("/src/country",countryRouter);
app.use("/src/player",playerRouter);
app.use("/src/register",userRouter);
//app.use("/src/upload",fileRouter);
app.use("/src/groupType",groupTypeRouter);
app.use("/src/gameType",gameTypeRouter);
app.use("/src/playoffType",playOffTypeRouter);
app.use("/src/tournament",tournamentRouter);
app.use("/src/searchFriend",searchFriendRouter);
app.use("/src/addFriend",addFriendRouter);
app.use("/src/match",matchRouter);
app.use("/src/allFriends",allFriendsRouter);
app.use("/src/teamPlayers",teamPlayersRouter);
app.use("/src/searchAccptedFriend",searchAccptedFriendsrouter );
app.use("/src/MatchResult",MatchResultRouter);
app.use("/src/chatting",chattingRouter);
app.use("/src/matchChatting",matchChattingRouter);
app.use("/src/latestMatch",latestMatchRouter);
app.use("/src/getPlayerAttribute",PlayerAttribute);
app.use("/src/PlayerAttributeDetail",PlayerAttributeDetail);
app.use("/src/MatchFinish",MatchFinish);
const initializeSocketIO = (io) => {
    return io.on("connection", async (socket) => {
        try {
            let token = socket.handshake.auth.token
            const user = token
            socket.user = user;

            socket.join(user.userID.toString());
            socket.emit(`User ${user.userID} Connected`);
            console.log("User connected. userId: ", user.userID.toString(), " ", user);
           
socket.on('chat message private', (data) => {
    const res = pool.query(
        'CALL save_PrivateChat(?, ?, ?, ?)',
        [
            data.ChatID,
            data.Sender,
            data.Receiver,
            data.Message
        ],
        (error, results, fields) => {
            if (error) {
                io.emit('chat message private', data.Message, false);
            } else {
                io.emit('chat message private', data.Message, true);
            }
        }
    );
    // io.emit('chat message private', data.Message);
});
             socket.on('chat message', async (data) => {
                const result = pool.query(
                    'CALL save_MatchChat(?, ?, ?, ?)',
                    [
                        0,
                        data.MatchID,
                        user.userID,
                        data.Message
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return error
                        }

                        return results
                    }
                );
                io.emit('chat message', data.Message );
            });


            socket.on('disconnect', () => {
                console.log("user has disconnected. userId: " + socket.user?._id);
                if (socket.user?._id) {
                    socket.leave(socket.user._id);
                }
            });
        } catch (error) {
            socket.emit(
                "socketError",
                error?.message || "Something went wrong while connecting to the socket."
            );
        }
    });
};
initializeSocketIO(io);

//app.listen(process.env.APP_PORT,()=>{
//    console.log("Server is runing on port",process.env.APP_PORT);
//}); 

httpServer.listen(process.env.APP_PORT, () => {
    console.log("Server is runing on port", process.env.APP_PORT);
});

