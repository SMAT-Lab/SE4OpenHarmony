import { AlbumCover } from './AlbumCover'
import { PlayerList } from './PlayerList'
@Component
export struct Content {

  build(){
    GridRow(){
      GridCol({span:{sm:12,md:6,lg:4}}){
        AlbumCover()
      }

      GridCol({span:{sm:12,md:6,lg:8}}){
        PlayerList()
      }
    }
  }
}
