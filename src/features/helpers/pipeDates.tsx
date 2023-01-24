import { calculatePeriod, formatDate } from "./pipeAnalytics"

export const filterDates = (start: string, end: string, dayOfWeek: string) => {
    const result = calculatePeriod(start, end, dayOfWeek)
    const days = result.buyCount.map((el: string) => [el, formatDate(new Date(new Date(el).setDate(new Date(el).getDate() + 1)))])

    return days
}


export function isoConvertData(time: string) {
    let res: Date | string | number = new Date(time);
    res = res.setHours(res.getHours() + 2);
    res = `${new Date(res).toISOString()}`;

    return res;
}
