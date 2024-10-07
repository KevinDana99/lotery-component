import CryptoJS from "crypto-js";

const consumerKey = "ck_6b5d48c8734d6f9eea959ece2e45eea40de434b7"; // Reemplaza con tu Consumer Key
const consumerSecret = "cs_fc88b9a570c46e98c32359362b7755c9710cd6f0"; // Reemplaza con tu Consumer Secret
const apiUrl = "http://localhost:80/wp-json/wc/v3/orders"; // Reemplaza con tu URL de API

const useRequestHandle = () => {
  // Función para codificar en URI
  function encodeRFC3986(str: string): string {
    return encodeURIComponent(str).replace(/[!*'()]/g, escape);
  }

  // Función para generar un nonce
  function generateNonce(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  // Función para obtener el timestamp
  function getTimestamp(): string {
    return Math.floor(Date.now() / 1000).toString();
  }

  // Función para crear la firma de OAuth
  function createOAuthSignature(
    method: string,
    url: string,
    parameters: Record<string, string>
  ): string {
    const baseString = generateBaseString(method, url, parameters);
    const signingKey = `${encodeRFC3986(consumerSecret)}&`;
    return btoa(sign(signingKey, baseString));
  }

  // Función para generar el string base de OAuth
  function generateBaseString(
    method: string,
    url: string,
    parameters: Record<string, string>
  ): string {
    const sortedKeys = Object.keys(parameters).sort();
    const paramString = sortedKeys
      .map((key) => `${encodeRFC3986(key)}=${encodeRFC3986(parameters[key])}`)
      .join("&");
    return `${method.toUpperCase()}&${encodeRFC3986(url)}&${encodeRFC3986(
      paramString
    )}`;
  }

  // Función para firmar el string
  function sign(key: string, baseString: string): string {
    const hmac = CryptoJS.HmacSHA1(baseString, key);
    return hmac.toString(CryptoJS.enc.Base64);
  }

  // Función para realizar la solicitud GET a la API de WooCommerce
  async function fetchProducts(): Promise<void> {
    const method: string = "GET";
    const nonce: string = generateNonce();
    const timestamp: string = getTimestamp();

    // Parámetros de autenticación
    const parameters: Record<string, string> = {
      oauth_consumer_key: consumerKey,
      oauth_nonce: nonce,
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: timestamp,
      oauth_version: "1.0",
    };

    // Crear la firma de OAuth
    parameters.oauth_signature = createOAuthSignature(
      method,
      apiUrl,
      parameters
    );

    // Construir la URL con parámetros
    const urlWithParams: string = `${apiUrl}?${new URLSearchParams(
      parameters
    ).toString()}`;

    try {
      const response: Response = await fetch(urlWithParams, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: any = await response.json();
      console.log(data); // Imprimir los productos en la consola
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return {
    fetchProducts,
  };
};

export default useRequestHandle;
