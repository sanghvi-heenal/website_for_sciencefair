import React from 'react';
import Ul from './Ul';
import Wrapper from './Wrapper';
import { Link } from 'react-router-dom';
import Button from '../Button';



export default function Fairs(props) {
 
 const page= "../Instructions/index.js";
  return (
 
   
    <center>
      <br/><br/><br/>
         <h1>Region-I Science and Engineering Fair</h1> <br/><br/>
        <div>
        <br/>
                <h1 >LOWER FAIR DETAILS</h1>
                <br/><br/>
        <table  width="80%" >
        <tbody>
            <tr><td><b> Date of fair:</b></td><td> <b>12th APRIL 2019</b></td></tr>
            <tr><td><b>Date of Late Registration: </b></td><td><b> 31st March 2019</b></td></tr>
            <tr><td><b>Check-in:</b></td><td><b>8AM </b></td></tr>
            <tr><td><b>Time: </b></td><td><b> 9AM</b></td></tr>
            <tr><td><b>Place: </b></td><td><b>THAD COCHRAN CENTER</b></td></tr>
            </tbody>
        </table>
        <Link to ={ {
         pathname: page } }><Button><font size="4">Student Registartion</font></Button></Link>
        </div>

        <div>    
          <h1 >UPPER FAIR DETAILS</h1><br/><br/>

         <table  width="80%" >
          <tbody>
          <tr><td><b> Date of fair:</b></td><td><b> 15th FEBRUARY 2019</b></td></tr>
          <tr><td><b>Date of Late Registration:</b></td><td><b> 2nd FEBRUARY 2019</b></td></tr>
          <tr><td><b>Check-in:</b></td><td><b>8AM</b></td></tr>
          <tr><td><b>Time:</b></td><td><b>9AM</b></td></tr>
          <tr><td><b>Place:</b></td><td><b>THAD COCHRAN CENTER</b></td></tr>
          </tbody> 
         </table>
          <Button><font size="4">Student Registartion </font> </Button>
                                 
        </div>
        </center>

   
 
  );
}

// List.propTypes = {
//   component: PropTypes.func.isRequired,
//   items: PropTypes.array,
// };


