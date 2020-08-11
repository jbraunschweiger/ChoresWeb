import { auth } from "firebase";

export { newUser };
export { signInUser };

let currentUser;

async function newUser(email, password, displayName){
    const userPromise = auth().createUserWithEmailAndPassword(email,password);
    return userPromise.then(user => {
        user.user.updateProfile(displayName).then(() => {
            return user;
        }).catch(() => {
            return null;
        })
    }).catch(() => {
        return null;
    });
}

async function signInUser(email, password) {
    return auth().signInWithEmailAndPassword(email, password).then(user => {
        currentUser = user;
    });
}

/*
auth().onAuthStateChanged(user => {
    currentUser = user;
})
*/

export default { newUser, signInUser };