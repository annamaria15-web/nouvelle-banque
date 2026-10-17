import React from 'react';

interface ProjectCodeDownloadButtonProps {
  variant?: 'light' | 'dark';
}

export const ProjectCodeDownloadButton: React.FC<ProjectCodeDownloadButtonProps> = ({
  variant = 'dark',
}) => {
  const isLight = variant === 'light';

  return (
    <span
      className={`text-[11px] font-normal select-none ${
        isLight ? 'text-slate-400' : 'text-slate-500'
      }`}
    >
      Code
    </span>
  );
};
