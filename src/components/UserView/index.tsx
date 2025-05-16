import { Book } from "@/src/service/aozora/client"
import Image from "next/image"
import Link from "next/link"

interface UserViewProps {
  book: Book
}

export const UserView = ({ book }: UserViewProps) => {
  return (
    <Link href={`/${book.authorId}/status/${book.bookId}`}>
      <div
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
          <span className='display-name'>{book.book}</span>
          <br />
          <span className='user-name'>@{book.author}</span>
        </div>
      </div>
    </Link>
  )
}
