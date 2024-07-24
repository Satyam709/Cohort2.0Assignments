import { useCallback, useState, memo } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
  const [count, setCount] = useState(0);

  // Correct usage of useCallback with dependency array
  const handleIncrement = useCallback(() => {
    setCount((prevCount) => prevCount + 1); // Using functional update
  }, []); // No dependencies

  const handleDecrement = useCallback(() => {
    setCount((prevCount) => prevCount - 1); // Using functional update
  }, []); // No dependencies

  return (
    <div>
      <p>Count: {count}</p>
      <CounterButtons
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
}

const CounterButtons = memo(({ onIncrement, onDecrement }) => (
  <div>
    <button onClick={onIncrement}>Increment</button>
    <button onClick={onDecrement}>Decrement</button>
  </div>
));
