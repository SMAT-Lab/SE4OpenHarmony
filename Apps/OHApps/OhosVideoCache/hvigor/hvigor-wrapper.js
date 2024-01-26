"use strict";
var u = require("path"), D = require("os"), e = require("fs"), t = require("crypto"), r = require("child_process"),
    n = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {
    }, i = {}, C = {}, F = n && n.__importDefault || function (u) {
        return u && u.__esModule ? u : { default: u }
    };
Object.defineProperty(C, "__esModule", { value: !0 }), C.maxPathLength = C.isMac = C.isLinux = C.isWindows = void 0;
const E = F(D), A = "Windows_NT", o = "Darwin";

function a() {
    return E.default.type() === A
}

function c() {
    return E.default.type() === o
}

C.isWindows = a, C.isLinux = function () {
    return "Linux" === E.default.type()
}, C.isMac = c, C.maxPathLength = function () {
    return c() ? 1016 : a() ? 259 : 4095
}, function(e){
    var t = n && n.__createBinding || (Object.create ? function (u, D, e, t) {
        void 0 === t && (t = e);
        var r = Object.getOwnPropertyDescriptor(D, e);
        r && !("get" in r ? !D.__esModule : r.writable || r.configurable) || (r = { enumerable: !0, get: function () {
            return D[e]
        } }), Object.defineProperty(u, t, r)
    } : function (u, D, e, t) {
        void 0 === t && (t = e), u[t] = D[e]
    }), r = n && n.__setModuleDefault || (Object.create ? function (u, D) {
        Object.defineProperty(u, "default", { enumerable: !0, value: D })
    } : function (u, D) {
        u.default = D
    }), i = n && n.__importStar || function (u) {
        if (u && u.__esModule) return u;
        var D = {};
        if (null != u) for (var e in u) "default" !== e && Object.prototype.hasOwnProperty.call(u, e) && t(D, u, e);
        return r(D, u), D
    };
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.WORK_SPACE = e.HVIGOR_PROJECT_WRAPPER_HOME = e.HVIGOR_PROJECT_ROOT_DIR = e.HVIGOR_PROJECT_CACHES_HOME = e.HVIGOR_PNPM_STORE_PATH = e.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH = e.PROJECT_CACHES = e.HVIGOR_WRAPPER_TOOLS_HOME = e.HVIGOR_USER_HOME = e.DEFAULT_PACKAGE_JSON = e.DEFAULT_HVIGOR_CONFIG_JSON_FILE_NAME = e.PNPM = e.HVIGOR = e.NPM_TOOL = e.PNPM_TOOL = e.HVIGOR_ENGINE_PACKAGE_NAME = void 0;
    const F = i(D), E = i(u), A = C;
    e.HVIGOR_ENGINE_PACKAGE_NAME = "@ohos/hvigor", e.PNPM_TOOL = (0, A.isWindows)() ? "pnpm.cmd" : "pnpm", e.NPM_TOOL = (0, A.isWindows)() ? "npm.cmd" : "npm", e.HVIGOR = "hvigor", e.PNPM = "pnpm", e.DEFAULT_HVIGOR_CONFIG_JSON_FILE_NAME = "hvigor-config.json5", e.DEFAULT_PACKAGE_JSON = "package.json", e.HVIGOR_USER_HOME = E.resolve(F.homedir(), ".hvigor"), e.HVIGOR_WRAPPER_TOOLS_HOME = E.resolve(e.HVIGOR_USER_HOME, "wrapper", "tools"), e.PROJECT_CACHES = "project_caches", e.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH = E.resolve(e.HVIGOR_WRAPPER_TOOLS_HOME, "node_modules", ".bin", e.PNPM_TOOL), e.HVIGOR_PNPM_STORE_PATH = E.resolve(e.HVIGOR_USER_HOME, "caches"), e.HVIGOR_PROJECT_CACHES_HOME = E.resolve(e.HVIGOR_USER_HOME, e.PROJECT_CACHES), e.HVIGOR_PROJECT_ROOT_DIR = process.cwd(), e.HVIGOR_PROJECT_WRAPPER_HOME = E.resolve(e.HVIGOR_PROJECT_ROOT_DIR, e.HVIGOR), e.WORK_SPACE = "workspace"
}(i);
var s = {}, l = {};
Object.defineProperty(l, "__esModule", {
    value: !0
}), l.logInfoPrintConsole = l.logErrorAndExit = void 0, l.logErrorAndExit = function (u) {
    u instanceof Error ? console.error(u.message) : console.error(u), process.exit(-1)
}, l.logInfoPrintConsole = function (u) {
    console.log(u)
};
var B = n && n.__createBinding || (Object.create ? function (u, D, e, t) {
    void 0 === t && (t = e);
    var r = Object.getOwnPropertyDescriptor(D, e);
    r && !("get" in r ? !D.__esModule : r.writable || r.configurable) || (r = { enumerable: !0, get: function () {
        return D[e]
    } }), Object.defineProperty(u, t, r)
} : function (u, D, e, t) {
    void 0 === t && (t = e), u[t] = D[e]
}), d = n && n.__setModuleDefault || (Object.create ? function (u, D) {
    Object.defineProperty(u, "default", { enumerable: !0, value: D })
} : function (u, D) {
    u.default = D
}), f = n && n.__importStar || function (u) {
    if (u && u.__esModule) return u;
    var D = {};
    if (null != u) for (var e in u) "default" !== e && Object.prototype.hasOwnProperty.call(u, e) && B(D, u, e);
    return d(D, u), D
};
Object.defineProperty(s, "__esModule", { value: !0 });
var _ = s.executeBuild = void 0;
const p = f(e), O = f(u), h = l;
_ = s.executeBuild = function (u) {
    const D = O.resolve(u, "node_modules", "@ohos", "hvigor", "bin", "hvigor.js");
    try {
        const u = p.realpathSync(D);
        require(u)
    } catch (e) {
        (0, h.logErrorAndExit)(`Error: ENOENT: no such file ${D},delete ${u} and retry.`)
    }
};
var P = {}, v = {};
!function(u){
    var D = n && n.__importDefault || function (u) {
        return u && u.__esModule ? u : { default: u }
    };
    Object.defineProperty(u, "__esModule", { value: !0 }), u.hashFile = u.hash = u.createHash = void 0;
    const r = D(t), i = D(e);
    u.createHash = (u = "MD5") => r.default.createHash(u);
    u.hash = (D, e) => (0, u.createHash)(e).update(D).digest("hex");
    u.hashFile = (D, e) => {
        if (i.default.existsSync(D)) return (0, u.hash)(i.default.readFileSync(D, "utf-8"), e)
    }
}(v);
var g = {}, m = {}, R = {};
Object.defineProperty(R, "__esModule", { value: !0 }), R.Unicode = void 0;

