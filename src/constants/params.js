export const daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const currency = ['USDT', 'UAH', 'RUB']

const formOptions = (section) => {
  
  switch(section){
      case 'time': {

        const times = []
        for(let i =0; i < 24; i++){
            times.push(<option value={`${i}:00`} key={i}>{i +`:00`}</option>)
          }
          return times

        }

        case 'period': {
            return daysOfWeek.map((el, index) => 
                <option value={index} key={el}>{el}</option>

            )
        }

        case 'currency': {
            return currency.map((el) => 
                <option value={el} key={el}>{el}</option>

            )
        }
        default: 
            return []
      }
  
}

export default formOptions;