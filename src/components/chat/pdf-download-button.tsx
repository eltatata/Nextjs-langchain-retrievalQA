import React from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';

interface PdfDownloadButtonProps {
  href: string;
  text: string;
}

export default function PdfDownloadButton({
  href,
  text,
}: PdfDownloadButtonProps) {
  return (
    <div className="flex justify-center mb-6">
      <Link
        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 bg-neutral-800/40 backdrop-blur-md border border-neutral-700/50 hover:bg-neutral-700/50 text-neutral-200 shadow-lg transition-all duration-300 hover:scale-105"
        href={href}
        target="_blank"
        download
      >
        <Download className="w-4 h-4 mr-2" />
        {text}
      </Link>
    </div>
  );
}