class y {
}

R.Unicode = y, y.SPACE_SEPARATOR = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, y.ID_START = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, y.ID_CONTINUE = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, Object.defineProperty(m, "__esModule", {
    value: !0
}), m.JudgeUtil = void 0;
const I = R;
m.JudgeUtil = class {
    static isIgnoreChar(u) {
        return "string" == typeof u && ("\t" === u || "\v" === u || "\f" === u || " " === u || " " === u || "\ufeff" === u || "\n" === u || "\r" === u || "\u2028" === u || "\u2029" === u)
    }

    static isSpaceSeparator(u) {
        return "string" == typeof u && I.Unicode.SPACE_SEPARATOR.test(u)
    }

    static isIdStartChar(u) {
        return "string" == typeof u && (u >= "a" && u <= "z" || u >= "A" && u <= "Z" || "$" === u || "_" === u || I.Unicode.ID_START.test(u))
    }

    static isIdContinueChar(u) {
        return "string" == typeof u && (u >= "a" && u <= "z" || u >= "A" && u <= "Z" || u >= "0" && u <= "9" || "$" === u || "_" === u || "‌" === u || "‍" === u || I.Unicode.ID_CONTINUE.test(u))
    }

    static isDigitWithoutZero(u) {
        return /[1-9]/.test(u)
    }

    static isDigit(u) {
        return "string" == typeof u && /[0-9]/.test(u)
    }

    static isHexDigit(u) {
        return "string" == typeof u && /[0-9A-Fa-f]/.test(u)
    }
};
var N = n && n.__importDefault || function (u) {
    return u && u.__esModule ? u : { default: u }
};
Object.defineProperty(g, "__esModule", { value: !0 }), g.parseJsonText = g.parseJsonFile = void 0;
const b = N(e), S = N(D), w = N(u), H = m;
var x;
!function(u){
    u[u.Char=0] = "Char", u[u.EOF=1] = "EOF", u[u.Identifier=2] = "Identifier"
}(x || (x = {}));
let M, T, V, G, j, J, W = "start", U = [], L = 0, $ = 1, k = 0, K = !1, z = "default", q = "'", Z = 1;

