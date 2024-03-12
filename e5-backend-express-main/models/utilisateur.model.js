const mongoose = require("mongoose");

const UtilisateurSchema = mongoose.Schema(
  {
    nom: String,
    prenom: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);
