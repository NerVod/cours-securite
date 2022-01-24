const express = require('express');
const app = express();
const exo2 = require('./exercice-02/exercice-02');
const exo4 = require('./exercice-04/exercice-04');

const session = require('express-session');
const FileStore = require("session-file-store")(session);


const _port = 8085;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: new FileStore
}))

app.get('/', (req, res) => {
  res.send('Bonjour');
});

app.get('/:exercice', (req, res) => {
  const exercice = req.params.exercice;
  const exercices = ["exercice-01", "exercice-02", "exercice-04"];
  if (exercices.includes(exercice)) {
    res.sendFile(`${exercice}.html`, {root:`public/${exercice}`});
  } else {
    res.sendStatus(404);
  }
});


app.post('/exercice-01/connexion', (req, res) => {
  const identifiant = req.body.identifiant;
  const motDePasse = req.body.password;
  console.log(req.body.identifiant);
  console.log(req.body.password);
  
   
  
  
  if ( identifiant ===  FileStore.identifiant && motDePasse === FileStore.motDePasse) {
    res.redirect('/exercice-01/profil/1234');
  } else {
    res.sendStatus(403);
  }
});



app.get('/exercice-01/profil/:uid', (req, res) => {
  const uid = req.params.uid;
  if (uid) {
    if (uid === "1234") {
      res.sendFile("monProfil.html", {root:'public/exercice-01'});
    } else {
      res.sendFile("autreProfil.html", {root: "public/exercice-01"});
    }
  }
});

app.get('/exercice-02/connexion', (req, res) => {
  const identifiant = req.query.identifiant;
  const motDePasse = req.query.motDePasse;
  exo2.injection(identifiant, motDePasse).then(msg => {
    res.send(msg);
  });
});

app.post('/exercice-04/resetPassword', (req, res) => {
  const identifiant = req.body.identifiant;
  const couleur = req.body.couleur;
  const retour = exo4.retourDB(identifiant, couleur);
  res.send(retour);
});

app.listen(_port, () => {
  console.log(`Serveur lancé sur le port ${_port}`);
});