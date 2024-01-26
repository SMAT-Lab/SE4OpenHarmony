import buffer from '@ohos.buffer';
export interface dictionaryType1 { dictionary: string | Uint8Array | ArrayBufferLike | buffer.Buffer  }

export interface dictionaryType2 {
  raw: boolean,
  dictionary?: string | Uint8Array | ArrayBufferLike
}

export interface dictionaryType3 {
  level: number,
  raw: boolean,
}

export interface dictionaryType4 {
  strategy: number,
}
export interface dictionaryType5 {
  windowBits: number,
}
export interface dictionaryType6 {
  level: number
}
export interface dictionaryType7 {
  gzip:boolean,
}
export interface dictionaryType8 {
  bits:number,
}
export interface dictionaryType9 {
  to:string,
}
export interface dictionaryType10 {
  gzip: boolean,
  header: {
    hcrc: boolean,
    time: number,
    os: number,
    name: string,
    comment: string,
    extra: Array<number>
  }
}
export interface dictionaryType11 {
  memLevel: number
}
export interface dictionaryType12 {
  level: number,
  chunkSize: number,
}
export interface dictionaryType13 {
  level: number,
  memLevel: number,
  chunkSize: number,
}
export interface dictionaryType14 {
  strategy: number,
  chunkSize: number,
}
export interface dictionaryType15 {
  ignore_os:boolean
}
let onTypeOf1 = (rawType: string | Uint8Array | ArrayBufferLike | buffer.Buffer): dictionaryType1 => {
  let dictionaryData: dictionaryType1 = {
    dictionary: rawType
  }
  return dictionaryData
}
let onTypeOf2 = (isRawType: boolean, dictionary: Uint8Array): dictionaryType2 => {
  let dictionaryData: dictionaryType2 = {
    raw: isRawType,
    dictionary: dictionary
  }
  return dictionaryData
}
let onTypeOf3 = (rawType: boolean): dictionaryType2 => {
  let dictionaryData: dictionaryType2 = {
    raw: rawType
  }
  return dictionaryData
}
let onTypeOf4 = (levelType: number, rawType: boolean): dictionaryType2 => {
  let dictionaryData: dictionaryType3 = {
    level: levelType,
    raw: rawType
  }
  return dictionaryData
}
let onTypeOf5 = (strategyType: number): dictionaryType4 => {
  let dictionaryData: dictionaryType4 = {
    strategy: strategyType,
  }
  return dictionaryData
}
let onTypeOf6 = (windowBitsType: number): dictionaryType5 => {
  let dictionaryData: dictionaryType5 = {
    windowBits: windowBitsType,
  }
  return dictionaryData
}
let onTypeOf7 = (levelType: number): dictionaryType6 => {
  let dictionaryData: dictionaryType6 = {
    level: levelType,
  }
  return dictionaryData
}
let onTypeOf8 = (gzipType: boolean): dictionaryType7 => {
  let dictionaryData: dictionaryType7 = {
    gzip: gzipType
  }
  return dictionaryData
}
let onTypeOf9 = (bitsType: number): dictionaryType8 => {
  let dictionaryData: dictionaryType8 = {
    bits: bitsType
  }
  return dictionaryData
}
let onTypeOf10 = (toType: string): dictionaryType9 => {
  let dictionaryData: dictionaryType9 = {
    to: toType
  }
  return dictionaryData
}
let onTypeOf11 = (gzipType: boolean, hcrcType: boolean, timeType: number, osType: number, nameType: string, commentType: string, extraType: Array<number>): dictionaryType10 => {
  let dictionaryData: dictionaryType10 = {
    gzip: gzipType,
    header: {
      hcrc: hcrcType,
      time: timeType,
      os: osType,
      name: nameType,
      comment: commentType,
      extra: extraType
    }
  }
  return dictionaryData
}
let onTypeOf12 = (memLevelType: number): dictionaryType11 => {
  let dictionaryData: dictionaryType11 = {
    memLevel: memLevelType,
  }
  return dictionaryData
}
let onTypeOf13 = (levelType: number, chunkSizeType: number): dictionaryType12 => {
  let dictionaryData: dictionaryType12 = {
    level: levelType,
    chunkSize: chunkSizeType
  }
  return dictionaryData
}
let onTypeOf14 = (levelType: number, memLevelType: number,chunkSizeType: number): dictionaryType13 => {
  let dictionaryData: dictionaryType13 = {
    level: levelType,
    memLevel: memLevelType,
    chunkSize: chunkSizeType
  }
  return dictionaryData
}
let onTypeOf15 = (strategyType: number, chunkSizeType: number): dictionaryType14 => {
  let dictionaryData: dictionaryType14 = {
    strategy: strategyType,
    chunkSize: chunkSizeType
  }
  return dictionaryData
}
let onTypeOf16 = (ignore_osType: boolean): dictionaryType15 => {
  let dictionaryData: dictionaryType15 = {
    ignore_os:ignore_osType
  }
  return dictionaryData
}
export {
  onTypeOf1,
  onTypeOf2,
  onTypeOf3,
  onTypeOf4,
  onTypeOf5,
  onTypeOf6,
  onTypeOf7,
  onTypeOf8,
  onTypeOf9,
  onTypeOf10,
  onTypeOf11,
  onTypeOf12,
  onTypeOf13,
  onTypeOf14,
  onTypeOf15,
  onTypeOf16
}