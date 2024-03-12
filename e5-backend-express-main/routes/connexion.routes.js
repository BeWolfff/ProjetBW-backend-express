module.exports = (app) => {
  const connexion = require("../controllers/connexion.controller.js");

  app.post("/login", connexion.login);
  
  // app.post("/sign-in", connexion.signIn);
  
  // app.post("/sign-out", connexion.signOut);
};
