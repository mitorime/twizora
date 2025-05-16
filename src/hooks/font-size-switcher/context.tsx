'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type FontSizeContextType = {
  fontSizeIndex: number;
  setFontSizeIndex: (size: number) => void;
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSizeIndex, setFontSizeIndex] = useState<number>(1); // Default size (0-3)

  return (
    <FontSizeContext.Provider value={{ fontSizeIndex, setFontSizeIndex }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }

  const getFontAndIconSizeValue = () => {
    const fontSizes = [12.2, 12.6, 13.4, 14.5];
    const iconSizes = [37, 38, 39, 40];

    return {
      icon: iconSizes[context?.fontSizeIndex],
      font: fontSizes[context?.fontSizeIndex],
    }
  }

  return {
    ...context,
    getFontAndIconSizeValue,
  };
}
