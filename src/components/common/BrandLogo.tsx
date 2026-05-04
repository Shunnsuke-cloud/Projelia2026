'use client';

import { useState } from 'react';

type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
};

const sizeMap = {
  sm: 'h-8 w-28',
  md: 'h-11 w-40',
  lg: 'h-16 w-64',
};

export function BrandLogo({ size = 'md', showText = true, className = '' }: BrandLogoProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div
        className={`${sizeMap[size]} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-200/60`}
      >
        {!hasImageError ? (
          <img
            src="/brand/projelia-logo.jpeg"
            alt="Projelia logo"
            className="h-full w-full object-contain p-0.5"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-white font-semibold">
            P
          </div>
        )}
      </div>
    </div>
  );
}