import type { Component } from 'solid-js';

import styles from './App.module.css';
import { CardGrid } from './components/CardGrid';
import { Navbar } from './components/Navbar';
import { Title } from './components/Title';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Navbar />
      <main>
        <Title />
        <CardGrid />
      </main>
    </div>
  );
};

export default App;
