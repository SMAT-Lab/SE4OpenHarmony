import ble from '@ohos.bluetooth.ble';
import access from '@ohos.bluetooth.access';
import { BusinessError } from '@ohos.base';
import Logger from './Logger';

let logger = new Logger()

class Bluetooth {

	private onMethods = new Map<String, Function>([
		["stateChange", this.onStateChange],
		["BLEDeviceFind", this.onBLEDeviceFind], //监听蓝牙设备发现
		["BLEConnectionStateChange", this.onBLEConnectionStateChange],
		["BLECharacteristicChange", this.onBLECharacteristicChange]
	])

	private offMethods = new Map<String, Function>([
		["stateChange", this.offStateChange],
		["BLEDeviceFind", this.offBLEDeviceFind],
		["BLEConnectionStateChange", this.offBLEConnectionStateChange],
		["BLECharacteristicChange", this.offBLECharacteristicChange]
	])

	constructor() {
	}

	get state() {
		return access.getState()
	}

	open() {
		try {
			access.enableBluetooth()
		} catch (err) {
			logger.error(err)
		}
	}

	close() {
		try {
			access.disableBluetooth()
		} catch (err) {
			logger.error(err)
		}
	}

	/**
	 * @description 开始蓝牙扫描
	 * @param {(Array<bluetoothManager.ScanFilter> | null)} [filters=null] 
	 * @param {bluetoothManager.ScanOptions} [options={dutyMode: bluetoothManager.ScanDuty.SCAN_MODE_LOW_POWER}]
	 * @memberof Bluetooth
	 */
	startBLEScan(filters: Array<ble.ScanFilter> | null = null, options: ble.ScanOptions = {interval: 500, dutyMode: ble.ScanDuty.SCAN_MODE_LOW_POWER, matchMode: ble.MatchMode.MATCH_MODE_AGGRESSIVE}) {
		try {
			ble.startBLEScan(filters, options)
		} catch (err) {
			this.startBLEScan(filters,options)
			logger.error(err)
		}
	}

	/**
	 * @description 停止蓝牙扫描
	 * @memberof Bluetooth
	 */
	stopBLEScan() {
		try {
			ble.stopBLEScan()
		} catch (error) {
			logger.error(error)
		}
	}

	/**
	 * @description 监听蓝牙事件
	 * @param {string} name 
	 * @param {any[]} args
	 * @memberof Bluetooth
	 */
	on(name: "stateChange", callback: Function, context: any)
	on(name: "BLEDeviceFind", callback: Function, context: any)
	on(name: "BLEConnectionStateChange", device: ble.GattClientDevice, callback: Function, context: any)
	on(name: "BLECharacteristicChange", device: ble.GattClientDevice, callback: Function, context: any)
	on(name: string, ...args) {
		const fn = this.onMethods.get(name)
		fn && fn(...args)
	}

	/**
	 * @description 停止蓝牙监听
	 * @param {string} name
	 * @param {Function} callback
	 * @param {*} context
	 * @memberof Bluetooth
	 */
	off(name: string, ...args) {
		const fn = this.offMethods.get(name)
		fn && fn(...args)
	}

	private onStateChange(callback, context) {
		try {
			access.on("stateChange", callback.bind(context))
		} catch (err) {
			logger.info(err)
		}
	}
	private offStateChange() {
		try {
			access.off("stateChange")
		} catch (err) {
			logger.info(err)
		}
	}

	/**
	 * @description 监听蓝牙设备发现
	 * @private
	 * @param {*} callback
	 * @param {*} context
	 * @memberof Bluetooth
	 */
	private onBLEDeviceFind(callback: Function, context: any) {
		try {
			ble.on("BLEDeviceFind", callback.bind(context))
		} catch (error) {
			logger.error(error)
		}
	}

	/**
	 * @description 停止蓝牙设备发现
	 * @private
	 * @param {*} callback
	 * @param {*} context
	 * @memberof Bluetooth
	 */
	private offBLEDeviceFind(callback?: Function, context?: any) {
		try {
			ble.off("BLEDeviceFind", callback ? callback.bind(context) : undefined)
		} catch (error) {
			logger.error(error)
		}
	}

	/**
	 * @description 创建BLE Client
	 * @param {*} deviceId 连接端蓝牙id
	 * @return {*} 
	 * @memberof Bluetooth
	 */
	createGattClientDevice(deviceId): ble.GattClientDevice {
		try {
			return ble.createGattClientDevice(deviceId)
		} catch (error) {
			logger.error(error)
		}
	}

