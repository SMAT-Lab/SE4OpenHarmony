window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AnimationModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e68fYZxelCa535BFO6NvWN", "AnimationModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AnimationModule = function(_super) {
      __extends(AnimationModule, _super);
      function AnimationModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.spine = null;
        _this.dragon = null;
        return _this;
      }
      AnimationModule.prototype.onEnable = function() {
        this.spine.node.active = false;
        this.spine.paused = false;
      };
      AnimationModule.prototype.onClickSpine = function() {
        this.onLoadSkeleton();
        this.dragon.node.active = false;
        this.spine.paused = false;
      };
      AnimationModule.prototype.onLoadSkeleton = function() {
        var _this = this;
        this.spine.node.active = true;
        if (this.spine.skeletonData) {
          this.spine.paused = !this.spine.paused;
          return;
        }
        cc.resources.load("animation/spine/raptor", sp.SkeletonData, function(err, res) {
          _this.spine.skeletonData = res;
          _this.spine.setAnimation(0, "walk", true);
        });
      };
      AnimationModule.prototype.onClickDragon = function() {
        this.onLoadDragon();
        this.spine.node.active = false;
        this.spine.paused = true;
      };
      AnimationModule.prototype.onLoadDragon = function() {
        var _this = this;
        this.dragon.node.active = true;
        if (this.dragon.dragonAtlasAsset) return;
        var tex = null;
        var ske = null;
        cc.resources.load("animation/dragon/mecha_1502b_tex", dragonBones.DragonBonesAtlasAsset, function(err, atlasasset) {
          tex = atlasasset;
          cc.resources.load("animation/dragon/mecha_1502b_ske", dragonBones.DragonBonesAsset, function(err, asset) {
            ske = asset;
            _this.dragon.dragonAtlasAsset = tex;
            _this.dragon.dragonAsset = ske;
            _this.dragon.armatureName = "mecha_1502b";
            _this.dragon.playAnimation("walk", 0);
          });
        });
      };
      AnimationModule.prototype.onDisable = function() {
        this.spine.clearTracks();
        this.spine.skeletonData = null;
        this.dragon.dragonAtlasAsset = null;
        this.dragon.dragonAsset = null;
      };
      __decorate([ property(sp.Skeleton) ], AnimationModule.prototype, "spine", void 0);
      __decorate([ property(dragonBones.ArmatureDisplay) ], AnimationModule.prototype, "dragon", void 0);
      AnimationModule = __decorate([ ccclass ], AnimationModule);
      return AnimationModule;
    }(cc.Component);
    exports.default = AnimationModule;
    cc._RF.pop();
  }, {} ],
  AudioManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ee9cehMJNAH6Ax1+kbXsoC", "AudioManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var clips = {};
    var AudioManager = function() {
      function AudioManager() {}
      AudioManager.playMusic = function(path) {
        var _this = this;
        if (clips.hasOwnProperty(path)) {
          var clip = clips[path];
          clip && cc.audioEngine.playMusic(clip, true);
          return;
        }
        cc.resources.load(path, cc.AudioClip, function(err, res) {
          clips[path] = res || null;
          _this.playMusic(path);
        });
      };
      AudioManager.playEffect = function(path, loop) {
        var _this = this;
        void 0 === loop && (loop = false);
        if (clips.hasOwnProperty(path)) {
          var clip = clips[path];
          clip && cc.audioEngine.playEffect(clip, loop);
          return;
        }
        cc.resources.load(path, cc.AudioClip, function(err, res) {
          clips[path] = res || null;
          _this.playEffect(path, loop);
        });
      };
      AudioManager.pauseAll = function() {
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.pauseMusic();
      };
      AudioManager.resumeAll = function() {
        cc.audioEngine.resumeMusic();
      };
      AudioManager.stopMusic = function() {
        cc.audioEngine.stopMusic();
      };
      AudioManager.stopAll = function() {
        cc.audioEngine.stopAll();
      };
      AudioManager.playBgm = function() {
        AudioManager.playMusic("sound/win");
      };
      AudioManager.playBtn = function(loop) {
        AudioManager.playEffect("sound/click", loop);
      };
      return AudioManager;
    }();
    exports.default = AudioManager;
    cc._RF.pop();
  }, {} ],
  BlackTips: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f58bb5RjzJGj5AJycMV+E3U", "BlackTips");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BlackTips = function(_super) {
      __extends(BlackTips, _super);
      function BlackTips() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txtContent = null;
        return _this;
      }
      BlackTips.prototype.show = function(str) {
        var _this = this;
        if (!this.node.isValid) return;
        this.txtContent.string = str;
        setTimeout(function() {
          _this.node.destroy();
        }, 2e3);
      };
      __decorate([ property(cc.Label) ], BlackTips.prototype, "txtContent", void 0);
      BlackTips = __decorate([ ccclass ], BlackTips);
      return BlackTips;
    }(cc.Component);
    exports.default = BlackTips;
    cc._RF.pop();
  }, {} ],
  ConsoleModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a7be5fyOgFKgbA8G5rKI//n", "ConsoleModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ConsoleModule = function(_super) {
      __extends(ConsoleModule, _super);
      function ConsoleModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txtCount = null;
        return _this;
      }
      ConsoleModule.prototype.onLoad = function() {
        this.txtCount.string = "\u65e5\u5fd7";
      };
      ConsoleModule.prototype.onClickLog = function() {
        var str = "log\uff1a\u5f00\u53d1OpenHarmony\u6e38\u620f";
        cc.log("" + str);
        this.txtCount.string = str;
      };
      ConsoleModule.prototype.onClickWarn = function() {
        var str = "warn\uff1a\u5f00\u53d1OpenHarmony\u6e38\u620f";
        cc.warn("" + str);
        this.txtCount.string = str;
      };
      ConsoleModule.prototype.onClickError = function() {
        var str = "error\uff1a\u5f00\u53d1OpenHarmony\u6e38\u620f";
        cc.error("" + str);
        this.txtCount.string = str;
      };
      __decorate([ property(cc.Label) ], ConsoleModule.prototype, "txtCount", void 0);
      ConsoleModule = __decorate([ ccclass ], ConsoleModule);
      return ConsoleModule;
    }(cc.Component);
    exports.default = ConsoleModule;
    cc._RF.pop();
  }, {} ],
  ETCModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "83b9fTiiYtHUqEcw4mNfTTn", "ETCModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ETCModule = function(_super) {
      __extends(ETCModule, _super);
      function ETCModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.imgSprite = null;
        _this.jpgSprite = null;
        return _this;
      }
      ETCModule.prototype.onEnable = function() {
        this.imgSprite.spriteFrame = null;
      };
      ETCModule.prototype.onClickShow = function() {
        var _this = this;
        cc.resources.load("img/sheep", cc.SpriteFrame, function(error, asset) {
          if (error) {
            cc.log(error);
            return;
          }
          _this.imgSprite.spriteFrame = asset;
        });
        cc.resources.load("img/cocos_creator", cc.SpriteFrame, function(error, asset) {
          if (error) {
            cc.log(error);
            return;
          }
          _this.jpgSprite.spriteFrame = asset;
        });
      };
      ETCModule.prototype.onDisable = function() {};
      __decorate([ property(cc.Sprite) ], ETCModule.prototype, "imgSprite", void 0);
      __decorate([ property(cc.Sprite) ], ETCModule.prototype, "jpgSprite", void 0);
      ETCModule = __decorate([ ccclass ], ETCModule);
      return ETCModule;
    }(cc.Component);
    exports.default = ETCModule;
    cc._RF.pop();
  }, {} ],
  EditboxModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "357e3tJjv9OEqt3UD6ybBG4", "EditboxModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EditboxModule = function(_super) {
      __extends(EditboxModule, _super);
      function EditboxModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.editbox = null;
        return _this;
      }
      EditboxModule.prototype.onEnable = function() {
        this.editbox.string = "";
        this.editbox.textLabel.string = "";
      };
      EditboxModule.prototype.onChangeType = function(e) {
        console.log("\u8f93\u5165\u5185\u5bb9\uff1a", this.editbox.textLabel.string);
      };
      __decorate([ property(cc.EditBox) ], EditboxModule.prototype, "editbox", void 0);
      EditboxModule = __decorate([ ccclass ], EditboxModule);
      return EditboxModule;
    }(cc.Component);
    exports.default = EditboxModule;
    cc._RF.pop();
  }, {} ],
  FileOpModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "06856UE3sxPfZsoCoPOE5nG", "FileOpModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FileOpModule = function(_super) {
      __extends(FileOpModule, _super);
      function FileOpModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txtContent = null;
        _this.txtLog = null;
        _this.editbox = null;
        _this.fileName = "testOH.json";
        return _this;
      }
      FileOpModule.prototype.onEnable = function() {
        this.editbox.string = "";
        this.editbox.textLabel.string = "";
      };
      FileOpModule.prototype.onClickRead = function() {
        true;
        var path = jsb.fileUtils.getWritablePath();
        var savePath = path + this.fileName;
        var isFile = jsb.fileUtils.isFileExist(savePath);
        if (isFile) {
          var json = jsb.fileUtils.getStringFromFile(savePath);
          this.txtLog.string = json;
        } else this.txtLog.string = "\u8fd8\u6ca1\u6709\u5b58\u5165\u5185\u5bb9";
      };
      FileOpModule.prototype.onClickWrite = function() {
        true;
        var path = jsb.fileUtils.getWritablePath();
        var savePath = path + this.fileName;
        var isFile = jsb.fileUtils.isFileExist(savePath);
        var b = "";
        b = isFile ? "<\u4fee\u6539\u5185\u5bb9\u6210\u529f>" : "<\u65b0\u5efa\u6587\u4ef6\u5e76\u50a8\u5b58\u6210\u529f>";
        var boo = jsb.fileUtils.writeStringToFile("" + this.txtContent.string, savePath);
        this.txtLog.string = boo ? b + "\n\u6587\u4ef6\u5185\u5bb9\uff1a" + this.txtContent.string + "\n\u5730\u5740\u4e3a\uff1a" + savePath : "\u6587\u4ef6\u50a8\u5b58\u5931\u8d25";
      };
      FileOpModule.prototype.onClickRemove = function() {
        true;
        var path = jsb.fileUtils.getWritablePath();
        var savePath = path + this.fileName;
        var isFile = jsb.fileUtils.isFileExist(savePath);
        if (isFile) {
          var boo = jsb.fileUtils.removeFile(savePath);
          this.txtLog.string = boo ? "\u5220\u9664\u6587\u4ef6\u6210\u529f\n\u5730\u5740\u4e3a\uff1a" + savePath : "\u5220\u9664\u5931\u8d25";
        } else this.txtLog.string = "\u6587\u4ef6\u4e0d\u5b58\u5728";
      };
      FileOpModule.prototype.onClickOHRead = function() {
        var path = this.editbox.textLabel.string;
        this.txtLog.string = "\u8bfb\u53d6\u8def\u5f84\uff1a" + path;
        true;
        var json = jsb.fileUtils.getStringFromFile(path);
        this.txtLog.string = "\u8bfb\u53d6\u8def\u5f84\uff1a" + path + "\n\u8bfb\u53d6\u6570\u636e\uff1a" + json;
      };
      __decorate([ property(cc.Label) ], FileOpModule.prototype, "txtContent", void 0);
      __decorate([ property(cc.Label) ], FileOpModule.prototype, "txtLog", void 0);
      __decorate([ property(cc.EditBox) ], FileOpModule.prototype, "editbox", void 0);
      FileOpModule = __decorate([ ccclass ], FileOpModule);
      return FileOpModule;
    }(cc.Component);
    exports.default = FileOpModule;
    cc._RF.pop();
  }, {} ],
  GraphicsModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3d1bB3aO5OkLa5laUJBnej", "GraphicsModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GraphicsModule = function(_super) {
      __extends(GraphicsModule, _super);
      function GraphicsModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.canvas = null;
        _this.graphics = null;
        _this.touches = [];
        return _this;
      }
      GraphicsModule.prototype.onEnable = function() {
        this.canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(-200, 0);
        this.graphics.lineTo(200, 0);
        this.graphics.stroke();
      };
      GraphicsModule.prototype.onTouchStart = function(event) {
        this.touches.length = 0;
        this.touches.push(event.touch.getLocation());
      };
      GraphicsModule.prototype.onTouchMove = function(event) {
        var touches = this.touches;
        touches.push(event.touch.getLocation());
        var MIN_POINT_DISTANCE = 2;
        this.graphics.clear();
        var worldPos = this.node.convertToWorldSpaceAR(cc.v2());
        this.graphics.moveTo(touches[0].x - worldPos.x, touches[0].y - worldPos.y);
        var lastIndex = 0;
        for (var i = 1, l = touches.length; i < l; i++) {
          if (touches[i].sub(touches[lastIndex]).mag() < MIN_POINT_DISTANCE) continue;
          lastIndex = i;
          this.graphics.lineTo(touches[i].x - worldPos.x, touches[i].y - worldPos.y);
        }
        this.graphics.stroke();
      };
      GraphicsModule.prototype.onTouchEnd = function(event) {};
      GraphicsModule.prototype.onDisable = function() {
        this.canvas.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.canvas.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.canvas.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.graphics.clear();
      };
      __decorate([ property(cc.Node) ], GraphicsModule.prototype, "canvas", void 0);
      __decorate([ property(cc.Graphics) ], GraphicsModule.prototype, "graphics", void 0);
      GraphicsModule = __decorate([ ccclass ], GraphicsModule);
      return GraphicsModule;
    }(cc.Component);
    exports.default = GraphicsModule;
    cc._RF.pop();
  }, {} ],
  HMScore: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ab19c5bm/pMHbMySJyktFD8", "HMScore");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HMScore = function(_super) {
      __extends(HMScore, _super);
      function HMScore() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.main = null;
        _this.pay = null;
        _this.gameService = null;
        _this.queryProductsNode = null;
        _this.purchaseNode = null;
        _this.loginLabel = null;
        _this.queryEnvironmentStatusLabel = null;
        _this.queryOwnedPurchasesLabel = null;
        _this.queryPurchaseRecordsLabel = null;
        _this.queryProductsLabel = null;
        _this.purchaseLabel = null;
        _this.getLocalPlayerLabel = null;
        _this.savePlayerRoleLabel = null;
        return _this;
      }
      HMScore.prototype.onEnable = function() {
        this.queryProductsNode.active = false;
        this.purchaseNode.active = false;
        this.showMain();
      };
      HMScore.prototype.showPay = function() {
        this.main.active = false;
        this.pay.active = true;
        this.gameService.active = false;
      };
      HMScore.prototype.showGameService = function() {
        this.main.active = false;
        this.pay.active = false;
        this.gameService.active = true;
      };
      HMScore.prototype.showMain = function() {
        this.main.active = true;
        this.pay.active = false;
        this.gameService.active = false;
      };
      HMScore.prototype.showQueryProducts = function() {
        this.pay.active = false;
        this.queryProductsNode.active = true;
      };
      HMScore.prototype.showPurchase = function() {
        this.pay.active = false;
        this.purchaseNode.active = true;
      };
      HMScore.prototype.login = function() {
        return __awaiter(this, void 0, void 0, function() {
          var result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.loginLabel.string = "\u53d1\u8d77\u767b\u5f55";
              return [ 4, globalThis.oh.postSyncMessage("login", "") ];

             case 1:
              result = _a.sent();
              this.loginLabel.string = result;
              return [ 2 ];
            }
          });
        });
      };
      HMScore.prototype.queryEnvironmentStatus = function() {
        return __awaiter(this, void 0, void 0, function() {
          var result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.queryEnvironmentStatusLabel.string = "\u53d1\u8d77\u67e5\u8be2\u652f\u4ed8\u8d44\u683c";
              return [ 4, globalThis.oh.postSyncMessage("queryEnvironmentStatus", "") ];

             case 1:
              result = _a.sent();
              this.queryEnvironmentStatusLabel.string = result;
              return [ 2 ];
            }
          });
        });
      };
      HMScore.prototype.purchase = function(event, str) {
        return __awaiter(this, void 0, void 0, function() {
          var p, param, result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              p = str.split("-");
              param = {
                productId: p[0],
                productType: p[1],
                developerPayload: "testPurchase"
              };
              this.purchaseLabel.string = "\u53d1\u8d77\u8d2d\u4e70\uff1a\uff1a" + JSON.stringify(param);
              return [ 4, globalThis.oh.postSyncMessage("purchase", JSON.stringify(param)) ];

             case 1:
              result = _a.sent();
              this.purchaseLabel.string = result;
              return [ 2 ];
            }
          });
        });
      };
      HMScore.prototype.queryProducts = function(event, str) {
        return __awaiter(this, void 0, void 0, function() {
          var p, param, result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              p = str.split("-");
              param = {
                productIds: [ p[0] ],
                productType: p[1]
              };
              this.queryProductsLabel.string = "\u53d1\u8d77\u67e5\u8be2\u5546\u54c1\u4fe1\u606f\uff1a" + JSON.stringify(param);
              return [ 4, globalThis.oh.postSyncMessage("queryProducts", JSON.stringify(param)) ];

             case 1:
              result = _a.sent();
              this.queryProductsLabel.string = result;
              return [ 2 ];
            }
          });
        });
      };
      HMScore.prototype.queryOwnedPurchases = function() {
        return __awaiter(this, void 0, void 0, function() {
          var param, result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.queryOwnedPurchasesLabel.string = "\u53d1\u8d77\u8865\u5355";
              param = {
                productType: 0
              };
              return [ 4, globalThis.oh.postSyncMessage("queryOwnedPurchases", JSON.stringify(param)) ];

             case 1:
              result = _a.sent();
              this.queryOwnedPurchasesLabel.string = result;
              return [ 2 ];
            }
          });
        });
      };
      HMScore.prototype.queryPurchaseRecords = function(event, productType) {
        return __awaiter(this, void 0, void 0, function() {
          var param, result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.queryPurchaseRecordsLabel.string = "\u67e5\u8be2\u8d2d\u4e70\u8bb0\u5f55";
              param = {
                productType: productType
              };
              return [ 4, globalThis.oh.postSyncMessage("queryPurchaseRecords", JSON.stringify(param)) ];

             case 1:
              result = _a.sent();
              this.queryPurchaseRecordsLabel.string = result;
              return [ 2 ];
            }
          });
        });
      };
      HMScore.prototype.getLocalPlayer = function() {
        return __awaiter(this, void 0, void 0, function() {
          var result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.getLocalPlayerLabel.string = "\u53d1\u8d77\u73a9\u5bb6\u670d\u52a1-\u83b7\u53d6\u73a9\u5bb6\u4fe1\u606f";
              return [ 4, globalThis.oh.postSyncMessage("getLocalPlayer", "") ];

             case 1:
              result = _a.sent();
              this.getLocalPlayerLabel.string = result;
              return [ 2 ];
            }
          });
        });
      };
      HMScore.prototype.savePlayerRole = function() {
        return __awaiter(this, void 0, void 0, function() {
          var param, result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.savePlayerRoleLabel.string = "\u53d1\u8d77\u73a9\u5bb6\u670d\u52a1-\u4fdd\u5b58\u73a9\u5bb6\u89d2\u8272\u4fe1\u606f";
              param = {
                roleId: "123",
                roleName: "Jason",
                serverId: "456",
                serverName: "Zhangshan",
                gamePlayerId: "789",
                teamPlayerId: "000"
              };
              return [ 4, globalThis.oh.postSyncMessage("savePlayerRole", JSON.stringify(param)) ];

             case 1:
              result = _a.sent();
              this.savePlayerRoleLabel.string = result;
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(cc.Node) ], HMScore.prototype, "main", void 0);
      __decorate([ property(cc.Node) ], HMScore.prototype, "pay", void 0);
      __decorate([ property(cc.Node) ], HMScore.prototype, "gameService", void 0);
      __decorate([ property(cc.Node) ], HMScore.prototype, "queryProductsNode", void 0);
      __decorate([ property(cc.Node) ], HMScore.prototype, "purchaseNode", void 0);
      __decorate([ property(cc.Label) ], HMScore.prototype, "loginLabel", void 0);
      __decorate([ property(cc.Label) ], HMScore.prototype, "queryEnvironmentStatusLabel", void 0);
      __decorate([ property(cc.Label) ], HMScore.prototype, "queryOwnedPurchasesLabel", void 0);
      __decorate([ property(cc.Label) ], HMScore.prototype, "queryPurchaseRecordsLabel", void 0);
      __decorate([ property(cc.Label) ], HMScore.prototype, "queryProductsLabel", void 0);
      __decorate([ property(cc.Label) ], HMScore.prototype, "purchaseLabel", void 0);
      __decorate([ property(cc.Label) ], HMScore.prototype, "getLocalPlayerLabel", void 0);
      __decorate([ property(cc.Label) ], HMScore.prototype, "savePlayerRoleLabel", void 0);
      HMScore = __decorate([ ccclass ], HMScore);
      return HMScore;
    }(cc.Component);
    exports.default = HMScore;
    cc._RF.pop();
  }, {} ],
  HotUpdateUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0864dtJHNlKK4H3+UMrP/1g", "HotUpdateUI");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HotUpdateUI = function(_super) {
      __extends(HotUpdateUI, _super);
      function HotUpdateUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.fileProgress = null;
        _this.txtFile = null;
        _this.byteProgress = null;
        _this.txtByte = null;
        _this.txtInfo = null;
        _this.txtVersion = null;
        return _this;
      }
      HotUpdateUI.prototype.onEnable = function() {
        this.txtFile.string = "0/0";
        this.txtByte.string = "0/0";
        this.txtInfo.string = "";
        this.byteProgress.progress = 0;
        this.fileProgress.progress = 0;
        this.txtVersion.string = "";
      };
      __decorate([ property(cc.ProgressBar) ], HotUpdateUI.prototype, "fileProgress", void 0);
      __decorate([ property(cc.Label) ], HotUpdateUI.prototype, "txtFile", void 0);
      __decorate([ property(cc.ProgressBar) ], HotUpdateUI.prototype, "byteProgress", void 0);
      __decorate([ property(cc.Label) ], HotUpdateUI.prototype, "txtByte", void 0);
      __decorate([ property(cc.Label) ], HotUpdateUI.prototype, "txtInfo", void 0);
      __decorate([ property(cc.Label) ], HotUpdateUI.prototype, "txtVersion", void 0);
      HotUpdateUI = __decorate([ ccclass ], HotUpdateUI);
      return HotUpdateUI;
    }(cc.Component);
    exports.default = HotUpdateUI;
    cc._RF.pop();
  }, {} ],
  HotUpdate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65691YkaR5HWL0X3Gw3AruW", "HotUpdate");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MsgManager_1 = require("../common/MsgManager");
    var HotUpdateUI_1 = require("./HotUpdateUI");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var customManifestStr = JSON.stringify({});
    var HotUpdate = function(_super) {
      __extends(HotUpdate, _super);
      function HotUpdate() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.jsonUrl = null;
        _this.panel = null;
        _this.proSp = null;
        _this._storagePath = "";
        _this.versionCompareHandle = null;
        _this._am = null;
        _this._updating = false;
        _this._checkListener = null;
        _this._updateListener = null;
        _this._failCount = 0;
        _this._canRetry = false;
        return _this;
      }
      HotUpdate.prototype.onEnable = function() {
        this.proSp.active = true;
        if (!cc.sys.isNative) return;
        this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() + "/" : "/") + "blackjack-remote-asset";
        console.log("regengxin:::remote asset: ", this._storagePath);
        this.versionCompareHandle = function(versionA, versionB) {
          console.log("regengxin:::version A is = ", versionA, " | version B is = ", versionB);
          var vA = versionA.split(".");
          var vB = versionB.split(".");
          for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || 0);
            if (a === b) continue;
            return a - b;
          }
          return vB.length > vA.length ? -1 : 0;
        };
        this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
        this._am.setVerifyCallback(function(path, asset) {
          var compressed = asset.compressed;
          var expectedMD5 = asset.md5;
          var relativePath = asset.path;
          var size = asset.size;
          if (compressed) {
            console.log("regengxin:::setVerifyCallback(1): ", relativePath);
            return true;
          }
          console.log("regengxin:::setVerifyCallback(2): ", relativePath + " | <" + expectedMD5 + ">");
          return true;
        });
        cc.sys.os !== cc.sys.OS_ANDROID && cc.sys.os !== cc.sys["OS_OPENHARMONY"] || this._am.setMaxConcurrentTask(2);
      };
      HotUpdate.prototype.onClickCheckUpdate = function() {
        if (this._updating) {
          this.panel.txtInfo.string += "\n\u6b63\u5728\u68c0\u67e5\u66f4\u65b0\u4e2d...";
          return;
        }
        if (!this._am) return;
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
          var manifest = new jsb.Manifest(JSON.stringify(this.jsonUrl.json), this._storagePath);
          var boo = this._am.loadLocalManifest(manifest, this._storagePath);
          this.panel.txtInfo.string += boo ? "\njson\u66f4\u65b0\u5217\u8868\u52a0\u8f7d\u6210\u529f\uff0c\u70b9\u51fb\u66f4\u65b0\u5427" : "\njson\u66f4\u65b0\u5217\u8868\u52a0\u8f7d\u5931\u8d25";
          this.panel.txtVersion.string = MsgManager_1.default.versionType + "\u5f53\u524d\u7248\u672c\uff1a" + this._am.getLocalManifest().getVersion();
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
          this.panel.txtInfo.string += "\n\u65e0\u6cd5\u52a0\u8f7d\u672c\u5730\u6e05\u5355...";
          return;
        }
        this._am.setEventCallback(this.checkCb.bind(this));
      };
      HotUpdate.prototype.checkCb = function(event) {
        cc.log("check-Code: " + event.getEventCode());
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          this.panel.txtInfo.string += "\n\u627e\u4e0d\u5230\u672c\u5730\u6e05\u5355\u6587\u4ef6\uff0c\u5df2\u8df3\u8fc7\u70ed\u66f4\u65b0\u3002";
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          this.panel.txtInfo.string += "\n\u4e0b\u8f7d\u6e05\u5355\u6587\u4ef6\u5931\u8d25\uff0c\u5df2\u8df3\u8fc7\u70ed\u66f4\u65b0\u3002";
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          this.panel.txtInfo.string += "\n\u5df2\u4f7f\u7528\u6700\u65b0\u7684\u8fdc\u7a0b\u7248\u672c\u3002";
          break;

         case jsb.EventAssetsManager.NEW_VERSION_FOUND:
          this.panel.txtInfo.string += "\n\u627e\u5230\u65b0\u7248\u672c\uff0c\u8bf7\u5c1d\u8bd5\u66f4\u65b0\u3002 (" + this._am.getTotalBytes() + ")";
          this.panel.fileProgress.progress = 0;
          this.panel.byteProgress.progress = 0;
          break;

         default:
          return;
        }
        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
      };
      HotUpdate.prototype.onClickHotUpdate = function() {
        if (this._am && !this._updating) {
          this._am.setEventCallback(this.updateCb.bind(this));
          if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var manifest = new jsb.Manifest(JSON.stringify(this.jsonUrl.json), this._storagePath);
            this._am.loadLocalManifest(manifest, this._storagePath);
          }
          this._failCount = 0;
          this._am.update();
          this._updating = true;
        }
      };
      HotUpdate.prototype.updateCb = function(event) {
        var needRestart = false;
        var failed = false;
        cc.log("update-Code: ", event.getEventCode());
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          this.panel.txtInfo.string += "\n\u627e\u4e0d\u5230\u672c\u5730\u6e05\u5355\u6587\u4ef6\uff0c\u5df2\u8df3\u8fc7\u70ed\u66f4\u65b0\u3002";
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_PROGRESSION:
          this.panel.byteProgress.progress = event.getPercent();
          this.panel.fileProgress.progress = event.getPercentByFile();
          this.panel.txtFile.string = event.getDownloadedFiles() + " / " + event.getTotalFiles();
          this.panel.txtByte.string = event.getDownloadedBytes() + " / " + event.getTotalBytes();
          var msg = event.getMessage();
          msg && (this.panel.txtInfo.string += "\n\u66f4\u65b0\u7684\u6587\u4ef6\uff1a " + msg);
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          this.panel.txtInfo.string += "\n\u4e0b\u8f7d\u6e05\u5355\u6587\u4ef6\u5931\u8d25\uff0c\u5df2\u8df3\u8fc7\u70ed\u66f4\u65b0\u3002";
          this.panel.txtInfo.string += "\n" + event.getMessage();
          failed = true;
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          this.panel.txtInfo.string += "\n\u5df2\u4f7f\u7528\u6700\u65b0\u7684\u8fdc\u7a0b\u7248\u672c\u3002";
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FINISHED:
          this.panel.txtInfo.string += "\n\u66f4\u65b0\u5b8c\u6210\u3002 " + event.getMessage();
          needRestart = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FAILED:
          this.panel.txtInfo.string += "\n\u66f4\u65b0\u5931\u8d25\u3002 " + event.getMessage();
          this._updating = false;
          this._canRetry = true;
          break;

         case jsb.EventAssetsManager.ERROR_UPDATING:
          this.panel.txtInfo.string += "\n\u8d44\u4ea7\u66f4\u65b0\u9519\u8bef\uff1a " + event.getAssetId() + ", " + event.getMessage();
          break;

         case jsb.EventAssetsManager.ERROR_DECOMPRESS:
          this.panel.txtInfo.string = event.getMessage();
        }
        if (failed) {
          this._am.setEventCallback(null);
          this._updateListener = null;
          this._updating = false;
        }
        if (needRestart) {
          this.proSp.active = false;
          console.log("regengxin:::needRestart(1)");
          this._am.setEventCallback(null);
          this._updateListener = null;
          var searchPaths = jsb.fileUtils.getSearchPaths();
          var newPaths = this._am.getLocalManifest().getSearchPaths();
          for (var i = 0; i < newPaths.length; i++) -1 == searchPaths.indexOf(newPaths[i]) && Array.prototype.unshift.apply(searchPaths, [ newPaths[i] ]);
          cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
          jsb.fileUtils.setSearchPaths(searchPaths);
          console.log("regengxin:::needRestart(2): ", searchPaths.length);
          cc.audioEngine.stopAll();
          cc.game.restart();
          console.log("regengxin:::needRestart(3): cc.game.restart()");
        }
      };
      HotUpdate.prototype.onClickCustom = function() {
        var _a;
        if ((null === (_a = this._am) || void 0 === _a ? void 0 : _a.getState()) === jsb.AssetsManager.State.UNINITED) {
          var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
          this._am.loadLocalManifest(manifest, this._storagePath);
          this.panel.txtInfo.string = "\u4f7f\u7528\u81ea\u5b9a\u4e49\u6e05\u5355";
          this.panel.txtVersion.string = "\u5f53\u524d\u7248\u672c\uff1a" + this._am.getLocalManifest().getVersion();
        } else this.panel.txtInfo.string += "\n\u5df2\u7ecf\u68c0\u67e5\u66f4\u65b0\uff0c\u4f7f\u7528\u4e86\u672c\u5730\u6e05\u5355\u3002";
      };
      HotUpdate.prototype.onClickInit = function() {
        true;
        var boo = jsb.fileUtils.removeDirectory(this._storagePath + "/");
        if (boo) {
          this.panel.txtInfo.string = "\u7248\u672c\u8fd8\u539f\u6210\u529f\uff0c\u91cd\u542f\u8bd5\u8bd5\u5427";
          cc.sys.localStorage.removeItem("HotUpdateSearchPaths");
          console.log("regengxin:::onClickInit:");
        }
      };
      HotUpdate.prototype.onGameCode = function() {
        (function() {
          console.log("regengxin:::Game.ts(1)-", !!globalThis.jsb, "object" === typeof globalThis.jsb);
          if ("object" === typeof globalThis.jsb) {
            var hotUpdateSearchPaths = globalThis.cc.sys.localStorage.getItem("HotUpdateSearchPaths");
            console.log("regengxin:::Game.ts(2)-", !!hotUpdateSearchPaths);
            if (hotUpdateSearchPaths) {
              var paths = JSON.parse(hotUpdateSearchPaths);
              globalThis.jsb.fileUtils.setSearchPaths(paths);
              var fileList = [];
              var storagePath = paths[0] || "";
              var tempPath = storagePath + "_temp/";
              var baseOffset = tempPath.length;
              console.log("regengxin:::Game.ts(3)\uff1a", tempPath, baseOffset);
              if (globalThis.jsb.fileUtils.isDirectoryExist(tempPath) && !globalThis.jsb.fileUtils.isFileExist(tempPath + "project.manifest.temp")) {
                console.log("regengxin:::Game.ts(4)\uff1a", tempPath + "project.manifest.temp");
                globalThis.jsb.fileUtils.listFilesRecursively(tempPath, fileList);
                fileList.forEach(function(srcPath) {
                  var relativePath = srcPath.substr(baseOffset);
                  var dstPath = storagePath + relativePath;
                  if ("/" == srcPath[srcPath.length]) globalThis.jsb.fileUtils.createDirectory(dstPath); else {
                    globalThis.jsb.fileUtils.isFileExist(dstPath) && globalThis.jsb.fileUtils.removeFile(dstPath);
                    globalThis.jsb.fileUtils.renameFile(srcPath, dstPath);
                  }
                });
                globalThis.jsb.fileUtils.removeDirectory(tempPath);
              }
            }
          }
        })();
      };
      HotUpdate.prototype.onDisable = function() {
        this._am && this._am.setEventCallback(null);
      };
      __decorate([ property(cc.JsonAsset) ], HotUpdate.prototype, "jsonUrl", void 0);
      __decorate([ property(HotUpdateUI_1.default) ], HotUpdate.prototype, "panel", void 0);
      __decorate([ property(cc.Node) ], HotUpdate.prototype, "proSp", void 0);
      HotUpdate = __decorate([ ccclass ], HotUpdate);
      return HotUpdate;
    }(cc.Component);
    exports.default = HotUpdate;
    cc._RF.pop();
  }, {
    "../common/MsgManager": "MsgManager",
    "./HotUpdateUI": "HotUpdateUI"
  } ],
  LabelModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "345d5x/S0NBd7JgfUfMIa/8", "LabelModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LabelModule = function(_super) {
      __extends(LabelModule, _super);
      function LabelModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txtDefault = null;
        _this.txtLabelatlas = null;
        _this.txtImg = null;
        _this.txtOutline = null;
        _this.txtShadow = null;
        _this.richText = null;
        return _this;
      }
      LabelModule.prototype.onEnable = function() {
        this.onClickChange(0);
      };
      LabelModule.prototype.onClickChange = function(type) {
        void 0 === type && (type = 1);
        if (type && "\u9ed8\u8ba4\u5b57\u4f53" == this.txtDefault.string) {
          this.txtDefault.string = "\u7cfb\u7edf\u5b57\u4f53";
          this.txtLabelatlas.string = "9876543210";
          this.txtImg.string = "OPENHARMONY";
          this.txtOutline.string = "LabelOutline\u6587\u5b57\u63cf\u8fb9";
          this.txtShadow.string = "LabelShadow\u6587\u5b57\u9634\u5f71";
          this.richText.string = "<color=#00ff00>Openharmony</c><color=#0fffff>(RichTest)</color>";
        } else {
          this.txtDefault.string = "\u9ed8\u8ba4\u5b57\u4f53";
          this.txtLabelatlas.string = "0123456789";
          this.txtImg.string = "OpenHarmony\u6977\u4f53";
          this.txtOutline.string = "\u6587\u5b57\u63cf\u8fb9LabelOutline";
          this.txtShadow.string = "\u6587\u5b57\u9634\u5f71LabelShadow";
          this.richText.string = "<color=#00ff00>(RichTest)</c><color=#0fffff>Openharmony</color>";
        }
      };
      LabelModule.prototype.onDisable = function() {};
      __decorate([ property(cc.Label) ], LabelModule.prototype, "txtDefault", void 0);
      __decorate([ property(cc.Label) ], LabelModule.prototype, "txtLabelatlas", void 0);
      __decorate([ property(cc.Label) ], LabelModule.prototype, "txtImg", void 0);
      __decorate([ property(cc.Label) ], LabelModule.prototype, "txtOutline", void 0);
      __decorate([ property(cc.Label) ], LabelModule.prototype, "txtShadow", void 0);
      __decorate([ property(cc.RichText) ], LabelModule.prototype, "richText", void 0);
      LabelModule = __decorate([ ccclass ], LabelModule);
      return LabelModule;
    }(cc.Component);
    exports.default = LabelModule;
    cc._RF.pop();
  }, {} ],
  LinkUrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68724jFTQpPLZUgKfzmFgur", "LinkUrl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LinkUrl = function(_super) {
      __extends(LinkUrl, _super);
      function LinkUrl() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LinkUrl.prototype.openApp = function() {
        var wantInfo = {
          bundleName: "bundleName",
          abilityName: "abilityName"
        };
        globalThis.oh.postMessage("openApp", JSON.stringify(wantInfo));
      };
      LinkUrl.prototype.openAppInAppMarket = function() {
        globalThis.oh.postMessage("openAppInAppMarket", "123456");
      };
      LinkUrl.prototype.openUrl = function() {
        globalThis.oh.postMessage("openAppUrl", "www.baidu.com");
      };
      LinkUrl = __decorate([ ccclass ], LinkUrl);
      return LinkUrl;
    }(cc.Component);
    exports.default = LinkUrl;
    cc._RF.pop();
  }, {} ],
  Load: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "30a04okz4ZJEbAKEbcExXWy", "Load");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Load = function(_super) {
      __extends(Load, _super);
      function Load() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txtLoad = null;
        _this.progressBar = null;
        _this.allTime = 30;
        _this.wait = false;
        _this.totalBoo = false;
        return _this;
      }
      Load.prototype.onLoad = function() {
        cc["profiler"].showStats();
        cc.director.preloadScene("Main", this.onProgress.bind(this), function() {});
      };
      Load.prototype.onProgress = function(completedCount, totalCount) {
        var pre = completedCount / totalCount;
        this.txtLoad.string = "load...\uff1a" + Math.floor(100 * pre) + "%";
        this.progressBar.progress = pre;
        if (pre >= 1) {
          this.totalBoo = true;
          this.goScene();
        }
      };
      Load.prototype.update = function(dt) {
        if (this.wait) return;
        if (this.allTime > 0) {
          this.allTime -= 1;
          if (this.allTime <= 0) {
            this.wait = true;
            this.goScene();
          }
        }
      };
      Load.prototype.goScene = function() {
        this.wait && this.totalBoo && cc.director.loadScene("Main");
      };
      __decorate([ property(cc.Label) ], Load.prototype, "txtLoad", void 0);
      __decorate([ property(cc.ProgressBar) ], Load.prototype, "progressBar", void 0);
      Load = __decorate([ ccclass ], Load);
      return Load;
    }(cc.Component);
    exports.default = Load;
    cc._RF.pop();
  }, {} ],
  LocalStorageModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "59e4bTYSApCVbqhZNMeNKI0", "LocalStorageModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LocalStorageModule = function(_super) {
      __extends(LocalStorageModule, _super);
      function LocalStorageModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txtContent = null;
        _this.key = "OPENHARMONY";
        return _this;
      }
      LocalStorageModule.prototype.onEnable = function() {
        this.txtContent.string = "";
      };
      LocalStorageModule.prototype.onClickStorage = function() {
        cc.sys.localStorage.setItem(this.key, "OpenHarmony\u672c\u5730\u50a8\u5b58");
        this.txtContent.string = "\u50a8\u5b58\u4e86\u6570\u636e";
      };
      LocalStorageModule.prototype.onClickGet = function() {
        var content = cc.sys.localStorage.getItem(this.key);
        this.txtContent.string = content ? "\u83b7\u53d6\u672c\u5730\u50a8\u5b58\u6210\u529f\uff1a\nkey\uff1a" + this.key + "\n\u5185\u5bb9\uff1a" + content : "\u672c\u5730\u8fd8\u6ca1\u6709\u50a8\u5b58\u6570\u636e";
      };
      LocalStorageModule.prototype.onClickRemove = function() {
        cc.sys.localStorage.removeItem(this.key);
        this.txtContent.string = "";
      };
      __decorate([ property(cc.Label) ], LocalStorageModule.prototype, "txtContent", void 0);
      LocalStorageModule = __decorate([ ccclass ], LocalStorageModule);
      return LocalStorageModule;
    }(cc.Component);
    exports.default = LocalStorageModule;
    cc._RF.pop();
  }, {} ],
  Main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b3f02/FF8dB5Ill9bbmJElV", "Main");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Main = function(_super) {
      __extends(Main, _super);
      function Main() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nullToggle = null;
        _this.module = null;
        _this.toggle = null;
        _this.back = null;
        _this.txtTitle = null;
        return _this;
      }
      Main.prototype.onLoad = function() {
        this.nullToggle.isChecked = true;
        this.onClickBack();
      };
      Main.prototype.onClickToggle = function(e) {
        switch (e.node.name) {
         case "toggle1":
          this.txtTitle.string = "\u97f3\u9891";
          this.onChangeShow("sound");
          break;

         case "toggle2":
          this.txtTitle.string = "\u65e5\u5fd7";
          this.onChangeShow("console");
          break;

         case "toggle3":
          this.txtTitle.string = "\u5e73\u53f0";
          this.onChangeShow("platform");
          break;

         case "toggle4":
          this.txtTitle.string = "\u6587\u4ef6\u64cd\u4f5c";
          this.onChangeShow("fileOp");
          break;

         case "toggle5":
          this.txtTitle.string = "\u91cd\u529b\u4f20\u611f";
          this.onChangeShow("sensor");
          break;

         case "toggle6":
          this.txtTitle.string = "\u5c4f\u5e55";
          this.onChangeShow("screen");
          break;

         case "toggle7":
          this.txtTitle.string = "\u8f93\u5165";
          this.onChangeShow("editbox");
          break;

         case "toggle8":
          this.txtTitle.string = "network";
          this.onChangeShow("network");
          break;

         case "toggle9":
          this.txtTitle.string = "\u6570\u636e\u5b58\u50a8";
          this.onChangeShow("localStorage");
          break;

         case "toggle10":
          this.txtTitle.string = "\u89e6\u6478";
          this.onChangeShow("touch");
          break;

         case "toggle11":
          this.txtTitle.string = "ETC";
          this.onChangeShow("etc");
          break;

         case "toggle12":
          this.txtTitle.string = "\u9aa8\u9abc";
          this.onChangeShow("animation");
          break;

         case "toggle13":
          this.txtTitle.string = "videoplay";
          this.onChangeShow("video");
          break;

         case "toggle14":
          this.txtTitle.string = "webview";
          this.onChangeShow("webview");
          break;

         case "toggle15":
          this.txtTitle.string = "\u5b57\u4f53";
          this.onChangeShow("label");
          break;

         case "toggle16":
          this.txtTitle.string = "\u9707\u52a8";
          this.onChangeShow("vibration");
          break;

         case "toggle17":
          this.txtTitle.string = "\u7c92\u5b50";
          this.onChangeShow("particle");
          break;

         case "toggle18":
          this.txtTitle.string = "Mask";
          this.onChangeShow("mask");
          break;

         case "toggle19":
          this.txtTitle.string = "graphics";
          this.onChangeShow("graphics");
          break;

         case "toggle20":
          this.txtTitle.string = "\u79fb\u52a8\u52a8\u753b";
          this.onChangeShow("move");
          break;

         case "toggle21":
          this.txtTitle.string = "shader";
          this.onChangeShow("shader");
          break;

         case "toggle22":
          this.txtTitle.string = "\u62d6\u5c3e";
          this.onChangeShow("motionStreak");
          break;

         case "toggle23":
          this.txtTitle.string = "\u5730\u56fe";
          this.onChangeShow("tilemap");
          break;

         case "toggle24":
          this.txtTitle.string = "\u70ed\u66f4\u65b0";
          this.onChangeShow("hotupdate");
          break;

         case "toggle25":
          this.txtTitle.string = "\u52a0\u8f7d\u5206\u5305";
          this.onChangeShow("subbag");
          break;

         case "toggle26":
          this.txtTitle.string = "Link";
          this.onChangeShow("link");
          break;

         case "toggle27":
          this.txtTitle.string = "HMScore";
          this.onChangeShow("HMScore");
        }
      };
      Main.prototype.onChangeShow = function(name) {
        this.module.children.forEach(function(v) {
          v.active = false;
        });
        this.module.getChildByName("" + name).active = true;
        this.toggle.active = false;
        this.back.active = true;
      };
      Main.prototype.onClickBack = function() {
        this.txtTitle.string = "\u9009\u62e9\u6a21\u5757\u8fdb\u5165";
        this.nullToggle.isChecked = true;
        this.toggle.active = true;
        this.back.active = false;
        this.module.children.forEach(function(v) {
          v.active = false;
        });
      };
      __decorate([ property(cc.Toggle) ], Main.prototype, "nullToggle", void 0);
      __decorate([ property(cc.Node) ], Main.prototype, "module", void 0);
      __decorate([ property(cc.Node) ], Main.prototype, "toggle", void 0);
      __decorate([ property(cc.Node) ], Main.prototype, "back", void 0);
      __decorate([ property(cc.Label) ], Main.prototype, "txtTitle", void 0);
      Main = __decorate([ ccclass ], Main);
      return Main;
    }(cc.Component);
    exports.default = Main;
    cc._RF.pop();
  }, {} ],
  MaskModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cdecd0ulQBNBJgPBb4bF6pb", "MaskModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BlackTips_1 = require("./BlackTips");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MaskModule = function(_super) {
      __extends(MaskModule, _super);
      function MaskModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mask = null;
        _this.slider = null;
        _this.txtCount = null;
        _this.lead = null;
        _this.txtMask = null;
        _this.blackTips = null;
        _this.tipsNode = null;
        return _this;
      }
      MaskModule.prototype.onEnable = function() {
        this.lead.active = false;
        this.txtMask.string = "\u906e\u7f69\u6d4b\u8bd5\u6587\u5b57";
        this.slider.progress = this.mask.alphaThreshold;
        this.txtCount.string = this.slider.progress.toFixed(1);
      };
      MaskModule.prototype.update = function(dt) {
        if (cc.game.renderType !== cc.game.RENDER_TYPE_WEBGL && false) return;
        this.mask.alphaThreshold = this.slider.progress;
        this.txtCount.string = this.slider.progress.toFixed(1);
      };
      MaskModule.prototype.onCkickLead = function() {
        this.lead.active = !this.lead.active;
        this.txtMask.string = "OpenHarmony\u906e\u7f69\u6587\u5b57";
        this.onClickCCC();
      };
      MaskModule.prototype.onClickCCC = function() {
        if (null == this.tipsNode) {
          this.tipsNode = new cc.Node();
          this.node.addChild(this.tipsNode, 0, "tips_node");
          var layoutNode = new cc.Node();
          this.tipsNode.addChild(layoutNode, 0, "tips_layout");
          this.tipsNode.addComponent(cc.Mask);
          this.tipsNode.setAnchorPoint(0, 0);
          this.tipsNode.setPosition(0, cc.winSize.height / 2);
          this.tipsNode.setContentSize(cc.winSize.width, cc.winSize.height / 2);
          layoutNode.addComponent(cc.Layout);
          var layout = layoutNode.getComponent(cc.Layout);
          if (layout) {
            layout.type = cc.Layout.Type.VERTICAL;
            layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
            layout.verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM;
            layout.node.setAnchorPoint(0, 0);
          }
        }
        var prefab = cc.instantiate(this.blackTips);
        var blackTips = prefab.getComponent(BlackTips_1.default);
        this.addNewTips(prefab);
        blackTips.show("OpenHarmony\u906e\u7f69\u63d0\u793a\u8bed\u53e5");
      };
      MaskModule.prototype.addNewTips = function(node) {
        var runningScene = cc.director.getScene();
        var tipsNode = runningScene.getChildByName("tips_node");
        if (null == tipsNode) {
          tipsNode = new cc.Node();
          runningScene.addChild(tipsNode, 0, "tips_node");
          var layoutNode = new cc.Node();
          tipsNode.addChild(layoutNode, 0, "tips_layout");
          tipsNode.addComponent(cc.Mask);
          tipsNode.setAnchorPoint(0, 0);
          tipsNode.setPosition(0, cc.winSize.height / 2);
          tipsNode.setContentSize(cc.winSize.width, cc.winSize.height / 2);
          layoutNode.addComponent(cc.Layout);
          var layout = layoutNode.getComponent(cc.Layout);
          if (layout) {
            layout.type = cc.Layout.Type.VERTICAL;
            layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
            layout.verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM;
            layout.node.setAnchorPoint(0, 0);
          }
        }
        tipsNode.getChildByName("tips_layout").addChild(node);
        tipsNode.zIndex = tipsNode.parent.childrenCount - 1;
      };
      __decorate([ property(cc.Mask) ], MaskModule.prototype, "mask", void 0);
      __decorate([ property(cc.Slider) ], MaskModule.prototype, "slider", void 0);
      __decorate([ property(cc.Label) ], MaskModule.prototype, "txtCount", void 0);
      __decorate([ property(cc.Node) ], MaskModule.prototype, "lead", void 0);
      __decorate([ property(cc.Label) ], MaskModule.prototype, "txtMask", void 0);
      __decorate([ property(cc.Prefab) ], MaskModule.prototype, "blackTips", void 0);
      MaskModule = __decorate([ ccclass ], MaskModule);
      return MaskModule;
    }(cc.Component);
    exports.default = MaskModule;
    cc._RF.pop();
  }, {
    "./BlackTips": "BlackTips"
  } ],
  MotionStreakModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ee739cC5FdPTJRYSgXQMBGS", "MotionStreakModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MotionStreakModule = function(_super) {
      __extends(MotionStreakModule, _super);
      function MotionStreakModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this.txtName = null;
        _this.isPlay = false;
        return _this;
      }
      MotionStreakModule.prototype.onEnable = function() {
        this.isPlay = false;
        this.txtName.string = "\u8fd0\u52a8";
      };
      MotionStreakModule.prototype.onClickPlay = function() {
        if (this.isPlay) {
          this.animation.stop("motion1");
          this.isPlay = false;
          this.txtName.string = "\u8fd0\u52a8";
        } else {
          this.animation.play("motion1");
          this.isPlay = true;
          this.txtName.string = "\u505c\u6b62";
        }
      };
      MotionStreakModule.prototype.onDisable = function() {
        this.animation.stop("motion1");
      };
      __decorate([ property(cc.Animation) ], MotionStreakModule.prototype, "animation", void 0);
      __decorate([ property(cc.Label) ], MotionStreakModule.prototype, "txtName", void 0);
      MotionStreakModule = __decorate([ ccclass ], MotionStreakModule);
      return MotionStreakModule;
    }(cc.Component);
    exports.default = MotionStreakModule;
    cc._RF.pop();
  }, {} ],
  MoveModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25f19BAzAFNWq5IzEMmBZxJ", "MoveModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MoveModule = function(_super) {
      __extends(MoveModule, _super);
      function MoveModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.animationSp = null;
        _this.actionSp = null;
        _this.tweenSp = null;
        _this.animation = null;
        _this.txtAni = null;
        _this.moveTo = null;
        _this.moveBy = null;
        _this.rotate = null;
        _this.tweenNode = null;
        _this.toggle = null;
        return _this;
      }
      MoveModule.prototype.onEnable = function() {
        this.animation.on("play", this.onPlay, this);
        this.animation.on("stop", this.onStop, this);
        this.animation.on("pause", this.onPause, this);
        this.toggle.isChecked = true;
        this.animationSp.active = true;
        this.animation.stop("gold");
        this.actionSp.active = false;
        this.tweenSp.active = false;
      };
      MoveModule.prototype.onClickToggle = function(e) {
        this.animationSp.active = false;
        this.actionSp.active = false;
        this.tweenSp.active = false;
        cc.Tween.stopAllByTarget(this.tweenNode);
        switch (e.node.name) {
         case "toggle1":
          this.animationSp.active = true;
          this.animation.stop("gold");
          break;

         case "toggle2":
          this.actionSp.active = true;
          this.initMove();
          break;

         case "toggle3":
          this.tweenSp.active = true;
        }
      };
      MoveModule.prototype.onPlay = function() {
        this.txtAni.string = "\u64ad\u653e";
      };
      MoveModule.prototype.onStop = function() {
        this.txtAni.string = "\u505c\u6b62";
      };
      MoveModule.prototype.onPause = function() {
        this.txtAni.string = "\u6682\u505c";
      };
      MoveModule.prototype.onClickPlay = function() {
        var state = this.animation.play("gold");
        state.speed = .5;
      };
      MoveModule.prototype.onClickPause = function() {
        this.animation.pause("gold");
      };
      MoveModule.prototype.initMove = function() {
        this.rotate.stopAllActions();
        this.moveTo.stopAllActions();
        this.moveBy.stopAllActions();
        this.rotate.angle = 0;
        this.moveTo.setPosition(-200, 400);
        this.moveBy.setPosition(200, 150);
      };
      MoveModule.prototype.onClickMoveToby = function() {
        var moveTo = cc.moveTo(.5, cc.v2(200, 400));
        var moveBy = cc.moveBy(.5, cc.v2(-100, 50));
        this.moveTo.runAction(moveTo);
        this.moveBy.runAction(moveBy);
        var rotationTo = cc.rotateTo(1, 90);
        this.rotate.runAction(rotationTo);
      };
      MoveModule.prototype.onClickTween = function() {
        cc.Tween.stopAllByTarget(this.tweenNode);
        var node = this.tweenNode;
        cc.tween(node).delay(.2).repeat(1e3, cc.tween().set({
          opacity: 0,
          scale: 10,
          x: 0,
          angle: 0
        }).parallel(cc.tween().to(.5, {
          opacity: 255,
          scale: 1
        }, {
          easing: "quintInOut"
        }), cc.tween().to(.5, {
          x: node.x
        }, {
          easing: "backOut"
        })).delay(.1).to(.8, {
          angle: 360
        }, {
          easing: "cubicInOut"
        }).to(.3, {
          opacity: 0,
          scale: 3
        }, {
          easing: "quintIn"
        }).delay(.2)).start();
      };
      MoveModule.prototype.onDisable = function() {
        this.animation.stop("stop");
        this.animation.off("play", this.onPlay, this);
        this.animation.off("stop", this.onStop, this);
        this.animation.off("pause", this.onPause, this);
        this.initMove();
        cc.Tween.stopAllByTarget(this.tweenNode);
      };
      __decorate([ property(cc.Node) ], MoveModule.prototype, "animationSp", void 0);
      __decorate([ property(cc.Node) ], MoveModule.prototype, "actionSp", void 0);
      __decorate([ property(cc.Node) ], MoveModule.prototype, "tweenSp", void 0);
      __decorate([ property(cc.Animation) ], MoveModule.prototype, "animation", void 0);
      __decorate([ property(cc.Label) ], MoveModule.prototype, "txtAni", void 0);
      __decorate([ property(cc.Node) ], MoveModule.prototype, "moveTo", void 0);
      __decorate([ property(cc.Node) ], MoveModule.prototype, "moveBy", void 0);
      __decorate([ property(cc.Node) ], MoveModule.prototype, "rotate", void 0);
      __decorate([ property(cc.Node) ], MoveModule.prototype, "tweenNode", void 0);
      __decorate([ property(cc.Toggle) ], MoveModule.prototype, "toggle", void 0);
      MoveModule = __decorate([ ccclass ], MoveModule);
      return MoveModule;
    }(cc.Component);
    exports.default = MoveModule;
    cc._RF.pop();
  }, {} ],
  MsgManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0bf19OonOhLH6OpOCYCEUNb", "MsgManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MsgManagerClass = function() {
      function MsgManagerClass() {
        this.versionType = "(1.0.3)";
        this.bgColor = cc.color(27, 38, 46);
      }
      return MsgManagerClass;
    }();
    var MsgManager = new MsgManagerClass();
    exports.default = MsgManager;
    cc._RF.pop();
  }, {} ],
  NetWorkModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9321d0ciH9LH6SpSutKxbN7", "NetWorkModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NetWorkModule = function(_super) {
      __extends(NetWorkModule, _super);
      function NetWorkModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txtContent = null;
        _this.ws = null;
        return _this;
      }
      NetWorkModule.prototype.onEnable = function() {
        this.txtContent.string = "";
      };
      NetWorkModule.prototype.onClickGet = function() {
        var type = cc.sys.getNetworkType();
        type === cc.sys.NetworkType.NONE ? this.txtContent.string = "\u7f51\u7edc\u4e0d\u901a" : type === cc.sys.NetworkType.LAN ? this.txtContent.string = "\u672c\u5730\u7f51\u7edc\u8fde\u63a5" : type === cc.sys.NetworkType.WWAN && (this.txtContent.string = "\u79fb\u52a8\u7f51\u7edc");
      };
      NetWorkModule.prototype.onClickHttp = function() {
        var _this = this;
        this.txtContent.string = "http\u8bf7\u6c42\u4e2d...\n\n(https://www.baidu.com/)";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.baidu.com/", true);
        xhr.onreadystatechange = function() {
          4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400 && (_this.txtContent.string = "http\u8bf7\u6c42\u6210\u529f \n(https://www.baidu.com/)\n\n" + xhr.responseText.slice(0, 37));
        };
        xhr.send();
      };
      NetWorkModule.prototype.onClickWebSocket = function() {
        var self = this;
        var url = "ws://echo.websocket.events";
        this.txtContent.string = "\u8fde\u63a5\uff1a" + url;
        try {
          self.ws = new WebSocket(url);
          self.ws.onopen = function(event) {
            self.txtContent.string = self.txtContent.string + "\n1.(onopen)\u670d\u52a1\u5668\u8fde\u63a5\u6210\u529f";
            self.txtContent.string = self.txtContent.string + "\n2.(send)\u5f00\u59cb\u5411\u670d\u52a1\u5668\u53d1\u9001\u6d88\u606f: \u4f60\u597d\u670d\u52a1\u5668";
            self.ws.send("\u4f60\u597d\u670d\u52a1\u5668");
          };
          self.ws.onmessage = function(event) {
            self.txtContent.string = self.txtContent.string + "\n3.(onmessage)\u63a5\u6536\u670d\u52a1\u5668\u53d1\u56de\u7684\u6570\u636e: " + event.data;
          };
          self.ws.onerror = function(event) {
            self.txtContent.string = self.txtContent.string + "\n(onerror)WebSocket\u8fde\u63a5\u53d1\u751f\u9519\u8bef";
          };
          self.ws.onclose = function(event) {
            self.txtContent.string = self.txtContent.string + "\n(onclose)WebSocket\u8fde\u63a5\u5173\u95ed";
          };
        } catch (error) {}
      };
      NetWorkModule.prototype.onDisable = function() {
        this.ws && this.ws.readyState == WebSocket.OPEN && this.ws.close();
      };
      __decorate([ property(cc.Label) ], NetWorkModule.prototype, "txtContent", void 0);
      NetWorkModule = __decorate([ ccclass ], NetWorkModule);
      return NetWorkModule;
    }(cc.Component);
    exports.default = NetWorkModule;
    cc._RF.pop();
  }, {} ],
  ParticleModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "76019DjaTlAlbkozYOGd+ei", "ParticleModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ParticleModule = function(_super) {
      __extends(ParticleModule, _super);
      function ParticleModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.normal = null;
        _this.atom1 = null;
        _this.atom2 = null;
        _this.txtBtn = null;
        _this.txtM = null;
        return _this;
      }
      ParticleModule.prototype.onEnable = function() {
        this.normal.resetSystem();
        this.atom1.resetSystem();
        if (this.atom2.isValid) {
          this.atom2.resetSystem();
          this.txtM.string = "";
        } else this.txtM.string = "\u6b64\u7c92\u5b50\u5df2\u9500\u6bc1";
        this.txtBtn.string = "\u505c\u6b62";
      };
      ParticleModule.prototype.onClickParticle = function() {
        if (this.normal.stopped) {
          this.normal.resetSystem();
          this.atom1.resetSystem();
          this.atom2.isValid && this.atom2.resetSystem();
          this.txtBtn.string = "\u505c\u6b62";
        } else {
          this.normal.stopSystem();
          this.atom1.stopSystem();
          this.atom2.isValid && this.atom2.stopSystem();
          this.txtBtn.string = "\u64ad\u653e";
        }
        this.atom2.isValid ? this.txtM.string = "" : this.txtM.string = "\u6b64\u7c92\u5b50\u5df2\u9500\u6bc1";
      };
      ParticleModule.prototype.onDisable = function() {
        this.normal.stopSystem();
        this.atom1.stopSystem();
        this.atom2.isValid && this.atom2.stopSystem();
        this.txtBtn.string = "\u64ad\u653e";
      };
      __decorate([ property(cc.ParticleSystem) ], ParticleModule.prototype, "normal", void 0);
      __decorate([ property(cc.ParticleSystem) ], ParticleModule.prototype, "atom1", void 0);
      __decorate([ property(cc.ParticleSystem) ], ParticleModule.prototype, "atom2", void 0);
      __decorate([ property(cc.Label) ], ParticleModule.prototype, "txtBtn", void 0);
      __decorate([ property(cc.Label) ], ParticleModule.prototype, "txtM", void 0);
      ParticleModule = __decorate([ ccclass ], ParticleModule);
      return ParticleModule;
    }(cc.Component);
    exports.default = ParticleModule;
    cc._RF.pop();
  }, {} ],
  PlatformModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0c06fwZyTFAO7Jr6VGYGFcg", "PlatformModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PlatformModule = function(_super) {
      __extends(PlatformModule, _super);
      function PlatformModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txtContent = null;
        return _this;
      }
      PlatformModule.prototype.start = function() {};
      PlatformModule.prototype.onClickGet = function() {
        this.txtContent.string = "\u8fd0\u884c\u5e73\u53f0code\uff1a" + cc.sys.platform + "\nHUAWEI_GAME\uff1a" + cc.sys.HUAWEI_GAME + "\nos\uff1a" + cc.sys.os + "\nos\u7248\u672c\uff1a" + cc.sys.osVersion + "\n\u8bed\u8a00\uff1a" + cc.sys.language + "\n\u7535\u91cf\uff1a" + cc.sys.getBatteryLevel();
      };
      __decorate([ property(cc.Label) ], PlatformModule.prototype, "txtContent", void 0);
      PlatformModule = __decorate([ ccclass ], PlatformModule);
      return PlatformModule;
    }(cc.Component);
    exports.default = PlatformModule;
    cc._RF.pop();
  }, {} ],
  ScreenModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55d971xUrpGZp44INEwAfzU", "ScreenModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ScreenModule = function(_super) {
      __extends(ScreenModule, _super);
      function ScreenModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txtContent = null;
        return _this;
      }
      ScreenModule.prototype.onEnable = function() {
        this.txtContent.string = "";
      };
      ScreenModule.prototype.onClickDPI = function() {
        var a = cc.director.getWinSizeInPixels();
        var b = cc.view.getFrameSize();
        var p = "";
        p = b.width > b.height ? "\u6a2a\u5c4f" : "\u7ad6\u5c4f";
        this.txtContent.string = "\u8d44\u6e90\u5206\u8fa8\u7387 w:" + a.width + " h:" + a.height + "  \u6bd4\u4f8b:" + (a.height / a.width).toFixed(2) + "\n\u7269\u7406\u5206\u8fa8\u7387 w:" + b.width + " h:" + b.height + " \u6bd4\u4f8b:" + (b.height / b.width).toFixed(2) + "\n" + p;
      };
      ScreenModule.prototype.onDisable = function() {};
      __decorate([ property(cc.Label) ], ScreenModule.prototype, "txtContent", void 0);
      ScreenModule = __decorate([ ccclass ], ScreenModule);
      return ScreenModule;
    }(cc.Component);
    exports.default = ScreenModule;
    cc._RF.pop();
  }, {} ],
  SensorModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a058buJQBM9JVzjBAhr/UO", "SensorModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SensorModule = function(_super) {
      __extends(SensorModule, _super);
      function SensorModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ball = null;
        _this.gravityX = 0;
        return _this;
      }
      SensorModule.prototype.onEnable = function() {
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onAccelerometer, this);
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(this.gravityX, -500);
        this.ball.setPosition(0, 300);
      };
      SensorModule.prototype.onAccelerometer = function(event) {
        var x = event["acc"]["x"] || 0;
        var gravityX = Math.abs(x) < .2 ? 0 : x > 0 ? 150 : -150;
        if (this.gravityX !== gravityX) {
          this.gravityX = gravityX;
          var d = cc.director.getPhysicsManager();
          d.gravity = cc.v2(this.gravityX, d.gravity.y);
        }
      };
      SensorModule.prototype.onDisable = function() {
        cc.systemEvent.setAccelerometerEnabled(false);
        cc.director.getPhysicsManager().enabled = false;
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onAccelerometer, this);
      };
      __decorate([ property(cc.Node) ], SensorModule.prototype, "ball", void 0);
      SensorModule = __decorate([ ccclass ], SensorModule);
      return SensorModule;
    }(cc.Component);
    exports.default = SensorModule;
    cc._RF.pop();
  }, {} ],
  ShaderModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80bdePLwKlOc5F7BFSc3TSN", "ShaderModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShaderModule = function(_super) {
      __extends(ShaderModule, _super);
      function ShaderModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.imgSprite = null;
        _this.isSprite = true;
        return _this;
      }
      ShaderModule.prototype.onEnable = function() {
        this.imgSprite.setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        this.isSprite = true;
      };
      ShaderModule.prototype.onClickShader = function() {
        if (this.isSprite) {
          this.imgSprite.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
          this.isSprite = false;
        } else {
          this.imgSprite.setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
          this.isSprite = true;
        }
      };
      ShaderModule.prototype.onDisable = function() {};
      __decorate([ property(cc.Sprite) ], ShaderModule.prototype, "imgSprite", void 0);
      ShaderModule = __decorate([ ccclass ], ShaderModule);
      return ShaderModule;
    }(cc.Component);
    exports.default = ShaderModule;
    cc._RF.pop();
  }, {} ],
  SoundModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3de99BYcOVPhZ36qRMiwC/E", "SoundModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_1 = require("../common/AudioManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SoundModule = function(_super) {
      __extends(SoundModule, _super);
      function SoundModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.imgPlay = null;
        _this.btnPOR = null;
        _this.btnStop = null;
        _this.txtBgm = null;
        _this.slider = null;
        _this.imgGoBg = null;
        _this.isPlayIng = false;
        _this.currentVolume = 0;
        return _this;
      }
      SoundModule.prototype.onLoad = function() {
        this.onChangeBtnType();
        this.imgPlay.angle = 0;
        this.currentVolume = cc.audioEngine.getMusicVolume();
        this.slider.progress = this.currentVolume;
        this.imgGoBg.width = 300 * this.currentVolume;
      };
      SoundModule.prototype.update = function(dt) {
        this.isPlayIng && (this.imgPlay.angle -= 5);
      };
      SoundModule.prototype.onClickPlayBgm = function() {
        AudioManager_1.default.playBgm();
        this.onChangeBtnType(2);
      };
      SoundModule.prototype.onClickplayEffect = function() {
        AudioManager_1.default.playBtn();
      };
      SoundModule.prototype.onClickPauseOrResume = function() {
        if (cc.audioEngine.isMusicPlaying()) {
          AudioManager_1.default.pauseAll();
          this.txtBgm.string = "\u6062\u590d\u64ad\u653e";
          this.isPlayIng = false;
        } else {
          AudioManager_1.default.resumeAll();
          this.txtBgm.string = "\u6682\u505c\u64ad\u653e";
          this.isPlayIng = true;
        }
      };
      SoundModule.prototype.onClickStop = function() {
        AudioManager_1.default.stopAll();
        this.onChangeBtnType(1);
        this.imgPlay.angle = 0;
      };
      SoundModule.prototype.onChangeBtnType = function(type) {
        void 0 === type && (type = 1);
        switch (type) {
         case 1:
          this.isPlayIng = false;
          this.btnPOR.enabled = false;
          this.btnPOR.node.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
          this.btnStop.enabled = false;
          this.btnStop.node.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
          break;

         case 2:
          this.isPlayIng = true;
          this.btnPOR.enabled = true;
          this.btnPOR.node.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
          this.btnStop.enabled = true;
          this.btnStop.node.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }
      };
      SoundModule.prototype.onClickSub = function() {
        this.currentVolume = Math.max(this.currentVolume - .1, 0);
        this.onSelectSlider();
      };
      SoundModule.prototype.onClickAdd = function() {
        this.currentVolume = Math.min(this.currentVolume + .1, 1);
        this.onSelectSlider();
      };
      SoundModule.prototype.onSliderHEvent = function(dt) {
        this.currentVolume = dt.progress;
        this.onSelectSlider();
      };
      SoundModule.prototype.onSelectSlider = function() {
        cc.audioEngine.setMusicVolume(this.currentVolume);
        cc.audioEngine.setEffectsVolume(this.currentVolume);
        this.slider.progress = this.currentVolume;
        this.imgGoBg.width = 300 * this.currentVolume;
      };
      SoundModule.prototype.onDisable = function() {
        AudioManager_1.default.stopAll();
        this.isPlayIng = false;
        this.imgPlay.angle = 0;
      };
      __decorate([ property(cc.Node) ], SoundModule.prototype, "imgPlay", void 0);
      __decorate([ property(cc.Button) ], SoundModule.prototype, "btnPOR", void 0);
      __decorate([ property(cc.Button) ], SoundModule.prototype, "btnStop", void 0);
      __decorate([ property(cc.Label) ], SoundModule.prototype, "txtBgm", void 0);
      __decorate([ property(cc.Slider) ], SoundModule.prototype, "slider", void 0);
      __decorate([ property(cc.Node) ], SoundModule.prototype, "imgGoBg", void 0);
      SoundModule = __decorate([ ccclass ], SoundModule);
      return SoundModule;
    }(cc.Component);
    exports.default = SoundModule;
    cc._RF.pop();
  }, {
    "../common/AudioManager": "AudioManager"
  } ],
  SubBagModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0542aN7DRP46F6/xPQhDqb", "SubBagModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SubBagModule = function(_super) {
      __extends(SubBagModule, _super);
      function SubBagModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.imgIcon1 = null;
        _this.imgIcon2 = null;
        _this.txtJson = null;
        _this.bundle1 = null;
        _this.bundle2 = null;
        return _this;
      }
      SubBagModule.prototype.onEnable = function() {};
      SubBagModule.prototype.onClickLoad = function() {
        var _this = this;
        this.loadBundleAsset("res1", "./img/gold", cc.SpriteFrame, function(asset) {
          _this.imgIcon1.spriteFrame = asset;
        });
        this.loadBundleAsset("res1", "./data/level", cc.JsonAsset, function(asset) {
          _this.txtJson.string = JSON.stringify(asset.json);
        });
        this.loadBundleAsset("res2", "./img/sheep", cc.SpriteFrame, function(asset) {
          _this.imgIcon2.spriteFrame = asset;
        });
      };
      SubBagModule.prototype.loadBundleAsset = function(bundleName, resPath, resType, onComplete) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          try {
            var bundle = cc.assetManager.getBundle(bundleName);
            var asset = null === bundle || void 0 === bundle ? void 0 : bundle.get(resPath, resType);
            bundle && asset ? onComplete && onComplete(asset) : cc.assetManager.loadBundle(bundleName, function(err, bundle) {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  if (err) {
                    reject(err);
                    return [ 2 ];
                  }
                  bundle.load(resPath, resType, function(err, asset) {
                    if (err) reject(err); else {
                      onComplete && onComplete(asset);
                      resolve(null);
                    }
                  });
                  return [ 2 ];
                });
              });
            });
          } catch (err) {
            reject(err);
          }
        });
      };
      __decorate([ property(cc.Sprite) ], SubBagModule.prototype, "imgIcon1", void 0);
      __decorate([ property(cc.Sprite) ], SubBagModule.prototype, "imgIcon2", void 0);
      __decorate([ property(cc.Label) ], SubBagModule.prototype, "txtJson", void 0);
      SubBagModule = __decorate([ ccclass ], SubBagModule);
      return SubBagModule;
    }(cc.Component);
    exports.default = SubBagModule;
    cc._RF.pop();
  }, {} ],
  TilemapModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a2f2ayCaMJAlr4bd2ObRyR+", "TilemapModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TilemapModule = function(_super) {
      __extends(TilemapModule, _super);
      function TilemapModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tiledLayer = null;
        return _this;
      }
      TilemapModule.prototype.onLoad = function() {
        cc.resources.load("tilemap/shieldNode", function(err, prefab) {
          if (err) return;
          this.initScene(prefab);
        }.bind(this));
      };
      TilemapModule.prototype.initScene = function(prefab) {
        var posArr = [ cc.v2(-249, 96), cc.v2(-150, 76), cc.v2(-60, 54), cc.v2(-248, -144), cc.v2(-89, -34) ];
        var _loop_1 = function(i) {
          var shieldNode = cc.instantiate(prefab);
          shieldNode.x = posArr[i].x;
          shieldNode.y = posArr[i].y;
          this_1.tiledLayer.addUserNode(shieldNode);
          shieldNode.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
            var deltaMove = event.getLocation().sub(event.getPreviousLocation());
            shieldNode.x += deltaMove.x;
            shieldNode.y += deltaMove.y;
          });
        };
        var this_1 = this;
        for (var i = 0; i < posArr.length; i++) _loop_1(i);
      };
      __decorate([ property(cc.TiledLayer) ], TilemapModule.prototype, "tiledLayer", void 0);
      TilemapModule = __decorate([ ccclass ], TilemapModule);
      return TilemapModule;
    }(cc.Component);
    exports.default = TilemapModule;
    cc._RF.pop();
  }, {} ],
  TouchModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b762d6cYqpGTbOl+IZwnbiM", "TouchModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TouchModule = function(_super) {
      __extends(TouchModule, _super);
      function TouchModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txtTips = null;
        _this.imgIcon = null;
        _this.itemObj = {};
        return _this;
      }
      TouchModule.prototype.onEnable = function() {
        this.txtTips.string = "\u53ef\u4ee5\u5f00\u59cb\u89e6\u6478\u4e86";
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
      };
      TouchModule.prototype.onTouchStart = function(event) {
        event.stopPropagation();
        var item = this.itemObj[event.getID()];
        if (!item) {
          item = cc.instantiate(this.imgIcon);
          item.parent = this.node;
          item.width = 200;
          item.height = 200;
          this.itemObj[event.getID()] = item;
        }
        item.active = true;
        var pos = this.node.convertToNodeSpaceAR(event.getLocation());
        item.setPosition(pos);
      };
      TouchModule.prototype.onTouchMove = function(event) {
        event.stopPropagation();
        var item = this.itemObj[event.getID()];
        if (item) {
          var pos = this.node.convertToNodeSpaceAR(event.getLocation());
          item.setPosition(pos);
        }
      };
      TouchModule.prototype.onTouchEnd = function(event) {
        event.stopPropagation();
        var item = this.itemObj[event.getID()];
        item && (item.active = false);
      };
      TouchModule.prototype.onDisable = function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
      };
      __decorate([ property(cc.Label) ], TouchModule.prototype, "txtTips", void 0);
      __decorate([ property(cc.Node) ], TouchModule.prototype, "imgIcon", void 0);
      TouchModule = __decorate([ ccclass ], TouchModule);
      return TouchModule;
    }(cc.Component);
    exports.default = TouchModule;
    cc._RF.pop();
  }, {} ],
  VibrationModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "926b5YEIPZB2J5gWijJbbsZ", "VibrationModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var VibrationModule = function(_super) {
      __extends(VibrationModule, _super);
      function VibrationModule() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      VibrationModule.prototype.onClickVibration = function() {
        true;
        jsb["device"].vibrate(3);
      };
      VibrationModule = __decorate([ ccclass ], VibrationModule);
      return VibrationModule;
    }(cc.Component);
    exports.default = VibrationModule;
    cc._RF.pop();
  }, {} ],
  VideoModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98313bdNKxHPpcY3/KKliBC", "VideoModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var VideoModule = function(_super) {
      __extends(VideoModule, _super);
      function VideoModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.video = null;
        _this.txtContent = null;
        _this.btnName = null;
        return _this;
      }
      VideoModule.prototype.onEnable = function() {};
      VideoModule.prototype.onClickPlay = function() {
        this.video.play();
      };
      VideoModule.prototype.onClickPause = function() {
        this.video.pause();
      };
      VideoModule.prototype.onClickSelect = function() {
        if (this.video.resourceType === cc.VideoPlayer.ResourceType.REMOTE) {
          this.video.resourceType = cc.VideoPlayer.ResourceType.LOCAL;
          this.btnName.string = "Local";
        } else {
          this.video.remoteURL = "https://www.w3school.com.cn/i/movie.mp4";
          this.video.resourceType = cc.VideoPlayer.ResourceType.REMOTE;
          this.btnName.string = "Remote";
        }
      };
      VideoModule.prototype.onClickStop = function() {
        this.video.stop();
      };
      VideoModule.prototype.onClickFull = function() {
        this.video.isFullscreen = true;
      };
      VideoModule.prototype.onVideoPlayerEvent = function(sender, event) {
        this.txtContent.string = "Status: " + this.getStatus(event);
      };
      VideoModule.prototype.getStatus = function(event) {
        switch (event) {
         case cc.VideoPlayer.EventType.PLAYING:
          return "\u89c6\u9891\u6b63\u5728\u64ad\u653e\u4e2d";

         case cc.VideoPlayer.EventType.PAUSED:
          return "\u89c6\u9891\u6682\u505c\u64ad\u653e";

         case cc.VideoPlayer.EventType.STOPPED:
          return "\u89c6\u9891\u505c\u6b62\u64ad\u653e";

         case cc.VideoPlayer.EventType.COMPLETED:
          return "\u89c6\u9891\u64ad\u653e\u5b8c\u6210";

         case cc.VideoPlayer.EventType.META_LOADED:
          return "\u89c6\u9891\u52a0\u8f7d\u5b8c\u6210";

         case cc.VideoPlayer.EventType.CLICKED:
          return "\u89c6\u9891\u88ab\u7528\u6237\u70b9\u51fb\u4e86";

         case cc.VideoPlayer.EventType.READY_TO_PLAY:
          this.onChangeBtn(1);
          return "\u89c6\u9891\u51c6\u5907\u597d\u4e86";

         default:
          return "NONE";
        }
        return "";
      };
      VideoModule.prototype.onChangeBtn = function(type) {
        this.node.children.forEach(function(n) {
          var btn = n.getComponent(cc.Button);
          if (btn) if (type) {
            btn.enabled = true;
            btn.node.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
          } else {
            btn.enabled = false;
            btn.node.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
          }
        });
      };
      VideoModule.prototype.onDisable = function() {
        this.video.stop();
      };
      __decorate([ property(cc.VideoPlayer) ], VideoModule.prototype, "video", void 0);
      __decorate([ property(cc.Label) ], VideoModule.prototype, "txtContent", void 0);
      __decorate([ property(cc.Label) ], VideoModule.prototype, "btnName", void 0);
      VideoModule = __decorate([ ccclass ], VideoModule);
      return VideoModule;
    }(cc.Component);
    exports.default = VideoModule;
    cc._RF.pop();
  }, {} ],
  WebviewModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2cff8tFvdxLRr6G38n3B7Ni", "WebviewModule");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WebviewModule = function(_super) {
      __extends(WebviewModule, _super);
      function WebviewModule() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.webview = null;
        _this.txtContent = null;
        return _this;
      }
      WebviewModule.prototype.onEnable = function() {};
      WebviewModule.prototype.start = function() {};
      WebviewModule.prototype.onWebFinishLoad = function(sender, event) {
        var loadStatus = "";
        event === cc.WebView.EventType.LOADED ? loadStatus = " is loaded!" : event === cc.WebView.EventType.LOADING ? loadStatus = " is loading!" : event === cc.WebView.EventType.ERROR && (loadStatus = " load error!");
        this.txtContent.isValid && this.webview.isValid && (this.txtContent.string = this.webview.url + loadStatus);
      };
      __decorate([ property(cc.WebView) ], WebviewModule.prototype, "webview", void 0);
      __decorate([ property(cc.Label) ], WebviewModule.prototype, "txtContent", void 0);
      WebviewModule = __decorate([ ccclass ], WebviewModule);
      return WebviewModule;
    }(cc.Component);
    exports.default = WebviewModule;
    cc._RF.pop();
  }, {} ]
}, {}, [ "Load", "Main", "AudioManager", "MsgManager", "AnimationModule", "BlackTips", "ConsoleModule", "ETCModule", "EditboxModule", "FileOpModule", "GraphicsModule", "HMScore", "HotUpdate", "HotUpdateUI", "LabelModule", "LinkUrl", "LocalStorageModule", "MaskModule", "MotionStreakModule", "MoveModule", "NetWorkModule", "ParticleModule", "PlatformModule", "ScreenModule", "SensorModule", "ShaderModule", "SoundModule", "SubBagModule", "TilemapModule", "TouchModule", "VibrationModule", "VideoModule", "WebviewModule" ]);