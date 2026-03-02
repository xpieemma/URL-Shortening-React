import { useState } from "react";
import { shortUrl } from "../services/api";

export default function Shortener({ onLink }) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (el) => {
    el.preventDefault();

    let urlToBeShorted = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      urlToBeShorted = "https://" + url;
    }

    const shortenedUrl = await shortUrl(urlToBeShorted);
    onLink({
      id: Date.now(),
      original: url,
      shortened: shortenedUrl,
      copied: false,
      createAt: new Date.toISOString(),
    });
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="shortener-form">
      <input
        type="text"
        value={url}
        onChange={(el) => {
          setUrl(el.target.value);
        }}
        placeHolder="Shorten a link here..."
      />
    </form>
  );
}
