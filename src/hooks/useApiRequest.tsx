import { useEffect, useState } from 'react';

function useApiRequest<Type>(url, options?: Type) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [url, options]);
  return { loading, data, error };
}

export { useApiRequest };
