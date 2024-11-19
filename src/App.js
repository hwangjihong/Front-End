import Table from "./components/Table";
import "./App.css";
import { useEffect, useState } from "react";
import SelectBox from "./components/SelectBox";
import { GRADE_LIST } from "./constants/SelectBoxList";
import { getSubjectsData, putSubjectsData } from "./api/api";
import { handleAddSubject, handleRemoveSubject } from "./utils/btnUtils";

const App = () => {
  const [grade, setGrade] = useState(1); // 선택된 학년(1~3) 상태 관리
  const [subjectsData, setSubjectsData] = useState(); // 선택된 학년 과목 정보
  const [selectedId, setSelectedId] = useState(); // 선택된 과목 아이디

  // 첫 렌더링 및 grade가 변경될 때마다 useEffect 실행
  useEffect(() => {
    getSubjectsData(grade, setSubjectsData);
  }, [grade]);

  // 저장 버튼 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    putSubjectsData(grade, subjectsData, setSubjectsData);
  };

  return (
    <div>
      <div>
        <p>Front-End</p>
      </div>
      <div className="top-container">
        <div>
          <SelectBox
            defaultValue={grade}
            onChange={(e) => setGrade(e.target.value)}
            optionList={GRADE_LIST}
          />
        </div>
        <div className="button-container">
          <button
            onClick={() => handleAddSubject(subjectsData, setSubjectsData)}
          >
            추가
          </button>
          <button
            onClick={() =>
              handleRemoveSubject(
                subjectsData,
                setSubjectsData,
                selectedId,
                setSelectedId
              )
            }
          >
            삭제
          </button>
          <button type="submit" form="table">
            저장
          </button>
        </div>
      </div>
      <div>
        {subjectsData && (
          <Table
            subjectsData={subjectsData}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            setSubjectsData={setSubjectsData}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default App;
