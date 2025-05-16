import aozoraData from '@/data/aozora_books.json'
import iconv from 'iconv-lite'

export interface Book {
  authorId: number;
  author: string;
  bookId: number;
  book: string;
  translator: string;
  status: string;
  since: string;
}

export const searchBooks = (keyword: string): Book[] => {
  const lowerKeyword = keyword.toLowerCase()

  return aozoraData.filter(book =>
    book.authorId.toString().toLowerCase().includes(lowerKeyword) ||
    book.author.toLowerCase().includes(lowerKeyword) ||
    book.bookId.toString().toLowerCase().includes(lowerKeyword) ||
    book.book.toLowerCase().includes(lowerKeyword)
  ).splice(0, 16)
}

export const fetchBook = async (bookId: string, authorId: string) => {
  let title = '青空文庫' // 初期値というか、エラー時のデフォルト値
  let author = '青空文庫'
  let authorRomaji = 'aozora_twi'
  let date = '1970/01/01' // これはノリ

  console.log('[API] 受け取った bookId:', bookId, 'authorId:', authorId)

  // 図書カード URL を直接組み立てて、図書カードの HTML から作品本体の XHTML ファイル名を抽出
  const cardUrl = `https://raw.githubusercontent.com/aozorabunko/aozorabunko/master/cards/${authorId.toString().padStart(6, '0')}/card${bookId}.html`
  const resCard = await fetch(cardUrl)
  if (!resCard.ok) {
    console.error('[API] カードHTML fetch失敗:', cardUrl, resCard.status, resCard.statusText)
    throw new Error('カードHTML fetch失敗');
  }
  const cardHtml = await resCard.text()

  // 図書カードの HTML からタイトル、著者名、ローマ字表記を抽出
  const titleMatch = cardHtml.match(/作品名：<\/td><td><font size="\+2">(.*?)<\/font><\/td>/)
  if (titleMatch) {
    title = titleMatch[1]
  }
  const authorMatch = cardHtml.match(/作家名：<\/td><td><a href="\.\.\/\.\.\/index_pages\/person\d+\.html">(.*?)<\/a><\/td>/)
  if (authorMatch) {
    author = authorMatch[1]
  }
  const authorRomajiMatch = cardHtml.match(/ローマ字表記：<\/td><td>(.*?)<\/td><\/tr>/)
  if (authorRomajiMatch) {
    authorRomaji = authorRomajiMatch[1]
  }
  // 初版発行日を抽出
  const dateRawMatch = cardHtml.match(/初版発行日：<\/td><td>(\d{4})[^年]*年\s*(\d{1,2})月\s*(\d{1,2})日/)
  if (dateRawMatch) {
    const yyyy = dateRawMatch[1]
    const mm = dateRawMatch[2].padStart(2, '0')
    const dd = dateRawMatch[3].padStart(2, '0')
    date = `${yyyy}/${mm}/${dd}`
  }

  // XHTMLファイル名を抽出
  const xhtmlMatch = cardHtml.match(/\.\/files\/(\d+_\d+\.html)/)
  if (!xhtmlMatch) {
    console.warn('[API] XHTML ファイル名がカード HTML から見つかりません:', bookId)
    throw new Error('XHTML ファイル名がカード HTML から見つかりません。')
  }

  const fileName = xhtmlMatch[1]
  const bookUrl = `https://raw.githubusercontent.com/aozorabunko/aozorabunko/master/cards/${authorId.toString().padStart(6, '0')}/files/${fileName}`

  const res = await fetch(bookUrl)
  const buffer = await res.arrayBuffer()
  const decoded = iconv.decode(Buffer.from(buffer), 'shift_jis')

  const start = decoded.indexOf('［＃本文開始］')
  const end = decoded.indexOf('［＃本文終了］')
  let text = (start === -1 || end === -1)
    ? decoded
    : decoded.slice(start, end) // いったん無視だ

  // タイトル除去 
  text = text.replace(/<title>.*?<\/title>/g, '')
  // メタデータ除去 
  text = text.replace(/<div class="metadata">[\s\S]*?<\/div>/g, '')
  // 奥付除去 
  text = text.replace(/<div class="bibliographical_information">[\s\S]*?<\/div>/g, '')
  text = text.replace(/<div class="notation_notes">[\s\S]*?<\/div>/g, '')
  text = text.replace(/<div id="card">[\s\S]*?<\/div>/g, '')
  // ルビ除去
  text = text.replace(/<ruby><rb>(.*?)<\/rb><rp>.*?<\/rp><rt>.*?<\/rt><rp>.*?<\/rp><\/ruby>/g, '$1')
  // その他タグ除去
  text = text.replace(/<[^>]*>/g, '')
  // 入力補注除去
  text = text.replace(/［＃.*?］/g, '')
  // 改行削除
  text = text.replace(/^\s+/, '')        // 冒頭
  text = text.replace(/\s+$/, '')        // 末尾
  text = text.replace(/\n{3,}/g, '\n\n') // 改行の圧縮

  return ({ text, title, author, authorRomaji, date })
}