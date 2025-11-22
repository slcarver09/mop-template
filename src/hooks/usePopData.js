// hooks/usePopData.js
import { useState, useEffect } from 'react';

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

export const usePopData = () => {
  const [popCodes, setPopCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopCodes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`${API_URL}/api/pop-codes`);
        
        if (!res.ok) {
          throw new Error(`Failed to load POP codes (${res.status})`);
        }
        
        const data = await res.json();
        setPopCodes(data);
      } catch (err) {
        console.error('Error fetching POP codes:', err);
        setError('Failed to load POP codes. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchPopCodes();
  }, []);

  const fetchPopAddress = async (popCode) => {
    if (!popCode) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}/api/pop-address?code=${popCode}`);
      
      if (!res.ok) {
        throw new Error(`Failed to load address (${res.status})`);
      }
      
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Error fetching POP address:', err);
      setError('Failed to load address. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchNodeNamesByPop = async (popCode) => {
    if (!popCode) return [];
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}/api/node-names-by-pop?pop=${popCode}`);
      
      if (!res.ok) {
        throw new Error(`Failed to load device names (${res.status})`);
      }
      
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Error fetching node names:', err);
      setError('Failed to load device names. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    popCodes,
    loading,
    error,
    fetchPopAddress,
    fetchNodeNamesByPop
  };
};