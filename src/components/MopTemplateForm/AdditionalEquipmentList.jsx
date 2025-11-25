import React from 'react';
import EquipmentFields from './EquipmentFields';

export default function AdditionalEquipmentList({ 
  additionalEquipment, 
  onUpdate, 
  maxItems = 4 
}) {
  const handleRemove = (index) => {
    onUpdate(additionalEquipment.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    onUpdate([
      ...additionalEquipment,
      {
        deviceName: '',
        model: '',
        serialNumber: '',
        rackLocation: '',
        rackUnit: '',
        location: ''
      }
    ]);
  }

  const handleChange = (index, updatedEquipment) => {
    const updated = [...additionalEquipment];
    updated[index] = updatedEquipment;
    onUpdate(updated);
  };

  return (
    <>
      {additionalEquipment.map((equip, idx) => (
        <div 
          key={idx} 
          style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: '#f3f4f6', 
            borderRadius: '10px', 
            position: 'relative' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
            <button
              type="button"
              aria-label="Remove equipment"
              className="mop-download-btn"
              style={{
                background: '#e53e3e',
                color: '#fff',
                fontWeight: 700,
                width: '1.7rem',
                height: '1.7rem',
                fontSize: '1.3rem',
                borderRadius: '6px',
                boxShadow: '0 1px 4px rgba(229,62,62,0.10)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                marginBottom: 0,
                lineHeight: 1
              }}
              onClick={() => handleRemove(idx)}
            >
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%', 
                height: '100%' 
              }}>×</span>
            </button>
          </div>
          <EquipmentFields
            equipment={equip}
            onChange={(updated) => handleChange(idx, updated)}
            showDeviceNameList={true}
            filteredNodeNames={window.filteredNodeNames || []}
            onDeviceNameChange={async (deviceName) => {
              // Autofill for additional equipment
              if (!deviceName) return;
              const API_URL = import.meta.env.VITE_API_URL;
              try {
                const res = await fetch(`${API_URL}/api/device-info?name=${encodeURIComponent(deviceName)}`);
                if (!res.ok) return;
                const deviceData = await res.json();
                handleChange(idx, {
                  ...equip,
                  deviceName,
                  model: deviceData.model,
                  serialNumber: deviceData.serialNumber,
                  rackLocation: deviceData.rackLocation,
                  rackUnit: deviceData.rackUnit,
                  location: deviceData.location || ''
                });
              } catch (err) {
                // fail silently
              }
            }}
          />
          {/* Location field for additional equipment */}
          <input
            name="location"
            value={equip.location || ''}
            onChange={e => handleChange(idx, { ...equip, location: e.target.value })}
            placeholder="Location"
            className="modern-input"
            style={{ marginTop: '0.5em' }}
          />
        </div>
      ))}

      {additionalEquipment.length < maxItems && (
        <button
          type="button"
          className="mop-download-btn"
          style={{ marginBottom: '1rem', marginTop: '0.5rem' }}
          onClick={handleAdd}
        >
          Add Additional Equipment
        </button>
      )}
    </>
  );
}