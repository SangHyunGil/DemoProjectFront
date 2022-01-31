import React from "react";
import styled from "styled-components";
import AllDepartmentStudy from "../../pages/AllDepartmentStudy";

const StudyAllLinkWrapper = styled.div`
  text-align: center;
  margin-top: 3rem;
  a {
    text-decoration: none;
    color: #047d37;
    /*background: #9fffe5;*/
    padding: 10px 20px;
    border-radius: 5px;
  }
`;

function StudyDepartmentComp() {
  return (
    <>
      <StudyAllLinkWrapper>
        <AllDepartmentStudy />
      </StudyAllLinkWrapper>
    </>
  );
}

export default StudyDepartmentComp;
