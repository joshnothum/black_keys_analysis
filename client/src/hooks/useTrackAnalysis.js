import { useState, useEffect } from 'react';
import { getAnalysis } from '../api';

export function useTrackAnalysis(trackId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trackId) {
      setData(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    getAnalysis(trackId)
      .then((d) => {
        if (!cancelled) {
          setData(d);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [trackId]);

  return { data, loading, error };
}