function X(u, D = !1) {
    T = String(u), W = "start", U = [], L = 0, $ = 1, k = 0, G = void 0, K = D;
    do {
        M = Q(), nu[W]()
    } while ("eof" !== M.type);
    return G
}

function Q() {
    for (z = "default", j = "", q = "'", Z = 1;; ) {
        J = Y();
        const u = Du[z]();
        if (u) return u
    }
}

function Y() {
    if (T[L]) return String.fromCodePoint(T.codePointAt(L))
}

function uu() {
    const u = Y();
    return "\n" === u ? ($++, k = 0) : u ? k += u.length : k++, u && (L += u.length), u
}

g.parseJsonFile = function (u, D = !1, e = "utf-8") {
    const t = b.default.readFileSync(w.default.resolve(u), { encoding: e });
    try {
        return X(t, D)
    } catch (D) {
        if (D instanceof SyntaxError) {
            const e = D.message.split("at");
            if (2 === e.length) throw new Error(`${e[0].trim()}${S.default.EOL}\t at ${u}:${e[1].trim()}`)
        }
        throw new Error(`${u} is not in valid JSON/JSON5 format.`)
    }
}, g.parseJsonText = X;
const Du = {
    default() {
        switch (J) {
            case "/":
                return uu(), void (z = "comment");
            case void 0:
                return uu(), eu("eof")
        }
        if (!H.JudgeUtil.isIgnoreChar(J) && !H.JudgeUtil.isSpaceSeparator(J)) return Du[W]();
        uu()
    },
    start() {
        z = "value"
    },
    beforePropertyName() {
        switch (J) {
            case "$":
            case "_":
                return j = uu(), void (z = "identifierName");
            case "\\":
                return uu(), void (z = "identifierNameStartEscape");
            case "}":
                return eu("punctuator", uu());
            case '"':
            case "'":
                return q = J, uu(), void (z = "string")
        }
        if (H.JudgeUtil.isIdStartChar(J)) return j += uu(), void (z = "identifierName");
        throw Eu(x.Char, uu())
    },
    afterPropertyName() {
        if (":" === J) return eu("punctuator", uu());
        throw Eu(x.Char, uu())
    },
    beforePropertyValue() {
        z = "value"
    },
    afterPropertyValue() {
        switch (J) {
            case ",":
            case "}":
                return eu("punctuator", uu())
        }
        throw Eu(x.Char, uu())
    },
    beforeArrayValue() {
        if ("]" === J) return eu("punctuator", uu());
        z = "value"
    },
    afterArrayValue() {
        switch (J) {
            case ",":
            case "]":
                return eu("punctuator", uu())
        }
        throw Eu(x.Char, uu())
    },
    end() {
        throw Eu(x.Char, uu())
    },
    comment() {
        switch (J) {
            case "*":
                return uu(), void (z = "multiLineComment");
            case "/":
                return uu(), void (z = "singleLineComment")
        }
        throw Eu(x.Char, uu())
    },
    multiLineComment() {
        switch (J) {
            case "*":
                return uu(), void (z = "multiLineCommentAsterisk");
            case void 0:
                throw Eu(x.Char, uu())
        }
        uu()
    },
    multiLineCommentAsterisk() {
        switch (J) {
            case "*":
                return void uu();
            case "/":
                return uu(), void (z = "default");
            case void 0:
                throw Eu(x.Char, uu())
        }
        uu(), z = "multiLineComment"
    },
    singleLineComment() {
        switch (J) {
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
                return uu(), void (z = "default");
            case void 0:
                return uu(), eu("eof")
        }
        uu()
    },
    value() {
        switch (J) {
            case "{":
            case "[":
                return eu("punctuator", uu());
            case "n":
                return uu(), tu("ull"), eu("null", null);
            case "t":
                return uu(), tu("rue"), eu("boolean",!0);
            case "f":
                return uu(), tu("alse"), eu("boolean",!1);
            case "-":
            case "+":
                return "-" === uu() && (Z = -1), void (z = "numerical");
            case ".":
            case "0":
            case "I":
            case "N":
                return void (z = "numerical");
            case '"':
            case "'":
                return q = J, uu(), j = "", void (z = "string")
        }
        if (void 0 === J || !H.JudgeUtil.isDigitWithoutZero(J)) throw Eu(x.Char, uu());
        z = "numerical"
    },
    numerical() {
        switch (J) {
            case ".":
                return j = uu(), void (z = "decimalPointLeading");
            case "0":
                return j = uu(), void (z = "zero");
            case "I":
                return uu(), tu("nfinity"), eu("numeric", Z * (1 / 0));
            case "N":
                return uu(), tu("aN"), eu("numeric", NaN)
        }
        if (void 0 !== J && H.JudgeUtil.isDigitWithoutZero(J)) return j = uu(), void (z = "decimalInteger");
        throw Eu(x.Char, uu())
    },
    zero() {
        switch (J) {
            case ".":
            case "e":
            case "E":
                return void (z = "decimal");
            case "x":
            case "X":
                return j += uu(), void (z = "hexadecimal")
        }
        return eu("numeric", 0)
    },
    decimalInteger() {
        switch (J) {
            case ".":
            case "e":
            case "E":
                return void (z = "decimal")
        }
        if (!H.JudgeUtil.isDigit(J)) return eu("numeric", Z * Number(j));
        j += uu()
    },
    decimal() {
        switch (J) {
            case ".":
                j += uu(), z = "decimalFraction";
                break;
            case "e":
            case "E":
                j += uu(), z = "decimalExponent"
        }
    },
    decimalPointLeading() {
        if (H.JudgeUtil.isDigit(J)) return j += uu(), void (z = "decimalFraction");
        throw Eu(x.Char, uu())
    },
    decimalFraction() {
        switch (J) {
            case "e":
            case "E":
                return j += uu(), void (z = "decimalExponent")
        }
        if (!H.JudgeUtil.isDigit(J)) return eu("numeric", Z * Number(j));
        j += uu()
    },
    decimalExponent() {
        switch (J) {
            case "+":
            case "-":
                return j += uu(), void (z = "decimalExponentSign")
        }
        if (H.JudgeUtil.isDigit(J)) return j += uu(), void (z = "decimalExponentInteger");
        throw Eu(x.Char, uu())
    },
    decimalExponentSign() {
        if (H.JudgeUtil.isDigit(J)) return j += uu(), void (z = "decimalExponentInteger");
        throw Eu(x.Char, uu())
    },
    decimalExponentInteger() {
        if (!H.JudgeUtil.isDigit(J)) return eu("numeric", Z * Number(j));
        j += uu()
    },
    hexadecimal() {
        if (H.JudgeUtil.isHexDigit(J)) return j += uu(), void (z = "hexadecimalInteger");
        throw Eu(x.Char, uu())
    },
    hexadecimalInteger() {
        if (!H.JudgeUtil.isHexDigit(J)) return eu("numeric", Z * Number(j));
        j += uu()
    },
    identifierNameStartEscape() {
        if ("u" !== J) throw Eu(x.Char, uu());
        uu();
        const u = ru();
        switch (u) {
            case "$":
            case "_":
                break;
            default:
                if (!H.JudgeUtil.isIdStartChar(u)) throw Eu(x.Identifier)
        }
        j += u, z = "identifierName"
    },
    identifierName() {
        switch (J) {
            case "$":
            case "_":
            case "‌":
            case "‍":
                return void (j += uu());
            case "\\":
                return uu(), void (z = "identifierNameEscape")
        }
        if (!H.JudgeUtil.isIdContinueChar(J)) return eu("identifier", j);
        j += uu()
    },
    identifierNameEscape() {
        if ("u" !== J) throw Eu(x.Char, uu());
        uu();
        const u = ru();
        switch (u) {
            case "$":
            case "_":
            case "‌":
            case "‍":
                break;
            default:
                if (!H.JudgeUtil.isIdContinueChar(u)) throw Eu(x.Identifier)
        }
        j += u, z = "identifierName"
    },
    string() {
        switch (J) {
            case "\\":
                return uu(), void (j += function(){
                    const u = Y(), D = function(){
                        switch (Y()) {
                            case "b":
                                return uu(), "\b";
                            case "f":
                                return uu(), "\f";
                            case "n":
                                return uu(), "\n";
                            case "r":
                                return uu(), "\r";
                            case "t":
                                return uu(), "\t";
                            case "v":
                                return uu(), "\v"
                        }
                        return
                    }();
                    if (D) return D;
                    switch (u) {
                        case "0":
                            if (uu(), H.JudgeUtil.isDigit(Y())) throw Eu(x.Char, uu());
                            return "\0";
                        case "x":
                            return uu(), function(){
                                let u = "", D = Y();
                                if (!H.JudgeUtil.isHexDigit(D)) throw Eu(x.Char, uu());
                                if (u += uu(), D = Y(),!H.JudgeUtil.isHexDigit(D)) throw Eu(x.Char, uu());
                                return u += uu(), String.fromCodePoint(parseInt(u, 16))
                            }();
                        case "u":
                            return uu(), ru();
                        case "\n":
                        case "\u2028":
                        case "\u2029":
                            return uu(), "";
                        case "\r":
                            return uu(), "\n" === Y() && uu(), ""
                    }
                    if (void 0 === u || H.JudgeUtil.isDigitWithoutZero(u)) throw Eu(x.Char, uu());
                    return uu()
                }());
            case '"':
            case "'":
                if (J === q) {
                    const u = eu("string", j);
                    return uu(), u
                }
                return void (j += uu());
            case "\n":
            case "\r":
            case void 0:
                throw Eu(x.Char, uu());
            case "\u2028":
            case "\u2029":
                !function(u){
                    console.warn(`JSON5: '${Fu(u)}' in strings is not valid ECMAScript; consider escaping.`)
                }(J)
        }
        j += uu()
    }
};

