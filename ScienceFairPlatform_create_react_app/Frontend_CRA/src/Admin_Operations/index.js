
import React, { Component, Fragment } from 'react';
import { Link ,Redirect ,withRouter } from 'react-router-dom';
import DeleteJudge from './DeleteJudge';
import DeleteStudent from './DeleteStudent';
import AssignProjects from './AssignProjects';

const Admin_Operations = () =>
{
return(
    <Fragment>
         <center>
         <div>
                   <button style={{ float: "right"}} onClick ={ () => {
                       localStorage.removeItem('admin');
                       window.location.replace(localStorage.getItem("MAIN_URL1"))}}>Logout</button>
                   <br/>
                  
                  <h4>Click to check Ranks</h4><Link 	to="/rank"><button>Ranks</button></Link>
                 <br/>
                 {/* <h4>Delete a Judge from the Sciencefair Database</h4>
                 <Link to="/deletejudge"><button> Delete Judge</button></Link>
                    <br/>
                  <h4>Delete a Student from the Sciencefair Database</h4>
                 <Link 	to="/deletestudent"><button> Delete Student</button></Link> */}
     
     
               </div> <br/>
<DeleteJudge/> <br/>
<DeleteStudent/><br/>
<AssignProjects/><br/>
</center>
</Fragment>
);

};

export default Admin_Operations;