import React from 'react';
import { auth } from 'firebase';
import { getTasksQuery } from './../util/firestore';

class ChoreItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            asignee: "Nobody",
            complete: false,
            loading: true
        }
    }

    componentDidMount(){
        auth().onAuthStateChanged(user => {
            if(user){
                const query = getTasksQuery(user, this.props.documentID)
                const observer = query.onSnapshot(querySnapshot => {
                    const docs = querySnapshot.docs
                    if(docs.length > 0) {
                        this.setState({
                            tasks: docs,
                            asignee: docs[0].data().personName,
                            complete: docs[0].data().complete,
                            loading: false,
                        });
                        console.log(docs[0].data().personName);
                    } else {
                        this.setState({
                            tasks: [],
                            asignee: this.state.asignee,
                            complete: this.state.complete,
                            loading: false,
                        });
                    }
                }, err => {
                    console.log(`Encountered error: ${err}`);
                });
            }
        })
    }

    render() {
        return(
            <a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-toggle="modal" data-target='#choreModal' onClick={() => this.props.showModal(this.props.documentID, this.props.chore)}>
                {this.props.chore.name}
                {this.state.loading ? (
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    this.state.complete ? (
                        <span class="badge badge-success">{this.state.asignee}</span>
                    ) : (
                        <span class="badge badge-danger">{this.state.asignee}</span>
                    )
                )}
            </a>
        );
    }
}


export {ChoreItem};