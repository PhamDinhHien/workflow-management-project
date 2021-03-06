import React, { Component } from 'react';
import './App.css';
import TaskForm  from './components/TaskForm';
import Control  from './components/Control';
import TaskList from './components/TaskList';
import demo from './training/demo';

class App  extends Component {

  constructor(props){
    super(props);
    this.state = {
      tasks:  [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: ''
    }
  }

  UNSAFE_componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var getAllTasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: getAllTasks
      });
    }
  }


  s4() {
    return Math.floor( 1 + Math.random() * 0x10000).toString(16).substring(1);
  }

  genarateId(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
    + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  onToggleForm = () =>{
    if(this.state.isDisplayForm && this.state.taskEditing !== null){
      this.setState({
        isDisplayForm:  true,
        taskEditing: null
      });
    }else {
      this.setState({
        isDisplayForm:  !this.isDisplayForm,
        taskEditing: null
      });
    }
    
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm:  false
    });
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    
    if(data.id === ''){
      data.id = this.genarateId();
      tasks.push(data);
    }else{
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) =>{
    var { tasks } = this.state;
    
    var index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
   
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if(task.id === id){
        result = index;
      }
    });
    return result;
  }

  onDelete = (id) =>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if(index !== -1 ){
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }

  onShowForm = () =>{
    this.setState({
      isDisplayForm:  true
    });
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase()
    });
  }

  render(){

    var { tasks, isDisplayForm, taskEditing, filter, keyword } = this.state;
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks =  tasks.filter((task) => {
        if(filter.status === -1){
          return task;
        }else{
          return task.status === (filter.status === 1 ? false : true)
        }
      });
    }

    if(keyword){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
   
    var elmTaskForm = isDisplayForm ? <TaskForm 
      onSubmit = { this.onSubmit }
      onCloseForm = { this.onCloseForm }
      taskEditing = { taskEditing }/> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản lý công việc</h1>
        </div >
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            { elmTaskForm }
          </div>
          <div className={ isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <div>
              <button type="button" className="btn btn-primary fa fa-plus" 
                onClick = { this.onToggleForm }> &nbsp; Thêm Công Việc</button>
            </div>
            <Control onSearch = { this.onSearch }/> 
            <div className="row mt-10">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                  tasks = { tasks } 
                  onUpdateStatus = { this.onUpdateStatus }
                  onDelete = { this.onDelete }
                  onUpdate = { this.onUpdate }
                  onFilter = { this.onFilter }/>
              </div>
            </div>  
          </div>
        </div>
      </div>
    )
  };
}

export default App;
