import { useSelector, useDispatch } from "react-redux";
import css from "./Header.module.css";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/authSelectors";
import { logout } from "../../redux/auth/authOperations";
import { NavLink } from "react-router-dom";

const Header = () => {
  const userInfo = useSelector(selectUser);

  const dispatch = useDispatch();

  const onHandleLogout = () => {
    dispatch(logout())
      .then(() => console.log("logout"))
      .catch((error) => console.log(error));
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      {isLoggedIn ? (
        <div className={css.header__wrapper}>
          <p className={css.header__user_info}>{userInfo}</p>
          <button
            type="button"
            className={css.header__logout_button}
            onClick={onHandleLogout}
          >
            LogOut
          </button>
        </div>
      ) : (
        <div className={css.redirect__links__wrapper}>
          <NavLink to="/signup" className={css.redirect__link}>
            {({ isActive }) => (
              <span
                className={`${css.redirect__link__span} ${
                  isActive ? css.active : ""
                }`}
              >
                Реєстрація
              </span>
            )}
          </NavLink>
          <NavLink to="/" className={css.redirect__link}>
            {({ isActive }) => (
              <span
                className={`${css.redirect__link__span} ${
                  isActive ? css.active : ""
                }`}
              >
                Вхід
              </span>
            )}
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
