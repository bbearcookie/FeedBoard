import { useState } from 'react';

function useRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  async function call(requestThunk, ...params) {
    setLoading(true);
    
    try {
      const result = await requestThunk(...params);
      setData(result.data);
      setLoading(false);
      return result.data;
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
      throw err;
    }
    
  };

  return { call, data, loading, error };
}

export default useRequest;