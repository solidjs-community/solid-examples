import styles from './Title.module.css';
export default function Title() {
  return (
    <h1 class={styles.title}>
      Simple and performant, <span>SolidJS!</span>
    </h1>
  );
}
