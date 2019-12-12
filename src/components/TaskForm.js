import React, { Component } from 'react';

class TaskForm  extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name : '',
            status: false
        };
    }

    UNSAFE_componentWillMount(){
        if(this.props.taskEditing){
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.taskEditing){
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status
            });
        }else if(!nextProps.tasks) {
            this.setState({
                id: '',
                name : '',
                status: false
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(target.name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

  render(){
      var { id }  = this.state;
    return (
        <div className="card">
            <div className="card-header">
                <h3>{ id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}<span className="fa fa-times-circle txt-right" onClick={ this.onCloseForm }></span></h3>
            </div>
            <div className="card-body">
            
                <form onSubmit={ this.onSubmit }>
                <div className="form-group">
                    <label>Tên:</label>
                    <input type="text" 
                        name="name" 
                        className="form-control" 
                        value={ this.state.name } 
                        onChange = { this.onChange }
                    />
                </div>
                    <label>Trạng thái:</label>
                    <select name="status" 
                        id="input"
                        className="form-control"
                        value={ this.state.status }
                        onChange={ this.onChange }>
                        <option value={ true }>Kích hoạt</option>
                        <option value={ false }>Ẩn</option>
                    </select>
                    <div className="txt-center">
                        <button type="submit" className="btn btn-primary mrig-5"  disabled={!this.state.name }> <i className="fa fa-plus"></i> &nbsp; Lưu lại</button>
                        <button type="button" className="btn btn-danger" onClick = { this.onClear }> <i className="fa fa-close"></i> &nbsp;Hủy bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    )
  };
}

export default TaskForm;
