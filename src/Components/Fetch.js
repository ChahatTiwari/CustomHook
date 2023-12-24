import React, { useState, useEffect } from 'react';
const useFetch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos'
        );
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return { data, error };
};

export default useFetch;
