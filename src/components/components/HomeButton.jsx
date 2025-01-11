import { useNavigate } from 'react-router-dom';
import BasicButton from '../atoms/BasicButton';

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <BasicButton
      onClick={() => navigate('/')}
      width={'4.68rem'}
      height={'1.5rem'}
      size={'s'}
      shape={'round'}
      textProps={{ text: 'home', typo: 'head4' }}
      bg='white'
    />
  );
};

export default HomeButton;
