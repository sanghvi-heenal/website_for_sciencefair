import React from 'react';
// import Table from 'reactjs-bootstrap-table';
import { Table } from 'react-bootstrap'
const inputParsers = {
  date(input) {
    const [month, day, year] = input.split('/');
    return `${year}-${month}-${day}`;
  },
  uppercase(input) {
    return input.toUpperCase();
  },
  number(input) {
    return parseFloat(input);
  },
};

class Registeruser extends React.Component {
  constructor() {
    super();
	this.state = {
          category_name: '',
		  data:[
		  ]
          
        };
  
  }
 
  componentDidMount() {
		
    fetch(localStorage.getItem("MAIN_URL2")+'/api/user/userlist', {
   method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
	})
   .then((response) => response.json())
   .then((res) => {
        if(res.code==200){

            this.setState({data:res.data});

        }
        else {
          console.log('something went wrong ');
          return false;
        }
   })  
   .catch((error) => {

   });

}


  render() {
	  var user_model=JSON.stringify(this.state.data);
	  console.log("hello"+user_model);
    return (
       <div>
	    <h2>All Register User List</h2>
		<Table responsive className="Tableclass">
  <thead>
    <tr>
      <th>#</th>
      <th>Student Name</th>
      <th>Grade</th>
      <th>Email</th>
      <th>Project name</th>
      <th>Project Doc</th>
      <th>Summer doc</th>
    
    </tr>
  </thead>
  <tbody>
  { user_model ? 
  this.state.data.map(cat =>
					
					  <tr>
      <td>{cat._id}</td>
      
      <td>{cat.s_name1}</td>
      <td>{cat.grade}</td>
      <td>{cat.teacher_email}</td>
      <td>{cat.project_title}</td>
      <td><a  target="_blank" href={localStorage.getItem("MAIN_URL2")+'/project_summery/'+ cat.summary_doc}>{cat.summary_doc}</a></td>
   
      <td><a  target="_blank" href={localStorage.getItem("MAIN_URL2")+'/form/' + cat.form_doc}>{cat.form_doc}</a></td>
    </tr>						)
  
	 : ''	}
    
  </tbody>
</Table>;
	   </div>
    );
  }
}

export default Registeruser;  