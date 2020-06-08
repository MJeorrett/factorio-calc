const roundPrecision = 1000;

const round = number => {
  return Math.round((number + Number.EPSILON) * roundPrecision) / roundPrecision;
};

export default round;
