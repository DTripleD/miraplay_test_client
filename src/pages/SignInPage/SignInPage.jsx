import { useState } from "react";
import { login } from "../../redux/auth/authOperations";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import css from "./SignInPage.module.css";

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
          res.payload.response?.status === 409 ||
          res.payload.response?.status === 401
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
            АВТОРИЗУВАТИСЯ
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignInPage;
