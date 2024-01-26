/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import Metadata from '../Metadata';
import Mp3Directory from './Mp3Directory';
import SequentialReader from '../../lang/SequentialReader';
class Mp3Reader {
    public extract(reader: SequentialReader, metadata: Metadata): void {
        let directory: Mp3Directory = new Mp3Directory();
        metadata.addDirectory(directory);
        try {
            let header: number = reader.getInt32();
            // ID: MPEG-2.5, MPEG-2, or MPEG-1
            let id: number = 0;
            switch ((header & 0x000180000) >> 19) {
                case 0:
                    throw new Error("MPEG-2.5 not supported.");
                case 2:
                    directory.setString(Mp3Directory.TAG_ID, "MPEG-2");
                    id = 2;
                    break;
                case 3:
                    directory.setString(Mp3Directory.TAG_ID, "MPEG-1");
                    id = 1;
                    break;
            }
            // Layer Type: 1, 2, 3, or not defined
            let layer: number = ((header & 0x00060000) >> 17);
            switch (layer) {
                case 0:
                    directory.setString(Mp3Directory.TAG_LAYER, "Not defined");
                    break;
                case 1:
                    directory.setString(Mp3Directory.TAG_LAYER, "Layer III");
                    break;
                case 2:
                    directory.setString(Mp3Directory.TAG_LAYER, "Layer II");
                    break;
                case 3:
                    directory.setString(Mp3Directory.TAG_LAYER, "Layer I");
                    break;
            }
            let protectionBit: number = ((header & 0x00010000) >> 16);
            // Bitrate: depends on ID and Layer
            let bitrate: number = ((header & 0x0000F000) >> 12);
            if (bitrate != 0 && bitrate != 15) {
                directory.setInt(Mp3Directory.TAG_BITRATE, Mp3Reader.setBitrate(bitrate, layer, id));
            }
            // Frequency: depends on ID
            let frequency: number = ((header & 0x00000C00) >> 10);
            let frequencyMapping: number[][] = [[2], [3]];
            frequencyMapping[0] = [44100, 48000, 32000];
            frequencyMapping[1] = [22050, 24000, 16000];
            if (id == 2) {
                directory.setInt(Mp3Directory.TAG_FREQUENCY, frequencyMapping[1][frequency]);
                frequency = frequencyMapping[1][frequency];
            }
            else if (id == 1) {
                directory.setInt(Mp3Directory.TAG_FREQUENCY, frequencyMapping[0][frequency]);
                frequency = frequencyMapping[0][frequency];
            }
            let paddingBit: number = ((header & 0x00000200) >> 9);
            // Encoding type: Stereo, Joint Stereo, Dual Channel, or Mono
            let mode: number = ((header & 0x000000C0) >> 6);
            switch (mode) {
                case 0:
                    directory.setString(Mp3Directory.TAG_MODE, "Stereo");
                    break;
                case 1:
                    directory.setString(Mp3Directory.TAG_MODE, "Joint stereo");
                    break;
                case 2:
                    directory.setString(Mp3Directory.TAG_MODE, "Dual channel");
                    break;
                case 3:
                    directory.setString(Mp3Directory.TAG_MODE, "Mono");
                    break;
            }
            // Copyright boolean
            let copyright: number = ((header & 0x00000008) >> 3);
            switch (copyright) {
                case 0:
                    directory.setString(Mp3Directory.TAG_COPYRIGHT, "False");
                    break;
                case 1:
                    directory.setString(Mp3Directory.TAG_COPYRIGHT, "True");
                    break;
            }
            let emphasis: number = (header & 0x00000003);
            switch (emphasis) {
                case 0:
                    directory.setString(Mp3Directory.TAG_EMPHASIS, "none");
                    break;
                case 1:
                    directory.setString(Mp3Directory.TAG_EMPHASIS, "50/15ms");
                    break;
                case 3:
                    directory.setString(Mp3Directory.TAG_EMPHASIS, "CCITT j.17");
                    break;
            }
            if (bitrate != 0 && bitrate != 15) {
                let frameSize: number = ((Mp3Reader.setBitrate(bitrate, layer, id) * 1000) * 144) / frequency;
                directory.setString(Mp3Directory.TAG_FRAME_SIZE, frameSize + " bytes");
            }
        }
        catch (error) {
            directory.addError(error);
        }
    }
    private static setBitrate(bitrate: number, layer: number, id: number): number {
        let bitrateMapping: number[][] = [[14], [6]];
        bitrateMapping[0] = [32, 32, 32, 32, 32, 8];
        bitrateMapping[1] = [64, 48, 40, 64, 48, 16];
        bitrateMapping[2] = [96, 56, 48, 96, 56, 24];
        bitrateMapping[3] = [128, 64, 56, 128, 64, 32];
        bitrateMapping[4] = [160, 80, 64, 160, 80, 64];
        bitrateMapping[5] = [192, 96, 80, 192, 96, 80];
        bitrateMapping[6] = [224, 112, 96, 224, 112, 56];
        bitrateMapping[7] = [256, 128, 112, 256, 128, 64];
        bitrateMapping[8] = [288, 160, 128, 28, 160, 128];
        bitrateMapping[9] = [320, 192, 160, 320, 192, 160];
        bitrateMapping[10] = [352, 224, 192, 352, 224, 112];
        bitrateMapping[11] = [384, 256, 224, 384, 256, 128];
        bitrateMapping[12] = [416, 320, 256, 416, 320, 256];
        bitrateMapping[13] = [448, 384, 320, 448, 384, 320];
        let xPos: number = 0;
        let yPos: number = bitrate - 1;
        if (id == 2) {
            // MPEG-2
            switch (layer) {
                case 1:
                    xPos = 5;
                    break;
                case 2:
                    xPos = 4;
                    break;
                case 3:
                    xPos = 3;
                    break;
            }
        }
        else if (id == 1) {
            // MPEG-1
            switch (layer) {
                case 1:
                    xPos = 2;
                    break;
                case 2:
                    xPos = 1;
                    break;
                case 3:
                    xPos = 0;
                    break;
            }
        }
        return bitrateMapping[yPos][xPos];
    }
    private static getSyncSafeSize(decode: number): number {
        let a: number = decode & 0xFF;
        let b: number = (decode >> 8) & 0xFF;
        let c: number = (decode >> 16) & 0xFF;
        let d: number = (decode >> 24) & 0xFF;
        let decoded: number = 0x0;
        decoded = decoded | a;
        decoded = decoded | (b << 7);
        decoded = decoded | (c << 14);
        decoded = decoded | (d << 21);
        return decoded;
    }
}
export default Mp3Reader;
