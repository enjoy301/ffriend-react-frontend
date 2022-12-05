import React from "react";
import styled from "styled-components";

const StyledLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fee500;
  width: 80%;
  height: 50px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #black;
  border: none;
  font-family: "Pretendard";
`;

export function LoginButton() {
  const onClick = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=f8b0e3edc58515a918170f1db2cde895&redirect_uri=http://localhost:3000/kakaoLoginSuccess&response_type=code";
  };

  return (
    <StyledLoginButton onClick={onClick}>
      <img
        src="kakaoSymbol.png"
        alt="kakaoSymbol"
        style={{ width: "20px", height: "20px", marginRight: "10px" }}
      />
      카카오 계정으로 시작하기
    </StyledLoginButton>
  );
}
