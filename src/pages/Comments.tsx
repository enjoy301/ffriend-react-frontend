import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Content } from "../components/CommentBackground";
import { Title } from "../components/Title";
import { Comment } from "../components/Comment";
import Share from "../components/Share";

type CommentType = {
  id: number;
  comment: string;
  thumbs: number;
};

function Comments() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [commentList, setCommentList] = useState<Array<CommentType>>([]);
  const commentInput = useRef<HTMLInputElement>(null);
  let { uri } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/data?uri=${uri}`)
      .then((res) => {
        if (res.status === 404) {
          window.location.href = "/";
        }
        return res.json();
      })
      .then((res) => {
        setUsername(res.name);
        if (res.comments.length > 0) {
          setCommentList([...res.comments]);
        }
      });

    let kakaoId = localStorage.getItem("kakaoId");
    if (kakaoId) {
      fetch(`http://localhost:3001/uri?kakaoId=${kakaoId}`)
        .then((res) => {
          if (res.status === 404) {
            window.location.href = "/";
          }
          return res.json();
        })
        .then((res) => {
          if (uri === res.uri) {
            setIsAdmin(true);
          }
        });
    }
  }, [uri]);

  const onCommentSubmit = () => {
    if (commentInput.current && commentInput.current.value.trim().length > 0) {
      let comment = commentInput.current.value.trim();

      fetch(`http://localhost:3001/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uri: uri,
          comment: comment,
        }),
      })
        .then((res) => {
          if (res.status === 404) {
            console.log("404");
          }
          return res.json();
        })
        .then((res) => {
          if (res.id) {
            setCommentList([
              ...commentList,
              { id: res.id, comment: comment, thumbs: 0 },
            ]);

            if (commentInput.current) {
              commentInput.current.value = "";
            }
          }
        });
    }
  };

  return (
    <Content>
      <Title>우리가 생각하는 {username}</Title>
      {isAdmin ? (
        <Share></Share>
      ) : (
        <div>
          <input ref={commentInput}></input>
          <button onClick={onCommentSubmit}>전송</button>
        </div>
      )}
      <hr style={{ color: "black", height: "1px", width: "100%" }} />
      {commentList.length > 0 &&
        commentList.map((singleComment: CommentType, index: number) => (
          <Comment
            id={singleComment.id}
            key={index}
            comment={singleComment.comment}
            thumbs={singleComment.thumbs}
            isAdmin={isAdmin}
          />
        ))}
    </Content>
  );
}

export default Comments;
