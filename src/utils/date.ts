export const convertDateToString = (date: Date) => {
  let result = "";

  result += date.getDate();
  const month = date.getMonth() + 1;
  result += `-${month < 10 ? "0" + month : month}`;
  result += `-${date.getFullYear()}`;

  return result;
};
