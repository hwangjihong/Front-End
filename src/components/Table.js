import {
  CATEGORY_LIST,
  PASS_LIST,
  TYPE_LIST,
} from "../constants/SelectBoxList";
import { getGrade } from "../utils/scoreUtils";
import SelectBox from "./SelectBox";

// Table Component
const Table = (props) => {
  var sumCredit = 0; // 학점 합계
  var sumATScore = 0; // 출석점수 합계
  var sumASScore = 0; // 과제점수 합계
  var sumMIDScore = 0; // 중간고사 합계
  var sumFINScore = 0; // 기말고사 합계
  var subjectCount = 0; // 과목 수 카운트

  const handleInputChange = (e, id) => {
    // input 또는 selectBox에서 변경된 데이터 업데이트
    const [fieldName] = e.target.name.split("_"); // 필드명만 추출
    var newValue = e.target.value;
    if (!isNaN(newValue)) newValue = parseInt(newValue); // 숫자면 int형으로 변환

    const updatedData = props.subjectsData.subjects.map((subject) => {
      if (id === subject.id) {
        let updatedSubject = { ...subject, [fieldName]: newValue };

        // credit이 1일 경우 특정 필드 제거 후 passScore 필드 추가
        if (fieldName === "credit" && newValue === 1) {
          delete updatedSubject.attendanceScore;
          delete updatedSubject.assignmentScore;
          delete updatedSubject.midtermScore;
          delete updatedSubject.finalScore;

          updatedSubject.passScore = "P";
        }
        // credit이 1이 아닌 경우 passScore 필드 제거 후 특정 필드 추가
        else if (fieldName === "credit") {
          delete updatedSubject.passScore;

          updatedSubject.attendanceScore = 0;
          updatedSubject.assignmentScore = 0;
          updatedSubject.midtermScore = 0;
          updatedSubject.finalScore = 0;
        }

        return updatedSubject;
      }
      return subject;
    });

    props.setSubjectsData((prev) => ({
      ...prev,
      subjects: updatedData,
    }));
  };

  return (
    <form id="test" onSubmit={props.handleSubmit}>
      <table>
        <thead>
          <tr>
            <th>이수</th>
            <th>필수</th>
            <th>과목명</th>
            <th>학점</th>
            <th>출석점수</th>
            <th>과제점수</th>
            <th>중간고사</th>
            <th>기말고사</th>
            <th>총점</th>
            <th>평균</th>
            <th>성적</th>
          </tr>
        </thead>
        <tbody>
          {props.subjectsData?.subjects.map((subject) => {
            if (subject.credit !== 1) {
              subjectCount++;
              if (!isNaN(subject.credit)) {
                sumCredit += subject.credit;
              }
              if (!isNaN(subject.attendanceScore)) {
                sumATScore += subject.attendanceScore;
              }
              if (!isNaN(subject.assignmentScore)) {
                sumASScore += subject.assignmentScore;
              }
              if (!isNaN(subject.midtermScore)) {
                sumMIDScore += subject.midtermScore;
              }
              if (!isNaN(subject.finalScore)) {
                sumFINScore += subject.finalScore;
              }
            }

            return (
              <tr
                key={subject.id}
                onClick={(e) => props.setSelectedId(subject.id)}
                style={{
                  backgroundColor:
                    props.selectedId === subject.id ? "#8caece" : "",
                }}
              >
                <td>
                  <SelectBox
                    name={`category_${subject.id}`}
                    optionList={CATEGORY_LIST}
                    defaultValue={subject.category}
                    onChange={(e) => handleInputChange(e, subject.id)}
                  />
                </td>
                <td>
                  <SelectBox
                    name={`type_${subject.id}`}
                    optionList={TYPE_LIST}
                    defaultValue={subject.type}
                    onChange={(e) => handleInputChange(e, subject.id)}
                  />
                </td>
                <td>
                  <input
                    className="input-subName"
                    name={`subjectName_${subject.id}`}
                    value={subject.subjectName || ""}
                    onChange={(e) => handleInputChange(e, subject.id)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input-credit"
                    name={`credit_${subject.id}`}
                    value={subject.credit}
                    onChange={(e) => handleInputChange(e, subject.id)}
                    min={1}
                    max={4}
                    required
                  />
                </td>
                {subject.credit === 1 ? (
                  <>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </>
                ) : (
                  <>
                    <td>
                      <input
                        type="number"
                        className="input-score"
                        name={`attendanceScore_${subject.id}`}
                        value={subject.attendanceScore || 0}
                        onChange={(e) => handleInputChange(e, subject.id)}
                        min={0}
                        max={20}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input-score"
                        name={`assignmentScore_${subject.id}`}
                        value={subject.assignmentScore || 0}
                        onChange={(e) => handleInputChange(e, subject.id)}
                        min={0}
                        max={20}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input-score"
                        name={`midtermScore_${subject.id}`}
                        value={subject.midtermScore || 0}
                        onChange={(e) => handleInputChange(e, subject.id)}
                        min={0}
                        max={30}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input-score"
                        name={`finalScore_${subject.id}`}
                        value={subject.finalScore || 0}
                        onChange={(e) => handleInputChange(e, subject.id)}
                        min={0}
                        max={30}
                        required
                      />
                    </td>
                  </>
                )}
                <td>
                  {subject.credit === 1
                    ? ""
                    : (subject.finalScore || 0) +
                      (subject.assignmentScore || 0) +
                      (subject.attendanceScore || 0) +
                      (subject.midtermScore || 0)}
                </td>
                <td></td>
                {subject.credit === 1 ? (
                  <td>
                    <SelectBox
                      name={`passScore_${subject.id}`}
                      optionList={PASS_LIST}
                      defaultValue={subject.passScore}
                      onChange={(e) => handleInputChange(e, subject.id)}
                    />
                  </td>
                ) : (
                  getGrade(
                    subject.finalScore +
                      subject.assignmentScore +
                      subject.attendanceScore +
                      subject.midtermScore
                  )
                )}
              </tr>
            );
          })}
          <tr>
            <td colSpan={3}>합계</td>
            <td>{subjectCount > 0 && sumCredit}</td>
            <td>{subjectCount > 0 && sumATScore}</td>
            <td>{subjectCount > 0 && sumASScore}</td>
            <td>{subjectCount > 0 && sumMIDScore}</td>
            <td>{subjectCount > 0 && sumFINScore}</td>
            <td>
              {subjectCount > 0 &&
                sumATScore + sumASScore + sumMIDScore + sumFINScore}
            </td>
            <td>
              {subjectCount > 0 &&
                (
                  (sumATScore + sumASScore + sumMIDScore + sumFINScore) /
                  subjectCount
                ).toFixed(2)}
            </td>
            {subjectCount === 0 ? (
              <td></td>
            ) : (
              getGrade(
                (sumATScore + sumASScore + sumMIDScore + sumFINScore) /
                  subjectCount
              )
            )}
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default Table;
