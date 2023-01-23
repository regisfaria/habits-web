import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
export function generateDatesFromBeginningOfYear() {
  const startDate = dayjs().utcOffset(0).startOf("year");
  const endDate = new Date();

  let dateRange = [];
  let compareDate = startDate;

  while (compareDate.isBefore(endDate)) {
    dateRange.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dateRange;
}
