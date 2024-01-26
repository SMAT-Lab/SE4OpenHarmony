import prompt from '@ohos.prompt';
import nuofan from '../utils/nuofan';
import ug11 from '../utils/ug11';
import bioland from '../utils/bioland';
import ble from '@ohos.bluetooth.ble';
import { BusinessError } from '@ohos.base';
import access from '@ohos.bluetooth.access';
import Bluetooth from './Bluetooth';
import Logger from './Logger';
import emitter from '@ohos.events.emitter';
import promptAction from '@ohos.promptAction';

export const DeviceText = {
  devicea: "设备A",
  deviceb: "设备B",
  devicec: "设备C",
  device1 : "设备"
}
let test = 0
let logger = new Logger()

export const BlueToothEvent: emitter.InnerEvent = {
	eventId: 1,
	priority: emitter.EventPriority.LOW
};

export default class SignDevice {
	deviceProducer: DeviceProducer
	clientDeviceMap: {[key: string]: ble.GattClientDevice} = {}
	bluetooth: Bluetooth
	status: number

	constructor(bluetooth: Bluetooth) {
		this.bluetooth = bluetooth

		this.deviceProducer = new DeviceProducer()
		this.deviceProducer.add(new Sinocare())
		this.deviceProducer.add(new Bioland())
		this.bluetooth.on("stateChange", this.onStateChange, this)
		this.bluetooth.on("BLEDeviceFind", this.onDeviceFound, this)
	}

	startScan() {
		try {
			let scanOptions: ble.ScanOptions = {
				interval: 500,
				dutyMode: ble.ScanDuty.SCAN_MODE_LOW_POWER,
				matchMode: ble.MatchMode.MATCH_MODE_AGGRESSIVE,
			}
			this.bluetooth.startBLEScan(null, scanOptions)
			ble.startBLEScan(null,scanOptions);
		} catch (err) {
			logger.info(err)
		}
	}
	onStateChange(data: access.BluetoothState) {
		this.status =data
		console.info("蓝牙状态变化：" + data)
		if(data === access.BluetoothState.STATE_ON) {
			this.startScan()
		}
	}
	onDeviceFound(data) {
		(function(ctx, data) {
			setTimeout(()=>{
				logger.info('BLE scan device find result = ' + JSON.stringify(data));
				logger.info("开始扫描设备地址")
				promptAction.showToast({
					message: "测试蓝牙"
				})
				try {
					if(data && data.length && data.length > 0) {
						data.forEach(item => {
							if(ctx.deviceProducer.getMacList().indexOf(item.deviceId) > -1) {
								if(globalThis.test == 1)
								{
									console.info(" 23324")
									ctx.clientDeviceMap = {}
									globalThis.test = 0
								}
								if(Object.keys(ctx.clientDeviceMap).includes(item.deviceId)) {
									console.info(" 提前")
									ctx.onBLECharacteristicChange(item.deviceId)
									return
								}
								console.info(" 扫描符合可以连接")
								const device = ctx.bluetooth.createGattClientDevice(item.deviceId)
								ctx.clientDeviceMap[item.deviceId] = device
								ctx.bluetooth.on("BLEConnectionStateChange", device, ctx.onConnectionStateChange, ctx)
								ctx.bluetooth.deviceConnect(device)
								ctx.onBLECharacteristicChange(item.deviceId)
							}
						});
					}
				} catch (error) {
					logger.error(error)
				}
			},0)
		})(this,data)
	}

	onConnectionStateChange(data) {
		try {
      const {deviceId, state} = data
			console.info(" 状态：" + state)
      if(state == 0) {
        prompt.showToast({
          message: DeviceText[this.deviceProducer.getDeviceType(deviceId)] + '断开连接',
          duration: 2000,
        });
      }
      if(state == 2) {
        prompt.showToast({
          message: DeviceText[this.deviceProducer.getDeviceType(deviceId)] + '连接成功',
          duration: 2000,
        });
        this.getServices(deviceId)
      }

    } catch (err) {
      logger.info("bluetooth connect state error errCode:" + err.code + ",errMessage:" + err.message);
    }
	}

	getServices(deviceId) {
		try {
			this.bluetooth.getService(this.clientDeviceMap[deviceId]).then((result: Array<ble.GattService>) => {
				this.setNotifyCharacteristicChanged(deviceId)
				console.info(" 获取服务成功"+JSON.stringify(result))
			})
		} catch (error) {
			console.info(" 获取服务错误了")
			logger.error(error)
		}
	}

