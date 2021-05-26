export interface Collection {
  id: string
  createdAt: Date
  updatedAt: Date
  slatename: string
  data: {
    body: string
    name: string
    tags: any[]
    layouts: {
      ver: string
      layout: any[]
      fileNames: boolean
      defaultLayout: boolean
    }
  }
  ownerId: string
  isPublic: boolean
  subscriberCount: number
  fileCount: number
}
