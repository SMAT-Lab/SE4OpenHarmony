function cov_2dk4dgtg9n() {
  var path = "D:\\devProject\\OhSample\\applications_app_samples\\code\\Project\\Test\\jsunit\\entry\\.test\\default\\intermediates\\source\\entry\\src\\main\\ets\\util\\Logger.js";
  var hash = "6b3fc45ff65fe38a3681b94d4aac6581a7b2f8a0";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "D:\\devProject\\OhSample\\applications_app_samples\\code\\Project\\Test\\jsunit\\entry\\.test\\default\\intermediates\\source\\entry\\src\\main\\ets\\util\\Logger.js",
    statementMap: {
      "0": {
        start: {
          line: 16,
          column: 12
        },
        end: {
          line: 16,
          column: 27
        }
      },
      "1": {
        start: {
          line: 19,
          column: 8
        },
        end: {
          line: 19,
          column: 47
        }
      },
      "2": {
        start: {
          line: 20,
          column: 8
        },
        end: {
          line: 20,
          column: 29
        }
      },
      "3": {
        start: {
          line: 21,
          column: 8
        },
        end: {
          line: 21,
          column: 29
        }
      },
      "4": {
        start: {
          line: 24,
          column: 8
        },
        end: {
          line: 24,
          column: 65
        }
      },
      "5": {
        start: {
          line: 27,
          column: 8
        },
        end: {
          line: 27,
          column: 64
        }
      },
      "6": {
        start: {
          line: 30,
          column: 8
        },
        end: {
          line: 30,
          column: 64
        }
      },
      "7": {
        start: {
          line: 33,
          column: 8
        },
        end: {
          line: 33,
          column: 65
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 18,
            column: 4
          },
          end: {
            line: 18,
            column: 5
          }
        },
        loc: {
          start: {
            line: 18,
            column: 24
          },
          end: {
            line: 22,
            column: 5
          }
        },
        line: 18
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 23,
            column: 4
          },
          end: {
            line: 23,
            column: 5
          }
        },
        loc: {
          start: {
            line: 23,
            column: 19
          },
          end: {
            line: 25,
            column: 5
          }
        },
        line: 23
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 26,
            column: 4
          },
          end: {
            line: 26,
            column: 5
          }
        },
        loc: {
          start: {
            line: 26,
            column: 18
          },
          end: {
            line: 28,
            column: 5
          }
        },
        line: 26
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 29,
            column: 4
          },
          end: {
            line: 29,
            column: 5
          }
        },
        loc: {
          start: {
            line: 29,
            column: 18
          },
          end: {
            line: 31,
            column: 5
          }
        },
        line: 29
      },
      "4": {
        name: "(anonymous_4)",
        decl: {
          start: {
            line: 32,
            column: 4
          },
          end: {
            line: 32,
            column: 5
          }
        },
        loc: {
          start: {
            line: 32,
            column: 19
          },
          end: {
            line: 34,
            column: 5
          }
        },
        line: 32
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    },
    b: {},
    inputSourceMap: {
      version: 3,
      file: null,
      sources: ["D:\\devProject\\OhSample\\applications_app_samples\\code\\Project\\Test\\jsunit\\entry\\src\\main\\ets\\util\\Logger.ets"],
      sourcesContent: ["/*\r\n * Copyright (c) 2023 Huawei Device Co., Ltd.\r\n * Licensed under the Apache License, Version 2.0 (the \"License\");\r\n * you may not use this file except in compliance with the License.\r\n * You may obtain a copy of the License at\r\n *\r\n *     http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing, software\r\n * distributed under the License is distributed on an \"AS IS\" BASIS,\r\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r\n * See the License for the specific language governing permissions and\r\n * limitations under the License.\r\n */\r\n\r\nimport hilog from '@ohos.hilog';\r\nconst TAG = \"[Sample_Test]\";\r\nclass Logger {\r\n    private domain: number;\r\n    private prefix: string;\r\n    private format: string = '%{public}s, %{public}s';\r\n\r\n    constructor(prefix: string) {\r\n        this.prefix = prefix;\r\n        this.domain = 0xF811;\r\n    }\r\n\r\n    debug(...args: string[]): void {\r\n        hilog.debug(this.domain, this.prefix, this.format, args);\r\n    }\r\n\r\n    info(...args: string[]): void {\r\n        hilog.info(this.domain, this.prefix, this.format, args);\r\n    }\r\n\r\n    warn(...args: string[]): void {\r\n        hilog.warn(this.domain, this.prefix, this.format, args);\r\n    }\r\n\r\n    error(...args: string[]): void {\r\n        hilog.error(this.domain, this.prefix, this.format, args);\r\n    }\r\n}\r\n\r\nexport default new Logger(TAG);"],
      names: [],
      mappings: "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"
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "6b3fc45ff65fe38a3681b94d4aac6581a7b2f8a0"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    cov_2dk4dgtg9n = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2dk4dgtg9n();
import hilog from '@ohos.hilog';
const TAG = (cov_2dk4dgtg9n().s[0]++, "[Sample_Test]");
class Logger {
  constructor(prefix) {
    cov_2dk4dgtg9n().f[0]++;
    cov_2dk4dgtg9n().s[1]++;
    this.format = '%{public}s, %{public}s';
    cov_2dk4dgtg9n().s[2]++;
    this.prefix = prefix;
    cov_2dk4dgtg9n().s[3]++;
    this.domain = 0xF811;
  }
  debug(...args) {
    cov_2dk4dgtg9n().f[1]++;
    cov_2dk4dgtg9n().s[4]++;
    hilog.debug(this.domain, this.prefix, this.format, args);
  }
  info(...args) {
    cov_2dk4dgtg9n().f[2]++;
    cov_2dk4dgtg9n().s[5]++;
    hilog.info(this.domain, this.prefix, this.format, args);
  }
  warn(...args) {
    cov_2dk4dgtg9n().f[3]++;
    cov_2dk4dgtg9n().s[6]++;
    hilog.warn(this.domain, this.prefix, this.format, args);
  }
  error(...args) {
    cov_2dk4dgtg9n().f[4]++;
    cov_2dk4dgtg9n().s[7]++;
    hilog.error(this.domain, this.prefix, this.format, args);
  }
}
export default new Logger(TAG);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJoaWxvZyIsIlRBRyIsImNvdl8yZGs0ZGd0ZzluIiwicyIsIkxvZ2dlciIsImNvbnN0cnVjdG9yIiwicHJlZml4IiwiZiIsImZvcm1hdCIsImRvbWFpbiIsImRlYnVnIiwiYXJncyIsImluZm8iLCJ3YXJuIiwiZXJyb3IiXSwic291cmNlcyI6WyJEOlxcZGV2UHJvamVjdFxcT2hTYW1wbGVcXGFwcGxpY2F0aW9uc19hcHBfc2FtcGxlc1xcY29kZVxcUHJvamVjdFxcVGVzdFxcanN1bml0XFxlbnRyeVxcc3JjXFxtYWluXFxldHNcXHV0aWxcXExvZ2dlci5ldHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ29weXJpZ2h0IChjKSAyMDIzIEh1YXdlaSBEZXZpY2UgQ28uLCBMdGQuXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBoaWxvZyBmcm9tICdAb2hvcy5oaWxvZyc7XHJcbmNvbnN0IFRBRyA9IFwiW1NhbXBsZV9UZXN0XVwiO1xyXG5jbGFzcyBMb2dnZXIge1xyXG4gICAgcHJpdmF0ZSBkb21haW46IG51bWJlcjtcclxuICAgIHByaXZhdGUgcHJlZml4OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGZvcm1hdDogc3RyaW5nID0gJyV7cHVibGljfXMsICV7cHVibGljfXMnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByZWZpeDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XHJcbiAgICAgICAgdGhpcy5kb21haW4gPSAweEY4MTE7XHJcbiAgICB9XHJcblxyXG4gICAgZGVidWcoLi4uYXJnczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBoaWxvZy5kZWJ1Zyh0aGlzLmRvbWFpbiwgdGhpcy5wcmVmaXgsIHRoaXMuZm9ybWF0LCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBpbmZvKC4uLmFyZ3M6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgaGlsb2cuaW5mbyh0aGlzLmRvbWFpbiwgdGhpcy5wcmVmaXgsIHRoaXMuZm9ybWF0LCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICB3YXJuKC4uLmFyZ3M6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgaGlsb2cud2Fybih0aGlzLmRvbWFpbiwgdGhpcy5wcmVmaXgsIHRoaXMuZm9ybWF0LCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBlcnJvciguLi5hcmdzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIGhpbG9nLmVycm9yKHRoaXMuZG9tYWluLCB0aGlzLnByZWZpeCwgdGhpcy5mb3JtYXQsIGFyZ3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgTG9nZ2VyKFRBRyk7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE9BQU9BLEtBQUssTUFBTSxhQUFhO0FBQy9CLE1BQU1DLEdBQUcsSUFBQUMsY0FBQSxHQUFBQyxDQUFBLE9BQUcsZUFBZTtBQUMzQixNQUFNQyxNQUFNO0VBS1JDLFlBQVlDLE1BQWM7SUFBQUosY0FBQSxHQUFBSyxDQUFBO0lBQUFMLGNBQUEsR0FBQUMsQ0FBQTtJQUZsQixJQUFNLENBQUFLLE1BQUEsR0FBVyx3QkFBd0I7SUFBQ04sY0FBQSxHQUFBQyxDQUFBO0lBRzlDLElBQUksQ0FBQ0csTUFBTSxHQUFHQSxNQUFNO0lBQUNKLGNBQUEsR0FBQUMsQ0FBQTtJQUNyQixJQUFJLENBQUNNLE1BQU0sR0FBRyxNQUFNO0VBQ3hCO0VBRUFDLEtBQUtBLENBQUMsR0FBR0MsSUFBYztJQUFBVCxjQUFBLEdBQUFLLENBQUE7SUFBQUwsY0FBQSxHQUFBQyxDQUFBO0lBQ25CSCxLQUFLLENBQUNVLEtBQUssQ0FBQyxJQUFJLENBQUNELE1BQU0sRUFBRSxJQUFJLENBQUNILE1BQU0sRUFBRSxJQUFJLENBQUNFLE1BQU0sRUFBRUcsSUFBSSxDQUFDO0VBQzVEO0VBRUFDLElBQUlBLENBQUMsR0FBR0QsSUFBYztJQUFBVCxjQUFBLEdBQUFLLENBQUE7SUFBQUwsY0FBQSxHQUFBQyxDQUFBO0lBQ2xCSCxLQUFLLENBQUNZLElBQUksQ0FBQyxJQUFJLENBQUNILE1BQU0sRUFBRSxJQUFJLENBQUNILE1BQU0sRUFBRSxJQUFJLENBQUNFLE1BQU0sRUFBRUcsSUFBSSxDQUFDO0VBQzNEO0VBRUFFLElBQUlBLENBQUMsR0FBR0YsSUFBYztJQUFBVCxjQUFBLEdBQUFLLENBQUE7SUFBQUwsY0FBQSxHQUFBQyxDQUFBO0lBQ2xCSCxLQUFLLENBQUNhLElBQUksQ0FBQyxJQUFJLENBQUNKLE1BQU0sRUFBRSxJQUFJLENBQUNILE1BQU0sRUFBRSxJQUFJLENBQUNFLE1BQU0sRUFBRUcsSUFBSSxDQUFDO0VBQzNEO0VBRUFHLEtBQUtBLENBQUMsR0FBR0gsSUFBYztJQUFBVCxjQUFBLEdBQUFLLENBQUE7SUFBQUwsY0FBQSxHQUFBQyxDQUFBO0lBQ25CSCxLQUFLLENBQUNjLEtBQUssQ0FBQyxJQUFJLENBQUNMLE1BQU0sRUFBRSxJQUFJLENBQUNILE1BQU0sRUFBRSxJQUFJLENBQUNFLE1BQU0sRUFBRUcsSUFBSSxDQUFDO0VBQzVEO0FBQ0g7QUFFRCxlQUFlLElBQUlQLE1BQU0sQ0FBQ0gsR0FBRyxDQUFDIn0=