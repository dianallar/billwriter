import React, { ReactNode } from 'react';
import { Bill, BillSection, TextFormatting } from '@/types/bill';

export function renderFormattedText(
  text: string,
  formatting: TextFormatting
): ReactNode {
  let element: ReactNode = text;

  if (formatting.bold) {
    element = React.createElement('strong', {}, element);
  }
  if (formatting.italic) {
    element = React.createElement('em', {}, element);
  }
  if (formatting.underline) {
    element = React.createElement('u', {}, element);
  }
  if (formatting.link) {
    element = React.createElement(
      'a',
      {
        href: formatting.link,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'text-blue-600 underline hover:text-blue-800',
      },
      element
    );
  }

  return element;
}

export function formatBillForPDF(bill: Bill): string {
  let content = '';

  // Header
  content += `${bill.congress}th Congress\n`;
  content += `${bill.session}st Session\n\n`;
  content += `${bill.billNumber}\n\n`;

  // Title
  content += `A BILL\n`;
  content += `${bill.title}\n\n`;

  // Sponsor
  if (bill.sponsor) {
    content += `Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled,\n\n`;
    content += `Introduced by ${bill.sponsor}\n\n`;
  }

  // Introduction
  if (bill.introduction) {
    content += `${bill.introduction}\n\n`;
  }

  // Sections
  bill.sections.forEach(section => {
    content += `SEC. ${section.number}. ${section.title}\n`;
    content += `${section.content}\n\n`;
  });

  return content;
}

export function generateShareId(): string {
  return Math.random().toString(36).substring(2, 11);
}
