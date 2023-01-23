import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";

const availableWeekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function Form() {
  const [title, setTitle] = useState("");
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);

  function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || selectedWeekdays.length === 0) return;

    api.post("habits", {
      title,
      weekDays: selectedWeekdays,
    });

    setTitle("");
    setSelectedWeekdays([]);

    alert("New habit created!");
  }

  function handleToggleWeekday(weekday: number) {
    if (selectedWeekdays.includes(weekday)) {
      setSelectedWeekdays(
        selectedWeekdays.filter(
          (selectedWeekday) => selectedWeekday !== weekday
        )
      );
    } else {
      setSelectedWeekdays([...selectedWeekdays, weekday]);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What you're committing to?
      </label>

      <input
        type="text"
        id="title"
        placeholder="i.e. To exercise, Read, ..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        With which frequency?
      </label>

      <div className="mt-6 flex flex-col gap-3">
        {availableWeekdays.map((weekday, index) => (
          <Checkbox.Root
            key={weekday}
            className="flex items-center gap-3 group focus:outline-none"
            checked={selectedWeekdays.includes(index)}
            onCheckedChange={() => handleToggleWeekday(index)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className=" text-white leading-tight">{weekday}</span>
          </Checkbox.Root>
        ))}
      </div>
      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  );
}
