import { useState } from "react";
import { login } from "../../redux/auth/authOperations";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import css from "./SignInPage.module.css";
import Joi from "joi-browser";
import { schema } from "../../shared/schema";

const SignInPage = () => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onHandleSubmit = (event) => {
    event.preventDefault();

    if (errors.email) {
      return toast.error(errors.email);
    }

    if (errors.password) {
      return toast.error(errors.password);
    }

    dispatch(login(user))
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
      .then(() =>
        setUser({
          email: "",
          password: 0,
        })
      )
      .catch((error) => console.log(error));
  };

  const handleSave = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(event);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    let customerData = { ...user };
    customerData[name] = value;
    setUser(customerData);
    setErrors(errorData);
  };

  const validateProperty = (event) => {
    const { name, value } = event.target;
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  return (
    <section className={css.container}>
      <div>
        <form onSubmit={onHandleSubmit} className={css.form}>
          <label className={css.label}>
            введіть ваш email:
            <input
              type="email"
              name="email"
              onChange={handleSave}
              value={user.email}
              className={css.input}
              placeholder="youremail@mail.com"
            />
          </label>
          <label className={css.label}>
            введіть ваш пароль:
            <input
              type="password"
              name="password"
              onChange={handleSave}
              value={user.password}
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
