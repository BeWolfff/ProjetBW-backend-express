const Offre = require("../models/offre.model.js");

// Créer une offre
exports.create = (req, res) => {

console.log(req.user);
console.log(req.body);

  if (!req.body.titre || !req.body.prix) {
    return res.status(400).send({
      message: "Le titre et le prix sont obligatoires",
    });
  }

  const offre = new Offre({
    titre: req.body.titre,
    description: req.body.description,
    prix: req.body.prix,
    etat: "neuf",
    photos: req.body.photos,
    utilisateur: req.user.id,
  });

  offre
    .save()
    .then((data) => {

      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        to: "ExponentPushToken[W7b7pGNK3JhBt4Cwri6a4H]",
        title: "hello",
        body: "world",
        data: { extraData: "Some data" },
        }),
        }).then((data) => console.log(data));
        

      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Une erreur est survenue",
      });
    });
};

// Liste toutes les offres de la base de données
exports.findAll = (req, res) => {
  Offre.find({}, "-createdAt -updatedAt -__v")
    .populate("utilisateur", "-password -email -createdAt -updatedAt -__v")
    .then((offres) => {
      return res.send(offres);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message ||
          "Une erreur est survenue lors de la récupération des offres.",
      });
    });
};

// Trouve un offre par son identifiant
exports.findOne = (req, res) => {
  Offre.findById(req.params.offreId, "-createdAt -updatedAt -__v")
    .populate("utilisateur", "-password -email -createdAt -updatedAt -__v")
    .then((offre) => {
      if (!offre) {
        return res.status(404).send({
          message:
            "Impossible de trouver l'offre avec l'id " + req.params.offreId,
        });
      }
      return res.send(offre);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Impossible de trouver l'offre avec id " + req.params.offreId,
        });
      }
      return res.status(500).send({
        message:
          "Impossible de récupérer l'offre avec l'id " + req.params.offreId,
      });
    });
};

// Met à jour une offre selon son identifiant
exports.update = (req, res) => {
  Offre.findByIdAndUpdate(
    req.params.offreId,
    {
      nom: req.body.nom,
      description: req.body.description,
      prix: req.body.prix,
      photos: req.body.photos,
    },
    { new: true } // Retourne l'objet mis à jour
  )
    .then((offre) => {
      if (!offre) {
        return res.status(404).send({
          message:
            "Impossible de trouver l'offre avec l'id " + req.params.offreId,
        });
      }
      return res.send(offre);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Impossible de trouver l'offre avec l'id " + req.params.offreId,
        });
      }
      return res.status(500).send({
        message:
          "Erreur lors de la mise à jour de l'offre avec l'id " +
          req.params.offreId,
      });
    });
};

// Supprime un offre selon son identifiant
exports.delete = (req, res) => {
  Offre.findByIdAndRemove(req.params.offreId)
    .then((offre) => {
      if (!offre) {
        return res.status(404).send({
          message:
            "Impossible de trouver l'offre avec l'id " + req.params.offreId,
        });
      }
      return res.send({ message: "L' offre a bien été supprimé" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message:
            "Impossible de trouver l'offre avec l'id " + req.params.offreId,
        });
      }
      return res.status(500).send({
        message:
          "Impossible de supprimer l'offre avec l'id " + req.params.offreId,
      });
    });
};
