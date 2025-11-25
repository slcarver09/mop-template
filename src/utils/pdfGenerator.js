// utils/pdfGenerator.js
import { formatTimeWithUTC } from './timeUtils';

export const generateMopPDF = async (formData) => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  let y = 20;
  const pageHeight = doc.internal.pageSize.height;
  const bottomMargin = 15; // Reduced from 20 to allow more content
  const maxY = pageHeight - bottomMargin;

  console.log('=== PDF Generation Debug ===');
  console.log('Page height:', pageHeight);
  console.log('Max Y (with margin):', maxY);

  // Helper function to check if we need a new page
  const checkPageBreak = (neededSpace = 10) => {
    console.log(`CheckPageBreak: y=${y}, neededSpace=${neededSpace}, y+neededSpace=${y + neededSpace}, maxY=${maxY}`);
    if (y + neededSpace > maxY) {
      console.log('>>> PAGE BREAK TRIGGERED <<<');
      doc.addPage();
      y = 20;
      return true;
    }
    return false;
  };

  // Title
  doc.setFontSize(18);
  doc.text('Method of Procedure (MOP)', 15, y);
  y += 12;
  console.log('After title, y =', y);

  // NOC Warning
  if (formData.callNOC) {
    checkPageBreak(10);
    doc.setFontSize(12);
    doc.setTextColor(229, 62, 62);
    doc.text('Please call the NOC before beginning the work detailed here-in: 317-278-6622', 15, y);
    doc.setTextColor(0, 0, 0);
    y += 10;
    console.log('After NOC warning, y =', y);
  }

  // Site Address
  checkPageBreak(35);
  doc.setFontSize(14);
  doc.text('Site Address:', 15, y);
  doc.setLineWidth(0.25);
  doc.line(15, y + 2, 195, y + 2);
  y += 8;
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text(formData.pop || '', 15, y);
  y += 7;
  doc.text(formData.street || '', 15, y);
  y += 7;
  doc.text(formData.cityStateZip || '', 15, y);
  y += 10;
  console.log('After site address, y =', y);
  
  // Equipment Location
  checkPageBreak(20);
  doc.setFontSize(14);
  doc.text('Internet2 Equipment Location:', 15, y);
  doc.setLineWidth(0.25);
  doc.line(15, y + 2, 195, y + 2);
  y += 8;
  doc.setFontSize(12);
  console.log('After equipment location header, y =', y);

  // Helper function to render equipment
  const renderEquipment = (equipment, deviceIndex = 1, includeLocation = false) => {
    const deviceNameLabel = deviceIndex > 1 ? `Device Name (${deviceIndex}):` : 'Device Name:';
    
    const labels = [
      deviceNameLabel,
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

    if (includeLocation) {
      labels.push('Location:');
      values.push(equipment.location || '');
    }

    const equipHeight = labels.length * 7;
    console.log(`Rendering equipment ${deviceIndex}, height needed: ${equipHeight}`);
    checkPageBreak(equipHeight);

    for (let i = 0; i < labels.length; i++) {
      doc.setFont(undefined, 'bold');
      doc.text(labels[i], 15, y);
      doc.setFont(undefined, 'normal');
      doc.text(values[i], 60, y);
      y += 7;
    }
    console.log(`After equipment ${deviceIndex}, y =`, y);
  };

  // Main equipment
  renderEquipment(formData, 1, true);

  // Additional equipment
  formData.additionalEquipment.forEach((equip, idx) => {
    checkPageBreak(50);
    y += 3;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.1);
    doc.line(15, y, 195, y);
    doc.setLineWidth(0.25);
    doc.setDrawColor(0, 0, 0);
    y += 5;
    
    renderEquipment(equip, idx + 2, true);
  });

  y += 13;
  console.log('After all equipment, y =', y);

  // Date & Time
  checkPageBreak(25);
  doc.setFontSize(14);
  doc.text('Date & Time:', 15, y);
  doc.setLineWidth(0.25);
  doc.line(15, y + 2, 195, y + 2);
  y += 8;
  doc.setFontSize(12);
  if (formData.emergencyWork) {
    doc.text('Emergency - As Soon As Possible.', 15, y);
  } else {
    let dateTimeText = formData.date || '';
    if (formData.hour && formData.minute && formData.timezone) {
      const timeDisplay = formatTimeWithUTC(formData.date, formData.hour, formData.minute, formData.timezone);
      dateTimeText = `${formData.date} ${timeDisplay}`;
    } else if (formData.time) {
      dateTimeText = `${formData.date} ${formData.time}`;
    }
    doc.text(dateTimeText.trim(), 15, y);
  }
  y += 10;
  console.log('After date & time, y =', y);

  // Equipment Needed
  const equipmentLines = doc.splitTextToSize(formData.equipment || '', 180);
  const equipmentHeight = 14 + 8 + (equipmentLines.length * 7);
  console.log('Equipment Needed section height:', equipmentHeight);
  checkPageBreak(equipmentHeight);
  
  doc.setFontSize(14);
  doc.text('Equipment Needed:', 15, y);
  doc.setLineWidth(0.25);
  doc.line(15, y + 2, 195, y + 2);
  y += 8;
  doc.setFontSize(12);
  doc.text(equipmentLines, 15, y);
  y += (equipmentLines.length * 7);
  
  if (formData.shipmentRequired) {
    const shipmentText = `Inbound received package found in ticket number ${formData.ticketNumber || '[ticket number]'}. The part should be a ${formData.partId || '[part id]'} with tracking number ${formData.trackingNumber || '[tracking number]'}.`;
    const shipmentLines = doc.splitTextToSize(shipmentText, 180);
    const shipmentHeight = (shipmentLines.length * 7) + 2;
    checkPageBreak(shipmentHeight);
    
    doc.setFont(undefined, 'italic');
    doc.text(shipmentLines, 15, y + 2);
    doc.setFont(undefined, 'normal');
    y += shipmentHeight;
  }
  y += 10;
  console.log('After equipment needed, y =', y);

  // Summary
  const summaryLines = doc.splitTextToSize(formData.summary || '', 180);
  const summaryHeight = 14 + 8 + (summaryLines.length * 7);
  console.log('Summary section height:', summaryHeight);
  checkPageBreak(summaryHeight);
  
  doc.setFontSize(14);
  doc.text('Summary:', 15, y);
  doc.setLineWidth(0.25);
  doc.line(15, y + 2, 195, y + 2);
  y += 8;
  doc.setFontSize(12);
  doc.text(summaryLines, 15, y);
  y += (summaryLines.length * 7) + 10;
  console.log('After summary, y =', y);

  // MOP - Check if entire section fits on current page
  const mopLines = doc.splitTextToSize(formData.steps || '', 180);
  const mopContentHeight = mopLines.length * 7;
  const mopHeaderHeight = 10;
  const mopTotalHeight = mopHeaderHeight + mopContentHeight;
  
  console.log('MOP section height:', mopTotalHeight);
  console.log('Current y:', y, 'MOP needs:', mopTotalHeight, 'Total would be:', y + mopTotalHeight, 'Max is:', maxY);
  
  // If MOP won't fit, move entire section to new page
  if (y + mopTotalHeight > maxY) {
    console.log('>>> MOP MOVED TO NEW PAGE <<<');
    doc.addPage();
    y = 20;
  } else {
    console.log('MOP fits on current page');
  }
  
  doc.setFontSize(14);
  doc.text('MOP:', 15, y);
  doc.setLineWidth(0.25);
  doc.line(15, y + 2, 195, y + 2);
  y += 8;
  doc.setFontSize(12);
  doc.text(mopLines, 15, y);

  console.log('=== PDF Generation Complete ===');

  doc.save('MOP.pdf');
};