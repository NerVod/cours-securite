const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "security";

const connexion = (identifiant, motDePasse) => {
  return client.connect().then(() => {
    const collection = client.db(dbName).collection("utilisateurs");
    return collection.findOne({
      identifiant,
      password: motDePasse,
    })
      .then(resultat => {
        if (resultat) {
          return true;
        }
        return false;
      })
      .catch(erreur => console.log(erreur));
  });
}

module.exports = { connexion };