import { useSelector, useDispatch } from "react-redux";
import css from "./Header.module.css";
import { selectUser } from "../../redux/auth/authSelectors";
import { logout } from "../../redux/auth/authOperations";

const Header = () => {
  const userInfo = useSelector(selectUser);

  const dispatch = useDispatch();

  const onHandleLogout = () => {
    dispatch(logout())
      .then(() => console.log("logout"))
      .catch((error) => console.log(error));
  };

  return (
    <header className={css.header}>
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
    </header>
  );
};

export default Header;
