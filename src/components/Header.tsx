import logoImage from "../assets/logo.svg";

import NewHabit from "./NewHabit";

export function Header() {
  return (
    <div className="w-full max-w-5xl px-6 flex-col gap-16">
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <img src={logoImage} alt="logo" />

        <NewHabit />
      </div>
    </div>
  );
}
