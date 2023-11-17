import { useState } from "react";

import css from "./MainPage.module.css";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import GamesFilter from "../../components/GamesFilter.jsx/GamesFilter";
import svg from "../../images/icons/icons.svg";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(true);

  const [selectedOption, setSelectedOption] = useState("спочатку нові");
  const [allGames, setAllGames] = useState([]);
  const [gamesLenght, setGamesLenght] = useState(0);

  const { isLoading } = useQuery(
    ["repoData", page, selectedOption, selectedCategory],
    () =>
      fetch("https://api.miraplay.cloud/games/by_page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page,
          isFreshGamesFirst: selectedOption === "спочатку нові" ? true : false,
          genre: selectedCategory === "ALL" ? false : selectedCategory,
          gamesToShow: 9,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setAllGames(() => [...data.games]);
          setGamesLenght(data.gamesListLength);
          return data;
        })
  );

  return (
    <section className={css.allgames__section}>
      <div className={css.allgames__container}>
        <h4 className={css.allgames__title}>Всі ігри</h4>
        <GamesFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          size={size}
          setSize={setSize}
        />
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
                  <p className={css.game__descr}>
                    {game.gameDescription.length > 50
                      ? game.gameDescription.substring(0, 110) + "..."
                      : game.gameDescription}
                  </p>
                </div>
                <div className={css.game__genre_wrapper}>
                  {game.inTop && <p className={css.game__top}>TOP</p>}
                  <p className={css.game__genre_text}>{game.genre}</p>
                </div>
                {game.gameClass === "STANDART" && (
                  <p className={css.game__class}>БЕЗКОШТОВНО</p>
                )}
                <ul className={css.platform__list}>
                  <li className={css.platform__item}>
                    <svg className={css.platform__svg}>
                      <use href={svg + "#steam"} />
                    </svg>
                  </li>
                </ul>
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
            onClick={(event) => {
              event.preventDefault();
              setPage((prev) => prev + 1);
            }}
          >
            {isLoading ? <Loader /> : <div>Показати ще</div>}
          </button>
        )}
      </div>
    </section>
  );
};

export default MainPage;
