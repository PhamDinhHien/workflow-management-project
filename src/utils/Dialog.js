import React, { Component } from 'react';

class Dialog  extends Component {

    onDelete = () => {
        var { task } = this.props;
        console.log(task)
        this.props.onDelete(task.id)
       
    }
  
  render(){  
    return (
        <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {/* <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onDelete = { this.onDelete }>Delete</button>
            </div>
          </div>
        </div> */}
        </div>
    )
  };
}

export default Dialog;