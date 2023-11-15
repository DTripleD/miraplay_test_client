import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authOperations";
import toast from "react-hot-toast";
import css from "../SignInPage/SignInPage.module.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onHandleSubmit = (event) => {
    event.preventDefault();
    dispatch(register({ email, password }))
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
    <section className={css.container}>
      <div>
        <div>
          <NavLink to="/signup" className={css.redirect__link}>
            Реєстрація
          </NavLink>
          <NavLink to="/" className={css.redirect__link}>
            Вхід
          </NavLink>
        </div>
        <form onSubmit={onHandleSubmit} className={css.form}>
          <label className={css.label}>
            введіть ваш email:
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={css.input}
              placeholder="youremail@mail.com"
            />
          </label>
          <label className={css.label}>
            введіть ваш пароль:
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={css.input}
              placeholder="ваш пароль"
            />
          </label>
          <button type="submit" className={css.authbutton}>
            РЕЄСТРАЦІЯ
          </button>
        </form>
        <p className={css.redirect__text}>
          Вже маєте акаунт?{" "}
          <span>
            {" "}
            <NavLink to="/" className={css.redirect__link}>
              Залогінитися
            </NavLink>
          </span>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
