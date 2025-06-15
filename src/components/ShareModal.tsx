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
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M10 14L21 3m0 0v7m0-7h-7" />
        <path d="M21 14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    action: (url: string, title: string) => {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        '_blank',
      );
    },
    icon: (
      <img src="/assets/social/x.svg" alt="Twitter" width={20} height={20} />
    ),
  },
  {
    name: 'Facebook',
    action: (url: string) => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        '_blank',
      );
    },
    icon: (
      <img
        src="/assets/social/facebook.svg"
        alt="Facebook"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: 'WhatsApp',
    action: (url: string, title: string) => {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
        '_blank',
      );
    },
    icon: (
      <img
        src="/assets/social/whatsapp.svg"
        alt="WhatsApp"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: 'LinkedIn',
    action: (url: string, title: string) => {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        '_blank',
      );
    },
    icon: (
      <img
        src="/assets/social/linkedin.svg"
        alt="LinkedIn"
        width={20}
        height={20}
      />
    ),
  },
  {
    name: 'Mastodon',
    action: (url: string, title: string) => {
      window.open(
        `https://mastodon.social/share?text=${encodeURIComponent(title + ' ' + url)}`,
        '_blank',
      );
    },
    icon: (
      <img
        src="/assets/social/mastodon.svg"
        alt="Mastodon"
        width={20}
        height={20}
      />
    ),
  },
];

const ShareModal: React.FC<ShareModalProps> = ({
  open,
  onClose,
  url,
  title,
  excerpt,
}) => {
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
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">
          Share this post
        </h3>
        <div className="mb-5 text-xs text-gray-700 bg-white border border-gray-100 rounded px-3 py-2 break-all text-center select-all">
          {url}
        </div>
        <div className="flex flex-col gap-3">
          {typeof navigator.share === 'function' && (
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
