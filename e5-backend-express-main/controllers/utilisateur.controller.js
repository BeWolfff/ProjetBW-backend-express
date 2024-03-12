const bcrypt = require("bcryptjs");
const Utilisateur = require("../models/utilisateur.model.js");

// Créer un utilisateur
exports.create = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "L'email est obligatoire",
    });
  }

  // Hashage du mot de passe
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({
        message: "Erreur lors du hashage du mot de passe",
      });
    }

    // Créait un utilisateur avec le mot de passe hashé
    const utilisateur = new Utilisateur({
      nom: req.body.nom || "",
      prenom: req.body.prenom || "",
      email: req.body.email,
      password: hash,
    });

    utilisateur
      .save()
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "Une erreur est survenue",
        });
      });
  });
};

// Recupere un utilisateur par le JWT de la requete
exports.profil = (req, res) => {
  Utilisateur.findById(req.user.id)
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(404).send({
          message:
            "Impossible de trouver l'utilisateur avec l'id " + req.user.id,
        });
      }
      return res.send(utilisateur);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Impossible de trouver l'utilisateur avec id " + req.user.id,
        });
      }
      return res.status(500).send({
        message:
          "Impossible de récupérer l'utilisateur avec l'id " + req.user.id,
      });
    });
};

// Liste tous les utilisateurs de la base de données
exports.findAll = (req, res) => {
  Utilisateur.find()
    .then((utilisateurs) => {
      return res.send(utilisateurs);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Une erreur est survenue",
      });
    });
};

// Trouve un utilisateur par son identifiant
exports.findOne = (req, res) => {
  Utilisateur.findById(req.params.utilisateurId)
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(404).send({
          message:
            "Impossible de trouver l'utilisateur avec l'id " +
            req.params.utilisateurId,
        });
      }
      return res.send(utilisateur);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Impossible de trouver l'utilisateur avec id " +
            req.params.utilisateurId,
        });
      }
      return res.status(500).send({
        message:
          "Impossible de récupérer l'utilisateur avec l'id " +
          req.params.utilisateurId,
      });
    });
};
// Met à jour un utilisateur selon son identifiant
exports.update = (req, res) => {
  // Si l'email de l'utilisateur n'a pas été renseigné
  if (!req.body.email) {
    return res.status(400).send({
      message: "L'email de l'utilisateur est oblgatoire",
    });
  }

  Utilisateur.findByIdAndUpdate(
    req.params.utilisateurId,
    {
      nom: req.body.nom || "",
      prenom: req.body.prenom || "",
      etat: req.body.etat || "",
    },
    { new: true }
  )
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(404).send({
          message:
            "Impossible de trouver l'utilisateur avec l'id " +
            req.params.utilisateurId,
        });
      }
      return res.send(utilisateur);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Impossible de trouver l'utilisateur avec l'id " +
            req.params.utilisateurId,
        });
      }
      return res.status(500).send({
        message:
          "Impossible de mettre à jour l'utilisateur avec l' id " +
          req.params.utilisateurId,
      });
    });
};

// Supprime un utilisateur selon son identifiant
exports.delete = (req, res) => {
  Utilisateur.findByIdAndRemove(req.params.utilisateurId)
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(404).send({
          message:
            "Impossible de trouver l'utilisateur avec l'id " +
            req.params.utilisateurId,
        });
      }
      return res.send({ message: "L' utilisateur a bien été supprimé" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message:
            "Impossible de trouver l'utilisateur avec l'id " +
            req.params.utilisateurId,
        });
      }
      return res.status(500).send({
        message:
          "Impossible de supprimer l'utilisateur avec l'id " +
          req.params.utilisateurId,
      });
    });
};
