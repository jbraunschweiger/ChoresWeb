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
        registered: false,
        token: "placeholder-token"
    };
    return db.collection("users").doc(user.uid).collection("people").add(documentData);
}

export { getPeople };
export { getPeopleQuery };
export { addPerson };