import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';

type CategoryType = {
  id: string,
  name: string,
};

type ProductType = {
  title: string,
  price: string,
  thumbnail: string,
  id: string,
};

function Home() {
  const [data, setData] = useState<CategoryType[]>();
  const [inputValue, setInputValue] = useState('');
  const [searchedValue, setSearchedValue] = useState<ProductType[]>([]);

  useEffect(() => {
    const getCategoriesData = async () => {
      const fetchCategories = await getCategories();
      setData(fetchCategories);
    };
    getCategoriesData();
  }, []);

  const handleSearchButton = async () => {
    const productsCategoryData = await getProductsFromCategoryAndQuery('', inputValue);
    setSearchedValue(productsCategoryData.results);
  };

  return (
    <div>
      <div>
        {data && data.map(({ name, id }) => {
          return (
            <button
              key={ id }
              data-testid="category"
            >
              {name}
            </button>
          );
        })}
      </div>

      <div>
        <label htmlFor="input-search">
          <input
            type="text"
            id="input-search"
            value={ inputValue }
            onChange={ (el) => setInputValue(el.target.value) }
            data-testid="query-input"
          />
          <button
            onClick={ handleSearchButton }
            data-testid="query-button"
          >
            Search
          </button>
        </label>
      </div>

      { searchedValue.length === 0 ? (
        <div>
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
          <Link to="/cart" data-testid="shopping-cart-button">
            <h1>Para o Carrinho</h1>
          </Link>
        </div>
      ) : (
        searchedValue.map(({ id, title, thumbnail, price }) => {
          return (
            <div
              key={ id }
              data-testid="product"
            >
              <h2>{ title }</h2>
              <img src={ thumbnail } alt={ title } />
              <p>{ price }</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Home;
