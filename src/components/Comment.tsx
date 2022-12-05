import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledCommentDiv = styled.div`
  background-color: black;
  color: white;
  width: 90%;
  min-height: 50px;
  border-radius: 12px;
  margin-top: 10px;
  padding: 10px;
`;

const StyledComment = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-family: "Pretendard";
`;

const StyledThumbsUp = styled.button`
  float: right;
`;

type CommentProps = {
  id: number;
  comment: string;
  thumbs: number;
  isAdmin: boolean;
};

export function Comment({ id, comment, thumbs, isAdmin }: CommentProps) {
  const [thumbCount, setThumbCount] = useState(0);
  const [isThumbUp, setIsThumbUp] = useState(false);

  useEffect(() => {
    setThumbCount(thumbs);
  }, [thumbs]);

  const handleDelete = () => {
    fetch(`http://localhost:3001/comment?id=${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    });
  };

  const handleThumbUp = () => {
    if (isThumbUp === false && isAdmin === false) {
      fetch(`http://localhost:3001/thumbs?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        if (res.status === 404) {
          console.log("404");
          return;
        } else {
          return;
        }
      });
      setThumbCount(thumbCount + 1);
      setIsThumbUp(true);
    }
  };

  return (
    <StyledCommentDiv>
      <StyledComment>{comment}</StyledComment>
      {isAdmin && <StyledThumbsUp onClick={handleDelete}>삭제</StyledThumbsUp>}
      <StyledThumbsUp onClick={handleThumbUp}>
        공감 {thumbCount}개
      </StyledThumbsUp>
    </StyledCommentDiv>
  );
}
