import styled from 'styled-components';

const Icon = styled.div`
  min-width: ${(props) => props.width ?? props.size};
  height: ${(props) => props.height ?? props.size};
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Icon;
