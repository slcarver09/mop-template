// hooks/useDeviceData.js
import { useState } from 'react';

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

export const useDeviceData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDeviceInfo = async (deviceName) => {
    if (!deviceName) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}/api/device-info?name=${encodeURIComponent(deviceName)}`);
      
      if (!res.ok) {
        throw new Error(`Failed to load device info (${res.status})`);
      }
      
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Error fetching device info:', err);
      setError('Failed to load device information. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchDeviceInfo
  };
};