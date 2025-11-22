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
        suite: '',
        rackLocation: '',
        rackUnit: ''
      }
    ]);
  };

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