import styles from './CardGrid.module.css';
export default function CardGrid() {
  return (
    <div class={styles.grid}>
      <a href="https://www.solidjs.com/" target="_new" class={styles.card}>
        <h3>Documentation &rarr;</h3>
        <p>Find comprehensive information about Solid features and API.</p>
      </a>

      <a
        href="https://www.solidjs.com/tutorial/introduction_basics"
        target="_new"
        class={styles.card}
      >
        <h3>Learn &rarr;</h3>
        <p>Learn Solid through our interactive tutorial!</p>
      </a>

      <a href="https://www.solidjs.com/examples/counter" target="_new" class={styles.card}>
        <h3>Examples &rarr;</h3>
        <p>Checkout our gallery of Solid example projects.</p>
      </a>

      <a href="https://www.solidjs.com/examples/counter" target="_new" class={styles.card}>
        <h3>Play &rarr;</h3>
        <p>Visit the playground to test ideas and see Solid compiled output!</p>
      </a>

      <a href="https://netlify.com" target="_new" class={styles.card}>
        <h3>Deploy &rarr;</h3>
        <p>Instantly deploy your Solid app to a public URL with Netlify.</p>
      </a>
    </div>
  );
}
