const utilisateurs = [
  {
    id: "ifocop",
    couleur: "rouge"
  },
  {
    id: "tom",
    couleur: "bleu"
  },
  {
    id: "admin",
    couleur: "vert"
  },
  {
    id: "larry",
    couleur: "jaune"
  }
];

const retourDB = (identifiant, couleur) => {
  let retour = "Identifiant non trouvé."
  utilisateurs.forEach(utilisateur => {
    if (utilisateur.id === identifiant) {
      if (utilisateur.couleur === couleur) {
        retour = "Bravo, vous avez réussi à accéder à la ressource.";
        return;
      }
      retour = "La couleur entrée n'est pas la bonne.";
      return;
    }
  });
  return retour;
};

module.exports = { retourDB };