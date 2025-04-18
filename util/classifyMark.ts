const GOLD = [30, 24];
const SILVER = [23, 18];

const classifyMark = (averageMark: number) => {
  if (averageMark <= GOLD[0] && averageMark >= GOLD[1]) {
    return "GOLD";
  } else if (averageMark <= SILVER[0] && averageMark >= SILVER[1]) {
    return "SILVER";
  } else return "BRONZE";
};

export default classifyMark;
