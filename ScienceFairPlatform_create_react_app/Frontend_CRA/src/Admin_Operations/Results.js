import React, { Component } from 'react';
import axios from 'axios';
import { Link ,Redirect ,withRouter } from 'react-router-dom';

export class Results extends React.PureComponent {
    constructor(props){
        super(props); 
        this.state={
            value:'',
            show: false,
            show_error: false,
            rankStatus:'',
        } 
   
    }
    render()
    {
        const { rankList} = this.props;
        console.log("rankList in reasults ",rankList.rankList);
        
        const b = Object.values(rankList);
        console.log("values" , b)
        const t = Object.values(rankList).map(function(rank)
        {
            console.log("rank map ", rank)
        })
                var column = [ 's_name1', 's_name2', 'project_id', 
        'project_title' , 'category','class','average_score','std_deviation' ,'z_score','rank',];
        console.log("column", column);

        var tableHeaders = (<thead>
          <tr>
            {column.map(function(column) {
              return <th>{column}</th>; })}
          </tr>
      </thead>);
      var tableBody = Object.values(rankList).map(function(rankList) {
        return (
          
          <tr>
            {column.map(function(column) {
              return <td>{rankList[column]}</td>; })}
          </tr>
          ); });
        return(
           <div>
                <table className="table table-bordered table-hover"
                  width="50%"
                  border="3" 
                  cellspacing="3"
                  cellpadding="2">
        {tableHeaders}
        {tableBody}
      </table>
           </div> 
        );
    }
}
export default Results;