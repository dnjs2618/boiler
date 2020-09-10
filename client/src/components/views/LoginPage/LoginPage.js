import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { NavLink, withRouter } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");

  const onHandlerEmail = (event) => {
    SetEmail(event.currentTarget.value);
  };
  const onHandlerPassword = (event) => {
    SetPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("로그인 정보가 올바르지 않습니다.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
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
        <button type="submit">Login</button>
        <ul>
          <li>
            <NavLink to="/" className="link">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/register" className="link">
              회원가입 하러가기
            </NavLink>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
