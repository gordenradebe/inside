import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// import daterange picker datepicker
import { DateRangePicker } from 'react-date-range';

import React, {useState} from 'react'

function Calendar() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectionRange = {
        startDate: startDate ,
        endDate: endDate,
        key: 'selection',
      }

    const handleSelect = (ranges)=>{
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);

      }
    return (
        <div>
            <DateRangePicker 
            ranges={[selectionRange]}
            minDate = {new Date()}
            rangeColors = {["#FD5B61"]}
            onChange={handleSelect}
             />
        </div>
    )
}

export default Calendar;
