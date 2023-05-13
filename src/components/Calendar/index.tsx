import { useEffect, useState } from "react";
import "./style.scss";
import { generateDate } from "./method";

const Calendar = () => {
  const [days, setDays] = useState<any>([]);

  useEffect(() => {
    getDaysData();
  }, []);

  const getDaysData = () => {
    const dateData = generateDate();

    const temp = [];
    while (dateData.length) {
      temp.push(dateData.splice(0, 7));
    }

    setDays(temp);
  };

  const getDayClassStyle = (day: Date) => {
    if (day.getMonth() !== new Date().getMonth()) {
      return "blurred";
    }

    if (day.getDate() === new Date().getDate()) {
      return "today";
    }
  };

  return (
    <div className="glob-calendar-comp">
      <table>
        <thead>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {days.map((weeks: Date[], weeks_index: number) => (
            <tr key={`week-${weeks_index}`}>
              {weeks.map((day: Date, day_index: number) => (
                <td key={`week-${day_index}`} className={getDayClassStyle(day)}>
                  <span className="day-text">{day.getDate()}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
