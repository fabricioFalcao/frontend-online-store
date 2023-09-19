export async function getCategories() {
  const categoryEndPoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const categories = await fetch(categoryEndPoint);
  const categoriesData = await categories.json();

  return categoriesData;
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  const categoryUrl = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const queryUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  const fetchCategory = await fetch(categoryUrl);
  const fetchQuery = await fetch(queryUrl);

  const dataCategory = await fetchCategory.json();
  const dataQuery = await fetchQuery.json();

  console.log(dataCategory);
  return dataQuery;
}

export async function getProductById(productId: string) {
  const productIdUrl = `https://api.mercadolibre.com/items/${productId}`;
  const fetchProductId = await fetch(productIdUrl);
  const dataProductId = await fetchProductId.json();

  return dataProductId;
}
