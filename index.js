const express = require("express");
const app = express();

app.use("/private/*", (req, res) => {
    // traitement
    const autenthicated = true;
    // au lieu du booleen, on doit vérifier la session ou le token
    if(autenthicated){
        console.log("Utilisateur autorisé à consulter la page");
        next()
    } else {
        next(
            new Error("Utilisateur n'a pas la permission")
        )
    }
}) 

app.get("/public/espace-public", (req, res) => {
    res.send("Public")
});
app.get("/private/espace-prive", (req, res) => {
    res.send("Prive")
});

app.get("/private/espace-prive/compte/:id", (req, res) => {
let id = "Id inconnu";
// if(req.params && req.params.id) {
//     let id = req.params.id
// }
// ou 
if(req?.params?.id) {
    id = req.params.id;
}
    res.send("Prive : compte " + id)
});




app.use((error, req, res, next) => {
    res.status(403).send("Accès interdit")
})

app.listen(8080, () => {
    console.log("serveur écoute le port 8080")
})