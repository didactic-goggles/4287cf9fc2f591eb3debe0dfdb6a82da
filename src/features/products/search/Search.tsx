import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { searchProducts } from '../productsSlice';
import styles from './Search.module.scss';
import { ReactComponent as SearchIcon } from '../../../assets/icon-search.svg';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    dispatch(searchProducts(searchValue));
  }, [searchValue, dispatch]);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className={styles.search_container}>
      <label htmlFor="product-search" className={styles.search_icon}>
        <SearchIcon />
      </label>
      <input
        className={styles.search_input}
        type="text"
        id="product-search"
        value={searchValue}
        onChange={onChangeSearchTitle}
      />
    </div>
  );
};

export default Search;
