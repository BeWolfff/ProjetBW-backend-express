const extractJwt = require("../middlewares/auth.js");

module.exports = (app) => {
  const utilisateurs = require("../controllers/utilisateur.controller.js");

  // Créé un nouvel utilisateur
  app.post("/utilisateur", utilisateurs.create);

  // Liste tous les utilisateurs
  app.get("/utilisateurs", utilisateurs.findAll);

  // Récupère un utilisateur par son identifiant
  app.get("/utilisateur/:utilisateurId", utilisateurs.findOne);

  // Met à jour un utilisateur par son identifiant
  app.put("/utilisateur/:utilisateurId", utilisateurs.update);

  // Supprime un utilisateur par son identifiant
  app.delete("/utilisateur/:utilisateurId", utilisateurs.delete);

  // recupere un utilisateur par le JWT
  app.get("/profil", extractJwt, utilisateurs.profil);
};
