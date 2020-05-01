import { useEffect, useState } from 'react';

function useApiRequest(url, options = {}) {
  const [data, setData] = useState<Array<object>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [url, options, setData]);
  return { loading, data, error };
}

function useToggle() {
  const [onState, setOnState] = useState(false);
  const toggle = setOnState(() => !onState);
  const setOn = setOnState(true);
  const setOff = setOnState(false);
  return { onState, toggle, setOn, setOff };
}

function useLocalStorage() {
  const [item, setItem] = useState(null);
}

export { useApiRequest, useToggle };
