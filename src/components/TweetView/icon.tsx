'use client';

import { useFontSize } from "@/src/hooks/font-size-switcher/context";
import Image from "next/image"

interface TweetIconProps {
  isTerminal?: boolean;
}

export const TweetIcon = ({ isTerminal }: TweetIconProps) => {
  const { getFontAndIconSizeValue } = useFontSize();
  const { icon } = getFontAndIconSizeValue();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
      <Image
        src="/icon.png"
        alt="アイコン"
        width={`${icon}`}
        height={`${icon}`}
        style={{ borderRadius: '20px' }}
      />
      {!isTerminal && (
        <div style={{ flexGrow: 1, width: '40px', alignSelf: 'stretch', display: 'flex', justifyContent: 'center' }}>
          <div className='thread' style={{ borderRadius: '2px', height: '100%' }}></div>
        </div>
      )}
    </div>
  )
}
