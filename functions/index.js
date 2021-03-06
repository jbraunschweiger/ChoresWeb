const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { firebaseConfig } = require('firebase-functions');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.getUser = functions.https.onRequest((request,response) => {
    const promise = admin.firestore().doc('users/q6LpKc4BalFw11kys5OR').get();
    const p2 = promise.then(snapshot => {
        response.send(snapshot.data());
    });
    p2.catch(error => {
        console.log(error);
        response.status(500).send(error);
    });
});

exports.newUser = functions.auth.user().onCreate((user) => {
    if (!user.displayName){
        user.displayName = "Enter Name";
    }
    const documentData = {
        name: user.displayName,
    }
    //const promise = admin.firestore().collection('users').doc(user.uid).set(documentData);
    return promise;
});

exports.removeUser = functions.auth.user().onDelete((user) => {
    const promise = admin.firestore().collection('users').doc(user.uid).delete();
    return promise;
});

exports.createUser = functions.https.onCall((data, context) => {
    const userPromise = admin.auth().createUser({
        email: data.email,
        emailVerified: false,
        password: data.password,
        displayName: data.displayName,
        disabled: false
    });
    const documentPromise = userPromise.then((user) =>  {
        const documentData = {
            name: user.displayName,
        };
        return admin.firestore().collection('users').doc(user.uid).set(documentData).then((doc) => {return user;});
    });
    const collectionPromise = documentPromise.then((user)  => {
        const personData = {
            name: user.displayName,
            registered: true,
            token: 'new-placeholder-token',
            permanant: true,
            created: admin.firestore.Timestamp.now(),
        };
        const choreData = {
            name: "Your First Chore",
            permanant: true,
            created: admin.firestore.Timestamp.now(),
        };
        let promises = [];
        promises.push(admin.firestore().collection('users').doc(user.uid).collection('people').add(personData));
        promises.push(admin.firestore().collection('users').doc(user.uid).collection('chores').add(choreData));
        return Promise.all(promises).then((docs) => {return {user: user}}).catch((error) => {return {user: null}});
    });
    return collectionPromise;
});

exports.assignTasks = functions.https.onCall((data, context) => {
    let promises = [];
    promises.push(admin.firestore().collection('users').doc(context.auth.uid).collection('people').get());
    promises.push(admin.firestore().collection('users').doc(context.auth.uid).collection('chores').get());
    return Promise.all(promises).then((snapshots) => {
        let taskPromises = [];
        let iteration = 0;
        let people = snapshots[0].docs;
        let chores = snapshots[1].docs;
        
        chores.forEach((chore, index) => {
            const personIndex = (iteration + index)%(people.length); // modulus secret sauce
            const choreID = chore.id;
            const personID = people[personIndex].id;
            const personName = people[personIndex].data().name;
            taskData = {
                choreID: choreID,
                personID: personID,
                personName: personName,
                complete: false,
                created: admin.firestore.Timestamp.now(),
            }
            taskPromises.push(admin.firestore().collection('users').doc(context.auth.uid).collection("chores").doc(choreID).collection("tasks").add(taskData));
        });
        return Promise.all(taskPromises).then(() => {return});
    });
})