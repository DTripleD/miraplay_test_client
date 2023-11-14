import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authOperations";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onHandleSubmit = (event) => {
    event.preventDefault();
    dispatch(register({ email, password })).then(() =>
      toast.success("Success!")
    );
  };

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <label>
          введіть ваш email:
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          введіть ваш пароль:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <NavLink to="/signin">Login</NavLink>
    </div>
  );
};

export default SignUpPage;
