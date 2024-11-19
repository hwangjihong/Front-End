import _ from "lodash";

// 점수 계산 함수
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

// 과목 중복 확인
export const isDuplicateSubject = (subjectsData) => {
  const copyData = _.cloneDeep(subjectsData.subjects);

  for (var i = 0; i < copyData.length; i++) {
    var count = 0; // 중복된 과목이 2개이상인 경우를 확인하기 위한 변수
    const totalA =
      copyData[i].attendanceScore +
        copyData[i].assignmentScore +
        copyData[i].midtermScore +
        copyData[i].finalScore || 0;
    for (var j = 0; j < copyData.length; j++) {
      if (i === j) {
        continue;
      } else if (
        // 과목명이 같으면
        copyData[i].subjectName.toLowerCase() ===
        copyData[j].subjectName.toLowerCase()
      ) {
        count++;
        const totalB =
          copyData[j].attendanceScore +
            copyData[j].assignmentScore +
            copyData[j].midtermScore +
            copyData[j].finalScore || 0;
        if (count === 2) {
          return true;
        } else if (copyData[i].credit === 1 || copyData[j].credit === 1) {
          // 중복된 과목 둘중 하나라도 학점이 1인 과목이 있을 경우 중복 처리
          return true;
        } else if (totalA > 60 && totalB > 60) {
          // 중복된 과목 둘다 성적이 D0 이상인 경우 중복 처리
          return true;
        }
      }
    }
  }
  return false;
};
