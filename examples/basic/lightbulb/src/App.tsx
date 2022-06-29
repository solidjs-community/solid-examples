import { Component, createSignal } from 'solid-js';

import styles from './App.module.css';
import bulbOff from './assets/light-bulb-off.jpg';
import bulbOn from './assets/light-bulb-on.jpg';

const App: Component = () => {
  const [lightOn, setLightOn] = createSignal(false);

  return (
    <>
      <h1 class={styles.header}>Click the light to turn it on / off</h1>
      <div class={styles.bulbContainer} onClick={() => setLightOn((lightOnValue) => !lightOnValue)}>
        <img src={lightOn() ? bulbOn : bulbOff} />
      </div>
    </>
  );
};

export default App;
