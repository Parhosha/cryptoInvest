interface IHistory {
    time: string;
}

export const calculatePeriod = (start: string, end: string, dayBuy: string, history?: Array<object>) => {

    let tradeDays = []
    let actualData = new Date(start)
    let endFormatted = formatDate(new Date(new Date(end).getTime() + 86400000))
    let wallet = 0

    while(formatDate(actualData) !== endFormatted ){

        if(+actualData.getDay() === +dayBuy){
            tradeDays.push(formatDate(actualData))
            
            if(history)
                wallet = wallet + buy(actualData, history) 
        }  
            
            actualData.setDate(actualData.getDate() + 1)
        }

    return {buyCount: tradeDays, wallet: wallet}
}

const buy = (day: any, history: any) =>{
    

    const formattedDate = formatDate(day)
    const selectedDay = history.find((el: IHistory) => (el.time.search(formattedDate) + 1))

    return  100 / selectedDay.rate
}

export const formatDate = (date: any) => {

    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*2000))
    return  date.toISOString().split('T')[0]
}

