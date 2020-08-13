import React from 'react';
import {auth} from 'firebase';
import { getPeople, getPeopleQuery, addPerson } from './../util/firestore';
import { PersonItem } from './personItem';


class PeoplePane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            people: []
        };
    }

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if(user) {
                const query = getPeopleQuery(user);
                const observer = query.onSnapshot(querySnapshot => {
                    const docs = querySnapshot.docs;
                    this.setState({
                        people: docs
                    });
                    console.log(docs);
                }, err => {
                    console.log(`Encountered error: ${err}`);
                });
            }
        });
    }

    render() {
        return(
            <div>
                <ul class="list-group">
                    {this.state.people.map((person,i) => {
                        return (<PersonItem person={person.data()} documentID={person.id} index={i}/>);
                    })}
                </ul>
                <div class="input-group mb-3" style={inputGroupStyle}>
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                        </span>
                    </div>
                    <input type="text" id="inviteName" class="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" />
                    <div class="input-group-append">
                        <button class="btn btn-primary" onClick={invitePerson} >Invite Member</button>
                    </div>
                </div>
            </div>
        );
    }
}

function invitePerson() {
    const name = document.getElementById("inviteName").value;
    addPerson(name);
}

export {PeoplePane};

//////////////////////////////////////////////////

const inputGroupStyle = {
    marginTop: "30px",
};

