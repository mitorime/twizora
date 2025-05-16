import { TweetView } from "@/src/components/TweetView";
import { fetchBook } from "@/src/service/aozora/client";
import { FontSizeSwitcher } from "@/src/components/FontSizeSwitcher";

export default async function Page({ params }: {
  params: Promise<{
    authorId: string;
    bookId: string;
  }>
}) {
  const { authorId, bookId } = await params;
  const book = await fetchBook(bookId, authorId);
  const chunks = book.text.match(/[\s\S]{1,140}/g) || []

  return (
    <>
      <FontSizeSwitcher />
      <div style={{ marginTop: '2rem', fontSize: `${15}px`, width: '100%' }}>
      {chunks.map((chunk, idx) => (
        <TweetView title={book.title} author={book.author} userId={book.authorRomaji.replace(/[ ,=.']/g, '').slice(0, 11)} content={chunk} date={book.date} key={idx}/>
      ))}
    </div>
    </>
  )
}
