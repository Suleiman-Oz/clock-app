import React, { useEffect, useState } from "react";
import "../css/main.css";
import axios from "axios";
import Current from "./Current";

const Header = () => {
  const [qoutes, setQoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fecthQoutes = async () => {
    setLoading(true);
    try {
      // const response = await axios.get("https://dummyjson.com/quotes");
      const response = await axios.get(
        "https://random-quotes-freeapi.vercel.app/api/quotes"
      );
      const chosenQoute = await response.data;
      console.log(chosenQoute)
      const qouteLists = chosenQoute;

      const random = Math.floor(Math.random() * qouteLists.length);
      setQoutes(qouteLists[random]);
      setError(null);
    } catch (err) {
      console.error("Error fetching qoutes:", err);
      setError("Failed to load qoutes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthQoutes();
  }, []);

  if (loading) {
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        fontSize: "40px",
      }}
    >
      Loading...
    </div>;
  }
  if (error) {
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error}
    </div>;
  }

  return (
    <>
      <main className="top-widgets">
        <article className="quote-wrapper">
          <div className="quote-wrapper__random">
            <q id="quote">{qoutes.quote}</q>
            <h2 className="author">{qoutes.author}</h2>
          </div>
          <button
            id="refresh"
            onClick={() => {
              fecthQoutes();
            }}
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z"
                filrule="nonzero"
              />
            </svg>
            <span className="sr-only">Click the refresh icon</span>
          </button>
        </article>
        <Current />
      </main>
    </>
  );
};

export default Header