function eu(u, D) {
    return { type: u, value: D, line: $, column: k }
}

function tu(u) {
    for (const D of u) {
        if (Y() !== D) throw Eu(x.Char, uu());
        uu()
    }
}

function ru() {
    let u = "", D = 4;
    for (; D-- > 0; ) {
        const D = Y();
        if (!H.JudgeUtil.isHexDigit(D)) throw Eu(x.Char, uu());
        u += uu()
    }
    return String.fromCodePoint(parseInt(u, 16))
}

const nu = {
    start() {
        if ("eof" === M.type) throw Eu(x.EOF);
        iu()
    },
    beforePropertyName() {
        switch (M.type) {
            case "identifier":
            case "string":
                return V = M.value, void (W = "afterPropertyName");
            case "punctuator":
                return void Cu();
            case "eof":
                throw Eu(x.EOF)
        }
    },
    afterPropertyName() {
        if ("eof" === M.type) throw Eu(x.EOF);
        W = "beforePropertyValue"
    },
    beforePropertyValue() {
        if ("eof" === M.type) throw Eu(x.EOF);
        iu()
    },
    afterPropertyValue() {
        if ("eof" === M.type) throw Eu(x.EOF);
        switch (M.value) {
            case ",":
                return void (W = "beforePropertyName");
            case "}":
                Cu()
        }
    },
    beforeArrayValue() {
        if ("eof" === M.type) throw Eu(x.EOF);
        "punctuator" !== M.type || "]" !== M.value ? iu() : Cu()
    },
    afterArrayValue() {
        if ("eof" === M.type) throw Eu(x.EOF);
        switch (M.value) {
            case ",":
                return void (W = "beforeArrayValue");
            case "]":
                Cu()
        }
    },
    end() {
    }
};

