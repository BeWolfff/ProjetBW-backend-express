const mongoose = require("mongoose");

const OffreSchema = mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: String,
    prix: {
      type: Number,
      required: true,
    },
    etat: {
      type: String,
      required: true,
    },
    photos: [String],

    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Offre", OffreSchema);
