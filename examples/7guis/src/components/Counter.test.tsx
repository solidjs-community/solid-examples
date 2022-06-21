import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, fireEvent } from 'solid-testing-library';
import Counter from './Counter';
import type { Result } from 'solid-testing-library/dist/types';

describe('<Counter />', () => {
  let result: Result;
  beforeEach(() => {
    result = render(() => <Counter />);
  });
  afterEach(() => result.unmount());

  test('renders', () => {
    const { container } = result;
    expect(container).toMatchSnapshot();
  });

  test('increments value', async () => {
    const { queryByRole, getByText } = result;
    const button = (await queryByRole('button')) as HTMLButtonElement;
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Increment Count/);
    const display = (await getByText(/Clicks/)) as HTMLSpanElement;
    expect(display).toHaveTextContent(/Clicks: 0/);
    fireEvent.click(button);
    expect(display).toHaveTextContent(/Clicks: 1/);
  });
});
