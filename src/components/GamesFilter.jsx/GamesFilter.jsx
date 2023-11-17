import { CATEGORIES, SORT_OPTIONS } from "../../shared/options";
import css from "./GamesFilter.module.css";
import svg from "../../images/icons/icons.svg";
import { useState } from "react";
import PropTypes from "prop-types";

const GamesFilter = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedOption,
  selectedOption,
  size,
  setSize,
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  return (
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
            <div
              className={css.select__wrapper}
              onClick={() => setIsOpenSelect((prev) => !prev)}
            >
              <svg className={`${css.svg} ${isOpenSelect && css.svg__open}`}>
                <use href={svg + "#icon-play"} />
              </svg>
              <p className={css.selected__text}>{selectedOption}</p>
              {isOpenSelect && (
                <ul className={css.select__list}>
                  {SORT_OPTIONS.filter(
                    (option) => option !== selectedOption
                  ).map((filteredOptions) => (
                    <li
                      key={filteredOptions}
                      className={css.select__item}
                      onClick={() => setSelectedOption(filteredOptions)}
                    >
                      {filteredOptions}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
            <svg
              className={`${css.svg_filter} ${isOpenSelect && css.svg__open}`}
            >
              <use href={svg + "#icon-table"} />
            </svg>
          </button>
          <button
            className={`${css.filter__button} ${
              !size ? css.filter__button__selected : ""
            }`}
            onClick={() => setSize(false)}
          >
            <svg
              className={`${css.svg_filter} ${isOpenSelect && css.svg__open}`}
            >
              <use href={svg + "#icon-insert-template"} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesFilter;

GamesFilter.propTypes = {
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
  setSelectedOption: PropTypes.func,
  selectedOption: PropTypes.string,
  size: PropTypes.bool,
  setSize: PropTypes.func,
};
