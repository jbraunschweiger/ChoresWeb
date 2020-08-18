import { functions } from 'firebase';


async function initializeUser(email, password, displayName) {
    var createUser = functions().httpsCallable('createUser');
    const userData = {
        displayName: displayName,
        email: email,
        password: password,
    }
    return createUser(userData);
}

export {initializeUser};