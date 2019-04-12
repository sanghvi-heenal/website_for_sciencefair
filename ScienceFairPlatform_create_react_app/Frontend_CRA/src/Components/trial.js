'use strict';
import React, { Fragment } from 'react';
import './trial_css.css';


export default class trial extends React.Component {
    constructor(props) {
        super(props)
        this.state = 
        {
            displayList: [
                "book" , "pen" , "pencil" , "marker"
            ],
            data: '',
            item: '',
        }
    }

    handleList = () =>
    {
        
         const handleListItem = () =>
    {
        const listItem=  this.state.displayList.map( obj =>
            {
            return  (   
                <ul>
                  <li>
                      {obj}
                  </li>
                </ul>
            );
            }
            );
        return (
            <b>{listItem}</b>
        );
    }
    this.setState({item : handleListItem})
}
    handleChange = (e) =>
    {
        console.log("value" , e.target.value);
        this.text = e.target.value;
        console.log("text", this.text)
    }
    
    handleSubmit = () =>
    {
        this.setState( { data : this.text})
    }
    render ()
    {
        return (
            <Fragment>
               <div>
                    <input type="submit"
                        value="Get List"
                        onClick = {this.handleList} />
                        <b> {this.state.item}</b>
                    </div>
                    <div className = "trialbox">
                    <input type="text"
                        value={this.state.value}
                        onChange = {this.handleChange}
                    />
                    <input type="submit"
                            value = "Enter"
                            onClick = {this.handleSubmit}

                    />
                </div>
                <div className = "trialbox">
                {this.state.data}
                </div>
                </Fragment>
        );
    }
}