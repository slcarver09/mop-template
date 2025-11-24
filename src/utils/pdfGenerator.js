// utils/pdfGenerator.js
export const generateMopPDF = async (formData) => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  let y = 20;

  // Title
  doc.setFontSize(18);
  doc.text('Method of Procedure (MOP)', 15, y);
  y += 12;

  // NOC Warning
  if (formData.callNOC) {
    doc.setFontSize(12);
    doc.setTextColor(229, 62, 62);
    doc.text('Please call the NOC before beginning the work detailed here-in: 317-278-6622', 15, y);
    doc.setTextColor(0, 0, 0);
    y += 10;
  }

  // Site Address
  doc.setFontSize(14);
  doc.text('Site Address:', 15, y);
  y += 8;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(formData.pop || '', 15, y);
  y += 7;
  doc.setFont(undefined, 'normal');
  doc.text(formData.street || '', 15, y);
  y += 7;
  doc.text(formData.cityStateZip || '', 15, y);
  y += 10;

  // Equipment Location
  doc.setFontSize(14);
  doc.text('Internet2 Equipment Location:', 15, y);
  y += 8;
  doc.setFontSize(12);

  // Helper function to render equipment
  const renderEquipment = (equipment, includeLocation = false) => {
    const labels = [
      'Device Name:',
      'Model:',
      'Serial Number:',
      'Rack Location:',
      'Rack Unit Number:'
    ];
    const values = [
      equipment.deviceName || '',
      equipment.model || '',
      equipment.serialNumber || '',
      equipment.rackLocation || '',
      equipment.rackUnit || ''
    ];

    // Add Location field for main equipment only
    if (includeLocation) {
      labels.push('Location:');
      values.push(equipment.location || '');
    }

    for (let i = 0; i < labels.length; i++) {
      doc.setFont(undefined, 'bold');
      doc.text(labels[i], 15, y);
      doc.setFont(undefined, 'normal');
      doc.text(values[i], 60, y);
      y += 7;
    }
  };

  // Main equipment (with Location field)
  renderEquipment(formData, true);

  // Additional equipment (without Location field)
  formData.additionalEquipment.forEach((equip) => {
    renderEquipment(equip, false);
  });

  y += 3;

  // Date & Time
  doc.setFontSize(14);
  doc.text('Date & Time:', 15, y);
  y += 8;
  doc.setFontSize(12);
  if (formData.emergencyWork) {
    doc.text('Emergency - As Soon As Possible.', 15, y);
  } else {
    doc.text(`${formData.date || ''} ${formData.time || ''}`.trim(), 15, y);
  }
  y += 10;

  // Equipment Needed
  doc.setFontSize(14);
  doc.text('Equipment Needed:', 15, y);
  y += 8;
  doc.setFontSize(12);
  const equipmentLines = doc.splitTextToSize(formData.equipment || '', 180);
  doc.text(equipmentLines, 15, y);
  y += (equipmentLines.length * 7) + 10;

  // Summary
  doc.setFontSize(14);
  doc.text('Summary:', 15, y);
  y += 8;
  doc.setFontSize(12);
  const summaryLines = doc.splitTextToSize(formData.summary || '', 180);
  doc.text(summaryLines, 15, y);
  y += (summaryLines.length * 7) + 10;

  // MOP
  doc.setFontSize(14);
  doc.text('MOP:', 15, y);
  y += 8;
  doc.setFontSize(12);
  const mopLines = doc.splitTextToSize(formData.steps || '', 180);
  doc.text(mopLines, 15, y);

  doc.save('MOP.pdf');
};