export class SongItem{
  id:number
  title:string
  image:string
  singer:string
}

export class SongDataSource implements IDataSource {
  private listeners:DataChangeListener[]=[]
  private dataArray:SongItem[]=[]

  constructor(dataitem:SongItem[]) {
    for (let index=0;index<dataitem.length;index++){
      this.dataArray.push(dataitem[index])
    }
  }

  unregisterDataChangeListener(listener: DataChangeListener): void {
    const pos=this.listeners.indexOf(listener)
    if (pos>=0){
      console.debug('MyTag remove listener')
      this.listeners.splice(pos,1)
    }
  }

  registerDataChangeListener(listener: DataChangeListener): void {
    if (this.listeners.indexOf(listener)<0){
      console.debug('MyTag add listener')
      this.listeners.push(listener)
    }
  }

  getData(index: number) {
    return this.dataArray[index]
  }

  totalCount(): number {
    return this.dataArray.length
  }

  onDataReloaded(): void {
    this.listeners.forEach(listener=>{
      listener.onDataReloaded()
    })
  }

  onDataAdd(index: number): void {
    this.listeners.forEach(listener=>{
      listener.onDataAdd(index)
    })
  }

  onDataMove(from: number, to: number): void{
    this.listeners.forEach(listener=>{
      listener.onDataMove(from,to)
    })
  }

  onDataDelete(index: number): void{
    this.listeners.forEach(listener=>{
      listener.onDataDelete(index)
    })
  }

  onDataChange(index: number): void{
    this.listeners.forEach(listener=>{
      listener.onDataChange(index)
    })
  }
}