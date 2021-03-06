import "./LoginForm.css";

import React, { Component, FormEvent } from "react";

import logo from "assets/img/logo_basic.png";
import loader from "assets/preloader/Spinner.gif";
import { IHandlePage } from "../../../../App";
import { RequestHandler } from "../../../../../../util/RequestHandler";

interface ILoginFormProps {
  handlePage: IHandlePage;
}

interface ILoginFormState {
  id: string;
  pw: string;
  loading: boolean;
  error: string;
  [key: string]: string | boolean;
}

interface ILoginData {
  level: number;
}

export default class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
  constructor(props: ILoginFormProps) {
    super(props);

    this.state = {
      id: "",
      pw: "",
      loading: false,
      error: ""
    };
  }

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, pw } = this.state;

    this.setState({ loading: true });

    const requestHandler = new RequestHandler();
    const uri = `${process.env.REACT_APP_API_URL}/api/login`;
    const body = { id, pw };
    const result = await requestHandler.post(uri, body);

    if (result.error === "") {
      localStorage.setItem("x-access-token", result.data);
      setTimeout(() => {
        this.props.handlePage("/");
      }, 500);
    }

    this.setState({ loading: result.error === "" ? true : false, error: result.error });
  };

  render() {
    const { id, pw, loading, error } = this.state;
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    if (loading) {
      return (
        <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
          <div className="login-form-container">
            <img className="pre-loader" src={loader} />
          </div>
        </div>
      );
    }

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <div className="login-form-container">
          <div>
            <div className="login-logo">
              <img src={logo} />
            </div>
            <div className="login-form-box">
              <div className="login-title">
                <i className="fa fa-sign-in" />
                로그인
              </div>
              <hr />
              <form className="login-form-input" method="post" onSubmit={this.handleSubmit}>
                <label htmlFor="id">USERNAME</label>
                <input
                  type="text"
                  name="u_id"
                  id="id"
                  placeholder="회원아이디"
                  required
                  value={id}
                  onChange={this.handleChange}
                />
                <label htmlFor="pw">PASSWORD</label>
                <input
                  type="password"
                  name="u_pw"
                  id="pw"
                  placeholder="비밀번호"
                  required
                  value={pw}
                  onChange={this.handleChange}
                />
                <div className="login-error-msg">{error}</div>
                <input type="submit" id="btn-login" value="SIGN IN" disabled={loading} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
