import React from "react";
import styled from "styled-components";

const StyledCommentButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 80%;
  height: 50px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  color: white;
  border: none;
  font-family: "Pretendard";
`;

export function CommentButton() {
  const onClick = () => {
    window.location.href = "/comment/" + localStorage.getItem("uri");
  };

  return (
    <StyledCommentButton onClick={onClick}>
      내 글로 이동하기
    </StyledCommentButton>
  );
}
