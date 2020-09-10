import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../../_actions/user_action";
import { NavLink, withRouter } from "react-router-dom";
function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, SetEmail] = useState("");
  const [Name, SetName] = useState("");
  const [Password, SetPassword] = useState("");
  const [ComparePassword, SetComparePassword] = useState("");

  const onHandlerEmail = (event) => {
    SetEmail(event.currentTarget.value);
  };
  const onHandlerPassword = (event) => {
    SetPassword(event.currentTarget.value);
  };

  const onHandlerName = (event) => {
    SetName(event.currentTarget.value);
  };

  const onHandlerComparePassword = (event) => {
    SetComparePassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ComparePassword) {
      alert("패스워드가 일치하지 않습니다. 다시 시도해주세요");
      return;
    }
    if (Password.length <= 5) {
      alert("패스워드는 6자리 이상입력해주세요.");
    }
    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(RegisterUser(body)).then((response) => {
      console.log(response.payload);
      if (response.payload.Success) {
        alert("회원가입에 성공하였습니다.");
        props.history.push("/login");
      } else {
        alert(response.payload.message);
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h2 style={{ marginRight: "30px" }}>회원 가입 하기</h2>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="email">Email을 입력하세요</label>
        <input
          style={{
            marginTop: "10px",
            marginBottom: "30px",
            padding: "8px",
            width: "200px",
          }}
          type="email"
          id="email"
          value={Email}
          onChange={onHandlerEmail}
        />

        <label htmlFor="name">이름을 입력하세요</label>
        <input
          style={{
            marginTop: "10px",
            marginBottom: "30px",
            padding: "8px",
            width: "200px",
          }}
          type="text"
          id="name"
          value={Name}
          onChange={onHandlerName}
        />

        <label htmlFor="password">비밀번호를 입력하세요</label>
        <input
          style={{
            marginTop: "10px",
            marginBottom: "30px",
            padding: "8px",
            width: "200px",
          }}
          id="password"
          type="password"
          value={Password}
          onChange={onHandlerPassword}
        />

        <label htmlFor="comparepassword">
          비밀번호를 다시 한번 입력해주세요
        </label>
        <input
          style={{
            marginTop: "10px",
            marginBottom: "30px",
            padding: "8px",
            width: "200px",
          }}
          id="comparepassword"
          type="password"
          value={ComparePassword}
          onChange={onHandlerComparePassword}
        />
        <button type="submit">회원가입</button>
      </form>
      <ul>
        <li>
          <NavLink to="/" className="link">
            Home
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default withRouter(RegisterPage);
