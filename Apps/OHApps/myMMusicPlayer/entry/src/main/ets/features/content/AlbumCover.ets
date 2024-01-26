import { BreakpointConstant } from '../../common/BreakpointConstant'
import { songOption } from '../content/SongOption'
import { PlayerList } from './PlayerList'
@Component
export struct AlbumCover {
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm'

  @Builder CoverImage() {
    Row() {
      Image($r('app.media.ic_album'))
        .objectFit(ImageFit.Contain)
        .aspectRatio(1)
    }
  }

  @Builder CoverIntroduction() {
    Column({ space: 20 }) {
      Text('独立民谣')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .textAlign(TextAlign.Start)
      Text('歌单选取了一批比较受关注的民谣歌曲')
        .fontSize(14)
    }.width('100%')
    .alignItems(HorizontalAlign.Start)
    .padding({ left: 10 })
  }

  @Builder CoverOption() {
    Row() {
      ForEach(songOption, (item) => {
        Column({ space: 10 }) {
          Image(item.image)
            .width(30)
            .height(30)
            .objectFit(ImageFit.Fill)
          Text(item.txt)
            .fontSize(12)
        }.height(45)
      })
    }.width('100%')
    .margin({ top: 20, bottom: 10 })
    .justifyContent(FlexAlign.SpaceEvenly)
  }

  build() {
    Column() {
      GridRow() {
        GridCol({
          span: { sm: 4, md: 12, lg: 12 }
        }) {
          this.CoverImage()
        }

        GridCol({
          span: { sm: 8, md: 12, lg: 12 }
        }) {
          this.CoverIntroduction()
        }

        GridCol({
          span: { sm: 12, md: 12, lg: 12 }
        }) {
          this.CoverOption()
        }
      }.width('100%')
      .padding(10)
    }
  }
}