function iu() {
    const u = function(){
        let u;
        switch (M.type) {
            case "punctuator":
                switch (M.value) {
                    case "{":
                        u = {};
                        break;
                    case "[":
                        u = []
                }
                break;
            case "null":
            case "boolean":
            case "numeric":
            case "string":
                u = M.value
        }
        return u
    }();
    if (K && "object" == typeof u && (u._line = $, u._column = k), void 0 === G) G = u; else {
        const D = U[U.length-1];
        Array.isArray(D) ? K && "object" != typeof u ? D.push({
            value: u,
            _line: $,
            _column: k
        }) : D.push(u) : D[V] = K && "object" != typeof u ? { value: u, _line: $, _column: k } : u
    }
    !function(u){
        if (u && "object" == typeof u) U.push(u), W = Array.isArray(u) ? "beforeArrayValue" : "beforePropertyName"; else {
            const u = U[U.length-1];
            W = u ? Array.isArray(u) ? "afterArrayValue" : "afterPropertyValue" : "end"
        }
    }(u)
}

function Cu() {
    U.pop();
    const u = U[U.length-1];
    W = u ? Array.isArray(u) ? "afterArrayValue" : "afterPropertyValue" : "end"
}

function Fu(u) {
    const D = {
        "'": "\\'",
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\v": "\\v",
        "\0": "\\0",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
    };
    if (D[u]) return D[u];
    if (u < " ") {
        const D = u.charCodeAt(0).toString(16);
        return `\\x${`00${D}`.substring(D.length)}`
    }
    return u
}

function Eu(u, D) {
    let e = "";
    switch (u) {
        case x.Char:
            e = void 0 === D ? `JSON5: invalid end of input at ${$}:${k}` : `JSON5: invalid character '${Fu(D)}' at ${$}:${k}`;
            break;
        case x.EOF:
            e = `JSON5: invalid end of input at ${$}:${k}`;
            break;
        case x.Identifier:
            k -= 5, e = `JSON5: invalid identifier character at ${$}:${k}`
    }
    const t = new Au(e);
    return t.lineNumber = $, t.columnNumber = k, t
}