	writeCharacteristicValue(deviceId) {
    let bufferDesc = new ArrayBuffer(8);
    let descV = new Uint8Array(bufferDesc);
    descV[0] = 11;
    let descriptor = {
			serviceUuid: this.deviceProducer.getServiceId(deviceId),
			characteristicUuid: this.deviceProducer.getWriteCharacteristicId(deviceId),
			descriptorUuid: "",
      descriptorValue: bufferDesc
    };
    let descriptors = [descriptor];

    let bufferCCC = new ArrayBuffer(8);
    let cccV = new Uint8Array(bufferCCC);
    cccV[0] = 1;
    let characteristic = {
			serviceUuid: this.deviceProducer.getServiceId(deviceId),
			characteristicUuid: this.deviceProducer.getCharacteristicId(deviceId),
			characteristicValue: bufferCCC,
			descriptors: descriptors
    };
    try {
			console.info(" UUID" + this.deviceProducer.getServiceId(deviceId))
			console.info(" tUUID" + this.deviceProducer.getWriteCharacteristicId(deviceId))
			this.bluetooth.writeCharacteristicValue(this.clientDeviceMap[deviceId], characteristic)
			console.info(" chenggong")
    } catch (err) {
      // this.app.logger.error(err);
			console.info(" shibai")
			console.error('errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
    }
	}

	setNotifyCharacteristicChanged(deviceId) {
		// 创建descriptors
    let arrayBuffer = new ArrayBuffer(8);
    let descV = new Uint8Array(arrayBuffer);
    descV[0] = 11;
    let descriptor: ble.BLEDescriptor = {
      serviceUuid: this.deviceProducer.getServiceId(deviceId),
      characteristicUuid: this.deviceProducer.getCharacteristicId(deviceId),
      descriptorUuid: '',
      descriptorValue: arrayBuffer };
    let descriptors: Array<ble.BLEDescriptor> = [descriptor];
    let arrayBufferC = new ArrayBuffer(8);
    let characteristic = {
			serviceUuid: this.deviceProducer.getServiceId(deviceId),
			characteristicUuid: this.deviceProducer.getCharacteristicId(deviceId),
			characteristicValue: arrayBufferC,
			descriptors: descriptors
    };

      let result = this.bluetooth.setNotifyCharacteristicChanged(this.clientDeviceMap[deviceId], characteristic, true);
			if(result == true)
			{
				this.writeCharacteristicValue(deviceId)
				console.info(" setNotifyCharacteristicChanged success" )

			}else
			{
				console.info(" setNotifyCharacteristicChanged erro")
				this.clientDeviceMap[deviceId].off("BLEConnectionStateChange")
				this.clientDeviceMap ={}
				return false
			}
	}

	onBLECharacteristicChange(deviceId) {
			this.bluetooth.on("BLECharacteristicChange", this.clientDeviceMap[deviceId], (CharacteristicChangeReq: ble.BLECharacteristic) => {
				console.info(" onBLECharacteristicChange")
				this.deviceProducer.onCharacteristicChange(deviceId, CharacteristicChangeReq)
			}, this);
	}


}

interface Compose {
	deviceMap: {[key: string]: string[]}
	add(child: Compose): void // 添加设备厂家
	addMac(mac: string, deviceType: string): void // 添加mac地址
	getMacList(): string[] // 获取mac地址列表
	getDeviceType(deviceId: string): string // 根据mac地址列表获得设备类型
	getServiceId(deviceId: string): string
	getCharacteristicId(mac: string): string
	getWriteCharacteristicId(deviceId: string): string
	onCharacteristicChange(deviceId: string, characteristicChangeReq: ble.BLECharacteristic): void
}

class DeviceProducer implements Compose {
	deviceMap: { [key: string]: string[] } = {}
	children: Compose[] = []
	constructor() {
	}
	onCharacteristicChange(deviceId: string, characteristicChangeReq: ble.BLECharacteristic): void {
		console.info(" onCharacteristicChange")
		this.children.forEach(item => {
			item.onCharacteristicChange(deviceId, characteristicChangeReq)
		})
	}
	add(child: Compose): void {
		this.children.push(child)
	}
	addMac(mac: string, deviceType: string): void {
		this.children.forEach(item => {
			item.addMac(mac, deviceType)
		})
	}
	getMacList(): string[] {
		return this.children.reduce((total: string[], next) => {return total.concat(next.getMacList())},[])
	}

	getDeviceType(deviceId: string): string {
		return this.children.reduce((total: string, next) => { return next.getDeviceType(deviceId) || total},"");
	}

	getServiceId(deviceId: string): string {
		return this.children.reduce((total: string, next) => { return next.getServiceId(deviceId) || total},"");
	}

	getCharacteristicId(deviceId: string): string {
		return this.children.reduce((total: string, next) => { return next.getCharacteristicId(deviceId) || total},"");
	}

