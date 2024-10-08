import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

const consumerKey = "ck_6b5d48c8734d6f9eea959ece2e45eea40de434b7";
const consumerSecret = "cs_fc88b9a570c46e98c32359362b7755c9710cd6f0";
const getOrdersEndpoint = "http://localhost/wp-json/wc/v3/orders";
const addedToCartEndpoint = "http://localhost/wp-json/wc/v3/cart/add";

interface ProductData {
  id: number;
  name: string;
  price: string; // o number, dependiendo de cómo estés manejando el precio
  permalink: string;
}

// Declara la variable global
declare const my_product_data: ProductData;

const useRequestHandle = () => {
  const [data, setData] = useState();
  const productData = my_product_data;

  const handleAddToCartProduct = async () => {
    console.log({ productData });
  };

  useEffect(() => {
    handleAddToCartProduct();
  }, []);

  return {
    fetchProducts: data,
    handleAddToCartProduct,
  };
};

export default useRequestHandle;

/*const handleFetch = async (
    url: string,
    { method, body }: { method: string; body?: Object }
  ) => {
    const credentials = btoa(`${consumerKey}:${consumerSecret}`); // Codifica las credenciales en Base64

    const req = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(body),
    });

    const res = await req.json();
    setData(res);
  };
*/
