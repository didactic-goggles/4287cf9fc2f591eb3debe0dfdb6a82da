import { IProductData } from "../models/Product.model";

export function fetchProducts() {
  return new Promise<{ products: IProductData[] }>(async (resolve, reject) =>
    fetch(process.env.REACT_APP_API_URL, {
      method: 'GET',
      headers: {
        'X-Access-Token': process.env.REACT_APP_API_TOKEN
      }
    })
      .then((response) => response.json())
      .then((jsonData) => resolve(jsonData))
      .catch((error) => reject(error))
  );
}
