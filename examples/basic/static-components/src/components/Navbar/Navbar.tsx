import styles from './Navbar.module.css';
import logo from '../../logo.svg';
import { SocialList } from '../SocialList';

export default function () {
  return (
    <div class={styles.nav}>
      <div>
        <img src={logo} alt="logo" class={styles.logo} />
        <SocialList />
      </div>
    </div>
  );
}
