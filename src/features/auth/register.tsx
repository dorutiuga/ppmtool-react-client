import classNames from "classnames";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User } from "../../models/user-model";
import { register } from "../../service/auth-service";
import { getAuthErr, updateField } from "./user.slice";

const Register = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  let error = useAppSelector((state) => state.user.errMessage);
  const navigate = useNavigate();
  const validToken = useAppSelector((state) => state.user.validToken);

  useEffect(() => {
    if (validToken) {
      navigate("/dashboard");
    }
  }, [validToken, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      fullName: user.fullName,
      confirmPassword: user.confirmPassword,
      password: user.password,
      username: user.username,
    };
    try {
      await register(newUser);
    } catch (err: any) {
      dispatch(getAuthErr(err.response.data));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateField({ ...user, [e.target.name]: e.target.value }));
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": error.fullName,
                  })}
                  placeholder="Full Name"
                  name="fullName"
                  value={user.fullName}
                  onChange={(e) => handleChange(e)}
                />
                {error.fullName && (
                  <div className="invalid-feedback">{error.fullName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": error.username,
                  })}
                  placeholder="Email Address (Username)"
                  name="username"
                  value={user.username}
                  onChange={(e) => handleChange(e)}
                />
                {error.username && (
                  <div className="invalid-feedback">{error.username}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": error.password,
                  })}
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                />
                {error.password && (
                  <div className="invalid-feedback">{error.password}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": error.confirmPassword,
                  })}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={(e) => handleChange(e)}
                />
                {error.confirmPassword && (
                  <div className="invalid-feedback">
                    {error.confirmPassword}
                  </div>
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

export default Register;
