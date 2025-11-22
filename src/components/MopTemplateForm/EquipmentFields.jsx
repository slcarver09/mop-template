// components/MopTemplateForm/EquipmentFields.jsx
import React from 'react';

export default function EquipmentFields({ 
  equipment, 
  onChange, 
  showDeviceNameList = false,
  filteredNodeNames = [],
  onDeviceNameChange = null
}) {
  const handleFieldChange = (field, value) => {
    onChange({ ...equipment, [field]: value });
  };

  return (
    <>
      <input
        name="deviceName"
        value={equipment.deviceName || ''}
        onChange={(e) => {
          handleFieldChange('deviceName', e.target.value);
          if (onDeviceNameChange) {
            onDeviceNameChange(e.target.value);
          }
        }}
        placeholder="Device Name"
        className="modern-input"
        list={showDeviceNameList ? "filtered-node-names-list" : undefined}
      />
      {showDeviceNameList && (
        <datalist id="filtered-node-names-list">
          {filteredNodeNames.map(name => <option key={name} value={name} />)}
        </datalist>
      )}
      <input
        name="model"
        value={equipment.model || ''}
        onChange={(e) => handleFieldChange('model', e.target.value)}
        placeholder="Model"
        className="modern-input"
      />
      <input
        name="serialNumber"
        value={equipment.serialNumber || ''}
        onChange={(e) => handleFieldChange('serialNumber', e.target.value)}
        placeholder="Serial Number"
        className="modern-input"
      />
      <input
        name="rackLocation"
        value={equipment.rackLocation || ''}
        onChange={(e) => handleFieldChange('rackLocation', e.target.value)}
        placeholder="Rack Location"
        className="modern-input"
      />
      <input
        name="rackUnit"
        value={equipment.rackUnit || ''}
        onChange={(e) => handleFieldChange('rackUnit', e.target.value)}
        placeholder="Rack Unit Number"
        className="modern-input"
      />
    </>
  );
}