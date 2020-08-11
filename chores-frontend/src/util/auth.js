import {auth} from "firebase";

export { newUser };

function newUser(email, password, displayName){
    const userPromise = auth().createUserWithEmailAndPassword(email,password);
    userPromise.then(user => {
        user.user.updateProfile(displayName).then(() => {
            return user;
        }).catch(() => {
            return null;
        })
    }).catch(() => {
        return null;
    });
}

export default { newUser };