export async function getCategories() {
  const categoryEndPoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const categories = await fetch(categoryEndPoint);
  const categoriesData = await categories.json();

  return categoriesData;
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  const categoryAndQueryUrl = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;

  const fetchCategoryAndQuery = await fetch(categoryAndQueryUrl);

  const dataCategoryAndQuery = await fetchCategoryAndQuery.json();

  return dataCategoryAndQuery;
}

export async function getProductById(productId: string) {
  const productIdUrl = `https://api.mercadolibre.com/items/${productId}`;
  const fetchProductId = await fetch(productIdUrl);
  const dataProductId = await fetchProductId.json();

  return dataProductId;
}
