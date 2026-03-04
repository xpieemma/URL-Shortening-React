import axios from "axios";

export const shortenUrlDelay = async () => {
  await new Promise((res) => setTimeout(res, 1000));
  const randomCode = crypto.randomUUID().replace(/-/g, "").substring(0, 6);
  return `https://bit.ly/${randomCode}`;
};

export const shortenUrlBitly = async (Url) => {
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
        long_url: Url,
      },
      {
        headers: {
          Authorization: `Bearer ${BITLY_TOKEN}`,
          "content-Type": "application/json",
        },
      },
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
    throw new Error("An unknown error occurred.");
  }
};

export const urlViaProxy = async (Url) => {
  try {
    const response = await axios.post("/api/shorten", { Url });
    return response.data.link;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to shorten URL");
  }
};

export const shortUrl = import.meta.env.PROD ? urlViaProxy : shortenUrlDelay;