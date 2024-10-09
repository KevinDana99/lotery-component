import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { PackType } from "./types";

interface ProductData {
  id: number;
  name: string;
  price: string;
  permalink: string;
}
/*
not react
let my_product_data: ProductData = {
  id: 4,
  name: "",
  permalink: "",
  price: "",
};


*/

declare let my_product_data: ProductData;
const useRequestHandle = () => {
  const [data, setData] = useState<ProductData | null>(null);
  const productData = my_product_data;

  const handleAddToCartProduct = async (
    quantity: number,
    selectedNumbers: string[],
    packPrice: string | null
  ) => {
    const buildUrl = `/?add-to-cart=${data?.id}&quantity=${quantity}&selectedNumbers=${selectedNumbers}`;
    console.log(buildUrl + (packPrice ? `&pack=${packPrice}` : ``));
    window.location.href = buildUrl + (packPrice ? `&pack=${packPrice}` : ``);
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
