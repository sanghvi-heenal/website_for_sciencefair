'use strict';
import React from 'react';

import StepZilla from "react-stepzilla";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Specific_u from './Specific_u';
import Student_details from './Student_details';
import User_reg from './User_reg';
import Teacher_reg from './Teacher_reg';
import Shirt_size1 from './Shirt_size1' ;
import Shirt_size2 from './Shirt_size2' ;
import Shirt_size3 from './Shirt_size3' ;
import Certification from './Certification' ;
import Payment from './Payment';
import 'bootstrap/dist/css/bootstrap.css';

import './look.css';


import { firstLastName, email, sname, password } from '../actions/formActions';

export default class u_sform extends React.Component {
    constructor(props) {
        super(props)

        this.sampleStore = {
            // teamname: '',
            // email: '',
            // password: '',
            f_name: '',
            l_name: '',
            t_email: '',
            sc_name1: '',
            s_name1: '',
            s_name2: '',
            s_name3: '',
            grade: '',
            s_class: '',
            title: '',
            sc_name2: '',
            shirt_sizes_1: [],
            shirt_sizes_2: [],
            shirt_sizes_3: [],
            p_cert: false,
            t_cert: false,
            summary: '',
            category: "-1",
            fee_payment :"-1",
            tshirt_payment : "-1",
            form_doc:"",
            summary_doc:"",
            savedToCloud: false
        };
        //localStorage.setItem('testObject', JSON.stringify(this.sampleStore));
        this.checkList = [];

        this.init();
        
    };

    getStore() {
        //console.log("values in get store", this.sampleStore);
        
        return this.sampleStore;
    }
    
    updateStore(update) {
        this.sampleStore = {
          ...this.sampleStore,
          ...update,
        }
        console.log(" updated values in update store", this.sampleStore);
        localStorage.setItem('testObject', JSON.stringify(this.sampleStore));
        
    }

    init() {
        for (var i = 0; i < 21; i ++) {
            this.sampleStore.shirt_sizes_1.push({checked: false});
            this.sampleStore.shirt_sizes_2.push({checked: false});
            this.sampleStore.shirt_sizes_3.push({checked: false});
        }
    }

    

    render() {       

        const steps =
        [
            // {name: '', component: <User_reg getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
            {name: '', component: <Teacher_reg getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
            {name: '', component: <Student_details getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
            {name: '', component: <Shirt_size1 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
            {name: '', component: <Shirt_size2 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
            {name: '', component: <Shirt_size3 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
            {name: '', component: <Certification getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
            {name: '', component: <Specific_u getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
            {name: '', component: <Payment getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
        ];


        return (
                    <div className="Move">
                    <center>
                      
                           <h1><b>Registration Form</b></h1>
                       
                        <div className='example' style={{fontSize: "25px" }}>
                            <div className='step-progress'>
                        <StepZilla 
                            steps={steps}
                            
                            preventEnterSubmission={true}
                            nextTextOnFinalActionStep={"Next"}
                            hocValidationAppliedTo={[8]}
                            startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
                            onStepChange={(step) => window.sessionStorage.setItem('step', step)}
                        />
                        </div>
                        </div>
                        </center>
                    </div>
        );
    }
}