import Link from "next/link";

export default function NotFountPage() {
  return (
    <>
      <div style={{ fontSize: '14px', color: '#536471', textAlign: 'center' }}>
        <p style={{ marginBottom: '16px' }}>このページは存在しません。他のページを検索してみましょう。</p>
        <Link
          href={'/search'}
          className='search-button'
          style={{ lineHeight: '1', paddingTop: '0.5em', paddingBottom: '0.5em' }}
        >
          検索
        </Link>
      </div>
    </>
  )
}