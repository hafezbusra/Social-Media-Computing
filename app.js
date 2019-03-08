// modules =================================================
const express = require('express');
const path = require("path")


// configuration ===========================================
// config files
require('./config/config')
require('./app/models.js');


//const server = new ApolloServer({ typeDefs, resolvers });
const app = require('express')();
app.use(express.static(path.join(__dirname, "public")))
//server.applyMiddleware({ app });
const server = require('http').createServer(app);



// routes ==================================================
require('./app/routes')(app); // pass our application into our routes


// start app ===============================================

if (server.listen(process.env.PORT || 3000)) {
  console.log('🚀 Server running at http://127.0.0.1:3000/');
}
