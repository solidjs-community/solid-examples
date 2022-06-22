import { Component, createSignal, Show } from 'solid-js';

import styles from './App.module.css';
import bulbOff from './assets/light-bulb-off.jpg';
import bulbOn from './assets/light-bulb-on.jpg';

const App: Component = () => {
  const [lightOn, setLightOn] = createSignal(false);

  return (
    <>
      <h1 class={styles.header}>Click the light to turn it on / off</h1>
      <div class={styles.bulbContainer} onClick={() => setLightOn((lightOnValue) => !lightOnValue)}>
        <Show when={lightOn()} fallback={<img src={bulbOff} />}>
          <img src={bulbOn} />
        </Show>
      </div>
    </>
  );
};

export default App;
