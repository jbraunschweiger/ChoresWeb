import { firestore } from "firebase";
import { getCurrentUser } from "./auth";

const db = firestore()

async function getPeople() {
    const user = getCurrentUser();
    if(user){
        return db.collection("users").doc(user.uid).collection("people").get();
    }
}

function getPeopleQuery(user) {
    if(user){
        const query = db.collection("users").doc(user.uid).collection("people");
        console.log('penis');
        return query;
    }
}

async function getChores() {
    const user = getCurrentUser();
    if(user){
        return db.collection("users").doc(user.uid).collection("chores").get();
    }
}

async function addPerson(name) {
    const user = getCurrentUser();
    const documentData = {
        name: name,
        permanant: false,
        registered: false,
        token: "placeholder-token",
        created: firestore.Timestamp.now()
    };
    return db.collection("users").doc(user.uid).collection("people").add(documentData);
}

function getChoresQuery(user) {
    if(user){
        const query = db.collection("users").doc(user.uid).collection("chores").orderBy("created");
        console.log('penis');
        return query;
    }
}

async function updatePersonName(documentID, name) {
    const user = getCurrentUser();
    if (user) {
        const updateData = {
            name: name,
        };
        return db.collection('users').doc(user.uid).collection('people').doc(documentID).update(updateData);
    }
}

async function deletePerson(documentID) {
    const user = getCurrentUser();
    if (user) {
        return db.collection('users').doc(user.uid).collection('people').doc(documentID).delete();
    }
}

async function deleteChore(documentID) {
    const user = getCurrentUser();
    if (user) {
        return db.collection('users').doc(user.uid).collection('chores').doc(documentID).delete();
    }
}

async function updateChoreName(documentID, name) {
    const user = getCurrentUser();
    if (user) {
        const updateData = {
            name: name,
        };
        return db.collection('users').doc(user.uid).collection('chores').doc(documentID).update(updateData);
    }
}

async function addChore(name) {
    const user = getCurrentUser();
    const documentData = {
        name: name,
        permanant: false,
        created: firestore.Timestamp.now()
    };
    return db.collection("users").doc(user.uid).collection("chores").add(documentData);
}

function getTasksQuery(user, choreID) {
    if(user){
        const query = db.collection("users").doc(user.uid).collection("chores").doc(choreID).collection("tasks");
        console.log(query);
        return query;
    }
}

export { getPeople };
export { getPeopleQuery };
export { addPerson };
export { updatePersonName };
export { deletePerson };
export { getChores };
export { getChoresQuery };
export { addChore };
export { updateChoreName };
export { deleteChore };
export { getTasksQuery };