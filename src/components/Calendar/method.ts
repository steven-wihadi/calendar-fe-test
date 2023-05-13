export const generateDate = () => {
  const currentMonth = new Date().getMonth();
  // const currentMonth: number = 1;
  const currentYear = new Date().getFullYear();
  // const currentYear: number = 2022;

  const days = [];
  const date = new Date(currentYear, currentMonth, 1);

  while (date.getMonth() === currentMonth) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  const daysPreviousMonth = [];
  if (days[0].getDay() !== 1) {
    const month = currentMonth === 0 ? 12 : currentMonth;
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;

    const flag = days[0].getDay() === 0 ? 6 : days[0].getDay() - 1;

    for (let i = 0; i < flag; i += 1) {
      daysPreviousMonth.push(new Date(year, month, -i));
    }
  }

  let daysAfterMonth: any = [];
  if (days[days.length - 1].getDay() !== 0) {
    const month = currentMonth === 11 ? 0 : currentMonth + 1;
    const year = currentMonth === 11 ? currentYear + 1 : currentYear;
    const flag = 7 - days[days.length - 1].getDay();

    for (let i = 0; i < flag; i += 1) {
      daysAfterMonth.push(new Date(year, month, i + 1));
    }
  }

  let result: any = [...days];
  if (daysPreviousMonth.length) {
    result = [...daysPreviousMonth.reverse(), ...result];
  }

  if (daysAfterMonth.length) {
    result = [...result, ...daysAfterMonth];
  }

  return result;
};
