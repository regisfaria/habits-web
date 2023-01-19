import "./styles/global.css";

import { Habit } from "./components/Habit";
import { Header } from "./components/Header";

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Header />

      <Habit completed={3} />
      <Habit completed={6} />
      <Habit completed={10} />
      <Habit completed={25} />
    </div>
  );
}
