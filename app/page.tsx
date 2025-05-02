'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export const metadata = {
  title: '青空文庫をTwitterっぽく表示するやつ',
  description: '青空文庫の作品をTwitterのスレッド風に表示する非公式ビューア。ツイ廃向け。',
  openGraph: {
    title: '青空文庫をTwitterっぽく表示するやつ',
    description: '青空文庫の作品をTwitterのスレッド風に表示する非公式ビューア。ツイ廃向け。',
    url: 'https://aozora-twi.vercel.app',
    siteName: '青空文庫をTwitterっぽく表示するやつ',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/pw/AP1GczOgYDPBofbDogGE0NXKrpiO8vlC64WNQmoPN4EuDF-OZpkudiPnorfEGdSZBxz1g2Fith4_ArOEAAHWJegfkfX102MyYyqF9Ntfjt7my-xT3cgs_4VtylpgB02MfKDgYaAG_SoszlKmlYwiVbpALkRn=w1200-h630-s-no',
        width: 1200,
        height: 630,
        alt: '青空文庫Twitter OGP',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '青空文庫をTwitterっぽく表示するやつ',
    description: '青空文庫の作品をTwitterのスレッド風に表示する非公式ビューア。ツイ廃向け。',
    images: ['https://lh3.googleusercontent.com/pw/AP1GczOgYDPBofbDogGE0NXKrpiO8vlC64WNQmoPN4EuDF-OZpkudiPnorfEGdSZBxz1g2Fith4_ArOEAAHWJegfkfX102MyYyqF9Ntfjt7my-xT3cgs_4VtylpgB02MfKDgYaAG_SoszlKmlYwiVbpALkRn=w1200-h630-s-no'],
  },
}

export default function Home() {
  const [titleShorten, setTitleShorten] = useState('')
  const [showUserName, setShowUserName] = useState(false)
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

  async function searchAozoraData(keyword: string) {
    if (!keyword) {
      setSearchResults([])
      setShowResults(false)
      return
    }
    try {
      const res = await fetch('/api/fetch-aozora', {
        method: 'POST',
        body: JSON.stringify({ keyword }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        alert('検索に失敗しました。時間をおいて再度お試しいただくか、別な作品をお試しください。')
        return
      }
      const data = await res.json()
      setSearchResults(data.results || [])
      setShowResults(true)
    } catch (error) {
      alert('検索中にエラーが発生しました。時間をおいて再度お試しください。')
    }
  }

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
    setAuthorRomaji(data.authorRomaji.replace(/[ ,=.']/g, '').slice(0, 11))
    setDate(data.date)
    setWaitForLoading(false)
    setShowTweets(true)
  }

  return (
    <main className='main'>
    <div className='screen'>
      <h1>青空文庫を Twitter っぽく表示するやつ</h1>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '1rem', padding: '8px 4px' }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="🔍 作品・作者名を検索"
          className='search-field'
        />
        <button
          onClick={() => searchAozoraData(keyword)}
          className='search-button'
          style={{ lineHeight: '1', paddingTop: '0.5em', paddingBottom: '0.5em' }}
        >
          検索
        </button>
      </div>
      {showResults && (
        <>
        {searchResults.length === 0 ? (
          <div style={{ fontSize: '14px', color: '#536471', textAlign: 'center', marginBottom: '2rem' }}>
            検索結果がありません。ほかのキーワードを試してみてください。
          </div>
        ) : (
          <div style={{ display: 'flex', flexFlow: 'column', gap: '24px', marginBottom: '2rem' }}>
            {searchResults.map((result, index) => (
              <div key={index}>
                <div
                  onClick={() => {
                    fetchText(result.authorId, result.bookId)
                    console.log('Selected item:', result.authorId, " - ", result.bookId)
                  }}
                  className='choose-book-wrap'
                >
                  <Image
                    src="/icon.png"
                    alt="アイコン"
                    width={40}
                    height={40}
                    style={{ borderRadius: '20px' }}
                  />
                  <div style={{ marginTop: '-4px' }}>
                    <span className='display-name'>{result.book}</span>
                    <br />
                    <span className='user-name'>@{result.author}</span>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: '14px', color: '#536471', textAlign: 'center' }}>
              五十音順の先頭 16 件を表示しています。
            </div>
          </div>
        )}
        </>
      )}
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
          <div className='loading'/>
        </div>
      )}
      {showTweets && (
      <div style={{ marginTop: '2rem', fontSize: `${textSizeList[size]}px` }}>
        {textChunks.map((chunk, idx) => (
          <React.Fragment key={idx}>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px', marginBottom: '4px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
               <Image
                src="/icon.png"
                alt="アイコン"
                width={`${iconSizeList[size]}`}
                height={`${iconSizeList[size]}`}
                style={{ borderRadius: '20px' }}
              />
              {idx < textChunks.length - 1 && (
                <div style={{ flexGrow: 1, width: '40px', alignSelf: 'stretch', display: 'flex', justifyContent: 'center' }}>
                  <div className='thread' style={{ borderRadius: '2px',  height: '100%' }}></div>
                </div>
              )}
            </div>
            <div style={{ whiteSpace: 'pre-wrap', marginTop: '-4px' }}>
              <div>
               <span className='display-name'>{titleShorten}&nbsp;</span>
               {showUserName && <span className='user-name'>@{authorRomaji}</span>}
               <span className='user-name'> ･ {date}</span>
              </div>
              {chunk}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', height: '40px' }}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <Image
                    key={n}
                    src={`/ui${n}.svg`}
                    alt={`UI${n}`}
                    width={18}
                    height={18}
                  />
                ))}
              </div>
             </div>
           </div>
          </React.Fragment>
        ))}
      </div>
      )}
      </div>
    </main>
  )
}