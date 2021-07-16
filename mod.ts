import { contentType } from 'https://deno.land/x/media_types@v2.9.2/mod.ts'
declare namespace slate {
  export interface Collection {
    id: string
    slatename: string
    ownerId: string
    isPublic: boolean
    data: {
      name: string
      body: string
      layouts: {
        ver: string
        layout: any[]
        fileNames: boolean
        defaultLayout: boolean
      }
      tags: any[]
    }
    subscriberCount: number
    fileCount: number
  }

  export interface Object {
    id: string
    ownerId: string
    createdAt: Date
    cid: string
    filename: string
    isPublic: boolean
    data: {
      name: string
      size: number
      type: string
      blurhash: string
    }
    likeCount: number
    downloadCount: number
    saveCount: number
  }
}

const request = async (url: string, apiKey: string, opts?: RequestInit) => {
  const res = await fetch(`https://slate.host/api/v2/${url}`, {
    method: 'POST',
    headers: opts?.headers || {
      'Content-Type': 'application/json',
      Authorization: `Basic ${apiKey}`
    },
    ...opts
  })

  const json = await res.json()

  if (json.error) throw new Error(json.decorator)

  return json
}

export class Slate {
  #apiKey: string
  constructor({ apiKey }: { apiKey: string }) {
    this.#apiKey = apiKey
  }
  /**
   * This API request returns your user data and collections. If the request body is omitted, the request will return only your public collections by default.
   */
  async getUserData(): Promise<{
    user: {
      id: string
      username: string
      library: {
        id: string
        ownerId: string
        createdAt: Date
        cid: string
        filename: string
        isPublic: boolean
        data: any[]
        likeCount: number
        downloadCount: number
        saveCount: number
      }[]
      data: {
        photo: string
        body: string
      }
      followerCount: number
      fileCount: number
      slateCount: number
    }
    collections: {
      id: string
      slatename: string
      ownerId: string
      isPublic: boolean
      objects: slate.Object[]
      data: {
        name: string
        body: string
        layouts: any[]
        tags: any[]
        url: string
      }
      subscriberCount: number
      fileCount: number
    }[]
  }> {
    const json = await request('get', this.#apiKey)

    const collections = json.collections

    const user = json.user

    return { user, collections }
  }
  /**
   * This API request will return a specific collection. You can save the response locally and send this JSON back to our API server using the route /api/v2/update-collection to update your collection.
   * @param id collection ID
   */
  async getCollection(id: string): Promise<{
    collection: slate.Collection & {
      objects: slate.Object[]
    }
  }> {
    const json = await request('get-collection', this.#apiKey, {
      body: JSON.stringify({
        data: {
          id
        }
      })
    })

    const collection = json.collection

    return { collection }
  }
  /**
   * This API endpoint allows you to modify a collection by saving the response from get-collection, modifying it, and sending it back
   * @param id collection ID
   * @param update function with old collection data as an argument that returns the new collection data
   * @example
   * ```ts
   * await slate.updateCollection<{ foo: string }>('some-id', (data) => { return { ...data, foo: 'bar' } })
   * ```
   */
  async updateCollection(
    id: string,
    update: (data: slate.Collection) => slate.Collection
  ): Promise<{ collection: slate.Collection }> {
    let { collection }: { collection: slate.Collection } = await this.getCollection(id)

    collection = update(collection)

    collection = (
      await request('update-collection', this.#apiKey, {
        body: JSON.stringify({ data: collection })
      })
    ).collection

    return { collection }
  }

  /**
   * This API endpoint allows you to modify a file by saving the collection object in the response from get-collection, modifying it, and sending it back
   * @param id collection ID
   * @param fileId file ID
   * @param update function with old file data as an argument that returns the new file data
   */
  async updateFile(
    collId: string,
    fileId: number,
    update: (file: slate.Object) => slate.Object
  ): Promise<{ file: slate.Object }> {
    const { collection } = await this.getCollection(collId)

    let file = update(collection.objects[fileId])

    file = (
      await request('update-file', this.#apiKey, {
        body: JSON.stringify({ data: file })
      })
    ).file

    return { file }
  }

  /**
   * This API endpoint uploads a file to root or a collection.
   * @param filename filename
   * @param collection collection ID
   */
  async uploadFile(
    filename: string,
    collection?: string
  ): Promise<{
    id: string
    filename: string
    createdAt: Date
    data?: any
    cid: string
    name: string
    type: string
    size: number
  }> {
    const form = new FormData()
    const fileContent = await Deno.readFile(filename)

    const blob = new Blob([fileContent], { type: contentType(filename) })

    form.append('file', blob)

    const res = await fetch(`https://uploads.slate.host/api/public${`/${collection}` || ''}`, {
      method: 'POST',
      body: form,
      headers: {
        Authorization: `Basic ${this.#apiKey}`
      }
    })

    const { data } = await res.json()

    return data
  }
}
