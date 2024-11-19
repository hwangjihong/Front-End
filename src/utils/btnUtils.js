// 과목 추가 버튼 핸들러
export const handleAddSubject = (subjectsData, setSubjectsData) => {
  // 현재 subjects 배열길이에서 +1
  const newId = subjectsData.subjects.length + 1;

  const newSubject = {
    id: newId.toString(), // 새로 추가할 과목의 id
    category: "MAJ",
    type: "REQ",
    subjectName: "",
    credit: 0,
    attendanceScore: 0,
    assignmentScore: 0,
    midtermScore: 0,
    finalScore: 0,
  };

  // 새로운 과목 추가
  setSubjectsData((prev) => ({
    ...prev,
    subjects: [...prev.subjects, newSubject],
  }));
};

// 과목 삭제 버튼 핸들러
export const handleRemoveSubject = (
  subjectsData,
  setSubjectsData,
  selectedId,
  setSelectedId
) => {
  if (selectedId == null) {
    alert("선택된 과목이 없습니다.");
    return;
  } // 선택된 과목이 없으면 반환

  // 선택된 과목 제외
  const filterData = subjectsData.subjects.filter(
    (subject) => subject.id !== selectedId
  );

  // id를 1부터 다시 재정의
  const updatedData = filterData.map((subject, index) => ({
    ...subject,
    id: index + 1, // index + 1로 새 id 할당
  }));

  // 선택된 과목 삭제
  setSubjectsData((prev) => ({
    ...prev,
    subjects: updatedData,
  }));

  alert("삭제 완료!!");
  setSelectedId(null); // 삭제 후 선택돼 있던 id 값 초기화
};
