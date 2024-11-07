import { WeekDay } from './types'

export const mapIndexToWeekDay = (index: number): WeekDay => {
  const days = [
    WeekDay.SUNDAY,
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY
  ]
  return days[index % days.length]
}
