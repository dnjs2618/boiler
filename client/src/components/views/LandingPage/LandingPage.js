import React from "react";
import axios from "axios";
import "./landingpage.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  withRouter,
} from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

function LandingPage(props) {
  const onClickHandlerLogout = () => {
    axios.get("api/users/logout").then((response) => {
      if (response.data.success) {
        alert("로그아웃에 성공하셨습니다.");
        props.history.push("/login");
      } else {
        alert("로그아웃에 실패하였습니다.");
      }
    });
  };
  return (
    <div>
      <ul>
        <div className="left-column">
          <li>
            <NavLink to="/" className="link">
              Home
            </NavLink>
          </li>
        </div>
        <div className="right-column">
          <li>
            <NavLink to="/login" className="link">
              로그인
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className="link">
              회원가입
            </NavLink>
          </li>
          <li>
            <button onClick={onClickHandlerLogout} className="logout-btn">
              로그아웃
            </button>
          </li>
        </div>
      </ul>
      <h2 className="article"> 시작 페이지 </h2>
    </div>
  );
}

export default withRouter(LandingPage);
