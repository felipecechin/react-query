import App from "./App";
import SecondApp from "./SecondApp";

export default function ConcurrentQueries() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <App />
      <SecondApp />
    </div>
  );
}
