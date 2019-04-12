import styled from 'styled-components';
import NormalA from 'components/A';

const A = styled(NormalA)`
  padding: 2em 0;
  text-align: center
  animation: A-spin infinite 20s linear;
	height: 80px;
	z-index: 2;
}
`;

export default A;
