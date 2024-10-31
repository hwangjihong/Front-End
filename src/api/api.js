import axios from "axios";

// 선택된 학년 데이터 가져오기
export const getStudentByGrade = async (grade, setSubjectsData) => {
  try {
    const res = await axios.get(`http://localhost:4000/students/${grade}`);
    setSubjectsData(res.data);
  } catch (err) {
    console.error(err);
  }
};

// 새로 입력 받은 과목 데이터 저장
export const saveSubjectsData = async (grade, subjectsData) => {
  try {
    await axios.put(`http://localhost:4000/students/${grade}`, subjectsData);
    alert("저장 완료!!");
  } catch (err) {
    console.error(err);
  }
};
