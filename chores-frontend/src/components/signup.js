import React from 'react';
import { signInUser } from './../util/auth';
import { initializeUser } from './../util/functions';

function Signup() {
    return (
        <form class="form-signin" style={pageStyles} onsubmit={submit}>
            <div class="form-group" style={formStyles}>
                <img class="mb-4" src={logoURL} alt="" width="72" height="72" />
                <h1 class="h3 mb-3 font-weight-heavy">Please Sign Up</h1>
                <div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style={inputStylesTop}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                        </span>
                    </div>
                    <label for="inputName" class="sr-only">Name</label>
                    <input type="text" id="inputName" class="form-control" style={inputStylesTop} placeholder="Your Name" required autofocus />
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style={inputStylesMiddle}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/>
                            </svg>
                        </span>
                    </div>
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" id="inputEmail" class="form-control" style={inputStylesMiddle} placeholder="Email Address" required autofocus />
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style={inputStylesMiddle}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M11.5 8h-7a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-7-1a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7zm0-3a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
                            </svg>
                        </span>
                    </div>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" style={inputStylesMiddle} placeholder="Password" required />
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style={inputStylesBottom}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z"/>
                                <path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
                            </svg>
                        </span>
                    </div>
                    <label for="confirmPassword" class="sr-only">Confirm Password</label>
                    <input type="password" id="confirmPassword" class="form-control" style={inputStylesBottom} placeholder="Confirm Password" required />
                </div>
                </div>
                <button type="button" style={buttonStyles} class="btn btn-primary" onClick={submit}>Sign Up</button>
                <p class="mt-5 mb-3 text-muted"> Already have an account? <a href="/login">Sign in!</a></p>
                
                <div class="alert alert-danger" role="alert" id="signup-failed" hidden={true}>
                    Signup failed, please try again.
                </div>
            </div>
        </form>
    );
}

export default Signup;

function submit() {
    const name = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const password1 = document.getElementById("inputPassword").value;
    const password2 = document.getElementById("confirmPassword").value;

    const allFieldsExist = checkEnteredFields(name, email, password1, password2);
    const passwordsValid = checkPasswordsValid(password1, password2);

    if (allFieldsExist && passwordsValid) {
        return initializeUser(email, password1, name).then(user => {
            signInUser(email, password1).then(() => {
                window.location.href = "/home";
            }).catch(error => {
                alertUser("Signup failed, please try again.");
                console.log(error);
            });
        }).catch(error => {
            alertUser("Signup failed, please try again.");
            console.log(error);
        });
    }
}

function checkEnteredFields(name, email, pass1, pass2) {
    if(!name) {
        alertUser("You must enter your name.");
        return false;
    }
    if(!email) {
        alertUser("You must enter your email.");
        return false;
    }
    if(!pass1) {
        alertUser("You must enter a password.");
        return false;
    }
    if(!pass2) {
        alertUser("You must confirm your password.");
        return false;
    }
    return true;
}

function checkPasswordsValid(pass1, pass2) {
    if(pass1.length < 6) {
        alertUser("Entered password is too short.")
        return false;
    } 
    if(pass1 !== pass2) {
        alertUser("Entered passwords dont match.");
        return false;
    }
    return true;
}

function alertUser(message) {
    const alert = document.getElementById("signup-failed");
    alert.innerHTML = message;
    alert.hidden = false;
}

//////////////////////////////////////////////////

const formStyles = {
    width: "100%",
    maxWidth: "330px",
    padding: "15px",
    margin: "auto",
};

const inputStylesTop = {
    marginBottom: "-1px",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
};

const inputStylesMiddle = {
    marginTop: "-1px",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    marginBottom: "-1px",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
};

const inputStylesBottom = {
    marginTop: "-1px",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
};

const buttonStyles = {
    marginTop: "20px",
    width: "100%",
}

const pageStyles = {
    display: "flex",
    msFlexAlign: "center",
    alignItems: "center",
    paddingTop: "40px",
    paddingBottom: "40px",
}

const logoURL = "https://image.flaticon.com/icons/svg/56/56930.svg";