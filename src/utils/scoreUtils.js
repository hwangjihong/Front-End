export const getGrade = (totalScore) => {
  var grade = "";
  if (totalScore >= 95) {
    grade = "A+";
  } else if (totalScore >= 90) {
    grade = "A0";
  } else if (totalScore >= 85) {
    grade = "B+";
  } else if (totalScore >= 80) {
    grade = "B0";
  } else if (totalScore >= 75) {
    grade = "C+";
  } else if (totalScore >= 70) {
    grade = "C0";
  } else if (totalScore >= 65) {
    grade = "D+";
  } else if (totalScore >= 60) {
    grade = "D0";
  } else {
    return <td style={{ color: "red" }}>F</td>;
  }

  return <td>{grade}</td>;
};
