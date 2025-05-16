'use client';

import { useRouter } from "next/navigation";
import { useState } from "react"

export const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '1rem', padding: '8px 4px' }}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="🔍 作品・作者名を検索"
        className='search-field'
      />
      <button
        onClick={() => router.push(`/search?q=${keyword}`)}
        className='search-button'
        style={{ lineHeight: '1', paddingTop: '0.5em', paddingBottom: '0.5em' }}
        disabled={keyword.length === 0}
      >
        検索
      </button>
    </div>
  )
}
