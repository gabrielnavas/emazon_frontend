import { Book } from './Entity'
import { HttpRequest } from './HttpRequest'

export class GetBookUsecase {
  private readonly BOOK_PEER_PAGE = 10

  constructor (
    private readonly httpRequest: HttpRequest
  ) {}

  getBook = async (bookID: number): Promise<Book> => {
    if (bookID <= 0) {
      throw Error('bookID needs to be greate than 0')
    }
    const response = await this.httpRequest.getBook(bookID)

    if (response.book === undefined) {
      throw Error('book not found')
    }
    return response.book
  }

  getBookIDs = async (): Promise<{booksID: number[]}> => {
    const response = await this.httpRequest.getBookIDs()
    return {
      booksID: response.bookIDs
    }
  }
}
