const Utilisateur = require("../models/utilisateur.model.js");
const bcrypt = require("bcryptjs");
const jwtUtils = require("jsonwebtoken");
const { secret } = require("../config");

exports.login = (req, res) => {
  const { email, password } = req.body;

  Utilisateur.findOne({ email: email })
    .then((utilisateur) => {
      if (!utilisateur) {
        res.status(403).send({
          message: "Mauvais email / mot de passe",
        });
      }

      bcrypt.compare(password, utilisateur.password).then((isMatch) => {
        if (!isMatch) {
          res.status(403).send({
            message: "Mauvais email / mot de passe",
          });
        }
        const jwt = jwtUtils.sign(
          {
            id: utilisateur._id
          },
          secret
        );
        res.send({ jwt });
      });
    })
    .catch((err) => {
      if (err.kind === "email") {
        res.status(403).send({
          message: "Mauvais email / mot de passe",
        });
      }
    });
};
