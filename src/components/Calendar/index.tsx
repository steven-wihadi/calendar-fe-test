import { FC, useEffect, useState } from "react";
import { generateDate } from "./method";
import "./style.scss";

interface CalendarPropTypes {
  onClickDay?: (selectedDay: Date) => void;
}

const Calendar: FC<CalendarPropTypes> = ({ onClickDay = () => {} }) => {
  const [days, setDays] = useState<any>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

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
    } else {
      let className = "";

      if (day.getDate() === new Date().getDate()) {
        className += "today";
      }
      if (day.getDate() === selectedDay.getDate()) {
        className += " selected";
      }

      return className;
    }
  };

  const changeSelectedDay = (day: Date) => {
    if (day.getMonth() === new Date().getMonth()) {
      setSelectedDay(day);
      onClickDay(day);
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
                <td
                  key={`week-${day_index}`}
                  className={getDayClassStyle(day)}
                  onClick={() => changeSelectedDay(day)}
                >
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
