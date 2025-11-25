// components/MopTemplateForm/EquipmentPreview.jsx
import React from 'react';

export default function EquipmentPreview({ equipment, index = 0 }) {
  return (
    <>
      <span className="mop-preview-label">Device Name:</span>
      <span className="mop-preview-value">{equipment.deviceName}</span>
      <span className="mop-preview-label">Model:</span>
      <span className="mop-preview-value">{equipment.model}</span>
      <span className="mop-preview-label">Serial Number:</span>
      <span className="mop-preview-value">{equipment.serialNumber}</span>
      <span className="mop-preview-label">Suite:</span>
      <span className="mop-preview-value">{equipment.rackLocation}</span>
      <span className="mop-preview-label">Location:</span>
      <span className="mop-preview-value">{equipment.location}</span>
      <span className="mop-preview-label">Rack Unit Number:</span>
      <span className="mop-preview-value">{equipment.rackUnit}</span>
    </>
  );
}