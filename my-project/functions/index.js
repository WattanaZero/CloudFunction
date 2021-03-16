const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
var serviceAccount = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cloud-functionsp.firebaseio.com"
});
const db = admin.firestore();
// const agent = new http.Agent({keepAlive: true});
app.get('/name', (req, res) => {
    return res.status(200).send('Wattana Chaiyakun!');
});
app.post('/api/create', (req, res) => {
    (async () => {
        const Profile = req.query;
        const writeResult = await admin.firestore().collection('project TEST Name').add({Profile});
        res.json(` Create Success [ Profile ID ] => ${writeResult.id} `);
      })();
    // (async () => {
    //     try {
    //         await db.collection('project TEST Name').doc('/' + req.body.id + '/')
    //             .create({
    //                 Name: req.body.name,
    //                 LastName: req.body.lastname,
    //                 Age: req.body.age
    //             });
    //         return res.status(200).send();
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).send(error);
    //     }
    // })();
});
app.get('/api/read/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('project TEST Name').doc(req.params.id);
            let name = await document.get();
            let response = name.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// read all
app.get('/api/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('project TEST Name');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedItem = {
                        ID: doc.id,
                        Name: doc.data().Name,
                        Lastname: doc.data().Lastname,
                        Age: doc.data().Age
                    };
                    response.push(selectedItem);
                }
                return response;

            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// update
app.put('/api/update/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('project TEST Name').doc(req.params.id);
            await document.update({
                Name: req.body.name,
                LastName: req.body.lastname,
                Age: req.body.age
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// delete
app.delete('/api/delete/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('project TEST Name').doc(req.params.id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

exports.cloudfunctionweek2 = functions.https.onRequest(app);



