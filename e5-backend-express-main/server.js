const express = require("express");
const app = express();
const port = 4000;

// Traite des requêtes dont le "content-type" est "application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: true }));

// Traite des requêtes dont le "content-type" est "application/json"
app.use(express.json());

require("./routes/utilisateur.routes")(app);
require("./routes/offre.routes")(app);
require("./routes/connexion.routes")(app);

//Définition d'une route pour tester si le serveur fonctionne en retournant du texte brut
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

//Définition d'une route pour tester si le serveur fonctionne en retournant du json
app.get("/hello-json", (req, res) => {
  res.json({ message: "Hello world !" });
});

app.listen(port, () => {
  console.log(`Le serveur est accessible sur le port : ${port}`);
});

const mongoose = require("mongoose");

const { dbUser, dbPassword, dbHost, dbName } = require("./config");
const connectionString = `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}?authSource=admin`;

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));
