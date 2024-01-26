import hilog from '@ohos.hilog'
import router from '@ohos.router'

export default class Logger {
  format:string = '%{public}s, #%{public}s'

  constructor() {
  }

  info(content?:Object) {
    hilog.isLoggable(0x0000,'bluetoothTest[entry]', hilog.LogLevel.INFO)
    hilog.info(0x0000, 'bluetoothTest[entry]', this.format, JSON.stringify(content), this.currentRoute())
  }

  error(err:Error) {
      hilog.isLoggable(0x0000,'bluetoothTest[entry]', hilog.LogLevel.ERROR);
      hilog.error(0x0000, 'bluetoothTest[entry]', '%{public}s, #%{public}s, %{public}s', err.message, this.currentRoute(), err.stack )
  }

  currentRoute(){
    try{
      let rs = router && router.getState();
      let res = `${rs.path}${rs.name}`
      return res;
    }catch(ex){
      return "@"+ex.message;
    }
  }
}
