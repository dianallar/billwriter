'use client';

import { useState } from 'react';
import { Bold, Italic, Underline, Link as LinkIcon, Type } from 'lucide-react';

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TextEditor({
  content,
  onChange,
  placeholder,
}: TextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const applyFormatting = (type: 'bold' | 'italic' | 'underline') => {
    const textarea = document.querySelector(
      'textarea[data-editor-id="text-editor"]'
    ) as HTMLTextAreaElement;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (!selectedText) return;

    let formatted = '';
    switch (type) {
      case 'bold':
        formatted = `**${selectedText}**`;
        break;
      case 'italic':
        formatted = `*${selectedText}*`;
        break;
      case 'underline':
        formatted = `__${selectedText}__`;
        break;
    }

    const newContent =
      content.substring(0, start) + formatted + content.substring(end);
    onChange(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formatted.length, start + formatted.length);
    }, 0);
  };

  const addLink = () => {
    if (!linkText || !linkUrl) return;

    const textarea = document.querySelector(
      'textarea[data-editor-id="text-editor"]'
    ) as HTMLTextAreaElement;

    if (textarea) {
      const start = textarea.selectionStart;
      const link = `[${linkText}](${linkUrl})`;
      const newContent = content.substring(0, start) + link + content.substring(start);
      onChange(newContent);
      setShowLinkInput(false);
      setLinkText('');
      setLinkUrl('');
    }
  };

  return (
    <div className="space-y-2">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-100 rounded-t-lg border border-gray-300 border-b-0">
        <button
          onClick={() => applyFormatting('bold')}
          title="Bold (Ctrl+B)"
          className="p-2 hover:bg-gray-200 rounded transition-colors"
        >
          <Bold size={18} className="text-gray-700" />
        </button>

        <button
          onClick={() => applyFormatting('italic')}
          title="Italic (Ctrl+I)"
          className="p-2 hover:bg-gray-200 rounded transition-colors"
        >
          <Italic size={18} className="text-gray-700" />
        </button>

        <button
          onClick={() => applyFormatting('underline')}
          title="Underline (Ctrl+U)"
          className="p-2 hover:bg-gray-200 rounded transition-colors"
        >
          <Underline size={18} className="text-gray-700" />
        </button>

        <div className="w-px bg-gray-300"></div>

        <button
          onClick={() => setShowLinkInput(!showLinkInput)}
          title="Add Link"
          className="p-2 hover:bg-gray-200 rounded transition-colors"
        >
          <LinkIcon size={18} className="text-gray-700" />
        </button>

        <div className="w-px bg-gray-300"></div>

        <div className="flex items-center gap-1 text-sm text-gray-600 ml-auto">
          <Type size={16} />
          <span>Markdown supported</span>
        </div>
      </div>

      {/* Link Input Panel */}
      {showLinkInput && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={linkText}
              onChange={e => setLinkText(e.target.value)}
              placeholder="Link text"
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              placeholder="URL"
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={addLink}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Insert Link
            </button>
            <button
              onClick={() => setShowLinkInput(false)}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded text-sm hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Text Area */}
      <textarea
        data-editor-id="text-editor"
        value={content}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Enter text...'}
        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-vertical"
      />
    </div>
  );
}
