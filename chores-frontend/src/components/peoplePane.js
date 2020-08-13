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
                        return (<PersonItem person={person.data()} documentID={person.id} />);
                    })}
                </ul>
                <input type="text" id="inviteName" class="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" />
                <button class="btn btn-primary" onClick={invitePerson} >Invite Member</button>
            </div>
        );
    }
}

function invitePerson() {
    const name = document.getElementById("inviteName").value;
    addPerson(name);
}

export {PeoplePane};
