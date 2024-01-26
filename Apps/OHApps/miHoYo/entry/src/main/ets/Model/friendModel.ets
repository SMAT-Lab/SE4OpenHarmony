@Entry
@Component
export class FriendModel {
  reason: string
  result: {
    content: string //内容
    source: string//来源
  }
  error_code: number
}
