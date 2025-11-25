// components/MopTemplateForm/MopPreview.jsx
import React from 'react';
import EquipmentPreview from './EquipmentPreview';

export default function MopPreview({ form }) {
  return (
    <div 
      className="mop-card" 
      style={{ 
        position: 'sticky', 
        top: 24, 
        alignSelf: 'flex-start', 
        height: 'fit-content' 
      }}
    >
      <h2 className="mop-preview-title">Live MOP Preview</h2>
      
      {form.callNOC && (
        <div className="mop-noc-blurb">
          Please call the NOC before beginning the work detailed here-in: <b>317-278-6622</b>
        </div>
      )}
      
      <div className="mop-preview-content">
        <div className="mop-preview-section">
          <strong>Site Address:</strong>
          <span className="mop-preview-value">{form.pop}</span>
          <span className="mop-preview-value">{form.street}</span>
          <span className="mop-preview-value">{form.cityStateZip}</span>
        </div>
        
        <div className="mop-preview-section">
          <strong>Internet2 Equipment Location:</strong>
          <div className="mop-preview-equip-grid">
            <EquipmentPreview equipment={form} />
            {form.additionalEquipment.map((equip, idx) => (
                <EquipmentPreview key={idx} equipment={{
                  ...equip,
                  deviceName: `${equip.deviceName} (${idx + 2})`
                }} />
            ))}
          </div>
        </div>
        
        <div className="mop-preview-section">
          <strong>Date & Time:</strong>
          <span className="mop-preview-value">
            {form.emergencyWork
              ? 'Emergency - As Soon As Possible.'
              : `${form.date} ${form.hour && form.minute ? `${form.hour}:${form.minute}` : ''}`}
          </span>
        </div>
        
        <div className="mop-preview-section">
          <strong>Equipment Needed:</strong>
          <span className="mop-preview-value">{form.equipment}</span>
          {form.shipmentRequired && (
            <div className="mop-preview-value" style={{ marginTop: '0.5em', fontStyle: 'italic' }}>
              Inbound received package found in ticket number <b>{form.ticketNumber || '[ticket number]'}</b>. The part should be a <b>{form.partId || '[part id]'}</b> with tracking number <b>{form.trackingNumber || '[tracking number]'}</b>.
            </div>
          )}
        </div>
        
        <div className="mop-preview-section">
          <strong>Summary:</strong>
          <span className="mop-preview-value">{form.summary}</span>
        </div>
        
        <div className="mop-preview-section">
          <strong>MOP:</strong>
          <span className="mop-preview-value">{form.steps}</span>
        </div>
      </div>
    </div>
  );
}