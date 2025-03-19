import React, { useState, useEffect } from 'react';

export default function Calendar({ onDateClick }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getDaysInMonth = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDay = firstDayOfMonth.getDay();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    const remainingDays = 7 - (days.length % 7);
    for (let i = 0; i < remainingDays && remainingDays < 7; i++) {
      days.push(null);
    }

    return days;
  };

  const generateCalendar = () => {
    const days = getDaysInMonth();
    const weeks = [];

    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  };

  const weeks = generateCalendar();

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1); 
      }
    } else if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1); 
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  return (
    <div className="calendar">
     
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange('prev')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <h2 className="text-xl font-semibold">{`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}</h2>
        <button
          onClick={() => handleMonthChange('next')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        
        <div className="font-semibold">Sun</div>
        <div className="font-semibold">Mon</div>
        <div className="font-semibold">Tue</div>
        <div className="font-semibold">Wed</div>
        <div className="font-semibold">Thu</div>
        <div className="font-semibold">Fri</div>
        <div className="font-semibold">Sat</div>

        {weeks.map((week, index) => (
          <React.Fragment key={index}>
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`border p-4 cursor-pointer ${day ? 'hover:bg-blue-200' : 'bg-gray-200'}`}
                onClick={() => day && onDateClick(`${currentYear}-${currentMonth + 1}-${day}`)} // onDateClick only if day is not null
              >
                {day ? day : ''}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
