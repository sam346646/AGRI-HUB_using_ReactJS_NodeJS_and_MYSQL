import React from 'react'

function FormatDate(props) {
    const date = new Date(props.dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    return `${formattedDay}-${formattedMonth}-${year}`;
}

export default FormatDate