class Au extends SyntaxError {
}

var ou = {}, au = n && n.__createBinding || (Object.create ? function (u, D, e, t) {
    void 0 === t && (t = e);
    var r = Object.getOwnPropertyDescriptor(D, e);
    r && !("get" in r ? !D.__esModule : r.writable || r.configurable) || (r = { enumerable: !0, get: function () {
        return D[e]
    } }), Object.defineProperty(u, t, r)
} : function (u, D, e, t) {
    void 0 === t && (t = e), u[t] = D[e]
}), cu = n && n.__setModuleDefault || (Object.create ? function (u, D) {
    Object.defineProperty(u, "default", { enumerable: !0, value: D })
} : function (u, D) {
    u.default = D
}), su = n && n.__importStar || function (u) {
    if (u && u.__esModule) return u;
    var D = {};
    if (null != u) for (var e in u) "default" !== e && Object.prototype.hasOwnProperty.call(u, e) && au(D, u, e);
    return cu(D, u), D
}, lu = n && n.__importDefault || function (u) {
    return u && u.__esModule ? u : { default: u }
};
Object.defineProperty(ou, "__esModule", {
    value: !0
}), ou.isFileExists = ou.offlinePluginConversion = ou.executeCommand = ou.getNpmPath = ou.hasNpmPackInPaths = void 0;
const Bu = r, du = lu(e), fu = su(u), _u = i, pu = l;
ou.hasNpmPackInPaths = function (u, D) {
    try {
        return require.resolve(u, { paths: [...D] }),!0
    } catch (u) {
        return !1
    }
}, ou.getNpmPath = function () {
    const u = process.execPath;
    return fu.join(fu.dirname(u), _u.NPM_TOOL)
}, ou.executeCommand = function (u, D, e) {
    0 !== (0, Bu.spawnSync)(u, D, e).status && (0, pu.logErrorAndExit)(`Error: ${u} ${D} execute failed.See above for details.`)
}, ou.offlinePluginConversion = function (u, D) {
    return D.startsWith("file:") || D.endsWith(".tgz") ? fu.resolve(u, _u.HVIGOR, D.replace("file:", "")) : D
}, ou.isFileExists = function (u) {
    return du.default.existsSync(u) && du.default.statSync(u).isFile()
};
var Ou = n && n.__createBinding || (Object.create ? function (u, D, e, t) {
    void 0 === t && (t = e);
    var r = Object.getOwnPropertyDescriptor(D, e);
    r && !("get" in r ? !D.__esModule : r.writable || r.configurable) || (r = { enumerable: !0, get: function () {
        return D[e]
    } }), Object.defineProperty(u, t, r)
} : function (u, D, e, t) {
    void 0 === t && (t = e), u[t] = D[e]
}), hu = n && n.__setModuleDefault || (Object.create ? function (u, D) {
    Object.defineProperty(u, "default", { enumerable: !0, value: D })
} : function (u, D) {
    u.default = D
}), Pu = n && n.__importStar || function (u) {
    if (u && u.__esModule) return u;
    var D = {};
    if (null != u) for (var e in u) "default" !== e && Object.prototype.hasOwnProperty.call(u, e) && Ou(D, u, e);
    return hu(D, u), D
}, vu = n && n.__importDefault || function (u) {
    return u && u.__esModule ? u : { default: u }
};
Object.defineProperty(P, "__esModule", { value: !0 });
var gu = P.initProjectWorkSpace = void 0;
const mu = Pu(e), Ru = vu(D), yu = Pu(u), Iu = v, Nu = i, bu = g, Su = l, wu = ou;
let Hu, xu, Mu;

function Tu(u, D, e) {
    return void 0 !== e.dependencies && (0, wu.offlinePluginConversion)(Nu.HVIGOR_PROJECT_ROOT_DIR, D.dependencies[u]) === yu.normalize(e.dependencies[u])
}

