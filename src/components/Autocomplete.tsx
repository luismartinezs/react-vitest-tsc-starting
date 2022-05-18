import React, { useEffect, useState, useMemo } from "react";
import classnames from "classnames";
// you should import `lodash` as a whole module
import lodash from "lodash";
import axios from "axios";

// Data fetching with hooks:
// https://codesandbox.io/s/jvvkoo8pq3
// https://www.robinwieruch.de/react-hooks-fetch-data/

const API_URL = "https://hn.algolia.com/api/v1/search";
const DEBOUNCE_DELAY = 500;

const useApi = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false; // tag to prevent setting state from unmounted components

    const fetchData = async (q) => {
      const url = `${API_URL}?=query=${q}`;
      setLoading(true);
      try {
        const res = await axios.get(url);
        if (!ignore) {
          setData(res.data);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (query.length) {
      fetchData(query);
    } else {
      setData(null);
    }

    return () => {
      ignore = true;
    };
  }, [query]);

  return [{ data, loading, error, query }, setQuery];
};

export default function Autocomplete() {
  const [{ data, loading, error }, setQuery] = useApi();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Memoize debounced handler, calls debounce only during initial render
  const debouncedHandleChange = useMemo(
    () => lodash.debounce(handleChange, DEBOUNCE_DELAY),
    [] // no dependencies
  );

  // stop invocation of debouncedHandleChange after component unmounts
  useEffect(() => {
    return () => {
      debouncedHandleChange.cancel()
    }
  }, [])

  return (
    <div className="wrapper">
      <div className="control">
        <input
          type="text"
          className="input"
          aria-label="Search item"
          onChange={debouncedHandleChange}
        />
      </div>
      <div className="list is-hoverable" />

      {error && <div>Something went wrong ...</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        data && (
          <ul>
            {data.hits.map((hit, idx) => (
              <li key={idx}>
                <a href={hit.url}>{hit.title}</a>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
