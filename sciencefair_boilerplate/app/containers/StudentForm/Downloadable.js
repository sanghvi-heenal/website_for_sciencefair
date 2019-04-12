import React from 'react';
import {  Page,  pdfjs} from 'react-pdf';
import {Document} from 'react-pdf/dist/entry.webpack' ;
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import file from './file1.pdf';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export class Downloadable extends React.PureComponent {

    state = {
        numPages: null,
        pageNumber: 1,
      }
     
      onDocumentLoadSuccess = ({ numPages }) => {
        console.log("indside load success ")
        this.setState({ numPages });
      }
     
      render() {
        const { pageNumber, numPages } = this.state;
     
        return (
          // <div>
          //     <h1>hello</h1>
          //   <Document
          //     file={file}
          //     onLoadSuccess={this.onDocumentLoadSuccess}
          //   >
          //  { console.log("indside Document ")}
          //     <Page pageNumber={pageNumber} />
          //   </Document>

          //   <p>Page {pageNumber} of {numPages}</p>
          // </div>
          <div>
            
          </div>
        );
      }
}


export function mapDispatchToProps(dispatch) {
    return {
    //   onSubmitForm: evt => {
    //     if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //     dispatch(loadJudgeRegistration());
    //   },
    //   onUpdateJudgeRegisterData: data => {
    //     console.log("data in dispatch", data)
    //     dispatch(changeJudgeRegisterData(data))},   
    };
  }
  
  const mapStateToProps = createStructuredSelector({
    // response: makeSelectJudgeResponse(),
  });
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
//   const withReducer = injectReducer({ key: LOCAL_JUDGE_STATE_NAME, reducer });
//   const withSaga = injectSaga({ key: LOCAL_JUDGE_STATE_NAME, saga });
  
  export default compose(
    // withReducer,
    // withSaga,
    withConnect,
  )(Downloadable);