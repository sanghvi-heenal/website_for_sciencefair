import React from 'react';
import Wrapper from './Wrapper';
import { Link } from 'react-router-dom';
import Button from '../Button';

export default  function Instructions(props) {
  return (
    <Wrapper>
            <center><h1 > Student Registration Form </h1> </center> 
            <br/> <br/>
            <h3  ><b>Introduction</b></h3>
            <p ><font size="5">Each of the seven regional Science and Engineering Fairs (SEF) in Mississippi and the state SEF will be conducted in accordance
            with the <br/> International SEF Rules and Guidelines (<a href="https://student.societyforscience.org/intel-isef">https://student.societyforscience.org/intel-isef</a>). <br/> The sponsoring teacher will assume responsibility,
            together with the student, for compliance with these rules.</font> </p>
            <br />
            <p allign="left"><font size="5">Each student will participate in the regional fair for the county in which the school or student is located. <br/>The Region I SEF serves the following counties:  Adams, Amite, Clarke, Covington,
            Forrest, Franklin, Green, Jasper, Jefferson, Jefferson Davis, Jones, Lamar, Lawrence, Lincoln, Marion, Pearl River, Perry, Pike, Simpson, Smith, Walthall, Wayne, and Wilkinson. </font></p>
            <br />
            <p><font size="5"> Tables will be provided for each project at the fair. Each student will display copies of applicable forms (such as projects dealing with people, vertebrate animals, and chemicals) during judging.
            Every student needs to submit forms 1, 1A and 1B.
            <br/>USE THIS LINK TO DETERMINE WHICH ADDITIONAL FORMS YOU MAY NEED :  
            <a href="https://apps2.societyforscience.org/wizard/index.asp">https://apps2.societyforscience.org/wizard/index.asp</a>.<br/> Students who do not follow the rules or provide the applicable forms will be disqualified.</font></p>

            <br />
            <p><font size="5"> For more information,<br/> Call: 601-266-6845 or 601-266-4739,<br/>
            or<br/> Email : Region1msef@gmail.com <br/>kendrick.buford@usm.edu  <br/> sherry.herron@usm.edu</font></p>
                        <br />

            <h3 > <font size="6"><b>Registration </b></font> </h3>
                <ul>
                <font size="5">
                {/* <li> Registration must be Completed entirely at one go , in full until you react the final screen and click register </li> <br/> */}
                <li> Fill each of the following fields  and hit "Next" to save the current page</li><br/>
                    
                <li> Pay the fee: $25 per student or $70 for a 3-person team project. $10 penalty for late registration <br/> Checks should be made payable to Region 1 MSEF or pay online through Pay Pal  
                  <a href="https://squareup.com/store/msefregion1">https://squareup.com/store/msefregion1</a></li> <br/>

            
                <li>Order a t-shirt, if desired. $12 pre-order or $15 day of fair .<br/> Checks should be made payable to Region 1 MSEF or pay online through Pay Pal or 
                  <a href="https://squareup.com/store/msefregion1">https://squareup.com/store/msefregion1</a></li><br/>

                <li>All Competitors must upload documents online (preferred) or by email, by post or fax the forms 1, 1A and 1B before being allowed to compete </li><br/>
              
                  </font>
                </ul>
                <Link to ={ {
                  pathname: "/studentregistration" } }><Button><font size="4">Fill the Form
                                                                        </font>
                                                                        </Button></Link>


    </Wrapper>
  );
}


