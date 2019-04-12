import React from 'react';
import Ul from './Ul';
import Wrapper from './Wrapper';
import Downloadable from '../../containers/StudentForm/Downloadable';

export default function Homapage(props) {
 

  return (
  <Wrapper>
    <Ul>
      <header>
    <center><h1 > WELCOME TO MSEF REGION-I</h1></center> 
   
        <div  style={{ textAlign:"left"  }}>
        
            <p>  <font size= '3'><b> The USM Region I Science and Engineering Fairs welcome public, private, and home school students
             in grades 1 through 12 to participate in the Upper or Lower fair from the following counties: 
              Adams, Amite, Clarke, Covington, Forrest, Franklin, Green, Jasper, Jefferson, Jefferson Davis, Jones, Lamar,
               Lawrence, Lincoln, Marion, Pearl River, Perry, Pike, Simpson, Smith, Walthall, Wayne, and Wilkinson. </b></font> </p>
        <div>
          <Downloadable/>
        </div>
        </div>
        </header>
        

    </Ul>
  </Wrapper>
  );
}

// List.propTypes = {
//   component: PropTypes.func.isRequired,
//   items: PropTypes.array,
// };