	getWriteCharacteristicId(deviceId: string): string {
		return this.children.reduce((total: string, next) => { return next.getWriteCharacteristicId(deviceId) || total},"");
	}
}



class DeviceFactory implements Compose {
	deviceMap: {[key: string]: string[]} = {}
	serviceIdMap: {[key: string]: string} = {}
	writeCharacteristicIdMap: {[key: string]: string} = {}
	characteristicIdMap: {[key: string]: string} = {}
	constructor() {
	}
	onCharacteristicChange(deviceId: string, CharacteristicChangeReq: ble.BLECharacteristic): void {
	}
	add(child: Compose): void {}
	addMac(mac: string, deviceType: string) {
		this.deviceMap[deviceType].push(mac)
	}
	getMacList(): string[] {
		return Object.values(this.deviceMap).reduce((total: string[],next) => total.concat(next), [])
	}

	getDeviceType(deviceId: string): string {
		let deviceType = ""
		Object.keys(this.deviceMap).forEach(key => {
			if(this.deviceMap[key].includes(deviceId)) {
				deviceType = key
			}
		})
		return deviceType
	}

	getServiceId(deviceId: string): string {
		return this.getDeviceType(deviceId)
			? this.serviceIdMap[this.getDeviceType(deviceId)]
			: ""
	}

	getCharacteristicId(deviceId: string): string {
		return this.getDeviceType(deviceId)
			? this.characteristicIdMap[this.getDeviceType(deviceId)]
			: ""
	}

	getWriteCharacteristicId(deviceId: string): string {
		return this.getDeviceType(deviceId)
			? this.writeCharacteristicIdMap[this.getDeviceType(deviceId)]
			: ""
	}
}

class Sinocare extends DeviceFactory {
	deviceMap: {[key: string]: string[]} = {
		devicea : [""],
  	deviceb: [""],
  	devicec: [""],
  	device1: []
	}
	serviceIdMap = Object.freeze({
  	deviceb: "",
  	devicea: "",
  	devicec: "",
	})

	characteristicIdMap = Object.freeze({
  	deviceb: "",
  	devicea: "",
  	devicec: "",
	})

	writeCharacteristicIdMap = Object.freeze({
  	deviceb: "",
  	devicea: "",
  	devicec: "",
	})

	constructor() {
		super()
	}

	onCharacteristicChange(deviceId: string, characteristicChangeReq: ble.BLECharacteristic): void {
		super.onCharacteristicChange(deviceId, characteristicChangeReq)
		let deviceType = this.getDeviceType(deviceId)
		if(!deviceType) return

		this.ondevicecCharacteristicChange(characteristicChangeReq, deviceType)
		this.ondeviceaCharacteristicChange(characteristicChangeReq, deviceType)
	}

	ondevicecCharacteristicChange(CharacteristicChangeReq: ble.BLECharacteristic, deviceType: string): void {
		if(deviceType !== "devicec") return;
    let value = nuofan.parseData(CharacteristicChangeReq)
    if(!value) {
      return
    }
		logger.info("devicec value: " + JSON.stringify(value))
		// 发送公共事件，用commonEventManager
		emitter.emit(BlueToothEvent, {data: {deviceType, value: String(value)}})
  }

  ondeviceaCharacteristicChange(CharacteristicChangeReq: ble.BLECharacteristic, deviceType: string): void {
		if(deviceType !== "devicea") return;
    let value = ug11.parseData(CharacteristicChangeReq)
    if(!value) {
      return
    }
    if(value.code !== "04") {
      return
    }
		logger.info("devicea value: " + JSON.stringify(value))
		emitter.emit(BlueToothEvent, {data: {deviceType, value: String(value.data.result)}})
  }
}

class Bioland extends DeviceFactory {
	deviceMap: {[key: string]: string[]} = {
  	device1: [""]
	}
	serviceIdMap = Object.freeze({
  	device1: ""
	})

	characteristicIdMap = Object.freeze({
		device1: ""
	})

	writeCharacteristicIdMap = Object.freeze({
		device1: ""
	})

	constructor() {
		super()
	}

	onCharacteristicChange(deviceId: string, characteristicChangeReq: ble.BLECharacteristic): void {
		super.onCharacteristicChange(deviceId, characteristicChangeReq)
		let deviceType = this.getDeviceType(deviceId)
		if(!deviceType) return

		this.ondevice1CharacteristicChange(characteristicChangeReq, deviceType)
	}


	ondevice1CharacteristicChange(CharacteristicChangeReq: ble.BLECharacteristic, deviceType: string): void {
		console.info("ondevice1CharacteristicChange")
		if(deviceType !== "device1") return;
		console.info("onTe")
    let value = bioland.parseData(CharacteristicChangeReq)
		console.info("getValue" + value )
    if(!value) {
      return
    }
		emitter.emit(BlueToothEvent, {data: {deviceType, value: String(value)}})
		logger.info("device1 value: " + JSON.stringify(value))
  }
}