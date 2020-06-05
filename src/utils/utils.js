export const formatTemp = (currentTemp) => {
  const fixedCurrentTemp = currentTemp.toFixed();

  if (fixedCurrentTemp > 0) {
    return `+${fixedCurrentTemp}`;
  }
  if (fixedCurrentTemp < 0) {
    return `-${fixedCurrentTemp}`;
  }
  return fixedCurrentTemp;
};
