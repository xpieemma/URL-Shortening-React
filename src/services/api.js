import axios from "axios";


export const shortenUrlDelay = async (url) => {  
  await new Promise((res) => setTimeout(res, 1000));
  
  
  const urlHash = Array.from(url).reduce((hash, char) => {
    return ((hash << 5) - hash) + char.charCodeAt(0) | 0;
  }, 0);
  const hashString = Math.abs(urlHash).toString(36).substring(0, 6);
  
  return `https://bit.ly/${hashString}`;  
};


export const shortenUrlBitly = async (url) => {

  const BITLY_API_URL =
    process.env.VITE_BITLY_API_URL || "https://api-ssl.bitly.com/v4/shorten";
  const BITLY_TOKEN = process.env.VITE_BITLY_TOKEN;
  const BITLY_GROUP_GUID = process.env.VITE_BITLY_GROUP_GUID;

  console.log('Shortening URL with Bitly:', url); 

  try {
    const response = await axios.post(
      BITLY_API_URL,
      {
        group_guid: BITLY_GROUP_GUID,
        domain: "bit.ly",
        long_url: url,  
      },
      {
        headers: {
          Authorization: `Bearer ${BITLY_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.link;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message || "Failed to shorten URL");
    } else if (err.request) {
      throw new Error(
        "No response from server. Please check your internet connection.",
      );
    }
    throw new Error("Failed to shorten URL");
  }
};


export const urlViaProxy = async (url) => {
  console.log('Sending to proxy:', url); 
  
  try {
    const response = await axios.post("/api/shorten", { 
      Url: url 
    });
    return response.data.link;
  } catch (err) {
    console.error('Proxy error:', err.response?.data || err.message);
    throw new Error(err.response?.data?.error || err.response?.data?.message || "Failed to shorten URL");
  }
};

export const shortUrl = import.meta.env.PROD ? urlViaProxy : shortenUrlDelay;