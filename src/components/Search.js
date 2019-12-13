import React, { Component } from 'react';

class Search  extends Component {

  constructor(props){
    super(props);
    this.state = {
      keyword: ''
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value
    });
  }

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  }

  render(){
    var { keyword } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
              <input 
                type="text" 
                name="keyword" 
                id="input"
                className="form-control width-80" 
                required="required" 
                placeholder="Nhập từ khóa..." 
                value = { keyword }
                onChange = { this.onChange }/>
                  <button 
                    type="button" 
                    className="btn btn-primary fa fa-search"
                    onClick = { this.onSearch }> 
                  &nbsp; Tìm</button>
          </div>
      </div>
    )
  };
}

export default Search;
