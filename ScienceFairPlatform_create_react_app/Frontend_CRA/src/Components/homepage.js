import React from 'react';
import Carousel1 from './Carousel1';
import ApplicationPDF from './ApplicationPDF';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./look.css" ;



 
class Homepage extends React.Component {   
render() {
    console.log('props homepage: ', this.props)
   return  (  
   <div className="home-class" >
   <br/><br/><br/><br/><br/>
   <header>
    <center><h1 style={{WebkitTextFillColor: "white"}}> WELCOME TO MSEF REGION-I</h1></center> 
   
        <div  className="homepage" style={{ textAlign:"left" ,WebkitTextFillColor: "White" }}>
        
        <p className="homepara">  <font size= '5'><b> The USM Region I Science and Engineering Fairs welcome public, private, and home school students
         in grades 1 through 12 to participate in the Upper or Lower fair from the following counties: 
          Adams, Amite, Clarke, Covington, Forrest, Franklin, Green, Jasper, Jefferson, Jefferson Davis, Jones, Lamar,
           Lawrence, Lincoln, Marion, Pearl River, Perry, Pike, Simpson, Smith, Walthall, Wayne, and Wilkinson. </b></font> </p>
    
    </div>
        </header>
        <center>
        <table>

            <tr><center><Carousel1/></center><ApplicationPDF/></tr>
            </table>
            </center>
        
        
    
     
    </div>
    
    );
     }
}

// homepage.PropTypes = {
//     displayForm: PropTypes.func
// };

// const mapStateToProps = () => {
//     return {
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         displayForm: () => {
//             dispatch(displayForm());
//         }
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(homepage);

export default Homepage;