import classNames from "classnames";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setJWTToken } from "../../helpers/security";
import { Credential, User } from "../../models/user-model";
import { login } from "../../service/auth-service";
import {
  getLoginError,
  setCurrentUser,
  updateLoginCredentials,
} from "./user.slice";

const Login = () => {
  const credentials = useAppSelector((state) => state.user.credentials);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.user.credentialErr);
  const validToken = useAppSelector((state) => state.user.validToken);

  useEffect(() => {
    if (validToken) {
      navigate("/dashboard");
    }
  }, [validToken, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateLoginCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const LoginRequest: Credential = {
      username: credentials.username,
      password: credentials.password,
    };
    try {
      const res = await login(LoginRequest);
      const { token } = res;
      localStorage.setItem("jwtToken", token);
      setJWTToken(token);
      const decode: User = jwtDecode(token);
      dispatch(setCurrentUser(decode));
      token && navigate("/dashboard");
    } catch (err: any) {
      dispatch(getLoginError(err.response.data));
    }
  };
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group mb-2">
                <input
                  type="email"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": error.username,
                  })}
                  placeholder="Email Address"
                  name="username"
                  value={credentials.username}
                  onChange={(e) => handleChange(e)}
                />
                {error.username && (
                  <div className="invalid-feedback">{error.username}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": error.password,
                  })}
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={(e) => handleChange(e)}
                />
                {error.password && (
                  <div className="invalid-feedback">{error.password}</div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
