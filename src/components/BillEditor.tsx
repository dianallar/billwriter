'use client';

import { useState, useRef } from 'react';
import BillForm from './BillForm';
import BillPreview from './BillPreview';
import ExportBar from './ExportBar';
import { Bill, BillSection } from '@/types/bill';

const defaultBill: Bill = {
  congress: 118,
  session: 1,
  billNumber: 'H.R.',
  title: '',
  billPurpose: '',
  sponsor: '',
  cosponsors: '',
  introduction: '',
  headerAct: 'House Bill Act, Year',
  headerMonth: 'Month',
  headerDay: 'Day',
  headerYear: 'Year',
  sections: [
    {
      id: '1',
      number: 1,
      title: 'Short Title',
      content: 'This Act may be cited as the [Insert Act Name].',
      formatting: {},
    },
  ],
};

export default function BillEditor() {
  const [bill, setBill] = useState<Bill>(defaultBill);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [shareLink, setShareLink] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  const handleBillChange = (updatedBill: Bill) => {
    setBill(updatedBill);
  };

  const handleAddSection = () => {
    const newSection: BillSection = {
      id: Date.now().toString(),
      number: bill.sections.length + 1,
      title: `Section ${bill.sections.length + 1}`,
      content: '',
      formatting: {},
    };
    setBill({
      ...bill,
      sections: [...bill.sections, newSection],
    });
  };

  const handleRemoveSection = (id: string) => {
    setBill({
      ...bill,
      sections: bill.sections.filter(s => s.id !== id),
    });
  };

  const handleGenerateShare = async () => {
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bill),
      });
      const data = await response.json();
      setShareLink(data.link);
    } catch (error) {
      console.error('Failed to generate share link:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <ExportBar
        bill={bill}
        previewRef={previewRef}
        shareLink={shareLink}
        onGenerateShare={handleGenerateShare}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'edit'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
            }`}
          >
            Preview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeTab === 'edit' && (
            <div className="lg:col-span-2">
              <BillForm
                bill={bill}
                onBillChange={handleBillChange}
                onAddSection={handleAddSection}
                onRemoveSection={handleRemoveSection}
              />
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="lg:col-span-2">
              <BillPreview bill={bill} ref={previewRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
