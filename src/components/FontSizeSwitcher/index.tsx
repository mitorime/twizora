'use client';

import { useFontSize } from '../../hooks/font-size-switcher/context';

export const FontSizeSwitcher = () => {
  const { fontSizeIndex, setFontSizeIndex } = useFontSize();
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', width: '40%', maxWidth: '300px' }}>
      <span style={{ fontSize: '12px' }}>Aa</span>
      <input
        type="range"
        min={0}
        max={3}
        step={1}
        value={fontSizeIndex}
        onChange={(e) => setFontSizeIndex(Number(e.target.value))}
        style={{ flexGrow: 1, accentColor: '#0070f3', cursor: 'pointer' }}
      />
      <span style={{ fontSize: '15px' }}>Aa</span>
    </div>
  );
};
