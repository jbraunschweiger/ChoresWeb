import React from 'react';
import { getCurrentUser, signOutUser } from './../util/auth';
import { getPeople } from './../util/firestore';
import {auth} from 'firebase';
import { PeoplePane } from './peoplePane';

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
                userEmail: user.email,
                userDisplayName: user.displayName
            });
        }
        auth().onAuthStateChanged((user)=>{
            if (user){
                this.setState({
                    userID: user.uid,
                    userEmail: user.email,
                    userDisplayName: user.displayName
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
                        Hello, {this.state.userDisplayName}
                        </a>
                        <div class="dropdown-menu dropdown-menu-lg-right" aria-labelledby="navbarDropdown">
                            <button class="dropdown-item" onClick={signOutUser}>Sign Out</button>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item btn-danger" onClick={signOutUser}>Sign Out</button>
                        </div>
                    </a>
                </nav>
             
                <div class="container" style={containerStyle}>
                    <div class="row">
                        <div class="col-md">
                            <PeoplePane></PeoplePane>
                        </div>
                        <div class="col-md">
                            <PeoplePane></PeoplePane>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export {Home};

export default Home;

function testGetPeople() {
    getPeople().then(snapshot => {
        console.log(snapshot);
    });
}

//////////////////////////////////////////////////

const containerStyle = {
    marginTop: "60px",
};

const logoURL = "https://image.flaticon.com/icons/svg/56/56930.svg";