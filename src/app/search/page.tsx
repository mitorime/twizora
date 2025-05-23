import { UserView } from "@/src/components/UserView";
import { searchBooks } from "@/src/service/aozora/client";

export default async function Page({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q ?? "";
  const results = query ? searchBooks(query) : [];

  return (
    <>
      {results.length === 0 ? (
        <div style={{ fontSize: '14px', color: '#536471', textAlign: 'center', marginBottom: '2rem' }}>
          検索結果がありません。ほかのキーワードを試してみてください。
        </div>
      ) : (
        <div style={{ display: 'flex', flexFlow: 'column', gap: '8px', marginBottom: '2rem' }}>
          {results.map(result => <UserView book={result} key={`${result.authorId}-${result.bookId}`} />)}
          <div style={{ fontSize: '14px', color: '#536471', textAlign: 'center' }}>
            五十音順の先頭 16 件を表示しています。
          </div>
        </div>
      )}
    </>
  )
}
