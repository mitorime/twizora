'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { SearchBox } from '../components/SearchBox'

export default function Home() {
  const [title, setTitle] = useState('')
  const [titleShorten, setTitleShorten] = useState('')
  const [showUserName, setShowUserName] = useState(false)
  const [author, setAuthor] = useState('')
  const [authorRomaji, setAuthorRomaji] = useState('')
  const [date, setDate] = useState('')
  const [textChunks, setTextChunks] = useState<string[]>([])
  const textSizeList = [12.2, 12.6, 13.4, 14.5]
  const iconSizeList = [37, 38, 39, 40]
  const [size, setSize] = useState(3)
  const [keyword, setKeyword] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showTweets, setShowTweets] = useState(false)
  const [waitForLoading, setWaitForLoading] = useState(false)

  const fetchText = async (authorIdArg: string, bookIdArg: string) => {
    setShowResults(false)
    setShowTweets(false)
    setWaitForLoading(true)
    const res = await fetch('/api/fetch-aozora', {
      method: 'POST',
      body: JSON.stringify({ bookId: bookIdArg, authorId: authorIdArg }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      alert('取得に失敗しました。別な作品をお試しください。')
      setShowResults(true)
      setWaitForLoading(false)
      return
    }

    const data = await res.json()
    const chunks = data.text.match(/[\s\S]{1,140}/g) || []
    setTextChunks(chunks)
    setTitle(data.title)
    if (data.title.length > 16) {
      setTitleShorten(data.title.slice(0, 16) + '…')
      setShowUserName(false)
    } else if (data.title.length > 8) {
      setTitleShorten(data.title.slice(0, 8) + '…')
      setShowUserName(true)
    } else {
      setTitleShorten(data.title)
      setShowUserName(true)
    }
    setAuthor(data.author)
    setAuthorRomaji(data.authorRomaji.replace(/[ ,=.']/g, '').slice(0, 11))
    setDate(data.date)
    setWaitForLoading(false)
    setShowTweets(true)
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', width: '40%', maxWidth: '300px' }}>
        <span style={{ fontSize: '12px' }}>Aa</span>
        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          style={{ flexGrow: 1, accentColor: '#0070f3', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '15px' }}>Aa</span>
      </div>
      {waitForLoading && (
        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
          <div className='loading' />
        </div>
      )}

    </>
  )
}
