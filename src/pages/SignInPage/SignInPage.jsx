import { useState } from "react";
import { NavLink } from "react-router-dom";
import { login } from "../../redux/auth/authOperations";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onHandleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }))
      .then((res) => {
        if (
          res.payload.response?.status === 400 ||
          res.payload.response?.status === 409
        ) {
          toast.error(res.payload.response.data.message);
          throw new Error();
        }
        toast.success("Success!");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <label>
          Email
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <NavLink to="/signup">Register</NavLink>
    </div>
  );
};

export default SignInPage;
