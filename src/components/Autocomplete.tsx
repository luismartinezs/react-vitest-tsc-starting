import React, { useEffect, useState } from "react";
import classnames from "classnames";
// you should import `lodash` as a whole module
import lodash from "lodash";
import axios from "axios";

// Data fetching with hooks:
// https://codesandbox.io/s/jvvkoo8pq3
// https://www.robinwieruch.de/react-hooks-fetch-data/

const API_URL = "https://hn.algolia.com/api/v1/search";
const DEBOUNCE_DELAY = 500;

export default function Autocomplete() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async (q) => {
      const url = `${API_URL}?=query=${q}`;
      try {
        const res = await axios.get(url);
        if (!ignore) {
          setItems(res.data);
        }
      } catch (err) {
        console.log(err);
        return null;
      }
    };

    if (query.length) {
      fetchData(query);
    }

    return () => {
      ignore = true;
    };
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="wrapper">
      <div className="control">
        <input
          type="text"
          className="input"
          aria-label="Search item"
          value={query}
          onChange={handleChange}
        />
      </div>
      <div className="list is-hoverable" />
      <ul>
        {items &&
          items.hits.map((hit, idx) => (
            <li key={idx}>
              <a href={hit.url}>{hit.title}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}
