import React from 'react';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
  excerpt?: string;
}

const shareOptions = [
  {
    name: 'Copy Link',
    action: async (url: string) => {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    },
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 14L21 3m0 0v7m0-7h-7"/><path d="M21 14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7"/></svg>
    ),
  },
  {
    name: 'Twitter',
    action: (url: string, title: string) => {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        '_blank'
      );
    },
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
    ),
  },
  {
    name: 'Facebook',
    action: (url: string) => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        '_blank'
      );
    },
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
    ),
  },
  {
    name: 'WhatsApp',
    action: (url: string, title: string) => {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
        '_blank'
      );
    },
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.075-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.363.709.244 1.262.389 1.694.497.712.181 1.362.156 1.874.095.572-.068 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
    ),
  },
];

const ShareModal: React.FC<ShareModalProps> = ({ open, onClose, url, title, excerpt }) => {
  if (!open) return null;

  const handleWebShare = () => {
    if (navigator.share) {
      navigator.share({ title, text: excerpt, url });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent transition-all backdrop-blur-sm">
      <div className="relative w-full max-w-sm mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl shadow-2xl p-7 animate-fadeIn border border-blue-100">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 bg-white rounded-full shadow p-1 cursor-pointer transition-colors duration-200 border border-gray-200"
          onClick={onClose}
          aria-label="Close"
          style={{ fontSize: 20, lineHeight: 1 }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">Share this post</h3>
        <div className="mb-5 text-xs text-gray-700 bg-white border border-gray-100 rounded px-3 py-2 break-all text-center select-all">
          {url}
        </div>
        <div className="flex flex-col gap-3">
          {typeof navigator.share === "function" && (
            <button
              onClick={handleWebShare}
              className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold hover:from-blue-700 hover:to-green-700 shadow transition cursor-pointer"
              style={{ fontSize: '1rem' }}
            >
              Share via Device...
            </button>
          )}
          {shareOptions.map((opt) => (
            <button
              key={opt.name}
              onClick={() => opt.action(url, title)}
              className="w-full flex items-center gap-3 py-2 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gradient-to-r hover:from-blue-100 hover:to-green-100 hover:shadow-lg transition-all duration-200 cursor-pointer text-gray-700 font-medium"
              style={{ fontSize: '1rem' }}
            >
              <span className="flex-shrink-0">{opt.icon}</span>
              <span className="flex-1 text-left">{opt.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
