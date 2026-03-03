'use client';

import { Bill } from '@/types/bill';
import { Download, Share2, Copy, Check } from 'lucide-react';
import { useRef, useState } from 'react';

interface ExportBarProps {
  bill: Bill;
  previewRef: React.RefObject<HTMLDivElement>;
  shareLink: string | null;
  onGenerateShare: () => void;
}

export default function ExportBar({
  bill,
  previewRef,
  shareLink,
  onGenerateShare,
}: ExportBarProps) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleDownloadPDF = async () => {
    setExporting(true);
    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bill),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${bill.billNumber.replace('.', '')}_${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF');
    } finally {
      setExporting(false);
    }
  };

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Bill Writer</h1>
            <p className="text-slate-300 text-sm">
              {bill.billNumber} - {bill.title || 'Untitled Bill'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Download size={18} />
              <span>{exporting ? 'Exporting...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onGenerateShare}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>

            {shareLink && (
              <div className="flex items-center gap-2 bg-slate-700 px-3 py-2 rounded-lg">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="bg-transparent text-white text-sm outline-none w-40 truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
