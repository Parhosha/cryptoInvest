import { calculatePeriod, formatDate } from "./pipeAnalytics"

export const filterDates = (start: string, end: string, dayOfWeek: string) => {
    const result = calculatePeriod(start, end, dayOfWeek)
    const days = result.buyCount.map((el: any) => [el, formatDate(new Date(new Date(el).setDate(new Date(el).getDate() + 1)))] )

    return days
}