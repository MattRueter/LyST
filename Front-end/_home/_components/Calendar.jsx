import { useState } from 'react';
import Calendar from 'react-calendar';

function DateSelector () {
    const [ value, setValue ] = useState(new Date());

    function onChange (nextValue){
        setValue(nextValue)
        console.log(value)
    }

    return(
        <div id="calendar">
            <Calendar 
                onChange={onChange}
                value={value}
            />
        </div>
    )
}
export default DateSelector;