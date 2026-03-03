'use client';

import { Bill, BillSection } from '@/types/bill';
import { useState } from 'react';

interface BillFormProps {
  bill: Bill;
  onBillChange: (bill: Bill) => void;
  onAddSection: () => void;
  onRemoveSection: (id: string) => void;
}

export default function BillForm({
  bill,
  onBillChange,
  onAddSection,
  onRemoveSection,
}: BillFormProps) {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const handleInputChange = (field: keyof Bill, value: string | number) => {
    onBillChange({
      ...bill,
      [field]: value,
    });
  };

  const handleSectionChange = (id: string, field: string, value: string) => {
    const updatedSections = bill.sections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    );
    onBillChange({
      ...bill,
      sections: updatedSections,
    });
  };

  const applyFormatting = (sectionId: string, format: string) => {
    const textarea = document.getElementById(`section-${sectionId}`) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const section = bill.sections.find(s => s.id === sectionId);

    if (!section || !selectedText) return;

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `____${selectedText}____`;
        break;
      case 'strikethrough':
        formattedText = `~~${selectedText}~~`;
        break;
      case 'link':
        formattedText = `[${selectedText}](https://example.com)`;
        break;
      default:
        return;
    }

    const newContent =
      section.content.substring(0, start) + formattedText + section.content.substring(end);

    handleSectionChange(sectionId, 'content', newContent);
  };

  return (
    <form className="space-y-6 max-w-4xl">
      {/* Bill Header Fields */}
      <div className="bg-slate-700 p-6 rounded-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Header Act Name
          </label>
          <input
            type="text"
            value={bill.headerAct}
            onChange={(e) => handleInputChange('headerAct', e.target.value)}
            className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
            placeholder="House Bill Act, Year"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Header Month
            </label>
            <input
              type="text"
              value={bill.headerMonth}
              onChange={(e) => handleInputChange('headerMonth', e.target.value)}
              className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
              placeholder="Month"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Header Day
            </label>
            <input
              type="text"
              value={bill.headerDay}
              onChange={(e) => handleInputChange('headerDay', e.target.value)}
              className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
              placeholder="Day"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Header Year
            </label>
            <input
              type="text"
              value={bill.headerYear}
              onChange={(e) => handleInputChange('headerYear', e.target.value)}
              className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
              placeholder="Year"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Congress Number
          </label>
          <input
            type="number"
            value={bill.congress}
            onChange={(e) => handleInputChange('congress', parseInt(e.target.value))}
            className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Session
          </label>
          <input
            type="number"
            value={bill.session}
            onChange={(e) => handleInputChange('session', parseInt(e.target.value))}
            className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Bill Number
          </label>
          <input
            type="text"
            value={bill.billNumber}
            onChange={(e) => handleInputChange('billNumber', e.target.value)}
            className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Title
          </label>
          <input
            type="text"
            value={bill.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Bill Purpose
          </label>
          <input
            type="text"
            value={bill.billPurpose}
            onChange={(e) => handleInputChange('billPurpose', e.target.value)}
            className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
            placeholder="e.g., To establish a new education program"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Sponsor
          </label>
          <input
            type="text"
            value={bill.sponsor}
            onChange={(e) => handleInputChange('sponsor', e.target.value)}
            className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Cosponsors (comma-separated)
          </label>
          <input
            type="text"
            value={bill.cosponsors}
            onChange={(e) => handleInputChange('cosponsors', e.target.value)}
            className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500"
            placeholder="e.g., Mr. Smith, Ms. Jones, Mr. Brown"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Sections</h3>
          <button
            type="button"
            onClick={onAddSection}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
          >
            + Add Section
          </button>
        </div>

        {bill.sections.map((section) => (
          <div key={section.id} className="bg-slate-700 p-6 rounded-lg space-y-3">
            {/* Section Title and Number */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Section Number
                </label>
                <input
                  type="number"
                  value={section.number}
                  onChange={(e) =>
                    handleSectionChange(section.id, 'number', e.target.value)
                  }
                  className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(section.id, 'title', e.target.value)
                  }
                  className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500"
                />
              </div>
            </div>

            {/* Formatting Toolbar */}
            <div className="bg-slate-600 p-3 rounded flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => applyFormatting(section.id, 'bold')}
                className="bg-slate-500 hover:bg-slate-400 text-white px-3 py-1 rounded font-bold text-sm"
                title="Bold (Ctrl+B)"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => applyFormatting(section.id, 'italic')}
                className="bg-slate-500 hover:bg-slate-400 text-white px-3 py-1 rounded italic text-sm"
                title="Italic (Ctrl+I)"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => applyFormatting(section.id, 'underline')}
                className="bg-slate-500 hover:bg-slate-400 text-white px-3 py-1 rounded underline text-sm"
                title="Underline (Ctrl+U)"
              >
                U
              </button>
              <button
                type="button"
                onClick={() => applyFormatting(section.id, 'strikethrough')}
                className="bg-slate-500 hover:bg-slate-400 text-white px-3 py-1 rounded line-through text-sm"
                title="Strikethrough"
              >
                S
              </button>
              <button
                type="button"
                onClick={() => applyFormatting(section.id, 'link')}
                className="bg-slate-500 hover:bg-slate-400 text-white px-3 py-1 rounded text-sm"
                title="Insert Link"
              >
                🔗
              </button>
              <span className="text-slate-300 text-xs self-center ml-2">
                Select text to format
              </span>
            </div>

            {/* Section Content */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Content
              </label>
              <textarea
                id={`section-${section.id}`}
                value={section.content}
                onChange={(e) =>
                  handleSectionChange(section.id, 'content', e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const textarea = e.currentTarget;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const newContent = section.content.substring(0, start) + '\t' + section.content.substring(end);
                    handleSectionChange(section.id, 'content', newContent);
                    // Move cursor after the inserted tab
                    setTimeout(() => {
                      textarea.selectionStart = textarea.selectionEnd = start + 1;
                    }, 0);
                  }
                }}
                onClick={() => setSelectedSectionId(section.id)}
                className="w-full bg-slate-600 text-white px-3 py-2 rounded border border-slate-500 font-mono text-sm"
                rows={6}
                placeholder="Subsection name&#10;&#9;Indented bullet point (tab to indent)&#10;&#9;Another bullet&#10;Next subsection&#10;Use **bold**, *italic*, ____underline____, ~~strikethrough~~, and [link](url)"
              />
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => onRemoveSection(section.id)}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded font-medium"
            >
              Remove Section
            </button>
          </div>
        ))}
      </div>
    </form>
  );
}
