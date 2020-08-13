import React from 'react';
import { getCurrentUser, signOutUser } from './../util/auth';
import {auth} from 'firebase';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentUser: null};
    }

    componentDidMount() {
        const user = getCurrentUser();
        if(user) {
            this.setState({
                userID: user.uid,
                userEmail: user.email
            });
        }
        auth().onAuthStateChanged((user)=>{
            if (user){
                this.setState({
                    userID: user.uid,
                    userEmail: user.email
                });
            } else {
                window.location.href=('/');
            }
        });
    }

    render() {
        return (
            <div>
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand" href="/">
                        <img src={logoURL} width="30" height="30" class="d-inline-block align-top" alt="" />
                        Cove
                    </a>
                    <a class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Hello, {this.state.userEmail}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <button class="dropdown-item" onClick={signOutUser}>Sign Out</button>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item btn-danger" onClick={signOutUser}>Sign Out</button>
                        </div>
                    </a>
                </nav>
                <h1>Hello, world!</h1>
                {this.state.userID ? (<h1> User ID: {this.state.userID}</h1>) : (<h1>Not signed in</h1>)}
                <button onClick={signOutUser}> Sign Out</button>
            </div>
        );
    }
}

export {Home};

export default Home;

const logoURL = "https://image.flaticon.com/icons/svg/56/56930.svg";