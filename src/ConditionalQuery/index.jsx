import { useState } from "react";
import App from "./App";
import SecondApp from "./SecondApp";
import { ShowTodo } from "./ShowTodo";

export default function ConditionalQuery() {
  const [showSecondApp, setShowSecondApp] = useState(false);
  const [showTodo, setShowTodo] = useState(false);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <App 
        onClick={() => setShowSecondApp(!showSecondApp)}
        onClickShowTodo={() => setShowTodo(!showTodo)}
      />
      {showSecondApp && <SecondApp />}
      {showTodo && <ShowTodo />}
    </div>
  );
}
