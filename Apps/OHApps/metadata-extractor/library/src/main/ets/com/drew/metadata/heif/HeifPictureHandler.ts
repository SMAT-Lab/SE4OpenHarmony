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

import HeifHandler from '../../imaging/heif/HeifHandler';
import HeifBoxTypes from './HeifBoxTypes';
import HeifDirectory from './HeifDirectory';
import HeifItemTypes from './HeifItemTypes';
import HeifContainerTypes from './HeifContainerTypes';
import ItemProtectionBox from './boxes/ItemProtectionBox';
import PrimaryItemBox from './boxes/PrimaryItemBox';
import ItemInfoBox from './boxes/ItemInfoBox';
import ItemLocationBox from './boxes/ItemLocationBox';
import ImageSpatialExtentsProperty from './boxes/ImageSpatialExtentsProperty';
import AuxiliaryTypeProperty from './boxes/AuxiliaryTypeProperty';
import ImageRotationBox from './boxes/ImageRotationBox';
import ColourInformationBox from './boxes/ColourInformationBox';
import PixelInformationBox from './boxes/PixelInformationBox';
import Metadata from '../Metadata';
import Box from './boxes/Box';
import SequentialReader from '../../lang/SequentialReader';
import SequentialByteArrayReader from '../../lang/SequentialByteArrayReader';
import ExifReader from '../exif/ExifReader';
import RandomAccessStreamReader from '../../lang/RandomAccessStreamReader';

class HeifPictureHandler extends HeifHandler {
  private static readonly boxesCanProcess: Set<string> = new Set<string>()
    .add(HeifBoxTypes.BOX_ITEM_PROTECTION)
    .add(HeifBoxTypes.BOX_PRIMARY_ITEM)
    .add(HeifBoxTypes.BOX_ITEM_INFO)
    .add(HeifBoxTypes.BOX_ITEM_LOCATION)
    .add(HeifBoxTypes.BOX_IMAGE_SPATIAL_EXTENTS)
    .add(HeifBoxTypes.BOX_AUXILIARY_TYPE_PROPERTY)
    .add(HeifBoxTypes.BOX_IMAGE_ROTATION)
    .add(HeifBoxTypes.BOX_COLOUR_INFO)
    .add(HeifBoxTypes.BOX_PIXEL_INFORMATION);
  private static readonly itemsCanProcess: Set<string> = new Set<string>()
    .add(HeifItemTypes.ITEM_EXIF);
  private static readonly containersCanProcess: Set<string> = new Set<string>()
    .add(HeifContainerTypes.BOX_IMAGE_PROPERTY)
    .add(HeifContainerTypes.BOX_ITEM_PROPERTY)
    .add(HeifContainerTypes.BOX_MEDIA_DATA);
  public itemProtectionBox: ItemProtectionBox;
  public primaryItemBox: PrimaryItemBox;
  public itemInfoBox: ItemInfoBox;
  public itemLocationBox: ItemLocationBox;

  public constructor(metadata: Metadata) {
    super(metadata);
  }

  public shouldAcceptBox(box: Box): boolean {
    return HeifPictureHandler.boxesCanProcess.has(box.type);
  }

  public shouldAcceptContainer(box: Box): boolean {
    return HeifPictureHandler.containersCanProcess.has(box.type);
  }

  public processBox(box: Box, payload: Int8Array): HeifHandler{
    let reader: SequentialReader = new SequentialByteArrayReader(payload);
    if (box.type == HeifBoxTypes.BOX_ITEM_PROTECTION) {
      this.itemProtectionBox = new ItemProtectionBox(reader, box);
    } else if (box.type == HeifBoxTypes.BOX_PRIMARY_ITEM) {
      this.primaryItemBox = new PrimaryItemBox(reader, box);
    } else if (box.type == HeifBoxTypes.BOX_ITEM_INFO) {
      this.itemInfoBox = new ItemInfoBox(reader, box);
      this.itemInfoBox.addMetadata(this.directory);
    } else if (box.type == HeifBoxTypes.BOX_ITEM_LOCATION) {
      this.itemLocationBox = new ItemLocationBox(reader, box);
    } else if (box.type == HeifBoxTypes.BOX_IMAGE_SPATIAL_EXTENTS) {
      let imageSpatialExtentsProperty: ImageSpatialExtentsProperty = new ImageSpatialExtentsProperty(reader, box);
      imageSpatialExtentsProperty.addMetadata(this.directory);
    } else if (box.type == HeifBoxTypes.BOX_AUXILIARY_TYPE_PROPERTY) {
      let auxiliaryTypeProperty: AuxiliaryTypeProperty = new AuxiliaryTypeProperty(reader, box);
    } else if (box.type == HeifBoxTypes.BOX_IMAGE_ROTATION) {
      let imageRotationBox: ImageRotationBox = new ImageRotationBox(reader, box);
      imageRotationBox.addMetadata(this.directory);
    } else if (box.type == HeifBoxTypes.BOX_COLOUR_INFO) {
      let colourInformationBox: ColourInformationBox = new ColourInformationBox(reader, box, this.metadata);
      colourInformationBox.addMetadata(this.directory);
    } else if (box.type == HeifBoxTypes.BOX_PIXEL_INFORMATION) {
      let pixelInformationBox: PixelInformationBox = new PixelInformationBox(reader, box);
      pixelInformationBox.addMetadata(this.directory);
    }
    return this;
  }

  public processContainer(box: Box, reader: SequentialReader): void {
    if (box.type == HeifContainerTypes.BOX_MEDIA_DATA && this.itemInfoBox != null && this.itemLocationBox != null) {
      // We've reached the media data box, this contains all the items referred to by the info/location boxes
      // Extents should already be sorted, this way we know we can traverse the one direction stream correctly
      for (let extent of this.itemLocationBox.getExtents()) {
        let infoEntry = this.itemInfoBox.getEntry(extent.getItemId());
        let bytesToSkip: number = extent.getOffset() - reader.getPosition();
        if (bytesToSkip > 0) {
          reader.skip(bytesToSkip);
        }
        if (this.shouldHandleItem(infoEntry)) {
          this.handleItem(infoEntry, new SequentialByteArrayReader(reader.getBytes(extent.getLength())));
        }
      }
    }
  }

  private shouldHandleItem(infoEntry: InstanceType<typeof ItemInfoBox.ItemInfoEntry>): boolean {
    return HeifPictureHandler.itemsCanProcess.has(infoEntry.getItemType());
  }

  private handleItem(entry: InstanceType<typeof ItemInfoBox.ItemInfoEntry>, payloadReader: SequentialByteArrayReader): void {
    if (entry.getItemType() == HeifItemTypes.ITEM_EXIF) {
      // ISO/IEC 23008-12:2017 Annex A: First 4 bytes will ALWAYS be an offset to the Tiff header in the payload
      let tiffHeaderOffset: number = payloadReader.getUInt32();
      if (tiffHeaderOffset > payloadReader.available()) {
        // This Exif item is not laid out according to spec
        return;
      }
      payloadReader.skip(tiffHeaderOffset);
      let tiffStream = payloadReader.getBytes(payloadReader.available()).toString();
      new ExifReader().extract(new RandomAccessStreamReader(tiffStream), this.metadata);
    }
  }

  public getDirectory(): HeifDirectory {
    return new HeifDirectory();
  }
}

export default HeifPictureHandler;