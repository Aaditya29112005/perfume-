import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  frenchEcho?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'dark' | 'light';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  frenchEcho,
  className = '',
  align = 'left',
  theme = 'light',
}) => {
  const alignClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  const textColor = theme === 'dark' ? 'text-[var(--blanc-ivory)]' : 'text-[var(--noir)]';

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      <span className="type-eyebrow">{eyebrow}</span>
      <h2 className={`type-section ${textColor} tracking-tight`}>{title}</h2>
      {frenchEcho && (
        <span className="type-echo text-lg md:text-xl font-normal">
          *{frenchEcho}*
        </span>
      )}
    </div>
  );
};
