import Clock from '../components/Clock';
import { Column, Row } from '../components/layouts/Layout';
import ThemeSwitcher from '../components/ThemeSwitcher';

function Intro() {
  return (
    <Column gap='1rem'>
      <ThemeSwitcher />
      <Clock />
    </Column>
  );
}

export default Intro;
