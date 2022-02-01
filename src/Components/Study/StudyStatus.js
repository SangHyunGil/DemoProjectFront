const StudyStatus = ({title,content}) => {
    const StudyObj = {
        study: {
            PREPARE: "스터디 준비중",
            STUDYING: "스터디 진행중",
            FINISH: "스터디 종료",
          },
        recruit: {
            PROCEED: "모집 진행중",
            END: "모집 종료",
        },
        method: {
            FACE: "대면",
            NONFACE: "비대면",
            UNDEFINED: "미정",
        },
    };
    return <p>{StudyObj[title][content]}</p>
};

export default StudyStatus;