import React, { Component } from 'react';

class Sort  extends Component {
  render(){
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="dropdown">
                <button type="button" className="btn btn-primary ml-10" data-toggle="dropdown"> &nbsp;
         Sắp xếp <span className="fa fa-caret-square-o-down"></span></button>
                <ul className="dropdown-menu">
                    <li><a href="# " className="fa fa-sort-alpha-asc">Tên A-Z</a></li>
                    <li><a href="# " className="fa fa-sort-alpha-desc">Tên Z-A</a></li>
                </ul>
            </div>
        </div>
    )
  };
}

export default Sort;
