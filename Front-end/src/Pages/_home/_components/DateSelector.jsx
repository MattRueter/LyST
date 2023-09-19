import { useState } from 'react';
import Calendar from 'react-calendar';

function DateSelector ({display}) {
    const [ value, setValue ] = useState(new Date());

    function onChange (nextValue){
        setValue(nextValue)
        console.log(value)
    }

    return(
        <div name="date" value={value} className={display}>
            <Calendar
                name= "date"
                onChange={onChange}
                value={value}
            />
        </div>
    )
}
export default DateSelector;