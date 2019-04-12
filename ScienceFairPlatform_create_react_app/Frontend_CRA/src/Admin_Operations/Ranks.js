import React, { Component } from 'react';
import axios from 'axios';
import Results from './Results';
import { Link ,Redirect ,withRouter } from 'react-router-dom';

export class Ranks extends React.PureComponent {
    
    constructor(props){
        super(props); 
        this.state={
            s_class:-1,
            category:-1,
            value:'',
            show: false,
            show_error: false,
            rankList: {},
            rankStatus:'',
        } 
        this.handleSubmit = this.handleSubmit.bind(this);
    }
        validationCheckClass =(event) =>
        {
            this.setState({s_class : event.target.value});
        }
        validationCheckCategory= (event) =>
        {     
            this.setState({category: event.target.value});
        }

        async handleSubmit(event) 
        {
            const {s_class , category} = this.state;
            const getRank = 
            {
                s_class : s_class,
                category: category
            }
            console.log("rank ",getRank);
            const res =  await axios.get( localStorage.getItem("MAIN_URL2")+'/api/admin/getranks', {
                params: {
                  s_class: getRank.s_class,
                  category: getRank.category,
                },
              });
              
              if (res.status == 200 ) {
                  console.log("data", res.data);
               // console.log("ranklist" , data.rankList);
               this.setState({
                   show : true,
                    rankList: res.data.rankList,
                    rankStatus : "",  
                             })
                //this.setState({show: true ,rankStatus : "No Data Found"})
                //localStorage.setItem('ranks', JSON.stringify(show));
                //this.props.history.push('/admin')
               
            }
            else{
            console.log('404 found',);
            this.setState({ show_error: true,rankStatus : "No Data Found"  });
            return null;
            }
    
        }

    render()
    {
        const { show, rankList} = this.state;
        return(
            <React.Fragment>

<button style={{ float: "right"}}
        onClick ={ () => {
            localStorage.removeItem('admin');
            window.location.replace(localStorage.getItem("MAIN_URL1"))}}>Logout</button>
    
           <br/><br/>
           <center>
                        <label>
                        Class:
                        </label>
                        <select
									ref="s_class"
									
                                    required
									defaultValue={this.state.s_class}
                                    onBlur={this.validationCheckClass}
                                    style={{border: '1px solid black'}}
								>
                                <option value="-1">
										Select Grade
									</option>
									<option value="1">
										Grades 1,2,3 Class(I)
									</option>
									<option value="2">
										Grades 4,5,6 Class(II)
									</option>
                                </select>
            <br/>
                        <label>
                        Category:
                        </label>
                        <select
									ref="category"
									autoComplete="off"
									required
									defaultValue={this.state.category}
                                    onBlur={this.validationCheckCategory}
                                    style={{border: '1px solid black'}}
								>
                                    <option value="-1">
										Select Category
									</option>
									<option value="100">
										100 Behavioral & Social Sciences
									</option>
									<option value="200"> 200 Biochemistry</option>
									<option value="300">
										300 Inorganic Chemistry
									</option>
									<option value="400">
										400 Organic Chemistry
									</option>
									<option value="500">
										500 Earth & Environmental Sciences
									</option>
									<option value="600">
										600 Animal Sciences
									</option>
									<option value="700">
										700 Biomedical and Health Science</option>
									<option value="800"> 800 Microbiology</option>
									<option value="900">900 Physics and Astronomy</option>
									<option value="1000">1000 Engineering and Mechanics</option>
									<option value="1100">
										1100 Mathematics and System Software
									</option>
									<option value="1200">1200 Robotic and Intelligent Machines </option>
									<option value="1300">
										1300 Botony
									</option>
						</select>    
                        <br/><br/>
                    <input
                    type="submit"
                    value="Results"
                    onClick={this.handleSubmit}
                     style={{border: '1px solid black'}} />
                    <h2>{this.state.rankStatus}</h2>                
                    </center>
       
       {show && <Results rankList = {rankList}/>}
       

            </React.Fragment>


        );
    }
}
export default withRouter (Ranks);