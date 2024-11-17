import { useNavigate } from 'react-router-dom';

function Intro() {
  const navigate = useNavigate();

  return (
    <>
      <h1>시인성 연구</h1>
      <button onClick={() => navigate('/jinsung-labs')}>jinsung'labs</button>
    </>
  );
}

export default Intro;
