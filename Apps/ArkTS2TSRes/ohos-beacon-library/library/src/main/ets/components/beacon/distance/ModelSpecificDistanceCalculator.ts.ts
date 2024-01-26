/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import DeviceModelList from './DeviceModelList';
import DeviceAttribute from './DeviceAttritube';
import CurveFittedDistanceCalculator from './CurveFittedDistanceCalculator';
import DeviceModel from './DeviceModel';
import DistanceCalculator from './DistanceCalculator';
class ModelSpecificDistanceCalculator implements DistanceCalculator {
    mModelMap: Map<DeviceModel, DistanceCalculator> = new Map();
    private static readonly CONFIG_FILE: string = "/rawfile/model-distance-calculations.json";
    private static readonly TAG: string = "ModelSpecificDistanceCalculator";
    private mDefaultModel: DeviceModel;
    private mDistanceCalculator: DistanceCalculator;
    private mModel: DeviceModel;
    private mRequestedModel: DeviceModel;
    private mRemoteUpdateUrlString: string = null;
    private path: string;
    public constructor(remoteUpdateUrlString: string, model?: DeviceModel) {
        if (model == null) {
            model = DeviceModel.forThisDevice();
        }
        this.mRequestedModel = model;
        this.mRemoteUpdateUrlString = remoteUpdateUrlString;
        this.loadModelMap();
        this.mDistanceCalculator = this.findCalculatorForModel(model);
    }
    public getModel(): DeviceModel {
        return this.mModel;
    }
    public getRequestedModel(): DeviceModel {
        return this.mRequestedModel;
    }
    public calculateDistance(txPower: number, rssi: number): number {
        if (this.mDistanceCalculator == null) {
            return -1.0;
        }
        return this.mDistanceCalculator.calculateDistance(txPower, rssi);
    }
    private findCalculatorForModel(model: DeviceModel): DistanceCalculator {
        console.log(ModelSpecificDistanceCalculator.TAG, "Finding best distance calculator for %s, %s, %s", model.getVersion(), model.getBuildNumber(), model.getManufacturer());
        if (this.mModelMap == null) {
            console.log(ModelSpecificDistanceCalculator.TAG, "Cannot get distance calculator because modelMap was never initialized");
            return null;
        }
        let highestScore: number = 0;
        let bestMatchingModel: DeviceModel = null;
        for (let candidateModel of this.mModelMap.keys()) {
            if (candidateModel.matchScore(model) > highestScore) {
                highestScore = candidateModel.matchScore(model);
                bestMatchingModel = candidateModel;
            }
        }
        if (bestMatchingModel != null) {
            console.log(ModelSpecificDistanceCalculator.TAG, "found a match with score %s", highestScore);
            console.log(ModelSpecificDistanceCalculator.TAG, "Finding best distance calculator for %s, %s, %s", bestMatchingModel.getVersion(), bestMatchingModel.getBuildNumber(), bestMatchingModel.getManufacturer());
            this.mModel = bestMatchingModel;
        }
        else {
            this.mModel = this.mDefaultModel;
            console.warn(ModelSpecificDistanceCalculator.TAG, "Cannot find match for this device.  Using default");
        }
        return this.mModelMap.get(this.mModel);
    }
    private loadModelMap(): void {
        if (this.mRemoteUpdateUrlString != null) {
            this.requestModelMapFromWeb();
        }
        this.mDistanceCalculator = this.findCalculatorForModel(this.mRequestedModel);
    }
    private requestModelMapFromWeb(): void {
        this.buildModelMap();
        this.mDistanceCalculator = this.findCalculatorForModel(this.mRequestedModel);
    }
    private buildModelMap(): void {
        var map: Map<DeviceModel, DistanceCalculator> = new Map<DeviceModel, DistanceCalculator>();
        let models: Array<DeviceAttribute> = DeviceModelList.getAllModels();
        for (let model of models.values()) {
            let defaultFlag: boolean = false;
            if (model.getDefaultModel() != null) {
                defaultFlag = model.getDefaultModel();
            }
            let coefficient1: number = model.getCoefficient1();
            let coefficient2: number = model.getCoefficient2();
            let coefficient3: number = model.getCoefficient3();
            let version: string = model.getVersion();
            let buildNumber: string = model.getBuildNumber();
            let manufacturer: string = model.getManufacturer();
            let distanceCalculator: CurveFittedDistanceCalculator = new CurveFittedDistanceCalculator(coefficient1, coefficient2, coefficient3);
            let deviceModel: DeviceModel = new DeviceModel(version, buildNumber, manufacturer);
            map.set(deviceModel, distanceCalculator);
            if (defaultFlag) {
                this.mDefaultModel = deviceModel;
            }
        }
        this.mModelMap = map;
    }
}
export default ModelSpecificDistanceCalculator;
