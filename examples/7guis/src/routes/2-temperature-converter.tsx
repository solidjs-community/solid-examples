import { createEffect, createSignal } from 'solid-js';
type Temperatures = { c?: number; f?: number };

export default function () {
  const [farenheight, setFarenheight] = createSignal<number>();
  const [celsius, setCelsius] = createSignal<number>();
  const [previous, setPrevious] = createSignal<Temperatures>({});

  const synchronize = ({ c, f }: Temperatures, prev: Temperatures) => {
    if (typeof c !== 'undefined' && c !== prev.c) {
      setFarenheight(c * 1.8 + 32);
    }
    if (typeof f !== 'undefined' && f !== prev.f) {
      setCelsius((f - 32) / 1.8);
    }
    setPrevious({ c, f });
  };

  const onCelsiusInput = (value: string) => {
    synchronize({ c: Number.parseFloat(value) }, previous());
  };
  const onFarenheightInput = (value: string) => {
    synchronize({ f: Number.parseFloat(value) }, previous());
  };
  return (
    <div style={{ height: "20rem", display: 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
      <input
        type="number"
        value={celsius()}
        onInput={(el) => onCelsiusInput(el.currentTarget.value)}
      />
      <span> Celsius = </span>
      <input
        type="number"
        value={farenheight()}
        onInput={(el) => onFarenheightInput(el.currentTarget.value)}
      />
      <span> Farenheight</span>
    </div>
  );
}
