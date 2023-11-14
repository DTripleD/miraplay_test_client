import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/games/gamesOperations.js";
import { selectAllGames } from "../../redux/games/gamesSelectors.js";

const CATEGORIES = [
  "всі",
  "безкоштовні",
  "мова",
  "шутери",
  "лаунчери",
  "mmorpg",
  "стратегії",
  "файтинг",
  "гонки",
  "виживання",
  "онлайн",
];

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getGames({
        page: 1,
        isFreshGamesFirst: true,
        genre: "SURVIVAL",
        gamesToShow: 9,
      })
    );
  }, [dispatch]);

  const allGames = useSelector(selectAllGames);

  console.log(allGames);

  return (
    <>
      {CATEGORIES.map((category) => (
        <button key={category} className="button__categoty">
          {category}
        </button>
      ))}
      <ul>
        {allGames.map((game) => (
          <li key={game._id}>
            <img src={game.gameImage} alt={game.gameDescription} />
            <h4 className="game__name">{game.commonGameName}</h4>

            <p className="game__descr">{game.gameDescription}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
