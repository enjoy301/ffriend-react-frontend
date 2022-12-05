import React, { useEffect } from "react";

function LoginSuccess() {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");

  useEffect(() => {
    fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: `grant_type=authorization_code&client_id=f8b0e3edc58515a918170f1db2cde895&redirect_uri=http://localhost:3000/kakaoLoginSuccess&code=${code}`,
    })
      .then((res) => res.json())
      .then((res) => {
        fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${res.access_token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            fetch("http://localhost:3001/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                kakaoId: String(res.id),
                name: res.properties.nickname,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                localStorage.setItem("kakaoId", res.kakaoId);
                localStorage.setItem("uri", res.uri);
                window.location.href = `/comment/${res.uri}`;
              });
          });
      });
  }, [code]);

  return <></>;
}

export default LoginSuccess;
