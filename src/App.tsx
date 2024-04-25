import React from "react";
function App(props: { msg?: string }) {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      {props.msg && <p>{props.msg}</p>}
      <h1>React App</h1>
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
  );
}

export default App;
