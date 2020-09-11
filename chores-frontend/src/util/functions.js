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

async function reassignTasks() {
    var assignTasks = functions().httpsCallable('assignTasks');
    return assignTasks();
}

export { initializeUser };
export { reassignTasks };