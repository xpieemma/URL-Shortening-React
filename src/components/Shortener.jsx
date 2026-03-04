import { useState } from "react";
import { motion } from 'framer-motion';
import toast from "react-hot-toast";
import { shortUrl } from "../services/api";
import { validateAPI, validateEmptyInput } from "../utils/validators";

const Shortener = ({ onLinkShortened }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmptyInput(url)) {
      setError("Please add a link");
      toast.error("Please add a link");
      return;
    }

    let urlToShorten = url.trim();
    if (!/^https?:\/\//i.test(urlToShorten)) {
    urlToShorten = `https://${urlToShorten}`;
  }

    if (!validateAPI(urlToShorten)) {
      setError("Please enter a valid URL");
      toast.error("Please enter a valid URL");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        urlToShorten = "https://" + url;
      }

      const shortenedUrl = await shortUrl(urlToShorten);

      onLinkShortened({
        id: Date.now(),
        original: url,
        shortened: shortenedUrl,
        copied: false,
        createdAt: new Date().toISOString(),
      });

      setUrl("");
      toast.success("URL shortened successfully!", {
        className: "toast-success",
      });
    } catch (error) {
      setError(error.message);
      toast.error(error.message, {
        className: "toast-error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="shortener-form">
        <div className="form-group">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError("");
            }}
            placeholder="Shorten a link here..."
            className={`shortener-input ${error ? "error" : ""}`}
            disabled={loading}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "url-error" : undefined}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        <button type="submit" className="shortener-btn" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" />
              <span style={{ marginLeft: "10px" }}>Shortening...</span>
            </>
          ) : (
            "Shorten It!"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default Shortener;
