import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { PackType } from "./types";

const consumerKey = "ck_6b5d48c8734d6f9eea959ece2e45eea40de434b7";
const consumerSecret = "cs_fc88b9a570c46e98c32359362b7755c9710cd6f0";
const getOrdersEndpoint = "http://localhost/wp-json/wc/v3/orders";
const addedToCartEndpoint = "http://localhost/wp-json/wc/v3/cart/add";

interface ProductData {
  id: number;
  name: string;
  price: string;
  permalink: string;
}
declare let my_product_data: ProductData;
/*

let my_product_data: ProductData = {
  id: 4,
  name: "",
  permalink: "",
  price: "",
};*/
const useRequestHandle = () => {
  const [data, setData] = useState<ProductData | null>(null);
  const productData = my_product_data;

  const handleAddToCartProduct = async (
    quantity: number,
    selectedNumbers: string[],
    pack: string
  ) => {
    const buildUrl = `/?add-to-cart=${data?.id}&quantity=${quantity}&selectedNumbers=${selectedNumbers}`;
    window.location.href = buildUrl + (pack ? `&pack=${pack}` : ``);
  };

  const handleInitialData = () => {
    setData(productData);
  };

  useEffect(() => {
    handleInitialData();
  }, []);

  return {
    data,
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
