//EXECUTEZ MOI : npm run reset-db

const mongoose = require("mongoose");
const Offre = require("./models/offre.model");
const Utilisateur = require("./models/utilisateur.model");

// Données de test
const utilisateursTest = [
  {
    nom: "bansept",
    prenom: "franck",
    email: "a@a.com",
    password: "$2a$10$xIJarowxUEuyhGEQkv2TjuEKHbf0sV30oeH3wiAwiHgFJxJyqsLse", //root
  },
  {
    nom: "doe",
    prenom: "john",
    email: "b@b.com",
    password: "$2a$10$xIJarowxUEuyhGEQkv2TjuEKHbf0sV30oeH3wiAwiHgFJxJyqsLse", //root
  },
];

const offresTest = [
  {
    titre: "Première offre",
    description: "Description première offre",
    etat: "neuf",
    prix: 99.99,
    photos: [
      "https://placehold.co/300x400/png",
      "https://placehold.co/301x401/png",
      "https://placehold.co/302x402/png",
      "https://placehold.co/303x403/png",
    ],
  },
  {
    titre: "Deuxième offre",
    description: "Description deuxième offre",
    etat: "Bon etat",
    prix: 77.5,
    photos: ["https://placehold.co/600x300/png"],
  },
  {
    titre: "Troisième offre",
    description: "Description troisième offre",
    etat: "Mauvais état",
    prix: 1,
    photos: ["https://placehold.co/300x600/png"],
  },
  {
    titre: "Quatrième offre",
    description: "Description quatrième offre",
    etat: "neuf",
    prix: 9.99,
    photos: ["https://placehold.co/50x50/png"],
  },
];

const { dbUser, dbPassword, dbHost, dbName } = require("./config");
const connectionString = `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}?authSource=admin`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connecté à MongoDB.");
    // Suppression de la base de données
    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    console.log("Base de données supprimée.");
    // Insertion des utilisateurs de test
    return Utilisateur.insertMany(utilisateursTest);
  })
  .then((utilisateursInseres) => {
    console.log("Utilisateurs de test insérés.");

    //On lit les offres aux utilisateurs
    offresTest[0].utilisateur = utilisateursInseres[0]._id;
    offresTest[1].utilisateur = utilisateursInseres[0]._id;
    offresTest[2].utilisateur = utilisateursInseres[0]._id;
    offresTest[3].utilisateur = utilisateursInseres[1]._id;

    // Insertion des offres de test
    return Offre.insertMany(offresTest);
  })
  .then(() => {
    console.log("Offres de test insérées.");
    process.exit();
  })
  .catch((err) => {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      err
    );
    process.exit();
  });
