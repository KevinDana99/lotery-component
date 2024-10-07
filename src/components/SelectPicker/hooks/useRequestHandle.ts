import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

const consumerKey = "ck_6b5d48c8734d6f9eea959ece2e45eea40de434b7";
const consumerSecret = "cs_fc88b9a570c46e98c32359362b7755c9710cd6f0";
const getOrdersEndpoint = "http://localhost/wp-json/wc/v3/orders";
const addedToCartEndpoint = "http://localhost/wp-json/wc/v3/cart/add";
declare let woocommerce_api: {
  nonce: string;
  url: string; // Si también necesitas acceder a la URL, agrégala aquí
};
const useRequestHandle = () => {
  const [data, setData] = useState();
  const handleFetch = async (
    url: string,
    { method, body }: { method: string; body?: Object }
  ) => {
    const API_WC_NONCE = woocommerce_api.nonce;
    console.log({ API_WC_NONCE });
    const timestamp: string = Math.floor(Date.now() / 1000).toString();

    const params: Record<string, string> = {
      oauth_consumer_key: consumerKey,
      oauth_nonce: API_WC_NONCE,
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: timestamp,
      oauth_version: "1.0",
    };

    const baseString: string = createBaseString("GET", url, params);

    const signature: string = generateSignature(
      baseString,
      consumerSecret,
      null
    );

    params.oauth_signature = signature;

    const response: Response = await fetch(
      `${url}?${new URLSearchParams(params)}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": API_WC_NONCE,
        },
        body: JSON.stringify(body),
      }
    );

    const data: any = await response.json();
    console.log(data);
    setData(await data);
  };

  function createBaseString(
    method: string,
    url: string,
    params: Record<string, string>
  ): string {
    const sortedParams: string = Object.keys(params)
      .sort()
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    return `${method}&${encodeURIComponent(url)}&${encodeURIComponent(
      sortedParams
    )}`;
  }

  function generateSignature(
    baseString: string,
    consumerSecret: string,
    tokenSecret: string | null
  ): string {
    const key: string = `${encodeURIComponent(
      consumerSecret
    )}&${encodeURIComponent(tokenSecret || "")}`;
    return CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64);
  }

  const handleAddToCartProduct = async () => {
    await handleFetch(addedToCartEndpoint, {
      method: "POST",
      body: {
        product_id: 3,
        quantity: 10,
      },
    });
  };

  const handleGetProducts = async () => {
    await handleFetch(getOrdersEndpoint, { method: "GET" });
  };

  useEffect(() => {
    handleAddToCartProduct();
  }, []);

  return {
    fetchProducts: data,
  };
};

export default useRequestHandle;
