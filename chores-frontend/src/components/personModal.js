import React from "react";

class PersonModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div class="modal fade" id={this.props.modalID} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> {this.props.person.name} </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <input class="form-control" type="text" id={this.props.modalID + 'TokenText'} value={this.props.person.token} readOnly disabled />
                            <div class="input-group-append">
                                <button class="btn btn-secondary" type="button" id={this.props.modalID + 'TokenButton'} onClick={()=>{copyToken(this.props.modalID + 'TokenText', this.props.modalID + 'TokenButton')}}>Copy</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
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

export {PersonModal};