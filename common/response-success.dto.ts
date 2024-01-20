export class SuccessResponseDto {
  data: any
  docId?: string

  constructor(data: any, docId: string) {
    this.data = data
    this.docId = docId
  }
}
