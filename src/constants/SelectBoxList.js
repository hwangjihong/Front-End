// SelectBox 컴포넌트 Props 데이터

// 학년 정보(1~3 학년)
export const GRADE_LIST = [
  {
    label: "1학년",
    value: 1,
  },
  {
    label: "2학년",
    value: 2,
  },
  {
    label: "3학년",
    value: 3,
  },
];

// 이수 정보(전공, 교양)
export const CATEGORY_LIST = [
  {
    label: "전공",
    value: "MAJ", // major
  },
  {
    label: "교양",
    value: "LIB", // liberalArts
  },
];

// 필수 정보(필수, 선택)
export const TYPE_LIST = [
  {
    label: "필수",
    value: "REQ", // required
  },
  {
    label: "선택",
    value: "ELE", // elective
  },
];

// Pass과목 점수 정보(P, NP)
export const PASS_LIST = [
  {
    label: "P",
    value: "P", // Pass
  },
  {
    label: "NP",
    value: "NP", // None-Pass
  },
];
