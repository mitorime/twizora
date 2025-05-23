'use client';

import Image from "next/image"
import { TweetIcon } from "./icon";
import { useFontSize } from "@/src/hooks/font-size-switcher/context";

interface TweetViewProps {
  title: string;
  author: string;
  userId: string;
  date: string;
  content: string;
  isTerminal?: boolean;
}

export const TweetView = ({ title, userId, author, date, content, isTerminal = false }: TweetViewProps) => {
  const { getFontAndIconSizeValue } = useFontSize();
  const { font } = getFontAndIconSizeValue();

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px', marginBottom: '4px', fontSize: font }}>
      <TweetIcon isTerminal={isTerminal} />
      <div style={{ whiteSpace: 'pre-wrap', marginTop: '-4px', width: '100%' }}>
        <div>
          <span className='display-name'>{title}&nbsp;</span>
          {userId && <span className='user-name'>@{userId}</span>}
          <span className='user-name'> ･ {date}</span>
        </div>
        <div style={{ wordBreak: 'break-all' }}>{content}</div>
        <TweetFooter author={author} content={content} title={title} />
      </div>
    </div>
  )
}

const TweetFooter = ({ author, content, title }: Omit<TweetViewProps, 'userId' | 'date' | 'isTerminal'>) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', height: '40px' }}>
      <Image src={`/ui1.svg`} alt={`reply button (doesn't work)`} width={18} height={18} />
      <a href={`https://twitter.com/intent/tweet?text=+RT+@${encodeURIComponent(author)}:+"${encodeURIComponent(content.slice(0, 100))}…"+『${encodeURIComponent(title)}』on+%23twizora+twizora.mitori.me`} target="_blank" rel="noopener noreferrer">
        <Image src={`/ui2.svg`} alt={`retweet button (press to quote tweet @x.com)`} width={18} height={18} />
      </a>
      <Image src={`/ui3.svg`} alt={`fav button`} width={18} height={18} />
      {[4, 5, 6].map((n) => (
        <Image
          key={n}
          src={`/ui${n}.svg`}
          alt={`UI${n}`}
          width={18}
          height={18}
        />
      ))}
    </div>
  )
}