function Vu() {
    const u = yu.join(Mu, Nu.WORK_SPACE);
    if ((0, Su.logInfoPrintConsole)("Hvigor cleaning..."),!mu.existsSync(u)) return;
    const D = mu.readdirSync(u);
    if (!D || 0 === D.length) return;
    const e = yu.resolve(Mu, "node_modules", "@ohos", "hvigor", "bin", "hvigor.js");
    mu.existsSync(e) && (0, wu.executeCommand)(process.argv[0], [e, "--stop-daemon"], {});
    try {
        D.forEach((D => {
            mu.rmSync(yu.resolve(u, D), { recursive: !0 })
        }))
    } catch (D) {
        (0, Su.logErrorAndExit)(`The hvigor build tool cannot be installed. Please manually clear the workspace directory and synchronize the project again.\n\n      Workspace Path: ${u}.`)
    }
}

gu = P.initProjectWorkSpace = function () {
    if (Hu = function(){
        const u = yu.resolve(Nu.HVIGOR_PROJECT_WRAPPER_HOME, Nu.DEFAULT_HVIGOR_CONFIG_JSON_FILE_NAME);
        mu.existsSync(u) || (0, Su.logErrorAndExit)(`Error: Hvigor config file ${u} does not exist.`);
        return (0, bu.parseJsonFile)(u)
    }(), Mu = function(u){
        let D;
        D = function(u){
            let D = u.hvigorVersion;
            if (D.startsWith("file:") || D.endsWith(".tgz")) return !1;
            const e = u.dependencies, t = Object.getOwnPropertyNames(e);
            for (const u of t) {
                const D = e[u];
                if (D.startsWith("file:") || D.endsWith(".tgz")) return !1
            }
            if (1 === t.length && "@ohos/hvigor-ohos-plugin" === t[0]) return D > "2.5.0";
            return !1
        }(u) ? function(u){
            let D = `${Nu.HVIGOR_ENGINE_PACKAGE_NAME}@${u.hvigorVersion}`;
            const e = u.dependencies;
            if (e) {
                Object.getOwnPropertyNames(e).sort().forEach((u => {
                    D += `,${u}@${e[u]}`
                }))
            }
            return (0, Iu.hash)(D)
        }(u) : (0, Iu.hash)(process.cwd());
        return yu.resolve(Ru.default.homedir(), ".hvigor", "project_caches", D)
    }(Hu), xu = function(){
        const u = yu.resolve(Mu, Nu.WORK_SPACE, Nu.DEFAULT_PACKAGE_JSON);
        return mu.existsSync(u) ? (0, bu.parseJsonFile)(u) : { dependencies: {} }
    }(),!(0, wu.hasNpmPackInPaths)(Nu.HVIGOR_ENGINE_PACKAGE_NAME, [yu.join(Mu, Nu.WORK_SPACE)]) || (0, wu.offlinePluginConversion)(Nu.HVIGOR_PROJECT_ROOT_DIR, Hu.hvigorVersion) !== xu.dependencies[Nu.HVIGOR_ENGINE_PACKAGE_NAME] || !function(){

        function u(u) {
            const D = null == u ? void 0 : u.dependencies;
            return void 0 === D ? 0 : Object.getOwnPropertyNames(D).length
        }

        const D = u(Hu), e = u(xu);
        if (D + 1 !== e) return !1;
        for (const u in null == Hu ? void 0 : Hu.dependencies) if (!(0, wu.hasNpmPackInPaths)(u, [yu.join(Mu, Nu.WORK_SPACE)]) || !Tu(u, Hu, xu)) return !1;
        return !0
    }()) {
        Vu();
        try {
            !function(){
                (0, Su.logInfoPrintConsole)("Hvigor installing...");
                for (const u in Hu.dependencies) Hu.dependencies[u] && (Hu.dependencies[u] = (0, wu.offlinePluginConversion)(Nu.HVIGOR_PROJECT_ROOT_DIR, Hu.dependencies[u]));
                const u = { dependencies: { ...Hu.dependencies } };
                u.dependencies[Nu.HVIGOR_ENGINE_PACKAGE_NAME] = (0, wu.offlinePluginConversion)(Nu.HVIGOR_PROJECT_ROOT_DIR, Hu.hvigorVersion);
                const D = yu.join(Mu, Nu.WORK_SPACE);
                try {
                    mu.mkdirSync(D, { recursive: !0 });
                    const e = yu.resolve(D, Nu.DEFAULT_PACKAGE_JSON);
                    mu.writeFileSync(e, JSON.stringify(u))
                } catch (u) {
                    (0, Su.logErrorAndExit)(u)
                }
                (function () {
                    const u = ["config", "set", "store-dir", Nu.HVIGOR_PNPM_STORE_PATH],
                        D = { cwd: yu.join(Mu, Nu.WORK_SPACE), stdio: ["inherit", "inherit", "inherit"] };
                    (0, wu.executeCommand)(Nu.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH, u, D)
                })(), function(){
                    const u = ["install"],
                        D = { cwd: yu.join(Mu, Nu.WORK_SPACE), stdio: ["inherit", "inherit", "inherit"] };
                    (0, wu.executeCommand)(Nu.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH, u, D)
                }(), (0, Su.logInfoPrintConsole)("Hvigor install success.")
            }()
        } catch (u) {
            Vu()
        }
    }
    return Mu
};
var Gu = {};
!function(t){
    var C = n && n.__createBinding || (Object.create ? function (u, D, e, t) {
        void 0 === t && (t = e);
        var r = Object.getOwnPropertyDescriptor(D, e);
        r && !("get" in r ? !D.__esModule : r.writable || r.configurable) || (r = { enumerable: !0, get: function () {
            return D[e]
        } }), Object.defineProperty(u, t, r)
    } : function (u, D, e, t) {
        void 0 === t && (t = e), u[t] = D[e]
    }), F = n && n.__setModuleDefault || (Object.create ? function (u, D) {
        Object.defineProperty(u, "default", { enumerable: !0, value: D })
    } : function (u, D) {
        u.default = D
    }), E = n && n.__importStar || function (u) {
        if (u && u.__esModule) return u;
        var D = {};
        if (null != u) for (var e in u) "default" !== e && Object.prototype.hasOwnProperty.call(u, e) && C(D, u, e);
        return F(D, u), D
    }, A = n && n.__importDefault || function (u) {
        return u && u.__esModule ? u : { default: u }
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.executeInstallPnpm = t.isPnpmInstalled = t.environmentHandler = t.checkNpmConifg = t.PNPM_VERSION = void 0;
    const o = r, a = E(e), c = A(D), s = E(u), B = i, d = l, f = ou;
    t.PNPM_VERSION = "7.30.0", t.checkNpmConifg = function () {
        const u = s.resolve(B.HVIGOR_PROJECT_ROOT_DIR, ".npmrc"), D = s.resolve(c.default.homedir(), ".npmrc");
        if ((0, f.isFileExists)(u) || (0, f.isFileExists)(D)) return;
        const e = (0, f.getNpmPath)(),
            t = (0, o.spawnSync)(e, ["config", "get", "prefix"], { cwd: B.HVIGOR_PROJECT_ROOT_DIR });
        if (0 !== t.status || !t.stdout) return void (0, d.logErrorAndExit)("Error: The hvigor depends on the npmrc file. Configure the npmrc file first.");
        const r = s.resolve(`${t.stdout}`.replace(/[\r\n]/gi, ""), ".npmrc");
        (0, f.isFileExists)(r) || (0, d.logErrorAndExit)("Error: The hvigor depends on the npmrc file. Configure the npmrc file first.")
    }, t.environmentHandler = function () {
        process.env["npm_config_update-notifier"] = "false"
    }, t.isPnpmInstalled = function () {
        return!!a.existsSync(B.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH) && (0, f.hasNpmPackInPaths)("pnpm", [B.HVIGOR_WRAPPER_TOOLS_HOME])
    }, t.executeInstallPnpm = function () {
        (0, d.logInfoPrintConsole)(`Installing pnpm@${t.PNPM_VERSION}...`);
        const u = (0, f.getNpmPath)();
        !function(){
            const u = s.resolve(B.HVIGOR_WRAPPER_TOOLS_HOME, B.DEFAULT_PACKAGE_JSON);
            try {
                a.existsSync(B.HVIGOR_WRAPPER_TOOLS_HOME) || a.mkdirSync(B.HVIGOR_WRAPPER_TOOLS_HOME, {
                    recursive: !0
                });
                const D = { dependencies: {} };
                D.dependencies[B.PNPM] = t.PNPM_VERSION, a.writeFileSync(u, JSON.stringify(D))
            } catch (D) {
                (0, d.logErrorAndExit)(`Error: EPERM: operation not permitted,create ${u} failed.`)
            }
        }(), (0, f.executeCommand)(u, ["install", "pnpm"], {
            cwd: B.HVIGOR_WRAPPER_TOOLS_HOME,
            stdio: ["inherit", "inherit", "inherit"],
            env: process.env
        }), (0, d.logInfoPrintConsole)("Pnpm install success.")
    }
}(Gu), function(){
    Gu.checkNpmConifg(), Gu.environmentHandler(), Gu.isPnpmInstalled() || Gu.executeInstallPnpm();
    const D = gu();
    _(u.join(D, i.WORK_SPACE))
}();