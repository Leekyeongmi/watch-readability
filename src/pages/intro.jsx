import { useNavigate } from 'react-router-dom';

function Intro() {
  const navigate = useNavigate();

  return (
    <>
      <h1>시계 인덱스에 따른 시인성 연구</h1>
    </>
  );
}

export default Intro;
