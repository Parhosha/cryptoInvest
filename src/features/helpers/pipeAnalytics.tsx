export const calculatePeriod = (start, end, dayBuy, history) => {
    let buyCount = 0
    let actualData = new Date(start)
    let endFormatted = formatDate(new Date(new Date(end).getTime() + 86400000))
    let wallet = 0

    while(formatDate(actualData) !== endFormatted ){

        if(+actualData.getDay() === +dayBuy ){
            buyCount++
            wallet = wallet + buy(actualData, history) 
        }  
            
        actualData.setDate(actualData.getDate() + 1)
        }

    return {buyCount: buyCount, wallet: wallet}
}

const buy = (day: any, history: any) =>{
    
    const formattedDate = formatDate(day)
    const selectedDay = history.find(el => (el.time_open.search(formattedDate) + 1))

    return  100 / selectedDay.price_open
}

const formatDate = (date: any) => {

    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*2000))
    return  date.toISOString().split('T')[0]
}

