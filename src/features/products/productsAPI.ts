import { IProductData } from "./Product.model";

export function fetchProducts() {
  return new Promise<{ products: IProductData[] }>(async (resolve) =>
    fetch('https://teknasyon.netlify.app/.netlify/functions/products', {
      method: 'GET',
      headers: {
        'X-Access-Token': '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'
      }
    })
      .then((response) => response.json())
      .then((jsonData) => resolve(jsonData))
  );
}
