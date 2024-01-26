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

import ExifIFD0Directory from './ExifIFD0Directory';
import Directory from '../Directory';
import ExifDirectoryBase from './ExifDirectoryBase';
import ExifSubIFDDescriptor from './ExifSubIFDDescriptor';

class ExifSubIFDDirectory extends ExifDirectoryBase {
  /** This tag is a pointer to the Exif Interop IFD. */
  public static readonly TAG_INTEROP_OFFSET = 0xA005;

  constructor() {
    super()
    this.setDescriptor(new ExifSubIFDDescriptor(this));
  }

  private static readonly _tagNameMap: Map<number, string> = ExifDirectoryBase.addExifTagNames(new Map<number, string>());

  //    static
  //    {
  //        addExifTagNames(_tagNameMap);
  //    }

  public getName(): string
  {
    return "Exif SubIFD";
  }

  protected getTagNameMap(): Map<number, string>
  {
    return ExifSubIFDDirectory._tagNameMap;
  }

  /**
       * Parses the date/time tag, the subsecond tag and the time offset tag to obtain a single Date
       * object with milliseconds representing the date and time when this image was modified.  If
       * the time offset tag does not exist, attempts will be made to parse the values as though it is
       * in the GMT {@link TimeZone}.
       *
       * @return A Date object representing when this image was modified, if possible, otherwise null
       */
  //    public Date getDateModified()
  //    {
  //        return getDateModified(null);
  //    }

  /**
       * Parses the date/time tag, the subsecond tag and the time offset tag to obtain a single Date
       * object with milliseconds representing the date and time when this image was modified.  If
       * the time offset tag does not exist, attempts will be made to parse the values as though it is
       * in the {@link TimeZone} represented by the {@code timeZone} parameter (if it is non-null).
       *
       * @param timeZone the time zone to use
       * @return A Date object representing when this image was modified, if possible, otherwise null
       */
  public getDateModified(timeZone?: number): Date
  {
    if (timeZone == undefined) {
      timeZone = null
    }
    let parent: Directory = this.getParent();
    if (parent instanceof ExifIFD0Directory) {
      let timeZoneModified = this.getTimeZone(ExifDirectoryBase.TAG_TIME_ZONE);
      return parent.getDate(ExifDirectoryBase.TAG_DATETIME, this.getString(ExifDirectoryBase.TAG_SUBSECOND_TIME),
          (timeZoneModified != null) ? timeZoneModified : timeZone);
    } else {
      return null;
    }
  }

  /**
       * Parses the date/time tag, the subsecond tag and the time offset tag to obtain a single Date
       * object with milliseconds representing the date and time when this image was captured.  If
       * the time offset tag does not exist, attempts will be made to parse the values as though it is
       * in the GMT {@link TimeZone}.
       *
       * @return A Date object representing when this image was captured, if possible, otherwise null
       */
  //    @Nullable
  //    public Date getDateOriginal()
  //    {
  //        return getDateOriginal(null);
  //    }

  /**
       * Parses the date/time tag, the subsecond tag and the time offset tag to obtain a single Date
       * object with milliseconds representing the date and time when this image was captured.  If
       * the time offset tag does not exist, attempts will be made to parse the values as though it is
       * in the {@link TimeZone} represented by the {@code timeZone} parameter (if it is non-null).
       *
       * @param timeZone the time zone to use
       * @return A Date object representing when this image was captured, if possible, otherwise null
       */
  public getDateOriginal(timeZone?: number): Date
  {
    if (timeZone == undefined) {
      timeZone = null
    }
    let timeZoneOriginal = this.getTimeZone(ExifDirectoryBase.TAG_TIME_ZONE_ORIGINAL);
    return this.getDate(ExifDirectoryBase.TAG_DATETIME_ORIGINAL, this.getString(ExifDirectoryBase.TAG_SUBSECOND_TIME_ORIGINAL),
        (timeZoneOriginal != null) ? timeZoneOriginal : timeZone);
  }

  /**
       * Parses the date/time tag, the subsecond tag and the time offset tag to obtain a single Date
       * object with milliseconds representing the date and time when this image was digitized.  If
       * the time offset tag does not exist, attempts will be made to parse the values as though it is
       * in the GMT {@link TimeZone}.
       *
       * @return A Date object representing when this image was digitized, if possible, otherwise null
       */
  //    @Nullable
  //    public Date getDateDigitized()
  //    {
  //        return getDateDigitized(null);
  //    }

  /**
       * Parses the date/time tag, the subsecond tag and the time offset tag to obtain a single Date
       * object with milliseconds representing the date and time when this image was digitized.  If
       * the time offset tag does not exist, attempts will be made to parse the values as though it is
       * in the {@link TimeZone} represented by the {@code timeZone} parameter (if it is non-null).
       *
       * @param timeZone the time zone to use
       * @return A Date object representing when this image was digitized, if possible, otherwise null
       */
  public getDateDigitized(timeZone?: number): Date
  {
    if (timeZone == undefined) {
      timeZone = null
    }
    let timeZoneDigitized = this.getTimeZone(ExifDirectoryBase.TAG_TIME_ZONE_DIGITIZED);
    return this.getDate(ExifDirectoryBase.TAG_DATETIME_DIGITIZED, this.getString(ExifDirectoryBase.TAG_SUBSECOND_TIME_DIGITIZED),
        (timeZoneDigitized != null) ? timeZoneDigitized : timeZone);
  }

  private getTimeZone(tagType: number): number
  {
    let timeOffset = this.getString(tagType);
    //    if (timeOffset != null && timeOffset.matches("[\\+\\-]\\d\\d:\\d\\d")) {
    //      return TimeZone.getTimeZone("GMT" + timeOffset);
    //    } else {
    //      return null;
    //    }
    return new Date().getTimezoneOffset();
  }
}

export default ExifSubIFDDirectory
