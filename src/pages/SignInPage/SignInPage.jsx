import { useState } from "react";
import { NavLink } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = (event) => {
    event.preventDefault();
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
