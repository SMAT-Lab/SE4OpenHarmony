import { BreakpointConstant } from '../../common/BreakpointConstant'
import { SongDataSource, SongItem } from './SongDataSource'
import { songList } from './SongOption'

@Component
export struct PlayerList {
  @StorageProp('currentBreakpoint') currentBreakpoint:string='sm'

  @Builder PlayAll() {
    Row({ space: 10 }) {
      Image($r('app.media.ic_play'))
        .width(20)
        .height(20)
        .objectFit(ImageFit.Contain)

      Text('播放全部')
        .fontSize(14)
        .fontWeight(FontWeight.Bold)

      Blank()

      Image($r('app.media.ic_list'))
        .width(20)
        .height(20)
        .objectFit(ImageFit.Contain)
      Image($r('app.media.ic_public_view'))
        .width(20)
        .height(20)
        .objectFit(ImageFit.Contain)
    }.width('100%')
  }

  build() {
    Column({ space: 10 }) {
      //播放列表标题栏
      this.PlayAll()

      //LazyForEach加载数据
      List({space:10}) {
        //数据懒加载
        LazyForEach(new SongDataSource(songList), (item: SongItem) => {
          ListItem() {
            Row({space:10}) {
              Column({ space: 10 }) {
                Text(item.title)
                  .fontSize(14)
                  .fontWeight(FontWeight.Bold)
                Text(item.singer)
                  .fontSize(12)
              }.alignItems(HorizontalAlign.Start)

              Image(item.image)
                .width(40)
                .height(30)
                .objectFit(ImageFit.Fill)
              Blank()

              Image($r('app.media.ic_more_list'))
                .width(20)
                .height(20)
                .objectFit(ImageFit.Contain)
            }.width('100%')
            .padding(5)
            .onClick(()=>{
            })
          }
        },item=>item)
      }.width('100%')
      .height('100%')
      .divider({ strokeWidth: 1, color: '#ffdadbda', startMargin: 10, endMargin: 10 })
      .lanes(this.currentBreakpoint==BreakpointConstant.BREAKPOINT_LG?2:1)
      .layoutWeight(1)

    }.width('100%')
    .padding(10)
  }
}