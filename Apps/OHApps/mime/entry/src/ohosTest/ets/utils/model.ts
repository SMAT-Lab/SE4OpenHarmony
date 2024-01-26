export const MDN = {
  aac: 'audio/x-aac',
  abw: 'application/x-abiword',
  arc: 'application/x-freearc',
  avi: 'video/x-msvideo',
  azw: 'application/vnd.amazon.ebook',
  bin: 'application/octet-stream',
  bmp: 'image/bmp',
  bz: 'application/x-bzip',
  bz2: 'application/x-bzip2',
  csh: 'application/x-csh',
  css: 'text/css',
  csv: 'text/csv',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  eot: 'application/vnd.ms-fontobject',
  epub: 'application/epub+zip',
  gz: 'application/gzip',
  gif: 'image/gif',
  htm: 'text/html',
  html: 'text/html',
  ico: 'image/vnd.microsoft.icon',
  ics: 'text/calendar',
  jar: 'application/java-archive',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  jsonld: 'application/ld+json',
  mid: 'audio/midi',
  midi: 'audio/midi',
  mjs: 'text/javascript',
  mp3: 'audio/mpeg',
  mpeg: 'video/mpeg',
  mpkg: 'application/vnd.apple.installer+xml',
  odp: 'application/vnd.oasis.opendocument.presentation',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  odt: 'application/vnd.oasis.opendocument.text',
  oga: 'audio/ogg',
  ogv: 'video/ogg',
  ogx: 'application/ogg',
  otf: 'font/otf',
  png: 'image/png',
  pdf: 'application/pdf',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  rar: 'application/vnd.rar',
  rtf: 'application/rtf',
  sh: 'application/x-sh',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tar: 'application/x-tar',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  ts: 'video/mp2t',
  ttf: 'font/ttf',
  txt: 'text/plain',
  vsd: 'application/vnd.visio',
  wav: 'audio/wav',
  weba: 'audio/webm',
  webm: 'video/webm',
  webp: 'image/webp',
  woff: 'font/woff',
  woff2: 'font/woff2',
  xhtml: 'application/xhtml+xml',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xml: 'application/xml',
  xul: 'application/vnd.mozilla.xul+xml',
  zip: 'application/zip',
  '3gp': 'video/3gpp',
  '3g2': 'video/3gpp2',
  '7z': 'application/x-7z-compressed',
}
export const getTypeData = [

  {
    input: 'text.txt', expected: 'text/plain'
  },
  {
    input: 'TEXT.TXT', expected: 'text/plain'
  },

  {
    input: 'txt', expected: 'text/plain'
  },
  {
    input: '.txt', expected: 'text/plain'
  },
  {
    input: '.bogus', expected: null
  },
  {
    input: 'bogus', expected: null
  },

  {
    input: 'dir/text.txt', expected: 'text/plain'
  },
  {
    input: 'dir\\text.txt', expected: 'text/plain'
  },
  {
    input: '.text.txt', expected: 'text/plain'
  },
  {
    input: '.txt', expected: 'text/plain'
  },
  {
    input: 'txt', expected: 'text/plain'
  },
  {
    input: '/path/to/page.html', expected: 'text/html'
  },
  {
    input: 'c:\\path\\to\\page.html', expected: 'text/html'
  },
  {
    input: 'page.html', expected: 'text/html'
  },
  {
    input: 'path/to/page.html', expected: 'text/html'
  },
  {
    input: 'path\\to\\page.html', expected: 'text/html'
  },
  {
    input: '/txt', expected: null
  },
  {
    input: '\\txt', expected: null
  },
  {
    input: 'text.nope', expected: null
  },
  {
    input: '/path/to/file.bogus', expected: null
  },
  {
    input: '/path/to/json', expected: null
  },
  {
    input: '/path/to/.json', expected: null
  },
  {
    input: '/path/to/.config.json', expected: 'application/json'
  },
  {
    input: '.config.json', expected: 'application/json'
  },

  {
    input: null, expected: null
  },
  {
    input: undefined, expected: null
  },
  {
    input: 42, expected: null
  },
  {
    input: "{}", expected: null
  },
]
export const getExtensionData = [
  {
    input: 'text/html', expected: 'html'
  },
  {
    input: ' text/html', expected: 'html'
  },
  {
    input: 'text/html ', expected: 'html'
  },

  {
    input: 'application/x-bogus', expected: null
  },
  {
    input: 'bogus', expected: null
  },
  {
    input: null, expected: null
  },
  {
    input: undefined, expected: null
  },
  {
    input: 42, expected: null
  },
  {
    input: "{}", expected: null
  },
]

export const result1 = {
  a: 'text/a',
  a1: 'text/a',
  b: 'text/b',
  b1: 'text/b',
}

export const result2 = {
  'text/a': 'a',
  'text/b': 'b',
}

export const result3 = {
  a: 'text/a',
  b: 'text/b',
}

export  const result4  = {
  'text/a': 'a',
  'text/b': 'b',
  'text/c': 'b',
}

export  const result5 = {
  b: 'text/b',
}
export   const result6 = {
  'text/a': 'b',
  'text/b': 'b',
}