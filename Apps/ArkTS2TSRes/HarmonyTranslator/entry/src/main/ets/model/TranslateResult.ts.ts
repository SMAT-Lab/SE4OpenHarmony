import List from '@ohos.util.List';
export class TranslationResult {
    query: string;
    translations: TranslationGroup[];
    from: string;
    to: string;
}
export class TranslationGroup {
    apiName: string;
    dst: string[];
    error: string;
    log_id: number;
}
export class TranslateLanguage {
    constructor(name: string, code: string) {
        this.name = name;
        this.code = code;
    }
    name: string;
    code: string;
    toJSON(): object {
        return {
            name: this.name,
            code: this.code,
        };
    }
    static fromJSON(json: object): TranslateLanguage {
        return new TranslateLanguage(json['name'], json['code']);
    }
}
export class LanguageGroup {
    constructor(groupName: string, languages: TranslateLanguage[]) {
        this.groupName = groupName;
        this.languages = languages;
    }
    groupName: string;
    languages: TranslateLanguage[];
}
////// 百度机器翻译通用版
export class BaiduAIGeneralTranslationResult {
    errorCode: string;
    errorMessage: string;
    logId: string;
    result: {
        dst: string;
        src: string;
    }[];
    static fromJSON(json: object): BaiduAIGeneralTranslationResult {
        let tmp = new BaiduAIGeneralTranslationResult();
        tmp.errorCode = json['error_code'];
        tmp.errorMessage = json['error_msg'];
        tmp.logId = json['log_id'];
        let resultJSON = json['result'];
        if (resultJSON) {
            let trans_result_arr: JSON[] = resultJSON['trans_result'];
            if (trans_result_arr && trans_result_arr.length > 0) {
                tmp.result = [];
                trans_result_arr.forEach(trans_result => {
                    tmp.result.push({ dst: trans_result['dst'], src: trans_result['src'] });
                });
            }
        }
        return tmp;
    }
}
////// 百度机器翻译词典版
export class MeansInSimple {
    means: string[];
    part: string;
    text: string;
}
export class BaiduAIDictSimpleMeans {
    from: string;
    word_symbol: string;
    word_name: string;
    means: MeansInSimple[];
    static fromJSON(json: Object): BaiduAIDictSimpleMeans {
        let tmp = new BaiduAIDictSimpleMeans();
        if (json) {
            tmp.from = json['from'];
            tmp.word_name = json['word_name'];
            let symbolsJSON: JSON[] = json['symbols'];
            if (symbolsJSON && symbolsJSON.length > 0) {
                tmp.word_symbol = symbolsJSON[0]['word_symbol'];
                //由于输入不会有回车，这里 parts 只会返回一个，parts.means也只会有一个
                let partsJSON: JSON[] = symbolsJSON[0]['parts'];
                if (partsJSON && partsJSON.length > 0) {
                    let meansJSON: JSON[] = partsJSON[0]['means'];
                    if (meansJSON && meansJSON.length > 0) {
                        tmp.means = [];
                        meansJSON.forEach((json) => {
                            let mean: MeansInSimple = new MeansInSimple();
                            mean.part = json['part'];
                            mean.text = json['text'];
                            if (mean.text && mean.text.length > 0) {
                            }
                            else {
                                mean.text = json['word_mean'];
                            }
                            let meansInMeansJSON: JSON[] = json['means'];
                            if (meansInMeansJSON && meansInMeansJSON.length > 0) {
                                mean.means = [];
                                meansInMeansJSON.forEach((value) => {
                                    mean.means.push(JSON.stringify(value));
                                });
                            }
                            tmp.means.push(mean);
                        });
                    }
                }
            }
        }
        return tmp;
    }
}
export class ZDict {
    detail: ZDictDetail;
    simple: ZDictDetail;
    static fromJSON(json: Object): ZDict {
        let tmp: ZDict = new ZDict();
        let detailJSON: JSON = json['detail'];
        if (detailJSON) {
            tmp.detail = ZDictDetail.fromJSON(detailJSON);
        }
        let simpleJSON: JSON = json['simple'];
        if (simpleJSON) {
            tmp.simple = ZDictDetail.fromJSON(simpleJSON);
        }
        return tmp;
    }
}
export class ZDictDetail {
    idiom: ZDictDetailIdiom;
    means: ZDictDetailMeans[];
    static fromJSON(json: Object): ZDictDetail {
        let tmp: ZDictDetail = new ZDictDetail();
        let idiomJSON: JSON = json['chenyu'];
        if (idiomJSON) {
            tmp.idiom = ZDictDetailIdiom.fromJSON(idiomJSON);
        }
        let meansJSON: JSON[] = json['means'];
        if (meansJSON && meansJSON.length > 0) {
            let exp: JSON[] = meansJSON[0]['exp'];
            if (exp && exp.length > 0) {
                let des: JSON[] = exp[0]['des'];
                if (des && des.length > 0) {
                    tmp.means = [];
                    des.forEach((value) => {
                        let zDictDetailMeans: ZDictDetailMeans = ZDictDetailMeans.fromJSON(value);
                        if (zDictDetailMeans) {
                            tmp.means.push(zDictDetailMeans);
                        }
                    });
                }
            }
        }
        return tmp;
    }
}
export class ZDictDetailMeans {
    main: string;
    sub: List<string>;
    static fromJSON(json: Object): ZDictDetailMeans {
        let tmp = new ZDictDetailMeans();
        tmp.main = json['main'];
        let subJSON: JSON[] = json['sub'];
        if (subJSON && subJSON.length > 0) {
            tmp.sub = new List();
            subJSON.forEach((value) => {
                tmp.sub.add(JSON.stringify(value));
            });
        }
        return tmp;
    }
}
export class ZDictDetailIdiom {
    antonym: string;
    example: string;
    explain: string;
    from: string;
    grammer: string;
    pinyin: string;
    synonyms: string;
    static fromJSON(json: Object): ZDictDetailIdiom {
        let tmp: ZDictDetailIdiom = new ZDictDetailIdiom();
        tmp.antonym = json['antonym'];
        tmp.example = json['example'];
        tmp.explain = json['explain'];
        tmp.from = json['from'];
        tmp.grammer = json['grammer'];
        tmp.pinyin = json['pinyin'];
        tmp.synonyms = json['synonyms'];
        return tmp;
    }
}
export class PartsForEngInSymbols {
    part: string;
    means: string[];
    static fromJSON(json: Object): PartsForEngInSymbols {
        let tmp: PartsForEngInSymbols = new PartsForEngInSymbols();
        tmp.part = json['part'];
        let meansJSON: JSON[] = json['means'];
        if (meansJSON && meansJSON.length > 0) {
            tmp.means = [];
            meansJSON.forEach((value) => {
                tmp.means.push(JSON.stringify(value));
            });
        }
        return tmp;
    }
}
export class SymbolsForEng {
    ph_en: string;
    ph_am: string;
    parts: PartsForEngInSymbols[];
    static fromJSON(json: Object): SymbolsForEng {
        let tmp: SymbolsForEng = new SymbolsForEng();
        tmp.ph_en = json['ph_en'];
        tmp.ph_am = json['ph_am'];
        let partsJSON: JSON[] = json['parts'];
        if (partsJSON && partsJSON.length > 0) {
            tmp.parts = [];
            partsJSON.forEach((value) => {
                tmp.parts.push(PartsForEngInSymbols.fromJSON(value));
            });
        }
        return tmp;
    }
}
export class ExchangeForEngInSimpleMeans {
    word_third: string[];
    word_ing: string[];
    word_done: string[];
    word_pl: string[];
    word_past: string[];
    static fromJSON(json: Object): ExchangeForEngInSimpleMeans {
        let tmp: ExchangeForEngInSimpleMeans = new ExchangeForEngInSimpleMeans();
        let thirdJSON: string[] = json['word_third'];
        let ingJSON: string[] = json['word_ing'];
        let doneJSON: string[] = json['word_done'];
        let plJSON: string[] = json['word_pl'];
        let pastJSON: string[] = json['word_past'];
        tmp.word_third = thirdJSON;
        tmp.word_ing = ingJSON;
        tmp.word_done = doneJSON;
        tmp.word_pl = plJSON;
        tmp.word_past = pastJSON;
        return tmp;
    }
}
export class BaiduAIDictSimpleMeansForEng {
    symbols: SymbolsForEng;
    tags: string[];
    exchange: ExchangeForEngInSimpleMeans;
    from: string;
    word_name: string;
    static fromJSON(json: Object): BaiduAIDictSimpleMeansForEng {
        let tmp: BaiduAIDictSimpleMeansForEng = new BaiduAIDictSimpleMeansForEng();
        let symbolsJSON: JSON[] = json['symbols'];
        if (symbolsJSON && symbolsJSON.length > 0) {
            tmp.symbols = SymbolsForEng.fromJSON(symbolsJSON[0]);
        }
        let tagJSON: JSON = json['tags'];
        if (tagJSON) {
            let coreJSON: string[] = tagJSON['core'];
            if (coreJSON && coreJSON.length > 0) {
                tmp.tags = coreJSON;
            }
            let otherJSON: string[] = tagJSON['other'];
            if (tagJSON && otherJSON.length > 0) {
                if (tmp.tags) {
                    tmp.tags.concat(otherJSON);
                }
            }
        }
        let exchangeJSON: JSON = json['exchange'];
        if (exchangeJSON) {
            tmp.exchange = ExchangeForEngInSimpleMeans.fromJSON(exchangeJSON);
        }
        tmp.from = json['from'];
        tmp.word_name = json['word_name'];
        return tmp;
    }
}
export class WordResult {
    lang: String;
    simpleMeans: BaiduAIDictSimpleMeans;
    simpleMeansForEng: BaiduAIDictSimpleMeansForEng;
    zDict: ZDict;
    static fromJSON(jsonStr: string): WordResult {
        let tmp: WordResult = new WordResult();
        let json: JSON = JSON.parse(jsonStr);
        let worResult: JSON = json['word_result'];
        if (worResult) {
            tmp.lang = json['lang'];
        }
        if (tmp.lang && tmp.lang == '1') {
            tmp.simpleMeansForEng = BaiduAIDictSimpleMeansForEng.fromJSON(worResult['simple_means']);
        }
        else {
            tmp.simpleMeans = BaiduAIDictSimpleMeans.fromJSON(worResult['simple_means']);
        }
        let zDictJSON = worResult['zdict'];
        if (zDictJSON) {
            tmp.zDict = ZDict.fromJSON(zDictJSON);
        }
        return tmp;
    }
}
export class BaiduAIDictResult {
    dst: string;
    dst_tts: string;
    src: string;
    src_tts: string;
    dict: WordResult;
    static fromJSON(json: Object): BaiduAIDictResult {
        let tmp = new BaiduAIDictResult();
        if (json) {
            tmp.dst = json['dst'];
            tmp.dst_tts = json['dst_tts'];
            tmp.src = json['src'];
            tmp.src_tts = json['src_tts'];
            let dictJSON: string = json['dict'];
            if (dictJSON) {
                tmp.dict = WordResult.fromJSON(dictJSON);
            }
        }
        return tmp;
    }
}
export class BaiduAIDictTranslationResult {
    errorCode: string;
    errorMessage: string;
    logId: string;
    result: BaiduAIDictResult;
    static fromJSON(json: object): BaiduAIDictTranslationResult {
        console.error("--------百度机器翻译结果---------");
        console.error(JSON.stringify(json));
        let tmp = new BaiduAIDictTranslationResult();
        tmp.errorCode = json['error_code'];
        tmp.errorMessage = json['error_msg'];
        tmp.logId = json['log_id'];
        let resultJSON = json['result'];
        if (resultJSON) {
            let trans_result_arr: JSON[] = resultJSON['trans_result'];
            if (trans_result_arr && trans_result_arr.length > 0) {
                let trans_result = trans_result_arr[0];
                tmp.result = BaiduAIDictResult.fromJSON(trans_result);
            }
        }
        return tmp;
    }
}