	/**
	 * 设置特定设备的特征值变化通知。
	 *
	 * @param {bluetoothManager.GattClientDevice} device - 要设置通知的设备。
	 * @param {bluetoothManager.BLECharacteristic} characteristic - 要设置通知的特征值。
	 * @param {boolean} enable=true - 是否启用通知。默认为true。
	 */
	setNotifyCharacteristicChanged(device: ble.GattClientDevice, characteristic: ble.BLECharacteristic, enable = false) {
		try {
			device.setCharacteristicChangeNotification(characteristic, enable)
			return true
		} catch(error) {
			console.info(' setCharacteristicChangeNotification erro')
			return false
			logger.error(error)
		}
	}

	/**
	 * 写入给定设备的特征值。
	 *
	 * @param {bluetoothManager.GattClientDevice} device - 要写入的蓝牙设备。
	 * @param {bluetoothManager.BLECharacteristic} characteristic - 要写入值的特征值。
	 */
	writeCharacteristicValue(device: ble.GattClientDevice, characteristic: ble.BLECharacteristic) {
		try {
			device.writeCharacteristicValue(characteristic, ble.GattWriteType.WRITE_NO_RESPONSE)
		} catch (error) {
			logger.error(error)
		}
	}

	/**
	 * 连接设备到蓝牙设备。
	 *
	 * @param {bluetoothManager.GattClientDevice} device - 要连接的设备。
	 */
	deviceConnect(device: ble.GattClientDevice) {
		try {
			device.connect()
		} catch (error) {
			console.info(" 连接错")
			logger.error(error)
		}
	}

	/**
	 * 返回一个Promise，该Promise会以给定设备的服务为参数解析。
	 *
	 * @param {type} device - 获取服务的设备
	 * @return {Promise} 一个解析为服务的Promise
	 */
	getService(device) {
		return new Promise((resolve, reject) => {
			device.getServices().then(result => {
        logger.info("getServices successfully:" + JSON.stringify(result));
				resolve(result)
			}).catch(err => {
				logger.error(err)
				reject(err)
			});
		})
	}

	/**
	 * A function that handles the change in BLE connection state.
	 *
	 * @param {bluetoothManager.GattClientDevice} device - The BLE device.
	 * @param {Function} callback - The callback function to be called when the BLE connection state changes.
	 * @param {any} context - The context in which the callback function should be called.
	 */
	private onBLEConnectionStateChange(device: ble.GattClientDevice, callback: Function, context: any) {
		try {
			device.on("BLEConnectionStateChange", callback.bind(context))
		} catch (error) {
			logger.error(error)
		}
	}

	/**
	 * A function to handle the change in BLE connection state.
	 *
	 * @param {bluetoothManager.GattClientDevice} device - The BLE device object.
	 * @param {Function} callback - Optional callback function to be executed on connection state change.
	 * @param {any} context - Optional context for the callback function.
	 */
	private offBLEConnectionStateChange(device: ble.GattClientDevice, callback?: Function, context?: any) {
		try {
			device.off("BLEConnectionStateChange", callback ? callback.bind(context) : undefined)
		} catch (error) {
			logger.error(error)
		}
	}

	/**
	 * A function to handle changes in the BLE characteristic of a device.
	 *
	 * @param {bluetoothManager.GattClientDevice} device - The Bluetooth device.
	 * @param {Function} callback - The callback function to be executed.
	 * @param {any} context - The context in which the callback function will be executed.
	 */
	private onBLECharacteristicChange(device: ble.GattClientDevice, callback: Function, context: any) {
		try {
			device.on("BLECharacteristicChange", callback.bind(context))
		} catch (error) {
			logger.error(error)
		}
	}

	/**
	 * Unregisters a callback function from the "BLECharacteristicChange" event of a Bluetooth device.
	 *
	 * @param {bluetoothManager.GattClientDevice} device - The Bluetooth device to unregister the callback from.
	 * @param {Function} [callback] - The callback function to unregister. If not provided, all callback functions for the event will be unregistered.
	 * @param {any} [context] - The context to bind the callback function to.
	 */
	private offBLECharacteristicChange(device: ble.GattClientDevice, callback?: Function, context?: any) {
		try {
			device.off("BLECharacteristicChange", callback ? callback.bind(context) : undefined)
		} catch (error) {
			logger.error(error)
		}
	}


	
}

export default Bluetooth