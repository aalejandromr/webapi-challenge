const express = require("express");

const server = express();
const actionsRouter = require("./actions/router");
const projectsRouter = require("./projects/router");

server.use(express.json());
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

module.exports = server;
