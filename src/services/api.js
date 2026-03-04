import axios from "axios";

// For local development with mock delay
export const shortenUrlDelay = async (url) => {
  await new Promise((res) => setTimeout(res, 1000));
  const randomCode = crypto.randomUUID().replace(/-/g, "").substring(0, 6);
  return `https://bit.ly/${randomCode}`;
};

// Direct Bitly API call (used in development)
export const shortenUrlBitly = async (url) => {
 
  const BITLY_API_URL =
    import.meta.env.BITLY_API_URL || "https://api-ssl.bitly.com/v4/shorten";
  const BITLY_TOKEN = import.meta.env.BITLY_TOKEN;
  const BITLY_GROUP_GUID = import.meta.env.BITLY_GROUP_GUID;

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
          "Content-Type": "application/json", // Fixed: capital C and T
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
    throw new Error("Failed to shorten URL"); // Changed from "An unknown error occurred"
  }
};

// Proxy via Vercel serverless function (used in production)
export const urlViaProxy = async (url) => {
  try {
    const response = await axios.post("/api/shorten", { Url: url });
    return response.data.link;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.response?.data?.message || "Failed to shorten URL");
  }
};

// Use proxy in production, mock delay in development
export const shortUrl = import.meta.env.PROD ? urlViaProxy : shortenUrlDelay;