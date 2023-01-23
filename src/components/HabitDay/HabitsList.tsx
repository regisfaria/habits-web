import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface HabitsListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface IHabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChange }: HabitsListProps) {
  const [habitInfo, setHabitInfo] = useState<IHabitsInfo>();

  useEffect(() => {
    api
      .get(`/day`, {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitInfo(response.data);
      });
  }, []);

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/toggle/${habitId}`);

    const isHabitAlreadyCompleted =
      habitInfo?.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitInfo!.completedHabits, habitId];
    }

    setHabitInfo({
      possibleHabits: habitInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChange(completedHabits.length);
  }

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          checked={habitInfo.completedHabits.includes(habit.id)}
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          disabled={isDateInPast}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
