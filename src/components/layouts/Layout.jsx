import styled from 'styled-components';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent ?? 'space-between'};
  align-items: ${(props) => props.alignItems};
  gap: ${(props) => props.gap};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
`;

const CenterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.gap};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border: ${(props) => props.border};
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.gap};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
`;

const Full = styled.div`
  min-height: 100vh;
`;

const AbsoluteFull = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

const Grid = styled.div`
  display: grid;
`;

const Spacer = styled.div`
  flex: 1;
`;

export {
  Column,
  Full,
  Row,
  Spacer,
  Grid,
  CenterRow,
  CenterColumn,
  AbsoluteFull
};
