import React from 'react';
import { PersonModal } from './personModal';

class PersonItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-toggle="modal" data-target={'#' + this.props.documentID + "Modal"}>
                    {this.props.person.name}
                    {this.props.person.registered ? (
                        <span class="badge badge-success">joined</span>
                    ) : (
                        <span class="badge badge-danger">invited</span>
                    )}
                </button>
                <PersonModal documentID={this.props.documentID} person={this.props.person}/>
            </div>
        );
    }
}


export {PersonItem};