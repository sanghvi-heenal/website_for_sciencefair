import React from 'react';
import "./look.css" ;
import forms from '../Documents/special_forms.pdf';
import cookies from '../Documents/How to Delete Browser Cookies.docx';
import sef from '../Documents/SEF_AGENDA.pdf';
import lower_fair from '../Documents/Lower Fair Agenda.pdf';
import guide from '../Documents/Science fair registration guide.docx';


class ApplicationPDF extends React.Component {   
    render() {
       
       return  (  
       <div className="application" >
       <center>
      <h2 style={{WebkitTextFillColor: "white"}}><b>News and Updates</b></h2>
      </center>
      <ui className="UpdatesUI"><font size="5">
        <li className="Updates"> <b className="Datecss">1/30/19:
        </b>The date for Lower Fair was incorrectly listed. It is on April 15 (previously 12th).
           Adjustments have been made throughout the website.
        </li>

        <li className="Updates">Use this document if you need help deleting your browser cookies as it
         could cause you to reach an error.
         <a href={`${cookies}`} type="application/pdf" 
                               target="_blank" rel="noopener noreferrer" 
                               className="application">How to Delete Browser Cookies.docx</a>
          </li>
          <li className="Updates">This Guide helps in filling the online student registration form
         <a href={`${guide}`} type="application/pdf" 
                               target="_blank" rel="noopener noreferrer" 
                               className="application">Science Fair Registration Guide</a>
          </li>

          <li className="Updates">Here is the flyer for State Fair. Check your email over the next week 
                for any additional information.
                <a href={`${sef}`} 
                    type="application/pdf"  
                    target="_blank" 
                    rel="noopener noreferrer">SEF_AGENDA</a> 
          </li>
                    
          <li className="Updates">
             <b className="Datecss"> 3/29/2019:</b> 
             Lower Fair Agenda is now live on the website. You can also find a copy here
             <a href={`${lower_fair}`} 
                type="application/pdf"  
                target="_blank" 
                rel="noopener noreferrer">Lower Fair</a>
          </li>
          
          <li className="Updates"><b className="Datecss">2/6/2019:</b>
                Parking Passes have been uploaded online
          </li>
          </font>
      </ui>
      
        </div>
        
        );
         }
    }

export default ApplicationPDF;