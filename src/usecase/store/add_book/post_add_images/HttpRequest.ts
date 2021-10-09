import { makeEndpointAPI } from '../../../../config/api'

const filesURLToBlobs = async (filesURL: string[]): Promise<Blob[]> =>
  await Promise.all(filesURL.map(
    async fileURL => await (await fetch(fileURL)).blob()
  ))

export const addImagesHttpRequest =
  async (bookID: number, filesURL: string[], userToken: string): Promise<void> => {
    const slug = `book/imgs?book_id=${bookID}`
    const urlPost = makeEndpointAPI(slug)

    const formData = new FormData()
    const blobs = await filesURLToBlobs(filesURL)
    blobs.forEach(blob => {
      formData.append('files', blob)
    })

    await fetch(urlPost, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      body: formData
    })
  }
