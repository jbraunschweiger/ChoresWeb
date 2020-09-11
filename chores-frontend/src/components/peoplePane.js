import React from 'react';
import {auth} from 'firebase';
import { getPeople, getPeopleQuery, addPerson } from './../util/firestore';
import { PersonItem } from './personItem';
import { PersonModal } from './personModal';


class PeoplePane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            people: [],
            modalPersonID: '',
            modalPerson: {
                name: 'defaultName',
                token: 'defaultToken'
            },
            loading: true,
        };
    }

    updateModal(personID, person) {
        this.setState({
            people: this.state.people,
            modalPersonID: personID,
            modalPerson: person,
            loading: this.state.loading,
        });
    }

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if(user) {
                const query = getPeopleQuery(user);
                const observer = query.onSnapshot(querySnapshot => {
                    const docs = querySnapshot.docs;
                    this.setState({
                        people: docs,
                        modalPersonID: this.state.modalPersonID,
                        modalPerson: this.state.modalPerson,
                        loading: false,
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
                <h1 class="display-6 text-left" style={headingStyle} >People</h1>
                <ul class="list-group">
                    {this.state.loading == true
                        ? <li class="list-group-item"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></li>
                        : this.state.people.map((person,i) => {
                            return (<PersonItem person={person.data()} documentID={person.id} index={i} showModal={this.updateModal.bind(this)}/>);
                        })
                    }
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
                <PersonModal personID={this.state.modalPersonID} person={this.state.modalPerson} showModal={this.updateModal.bind(this)}/>
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
    marginTop: "10px",
};

const headingStyle = {
    marginTop: "20px",
    marginBottom: "10px",
};
