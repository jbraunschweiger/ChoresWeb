import React from 'react';
import {auth} from 'firebase';
import { getChoresQuery, addChore } from './../util/firestore';
import { ChoreItem } from './choreItem';
import { ChoreModal } from './choreModal';


class ChoresPane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chores: [],
            modalChoreID: '',
            modalChore: {
                name: 'defaultName',
            },
            loading: true,
        };
    }

    updateModal(choreID, chore) {
        this.setState({
            chores: this.state.chores,
            modalChoreID: choreID,
            modalChore: chore,
            loading: this.state.loading,
        });
    }

    componentDidMount() {
        auth().onAuthStateChanged(user => {
            if(user) {
                const query = getChoresQuery(user);
                const observer = query.onSnapshot(querySnapshot => {
                    const docs = querySnapshot.docs;
                    this.setState({
                        chores: docs,
                        modalChoreID: this.state.modalChoreID,
                        modalChore: this.state.modalChore,
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
                <h1 class="display-6 text-left" style={headingStyle} >Chores</h1>
                <ul class="list-group">
                    {this.state.loading == true
                        ? <li class="list-group-item"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></li>
                        : this.state.chores.map((chore,i) => {
                            return (<ChoreItem chore={chore.data()} documentID={chore.id} index={i} showModal={this.updateModal.bind(this)}/>);
                        })
                    }
                </ul>
                <div class="input-group mb-3" style={inputGroupStyle}>
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-list-task" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
                            <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
                            <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"/>
                        </svg>
                        </span>
                    </div>
                    <input type="text" id="addName" class="form-control" placeholder="Chore" aria-label="Username" aria-describedby="basic-addon1" />
                    <div class="input-group-append">
                        <button class="btn btn-primary" onClick={addNewChore} >Add Chore</button>
                    </div>
                </div>
                <ChoreModal choreID={this.state.modalChoreID} chore={this.state.modalChore} showModal={this.updateModal.bind(this)}/>
            </div>
        );
    }
}

function addNewChore() {
    const name = document.getElementById("addName").value;
    addChore(name);
}

export {ChoresPane};

//////////////////////////////////////////////////

const inputGroupStyle = {
    marginTop: "10px",
};

const headingStyle = {
    marginTop: "20px",
    marginBottom: "10px",
};
