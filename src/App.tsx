import * as React from "react";
function App() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <h2>Root React App </h2>
      <div>
        <button
          onClick={() => {
            setCount((c) => c + 1);
          }}
        >
          Click me
        </button>
        {count > 0 && <p>Count: {count}</p>}
        <p>Open the console to see the output of the server-side rendering.</p>
      </div>
    </>
  );
}

export default App;
