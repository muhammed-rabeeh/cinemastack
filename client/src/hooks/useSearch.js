import { useEffect, useState } from 'react';

const useSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const url = 'http://localhost:4500/api/movies?search=';

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);

      fetch(url + query)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Could'nt fetch movie data ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  return { query, setQuery, results, loading, error };
}

export default useSearch;