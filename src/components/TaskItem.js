import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class TaskItem extends Component {

    onUpdateStatus = () => {
        var { task } = this.props;
        this.props.onUpdateStatus(task.id);
    }

    onDelete = () => {
        var { task } = this.props;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'May co muon xoa',
            buttons: [
                {
                  label: 'Yes',
                  onClick: () =>  this.props.onDelete(task.id)
                },
                {
                  label: 'No'
                }
              ]
        });  
    }

    onUpdate = () => {
        var { task } = this.props;
        this.props.onUpdate(task.id);
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td> { index + 1 }</td>
                <td> { task.name }</td>
                <td className="txt-center"> 
                    <span 
                    className= {task.status === true ? 'label label-danger hover-status' : 'label label-success hover-status'}
                    onClick = { this.onUpdateStatus }
                    >{ task.status === true ? 'Kích hoat' : 'Ẩn' }</span>
                </td>
                <td className="txt-center">
                    <button type="button" className="btn btn-warning fa fa-pencil mrig-5" onClick={ this.onUpdate }> &nbsp; Sửa</button>
                    <button type="button" className="btn btn-danger fa fa-trash" onClick={ this.onDelete }> &nbsp; Xóa</button>
                </td>
            </tr>
        )
    };
}

export default TaskItem;
