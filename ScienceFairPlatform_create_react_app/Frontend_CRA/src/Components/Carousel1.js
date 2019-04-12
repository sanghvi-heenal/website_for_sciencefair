import React from "react";
import { Carousel } from "react-responsive-carousel";
import one from '../Images/one.jpg';
import three from '../Images/three.jpg';
import four from '../Images/four.jpg';
import five from '../Images/five.jpg';
import two from '../Images/two.jpeg';
import six from '../Images/msef.jpg';
import seven from '../Images/other1.JPG';
import eight from '../Images/other2.JPG';

import eleven from '../Images/eleven.jpg';
import last from '../Images/last.jpg';



import './look.css';

class Carousel1 extends React.Component
{
    render()
    {
        return(
         

  <Carousel  autoPlay={true} 
             infiniteLoop = {true}  
             interval= "2000"
             showArrows={false}
             stopOnHover={false}>
    
  <div>
      <img src={six} alt="Images" />
          <p className="legend">usm2</p>
      </div>
    <div>
    <img src={five} alt="Images" />
      <p className="legend">usm1</p>
      </div>
      
      <div>
        <img src={four} alt="Images" />
      <p className="legend">usm2</p>
      </div>
      <div>
        <img src={one} alt="Images" />
      <p className="legend">usm2</p>
      </div>
      <div>
        <img src={two} alt="Images" />
      <p className="legend">usm2</p>
      </div>
      <div>
        <img src={seven} alt="Images" />
      <p className="legend">usm2</p>
      </div>
      <div>
        <img src={eight} alt="Images" />
      <p className="legend">usm2</p>
      </div>
      <div>
        <img src={three} alt="Images" />
      <p className="legend">usm2</p>
      </div>
     
      <div>
        <img src={eleven} alt="Images" />
      <p className="legend">usm2</p>
      </div>
      <div>
        <img src={last} alt="Images" />
      <p className="legend">usm2</p>
      </div>
  
  </Carousel>


);
        }
    }

    export default Carousel1;

