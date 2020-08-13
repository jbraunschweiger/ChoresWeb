import { auth } from "firebase";

export { newUser };
export { signInUser };
export { signOutUser };
export { getCurrentUser };

let currentUser = null;

async function newUser(email, password, displayName){
    const userPromise = auth().createUserWithEmailAndPassword(email,password);
    return userPromise.then(user => {
        user.user.updateProfile({displayName: displayName}).then(() => {
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

function getCurrentUser() {
    return auth().currentUser;
}


auth().onAuthStateChanged(user => {
    currentUser = user;
})


export default { newUser, signInUser, signOutUser };