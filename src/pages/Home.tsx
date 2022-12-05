import React, { useEffect } from "react";
import { Content } from "../components/HomeBackground";
import { LoginButton } from "../components/LoginButton";
import { CommentButton } from "../components/CommentButton";
import { Title } from "../components/Title";
import "./Home.css";

function Home() {
  const [isLogin, setIsLogin] = React.useState(false);

  useEffect(() => {
    const kakaoId = localStorage.getItem("kakaoId");
    const uri = localStorage.getItem("uri");

    if (kakaoId && uri) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Content>
      <div className="div__title">
        <Title>
          하나둘셋에 오신 것을
          <br />
          환영합니다.
        </Title>
      </div>
      {isLogin ? <CommentButton /> : <LoginButton />}
    </Content>
  );
}

export default Home;
