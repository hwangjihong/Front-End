import axios from "axios";
import { isDuplicateSubject } from "../utils/subjectUtils";
// 이수, 필수, 과목명 순으로 오름차순 정렬
export const sortSubjects = (res) => {
  res?.data?.subjects?.sort(
    (a, b) =>
      a.category.localeCompare(b.category) ||
      a.type.localeCompare(b.type) ||
      a.subjectName.toString().localeCompare(b.subjectName)
  );
};

// 선택된 학년 데이터 가져오기
export const getSubjectsData = async (grade, setSubjectsData) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/students/${grade}`
    );
    sortSubjects(res);
    setSubjectsData(res.data);
  } catch (err) {
    console.error(err);
  }
};

// 새로 입력 받은 과목 데이터 저장
export const putSubjectsData = async (grade, subjectsData, setTest) => {
  if (isDuplicateSubject(subjectsData)) {
    alert("중복된 과목이 있습니다!!!!!!");
    return;
  }
  try {
    await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/students/${grade}`,
      subjectsData
    );
    alert("저장 완료!!");

    // 저장 후 데이터 다시 호출
    getSubjectsData(grade, setTest);
  } catch (err) {
    console.error(err);
  }
};
