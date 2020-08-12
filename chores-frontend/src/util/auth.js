import { auth } from "firebase";

export { newUser };
export { signInUser };
export { signOutUser };

let currentUser;

async function newUser(email, password, displayName){
    const userPromise = auth().createUserWithEmailAndPassword(email,password);
    return userPromise.then(user => {
        user.user.updateProfile(displayName).then(() => {
            return user;
        });
    });
}

async function signInUser(email, password) {
    return auth().signInWithEmailAndPassword(email, password).then(user => {
        currentUser = user;
    });
}

async function signOutUser() {
    return auth().signOut().then(() => {
        currentUser = null;
    });
}

/*
auth().onAuthStateChanged(user => {
    currentUser = user;
})
*/

export default { newUser, signInUser, signOutUser };