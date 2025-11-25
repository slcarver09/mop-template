// components/MopTemplateForm/index.jsx
import React, { useState } from 'react';
import MopForm from './MopForm';
import MopPreview from './MopPreview';
import { usePopData } from '../../hooks/usePopData';
import { useDeviceData } from '../../hooks/useDeviceData';
import { generateMopPDF } from '../../utils/pdfGenerator';
import { sanitizeInput, PATTERNS, validatePattern } from '../../utils/security';

export default function MopTemplateForm() {
  const [form, setForm] = useState({
    pop: '',
    street: '',
    cityStateZip: '',
    deviceName: '',
    model: '',
    serialNumber: '',
    suite: '',
    rackLocation: '',
    rackUnit: '',
    additionalEquipment: [],
    date: '',
    time: '',
    equipment: '',
    summary: '',
    steps: '',
    callNOC: false,
    emergencyWork: false,
    hour: '',
    minute: '',
    timezone: '', // Add timezone field
  });

  const [filteredNodeNames, setFilteredNodeNames] = useState([]);

  // Custom hooks for API calls with loading and error states
  const { popCodes, loading: popLoading, error: popError, fetchPopAddress, fetchNodeNamesByPop } = usePopData();
  const { loading: deviceLoading, error: deviceError, fetchDeviceInfo } = useDeviceData();

  // Combine loading and error states
  const isLoading = popLoading || deviceLoading;
  const errors = [popError, deviceError].filter(Boolean);

  // Handle POP selection
  const handlePopChange = async (e) => {
    const popCode = e.target.value;
    
    // Sanitize the input (remove dangerous characters, limit length, make uppercase)
    const sanitized = sanitizeInput(popCode, 10).toUpperCase();
    
    // Always update the form (allow typing)
    setForm({ ...form, pop: sanitized });

    // Only validate and make API calls if it's exactly 4 letters
    if (sanitized.length === 4) {
      // Now validate the format
      if (!validatePattern(sanitized, PATTERNS.POP_CODE)) {
        console.warn('Invalid POP code format:', popCode);
        return; // Don't make API calls
      }

      // Valid! Make API calls
      const addressData = await fetchPopAddress(sanitized);
      if (addressData) {
        setForm(form => ({
          ...form,
          street: addressData.street,
          cityStateZip: addressData.cityStateZip
        }));
      }

      const nodeNames = await fetchNodeNamesByPop(sanitized);
      setFilteredNodeNames(nodeNames);
    }
  };

  // Handle device name selection
  const handleDeviceNameChange = async (deviceName) => {
    // Sanitize and validate device name
    const sanitized = sanitizeInput(deviceName, 100);
    
    if (sanitized && !validatePattern(sanitized, PATTERNS.DEVICE_NAME)) {
      console.warn('Invalid device name format:', deviceName);
      return;
    }
    
    const deviceData = await fetchDeviceInfo(sanitized);
    if (deviceData) {
      setForm(form => ({
        ...form,
        model: deviceData.model,
        serialNumber: deviceData.serialNumber,
        rackLocation: deviceData.rackLocation,
        rackUnit: deviceData.rackUnit,
        location: deviceData.location || ''
      }));
    }
  };

  // Handle all form field changes with sanitization
  const handleFormChange = (updates) => {
    const sanitizedUpdates = {};
    
    // Fields that should preserve newlines (textareas)
    const multilineFields = ['equipment', 'summary', 'steps'];
    
    // Loop through each field that's being updated
    Object.keys(updates).forEach(fieldName => {
      const value = updates[fieldName];
      
      // Only sanitize if it's a string (not booleans, arrays, etc.)
      if (typeof value === 'string') {
        // Determine max length based on field type
        const isLongTextField = multilineFields.includes(fieldName);
        const maxLength = isLongTextField ? 5000 : 255;
        
        // Sanitize the value, preserving newlines for multiline fields
        sanitizedUpdates[fieldName] = sanitizeInput(value, maxLength, isLongTextField);
      } else {
        // For non-strings (checkboxes, arrays), keep as-is
        sanitizedUpdates[fieldName] = value;
      }
    });
    
    // Update form with sanitized values
    setForm({ ...form, ...sanitizedUpdates });
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    // Prepare time value for PDF
    const formWithTime = {
      ...form,
      time: form.hour && form.minute ? `${form.hour}:${form.minute}` : ''
    };
    generateMopPDF(formWithTime);
  };

  return (
    <>
      {/* Display loading indicator */}
      {isLoading && (
        <div style={{
          backgroundColor: '#dbeafe',
          border: '1px solid #93c5fd',
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px',
          color: '#1e40af',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>⏳</span>
          <span>Loading...</span>
        </div>
      )}
      
      {/* Display errors if any */}
      {errors.length > 0 && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px',
          color: '#991b1b'
        }}>
          <strong>⚠️ Error:</strong>
          <ul style={{ marginTop: '0.5rem', marginBottom: 0, paddingLeft: '1.5rem' }}>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mop-flex-row">
        <MopForm
          form={form}
          onChange={handleFormChange}
          popCodes={popCodes}
          filteredNodeNames={filteredNodeNames}
          onPopChange={handlePopChange}
          onDeviceNameChange={handleDeviceNameChange}
        />
        <MopPreview form={form} />
      </div>
      
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
        marginBottom: '2rem'
      }}>
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="mop-download-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Download PDF'}
        </button>
      </div>
    </>
  );
}