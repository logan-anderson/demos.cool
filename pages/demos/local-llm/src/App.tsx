import React from "react";
import { AbstractFrameworkContext } from "../../../../framework/frameworkContext";

export const App = ({ ctx }: { ctx: AbstractFrameworkContext }) => {
  const [count, setCount] = React.useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allProps = ctx.staticProps() as unknown as any;
  const props = allProps?.props;
  return (
    <div>
      <h1>Local LLM</h1>
      <p>{props?.name}</p>
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
