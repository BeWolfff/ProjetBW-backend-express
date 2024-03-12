module.exports = (app) => {
const offres = require("../controllers/offre.controller.js");
const verifierJWT = require("../middlewares/auth");

  // Créé une nouvellle offre
  app.post("/offre", verifierJWT, offres.create);

  // Liste tous les offres
  app.get("/offres", offres.findAll);

  // Récupère une offre par son identifiant
  app.get("/offre/:offreId", offres.findOne);

  // Met à jour une offre par son identifiant
  app.put("/offre/:offreId", offres.update);

  // Supprime une offre par son identifiant
  app.delete("/offre/:offreId", offres.delete);
};
