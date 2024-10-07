import CryptoJS from "crypto-js";
import { useState } from "react";

const consumerKey = "ck_6b5d48c8734d6f9eea959ece2e45eea40de434b7"; // Reemplaza con tu Consumer Key
const consumerSecret = "cs_fc88b9a570c46e98c32359362b7755c9710cd6f0"; // Reemplaza con tu Consumer Secret
const apiUrl = "http://localhost:80/wp-json/wc/v3/orders"; // Reemplaza con tu URL de API
const useRequestHandle = () => {
  const [data, setData] = useState();
  const fetchOrders = async () => {
    const consumerKey: string = "ck_your_consumer_key"; // Reemplaza con tu consumer key
    const consumerSecret: string = "cs_your_consumer_secret"; // Reemplaza con tu consumer secret
    const url: string = "http://localhost/wp-json/wc/v3/orders";

    // Generar nonce y timestamp
    const nonce: string = Date.now().toString();
    const timestamp: string = Math.floor(Date.now() / 1000).toString();

    // Parámetros de la solicitud
    const params: Record<string, string> = {
      oauth_consumer_key: consumerKey,
      oauth_nonce: nonce,
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: timestamp,
      oauth_version: "1.0",
    };

    // Construir la cadena base
    const baseString: string = createBaseString("GET", url, params);

    // Generar la firma
    const signature: string = generateSignature(
      baseString,
      consumerSecret,
      null
    );

    // Añadir la firma a los parámetros
    params.oauth_signature = signature;

    // Hacer la solicitud fetch
    const response: Response = await fetch(
      `${url}?${new URLSearchParams(params)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data: any = await response.json();
    console.log(data);
    setData(await data);
  };

  // Función para crear la cadena base
  function createBaseString(
    method: string,
    url: string,
    params: Record<string, string>
  ): string {
    // Ordenar los parámetros
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

  // Función para generar la firma HMAC-SHA1
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

  // Llamar a la función
  return {
    fetchProducts: data,
  };
};

export default useRequestHandle;
