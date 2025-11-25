// components/MopTemplateForm/MopForm.jsx
import React from 'react';
import EquipmentFields from './EquipmentFields';
import AdditionalEquipmentList from './AdditionalEquipmentList';

export default function MopForm({ 
  form, 
  onChange, 
  popCodes, 
  filteredNodeNames,
  onPopChange,
  onDeviceNameChange
}) {
  const handleChange = (e) => {
    onChange({ ...form, [e.target.name]: e.target.value });
  };

  // Prevent form submission on Enter key in textareas
  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Allow Enter key to create new lines
      e.stopPropagation();
    }
  };

  // US Timezones
  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Phoenix', label: 'Arizona Time (MST - No DST)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)' },
  ];

  return (
    <form className="mop-card" onSubmit={(e) => e.preventDefault()}>
      <h1 className="mop-title">Method of Procedure (MOP)</h1>
      
      {/* Site Address Section */}
      <section>
        <h2 className="mop-section-title">Site Address</h2>
        <input
          name="pop"
          value={form.pop}
          onChange={onPopChange}
          placeholder="POP"
          className="modern-input"
          list="pop-codes-list"
        />
        <datalist id="pop-codes-list">
          {popCodes.map(code => <option key={code} value={code} />)}
        </datalist>
        <input 
          name="street" 
          value={form.street} 
          onChange={handleChange} 
          placeholder="Street Address" 
          className="modern-input" 
        />
        <input 
          name="cityStateZip" 
          value={form.cityStateZip} 
          onChange={handleChange} 
          placeholder="City, State, Zip Code" 
          className="modern-input" 
        />
      </section>
      
      {/* Equipment Location Section */}
      <section>
        <h2 className="mop-section-title">Internet2 Equipment Location</h2>
        <EquipmentFields
          equipment={form}
          onChange={(updated) => onChange({ ...form, ...updated })}
          showDeviceNameList={true}
          filteredNodeNames={filteredNodeNames}
          onDeviceNameChange={onDeviceNameChange}
        />
        {/* Location field */}
        <input
          name="location"
          value={form.location || ''}
          onChange={handleChange}
          placeholder="Location"
          className="modern-input"
          style={{ marginTop: '0.5em' }}
        />
        <AdditionalEquipmentList
          additionalEquipment={form.additionalEquipment}
          onUpdate={(updated) => onChange({ ...form, additionalEquipment: updated })}
          maxItems={4}
        />
      </section>
      
      {/* Date & Time Section */}
      <section>
        <h2 className="mop-section-title">
          Date & Time{' '}
          <span style={{ fontWeight: 400, color: '#6b7280', fontSize: '0.98em' }}>
            (Facility Local Time)
          </span>
        </h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="modern-input"
            style={{ marginBottom: 0, width: '100%' }}
            disabled={form.emergencyWork}
          />
          <div style={{ display: 'flex', gap: '0.5em', width: '100%' }}>
            <select
              name="hour"
              value={form.hour || ''}
              onChange={(e) => onChange({ ...form, hour: e.target.value })}
              className="modern-input"
              style={{ width: '100%' }}
              disabled={form.emergencyWork}
            >
              <option value="">Hour</option>
              {[...Array(24).keys()].map(h => (
                <option key={h} value={String(h).padStart(2, '0')}>
                  {String(h).padStart(2, '0')}
                </option>
              ))}
            </select>
            <select
              name="minute"
              value={form.minute || ''}
              onChange={(e) => onChange({ ...form, minute: e.target.value })}
              className="modern-input"
              style={{ width: '100%' }}
              disabled={form.emergencyWork}
            >
              <option value="">Minute</option>
              {['00', '15', '30', '45'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
        <select
          name="timezone"
          value={form.timezone || ''}
          onChange={handleChange}
          className="modern-input"
          disabled={form.emergencyWork}
        >
          <option value="">Select Timezone</option>
          {timezones.map(tz => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
        <label className="mop-checkbox-label" style={{ marginTop: '0.5rem' }}>
          <input
            type="checkbox"
            name="emergencyWork"
            checked={form.emergencyWork}
            onChange={(e) => onChange({ ...form, emergencyWork: e.target.checked })}
          />
          Emergency work
        </label>
      </section>
      
      {/* Equipment Needed Section */}
      <section>
        <h2 className="mop-section-title">Equipment Needed</h2>
        <textarea 
          name="equipment" 
          value={form.equipment} 
          onChange={handleChange}
          onKeyDown={handleTextareaKeyDown}
          placeholder="Equipment Needed" 
          rows={2} 
          className="modern-input" 
          style={{ whiteSpace: 'pre-wrap' }}
        />
          <label className="mop-checkbox-label" style={{ marginBottom: '0.5em' }}>
            <input
              type="checkbox"
              name="shipmentRequired"
              checked={form.shipmentRequired || false}
              onChange={e => onChange({ ...form, shipmentRequired: e.target.checked })}
            />
            Shipment required
          </label>
          {form.shipmentRequired && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', marginTop: '0.5em' }}>
              <input
                name="ticketNumber"
                value={form.ticketNumber || ''}
                onChange={handleChange}
                placeholder="Ticket Number"
                className="modern-input"
              />
              <input
                name="trackingNumber"
                value={form.trackingNumber || ''}
                onChange={handleChange}
                placeholder="Tracking Number"
                className="modern-input"
              />
              <input
                name="partId"
                value={form.partId || ''}
                onChange={handleChange}
                placeholder="Part ID"
                className="modern-input"
              />
            </div>
          )}
        </section>
      
      <div style={{ borderTop: '2px dashed #cbd5e1', margin: '2rem 0' }} />
      
      {/* Call NOC Checkbox */}
      <label className="mop-checkbox-label">
        <input
          type="checkbox"
          name="callNOC"
          checked={form.callNOC}
          onChange={(e) => onChange({ ...form, callNOC: e.target.checked })}
        />
        Tech should call before work
      </label>
      
      {/* Summary Section */}
      <section>
        <h2 className="mop-section-title">Summary</h2>
        <textarea 
          name="summary" 
          value={form.summary} 
          onChange={handleChange}
          onKeyDown={handleTextareaKeyDown}
          placeholder="Summary of Work" 
          rows={2} 
          className="modern-input"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </section>
      
      {/* MOP Section */}
      <section>
        <h2 className="mop-section-title">MOP</h2>
        <textarea 
          name="steps" 
          value={form.steps} 
          onChange={handleChange}
          onKeyDown={handleTextareaKeyDown}
          placeholder="Steps to be Completed" 
          rows={4} 
          className="modern-input"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </section>
    </form>
  );
}