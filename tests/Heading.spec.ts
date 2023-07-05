import { render } from '@testing-library/svelte';
import Heading from '../src/components/Heading.svelte';
import { test, expect } from 'vitest';

test('Heading component', () => {
  test('renders the slot content', () => {
    const { getByText } = render(Heading, { slot: 'Test Heading' });

    expect(getByText('Test Heading')).toBeDefined();
  });
});
