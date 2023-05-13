const onlyNumPattern = /[^0-9]/g;

export const makeOnlyNum = (value: string) => {
  return value.replace(onlyNumPattern, "");
};
