import React from "react";
import {updatePersonName, deletePerson} from './../util/firestore';

class PersonModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
    }

    updatePerson() {
        const newName = document.getElementById('modalNameInput').value;
        if (newName) {
            if(newName.length > 0){
                this.setState({loading: true}, () => {
                    updatePersonName(this.props.personID, newName).then(() => {
                        this.setState({loading: false});
                        const newModalData = {
                            name: newName,
                            token: this.props.person.token
                        }
                        document.getElementById('modalNameInput').value = '';
                        this.props.showModal(this.props.personID, newModalData)
                    }).catch(() => {
                        this.setState({loading: false});
                        alertUser("Member update failed, please try again.");
                    })
                });
            } else {
                alertUser("Enter a new name to update.");
            }
        } else {
            alertUser("Enter a new name to update.");
        }
    }

    deletePerson() {
        const confirmName = document.getElementById('modalConfirmName').value;
        if (confirmName) {
            if(confirmName === this.props.person.name) {
                deletePerson(this.props.personID).then(() => {
                    document.getElementById('modalConfirmName').value = '';
                    console.log("Deletion Successful");
                }).catch((err) => {
                    console.log(err);
                    alertUser("Member delete failed, please try again.");
                });
            } else {
                alertUser("Enter the member's name exactly to deactivate their account.");
            }
        } else {
            alertUser("Enter the member's name exactly to deactivate their account.");
        }
    }

    render() {
        return(
            <div class="modal fade" id="personModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> {this.props.person.name} </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h5 class='text-left'>Invite Token</h5>
                        <div class="input-group mb-3">
                            <input class="form-control" type="text" id='modalTokenText' value={this.props.person.token} readOnly disabled />
                            <div class="input-group-append">
                                <button class="btn btn-secondary" type="button" id='modalTokenButton' onClick={()=>{copyToken('modalTokenText', 'modalTokenButton')}}>Copy</button>
                            </div>
                        </div>
                        <hr />
                        <h5 class='text-left'>Edit Member Data</h5>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>
                                </span>
                            </div>
                            <input type="text" id="modalNameInput" class="form-control" placeholder={this.props.person.name} aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <hr />
                        <h5 class='text-left'>Deactivate Member</h5>
                        <div class="input-group mb-3">
                            <input type="text" id="modalConfirmName" class="form-control" placeholder="Confirm member name" aria-label="Username" aria-describedby="basic-addon1" />
                            <div class="input-group-append">
                                <button class="btn btn-danger" onClick={this.deletePerson.bind(this)} data-dismiss="modal" >Permanently Deactivate</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" id="modalSaveChanges" class="btn btn-primary" onClick={this.updatePerson.bind(this)}>
                            {this.state.loading == true
                                ?<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                :'Save Changes'
                            }
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

function copyToken(textID, buttonID) {
    var copyText = document.getElementById(textID);

    copyText.select(); 
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");

    var copyButton = document.getElementById(buttonID);
    copyButton.innerHTML = " ✓ ";
}

function alertUser(message) {
    alert(message);
}

export {PersonModal};