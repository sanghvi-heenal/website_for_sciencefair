import styled from 'styled-components';

const Input = styled.input`
      outline: none;
      display: block;
      background: rgba($black, 0.9);
      width: 100%;
      border: 0;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 12px 20px;
      color: grey;
      font-family: inherit;
      font-size: inherit;
      font-weight: $semibold;
      line-height: inherit;
      transition: 0.3s ease;
      ::-webkit-input-placeholder{color:inherit;opacity:0.54}
      border:0!important;
      border-bottom:2px solid #2F4F4F!important;
      border-right:2px solid #2F4F4F!important;
      border-top:2px solid #2F4F4F!important;
      border-left:2px solid #2F4F4F!important;
     
        
`;

export default Input;
