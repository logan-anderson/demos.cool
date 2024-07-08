import React from "react";

export const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Local LLM</h1>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Click me
      </button>
      {count > 0 && <p>Count: {count}</p>}
    </div>
  );
};
