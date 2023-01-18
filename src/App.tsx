import { Habit } from "./components/Habit";
import "./styles/global.css";

function App() {
  return (
    <div>
      <Habit completed={3} />
      <Habit completed={6} />
      <Habit completed={10} />
      <Habit completed={25} />
    </div>
  );
}

export default App;
