import { createSignal } from 'solid-js';
import styles from './Counter.module.css';

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <>
      <button
        type="button"
        class={styles.increment}
        // This event handler could also be written as
        // ```
        // onClick={() => setCount(c => c + 1)}
        // ```
        onClick={() => setCount(count() + 1)}
      >
        Increment Count
      </button>
      <div class={styles.countContainer}>
        <span class={styles.count}>Clicks: {count()}</span>
      </div>
    </>
  );
}
