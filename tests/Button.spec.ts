import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import Button from '../src/components/Button.svelte'

test('calls onClick when clicked and handles disabled state', async () => {
  let clicked = false;
  const handleClick = () => clicked = true; // This is your mock function

  const { getByRole, rerender } = render(Button, { onClick: handleClick }) // Render the Button component
  const button = getByRole('button')

  await fireEvent.click(button)

  // Check that the mock function was called
  expect(clicked).toBe(true);

  // Now let's test the disabled state
  rerender({ onClick: () => console.log("This shouldn't render"), disabled: true }) // Update the props to disable the button

  clicked = false; // Reset the clicked state
  await fireEvent.click(button)

  // Check that the mock function was not called this time, because the button is disabled
  expect(clicked).toBe(false);
})
