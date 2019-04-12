import React from 'react';
import { Link } from 'react-router-dom';
import './look.css';

class typeoffair extends React.Component 
{
render() {
    
    return (
  <div  style={{WebkitTextFillColor: "White" }}>
  <center>
      <br/><br/><br/>
         <h1>Region-I Science and Engineering Fair</h1> <br/><br/>
        <div>    
      <h1 >UPPER FAIR DETAILS</h1><br/><br/>

      <table cellpadding="2" width="50%" border="2" cellspacing="4" className="fairs1" >
    
          <tr><td><b> Date of fair:</b></td><td><b> 15th February 2019</b></td></tr>
          <tr><td><b>Date of Late Registration:</b></td><td><b> 2nd February 2019</b></td></tr>
          <tr><td><b>Check-in:</b></td><td><b>8AM</b></td></tr>
          <tr><td><b>Time:</b></td><td><b>9AM</b></td></tr>
          <tr><td><b>Place:</b></td><td><b>THAD COCHRAN CENTER</b></td></tr> 
          </table>
          <br/><br/>
    <button style={{WebkitTextFillColor : "Brown"}}><font size="5">Student Registration </font> </button>

        </div>
       
        <div>
        <br/><br/><br/><br/><br/>
                <h1 >LOWER FAIR DETAILS</h1>
                <br/><br/>
      <table cellpadding="2" width="50%" border="2" cellspacing="4" class="fairs2">
            <tr><td><b> Date of fair:</b></td><td> <b>15th April 2019</b></td></tr>
            <tr><td><b>Date of Late Registration: </b></td><td><b> 11th April 2019</b></td></tr>
            <tr><td><b>Check-in:</b></td><td><b>8am </b></td></tr>
            <tr><td><b>Time: </b></td><td><b> 9am</b></td></tr>
            <tr><td><b>Place: </b></td><td><b>THAD COCHRAN CENTER</b></td></tr>
            </table>
        <br/><br/>
          <Link to ={ {
         pathname: "/instructions" 
} }> <button style={{WebkitTextFillColor: "Brown" }}><font size="5">Student Registration</font></button></Link>
        
        </div>
        </center>
    </div> );
}
}


export default typeoffair;