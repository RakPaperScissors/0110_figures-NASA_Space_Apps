import { useState, useEffect, useCallback } from 'react';
import { getActiveFloodMarks } from '../api/floodMarksApi';

export const useFloodMarks = () => {
  const [marks, setMarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getActiveFloodMarks();
      setMarks(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarks();
  }, [fetchMarks]);

  return { marks, isLoading, error, refetch: fetchMarks };
};