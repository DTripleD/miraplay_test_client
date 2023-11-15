import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/games/gamesOperations.js";
import {
  selectAllGames,
  selectGamesLength,
} from "../../redux/games/gamesSelectors.js";
import css from "./MainPage.module.css";

const CATEGORIES = [
  "всі ALL",
  "безкоштовні FREE",
  "мова MOBA",
  "шутери SHOOTERS",
  "лаунчери LAUNCHERS",
  "mmorpg MMORPG",
  "стратегії STRATEGY",
  "файтинг FIGHTING",
  "гонки RACING",
  "виживання SURVIVAL ",
  "онлайн ONLINE",
];

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getGames({
        page,
        isFreshGamesFirst: true,
        genre: selectedCategory === "ALL" ? false : selectedCategory,
        gamesToShow: 9,
      })
    );
  }, [dispatch, page, selectedCategory]);

  const allGames = useSelector(selectAllGames);

  const gamesLenght = useSelector(selectGamesLength);

  return (
    <section className={css.allgames__section}>
      <div className={css.allgames__container}>
        <h4 className={css.allgames__title}>Всі ігри</h4>
        <div className={css.filter__wrapper}>
          <ul className={css.button__list}>
            {CATEGORIES.map((category) => (
              <li
                key={category.split(" ")[0]}
                className={`${css.button__category} ${
                  selectedCategory === category.split(" ")[1]
                    ? css.button__category_selected
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.split(" ")[1])}
              >
                {category.split(" ")[0]}
              </li>
            ))}
          </ul>
          <div className={css.filter__right_side}>
            <div className={css.filter_sort}>
              <div className={css.filter__select}>
                <h4 className={css.filter__sorttitle}>Сортувати:</h4>
                <select name="" id=""></select>
              </div>
            </div>

            <div className={css.filter__buttonswrapper}>
              <h5 className={css.filter__sorttitle}>Розмір:</h5>
              <button
                className={`${css.filter__button} ${
                  size ? css.filter__button__selected : ""
                }`}
                onClick={() => setSize(true)}
              >
                a
              </button>
              <button
                className={`${css.filter__button} ${
                  !size ? css.filter__button__selected : ""
                }`}
                onClick={() => setSize(false)}
              >
                b
              </button>
            </div>
          </div>
        </div>
        <ul className={css.game__list}>
          {allGames.map((game) =>
            size ? (
              <li key={game._id} className={css.game__item}>
                <img
                  src={game.gameImage}
                  alt={game.gameDescription}
                  className={css.game__image}
                />
                <div className={css.game__text_wrapper}>
                  <h4 className={css.game__name}>{game.commonGameName}</h4>

                  <p className={css.game__descr}>{game.gameDescription}</p>
                </div>
                <div className={css.game__genre_wrapper}>
                  {game.inTop && <p className={css.game__top}>TOP</p>}
                  <p className={css.game__genre_text}>{game.genre}</p>
                </div>
                {game.gameClass === "STANDART" && (
                  <p className={css.game__class}>БЕЗКОШТОВНО</p>
                )}
              </li>
            ) : (
              <li key={game._id} className={css.game__item__small}>
                <img
                  src={game.gameImage}
                  alt={game.gameDescription}
                  className={css.game__image__small}
                />

                <h3 className={css.game__name__small}>{game.commonGameName}</h3>
              </li>
            )
          )}
        </ul>
        {allGames.length < gamesLenght && (
          <button
            className={css.button__showmore}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Показати ще
          </button>
        )}
      </div>
    </section>
  );
};

export default MainPage;
