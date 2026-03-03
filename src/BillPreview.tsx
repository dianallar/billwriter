'use client';

import { Bill } from '@/types/bill';
import { forwardRef } from 'react';

interface BillPreviewProps {
  bill: Bill;
}

const BillPreview = forwardRef<HTMLDivElement, BillPreviewProps>(
  ({ bill }, ref) => {
    let lineNumber = 1;

    return (
      <div 
        ref={ref} 
        style={{ 
          fontFamily: '"Century Schoolbook", serif',
          width: '7.5in',
          margin: '0 auto',
          padding: '0.4in 0.5in',
          backgroundColor: '#fff',
          color: '#000',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {/* Top Header with Act Name and Date */}
        <div style={{ textAlign: 'center', marginBottom: '6pt' }}>
          <p style={{ fontSize: '9pt', margin: '0', fontFamily: '"Century Schoolbook", serif' }}>
            {bill.headerAct}.—{bill.headerMonth} {bill.headerDay}th, {bill.headerYear}
          </p>
        </div>

        {/* Content with Line Numbers */}
        <div style={{ display: 'flex', gap: '10pt' }}>
          {/* Line Numbers */}
          <div style={{ textAlign: 'right', fontSize: '9pt', color: '#999', fontFamily: '"Century Schoolbook", serif', minWidth: '25pt', lineHeight: '1.45' }}>
            {Array.from({ length: 50 }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Header: Congress and Session - Left Aligned */}
            <div style={{ textAlign: 'left', marginBottom: '8pt' }}>
              <p style={{ fontSize: '10pt', fontVariant: 'small-caps', margin: '0', fontWeight: 'bold' }}>
                {bill.congress}th Congress
              </p>
              <p style={{ fontSize: '10pt', fontVariant: 'small-caps', margin: '0', fontWeight: 'bold' }}>
                {bill.session} Session
              </p>
            </div>

            {/* Bill Number - Centered */}
            <div style={{ textAlign: 'center', marginBottom: '8pt' }}>
              <h1 style={{ fontSize: '28pt', fontWeight: 'bold', margin: '0', fontFamily: '"Century Schoolbook", serif' }}>
                {bill.billNumber}
              </h1>
            </div>

            {/* Purpose Line */}
            <div style={{ textAlign: 'center', marginBottom: '8pt' }}>
              <p style={{ fontSize: '11pt', margin: '0' }}>
                To {bill.billPurpose || '[insert bill subtitle/purpose here]'}
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1pt solid #000', margin: '8pt 0' }} />

            {/* Intro Section */}
            <div style={{ textAlign: 'center', marginBottom: '8pt' }}>
              <p style={{ fontSize: '12pt', fontWeight: 'bold', margin: '8pt 0', fontVariant: 'small-caps', fontFamily: '"Century Schoolbook", serif' }}>
                In the House of Representatives of the United States
              </p>
              <p style={{ fontSize: '10pt', margin: '0' }}>
                Month Dayth, Year
              </p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '8pt' }}>
              <p style={{ fontSize: '10pt', margin: '0' }}>
                Main Sponsor: {bill.sponsor}
                {bill.cosponsors && ` (for herself, ${bill.cosponsors})`} introduced the following bill;
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1pt solid #000', margin: '8pt 0' }} />

            {/* Main Bill Title */}
            <div style={{ textAlign: 'center', marginBottom: '12pt' }}>
              <h1 style={{ fontSize: '28pt', fontWeight: 'bold', margin: '8pt 0', fontFamily: '"Century Schoolbook", serif' }}>
                A BILL
              </h1>
              <p style={{ fontSize: '11pt', margin: '0' }}>
                To {bill.billPurpose || '[insert bill subtitle/purpose here]'}
              </p>
            </div>

            {/* Enacting Clause */}
            <p style={{ 
              textIndent: '0.3in',
              fontSize: '11pt',
              fontStyle: 'italic',
              marginBottom: '8pt',
              lineHeight: '1.5',
              margin: '0 0 8pt 0'
            }}>
              Be it enacted by the House and Senate of the United States of America in Congress assembled,
            </p>

            {/* Body Sections */}
            <div>
              {bill.sections.map((section) => (
                <div key={section.id} style={{ marginBottom: '10pt' }}>
                  {/* Section Header */}
                  <p style={{ 
                    fontSize: '11pt', 
                    fontWeight: 'bold', 
                    margin: '0 0 6pt 0', 
                    fontVariant: 'small-caps',
                    fontFamily: '"Century Schoolbook", serif'
                  }}>
                    Section {section.number}. {section.title}
                  </p>

                  {/* Section Content */}
                  <div
                    style={{ fontSize: '11pt', lineHeight: '1.5' }}
                    dangerouslySetInnerHTML={{
                      __html: formatSectionContent(section.content),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Page Number */}
        <div style={{ textAlign: 'center', marginTop: '12pt', paddingTop: '8pt', borderTop: '1pt solid #000' }}>
          <p style={{ fontSize: '10pt', margin: '0', fontFamily: '"Century Schoolbook", serif' }}>
            1
          </p>
        </div>
      </div>
    );
  }
);

function formatSectionContent(content: string): string {
  const lines = content.split('\n');
  let html = '';

  lines.forEach((line, index) => {
    const trimmedLine = line.trimStart();
    const isIndented = line.startsWith('\t') || line.startsWith('    ');
    
    if (!trimmedLine) {
      html += '';
      return;
    }

    // Apply formatting
    let formattedLine = trimmedLine
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/____(.*?)____/g, '<u>$1</u>')
      .replace(/~~(.*?)~~/g, '<s>$1</s>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: #0066cc; text-decoration: underline;">$1</a>');

    if (isIndented) {
      // Indented bullet point - subbullet style
      html += `<p style="margin: 0 0 4pt 0.3in; font-size: 11pt;">◦ ${formattedLine}</p>`;
    } else {
      // Regular subsection line - bold and normal
      html += `<p style="margin: 6pt 0 4pt 0; font-size: 11pt; font-weight: 500;">${formattedLine}</p>`;
    }
  });

  return html;
}

BillPreview.displayName = 'BillPreview';

export default BillPreview;
