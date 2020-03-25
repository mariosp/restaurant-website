const path = require("path");
const express = require("express");
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(express.static(publicPath));
server.use(router);

// Avoid CORS issue
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen(port);
