let __generate__Id: number = 0;
function generateId(): string {
    return "CaverPhone.test_" + ++__generate__Id;
}
/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import hilog from '@ohos.hilog';
import { describe, expect, it } from '@ohos/hypium';
import caverphone from 'caverphone';
export default function caverPhoneTest() {
    describe('CaverPhoneTest', () => {
        const testcases = ieds;
        it('test_caverPhone', 0, () => {
            testcases.forEach((testcase) => {
                expect(caverphone(testcase.input)).assertEqual(testcase.expected);
                hilog.info(0x0000, 'commons-codec CaverPhone', `input=${testcase.input} expected=${testcase.expected} actual=${caverphone(testcase.input)}`);
            });
        });
    });
}
class InputExpectedData {
    input: string = "";
    expected: string = "";
}
let ieds: InputExpectedData[] = [
    {
        input: "Cailean",
        expected: "KLN1111111"
    },
    {
        input: "Calan",
        expected: "KLN1111111"
    },
    {
        input: "Calen",
        expected: "KLN1111111"
    },
    {
        input: "Callahan",
        expected: "KLN1111111"
    },
    {
        input: "Callan",
        expected: "KLN1111111"
    },
    {
        input: "Callean",
        expected: "KLN1111111"
    },
    {
        input: "Carleen",
        expected: "KLN1111111"
    },
    {
        input: "Carlen",
        expected: "KLN1111111"
    },
    {
        input: "Carlene",
        expected: "KLN1111111"
    },
    {
        input: "Carlin",
        expected: "KLN1111111"
    },
    {
        input: "Carline",
        expected: "KLN1111111"
    },
    {
        input: "Carlyn",
        expected: "KLN1111111"
    },
    {
        input: "Carlynn",
        expected: "KLN1111111"
    },
    {
        input: "Carlynne",
        expected: "KLN1111111"
    },
    {
        input: "Charlean",
        expected: "KLN1111111"
    },
    {
        input: "Charleen",
        expected: "KLN1111111"
    },
    {
        input: "Charlene",
        expected: "KLN1111111"
    },
    {
        input: "Charline",
        expected: "KLN1111111"
    },
    {
        input: "Cherlyn",
        expected: "KLN1111111"
    },
    {
        input: "Chirlin",
        expected: "KLN1111111"
    },
    {
        input: "Clein",
        expected: "KLN1111111"
    },
    {
        input: "Cleon",
        expected: "KLN1111111"
    },
    {
        input: "Cline",
        expected: "KLN1111111"
    },
    {
        input: "Cohleen",
        expected: "KLN1111111"
    },
    {
        input: "Colan",
        expected: "KLN1111111"
    },
    {
        input: "Coleen",
        expected: "KLN1111111"
    },
    {
        input: "Colene",
        expected: "KLN1111111"
    },
    {
        input: "Colin",
        expected: "KLN1111111"
    },
    {
        input: "Colleen",
        expected: "KLN1111111"
    },
    {
        input: "Collen",
        expected: "KLN1111111"
    },
    {
        input: "Collin",
        expected: "KLN1111111"
    },
    {
        input: "Colline",
        expected: "KLN1111111"
    },
    {
        input: "Colon",
        expected: "KLN1111111"
    },
    {
        input: "Cullan",
        expected: "KLN1111111"
    },
    {
        input: "Cullen",
        expected: "KLN1111111"
    },
    {
        input: "Cullin",
        expected: "KLN1111111"
    },
    {
        input: "Dan",
        expected: "TN11111111"
    },
    {
        input: "Dane",
        expected: "TN11111111"
    },
    {
        input: "Dann",
        expected: "TN11111111"
    },
    {
        input: "Darda",
        expected: "TTA1111111"
    },
    {
        input: "Darn",
        expected: "TN11111111"
    },
    {
        input: "Datha",
        expected: "TTA1111111"
    },
    {
        input: "Daune",
        expected: "TN11111111"
    },
    {
        input: "Dawn",
        expected: "TN11111111"
    },
    {
        input: "Ddene",
        expected: "TN11111111"
    },
    {
        input: "Dean",
        expected: "TN11111111"
    },
    {
        input: "Deane",
        expected: "TN11111111"
    },
    {
        input: "Deanne",
        expected: "TN11111111"
    },
    {
        input: "Dedie",
        expected: "TTA1111111"
    },
    {
        input: "DeeAnn",
        expected: "TN11111111"
    },
    {
        input: "Deeann",
        expected: "TN11111111"
    },
    {
        input: "Deeanne",
        expected: "TN11111111"
    },
    {
        input: "Deedee",
        expected: "TTA1111111"
    },
    {
        input: "Deerdre",
        expected: "TTA1111111"
    },
    {
        input: "Deeyn",
        expected: "TN11111111"
    },
    {
        input: "Deidre",
        expected: "TTA1111111"
    },
    {
        input: "Deirdre",
        expected: "TTA1111111"
    },
    {
        input: "Den",
        expected: "TN11111111"
    },
    {
        input: "Dene",
        expected: "TN11111111"
    },
    {
        input: "Denn",
        expected: "TN11111111"
    },
    {
        input: "Deonne",
        expected: "TN11111111"
    },
    {
        input: "Detta",
        expected: "TTA1111111"
    },
    {
        input: "Diahann",
        expected: "TN11111111"
    },
    {
        input: "Dian",
        expected: "TN11111111"
    },
    {
        input: "Diane",
        expected: "TN11111111"
    },
    {
        input: "Diann",
        expected: "TN11111111"
    },
    {
        input: "Dianne",
        expected: "TN11111111"
    },
    {
        input: "Diannne",
        expected: "TN11111111"
    },
    {
        input: "Didi",
        expected: "TTA1111111"
    },
    {
        input: "Didier",
        expected: "TTA1111111"
    },
    {
        input: "Dido",
        expected: "TTA1111111"
    },
    {
        input: "Dierdre",
        expected: "TTA1111111"
    },
    {
        input: "Dieter",
        expected: "TTA1111111"
    },
    {
        input: "Dine",
        expected: "TN11111111"
    },
    {
        input: "Dion",
        expected: "TN11111111"
    },
    {
        input: "Dione",
        expected: "TN11111111"
    },
    {
        input: "Dionne",
        expected: "TN11111111"
    },
    {
        input: "Dita",
        expected: "TTA1111111"
    },
    {
        input: "Ditter",
        expected: "TTA1111111"
    },
    {
        input: "Doane",
        expected: "TN11111111"
    },
    {
        input: "Dodi",
        expected: "TTA1111111"
    },
    {
        input: "Dodie",
        expected: "TTA1111111"
    },
    {
        input: "Dody",
        expected: "TTA1111111"
    },
    {
        input: "Doehne",
        expected: "TN11111111"
    },
    {
        input: "Doherty",
        expected: "TTA1111111"
    },
    {
        input: "Don",
        expected: "TN11111111"
    },
    {
        input: "Donn",
        expected: "TN11111111"
    },
    {
        input: "Doone",
        expected: "TN11111111"
    },
    {
        input: "Dorn",
        expected: "TN11111111"
    },
    {
        input: "Dorthea",
        expected: "TTA1111111"
    },
    {
        input: "Dorthy",
        expected: "TTA1111111"
    },
    {
        input: "Doti",
        expected: "TTA1111111"
    },
    {
        input: "Dotti",
        expected: "TTA1111111"
    },
    {
        input: "Dottie",
        expected: "TTA1111111"
    },
    {
        input: "Dotty",
        expected: "TTA1111111"
    },
    {
        input: "Doty",
        expected: "TTA1111111"
    },
    {
        input: "Doughty",
        expected: "TTA1111111"
    },
    {
        input: "Douty",
        expected: "TTA1111111"
    },
    {
        input: "Dowdell",
        expected: "TTA1111111"
    },
    {
        input: "Down",
        expected: "TN11111111"
    },
    {
        input: "Downe",
        expected: "TN11111111"
    },
    {
        input: "Duane",
        expected: "TN11111111"
    },
    {
        input: "Dun",
        expected: "TN11111111"
    },
    {
        input: "Dunn",
        expected: "TN11111111"
    },
    {
        input: "Duthie",
        expected: "TTA1111111"
    },
    {
        input: "Duyne",
        expected: "TN11111111"
    },
    {
        input: "Dyan",
        expected: "TN11111111"
    },
    {
        input: "Dyane",
        expected: "TN11111111"
    },
    {
        input: "Dyann",
        expected: "TN11111111"
    },
    {
        input: "Dyanne",
        expected: "TN11111111"
    },
    {
        input: "Dyun",
        expected: "TN11111111"
    },
    {
        input: "Gaelan",
        expected: "KLN1111111"
    },
    {
        input: "Galan",
        expected: "KLN1111111"
    },
    {
        input: "Galen",
        expected: "KLN1111111"
    },
    {
        input: "Garlan",
        expected: "KLN1111111"
    },
    {
        input: "Garlen",
        expected: "KLN1111111"
    },
    {
        input: "Gaulin",
        expected: "KLN1111111"
    },
    {
        input: "Gayleen",
        expected: "KLN1111111"
    },
    {
        input: "Gaylene",
        expected: "KLN1111111"
    },
    {
        input: "Giliane",
        expected: "KLN1111111"
    },
    {
        input: "Gillan",
        expected: "KLN1111111"
    },
    {
        input: "Gillian",
        expected: "KLN1111111"
    },
    {
        input: "Glen",
        expected: "KLN1111111"
    },
    {
        input: "Glenn",
        expected: "KLN1111111"
    },
    {
        input: "Glyn",
        expected: "KLN1111111"
    },
    {
        input: "Glynn",
        expected: "KLN1111111"
    },
    {
        input: "Gollin",
        expected: "KLN1111111"
    },
    {
        input: "Gorlin",
        expected: "KLN1111111"
    },
    {
        input: "Kalin",
        expected: "KLN1111111"
    },
    {
        input: "Karlan",
        expected: "KLN1111111"
    },
    {
        input: "Karleen",
        expected: "KLN1111111"
    },
    {
        input: "Karlen",
        expected: "KLN1111111"
    },
    {
        input: "Karlene",
        expected: "KLN1111111"
    },
    {
        input: "Karlin",
        expected: "KLN1111111"
    },
    {
        input: "Karlyn",
        expected: "KLN1111111"
    },
    {
        input: "Kaylyn",
        expected: "KLN1111111"
    },
    {
        input: "Keelin",
        expected: "KLN1111111"
    },
    {
        input: "Kellen",
        expected: "KLN1111111"
    },
    {
        input: "Kellene",
        expected: "KLN1111111"
    },
    {
        input: "Kellyann",
        expected: "KLN1111111"
    },
    {
        input: "Kellyn",
        expected: "KLN1111111"
    },
    {
        input: "Khalin",
        expected: "KLN1111111"
    },
    {
        input: "Kilan",
        expected: "KLN1111111"
    },
    {
        input: "Kilian",
        expected: "KLN1111111"
    },
    {
        input: "Killen",
        expected: "KLN1111111"
    },
    {
        input: "Killian",
        expected: "KLN1111111"
    },
    {
        input: "Killion",
        expected: "KLN1111111"
    },
    {
        input: "Klein",
        expected: "KLN1111111"
    },
    {
        input: "Kleon",
        expected: "KLN1111111"
    },
    {
        input: "Kline",
        expected: "KLN1111111"
    },
    {
        input: "Koerlin",
        expected: "KLN1111111"
    },
    {
        input: "Kylen",
        expected: "KLN1111111"
    },
    {
        input: "Kylynn",
        expected: "KLN1111111"
    },
    {
        input: "Peady",
        expected: "PTA1111111"
    },
    {
        input: "Peter",
        expected: "PTA1111111"
    },
    {
        input: "Quillan",
        expected: "KLN1111111"
    },
    {
        input: "Quillon",
        expected: "KLN1111111"
    },
    {
        input: "Qulllon",
        expected: "KLN1111111"
    },
    {
        input: "Stevenson",
        expected: "STFNSN1111"
    },
    {
        input: "Tada",
        expected: "TTA1111111"
    },
    {
        input: "Taddeo",
        expected: "TTA1111111"
    },
    {
        input: "Tadeo",
        expected: "TTA1111111"
    },
    {
        input: "Tadio",
        expected: "TTA1111111"
    },
    {
        input: "Tan",
        expected: "TN11111111"
    },
    {
        input: "Tann",
        expected: "TN11111111"
    },
    {
        input: "Tati",
        expected: "TTA1111111"
    },
    {
        input: "Teador",
        expected: "TTA1111111"
    },
    {
        input: "Teahan",
        expected: "TN11111111"
    },
    {
        input: "Tedda",
        expected: "TTA1111111"
    },
    {
        input: "Tedder",
        expected: "TTA1111111"
    },
    {
        input: "Teddi",
        expected: "TTA1111111"
    },
    {
        input: "Teddie",
        expected: "TTA1111111"
    },
    {
        input: "Teddy",
        expected: "TTA1111111"
    },
    {
        input: "Tedi",
        expected: "TTA1111111"
    },
    {
        input: "Tedie",
        expected: "TTA1111111"
    },
    {
        input: "Teeter",
        expected: "TTA1111111"
    },
    {
        input: "Ten",
        expected: "TN11111111"
    },
    {
        input: "Tenn",
        expected: "TN11111111"
    },
    {
        input: "Teodoor",
        expected: "TTA1111111"
    },
    {
        input: "Teodor",
        expected: "TTA1111111"
    },
    {
        input: "Terhune",
        expected: "TN11111111"
    },
    {
        input: "Terti",
        expected: "TTA1111111"
    },
    {
        input: "Thain",
        expected: "TN11111111"
    },
    {
        input: "Thaine",
        expected: "TN11111111"
    },
    {
        input: "Thane",
        expected: "TN11111111"
    },
    {
        input: "Thanh",
        expected: "TN11111111"
    },
    {
        input: "Thayne",
        expected: "TN11111111"
    },
    {
        input: "Theda",
        expected: "TTA1111111"
    },
    {
        input: "Theodor",
        expected: "TTA1111111"
    },
    {
        input: "Theodore",
        expected: "TTA1111111"
    },
    {
        input: "Theone",
        expected: "TN11111111"
    },
    {
        input: "Theta",
        expected: "TTA1111111"
    },
    {
        input: "Thilda",
        expected: "TTA1111111"
    },
    {
        input: "Thin",
        expected: "TN11111111"
    },
    {
        input: "Thordia",
        expected: "TTA1111111"
    },
    {
        input: "Thorn",
        expected: "TN11111111"
    },
    {
        input: "Thorne",
        expected: "TN11111111"
    },
    {
        input: "Thun",
        expected: "TN11111111"
    },
    {
        input: "Thynne",
        expected: "TN11111111"
    },
    {
        input: "Tien",
        expected: "TN11111111"
    },
    {
        input: "Tilda",
        expected: "TTA1111111"
    },
    {
        input: "Tildi",
        expected: "TTA1111111"
    },
    {
        input: "Tildie",
        expected: "TTA1111111"
    },
    {
        input: "Tildy",
        expected: "TTA1111111"
    },
    {
        input: "Tine",
        expected: "TN11111111"
    },
    {
        input: "Tita",
        expected: "TTA1111111"
    },
    {
        input: "Tito",
        expected: "TTA1111111"
    },
    {
        input: "Tjader",
        expected: "TTA1111111"
    },
    {
        input: "Tjon",
        expected: "TN11111111"
    },
    {
        input: "Toddie",
        expected: "TTA1111111"
    },
    {
        input: "Toddy",
        expected: "TTA1111111"
    },
    {
        input: "Torto",
        expected: "TTA1111111"
    },
    {
        input: "Town",
        expected: "TN11111111"
    },
    {
        input: "Towne",
        expected: "TN11111111"
    },
    {
        input: "Tuddor",
        expected: "TTA1111111"
    },
    {
        input: "Tudor",
        expected: "TTA1111111"
    },
    {
        input: "Turne",
        expected: "TN11111111"
    },
    {
        input: "Turtle",
        expected: "TTA1111111"
    },
    {
        input: "Tuttle",
        expected: "TTA1111111"
    },
    {
        input: "Tutto",
        expected: "TTA1111111"
    },
    {
        input: "Tyne",
        expected: "TN11111111"
    },
    {
        input: "Xylon",
        expected: "KLN1111111"
    },
    {
        input: "aaron",
        expected: "ARN1111111"
    },
    {
        input: "aaskow",
        expected: "ASKA111111"
    },
    {
        input: "aaysford",
        expected: "ASFT111111"
    },
    {
        input: "abbott",
        expected: "APT1111111"
    },
    {
        input: "abby",
        expected: "APA1111111"
    },
    {
        input: "abdo",
        expected: "APTA111111"
    },
    {
        input: "abel",
        expected: "APA1111111"
    },
    {
        input: "abelsted",
        expected: "APSTT11111"
    },
    {
        input: "abercrombie",
        expected: "APKRMPA111"
    },
    {
        input: "abernathy",
        expected: "APNTA11111"
    },
    {
        input: "abernethie",
        expected: "APNTA11111"
    },
    {
        input: "abernethy",
        expected: "APNTA11111"
    },
    {
        input: "abigail",
        expected: "APKA111111"
    },
    {
        input: "abina",
        expected: "APNA111111"
    },
    {
        input: "able",
        expected: "APA1111111"
    },
    {
        input: "abley",
        expected: "APLA111111"
    },
    {
        input: "abool",
        expected: "APA1111111"
    },
    {
        input: "abraham",
        expected: "APRM111111"
    },
    {
        input: "abrams",
        expected: "APRMS11111"
    },
    {
        input: "absalom",
        expected: "APSLM11111"
    },
    {
        input: "aburn",
        expected: "APN1111111"
    },
    {
        input: "acheson",
        expected: "AKSN111111"
    },
    {
        input: "ada",
        expected: "ATA1111111"
    },
    {
        input: "adair",
        expected: "ATA1111111"
    },
    {
        input: "adalbert",
        expected: "ATPT111111"
    },
    {
        input: "adaline",
        expected: "ATLN111111"
    },
    {
        input: "adam",
        expected: "ATM1111111"
    },
    {
        input: "adams",
        expected: "ATMS111111"
    },
    {
        input: "adamson",
        expected: "ATMSN11111"
    },
    {
        input: "adcock",
        expected: "ATKK111111"
    },
    {
        input: "add",
        expected: "AT11111111"
    },
    {
        input: "addison",
        expected: "ATSN111111"
    },
    {
        input: "adela",
        expected: "ATLA111111"
    },
    {
        input: "adelaide",
        expected: "ATLT111111"
    },
    {
        input: "adeleen",
        expected: "ATLN111111"
    },
    {
        input: "adelene",
        expected: "ATLN111111"
    },
    {
        input: "adelina",
        expected: "ATLNA11111"
    },
    {
        input: "adeline",
        expected: "ATLN111111"
    },
    {
        input: "aderman",
        expected: "ATMN111111"
    },
    {
        input: "adess",
        expected: "ATS1111111"
    },
    {
        input: "adie",
        expected: "ATA1111111"
    },
    {
        input: "adkins",
        expected: "ATKNS11111"
    },
    {
        input: "adolarious",
        expected: "ATLRS11111"
    },
    {
        input: "adolph",
        expected: "ATF1111111"
    },
    {
        input: "adolphe",
        expected: "ATF1111111"
    },
    {
        input: "adolphus",
        expected: "ATFS111111"
    },
    {
        input: "adonia",
        expected: "ATNA111111"
    },
    {
        input: "adrian",
        expected: "ATRN111111"
    },
    {
        input: "aeneas",
        expected: "ANS1111111"
    },
    {
        input: "affleck",
        expected: "AFLK111111"
    },
    {
        input: "afred",
        expected: "AFRT111111"
    },
    {
        input: "agatha",
        expected: "AKTA111111"
    },
    {
        input: "agent",
        expected: "AKNT111111"
    },
    {
        input: "aggie",
        expected: "AKA1111111"
    },
    {
        input: "agnes",
        expected: "AKNS111111"
    },
    {
        input: "agness",
        expected: "AKNS111111"
    },
    {
        input: "agnew",
        expected: "AKNA111111"
    },
    {
        input: "ah",
        expected: "A111111111"
    },
    {
        input: "ahern",
        expected: "AN11111111"
    },
    {
        input: "ahira",
        expected: "ARA1111111"
    },
    {
        input: "ahlbrandt",
        expected: "APRNT11111"
    },
    {
        input: "ahlfeld",
        expected: "AFT1111111"
    },
    {
        input: "aicheson",
        expected: "AKSN111111"
    },
    {
        input: "aid",
        expected: "AT11111111"
    },
    {
        input: "aida",
        expected: "ATA1111111"
    },
    {
        input: "aidan",
        expected: "ATN1111111"
    },
    {
        input: "aidridge",
        expected: "ATRK111111"
    },
    {
        input: "aiken",
        expected: "AKN1111111"
    },
    {
        input: "aileen",
        expected: "ALN1111111"
    },
    {
        input: "ailen",
        expected: "ALN1111111"
    },
    {
        input: "ailsa",
        expected: "ASA1111111"
    },
    {
        input: "aimee",
        expected: "AMA1111111"
    },
    {
        input: "aimers",
        expected: "AMS1111111"
    },
    {
        input: "aimes",
        expected: "AMS1111111"
    },
    {
        input: "aimie",
        expected: "AMA1111111"
    },
    {
        input: "ainge",
        expected: "ANK1111111"
    },
    {
        input: "ainger",
        expected: "ANKA111111"
    },
    {
        input: "air",
        expected: "AA11111111"
    },
    {
        input: "aird",
        expected: "AT11111111"
    },
    {
        input: "airey",
        expected: "ARA1111111"
    },
    {
        input: "airini",
        expected: "ARNA111111"
    },
    {
        input: "airley",
        expected: "ALA1111111"
    },
    {
        input: "aitcheson",
        expected: "AKSN111111"
    },
    {
        input: "aitchison",
        expected: "AKSN111111"
    },
    {
        input: "aithenhead",
        expected: "ATNT111111"
    },
    {
        input: "aitken",
        expected: "ATKN111111"
    },
    {
        input: "aitkenhead",
        expected: "ATKNT11111"
    },
    {
        input: "aitkens",
        expected: "ATKNS11111"
    },
    {
        input: "aitkinson",
        expected: "ATKNSN1111"
    },
    {
        input: "alak",
        expected: "ALK1111111"
    },
    {
        input: "alan",
        expected: "ALN1111111"
    },
    {
        input: "alasdair",
        expected: "ALSTA11111"
    },
    {
        input: "alastair",
        expected: "ALSTA11111"
    },
    {
        input: "alban",
        expected: "APN1111111"
    },
    {
        input: "albany",
        expected: "APNA111111"
    },
    {
        input: "albert",
        expected: "APT1111111"
    },
    {
        input: "alberta",
        expected: "APTA111111"
    },
    {
        input: "alberthina",
        expected: "APTNA11111"
    },
    {
        input: "alberti",
        expected: "APTA111111"
    },
    {
        input: "albertina",
        expected: "APTNA11111"
    },
    {
        input: "albertus",
        expected: "APTS111111"
    },
    {
        input: "albina",
        expected: "APNA111111"
    },
    {
        input: "alcock",
        expected: "AKK1111111"
    },
    {
        input: "alden",
        expected: "ATN1111111"
    },
    {
        input: "alder",
        expected: "ATA1111111"
    },
    {
        input: "alderdice",
        expected: "ATTK111111"
    },
    {
        input: "alderson",
        expected: "ATSN111111"
    },
    {
        input: "alderton",
        expected: "ATTN111111"
    },
    {
        input: "aldolf",
        expected: "ATF1111111"
    },
    {
        input: "aldous",
        expected: "ATS1111111"
    },
    {
        input: "aldred",
        expected: "ATRT111111"
    },
    {
        input: "aldridge",
        expected: "ATRK111111"
    },
    {
        input: "aldwyn",
        expected: "ATWN111111"
    },
    {
        input: "aleatha",
        expected: "ALTA111111"
    },
    {
        input: "alec",
        expected: "ALK1111111"
    },
    {
        input: "alen",
        expected: "ALN1111111"
    },
    {
        input: "alert",
        expected: "ALT1111111"
    },
    {
        input: "alex",
        expected: "ALK1111111"
    },
    {
        input: "alexander",
        expected: "ALKNTA1111"
    },
    {
        input: "alexanderina",
        expected: "ALKNTRNA11"
    },
    {
        input: "alexandra",
        expected: "ALKNTRA111"
    },
    {
        input: "alexandrena",
        expected: "ALKNTRNA11"
    },
    {
        input: "alexandrew",
        expected: "ALKNTRA111"
    },
    {
        input: "alexandria",
        expected: "ALKNTRA111"
    },
    {
        input: "alexandrina",
        expected: "ALKNTRNA11"
    },
    {
        input: "alexina",
        expected: "ALKNA11111"
    },
    {
        input: "alexius",
        expected: "ALKS111111"
    },
    {
        input: "alf",
        expected: "AF11111111"
    },
    {
        input: "alfred",
        expected: "AFRT111111"
    },
    {
        input: "alfreda",
        expected: "AFRTA11111"
    },
    {
        input: "alfrerd",
        expected: "AFRT111111"
    },
    {
        input: "alfrey",
        expected: "AFRA111111"
    },
    {
        input: "algar",
        expected: "AKA1111111"
    },
    {
        input: "algeo",
        expected: "AKA1111111"
    },
    {
        input: "algernon",
        expected: "AKNN111111"
    },
    {
        input: "algie",
        expected: "AKA1111111"
    },
    {
        input: "algier",
        expected: "AKA1111111"
    },
    {
        input: "alice",
        expected: "ALK1111111"
    },
    {
        input: "alicia",
        expected: "ALSA111111"
    },
    {
        input: "alick",
        expected: "ALK1111111"
    },
    {
        input: "aline",
        expected: "ALN1111111"
    },
    {
        input: "alinie",
        expected: "ALNA111111"
    },
    {
        input: "alison",
        expected: "ALSN111111"
    },
    {
        input: "alister",
        expected: "ALSTA11111"
    },
    {
        input: "alixe",
        expected: "ALK1111111"
    },
    {
        input: "allan",
        expected: "ALN1111111"
    },
    {
        input: "alldred",
        expected: "ATRT111111"
    },
    {
        input: "allen",
        expected: "ALN1111111"
    },
    {
        input: "alley",
        expected: "ALA1111111"
    },
    {
        input: "allis",
        expected: "ALS1111111"
    },
    {
        input: "allison",
        expected: "ALSN111111"
    },
    {
        input: "allman",
        expected: "AMN1111111"
    },
    {
        input: "allom",
        expected: "ALM1111111"
    },
    {
        input: "allon",
        expected: "ALN1111111"
    },
    {
        input: "alloo",
        expected: "ALA1111111"
    },
    {
        input: "allott",
        expected: "ALT1111111"
    },
    {
        input: "allpress",
        expected: "APRS111111"
    },
    {
        input: "allum",
        expected: "ALM1111111"
    },
    {
        input: "allwood",
        expected: "AWT1111111"
    },
    {
        input: "allworden",
        expected: "AWTN111111"
    },
    {
        input: "alma",
        expected: "AMA1111111"
    },
    {
        input: "almers",
        expected: "AMS1111111"
    },
    {
        input: "almond",
        expected: "AMNT111111"
    },
    {
        input: "almquist",
        expected: "AMKST11111"
    },
    {
        input: "alnie",
        expected: "ANA1111111"
    },
    {
        input: "aloysius",
        expected: "ALSS111111"
    },
    {
        input: "alpheus",
        expected: "AFS1111111"
    },
    {
        input: "alphonso",
        expected: "AFNSA11111"
    },
    {
        input: "alphonsos",
        expected: "AFNSS11111"
    },
    {
        input: "alphonsus",
        expected: "AFNSS11111"
    },
    {
        input: "alpine",
        expected: "APN1111111"
    },
    {
        input: "alston",
        expected: "ASTN111111"
    },
    {
        input: "althea",
        expected: "ATA1111111"
    },
    {
        input: "alva",
        expected: "AFA1111111"
    },
    {
        input: "alvan",
        expected: "AFN1111111"
    },
    {
        input: "alvia",
        expected: "AFA1111111"
    },
    {
        input: "alvida",
        expected: "AFTA111111"
    },
    {
        input: "alvin",
        expected: "AFN1111111"
    },
    {
        input: "alvina",
        expected: "AFNA111111"
    },
    {
        input: "alvirie",
        expected: "AFRA111111"
    },
    {
        input: "alwin",
        expected: "AWN1111111"
    },
    {
        input: "alwyn",
        expected: "AWN1111111"
    },
    {
        input: "alys",
        expected: "ALS1111111"
    },
    {
        input: "amalfitano",
        expected: "AMFTNA1111"
    },
    {
        input: "amalric",
        expected: "AMRK111111"
    },
    {
        input: "amanda",
        expected: "AMNTA11111"
    },
    {
        input: "ambridge",
        expected: "AMPRK11111"
    },
    {
        input: "ambrose",
        expected: "AMPRS11111"
    },
    {
        input: "amelia",
        expected: "AMLA111111"
    },
    {
        input: "amer",
        expected: "AMA1111111"
    },
    {
        input: "amida",
        expected: "AMTA111111"
    },
    {
        input: "amie",
        expected: "AMA1111111"
    },
    {
        input: "amos",
        expected: "AMS1111111"
    },
    {
        input: "amouri",
        expected: "AMRA111111"
    },
    {
        input: "amtman",
        expected: "AMTMN11111"
    },
    {
        input: "amunie",
        expected: "AMNA111111"
    },
    {
        input: "amy",
        expected: "AMA1111111"
    },
    {
        input: "anabella",
        expected: "ANPLA11111"
    },
    {
        input: "anastasia",
        expected: "ANSTSA1111"
    },
    {
        input: "ancell",
        expected: "ANSA111111"
    },
    {
        input: "anchor",
        expected: "ANKA111111"
    },
    {
        input: "andarena",
        expected: "ANTRNA1111"
    },
    {
        input: "andereanie",
        expected: "ANTRNA1111"
    },
    {
        input: "anderena",
        expected: "ANTRNA1111"
    },
    {
        input: "anderina",
        expected: "ANTRNA1111"
    },
    {
        input: "anders",
        expected: "ANTS111111"
    },
    {
        input: "andersen",
        expected: "ANTSN11111"
    },
    {
        input: "andersoll",
        expected: "ANTSA11111"
    },
    {
        input: "anderson",
        expected: "ANTSN11111"
    },
    {
        input: "anderton",
        expected: "ANTTN11111"
    },
    {
        input: "andes",
        expected: "ANTS111111"
    },
    {
        input: "andis",
        expected: "ANTS111111"
    },
    {
        input: "andorson",
        expected: "ANTSN11111"
    },
    {
        input: "andrea",
        expected: "ANTRA11111"
    },
    {
        input: "andreas",
        expected: "ANTRS11111"
    },
    {
        input: "andreassend",
        expected: "ANTRSNT111"
    },
    {
        input: "andreen",
        expected: "ANTRN11111"
    },
    {
        input: "andrena",
        expected: "ANTRNA1111"
    },
    {
        input: "andrew",
        expected: "ANTRA11111"
    },
    {
        input: "andrewe",
        expected: "ANTRA11111"
    },
    {
        input: "andrewes",
        expected: "ANTRWS1111"
    },
    {
        input: "andrewetta",
        expected: "ANTRWTA111"
    },
    {
        input: "andrewina",
        expected: "ANTRWNA111"
    },
    {
        input: "andrews",
        expected: "ANTRS11111"
    },
    {
        input: "andriana",
        expected: "ANTRNA1111"
    },
    {
        input: "andrina",
        expected: "ANTRNA1111"
    },
    {
        input: "angela",
        expected: "ANKLA11111"
    },
    {
        input: "angeli",
        expected: "ANKLA11111"
    },
    {
        input: "angelina",
        expected: "ANKLNA1111"
    },
    {
        input: "angell",
        expected: "ANKA111111"
    },
    {
        input: "anges",
        expected: "ANKS111111"
    },
    {
        input: "angnetta",
        expected: "ANKNTA1111"
    },
    {
        input: "angus",
        expected: "ANKS111111"
    },
    {
        input: "angustus",
        expected: "ANKSTS1111"
    },
    {
        input: "angy",
        expected: "ANKA111111"
    },
    {
        input: "anita",
        expected: "ANTA111111"
    },
    {
        input: "anmore",
        expected: "ANMA111111"
    },
    {
        input: "ann",
        expected: "AN11111111"
    },
    {
        input: "anna",
        expected: "ANA1111111"
    },
    {
        input: "annabel",
        expected: "ANPA111111"
    },
    {
        input: "annabell",
        expected: "ANPA111111"
    },
    {
        input: "annabella",
        expected: "ANPLA11111"
    },
    {
        input: "annan",
        expected: "ANN1111111"
    },
    {
        input: "annand",
        expected: "ANNT111111"
    },
    {
        input: "annastasia",
        expected: "ANSTSA1111"
    },
    {
        input: "anne",
        expected: "AN11111111"
    },
    {
        input: "anners",
        expected: "ANS1111111"
    },
    {
        input: "annett",
        expected: "ANT1111111"
    },
    {
        input: "annetta",
        expected: "ANTA111111"
    },
    {
        input: "annette",
        expected: "ANT1111111"
    },
    {
        input: "annettta",
        expected: "ANTA111111"
    },
    {
        input: "annie",
        expected: "ANA1111111"
    },
    {
        input: "anning",
        expected: "ANNK111111"
    },
    {
        input: "annis",
        expected: "ANS1111111"
    },
    {
        input: "annison",
        expected: "ANSN111111"
    },
    {
        input: "annson",
        expected: "ANSN111111"
    },
    {
        input: "anorah",
        expected: "ANRA111111"
    },
    {
        input: "anscombe",
        expected: "ANSKM11111"
    },
    {
        input: "ansdell",
        expected: "ANSTA11111"
    },
    {
        input: "ansell",
        expected: "ANSA111111"
    },
    {
        input: "ansley",
        expected: "ANSLA11111"
    },
    {
        input: "anstruther",
        expected: "ANSTRTA111"
    },
    {
        input: "antcliffe",
        expected: "ANTKLF1111"
    },
    {
        input: "anthony",
        expected: "ANTNA11111"
    },
    {
        input: "antiss",
        expected: "ANTS111111"
    },
    {
        input: "anton",
        expected: "ANTN111111"
    },
    {
        input: "antonica",
        expected: "ANTNKA1111"
    },
    {
        input: "antonie",
        expected: "ANTNA11111"
    },
    {
        input: "antonio",
        expected: "ANTNA11111"
    },
    {
        input: "antony",
        expected: "ANTNA11111"
    },
    {
        input: "apes",
        expected: "APS1111111"
    },
    {
        input: "appear",
        expected: "APA1111111"
    },
    {
        input: "appleby",
        expected: "APLPA11111"
    },
    {
        input: "applegart",
        expected: "APLKT11111"
    },
    {
        input: "applegarth",
        expected: "APLKT11111"
    },
    {
        input: "applegate",
        expected: "APLKT11111"
    },
    {
        input: "applelby",
        expected: "APLPA11111"
    },
    {
        input: "apstein",
        expected: "APSTN11111"
    },
    {
        input: "aquila",
        expected: "AKLA111111"
    },
    {
        input: "ara",
        expected: "ARA1111111"
    },
    {
        input: "arabella",
        expected: "ARPLA11111"
    },
    {
        input: "arbuckle",
        expected: "APKA111111"
    },
    {
        input: "archbold",
        expected: "AKPT111111"
    },
    {
        input: "archer",
        expected: "AKA1111111"
    },
    {
        input: "archibald",
        expected: "AKPT111111"
    },
    {
        input: "archie",
        expected: "AKA1111111"
    },
    {
        input: "archina",
        expected: "AKNA111111"
    },
    {
        input: "archur",
        expected: "AKA1111111"
    },
    {
        input: "areta",
        expected: "ARTA111111"
    },
    {
        input: "argles",
        expected: "AKLS111111"
    },
    {
        input: "argue",
        expected: "AKA1111111"
    },
    {
        input: "argyle",
        expected: "AKA1111111"
    },
    {
        input: "aria",
        expected: "ARA1111111"
    },
    {
        input: "ariana",
        expected: "ARNA111111"
    },
    {
        input: "ariti",
        expected: "ARTA111111"
    },
    {
        input: "arkel",
        expected: "AKA1111111"
    },
    {
        input: "arkins",
        expected: "AKNS111111"
    },
    {
        input: "arkle",
        expected: "AKA1111111"
    },
    {
        input: "arlene",
        expected: "ALN1111111"
    },
    {
        input: "arlidge",
        expected: "ALK1111111"
    },
    {
        input: "armatrong",
        expected: "AMTRNK1111"
    },
    {
        input: "armishaw",
        expected: "AMSA111111"
    },
    {
        input: "armit",
        expected: "AMT1111111"
    },
    {
        input: "armitage",
        expected: "AMTK111111"
    },
    {
        input: "armour",
        expected: "AMA1111111"
    },
    {
        input: "armroyd",
        expected: "AMRT111111"
    },
    {
        input: "armstead",
        expected: "AMSTT11111"
    },
    {
        input: "armstrong",
        expected: "AMSTRNK111"
    },
    {
        input: "arnal",
        expected: "ANA1111111"
    },
    {
        input: "arneil",
        expected: "ANA1111111"
    },
    {
        input: "arnel",
        expected: "ANA1111111"
    },
    {
        input: "arnett",
        expected: "ANT1111111"
    },
    {
        input: "arnold",
        expected: "ANT1111111"
    },
    {
        input: "arnot",
        expected: "ANT1111111"
    },
    {
        input: "arnott",
        expected: "ANT1111111"
    },
    {
        input: "arnstrong",
        expected: "ANSTRNK111"
    },
    {
        input: "aroha",
        expected: "ARA1111111"
    },
    {
        input: "arowie",
        expected: "ARWA111111"
    },
    {
        input: "arroll",
        expected: "ARA1111111"
    },
    {
        input: "arrow",
        expected: "ARA1111111"
    },
    {
        input: "art",
        expected: "AT11111111"
    },
    {
        input: "arthur",
        expected: "ATA1111111"
    },
    {
        input: "artlett",
        expected: "ATLT111111"
    },
    {
        input: "arundale",
        expected: "ARNTA11111"
    },
    {
        input: "arundel",
        expected: "ARNTA11111"
    },
    {
        input: "asenath",
        expected: "ASNT111111"
    },
    {
        input: "ash",
        expected: "AS11111111"
    },
    {
        input: "ashbey",
        expected: "ASPA111111"
    },
    {
        input: "ashburn",
        expected: "ASPN111111"
    },
    {
        input: "ashbury",
        expected: "ASPRA11111"
    },
    {
        input: "ashby",
        expected: "ASPA111111"
    },
    {
        input: "ashcroft",
        expected: "ASKRFT1111"
    },
    {
        input: "ashenden",
        expected: "ASNTN11111"
    },
    {
        input: "asher",
        expected: "ASA1111111"
    },
    {
        input: "ashford",
        expected: "ASFT111111"
    },
    {
        input: "ashley",
        expected: "ASLA111111"
    },
    {
        input: "ashman",
        expected: "ASMN111111"
    },
    {
        input: "ashmore",
        expected: "ASMA111111"
    },
    {
        input: "ashron",
        expected: "ASRN111111"
    },
    {
        input: "ashton",
        expected: "ASTN111111"
    },
    {
        input: "ashwell",
        expected: "ASWA111111"
    },
    {
        input: "ashworth",
        expected: "ASWT111111"
    },
    {
        input: "askor",
        expected: "ASKA111111"
    },
    {
        input: "aslin",
        expected: "ASLN111111"
    },
    {
        input: "asquith",
        expected: "ASKT111111"
    },
    {
        input: "aston",
        expected: "ASTN111111"
    },
    {
        input: "astor",
        expected: "ASTA111111"
    },
    {
        input: "at",
        expected: "AT11111111"
    },
    {
        input: "atalanta",
        expected: "ATLNTA1111"
    },
    {
        input: "atchison",
        expected: "AKSN111111"
    },
    {
        input: "athel",
        expected: "ATA1111111"
    },
    {
        input: "atherfold",
        expected: "ATFT111111"
    },
    {
        input: "athfield",
        expected: "ATFT111111"
    },
    {
        input: "athldeld",
        expected: "ATTT111111"
    },
    {
        input: "athol",
        expected: "ATA1111111"
    },
    {
        input: "atkin",
        expected: "ATKN111111"
    },
    {
        input: "atkins",
        expected: "ATKNS11111"
    },
    {
        input: "atkinson",
        expected: "ATKNSN1111"
    },
    {
        input: "atmore",
        expected: "ATMA111111"
    },
    {
        input: "atto",
        expected: "ATA1111111"
    },
    {
        input: "attwell",
        expected: "ATWA111111"
    },
    {
        input: "atwill",
        expected: "ATWA111111"
    },
    {
        input: "aubrer",
        expected: "APRA111111"
    },
    {
        input: "aubrey",
        expected: "APRA111111"
    },
    {
        input: "audeison",
        expected: "ATSN111111"
    },
    {
        input: "audrew",
        expected: "ATRA111111"
    },
    {
        input: "audrey",
        expected: "ATRA111111"
    },
    {
        input: "audrina",
        expected: "ATRNA11111"
    },
    {
        input: "aufrere",
        expected: "AFRA111111"
    },
    {
        input: "augus",
        expected: "AKS1111111"
    },
    {
        input: "august",
        expected: "AKST111111"
    },
    {
        input: "augusta",
        expected: "AKSTA11111"
    },
    {
        input: "augustine",
        expected: "AKSTN11111"
    },
    {
        input: "augustus",
        expected: "AKSTS11111"
    },
    {
        input: "auld",
        expected: "AT11111111"
    },
    {
        input: "aurora",
        expected: "ARRA111111"
    },
    {
        input: "austad",
        expected: "ASTT111111"
    },
    {
        input: "austen",
        expected: "ASTN111111"
    },
    {
        input: "austin",
        expected: "ASTN111111"
    },
    {
        input: "austing",
        expected: "ASTNK11111"
    },
    {
        input: "auty",
        expected: "ATA1111111"
    },
    {
        input: "ava",
        expected: "AFA1111111"
    },
    {
        input: "averill",
        expected: "AFRA111111"
    },
    {
        input: "avery",
        expected: "AFRA111111"
    },
    {
        input: "avice",
        expected: "AFK1111111"
    },
    {
        input: "avis",
        expected: "AFS1111111"
    },
    {
        input: "avondale",
        expected: "AFNTA11111"
    },
    {
        input: "awdry",
        expected: "ATRA111111"
    },
    {
        input: "axel",
        expected: "AKA1111111"
    },
    {
        input: "ayers",
        expected: "AS11111111"
    },
    {
        input: "aylwin",
        expected: "AWN1111111"
    },
    {
        input: "ayres",
        expected: "ARS1111111"
    },
    {
        input: "ayrey",
        expected: "ARA1111111"
    },
    {
        input: "ayshford",
        expected: "ASFT111111"
    },
    {
        input: "ayson",
        expected: "ASN1111111"
    },
    {
        input: "ayto",
        expected: "ATA1111111"
    },
    {
        input: "azel",
        expected: "ASA1111111"
    },
    {
        input: "azella",
        expected: "ASLA111111"
    },
    {
        input: "azzariti",
        expected: "ASRTA11111"
    },
    {
        input: "baber",
        expected: "PPA1111111"
    },
    {
        input: "bachop",
        expected: "PKP1111111"
    },
    {
        input: "back",
        expected: "PK11111111"
    },
    {
        input: "backholm",
        expected: "PKM1111111"
    },
    {
        input: "bacon",
        expected: "PKN1111111"
    },
    {
        input: "badcock",
        expected: "PTKK111111"
    },
    {
        input: "baden",
        expected: "PTN1111111"
    },
    {
        input: "badham",
        expected: "PTM1111111"
    },
    {
        input: "badman",
        expected: "PTMN111111"
    },
    {
        input: "baeyertz",
        expected: "PTS1111111"
    },
    {
        input: "bagley",
        expected: "PKLA111111"
    },
    {
        input: "bagnell",
        expected: "PKNA111111"
    },
    {
        input: "bagrie",
        expected: "PKRA111111"
    },
    {
        input: "bail",
        expected: "PA11111111"
    },
    {
        input: "baildon",
        expected: "PTN1111111"
    },
    {
        input: "bailer",
        expected: "PLA1111111"
    },
    {
        input: "bailes",
        expected: "PLS1111111"
    },
    {
        input: "bailey",
        expected: "PLA1111111"
    },
    {
        input: "baillie",
        expected: "PLA1111111"
    },
    {
        input: "bailoni",
        expected: "PLNA111111"
    },
    {
        input: "bain",
        expected: "PN11111111"
    },
    {
        input: "baines",
        expected: "PNS1111111"
    },
    {
        input: "baird",
        expected: "PT11111111"
    },
    {
        input: "baker",
        expected: "PKA1111111"
    },
    {
        input: "balchin",
        expected: "PKN1111111"
    },
    {
        input: "balding",
        expected: "PTNK111111"
    },
    {
        input: "baldock",
        expected: "PTK1111111"
    },
    {
        input: "baldwin",
        expected: "PTWN111111"
    },
    {
        input: "baley",
        expected: "PLA1111111"
    },
    {
        input: "balfour",
        expected: "PFA1111111"
    },
    {
        input: "baliantyne",
        expected: "PLNTN11111"
    },
    {
        input: "ball",
        expected: "PA11111111"
    },
    {
        input: "ballantyne",
        expected: "PLNTN11111"
    },
    {
        input: "ballard",
        expected: "PLT1111111"
    },
    {
        input: "ballentyne",
        expected: "PLNTN11111"
    },
    {
        input: "ballintyne",
        expected: "PLNTN11111"
    },
    {
        input: "balloch",
        expected: "PLK1111111"
    },
    {
        input: "balneaves",
        expected: "PNFS111111"
    },
    {
        input: "bamber",
        expected: "PMPA111111"
    },
    {
        input: "bambery",
        expected: "PMPRA11111"
    },
    {
        input: "bambury",
        expected: "PMPRA11111"
    },
    {
        input: "bamfield",
        expected: "PMFT111111"
    },
    {
        input: "bamford",
        expected: "PMFT111111"
    },
    {
        input: "bamwell",
        expected: "PMWA111111"
    },
    {
        input: "bandeen",
        expected: "PNTN111111"
    },
    {
        input: "banfield",
        expected: "PNFT111111"
    },
    {
        input: "banks",
        expected: "PNKS111111"
    },
    {
        input: "bankshaw",
        expected: "PNKSA11111"
    },
    {
        input: "banlow",
        expected: "PNLA111111"
    },
    {
        input: "bannantyne",
        expected: "PNNTN11111"
    },
    {
        input: "bannatyne",
        expected: "PNTN111111"
    },
    {
        input: "bannerman",
        expected: "PNMN111111"
    },
    {
        input: "banwell",
        expected: "PNWA111111"
    },
    {
        input: "baoumgren",
        expected: "PMKRN11111"
    },
    {
        input: "barbara",
        expected: "PPRA111111"
    },
    {
        input: "barbeau",
        expected: "PPA1111111"
    },
    {
        input: "barber",
        expected: "PPA1111111"
    },
    {
        input: "barbour",
        expected: "PPA1111111"
    },
    {
        input: "barclay",
        expected: "PKLA111111"
    },
    {
        input: "bardsiey",
        expected: "PTSA111111"
    },
    {
        input: "bardsley",
        expected: "PTSLA11111"
    },
    {
        input: "bardwell",
        expected: "PTWA111111"
    },
    {
        input: "bare",
        expected: "PA11111111"
    },
    {
        input: "barfield",
        expected: "PFT1111111"
    },
    {
        input: "barham",
        expected: "PM11111111"
    },
    {
        input: "barker",
        expected: "PKA1111111"
    },
    {
        input: "barkla",
        expected: "PKLA111111"
    },
    {
        input: "barkman",
        expected: "PKMN111111"
    },
    {
        input: "barling",
        expected: "PLNK111111"
    },
    {
        input: "barlow",
        expected: "PLA1111111"
    },
    {
        input: "barlthrop",
        expected: "PTRP111111"
    },
    {
        input: "barltrop",
        expected: "PTRP111111"
    },
    {
        input: "barnard",
        expected: "PNT1111111"
    },
    {
        input: "barnes",
        expected: "PNS1111111"
    },
    {
        input: "barnett",
        expected: "PNT1111111"
    },
    {
        input: "barney",
        expected: "PNA1111111"
    },
    {
        input: "barnfield",
        expected: "PNFT111111"
    },
    {
        input: "barnford",
        expected: "PNFT111111"
    },
    {
        input: "barns",
        expected: "PNS1111111"
    },
    {
        input: "baron",
        expected: "PRN1111111"
    },
    {
        input: "barr",
        expected: "PA11111111"
    },
    {
        input: "barrass",
        expected: "PRS1111111"
    },
    {
        input: "barratt",
        expected: "PRT1111111"
    },
    {
        input: "barrell",
        expected: "PRA1111111"
    },
    {
        input: "barret",
        expected: "PRT1111111"
    },
    {
        input: "barrett",
        expected: "PRT1111111"
    },
    {
        input: "barrie",
        expected: "PRA1111111"
    },
    {
        input: "barrington",
        expected: "PRNKTN1111"
    },
    {
        input: "barritt",
        expected: "PRT1111111"
    },
    {
        input: "barron",
        expected: "PRN1111111"
    },
    {
        input: "barrow",
        expected: "PRA1111111"
    },
    {
        input: "barrowclou",
        expected: "PRKLA11111"
    },
    {
        input: "barrowclough",
        expected: "PRKLA11111"
    },
    {
        input: "barrowman",
        expected: "PRMN111111"
    },
    {
        input: "barry",
        expected: "PRA1111111"
    },
    {
        input: "barsdell",
        expected: "PSTA111111"
    },
    {
        input: "barth",
        expected: "PT11111111"
    },
    {
        input: "bartholome",
        expected: "PTLM111111"
    },
    {
        input: "bartholomew",
        expected: "PTLMA11111"
    },
    {
        input: "bartlet",
        expected: "PTLT111111"
    },
    {
        input: "bartlett",
        expected: "PTLT111111"
    },
    {
        input: "bartley",
        expected: "PTLA111111"
    },
    {
        input: "barton",
        expected: "PTN1111111"
    },
    {
        input: "barton-bro",
        expected: "PTNPRA1111"
    },
    {
        input: "barton-browne",
        expected: "PTNPRN1111"
    },
    {
        input: "bartram",
        expected: "PTRM111111"
    },
    {
        input: "barwell",
        expected: "PWA1111111"
    },
    {
        input: "barwick",
        expected: "PWK1111111"
    },
    {
        input: "basan",
        expected: "PSN1111111"
    },
    {
        input: "basil",
        expected: "PSA1111111"
    },
    {
        input: "baskett",
        expected: "PSKT111111"
    },
    {
        input: "bassett",
        expected: "PST1111111"
    },
    {
        input: "bastings",
        expected: "PSTNKS1111"
    },
    {
        input: "batcheior",
        expected: "PKA1111111"
    },
    {
        input: "batchelor",
        expected: "PKLA111111"
    },
    {
        input: "bate",
        expected: "PT11111111"
    },
    {
        input: "bateman",
        expected: "PTMN111111"
    },
    {
        input: "bates",
        expected: "PTS1111111"
    },
    {
        input: "bath",
        expected: "PT11111111"
    },
    {
        input: "batham",
        expected: "PTM1111111"
    },
    {
        input: "bathgate",
        expected: "PTKT111111"
    },
    {
        input: "bats",
        expected: "PTS1111111"
    },
    {
        input: "batt",
        expected: "PT11111111"
    },
    {
        input: "battersby",
        expected: "PTSPA11111"
    },
    {
        input: "batty",
        expected: "PTA1111111"
    },
    {
        input: "battye",
        expected: "PTA1111111"
    },
    {
        input: "bauchop",
        expected: "PKP1111111"
    },
    {
        input: "baughen",
        expected: "PKN1111111"
    },
    {
        input: "bauld",
        expected: "PT11111111"
    },
    {
        input: "baverstock",
        expected: "PFSTK11111"
    },
    {
        input: "bawden",
        expected: "PTN1111111"
    },
    {
        input: "baxter",
        expected: "PKTA111111"
    },
    {
        input: "baylee",
        expected: "PLA1111111"
    },
    {
        input: "bayley",
        expected: "PLA1111111"
    },
    {
        input: "baylis",
        expected: "PLS1111111"
    },
    {
        input: "bayliss",
        expected: "PLS1111111"
    },
    {
        input: "bayly",
        expected: "PLA1111111"
    },
    {
        input: "bayne",
        expected: "PN11111111"
    },
    {
        input: "bazley",
        expected: "PSLA111111"
    },
    {
        input: "beach",
        expected: "PK11111111"
    },
    {
        input: "beadle",
        expected: "PTA1111111"
    },
    {
        input: "beagle",
        expected: "PKA1111111"
    },
    {
        input: "beal",
        expected: "PA11111111"
    },
    {
        input: "beale",
        expected: "PA11111111"
    },
    {
        input: "bean",
        expected: "PN11111111"
    },
    {
        input: "bear",
        expected: "PA11111111"
    },
    {
        input: "beardsley",
        expected: "PTSLA11111"
    },
    {
        input: "beardsmore",
        expected: "PTSMA11111"
    },
    {
        input: "beasley",
        expected: "PSLA111111"
    },
    {
        input: "beath",
        expected: "PT11111111"
    },
    {
        input: "beaton",
        expected: "PTN1111111"
    },
    {
        input: "beatrice",
        expected: "PTRK111111"
    },
    {
        input: "beatrix",
        expected: "PTRK111111"
    },
    {
        input: "beatson",
        expected: "PTSN111111"
    },
    {
        input: "beattie",
        expected: "PTA1111111"
    },
    {
        input: "beatty",
        expected: "PTA1111111"
    },
    {
        input: "beauchamp",
        expected: "PKMP111111"
    },
    {
        input: "beaufort",
        expected: "PFT1111111"
    },
    {
        input: "beaumont",
        expected: "PMNT111111"
    },
    {
        input: "beautort",
        expected: "PTT1111111"
    },
    {
        input: "beavars",
        expected: "PFS1111111"
    },
    {
        input: "beaven",
        expected: "PFN1111111"
    },
    {
        input: "beaver",
        expected: "PFA1111111"
    },
    {
        input: "beavers",
        expected: "PFS1111111"
    },
    {
        input: "beazley",
        expected: "PSLA111111"
    },
    {
        input: "beck",
        expected: "PK11111111"
    },
    {
        input: "beckersta",
        expected: "PKSTA11111"
    },
    {
        input: "beckerstoff",
        expected: "PKSTF11111"
    },
    {
        input: "beckett",
        expected: "PKT1111111"
    },
    {
        input: "beckingham",
        expected: "PKNM111111"
    },
    {
        input: "beckingsale",
        expected: "PKNKSA1111"
    },
    {
        input: "bedelia",
        expected: "PTLA111111"
    },
    {
        input: "bedford",
        expected: "PTFT111111"
    },
    {
        input: "bee",
        expected: "PA11111111"
    },
    {
        input: "beeby",
        expected: "PPA1111111"
    },
    {
        input: "beecher",
        expected: "PKA1111111"
    },
    {
        input: "beecot",
        expected: "PKT1111111"
    },
    {
        input: "beecroft",
        expected: "PKRFT11111"
    },
    {
        input: "beedie",
        expected: "PTA1111111"
    },
    {
        input: "beekman",
        expected: "PKMN111111"
    },
    {
        input: "beel",
        expected: "PA11111111"
    },
    {
        input: "been",
        expected: "PN11111111"
    },
    {
        input: "beer",
        expected: "PA11111111"
    },
    {
        input: "beeson",
        expected: "PSN1111111"
    },
    {
        input: "begbie",
        expected: "PKPA111111"
    },
    {
        input: "begg",
        expected: "PK11111111"
    },
    {
        input: "beigbson",
        expected: "PKPSN11111"
    },
    {
        input: "beighton",
        expected: "PTN1111111"
    },
    {
        input: "beil",
        expected: "PA11111111"
    },
    {
        input: "beilby",
        expected: "PPA1111111"
    },
    {
        input: "beirne",
        expected: "PN11111111"
    },
    {
        input: "beissel",
        expected: "PSA1111111"
    },
    {
        input: "belcher",
        expected: "PKA1111111"
    },
    {
        input: "belford",
        expected: "PFT1111111"
    },
    {
        input: "belina",
        expected: "PLNA111111"
    },
    {
        input: "belinda",
        expected: "PLNTA11111"
    },
    {
        input: "bell",
        expected: "PA11111111"
    },
    {
        input: "bella",
        expected: "PLA1111111"
    },
    {
        input: "bellamy",
        expected: "PLMA111111"
    },
    {
        input: "bellaney",
        expected: "PLNA111111"
    },
    {
        input: "bellet",
        expected: "PLT1111111"
    },
    {
        input: "bellett",
        expected: "PLT1111111"
    },
    {
        input: "bellve",
        expected: "PF11111111"
    },
    {
        input: "belotti",
        expected: "PLTA111111"
    },
    {
        input: "belsey",
        expected: "PSA1111111"
    },
    {
        input: "belstead",
        expected: "PSTT111111"
    },
    {
        input: "belve",
        expected: "PF11111111"
    },
    {
        input: "belworthy",
        expected: "PWTA111111"
    },
    {
        input: "ben",
        expected: "PN11111111"
    },
    {
        input: "bendall",
        expected: "PNTA111111"
    },
    {
        input: "benetta",
        expected: "PNTA111111"
    },
    {
        input: "benfell",
        expected: "PNFA111111"
    },
    {
        input: "benfield",
        expected: "PNFT111111"
    },
    {
        input: "benham",
        expected: "PNM1111111"
    },
    {
        input: "benita",
        expected: "PNTA111111"
    },
    {
        input: "benjamin",
        expected: "PNMN111111"
    },
    {
        input: "benn",
        expected: "PN11111111"
    },
    {
        input: "bennell",
        expected: "PNA1111111"
    },
    {
        input: "bennet",
        expected: "PNT1111111"
    },
    {
        input: "bennett",
        expected: "PNT1111111"
    },
    {
        input: "bennetto",
        expected: "PNTA111111"
    },
    {
        input: "bennetts",
        expected: "PNTS111111"
    },
    {
        input: "bennie",
        expected: "PNA1111111"
    },
    {
        input: "bennison",
        expected: "PNSN111111"
    },
    {
        input: "benson",
        expected: "PNSN111111"
    },
    {
        input: "benston",
        expected: "PNSTN11111"
    },
    {
        input: "benth",
        expected: "PNT1111111"
    },
    {
        input: "bentley",
        expected: "PNTLA11111"
    },
    {
        input: "benton",
        expected: "PNTN111111"
    },
    {
        input: "benzie",
        expected: "PNSA111111"
    },
    {
        input: "ber",
        expected: "PA11111111"
    },
    {
        input: "berg",
        expected: "PK11111111"
    },
    {
        input: "bergin",
        expected: "PKN1111111"
    },
    {
        input: "berkeley",
        expected: "PKLA111111"
    },
    {
        input: "berkinshaw",
        expected: "PKNSA11111"
    },
    {
        input: "berland",
        expected: "PLNT111111"
    },
    {
        input: "berman",
        expected: "PMN1111111"
    },
    {
        input: "bern",
        expected: "PN11111111"
    },
    {
        input: "bernadette",
        expected: "PNTT111111"
    },
    {
        input: "bernard",
        expected: "PNT1111111"
    },
    {
        input: "bernet",
        expected: "PNT1111111"
    },
    {
        input: "berney",
        expected: "PNA1111111"
    },
    {
        input: "bernhard",
        expected: "PNT1111111"
    },
    {
        input: "bernhardt",
        expected: "PNT1111111"
    },
    {
        input: "bernice",
        expected: "PNK1111111"
    },
    {
        input: "bernie",
        expected: "PNA1111111"
    },
    {
        input: "bernstein",
        expected: "PNSTN11111"
    },
    {
        input: "berrett",
        expected: "PRT1111111"
    },
    {
        input: "berrie",
        expected: "PRA1111111"
    },
    {
        input: "berry",
        expected: "PRA1111111"
    },
    {
        input: "berryman",
        expected: "PRMN111111"
    },
    {
        input: "berryrnan",
        expected: "PRNN111111"
    },
    {
        input: "bert",
        expected: "PT11111111"
    },
    {
        input: "berta",
        expected: "PTA1111111"
    },
    {
        input: "bertenshaw",
        expected: "PTNSA11111"
    },
    {
        input: "bertetta",
        expected: "PTTA111111"
    },
    {
        input: "bertha",
        expected: "PTA1111111"
    },
    {
        input: "berthia",
        expected: "PTA1111111"
    },
    {
        input: "berti",
        expected: "PTA1111111"
    },
    {
        input: "bertie",
        expected: "PTA1111111"
    },
    {
        input: "bertina",
        expected: "PTNA111111"
    },
    {
        input: "bertram",
        expected: "PTRM111111"
    },
    {
        input: "bertrand",
        expected: "PTRNT11111"
    },
    {
        input: "berty",
        expected: "PTA1111111"
    },
    {
        input: "bertzow",
        expected: "PTSA111111"
    },
    {
        input: "berwick",
        expected: "PWK1111111"
    },
    {
        input: "beryl",
        expected: "PRA1111111"
    },
    {
        input: "besley",
        expected: "PSLA111111"
    },
    {
        input: "bessie",
        expected: "PSA1111111"
    },
    {
        input: "bessy",
        expected: "PSA1111111"
    },
    {
        input: "best",
        expected: "PST1111111"
    },
    {
        input: "bestic",
        expected: "PSTK111111"
    },
    {
        input: "beter",
        expected: "PTA1111111"
    },
    {
        input: "beth",
        expected: "PT11111111"
    },
    {
        input: "bethea",
        expected: "PTA1111111"
    },
    {
        input: "bethia",
        expected: "PTA1111111"
    },
    {
        input: "bethune",
        expected: "PTN1111111"
    },
    {
        input: "betsey",
        expected: "PTSA111111"
    },
    {
        input: "betsy",
        expected: "PTSA111111"
    },
    {
        input: "bettie",
        expected: "PTA1111111"
    },
    {
        input: "bettina",
        expected: "PTNA111111"
    },
    {
        input: "bettle",
        expected: "PTA1111111"
    },
    {
        input: "bettridge",
        expected: "PTRK111111"
    },
    {
        input: "betts",
        expected: "PTS1111111"
    },
    {
        input: "betty",
        expected: "PTA1111111"
    },
    {
        input: "beulah",
        expected: "PLA1111111"
    },
    {
        input: "beuth",
        expected: "PT11111111"
    },
    {
        input: "bevan",
        expected: "PFN1111111"
    },
    {
        input: "bevars",
        expected: "PFS1111111"
    },
    {
        input: "beven",
        expected: "PFN1111111"
    },
    {
        input: "beveridge",
        expected: "PFRK111111"
    },
    {
        input: "bevin",
        expected: "PFN1111111"
    },
    {
        input: "bevis",
        expected: "PFS1111111"
    },
    {
        input: "bewley",
        expected: "PLA1111111"
    },
    {
        input: "bews",
        expected: "PS11111111"
    },
    {
        input: "bewsher",
        expected: "PSA1111111"
    },
    {
        input: "beyer",
        expected: "PA11111111"
    },
    {
        input: "bezar",
        expected: "PSA1111111"
    },
    {
        input: "bezett",
        expected: "PST1111111"
    },
    {
        input: "bggs",
        expected: "PKS1111111"
    },
    {
        input: "biack",
        expected: "PK11111111"
    },
    {
        input: "bichan",
        expected: "PKN1111111"
    },
    {
        input: "bichard",
        expected: "PKT1111111"
    },
    {
        input: "bickerdike",
        expected: "PKTK111111"
    },
    {
        input: "bicknell",
        expected: "PKNA111111"
    },
    {
        input: "bidgood",
        expected: "PKT1111111"
    },
    {
        input: "bierstorf",
        expected: "PSTF111111"
    },
    {
        input: "biggar",
        expected: "PKA1111111"
    },
    {
        input: "biggins",
        expected: "PKNS111111"
    },
    {
        input: "biggs",
        expected: "PKS1111111"
    },
    {
        input: "billingham",
        expected: "PLNM111111"
    },
    {
        input: "billington",
        expected: "PLNKTN1111"
    },
    {
        input: "bills",
        expected: "PS11111111"
    },
    {
        input: "billy",
        expected: "PLA1111111"
    },
    {
        input: "bilson",
        expected: "PSN1111111"
    },
    {
        input: "bina",
        expected: "PNA1111111"
    },
    {
        input: "binah",
        expected: "PNA1111111"
    },
    {
        input: "bingham",
        expected: "PNM1111111"
    },
    {
        input: "binney",
        expected: "PNA1111111"
    },
    {
        input: "binnie",
        expected: "PNA1111111"
    },
    {
        input: "binsted",
        expected: "PNSTT11111"
    },
    {
        input: "bioss",
        expected: "PS11111111"
    },
    {
        input: "birch",
        expected: "PK11111111"
    },
    {
        input: "birchall",
        expected: "PKA1111111"
    },
    {
        input: "birchwood",
        expected: "PKWT111111"
    },
    {
        input: "bird",
        expected: "PT11111111"
    },
    {
        input: "birdie",
        expected: "PTA1111111"
    },
    {
        input: "birkenshaw",
        expected: "PKNSA11111"
    },
    {
        input: "birkett",
        expected: "PKT1111111"
    },
    {
        input: "birkner",
        expected: "PKNA111111"
    },
    {
        input: "birnie",
        expected: "PNA1111111"
    },
    {
        input: "birrell",
        expected: "PRA1111111"
    },
    {
        input: "birse",
        expected: "PS11111111"
    },
    {
        input: "birss",
        expected: "PS11111111"
    },
    {
        input: "birt",
        expected: "PT11111111"
    },
    {
        input: "birtles",
        expected: "PTLS111111"
    },
    {
        input: "bishop",
        expected: "PSP1111111"
    },
    {
        input: "bisset",
        expected: "PST1111111"
    },
    {
        input: "bissett",
        expected: "PST1111111"
    },
    {
        input: "bissland",
        expected: "PSLNT11111"
    },
    {
        input: "black",
        expected: "PLK1111111"
    },
    {
        input: "blackbrn",
        expected: "PLKPN11111"
    },
    {
        input: "blackburn",
        expected: "PLKPN11111"
    },
    {
        input: "blacke",
        expected: "PLK1111111"
    },
    {
        input: "blackford",
        expected: "PLKFT11111"
    },
    {
        input: "blackie",
        expected: "PLKA111111"
    },
    {
        input: "blackledge",
        expected: "PLKLK11111"
    },
    {
        input: "blackley",
        expected: "PLKLA11111"
    },
    {
        input: "blacklock",
        expected: "PLKLK11111"
    },
    {
        input: "blacklow",
        expected: "PLKLA11111"
    },
    {
        input: "blackmore",
        expected: "PLKMA11111"
    },
    {
        input: "blackock",
        expected: "PLKK111111"
    },
    {
        input: "blackwell",
        expected: "PLKWA11111"
    },
    {
        input: "blackwood",
        expected: "PLKWT11111"
    },
    {
        input: "blagdon",
        expected: "PLKTN11111"
    },
    {
        input: "blaikie",
        expected: "PLKA111111"
    },
    {
        input: "blair",
        expected: "PLA1111111"
    },
    {
        input: "blake",
        expected: "PLK1111111"
    },
    {
        input: "blakeley",
        expected: "PLKLA11111"
    },
    {
        input: "blakely",
        expected: "PLKLA11111"
    },
    {
        input: "blanc",
        expected: "PLNK111111"
    },
    {
        input: "blanch",
        expected: "PLNK111111"
    },
    {
        input: "blanchard",
        expected: "PLNKT11111"
    },
    {
        input: "blanche",
        expected: "PLNK111111"
    },
    {
        input: "blanchfield",
        expected: "PLNKFT1111"
    },
    {
        input: "bland",
        expected: "PLNT111111"
    },
    {
        input: "blandford",
        expected: "PLNTFT1111"
    },
    {
        input: "blaney",
        expected: "PLNA111111"
    },
    {
        input: "blayden",
        expected: "PLTN111111"
    },
    {
        input: "bleach",
        expected: "PLK1111111"
    },
    {
        input: "blease",
        expected: "PLS1111111"
    },
    {
        input: "blee",
        expected: "PLA1111111"
    },
    {
        input: "blell",
        expected: "PLA1111111"
    },
    {
        input: "blenard",
        expected: "PLNT111111"
    },
    {
        input: "blick",
        expected: "PLK1111111"
    },
    {
        input: "blincoe",
        expected: "PLNKA11111"
    },
    {
        input: "blines",
        expected: "PLNS111111"
    },
    {
        input: "blomfield",
        expected: "PLMFT11111"
    },
    {
        input: "bloomfield",
        expected: "PLMFT11111"
    },
    {
        input: "bloss",
        expected: "PLS1111111"
    },
    {
        input: "blott",
        expected: "PLT1111111"
    },
    {
        input: "bloxham",
        expected: "PLKM111111"
    },
    {
        input: "bloy",
        expected: "PLA1111111"
    },
    {
        input: "blue",
        expected: "PLA1111111"
    },
    {
        input: "bluett",
        expected: "PLT1111111"
    },
    {
        input: "blunt",
        expected: "PLNT111111"
    },
    {
        input: "blyth",
        expected: "PLT1111111"
    },
    {
        input: "blythe",
        expected: "PLT1111111"
    },
    {
        input: "bnker",
        expected: "PNKA111111"
    },
    {
        input: "boag",
        expected: "PK11111111"
    },
    {
        input: "boardman",
        expected: "PTMN111111"
    },
    {
        input: "boatwood",
        expected: "PTWT111111"
    },
    {
        input: "boaz",
        expected: "PS11111111"
    },
    {
        input: "bobbett",
        expected: "PPT1111111"
    },
    {
        input: "boberg",
        expected: "PPK1111111"
    },
    {
        input: "bobsien",
        expected: "PPSN111111"
    },
    {
        input: "boddy",
        expected: "PTA1111111"
    },
    {
        input: "boddye",
        expected: "PTA1111111"
    },
    {
        input: "bode",
        expected: "PT11111111"
    },
    {
        input: "bodil",
        expected: "PTA1111111"
    },
    {
        input: "bodkin",
        expected: "PTKN111111"
    },
    {
        input: "boecking",
        expected: "PKNK111111"
    },
    {
        input: "boelke",
        expected: "PK11111111"
    },
    {
        input: "bogue",
        expected: "PKA1111111"
    },
    {
        input: "bohm",
        expected: "PM11111111"
    },
    {
        input: "bohrsman",
        expected: "PSMN111111"
    },
    {
        input: "boland",
        expected: "PLNT111111"
    },
    {
        input: "bollard",
        expected: "PLT1111111"
    },
    {
        input: "bollett",
        expected: "PLT1111111"
    },
    {
        input: "bollettie",
        expected: "PLTA111111"
    },
    {
        input: "bolsand",
        expected: "PSNT111111"
    },
    {
        input: "bolstad",
        expected: "PSTT111111"
    },
    {
        input: "bolt",
        expected: "PT11111111"
    },
    {
        input: "bolting",
        expected: "PTNK111111"
    },
    {
        input: "bolton",
        expected: "PTN1111111"
    },
    {
        input: "bolwell",
        expected: "PWA1111111"
    },
    {
        input: "bolwill",
        expected: "PWA1111111"
    },
    {
        input: "bonar",
        expected: "PNA1111111"
    },
    {
        input: "bonasich",
        expected: "PNSK111111"
    },
    {
        input: "bond",
        expected: "PNT1111111"
    },
    {
        input: "bone",
        expected: "PN11111111"
    },
    {
        input: "boner",
        expected: "PNA1111111"
    },
    {
        input: "bonetti",
        expected: "PNTA111111"
    },
    {
        input: "bongard",
        expected: "PNKT111111"
    },
    {
        input: "bonham",
        expected: "PNM1111111"
    },
    {
        input: "boniface",
        expected: "PNFK111111"
    },
    {
        input: "bonifant",
        expected: "PNFNT11111"
    },
    {
        input: "bonney",
        expected: "PNA1111111"
    },
    {
        input: "bonnie",
        expected: "PNA1111111"
    },
    {
        input: "bonnin",
        expected: "PNN1111111"
    },
    {
        input: "booker",
        expected: "PKA1111111"
    },
    {
        input: "bool",
        expected: "PA11111111"
    },
    {
        input: "booley",
        expected: "PLA1111111"
    },
    {
        input: "boot",
        expected: "PT11111111"
    },
    {
        input: "booten",
        expected: "PTN1111111"
    },
    {
        input: "booth",
        expected: "PT11111111"
    },
    {
        input: "boothroyd",
        expected: "PTRT111111"
    },
    {
        input: "bootten",
        expected: "PTN1111111"
    },
    {
        input: "boraman",
        expected: "PRMN111111"
    },
    {
        input: "bordix",
        expected: "PTK1111111"
    },
    {
        input: "boreham",
        expected: "PRM1111111"
    },
    {
        input: "borjeson",
        expected: "PRSN111111"
    },
    {
        input: "borland",
        expected: "PLNT111111"
    },
    {
        input: "borley",
        expected: "PLA1111111"
    },
    {
        input: "borne",
        expected: "PN11111111"
    },
    {
        input: "borrie",
        expected: "PRA1111111"
    },
    {
        input: "borthwick",
        expected: "PTWK111111"
    },
    {
        input: "borton",
        expected: "PTN1111111"
    },
    {
        input: "borwick",
        expected: "PWK1111111"
    },
    {
        input: "boswell",
        expected: "PSWA111111"
    },
    {
        input: "bosworth",
        expected: "PSWT111111"
    },
    {
        input: "bott",
        expected: "PT11111111"
    },
    {
        input: "botting",
        expected: "PTNK111111"
    },
    {
        input: "boucher",
        expected: "PKA1111111"
    },
    {
        input: "bouchor",
        expected: "PKA1111111"
    },
    {
        input: "boud",
        expected: "PT11111111"
    },
    {
        input: "boulnois",
        expected: "PNS1111111"
    },
    {
        input: "boult",
        expected: "PT11111111"
    },
    {
        input: "boulter",
        expected: "PTA1111111"
    },
    {
        input: "boulton",
        expected: "PTN1111111"
    },
    {
        input: "bouquet",
        expected: "PKT1111111"
    },
    {
        input: "bourke",
        expected: "PK11111111"
    },
    {
        input: "bourne",
        expected: "PN11111111"
    },
    {
        input: "boutcher",
        expected: "PKA1111111"
    },
    {
        input: "bouterey",
        expected: "PTRA111111"
    },
    {
        input: "bowdell",
        expected: "PTA1111111"
    },
    {
        input: "bowden",
        expected: "PTN1111111"
    },
    {
        input: "bowdler",
        expected: "PTLA111111"
    },
    {
        input: "bowen",
        expected: "PWN1111111"
    },
    {
        input: "bower",
        expected: "PWA1111111"
    },
    {
        input: "bowers",
        expected: "PWS1111111"
    },
    {
        input: "bowie",
        expected: "PWA1111111"
    },
    {
        input: "bowker",
        expected: "PKA1111111"
    },
    {
        input: "bowkett",
        expected: "PKT1111111"
    },
    {
        input: "bowler",
        expected: "PLA1111111"
    },
    {
        input: "bowles",
        expected: "PLS1111111"
    },
    {
        input: "bowling",
        expected: "PLNK111111"
    },
    {
        input: "bowls",
        expected: "PS11111111"
    },
    {
        input: "bowman",
        expected: "PMN1111111"
    },
    {
        input: "bowmar",
        expected: "PMA1111111"
    },
    {
        input: "bowser",
        expected: "PSA1111111"
    },
    {
        input: "boxall",
        expected: "PKA1111111"
    },
    {
        input: "boyall",
        expected: "PA11111111"
    },
    {
        input: "boyd",
        expected: "PT11111111"
    },
    {
        input: "boyer",
        expected: "PA11111111"
    },
    {
        input: "boyes",
        expected: "PS11111111"
    },
    {
        input: "boyison",
        expected: "PSN1111111"
    },
    {
        input: "boyland",
        expected: "PLNT111111"
    },
    {
        input: "boyle",
        expected: "PA11111111"
    },
    {
        input: "boylen",
        expected: "PLN1111111"
    },
    {
        input: "boyles",
        expected: "PLS1111111"
    },
    {
        input: "boys",
        expected: "PS11111111"
    },
    {
        input: "brabant",
        expected: "PRPNT11111"
    },
    {
        input: "brabyn",
        expected: "PRPN111111"
    },
    {
        input: "bracegirdle",
        expected: "PRSKTA1111"
    },
    {
        input: "brackenridge",
        expected: "PRKNRK1111"
    },
    {
        input: "brackley",
        expected: "PRKLA11111"
    },
    {
        input: "bracks",
        expected: "PRKS111111"
    },
    {
        input: "braden",
        expected: "PRTN111111"
    },
    {
        input: "bradford",
        expected: "PRTFT11111"
    },
    {
        input: "brading",
        expected: "PRTNK11111"
    },
    {
        input: "bradley",
        expected: "PRTLA11111"
    },
    {
        input: "bradshaw",
        expected: "PRTSA11111"
    },
    {
        input: "brady",
        expected: "PRTA111111"
    },
    {
        input: "bragg",
        expected: "PRK1111111"
    },
    {
        input: "braham",
        expected: "PRM1111111"
    },
    {
        input: "braid",
        expected: "PRT1111111"
    },
    {
        input: "braidwood",
        expected: "PRTWT11111"
    },
    {
        input: "brail",
        expected: "PRA1111111"
    },
    {
        input: "braimbridge",
        expected: "PRMPRK1111"
    },
    {
        input: "brain",
        expected: "PRN1111111"
    },
    {
        input: "braithiwaite",
        expected: "PRTWT11111"
    },
    {
        input: "braithwaite",
        expected: "PRTWT11111"
    },
    {
        input: "bramley",
        expected: "PRMLA11111"
    },
    {
        input: "bramwell",
        expected: "PRMWA11111"
    },
    {
        input: "brand",
        expected: "PRNT111111"
    },
    {
        input: "brander",
        expected: "PRNTA11111"
    },
    {
        input: "brandon",
        expected: "PRNTN11111"
    },
    {
        input: "brands",
        expected: "PRNTS11111"
    },
    {
        input: "brandt",
        expected: "PRNT111111"
    },
    {
        input: "bransgrove",
        expected: "PRNSKRF111"
    },
    {
        input: "branson",
        expected: "PRNSN11111"
    },
    {
        input: "brass",
        expected: "PRS1111111"
    },
    {
        input: "bratby",
        expected: "PRTPA11111"
    },
    {
        input: "brathwaite",
        expected: "PRTWT11111"
    },
    {
        input: "bray",
        expected: "PRA1111111"
    },
    {
        input: "brazil",
        expected: "PRSA111111"
    },
    {
        input: "breach",
        expected: "PRK1111111"
    },
    {
        input: "breatne",
        expected: "PRTN111111"
    },
    {
        input: "brebner",
        expected: "PRPNA11111"
    },
    {
        input: "bree",
        expected: "PRA1111111"
    },
    {
        input: "breen",
        expected: "PRN1111111"
    },
    {
        input: "breese",
        expected: "PRS1111111"
    },
    {
        input: "breeze",
        expected: "PRS1111111"
    },
    {
        input: "breezetta",
        expected: "PRSTA11111"
    },
    {
        input: "bregmen",
        expected: "PRKMN11111"
    },
    {
        input: "brehaut",
        expected: "PRT1111111"
    },
    {
        input: "bremford",
        expected: "PRMFT11111"
    },
    {
        input: "bremmer",
        expected: "PRMA111111"
    },
    {
        input: "bremner",
        expected: "PRMNA11111"
    },
    {
        input: "brenda",
        expected: "PRNTA11111"
    },
    {
        input: "brennan",
        expected: "PRNN111111"
    },
    {
        input: "brenssell",
        expected: "PRNSA11111"
    },
    {
        input: "brent",
        expected: "PRNT111111"
    },
    {
        input: "bresanello",
        expected: "PRSNLA1111"
    },
    {
        input: "bresnahan",
        expected: "PRSNN11111"
    },
    {
        input: "bretherton",
        expected: "PRTTN11111"
    },
    {
        input: "brett",
        expected: "PRT1111111"
    },
    {
        input: "brettell",
        expected: "PRTA111111"
    },
    {
        input: "brew",
        expected: "PRA1111111"
    },
    {
        input: "brewer",
        expected: "PRWA111111"
    },
    {
        input: "brewster",
        expected: "PRSTA11111"
    },
    {
        input: "brian",
        expected: "PRN1111111"
    },
    {
        input: "briant",
        expected: "PRNT111111"
    },
    {
        input: "briasco",
        expected: "PRSKA11111"
    },
    {
        input: "brice",
        expected: "PRK1111111"
    },
    {
        input: "brickell",
        expected: "PRKA111111"
    },
    {
        input: "brickland",
        expected: "PRKLNT1111"
    },
    {
        input: "briden",
        expected: "PRTN111111"
    },
    {
        input: "bridge",
        expected: "PRK1111111"
    },
    {
        input: "bridgeman",
        expected: "PRKMN11111"
    },
    {
        input: "bridger",
        expected: "PRKA111111"
    },
    {
        input: "bridges",
        expected: "PRKS111111"
    },
    {
        input: "bridget",
        expected: "PRKT111111"
    },
    {
        input: "bridgman",
        expected: "PRKMN11111"
    },
    {
        input: "bridie",
        expected: "PRTA111111"
    },
    {
        input: "brien",
        expected: "PRN1111111"
    },
    {
        input: "brierley",
        expected: "PRLA111111"
    },
    {
        input: "briggs",
        expected: "PRKS111111"
    },
    {
        input: "bright",
        expected: "PRT1111111"
    },
    {
        input: "brighting",
        expected: "PRTNK11111"
    },
    {
        input: "brightling",
        expected: "PRTLNK1111"
    },
    {
        input: "brightmore",
        expected: "PRTMA11111"
    },
    {
        input: "brightwell",
        expected: "PRTWA11111"
    },
    {
        input: "brigid",
        expected: "PRKT111111"
    },
    {
        input: "briley",
        expected: "PRLA111111"
    },
    {
        input: "brill",
        expected: "PRA1111111"
    },
    {
        input: "bringans",
        expected: "PRNKNS1111"
    },
    {
        input: "bringarts",
        expected: "PRNKTS1111"
    },
    {
        input: "brinkworth",
        expected: "PRNKWT1111"
    },
    {
        input: "brinn",
        expected: "PRN1111111"
    },
    {
        input: "brinsdon",
        expected: "PRNSTN1111"
    },
    {
        input: "brinsley",
        expected: "PRNSLA1111"
    },
    {
        input: "brisbane",
        expected: "PRSPN11111"
    },
    {
        input: "briscoe",
        expected: "PRSKA11111"
    },
    {
        input: "brisley",
        expected: "PRSLA11111"
    },
    {
        input: "briston",
        expected: "PRSTN11111"
    },
    {
        input: "bristow",
        expected: "PRSTA11111"
    },
    {
        input: "briton",
        expected: "PRTN111111"
    },
    {
        input: "britten",
        expected: "PRTN111111"
    },
    {
        input: "brittenden",
        expected: "PRTNTN1111"
    },
    {
        input: "britton",
        expected: "PRTN111111"
    },
    {
        input: "brixton",
        expected: "PRKTN11111"
    },
    {
        input: "broad",
        expected: "PRT1111111"
    },
    {
        input: "broadbent",
        expected: "PRTPNT1111"
    },
    {
        input: "broadfoot",
        expected: "PRTFT11111"
    },
    {
        input: "broadhead",
        expected: "PRTT111111"
    },
    {
        input: "broadley",
        expected: "PRTLA11111"
    },
    {
        input: "brock",
        expected: "PRK1111111"
    },
    {
        input: "brocket",
        expected: "PRKT111111"
    },
    {
        input: "brockie",
        expected: "PRKA111111"
    },
    {
        input: "brocklebank",
        expected: "PRKLPNK111"
    },
    {
        input: "brocklehurst",
        expected: "PRKLST1111"
    },
    {
        input: "broderick",
        expected: "PRTRK11111"
    },
    {
        input: "brodie",
        expected: "PRTA111111"
    },
    {
        input: "brodrick",
        expected: "PRTRK11111"
    },
    {
        input: "broenaham",
        expected: "PRNM111111"
    },
    {
        input: "bromley",
        expected: "PRMLA11111"
    },
    {
        input: "brook",
        expected: "PRK1111111"
    },
    {
        input: "brooke",
        expected: "PRK1111111"
    },
    {
        input: "brooker",
        expected: "PRKA111111"
    },
    {
        input: "brookes",
        expected: "PRKS111111"
    },
    {
        input: "brooket",
        expected: "PRKT111111"
    },
    {
        input: "brooklehurst",
        expected: "PRKLST1111"
    },
    {
        input: "brooks",
        expected: "PRKS111111"
    },
    {
        input: "brool",
        expected: "PRA1111111"
    },
    {
        input: "broolcs",
        expected: "PRKS111111"
    },
    {
        input: "broom",
        expected: "PRM1111111"
    },
    {
        input: "broome",
        expected: "PRM1111111"
    },
    {
        input: "broomfield",
        expected: "PRMFT11111"
    },
    {
        input: "broomhall",
        expected: "PRMA111111"
    },
    {
        input: "brosnahan",
        expected: "PRSNN11111"
    },
    {
        input: "brosnan",
        expected: "PRSNN11111"
    },
    {
        input: "brotherhoo",
        expected: "PRTA111111"
    },
    {
        input: "brotherhood",
        expected: "PRTT111111"
    },
    {
        input: "brotherston",
        expected: "PRTSTN1111"
    },
    {
        input: "brotherton",
        expected: "PRTTN11111"
    },
    {
        input: "brough",
        expected: "PRA1111111"
    },
    {
        input: "broughton",
        expected: "PRTN111111"
    },
    {
        input: "browett",
        expected: "PRWT111111"
    },
    {
        input: "brown",
        expected: "PRN1111111"
    },
    {
        input: "brown-durie",
        expected: "PRNTRA1111"
    },
    {
        input: "brown-rennie",
        expected: "PRNRNA1111"
    },
    {
        input: "browne",
        expected: "PRN1111111"
    },
    {
        input: "brownell",
        expected: "PRNA111111"
    },
    {
        input: "brownie",
        expected: "PRNA111111"
    },
    {
        input: "browning",
        expected: "PRNNK11111"
    },
    {
        input: "brownlie",
        expected: "PRNLA11111"
    },
    {
        input: "bruce",
        expected: "PRK1111111"
    },
    {
        input: "bruco",
        expected: "PRKA111111"
    },
    {
        input: "brugh",
        expected: "PRA1111111"
    },
    {
        input: "bruhns",
        expected: "PRNS111111"
    },
    {
        input: "brundell",
        expected: "PRNTA11111"
    },
    {
        input: "bruno",
        expected: "PRNA111111"
    },
    {
        input: "brunton",
        expected: "PRNTN11111"
    },
    {
        input: "bruten",
        expected: "PRTN111111"
    },
    {
        input: "bruton",
        expected: "PRTN111111"
    },
    {
        input: "bryan",
        expected: "PRN1111111"
    },
    {
        input: "bryant",
        expected: "PRNT111111"
    },
    {
        input: "bryce",
        expected: "PRK1111111"
    },
    {
        input: "bryda",
        expected: "PRTA111111"
    },
    {
        input: "bryden",
        expected: "PRTN111111"
    },
    {
        input: "brydone",
        expected: "PRTN111111"
    },
    {
        input: "bryson",
        expected: "PRSN111111"
    },
    {
        input: "btrns",
        expected: "PTNS111111"
    },
    {
        input: "buchan",
        expected: "PKN1111111"
    },
    {
        input: "buchanan",
        expected: "PKNN111111"
    },
    {
        input: "buck",
        expected: "PK11111111"
    },
    {
        input: "buckingham",
        expected: "PKNM111111"
    },
    {
        input: "buckland",
        expected: "PKLNT11111"
    },
    {
        input: "buckley",
        expected: "PKLA111111"
    },
    {
        input: "buddicom",
        expected: "PTKM111111"
    },
    {
        input: "buddicomb",
        expected: "PTKM111111"
    },
    {
        input: "buddicombe",
        expected: "PTKM111111"
    },
    {
        input: "buddle",
        expected: "PTA1111111"
    },
    {
        input: "budge",
        expected: "PK11111111"
    },
    {
        input: "bugby",
        expected: "PKPA111111"
    },
    {
        input: "bugden",
        expected: "PKTN111111"
    },
    {
        input: "buist",
        expected: "PST1111111"
    },
    {
        input: "bulfin",
        expected: "PFN1111111"
    },
    {
        input: "bulger",
        expected: "PKA1111111"
    },
    {
        input: "bulimba",
        expected: "PLMPA11111"
    },
    {
        input: "bull",
        expected: "PA11111111"
    },
    {
        input: "bullars",
        expected: "PLS1111111"
    },
    {
        input: "bullen",
        expected: "PLN1111111"
    },
    {
        input: "bullett",
        expected: "PLT1111111"
    },
    {
        input: "bullock",
        expected: "PLK1111111"
    },
    {
        input: "bullot",
        expected: "PLT1111111"
    },
    {
        input: "bullough",
        expected: "PLA1111111"
    },
    {
        input: "bulmer",
        expected: "PMA1111111"
    },
    {
        input: "bum",
        expected: "PM11111111"
    },
    {
        input: "bums",
        expected: "PMS1111111"
    },
    {
        input: "bunce",
        expected: "PNK1111111"
    },
    {
        input: "bundo",
        expected: "PNTA111111"
    },
    {
        input: "bungard",
        expected: "PNKT111111"
    },
    {
        input: "bungardt",
        expected: "PNKT111111"
    },
    {
        input: "bunting",
        expected: "PNTNK11111"
    },
    {
        input: "burbery",
        expected: "PPRA111111"
    },
    {
        input: "burbury",
        expected: "PPRA111111"
    },
    {
        input: "burcoll",
        expected: "PKA1111111"
    },
    {
        input: "burdekin",
        expected: "PTKN111111"
    },
    {
        input: "burden",
        expected: "PTN1111111"
    },
    {
        input: "burdett",
        expected: "PTT1111111"
    },
    {
        input: "burdon",
        expected: "PTN1111111"
    },
    {
        input: "burford",
        expected: "PFT1111111"
    },
    {
        input: "burger",
        expected: "PKA1111111"
    },
    {
        input: "burgess",
        expected: "PKS1111111"
    },
    {
        input: "burk",
        expected: "PK11111111"
    },
    {
        input: "burke",
        expected: "PK11111111"
    },
    {
        input: "burkinshaw",
        expected: "PKNSA11111"
    },
    {
        input: "burley",
        expected: "PLA1111111"
    },
    {
        input: "burlinson",
        expected: "PLNSN11111"
    },
    {
        input: "burma",
        expected: "PMA1111111"
    },
    {
        input: "burn",
        expected: "PN11111111"
    },
    {
        input: "burnard",
        expected: "PNT1111111"
    },
    {
        input: "burnes",
        expected: "PNS1111111"
    },
    {
        input: "burnett",
        expected: "PNT1111111"
    },
    {
        input: "burns",
        expected: "PNS1111111"
    },
    {
        input: "burnside",
        expected: "PNST111111"
    },
    {
        input: "burrell",
        expected: "PRA1111111"
    },
    {
        input: "burridge",
        expected: "PRK1111111"
    },
    {
        input: "burrow",
        expected: "PRA1111111"
    },
    {
        input: "burrowes",
        expected: "PRWS111111"
    },
    {
        input: "burrows",
        expected: "PRS1111111"
    },
    {
        input: "burson",
        expected: "PSN1111111"
    },
    {
        input: "burt",
        expected: "PT11111111"
    },
    {
        input: "burton",
        expected: "PTN1111111"
    },
    {
        input: "busbridge",
        expected: "PSPRK11111"
    },
    {
        input: "busby",
        expected: "PSPA111111"
    },
    {
        input: "bush",
        expected: "PS11111111"
    },
    {
        input: "bushell",
        expected: "PSA1111111"
    },
    {
        input: "buss",
        expected: "PS11111111"
    },
    {
        input: "bussorah",
        expected: "PSRA111111"
    },
    {
        input: "busst",
        expected: "PST1111111"
    },
    {
        input: "bustin",
        expected: "PSTN111111"
    },
    {
        input: "butchart",
        expected: "PKT1111111"
    },
    {
        input: "butcher",
        expected: "PKA1111111"
    },
    {
        input: "butel",
        expected: "PTA1111111"
    },
    {
        input: "butler",
        expected: "PTLA111111"
    },
    {
        input: "butlin",
        expected: "PTLN111111"
    },
    {
        input: "butt",
        expected: "PT11111111"
    },
    {
        input: "butterfield",
        expected: "PTFT111111"
    },
    {
        input: "buttermore",
        expected: "PTMA111111"
    },
    {
        input: "butterworth",
        expected: "PTWT111111"
    },
    {
        input: "buttimore",
        expected: "PTMA111111"
    },
    {
        input: "button",
        expected: "PTN1111111"
    },
    {
        input: "butts",
        expected: "PTS1111111"
    },
    {
        input: "buxton",
        expected: "PKTN111111"
    },
    {
        input: "buzzard",
        expected: "PST1111111"
    },
    {
        input: "bvrne",
        expected: "PFN1111111"
    },
    {
        input: "byfield",
        expected: "PFT1111111"
    },
    {
        input: "byford",
        expected: "PFT1111111"
    },
    {
        input: "byrel",
        expected: "PRA1111111"
    },
    {
        input: "byrl",
        expected: "PA11111111"
    },
    {
        input: "byrne",
        expected: "PN11111111"
    },
    {
        input: "byrnes",
        expected: "PNS1111111"
    },
    {
        input: "byrno",
        expected: "PNA1111111"
    },
    {
        input: "cabena",
        expected: "KPNA111111"
    },
    {
        input: "cabral",
        expected: "KPRA111111"
    },
    {
        input: "caddie",
        expected: "KTA1111111"
    },
    {
        input: "cadigan",
        expected: "KTKN111111"
    },
    {
        input: "cadogan",
        expected: "KTKN111111"
    },
    {
        input: "caerwood",
        expected: "KWT1111111"
    },
    {
        input: "caffin",
        expected: "KFN1111111"
    },
    {
        input: "cagney",
        expected: "KKNA111111"
    },
    {
        input: "cahill",
        expected: "KA11111111"
    },
    {
        input: "caidwell",
        expected: "KTWA111111"
    },
    {
        input: "caigou",
        expected: "KKA1111111"
    },
    {
        input: "cain",
        expected: "KN11111111"
    },
    {
        input: "caird",
        expected: "KT11111111"
    },
    {
        input: "cairney",
        expected: "KNA1111111"
    },
    {
        input: "cairns",
        expected: "KNS1111111"
    },
    {
        input: "caithness",
        expected: "KTNS111111"
    },
    {
        input: "calcott",
        expected: "KKT1111111"
    },
    {
        input: "calcutt",
        expected: "KKT1111111"
    },
    {
        input: "calder",
        expected: "KTA1111111"
    },
    {
        input: "calderwood",
        expected: "KTWT111111"
    },
    {
        input: "caldow",
        expected: "KTA1111111"
    },
    {
        input: "caldweil",
        expected: "KTWA111111"
    },
    {
        input: "caldwell",
        expected: "KTWA111111"
    },
    {
        input: "calex",
        expected: "KLK1111111"
    },
    {
        input: "caley",
        expected: "KLA1111111"
    },
    {
        input: "callaghan",
        expected: "KLKN111111"
    },
    {
        input: "callam",
        expected: "KLM1111111"
    },
    {
        input: "callan",
        expected: "KLN1111111"
    },
    {
        input: "callanan",
        expected: "KLNN111111"
    },
    {
        input: "calland",
        expected: "KLNT111111"
    },
    {
        input: "callander",
        expected: "KLNTA11111"
    },
    {
        input: "callaster",
        expected: "KLSTA11111"
    },
    {
        input: "callaway",
        expected: "KLWA111111"
    },
    {
        input: "callender",
        expected: "KLNTA11111"
    },
    {
        input: "calley",
        expected: "KLA1111111"
    },
    {
        input: "callighan",
        expected: "KLKN111111"
    },
    {
        input: "callinder",
        expected: "KLNTA11111"
    },
    {
        input: "callis",
        expected: "KLS1111111"
    },
    {
        input: "callister",
        expected: "KLSTA11111"
    },
    {
        input: "callon",
        expected: "KLN1111111"
    },
    {
        input: "calverley",
        expected: "KFLA111111"
    },
    {
        input: "calvert",
        expected: "KFT1111111"
    },
    {
        input: "calvey",
        expected: "KFA1111111"
    },
    {
        input: "camelia",
        expected: "KMLA111111"
    },
    {
        input: "camellia",
        expected: "KMLA111111"
    },
    {
        input: "cameron",
        expected: "KMRN111111"
    },
    {
        input: "cammock",
        expected: "KMK1111111"
    },
    {
        input: "campbell",
        expected: "KMPA111111"
    },
    {
        input: "campion",
        expected: "KMPN111111"
    },
    {
        input: "camplell",
        expected: "KMPLA11111"
    },
    {
        input: "can1eron",
        expected: "KNRN111111"
    },
    {
        input: "canavan",
        expected: "KNFN111111"
    },
    {
        input: "canning",
        expected: "KNNK111111"
    },
    {
        input: "cannon",
        expected: "KNN1111111"
    },
    {
        input: "cannons",
        expected: "KNNS111111"
    },
    {
        input: "canpbell",
        expected: "KNPA111111"
    },
    {
        input: "canter",
        expected: "KNTA111111"
    },
    {
        input: "cantrell",
        expected: "KNTRA11111"
    },
    {
        input: "cantwell",
        expected: "KNTWA11111"
    },
    {
        input: "canty",
        expected: "KNTA111111"
    },
    {
        input: "capitaneas",
        expected: "KPTNS11111"
    },
    {
        input: "caple",
        expected: "KPA1111111"
    },
    {
        input: "capstick",
        expected: "KPSTK11111"
    },
    {
        input: "caraclus",
        expected: "KRKLS11111"
    },
    {
        input: "caradus",
        expected: "KRTS111111"
    },
    {
        input: "caravan",
        expected: "KRFN111111"
    },
    {
        input: "carber",
        expected: "KPA1111111"
    },
    {
        input: "carberry",
        expected: "KPRA111111"
    },
    {
        input: "cardale",
        expected: "KTA1111111"
    },
    {
        input: "carden",
        expected: "KTN1111111"
    },
    {
        input: "carder",
        expected: "KTA1111111"
    },
    {
        input: "cardno",
        expected: "KTNA111111"
    },
    {
        input: "care",
        expected: "KA11111111"
    },
    {
        input: "caren",
        expected: "KRN1111111"
    },
    {
        input: "carew",
        expected: "KRA1111111"
    },
    {
        input: "carey",
        expected: "KRA1111111"
    },
    {
        input: "cargill",
        expected: "KKA1111111"
    },
    {
        input: "carita",
        expected: "KRTA111111"
    },
    {
        input: "carl",
        expected: "KA11111111"
    },
    {
        input: "carlene",
        expected: "KLN1111111"
    },
    {
        input: "carley",
        expected: "KLA1111111"
    },
    {
        input: "carlile",
        expected: "KLA1111111"
    },
    {
        input: "carlin",
        expected: "KLN1111111"
    },
    {
        input: "carline",
        expected: "KLN1111111"
    },
    {
        input: "carlson",
        expected: "KSN1111111"
    },
    {
        input: "carlton",
        expected: "KTN1111111"
    },
    {
        input: "carlyle",
        expected: "KLA1111111"
    },
    {
        input: "carmalt",
        expected: "KMT1111111"
    },
    {
        input: "carman",
        expected: "KMN1111111"
    },
    {
        input: "carmen",
        expected: "KMN1111111"
    },
    {
        input: "carmichael",
        expected: "KMKA111111"
    },
    {
        input: "carmody",
        expected: "KMTA111111"
    },
    {
        input: "carnahan",
        expected: "KNN1111111"
    },
    {
        input: "carnegie",
        expected: "KNKA111111"
    },
    {
        input: "carney",
        expected: "KNA1111111"
    },
    {
        input: "carnie",
        expected: "KNA1111111"
    },
    {
        input: "carole",
        expected: "KRA1111111"
    },
    {
        input: "carolin",
        expected: "KRLN111111"
    },
    {
        input: "carolina",
        expected: "KRLNA11111"
    },
    {
        input: "caroline",
        expected: "KRLN111111"
    },
    {
        input: "carona",
        expected: "KRNA111111"
    },
    {
        input: "carpenter",
        expected: "KPNTA11111"
    },
    {
        input: "carr",
        expected: "KA11111111"
    },
    {
        input: "carra",
        expected: "KRA1111111"
    },
    {
        input: "carrick",
        expected: "KRK1111111"
    },
    {
        input: "carrie",
        expected: "KRA1111111"
    },
    {
        input: "carrigan",
        expected: "KRKN111111"
    },
    {
        input: "carrington",
        expected: "KRNKTN1111"
    },
    {
        input: "carrodus",
        expected: "KRTS111111"
    },
    {
        input: "carroll",
        expected: "KRA1111111"
    },
    {
        input: "carruther",
        expected: "KRTA111111"
    },
    {
        input: "carruthers",
        expected: "KRTS111111"
    },
    {
        input: "carrutlers",
        expected: "KRTLS11111"
    },
    {
        input: "carside",
        expected: "KST1111111"
    },
    {
        input: "carslaw",
        expected: "KSLA111111"
    },
    {
        input: "carson",
        expected: "KSN1111111"
    },
    {
        input: "carswe11",
        expected: "KSA1111111"
    },
    {
        input: "carswell",
        expected: "KSWA111111"
    },
    {
        input: "carter",
        expected: "KTA1111111"
    },
    {
        input: "carton",
        expected: "KTN1111111"
    },
    {
        input: "cartwright",
        expected: "KTRT111111"
    },
    {
        input: "caruthers",
        expected: "KRTS111111"
    },
    {
        input: "carvalho",
        expected: "KFA1111111"
    },
    {
        input: "carvell",
        expected: "KFA1111111"
    },
    {
        input: "carver",
        expected: "KFA1111111"
    },
    {
        input: "carvosso",
        expected: "KFSA111111"
    },
    {
        input: "case",
        expected: "KS11111111"
    },
    {
        input: "caselberg",
        expected: "KSPK111111"
    },
    {
        input: "caser",
        expected: "KSA1111111"
    },
    {
        input: "casey",
        expected: "KSA1111111"
    },
    {
        input: "cash",
        expected: "KS11111111"
    },
    {
        input: "cashman",
        expected: "KSMN111111"
    },
    {
        input: "caskie",
        expected: "KSKA111111"
    },
    {
        input: "cass",
        expected: "KS11111111"
    },
    {
        input: "cassandra",
        expected: "KSNTRA1111"
    },
    {
        input: "cassells",
        expected: "KSS1111111"
    },
    {
        input: "cassels",
        expected: "KSS1111111"
    },
    {
        input: "casserley",
        expected: "KSLA111111"
    },
    {
        input: "casserly",
        expected: "KSLA111111"
    },
    {
        input: "cassidv",
        expected: "KSTF111111"
    },
    {
        input: "cassidy",
        expected: "KSTA111111"
    },
    {
        input: "cassie",
        expected: "KSA1111111"
    },
    {
        input: "cassitly",
        expected: "KSTLA11111"
    },
    {
        input: "casson",
        expected: "KSN1111111"
    },
    {
        input: "castelli",
        expected: "KSTLA11111"
    },
    {
        input: "caster",
        expected: "KSTA111111"
    },
    {
        input: "castle",
        expected: "KSTA111111"
    },
    {
        input: "castlehow",
        expected: "KSTLA11111"
    },
    {
        input: "catchpole",
        expected: "KKPA111111"
    },
    {
        input: "cate",
        expected: "KT11111111"
    },
    {
        input: "cater",
        expected: "KTA1111111"
    },
    {
        input: "catharine",
        expected: "KTRN111111"
    },
    {
        input: "cathelus",
        expected: "KTLS111111"
    },
    {
        input: "catherina",
        expected: "KTRNA11111"
    },
    {
        input: "catherine",
        expected: "KTRN111111"
    },
    {
        input: "cathilus",
        expected: "KTLS111111"
    },
    {
        input: "cathleen",
        expected: "KTLN111111"
    },
    {
        input: "cathrien",
        expected: "KTRN111111"
    },
    {
        input: "cathrine",
        expected: "KTRN111111"
    },
    {
        input: "cathro",
        expected: "KTRA111111"
    },
    {
        input: "catrina",
        expected: "KTRNA11111"
    },
    {
        input: "catto",
        expected: "KTA1111111"
    },
    {
        input: "caughey",
        expected: "KKA1111111"
    },
    {
        input: "caulcutt",
        expected: "KKT1111111"
    },
    {
        input: "caulton",
        expected: "KTN1111111"
    },
    {
        input: "caunter",
        expected: "KNTA111111"
    },
    {
        input: "cavanagh",
        expected: "KFNA111111"
    },
    {
        input: "cave",
        expected: "KF11111111"
    },
    {
        input: "cavell",
        expected: "KFA1111111"
    },
    {
        input: "cawley",
        expected: "KLA1111111"
    },
    {
        input: "cawston",
        expected: "KSTN111111"
    },
    {
        input: "cawthorn",
        expected: "KTN1111111"
    },
    {
        input: "cayford",
        expected: "KFT1111111"
    },
    {
        input: "caygill",
        expected: "KKA1111111"
    },
    {
        input: "cayzer",
        expected: "KSA1111111"
    },
    {
        input: "cecelia",
        expected: "SSLA111111"
    },
    {
        input: "cecil",
        expected: "SSA1111111"
    },
    {
        input: "cecile",
        expected: "SSA1111111"
    },
    {
        input: "cecilia",
        expected: "SSLA111111"
    },
    {
        input: "cecily",
        expected: "SSLA111111"
    },
    {
        input: "cedric",
        expected: "STRK111111"
    },
    {
        input: "cedrie",
        expected: "STRA111111"
    },
    {
        input: "celestine",
        expected: "SLSTN11111"
    },
    {
        input: "celia",
        expected: "SLA1111111"
    },
    {
        input: "cessford",
        expected: "SSFT111111"
    },
    {
        input: "chadwick",
        expected: "KTWK111111"
    },
    {
        input: "challis",
        expected: "KLS1111111"
    },
    {
        input: "chalmer",
        expected: "KMA1111111"
    },
    {
        input: "chalmers",
        expected: "KMS1111111"
    },
    {
        input: "chamberlain",
        expected: "KMPLN11111"
    },
    {
        input: "chambers",
        expected: "KMPS111111"
    },
    {
        input: "chammen",
        expected: "KMN1111111"
    },
    {
        input: "champion",
        expected: "KMPN111111"
    },
    {
        input: "chanbers",
        expected: "KNPS111111"
    },
    {
        input: "chander",
        expected: "KNTA111111"
    },
    {
        input: "chandler",
        expected: "KNTLA11111"
    },
    {
        input: "chaney",
        expected: "KNA1111111"
    },
    {
        input: "chanldler",
        expected: "KNTLA11111"
    },
    {
        input: "channon",
        expected: "KNN1111111"
    },
    {
        input: "chantrill",
        expected: "KNTRA11111"
    },
    {
        input: "chaplain",
        expected: "KPLN111111"
    },
    {
        input: "chaplin",
        expected: "KPLN111111"
    },
    {
        input: "chapman",
        expected: "KPMN111111"
    },
    {
        input: "chappell",
        expected: "KPA1111111"
    },
    {
        input: "charia",
        expected: "KRA1111111"
    },
    {
        input: "charitable",
        expected: "KRTPA11111"
    },
    {
        input: "charker",
        expected: "KKA1111111"
    },
    {
        input: "charles",
        expected: "KLS1111111"
    },
    {
        input: "charlesclarence",
        expected: "KLSKLRNK11"
    },
    {
        input: "charleston",
        expected: "KLSTN11111"
    },
    {
        input: "charleswilliam",
        expected: "KLSWLM1111"
    },
    {
        input: "charley",
        expected: "KLA1111111"
    },
    {
        input: "charlie",
        expected: "KLA1111111"
    },
    {
        input: "charlott",
        expected: "KLT1111111"
    },
    {
        input: "charlotte",
        expected: "KLT1111111"
    },
    {
        input: "charlsworth",
        expected: "KSWT111111"
    },
    {
        input: "charlton",
        expected: "KTN1111111"
    },
    {
        input: "charnley",
        expected: "KNLA111111"
    },
    {
        input: "charters",
        expected: "KTS1111111"
    },
    {
        input: "chas",
        expected: "KS11111111"
    },
    {
        input: "chase",
        expected: "KS11111111"
    },
    {
        input: "chaston",
        expected: "KSTN111111"
    },
    {
        input: "chatles",
        expected: "KTLS111111"
    },
    {
        input: "chatterton",
        expected: "KTTN111111"
    },
    {
        input: "chave",
        expected: "KF11111111"
    },
    {
        input: "chayman",
        expected: "KMN1111111"
    },
    {
        input: "cheeseman",
        expected: "KSMN111111"
    },
    {
        input: "cheesman",
        expected: "KSMN111111"
    },
    {
        input: "chennells",
        expected: "KNS1111111"
    },
    {
        input: "cherrie",
        expected: "KRA1111111"
    },
    {
        input: "cherrv",
        expected: "KF11111111"
    },
    {
        input: "cherry",
        expected: "KRA1111111"
    },
    {
        input: "cheshire",
        expected: "KSA1111111"
    },
    {
        input: "chesney",
        expected: "KSNA111111"
    },
    {
        input: "chester",
        expected: "KSTA111111"
    },
    {
        input: "chesterman",
        expected: "KSTMN11111"
    },
    {
        input: "chetham",
        expected: "KTM1111111"
    },
    {
        input: "chettiebur",
        expected: "KTPA111111"
    },
    {
        input: "chettleburgh",
        expected: "KTLPA11111"
    },
    {
        input: "chetwil",
        expected: "KTWA111111"
    },
    {
        input: "chetwin",
        expected: "KTWN111111"
    },
    {
        input: "cheyne",
        expected: "KN11111111"
    },
    {
        input: "chickley",
        expected: "KKLA111111"
    },
    {
        input: "chilcott",
        expected: "KKT1111111"
    },
    {
        input: "child",
        expected: "KT11111111"
    },
    {
        input: "childs",
        expected: "KTS1111111"
    },
    {
        input: "chiles",
        expected: "KLS1111111"
    },
    {
        input: "chimside",
        expected: "KMST111111"
    },
    {
        input: "chin",
        expected: "KN11111111"
    },
    {
        input: "chin shin",
        expected: "KNSN111111"
    },
    {
        input: "chin shing",
        expected: "KNSNK11111"
    },
    {
        input: "ching",
        expected: "KNK1111111"
    },
    {
        input: "chirnside",
        expected: "KNST111111"
    },
    {
        input: "chisholm",
        expected: "KSM1111111"
    },
    {
        input: "chistopher",
        expected: "KSTFA11111"
    },
    {
        input: "chiswell",
        expected: "KSWA111111"
    },
    {
        input: "chits",
        expected: "KTS1111111"
    },
    {
        input: "chittock",
        expected: "KTK1111111"
    },
    {
        input: "chitty",
        expected: "KTA1111111"
    },
    {
        input: "chivers",
        expected: "KFS1111111"
    },
    {
        input: "cholmondeley",
        expected: "KMNTLA1111"
    },
    {
        input: "choo quee",
        expected: "KKA1111111"
    },
    {
        input: "chooquee",
        expected: "KKA1111111"
    },
    {
        input: "choules",
        expected: "KLS1111111"
    },
    {
        input: "chrarles",
        expected: "KRLS111111"
    },
    {
        input: "chrest",
        expected: "KRST111111"
    },
    {
        input: "chrisp",
        expected: "KRSP111111"
    },
    {
        input: "chrissie",
        expected: "KRSA111111"
    },
    {
        input: "chrissy",
        expected: "KRSA111111"
    },
    {
        input: "christabel",
        expected: "KRSTPA1111"
    },
    {
        input: "christabella",
        expected: "KRSTPLA111"
    },
    {
        input: "christen",
        expected: "KRSTN11111"
    },
    {
        input: "christena",
        expected: "KRSTNA1111"
    },
    {
        input: "christens",
        expected: "KRSTNS1111"
    },
    {
        input: "christensen",
        expected: "KRSTNSN111"
    },
    {
        input: "christenson",
        expected: "KRSTNSN111"
    },
    {
        input: "christeson",
        expected: "KRSTSN1111"
    },
    {
        input: "christian",
        expected: "KRSN111111"
    },
    {
        input: "christiana",
        expected: "KRSNA11111"
    },
    {
        input: "christie",
        expected: "KRSTA11111"
    },
    {
        input: "christina",
        expected: "KRSTNA1111"
    },
    {
        input: "christine",
        expected: "KRSTN11111"
    },
    {
        input: "christinn",
        expected: "KRSTN11111"
    },
    {
        input: "christobel",
        expected: "KRSTPA1111"
    },
    {
        input: "christophe",
        expected: "KRSTF11111"
    },
    {
        input: "christopher",
        expected: "KRSTFA1111"
    },
    {
        input: "chronican",
        expected: "KRNKN11111"
    },
    {
        input: "chronichan",
        expected: "KRNKN11111"
    },
    {
        input: "chrystall",
        expected: "KRSTA11111"
    },
    {
        input: "chudley",
        expected: "KTLA111111"
    },
    {
        input: "church",
        expected: "KK11111111"
    },
    {
        input: "churchill",
        expected: "KKA1111111"
    },
    {
        input: "churley",
        expected: "KLA1111111"
    },
    {
        input: "ciark",
        expected: "SK11111111"
    },
    {
        input: "ciarke",
        expected: "SK11111111"
    },
    {
        input: "cicely",
        expected: "SSLA111111"
    },
    {
        input: "cicil",
        expected: "SSA1111111"
    },
    {
        input: "cieveland",
        expected: "SFLNT11111"
    },
    {
        input: "ciiff",
        expected: "SF11111111"
    },
    {
        input: "ciose",
        expected: "SS11111111"
    },
    {
        input: "cissie",
        expected: "SSA1111111"
    },
    {
        input: "cissy",
        expected: "SSA1111111"
    },
    {
        input: "citfield",
        expected: "STFT111111"
    },
    {
        input: "clack",
        expected: "KLK1111111"
    },
    {
        input: "claire",
        expected: "KLA1111111"
    },
    {
        input: "clalence",
        expected: "KLLNK11111"
    },
    {
        input: "clance",
        expected: "KLNK111111"
    },
    {
        input: "clancy",
        expected: "KLNSA11111"
    },
    {
        input: "clapman",
        expected: "KLPMN11111"
    },
    {
        input: "clapp",
        expected: "KLP1111111"
    },
    {
        input: "clapperton",
        expected: "KLPTN11111"
    },
    {
        input: "clapshaw",
        expected: "KLPSA11111"
    },
    {
        input: "clara",
        expected: "KLRA111111"
    },
    {
        input: "clarance",
        expected: "KLRNK11111"
    },
    {
        input: "clare",
        expected: "KLA1111111"
    },
    {
        input: "clarels",
        expected: "KLRS111111"
    },
    {
        input: "clarence",
        expected: "KLRNK11111"
    },
    {
        input: "clarenda",
        expected: "KLRNTA1111"
    },
    {
        input: "clarenee",
        expected: "KLRNA11111"
    },
    {
        input: "claretta",
        expected: "KLRTA11111"
    },
    {
        input: "claribel",
        expected: "KLRPA11111"
    },
    {
        input: "clarice",
        expected: "KLRK111111"
    },
    {
        input: "claridge",
        expected: "KLRK111111"
    },
    {
        input: "clarinda",
        expected: "KLRNTA1111"
    },
    {
        input: "clarissa",
        expected: "KLRSA11111"
    },
    {
        input: "claritta",
        expected: "KLRTA11111"
    },
    {
        input: "clark",
        expected: "KLK1111111"
    },
    {
        input: "clarke",
        expected: "KLK1111111"
    },
    {
        input: "clarkson",
        expected: "KLKSN11111"
    },
    {
        input: "clarles",
        expected: "KLLS111111"
    },
    {
        input: "clarson",
        expected: "KLSN111111"
    },
    {
        input: "clatworthy",
        expected: "KLTWTA1111"
    },
    {
        input: "claud",
        expected: "KLT1111111"
    },
    {
        input: "claude",
        expected: "KLT1111111"
    },
    {
        input: "claudia",
        expected: "KLTA111111"
    },
    {
        input: "claughly",
        expected: "KLLA111111"
    },
    {
        input: "clay",
        expected: "KLA1111111"
    },
    {
        input: "clayden",
        expected: "KLTN111111"
    },
    {
        input: "clayforth",
        expected: "KLFT111111"
    },
    {
        input: "clayton",
        expected: "KLTN111111"
    },
    {
        input: "clearwater",
        expected: "KLWTA11111"
    },
    {
        input: "cleary",
        expected: "KLRA111111"
    },
    {
        input: "cleaver",
        expected: "KLFA111111"
    },
    {
        input: "cleavin",
        expected: "KLFN111111"
    },
    {
        input: "cleeland",
        expected: "KLLNT11111"
    },
    {
        input: "clegg",
        expected: "KLK1111111"
    },
    {
        input: "cleghorn",
        expected: "KLKN111111"
    },
    {
        input: "cleland",
        expected: "KLLNT11111"
    },
    {
        input: "clelland",
        expected: "KLLNT11111"
    },
    {
        input: "clemenger",
        expected: "KLMNKA1111"
    },
    {
        input: "clemens",
        expected: "KLMNS11111"
    },
    {
        input: "clement",
        expected: "KLMNT11111"
    },
    {
        input: "clementina",
        expected: "KLMNTNA111"
    },
    {
        input: "clementine",
        expected: "KLMNTN1111"
    },
    {
        input: "clements",
        expected: "KLMNTS1111"
    },
    {
        input: "clementson",
        expected: "KLMNTSN111"
    },
    {
        input: "clemmey",
        expected: "KLMA111111"
    },
    {
        input: "clemont",
        expected: "KLMNT11111"
    },
    {
        input: "clent",
        expected: "KLNT111111"
    },
    {
        input: "clery",
        expected: "KLRA111111"
    },
    {
        input: "cleveland",
        expected: "KLFLNT1111"
    },
    {
        input: "clevelandt",
        expected: "KLFLNT1111"
    },
    {
        input: "cleverley",
        expected: "KLFLA11111"
    },
    {
        input: "cliff",
        expected: "KLF1111111"
    },
    {
        input: "clifford",
        expected: "KLFT111111"
    },
    {
        input: "cliford",
        expected: "KLFT111111"
    },
    {
        input: "clifton",
        expected: "KLFTN11111"
    },
    {
        input: "clina",
        expected: "KLNA111111"
    },
    {
        input: "clinch",
        expected: "KLNK111111"
    },
    {
        input: "clinkard",
        expected: "KLNKT11111"
    },
    {
        input: "clint",
        expected: "KLNT111111"
    },
    {
        input: "clisby",
        expected: "KLSPA11111"
    },
    {
        input: "clitheroe",
        expected: "KLTRA11111"
    },
    {
        input: "clive",
        expected: "KLF1111111"
    },
    {
        input: "cllarles",
        expected: "KLLS111111"
    },
    {
        input: "clode",
        expected: "KLT1111111"
    },
    {
        input: "cloharty",
        expected: "KLTA111111"
    },
    {
        input: "close",
        expected: "KLS1111111"
    },
    {
        input: "clothier",
        expected: "KLTA111111"
    },
    {
        input: "clough",
        expected: "KLA1111111"
    },
    {
        input: "cloughly",
        expected: "KLLA111111"
    },
    {
        input: "clow",
        expected: "KLA1111111"
    },
    {
        input: "clrarles",
        expected: "KRLS111111"
    },
    {
        input: "clugston",
        expected: "KLKSTN1111"
    },
    {
        input: "clulee",
        expected: "KLLA111111"
    },
    {
        input: "clune",
        expected: "KLN1111111"
    },
    {
        input: "clunnie",
        expected: "KLNA111111"
    },
    {
        input: "clutterbuck",
        expected: "KLTPK11111"
    },
    {
        input: "clyde",
        expected: "KLT1111111"
    },
    {
        input: "clydesdale",
        expected: "KLTSTA1111"
    },
    {
        input: "clym",
        expected: "KLM1111111"
    },
    {
        input: "clyma",
        expected: "KLMA111111"
    },
    {
        input: "clymer",
        expected: "KLMA111111"
    },
    {
        input: "coates",
        expected: "KTS1111111"
    },
    {
        input: "coats",
        expected: "KTS1111111"
    },
    {
        input: "coatsworth",
        expected: "KTSWT11111"
    },
    {
        input: "cobb",
        expected: "KP11111111"
    },
    {
        input: "coburn",
        expected: "KPN1111111"
    },
    {
        input: "cochrane",
        expected: "KKRN111111"
    },
    {
        input: "cock",
        expected: "KK11111111"
    },
    {
        input: "cockburn",
        expected: "KKPN111111"
    },
    {
        input: "cockerell",
        expected: "KKRA111111"
    },
    {
        input: "cockerill",
        expected: "KKRA111111"
    },
    {
        input: "cocking",
        expected: "KKNK111111"
    },
    {
        input: "cockroft",
        expected: "KKRFT11111"
    },
    {
        input: "cody",
        expected: "KTA1111111"
    },
    {
        input: "coffey",
        expected: "KFA1111111"
    },
    {
        input: "cogan",
        expected: "KKN1111111"
    },
    {
        input: "cogger",
        expected: "KKA1111111"
    },
    {
        input: "coghill",
        expected: "KKA1111111"
    },
    {
        input: "coghlan",
        expected: "KLN1111111"
    },
    {
        input: "cohen",
        expected: "KN11111111"
    },
    {
        input: "coila",
        expected: "KLA1111111"
    },
    {
        input: "coker",
        expected: "KKA1111111"
    },
    {
        input: "colbert",
        expected: "KPT1111111"
    },
    {
        input: "cole",
        expected: "KA11111111"
    },
    {
        input: "coleman",
        expected: "KLMN111111"
    },
    {
        input: "colena",
        expected: "KLNA111111"
    },
    {
        input: "coley",
        expected: "KLA1111111"
    },
    {
        input: "colgan",
        expected: "KKN1111111"
    },
    {
        input: "colin",
        expected: "KLN1111111"
    },
    {
        input: "colina",
        expected: "KLNA111111"
    },
    {
        input: "coller",
        expected: "KLA1111111"
    },
    {
        input: "collet",
        expected: "KLT1111111"
    },
    {
        input: "collett",
        expected: "KLT1111111"
    },
    {
        input: "collie",
        expected: "KLA1111111"
    },
    {
        input: "collier",
        expected: "KLA1111111"
    },
    {
        input: "collin",
        expected: "KLN1111111"
    },
    {
        input: "colling",
        expected: "KLNK111111"
    },
    {
        input: "collingwood",
        expected: "KLNKWT1111"
    },
    {
        input: "collins",
        expected: "KLNS111111"
    },
    {
        input: "collinson",
        expected: "KLNSN11111"
    },
    {
        input: "collis",
        expected: "KLS1111111"
    },
    {
        input: "colman",
        expected: "KMN1111111"
    },
    {
        input: "colombus",
        expected: "KLMPS11111"
    },
    {
        input: "colquhoun",
        expected: "KKN1111111"
    },
    {
        input: "colrmack",
        expected: "KMK1111111"
    },
    {
        input: "colson",
        expected: "KSN1111111"
    },
    {
        input: "colston",
        expected: "KSTN111111"
    },
    {
        input: "colton",
        expected: "KTN1111111"
    },
    {
        input: "columb",
        expected: "KLM1111111"
    },
    {
        input: "colville",
        expected: "KFA1111111"
    },
    {
        input: "colvin",
        expected: "KFN1111111"
    },
    {
        input: "colyer",
        expected: "KLA1111111"
    },
    {
        input: "comber",
        expected: "KMPA111111"
    },
    {
        input: "combie",
        expected: "KMPA111111"
    },
    {
        input: "combs",
        expected: "KMPS111111"
    },
    {
        input: "comer",
        expected: "KMA1111111"
    },
    {
        input: "cometti",
        expected: "KMTA111111"
    },
    {
        input: "comissiong",
        expected: "KMSNK11111"
    },
    {
        input: "common",
        expected: "KMN1111111"
    },
    {
        input: "comrie",
        expected: "KMRA111111"
    },
    {
        input: "comyn",
        expected: "KMN1111111"
    },
    {
        input: "concher",
        expected: "KNKA111111"
    },
    {
        input: "conder",
        expected: "KNTA111111"
    },
    {
        input: "condliffe",
        expected: "KNTLF11111"
    },
    {
        input: "condon",
        expected: "KNTN111111"
    },
    {
        input: "cone",
        expected: "KN11111111"
    },
    {
        input: "coneys",
        expected: "KNS1111111"
    },
    {
        input: "congalton",
        expected: "KNKTN11111"
    },
    {
        input: "conheady",
        expected: "KNTA111111"
    },
    {
        input: "conley",
        expected: "KNLA111111"
    },
    {
        input: "conn",
        expected: "KN11111111"
    },
    {
        input: "connally",
        expected: "KNLA111111"
    },
    {
        input: "connel]y",
        expected: "KNLA111111"
    },
    {
        input: "connell",
        expected: "KNA1111111"
    },
    {
        input: "connelly",
        expected: "KNLA111111"
    },
    {
        input: "connely",
        expected: "KNLA111111"
    },
    {
        input: "conner",
        expected: "KNA1111111"
    },
    {
        input: "connie",
        expected: "KNA1111111"
    },
    {
        input: "conniff",
        expected: "KNF1111111"
    },
    {
        input: "connolly",
        expected: "KNLA111111"
    },
    {
        input: "connor",
        expected: "KNA1111111"
    },
    {
        input: "connors",
        expected: "KNS1111111"
    },
    {
        input: "conolly",
        expected: "KNLA111111"
    },
    {
        input: "conrad",
        expected: "KNRT111111"
    },
    {
        input: "conradi",
        expected: "KNRTA11111"
    },
    {
        input: "conroy",
        expected: "KNRA111111"
    },
    {
        input: "consins",
        expected: "KNSNS11111"
    },
    {
        input: "constable",
        expected: "KNSTPA1111"
    },
    {
        input: "constance",
        expected: "KNSTNK1111"
    },
    {
        input: "conway",
        expected: "KNWA111111"
    },
    {
        input: "conwy",
        expected: "KNWA111111"
    },
    {
        input: "cook",
        expected: "KK11111111"
    },
    {
        input: "cooke",
        expected: "KK11111111"
    },
    {
        input: "coolay",
        expected: "KLA1111111"
    },
    {
        input: "coombes",
        expected: "KMPS111111"
    },
    {
        input: "coombs",
        expected: "KMPS111111"
    },
    {
        input: "coomer",
        expected: "KMA1111111"
    },
    {
        input: "cooney",
        expected: "KNA1111111"
    },
    {
        input: "coop",
        expected: "KP11111111"
    },
    {
        input: "cooper",
        expected: "KPA1111111"
    },
    {
        input: "coorobs",
        expected: "KRPS111111"
    },
    {
        input: "coory",
        expected: "KRA1111111"
    },
    {
        input: "cop]ey",
        expected: "KPA1111111"
    },
    {
        input: "cope",
        expected: "KP11111111"
    },
    {
        input: "copland",
        expected: "KPLNT11111"
    },
    {
        input: "copley",
        expected: "KPLA111111"
    },
    {
        input: "coppell",
        expected: "KPA1111111"
    },
    {
        input: "coppin",
        expected: "KPN1111111"
    },
    {
        input: "cora",
        expected: "KRA1111111"
    },
    {
        input: "coral",
        expected: "KRA1111111"
    },
    {
        input: "coralie",
        expected: "KRLA111111"
    },
    {
        input: "coraline",
        expected: "KRLN111111"
    },
    {
        input: "corbett",
        expected: "KPT1111111"
    },
    {
        input: "corcoran",
        expected: "KKRN111111"
    },
    {
        input: "cordelia",
        expected: "KTLA111111"
    },
    {
        input: "corder",
        expected: "KTA1111111"
    },
    {
        input: "cordon",
        expected: "KTN1111111"
    },
    {
        input: "cordue",
        expected: "KTA1111111"
    },
    {
        input: "coreoran",
        expected: "KRRN111111"
    },
    {
        input: "corfield",
        expected: "KFT1111111"
    },
    {
        input: "corinna",
        expected: "KRNA111111"
    },
    {
        input: "corke",
        expected: "KK11111111"
    },
    {
        input: "corkin",
        expected: "KKN1111111"
    },
    {
        input: "corkran",
        expected: "KKRN111111"
    },
    {
        input: "corlett",
        expected: "KLT1111111"
    },
    {
        input: "corley",
        expected: "KLA1111111"
    },
    {
        input: "corliss",
        expected: "KLS1111111"
    },
    {
        input: "cormack",
        expected: "KMK1111111"
    },
    {
        input: "cornack",
        expected: "KNK1111111"
    },
    {
        input: "cornaga",
        expected: "KNKA111111"
    },
    {
        input: "cornelia",
        expected: "KNLA111111"
    },
    {
        input: "cornelius",
        expected: "KNLS111111"
    },
    {
        input: "cornell",
        expected: "KNA1111111"
    },
    {
        input: "corner",
        expected: "KNA1111111"
    },
    {
        input: "cornish",
        expected: "KNS1111111"
    },
    {
        input: "cornwall",
        expected: "KNWA111111"
    },
    {
        input: "cornwell",
        expected: "KNWA111111"
    },
    {
        input: "corona",
        expected: "KRNA111111"
    },
    {
        input: "corr",
        expected: "KA11111111"
    },
    {
        input: "correll",
        expected: "KRA1111111"
    },
    {
        input: "corrie",
        expected: "KRA1111111"
    },
    {
        input: "corrigall",
        expected: "KRKA111111"
    },
    {
        input: "corrigan",
        expected: "KRKN111111"
    },
    {
        input: "corsar",
        expected: "KSA1111111"
    },
    {
        input: "corsion",
        expected: "KSN1111111"
    },
    {
        input: "corston",
        expected: "KSTN111111"
    },
    {
        input: "cortisson",
        expected: "KTSN111111"
    },
    {
        input: "cortissos",
        expected: "KTSS111111"
    },
    {
        input: "cosegrove",
        expected: "KSKRF11111"
    },
    {
        input: "cosgriff",
        expected: "KSKRF11111"
    },
    {
        input: "cosgrove",
        expected: "KSKRF11111"
    },
    {
        input: "cossens",
        expected: "KSNS111111"
    },
    {
        input: "cossum",
        expected: "KSM1111111"
    },
    {
        input: "costall",
        expected: "KSTA111111"
    },
    {
        input: "costello",
        expected: "KSTLA11111"
    },
    {
        input: "coster",
        expected: "KSTA111111"
    },
    {
        input: "costigan",
        expected: "KSTKN11111"
    },
    {
        input: "costley",
        expected: "KSTLA11111"
    },
    {
        input: "cother",
        expected: "KTA1111111"
    },
    {
        input: "cotston",
        expected: "KTSTN11111"
    },
    {
        input: "cottam",
        expected: "KTM1111111"
    },
    {
        input: "cotter",
        expected: "KTA1111111"
    },
    {
        input: "cotterill",
        expected: "KTRA111111"
    },
    {
        input: "cottghlan",
        expected: "KTLN111111"
    },
    {
        input: "cottle",
        expected: "KTA1111111"
    },
    {
        input: "cotton",
        expected: "KTN1111111"
    },
    {
        input: "cottrell",
        expected: "KTRA111111"
    },
    {
        input: "couch",
        expected: "KK11111111"
    },
    {
        input: "couchman",
        expected: "KKMN111111"
    },
    {
        input: "coughlan",
        expected: "KFLN111111"
    },
    {
        input: "coughtrey",
        expected: "KFTRA11111"
    },
    {
        input: "couling",
        expected: "KLNK111111"
    },
    {
        input: "coull",
        expected: "KA11111111"
    },
    {
        input: "coulson",
        expected: "KSN1111111"
    },
    {
        input: "coulston",
        expected: "KSTN111111"
    },
    {
        input: "coulter",
        expected: "KTA1111111"
    },
    {
        input: "counar",
        expected: "KNA1111111"
    },
    {
        input: "counihan",
        expected: "KNN1111111"
    },
    {
        input: "coupar",
        expected: "KPA1111111"
    },
    {
        input: "couper",
        expected: "KPA1111111"
    },
    {
        input: "coupland",
        expected: "KPLNT11111"
    },
    {
        input: "course",
        expected: "KS11111111"
    },
    {
        input: "court",
        expected: "KT11111111"
    },
    {
        input: "courtayne",
        expected: "KTN1111111"
    },
    {
        input: "courter",
        expected: "KTA1111111"
    },
    {
        input: "courtis",
        expected: "KTS1111111"
    },
    {
        input: "courtney",
        expected: "KTNA111111"
    },
    {
        input: "cousins",
        expected: "KSNS111111"
    },
    {
        input: "couston",
        expected: "KSTN111111"
    },
    {
        input: "coutts",
        expected: "KTS1111111"
    },
    {
        input: "coventry",
        expected: "KFNTRA1111"
    },
    {
        input: "coverly",
        expected: "KFLA111111"
    },
    {
        input: "cowan",
        expected: "KWN1111111"
    },
    {
        input: "coward",
        expected: "KWT1111111"
    },
    {
        input: "cowen",
        expected: "KWN1111111"
    },
    {
        input: "cowey",
        expected: "KWA1111111"
    },
    {
        input: "cowie",
        expected: "KWA1111111"
    },
    {
        input: "cowle",
        expected: "KA11111111"
    },
    {
        input: "cowles",
        expected: "KLS1111111"
    },
    {
        input: "cowper",
        expected: "KPA1111111"
    },
    {
        input: "cox",
        expected: "KK11111111"
    },
    {
        input: "coxhead",
        expected: "KKT1111111"
    },
    {
        input: "coxhend",
        expected: "KKNT111111"
    },
    {
        input: "coxon",
        expected: "KKN1111111"
    },
    {
        input: "coy",
        expected: "KA11111111"
    },
    {
        input: "crabb",
        expected: "KRP1111111"
    },
    {
        input: "crabbe",
        expected: "KRP1111111"
    },
    {
        input: "crace",
        expected: "KRK1111111"
    },
    {
        input: "cragg",
        expected: "KRK1111111"
    },
    {
        input: "craib",
        expected: "KRP1111111"
    },
    {
        input: "craies",
        expected: "KRS1111111"
    },
    {
        input: "craig",
        expected: "KRK1111111"
    },
    {
        input: "craige",
        expected: "KRK1111111"
    },
    {
        input: "craigie",
        expected: "KRKA111111"
    },
    {
        input: "craik",
        expected: "KRK1111111"
    },
    {
        input: "crammond",
        expected: "KRMNT11111"
    },
    {
        input: "cramond",
        expected: "KRMNT11111"
    },
    {
        input: "crampton",
        expected: "KRMPTN1111"
    },
    {
        input: "cran",
        expected: "KRN1111111"
    },
    {
        input: "crandle",
        expected: "KRNTA11111"
    },
    {
        input: "crane",
        expected: "KRN1111111"
    },
    {
        input: "cranefield",
        expected: "KRNFT11111"
    },
    {
        input: "cranford",
        expected: "KRNFT11111"
    },
    {
        input: "cranley",
        expected: "KRNLA11111"
    },
    {
        input: "crannitch",
        expected: "KRNK111111"
    },
    {
        input: "cranshaw",
        expected: "KRNSA11111"
    },
    {
        input: "cranston",
        expected: "KRNSTN1111"
    },
    {
        input: "craven",
        expected: "KRFN111111"
    },
    {
        input: "craven-carden",
        expected: "KRFNKTN111"
    },
    {
        input: "crawford",
        expected: "KRFT111111"
    },
    {
        input: "crawfurd",
        expected: "KRFT111111"
    },
    {
        input: "crawley",
        expected: "KRLA111111"
    },
    {
        input: "crawshaw",
        expected: "KRSA111111"
    },
    {
        input: "creagh",
        expected: "KRA1111111"
    },
    {
        input: "credgington",
        expected: "KRKNKTN111"
    },
    {
        input: "creed",
        expected: "KRT1111111"
    },
    {
        input: "creeser",
        expected: "KRSA111111"
    },
    {
        input: "creevey",
        expected: "KRFA111111"
    },
    {
        input: "creighton",
        expected: "KRTN111111"
    },
    {
        input: "cremmens",
        expected: "KRMNS11111"
    },
    {
        input: "crerar",
        expected: "KRRA111111"
    },
    {
        input: "cress",
        expected: "KRS1111111"
    },
    {
        input: "cresser",
        expected: "KRSA111111"
    },
    {
        input: "crews",
        expected: "KRS1111111"
    },
    {
        input: "crichton",
        expected: "KRKTN11111"
    },
    {
        input: "crighton",
        expected: "KRTN111111"
    },
    {
        input: "crilly",
        expected: "KRLA111111"
    },
    {
        input: "crimp",
        expected: "KRMP111111"
    },
    {
        input: "cripps",
        expected: "KRPS111111"
    },
    {
        input: "crisp",
        expected: "KRSP111111"
    },
    {
        input: "crissie",
        expected: "KRSA111111"
    },
    {
        input: "crissy",
        expected: "KRSA111111"
    },
    {
        input: "critchfie",
        expected: "KRKFA11111"
    },
    {
        input: "critchfiel",
        expected: "KRKFA11111"
    },
    {
        input: "critchfield",
        expected: "KRKFT11111"
    },
    {
        input: "critchley",
        expected: "KRKLA11111"
    },
    {
        input: "croad",
        expected: "KRT1111111"
    },
    {
        input: "croal",
        expected: "KRA1111111"
    },
    {
        input: "crocome",
        expected: "KRKM111111"
    },
    {
        input: "croft",
        expected: "KRFT111111"
    },
    {
        input: "croker",
        expected: "KRKA111111"
    },
    {
        input: "crolly",
        expected: "KRLA111111"
    },
    {
        input: "cromarty",
        expected: "KRMTA11111"
    },
    {
        input: "crombie",
        expected: "KRMPA11111"
    },
    {
        input: "crome",
        expected: "KRM1111111"
    },
    {
        input: "crompton",
        expected: "KRMPTN1111"
    },
    {
        input: "crone",
        expected: "KRN1111111"
    },
    {
        input: "cronhie",
        expected: "KRNA111111"
    },
    {
        input: "cronin",
        expected: "KRNN111111"
    },
    {
        input: "crooke",
        expected: "KRK1111111"
    },
    {
        input: "crookes",
        expected: "KRKS111111"
    },
    {
        input: "crooks",
        expected: "KRKS111111"
    },
    {
        input: "crookshanks",
        expected: "KRKSNKS111"
    },
    {
        input: "croot",
        expected: "KRT1111111"
    },
    {
        input: "cropley",
        expected: "KRPLA11111"
    },
    {
        input: "cropp",
        expected: "KRP1111111"
    },
    {
        input: "crosado",
        expected: "KRSTA11111"
    },
    {
        input: "crosbie",
        expected: "KRSPA11111"
    },
    {
        input: "crosby",
        expected: "KRSPA11111"
    },
    {
        input: "crosland",
        expected: "KRSLNT1111"
    },
    {
        input: "cross",
        expected: "KRS1111111"
    },
    {
        input: "crossan",
        expected: "KRSN111111"
    },
    {
        input: "crossan-moffat",
        expected: "KRSNMFT111"
    },
    {
        input: "crossens",
        expected: "KRSNS11111"
    },
    {
        input: "crossian",
        expected: "KRSN111111"
    },
    {
        input: "crossley",
        expected: "KRSLA11111"
    },
    {
        input: "crosswell",
        expected: "KRSWA11111"
    },
    {
        input: "crossweller",
        expected: "KRSWLA1111"
    },
    {
        input: "crostie",
        expected: "KRSTA11111"
    },
    {
        input: "croswell",
        expected: "KRSWA11111"
    },
    {
        input: "crouch",
        expected: "KRK1111111"
    },
    {
        input: "crow",
        expected: "KRA1111111"
    },
    {
        input: "crowan",
        expected: "KRWN111111"
    },
    {
        input: "crowder",
        expected: "KRTA111111"
    },
    {
        input: "crowe",
        expected: "KRA1111111"
    },
    {
        input: "crowhurst",
        expected: "KRWST11111"
    },
    {
        input: "crowley",
        expected: "KRLA111111"
    },
    {
        input: "crowther",
        expected: "KRTA111111"
    },
    {
        input: "croxford",
        expected: "KRKFT11111"
    },
    {
        input: "croy",
        expected: "KRA1111111"
    },
    {
        input: "croydon",
        expected: "KRTN111111"
    },
    {
        input: "crozier",
        expected: "KRSA111111"
    },
    {
        input: "cruickshank",
        expected: "KRKSNK1111"
    },
    {
        input: "cruikshank",
        expected: "KRKSNK1111"
    },
    {
        input: "crum",
        expected: "KRM1111111"
    },
    {
        input: "crump",
        expected: "KRMP111111"
    },
    {
        input: "cruse",
        expected: "KRS1111111"
    },
    {
        input: "crust",
        expected: "KRST111111"
    },
    {
        input: "cubbins",
        expected: "KPNS111111"
    },
    {
        input: "cuddihy",
        expected: "KTA1111111"
    },
    {
        input: "cuff",
        expected: "KF11111111"
    },
    {
        input: "culbert",
        expected: "KPT1111111"
    },
    {
        input: "culhane",
        expected: "KN11111111"
    },
    {
        input: "cull",
        expected: "KA11111111"
    },
    {
        input: "cullen",
        expected: "KLN1111111"
    },
    {
        input: "culling",
        expected: "KLNK111111"
    },
    {
        input: "cullinger",
        expected: "KLNKA11111"
    },
    {
        input: "culsey",
        expected: "KSA1111111"
    },
    {
        input: "cumberbeac",
        expected: "KMPPK11111"
    },
    {
        input: "cumberbeach",
        expected: "KMPPK11111"
    },
    {
        input: "cuming",
        expected: "KMNK111111"
    },
    {
        input: "cumins",
        expected: "KMNS111111"
    },
    {
        input: "cumming",
        expected: "KMNK111111"
    },
    {
        input: "cummings",
        expected: "KMNKS11111"
    },
    {
        input: "cummins",
        expected: "KMNS111111"
    },
    {
        input: "cummock",
        expected: "KMK1111111"
    },
    {
        input: "cundall",
        expected: "KNTA111111"
    },
    {
        input: "cunhingham",
        expected: "KNNM111111"
    },
    {
        input: "cunliffe",
        expected: "KNLF111111"
    },
    {
        input: "cunming",
        expected: "KNMNK11111"
    },
    {
        input: "cunningham",
        expected: "KNNM111111"
    },
    {
        input: "cunninghame",
        expected: "KNNM111111"
    },
    {
        input: "cupid",
        expected: "KPT1111111"
    },
    {
        input: "cupples",
        expected: "KPLS111111"
    },
    {
        input: "curey",
        expected: "KRA1111111"
    },
    {
        input: "curfie",
        expected: "KFA1111111"
    },
    {
        input: "curie",
        expected: "KRA1111111"
    },
    {
        input: "curle",
        expected: "KA11111111"
    },
    {
        input: "curline",
        expected: "KLN1111111"
    },
    {
        input: "curran",
        expected: "KRN1111111"
    },
    {
        input: "curren",
        expected: "KRN1111111"
    },
    {
        input: "currie",
        expected: "KRA1111111"
    },
    {
        input: "curry",
        expected: "KRA1111111"
    },
    {
        input: "cursey",
        expected: "KSA1111111"
    },
    {
        input: "curtayne",
        expected: "KTN1111111"
    },
    {
        input: "curties",
        expected: "KTS1111111"
    },
    {
        input: "curtin",
        expected: "KTN1111111"
    },
    {
        input: "curtis",
        expected: "KTS1111111"
    },
    {
        input: "curye",
        expected: "KRA1111111"
    },
    {
        input: "curzon-sig",
        expected: "KSNSK11111"
    },
    {
        input: "curzon-siggers",
        expected: "KSNSKS1111"
    },
    {
        input: "cusach",
        expected: "KSK1111111"
    },
    {
        input: "cusack",
        expected: "KSK1111111"
    },
    {
        input: "cushen",
        expected: "KSN1111111"
    },
    {
        input: "cushla",
        expected: "KSLA111111"
    },
    {
        input: "cushman",
        expected: "KSMN111111"
    },
    {
        input: "cushnan",
        expected: "KSNN111111"
    },
    {
        input: "cushnie",
        expected: "KSNA111111"
    },
    {
        input: "cutbush",
        expected: "KTPS111111"
    },
    {
        input: "cuthbert",
        expected: "KTPT111111"
    },
    {
        input: "cuthbertson",
        expected: "KTPTSN1111"
    },
    {
        input: "cuthterts",
        expected: "KTTTS11111"
    },
    {
        input: "cutler",
        expected: "KTLA111111"
    },
    {
        input: "cutriss",
        expected: "KTRS111111"
    },
    {
        input: "cuttance",
        expected: "KTNK111111"
    },
    {
        input: "cutten",
        expected: "KTN1111111"
    },
    {
        input: "cutter",
        expected: "KTA1111111"
    },
    {
        input: "cuttle",
        expected: "KTA1111111"
    },
    {
        input: "cuttriss",
        expected: "KTRS111111"
    },
    {
        input: "cutts",
        expected: "KTS1111111"
    },
    {
        input: "cuzens",
        expected: "KSNS111111"
    },
    {
        input: "cvitanovich",
        expected: "KFTNFK1111"
    },
    {
        input: "cvrus",
        expected: "KFRS111111"
    },
    {
        input: "cynthia",
        expected: "SNTA111111"
    },
    {
        input: "cyprian",
        expected: "SPRN111111"
    },
    {
        input: "cyri1",
        expected: "SRA1111111"
    },
    {
        input: "cyril",
        expected: "SRA1111111"
    },
    {
        input: "d'arcy",
        expected: "TSA1111111"
    },
    {
        input: "d'auvergne",
        expected: "TFKN111111"
    },
    {
        input: "dabinett",
        expected: "TPNT111111"
    },
    {
        input: "dacker",
        expected: "TKA1111111"
    },
    {
        input: "dagald",
        expected: "TKT1111111"
    },
    {
        input: "dagg",
        expected: "TK11111111"
    },
    {
        input: "dagger",
        expected: "TKA1111111"
    },
    {
        input: "dagleish",
        expected: "TKLS111111"
    },
    {
        input: "daglish",
        expected: "TKLS111111"
    },
    {
        input: "dagmar",
        expected: "TKMA111111"
    },
    {
        input: "dagnall",
        expected: "TKNA111111"
    },
    {
        input: "dagnell",
        expected: "TKNA111111"
    },
    {
        input: "dahren",
        expected: "TRN1111111"
    },
    {
        input: "daisy",
        expected: "TSA1111111"
    },
    {
        input: "dakers",
        expected: "TKS1111111"
    },
    {
        input: "dale",
        expected: "TA11111111"
    },
    {
        input: "dales",
        expected: "TLS1111111"
    },
    {
        input: "dalgar",
        expected: "TKA1111111"
    },
    {
        input: "dalgarno",
        expected: "TKNA111111"
    },
    {
        input: "dalgeish",
        expected: "TKS1111111"
    },
    {
        input: "dalgleish",
        expected: "TKLS111111"
    },
    {
        input: "dalgliesh",
        expected: "TKLS111111"
    },
    {
        input: "dalia",
        expected: "TLA1111111"
    },
    {
        input: "dall",
        expected: "TA11111111"
    },
    {
        input: "dallard",
        expected: "TLT1111111"
    },
    {
        input: "dallas",
        expected: "TLS1111111"
    },
    {
        input: "dallaston",
        expected: "TLSTN11111"
    },
    {
        input: "dallen",
        expected: "TLN1111111"
    },
    {
        input: "dalley",
        expected: "TLA1111111"
    },
    {
        input: "dalrymple",
        expected: "TRMPA11111"
    },
    {
        input: "dalton",
        expected: "TTN1111111"
    },
    {
        input: "daly",
        expected: "TLA1111111"
    },
    {
        input: "dalzell",
        expected: "TSA1111111"
    },
    {
        input: "dalziel",
        expected: "TSA1111111"
    },
    {
        input: "dan",
        expected: "TN11111111"
    },
    {
        input: "dand",
        expected: "TNT1111111"
    },
    {
        input: "dandie",
        expected: "TNTA111111"
    },
    {
        input: "dane",
        expected: "TN11111111"
    },
    {
        input: "danes",
        expected: "TNS1111111"
    },
    {
        input: "daniel",
        expected: "TNA1111111"
    },
    {
        input: "daniell",
        expected: "TNA1111111"
    },
    {
        input: "daniels",
        expected: "TNS1111111"
    },
    {
        input: "dann",
        expected: "TN11111111"
    },
    {
        input: "danner",
        expected: "TNA1111111"
    },
    {
        input: "danskin",
        expected: "TNSKN11111"
    },
    {
        input: "daphne",
        expected: "TFN1111111"
    },
    {
        input: "darcey",
        expected: "TSA1111111"
    },
    {
        input: "darcy",
        expected: "TSA1111111"
    },
    {
        input: "dardanella",
        expected: "TTNLA11111"
    },
    {
        input: "dark",
        expected: "TK11111111"
    },
    {
        input: "darley",
        expected: "TLA1111111"
    },
    {
        input: "darling",
        expected: "TLNK111111"
    },
    {
        input: "darlison",
        expected: "TLSN111111"
    },
    {
        input: "darracott",
        expected: "TRKT111111"
    },
    {
        input: "darragh",
        expected: "TRA1111111"
    },
    {
        input: "darroch",
        expected: "TRK1111111"
    },
    {
        input: "darwent",
        expected: "TWNT111111"
    },
    {
        input: "dash",
        expected: "TS11111111"
    },
    {
        input: "dashper",
        expected: "TSPA111111"
    },
    {
        input: "dashwood",
        expected: "TSWT111111"
    },
    {
        input: "dasler",
        expected: "TSLA111111"
    },
    {
        input: "daubney",
        expected: "TPNA111111"
    },
    {
        input: "daunt",
        expected: "TNT1111111"
    },
    {
        input: "davany",
        expected: "TFNA111111"
    },
    {
        input: "dave",
        expected: "TF11111111"
    },
    {
        input: "daveis",
        expected: "TFS1111111"
    },
    {
        input: "davenport",
        expected: "TFNPT11111"
    },
    {
        input: "davey",
        expected: "TFA1111111"
    },
    {
        input: "davicl",
        expected: "TFKA111111"
    },
    {
        input: "david",
        expected: "TFT1111111"
    },
    {
        input: "davida",
        expected: "TFTA111111"
    },
    {
        input: "davidena",
        expected: "TFTNA11111"
    },
    {
        input: "davidson",
        expected: "TFTSN11111"
    },
    {
        input: "davie",
        expected: "TFA1111111"
    },
    {
        input: "davies",
        expected: "TFS1111111"
    },
    {
        input: "davina",
        expected: "TFNA111111"
    },
    {
        input: "davis",
        expected: "TFS1111111"
    },
    {
        input: "davison",
        expected: "TFSN111111"
    },
    {
        input: "davitl",
        expected: "TFTA111111"
    },
    {
        input: "davy",
        expected: "TFA1111111"
    },
    {
        input: "davys",
        expected: "TFS1111111"
    },
    {
        input: "dawe",
        expected: "TA11111111"
    },
    {
        input: "dawes",
        expected: "TWS1111111"
    },
    {
        input: "dawkins",
        expected: "TKNS111111"
    },
    {
        input: "dawsett",
        expected: "TST1111111"
    },
    {
        input: "dawson",
        expected: "TSN1111111"
    },
    {
        input: "day",
        expected: "TA11111111"
    },
    {
        input: "daysh",
        expected: "TS11111111"
    },
    {
        input: "de bazin",
        expected: "TPSN111111"
    },
    {
        input: "de berry",
        expected: "TPRA111111"
    },
    {
        input: "de boyett",
        expected: "TPT1111111"
    },
    {
        input: "de carle",
        expected: "TKA1111111"
    },
    {
        input: "de castro",
        expected: "TKSTRA1111"
    },
    {
        input: "de clifford",
        expected: "TKLFT11111"
    },
    {
        input: "de clive lowe",
        expected: "TKLFLA1111"
    },
    {
        input: "de colmar",
        expected: "TKMA111111"
    },
    {
        input: "de courcey",
        expected: "TKSA111111"
    },
    {
        input: "de courcy",
        expected: "TKSA111111"
    },
    {
        input: "de lacey",
        expected: "TLSA111111"
    },
    {
        input: "de largey",
        expected: "TLKA111111"
    },
    {
        input: "de lautour",
        expected: "TLTA111111"
    },
    {
        input: "de malmanche",
        expected: "TMMNK11111"
    },
    {
        input: "de ment",
        expected: "TMNT111111"
    },
    {
        input: "de silva",
        expected: "TSFA111111"
    },
    {
        input: "de spong",
        expected: "TSPNK11111"
    },
    {
        input: "de st croix",
        expected: "TSTKRK1111"
    },
    {
        input: "de st. croix",
        expected: "TSTKRK1111"
    },
    {
        input: "de vere",
        expected: "TFA1111111"
    },
    {
        input: "de-clive-low",
        expected: "TKLFLA1111"
    },
    {
        input: "deab",
        expected: "TP11111111"
    },
    {
        input: "deaker",
        expected: "TKA1111111"
    },
    {
        input: "deamy",
        expected: "TMA1111111"
    },
    {
        input: "dean",
        expected: "TN11111111"
    },
    {
        input: "deane",
        expected: "TN11111111"
    },
    {
        input: "deans",
        expected: "TNS1111111"
    },
    {
        input: "dear",
        expected: "TA11111111"
    },
    {
        input: "dease",
        expected: "TS11111111"
    },
    {
        input: "debenham",
        expected: "TPNM111111"
    },
    {
        input: "deberry",
        expected: "TPRA111111"
    },
    {
        input: "deborah",
        expected: "TPRA111111"
    },
    {
        input: "decima",
        expected: "TSMA111111"
    },
    {
        input: "decimus",
        expected: "TSMS111111"
    },
    {
        input: "decourcy",
        expected: "TKSA111111"
    },
    {
        input: "dee",
        expected: "TA11111111"
    },
    {
        input: "deegan",
        expected: "TKN1111111"
    },
    {
        input: "deehan",
        expected: "TN11111111"
    },
    {
        input: "deem",
        expected: "TM11111111"
    },
    {
        input: "deia",
        expected: "TA11111111"
    },
    {
        input: "deikle",
        expected: "TKA1111111"
    },
    {
        input: "deiley",
        expected: "TLA1111111"
    },
    {
        input: "deisher",
        expected: "TSA1111111"
    },
    {
        input: "delahunty",
        expected: "TLNTA11111"
    },
    {
        input: "delaney",
        expected: "TLNA111111"
    },
    {
        input: "delany",
        expected: "TLNA111111"
    },
    {
        input: "delargey",
        expected: "TLKA111111"
    },
    {
        input: "delargy",
        expected: "TLKA111111"
    },
    {
        input: "delbridge",
        expected: "TPRK111111"
    },
    {
        input: "delcia",
        expected: "TSA1111111"
    },
    {
        input: "delcie",
        expected: "TSA1111111"
    },
    {
        input: "delia",
        expected: "TLA1111111"
    },
    {
        input: "delice",
        expected: "TLK1111111"
    },
    {
        input: "delilah",
        expected: "TLLA111111"
    },
    {
        input: "dell",
        expected: "TA11111111"
    },
    {
        input: "della",
        expected: "TLA1111111"
    },
    {
        input: "delsie",
        expected: "TSA1111111"
    },
    {
        input: "dely",
        expected: "TLA1111111"
    },
    {
        input: "dement",
        expected: "TMNT111111"
    },
    {
        input: "demontalk",
        expected: "TMNTK11111"
    },
    {
        input: "demouth",
        expected: "TMT1111111"
    },
    {
        input: "dempsey",
        expected: "TMPSA11111"
    },
    {
        input: "dempster",
        expected: "TMPSTA1111"
    },
    {
        input: "dench",
        expected: "TNK1111111"
    },
    {
        input: "dencker",
        expected: "TNKA111111"
    },
    {
        input: "denfold",
        expected: "TNFT111111"
    },
    {
        input: "denfolrd",
        expected: "TNFT111111"
    },
    {
        input: "denford",
        expected: "TNFT111111"
    },
    {
        input: "denham",
        expected: "TNM1111111"
    },
    {
        input: "denhehy",
        expected: "TNA1111111"
    },
    {
        input: "denholm",
        expected: "TNM1111111"
    },
    {
        input: "denholme",
        expected: "TNM1111111"
    },
    {
        input: "denis",
        expected: "TNS1111111"
    },
    {
        input: "denise",
        expected: "TNS1111111"
    },
    {
        input: "denne",
        expected: "TN11111111"
    },
    {
        input: "dennehy",
        expected: "TNA1111111"
    },
    {
        input: "dennis",
        expected: "TNS1111111"
    },
    {
        input: "dennison",
        expected: "TNSN111111"
    },
    {
        input: "denniston",
        expected: "TNSTN11111"
    },
    {
        input: "denny",
        expected: "TNA1111111"
    },
    {
        input: "densem",
        expected: "TNSM111111"
    },
    {
        input: "dent",
        expected: "TNT1111111"
    },
    {
        input: "dentith",
        expected: "TNTT111111"
    },
    {
        input: "denton",
        expected: "TNTN111111"
    },
    {
        input: "denzil",
        expected: "TNSA111111"
    },
    {
        input: "depellett",
        expected: "TPLT111111"
    },
    {
        input: "dephoff",
        expected: "TFF1111111"
    },
    {
        input: "derbie",
        expected: "TPA1111111"
    },
    {
        input: "derbyshire",
        expected: "TPSA111111"
    },
    {
        input: "derice",
        expected: "TRK1111111"
    },
    {
        input: "dermer",
        expected: "TMA1111111"
    },
    {
        input: "dernehy",
        expected: "TNA1111111"
    },
    {
        input: "derrick",
        expected: "TRK1111111"
    },
    {
        input: "derry",
        expected: "TRA1111111"
    },
    {
        input: "desmond",
        expected: "TSMNT11111"
    },
    {
        input: "desmoulins",
        expected: "TSMLNS1111"
    },
    {
        input: "dessarthe",
        expected: "TST1111111"
    },
    {
        input: "dester",
        expected: "TSTA111111"
    },
    {
        input: "deuchrass",
        expected: "TKRS111111"
    },
    {
        input: "devaney",
        expected: "TFNA111111"
    },
    {
        input: "devany",
        expected: "TFNA111111"
    },
    {
        input: "devenie",
        expected: "TFNA111111"
    },
    {
        input: "devenney",
        expected: "TFNA111111"
    },
    {
        input: "dever",
        expected: "TFA1111111"
    },
    {
        input: "devereux",
        expected: "TFRK111111"
    },
    {
        input: "devery",
        expected: "TFRA111111"
    },
    {
        input: "devina",
        expected: "TFNA111111"
    },
    {
        input: "devine",
        expected: "TFN1111111"
    },
    {
        input: "devlill",
        expected: "TFLA111111"
    },
    {
        input: "devlin",
        expected: "TFLN111111"
    },
    {
        input: "dew",
        expected: "TA11111111"
    },
    {
        input: "dewar",
        expected: "TWA1111111"
    },
    {
        input: "dexter",
        expected: "TKTA111111"
    },
    {
        input: "dey",
        expected: "TA11111111"
    },
    {
        input: "diack",
        expected: "TK11111111"
    },
    {
        input: "diamond",
        expected: "TMNT111111"
    },
    {
        input: "diana",
        expected: "TNA1111111"
    },
    {
        input: "dibb",
        expected: "TP11111111"
    },
    {
        input: "dick",
        expected: "TK11111111"
    },
    {
        input: "dickens",
        expected: "TKNS111111"
    },
    {
        input: "dickeon",
        expected: "TKN1111111"
    },
    {
        input: "dicker",
        expected: "TKA1111111"
    },
    {
        input: "dickey",
        expected: "TKA1111111"
    },
    {
        input: "dickie",
        expected: "TKA1111111"
    },
    {
        input: "dickinson",
        expected: "TKNSN11111"
    },
    {
        input: "dickison",
        expected: "TKSN111111"
    },
    {
        input: "dicksan",
        expected: "TKSN111111"
    },
    {
        input: "dickson",
        expected: "TKSN111111"
    },
    {
        input: "didham",
        expected: "TTM1111111"
    },
    {
        input: "didsbury",
        expected: "TTSPRA1111"
    },
    {
        input: "diefenbach",
        expected: "TFNPK11111"
    },
    {
        input: "diehl",
        expected: "TA11111111"
    },
    {
        input: "digby",
        expected: "TKPA111111"
    },
    {
        input: "digby-smith",
        expected: "TKPSMT1111"
    },
    {
        input: "dillan",
        expected: "TLN1111111"
    },
    {
        input: "dillon",
        expected: "TLN1111111"
    },
    {
        input: "dillon-kin",
        expected: "TLNKN11111"
    },
    {
        input: "dimond",
        expected: "TMNT111111"
    },
    {
        input: "dina",
        expected: "TNA1111111"
    },
    {
        input: "dinah",
        expected: "TNA1111111"
    },
    {
        input: "dineen",
        expected: "TNN1111111"
    },
    {
        input: "dingle",
        expected: "TNKA111111"
    },
    {
        input: "dingwall",
        expected: "TNKWA11111"
    },
    {
        input: "dinning",
        expected: "TNNK111111"
    },
    {
        input: "dinsell",
        expected: "TNSA111111"
    },
    {
        input: "dippie",
        expected: "TPA1111111"
    },
    {
        input: "direen",
        expected: "TRN1111111"
    },
    {
        input: "diston",
        expected: "TSTN111111"
    },
    {
        input: "diver",
        expected: "TFA1111111"
    },
    {
        input: "divers",
        expected: "TFS1111111"
    },
    {
        input: "divett",
        expected: "TFT1111111"
    },
    {
        input: "dix",
        expected: "TK11111111"
    },
    {
        input: "dixon",
        expected: "TKN1111111"
    },
    {
        input: "dixs",
        expected: "TKS1111111"
    },
    {
        input: "dnniel",
        expected: "TNA1111111"
    },
    {
        input: "doak",
        expected: "TK11111111"
    },
    {
        input: "doake",
        expected: "TK11111111"
    },
    {
        input: "dobbie",
        expected: "TPA1111111"
    },
    {
        input: "dobbin",
        expected: "TPN1111111"
    },
    {
        input: "dobble",
        expected: "TPA1111111"
    },
    {
        input: "dobbs",
        expected: "TPS1111111"
    },
    {
        input: "dobe",
        expected: "TP11111111"
    },
    {
        input: "dobie",
        expected: "TPA1111111"
    },
    {
        input: "dobson",
        expected: "TPSN111111"
    },
    {
        input: "docherty",
        expected: "TKTA111111"
    },
    {
        input: "dockworth",
        expected: "TKWT111111"
    },
    {
        input: "docy",
        expected: "TSA1111111"
    },
    {
        input: "dod",
        expected: "TT11111111"
    },
    {
        input: "dodd",
        expected: "TT11111111"
    },
    {
        input: "doddridge",
        expected: "TTRK111111"
    },
    {
        input: "dodds",
        expected: "TTS1111111"
    },
    {
        input: "dods",
        expected: "TTS1111111"
    },
    {
        input: "doggart",
        expected: "TKT1111111"
    },
    {
        input: "doherty",
        expected: "TTA1111111"
    },
    {
        input: "dohig",
        expected: "TK11111111"
    },
    {
        input: "doig",
        expected: "TK11111111"
    },
    {
        input: "dolan",
        expected: "TLN1111111"
    },
    {
        input: "dolce",
        expected: "TK11111111"
    },
    {
        input: "dolina",
        expected: "TLNA111111"
    },
    {
        input: "dollena",
        expected: "TLNA111111"
    },
    {
        input: "dolly",
        expected: "TLA1111111"
    },
    {
        input: "dolman",
        expected: "TMN1111111"
    },
    {
        input: "dolores",
        expected: "TLRS111111"
    },
    {
        input: "dolphin",
        expected: "TFN1111111"
    },
    {
        input: "domigan",
        expected: "TMKN111111"
    },
    {
        input: "dominic",
        expected: "TMNK111111"
    },
    {
        input: "dominick",
        expected: "TMNK111111"
    },
    {
        input: "dommett",
        expected: "TMT1111111"
    },
    {
        input: "domonic",
        expected: "TMNK111111"
    },
    {
        input: "don",
        expected: "TN11111111"
    },
    {
        input: "donah",
        expected: "TNA1111111"
    },
    {
        input: "donald",
        expected: "TNT1111111"
    },
    {
        input: "donaldina",
        expected: "TNTNA11111"
    },
    {
        input: "donaldson",
        expected: "TNTSN11111"
    },
    {
        input: "donalena",
        expected: "TNLNA11111"
    },
    {
        input: "done",
        expected: "TN11111111"
    },
    {
        input: "donella",
        expected: "TNLA111111"
    },
    {
        input: "donellan",
        expected: "TNLN111111"
    },
    {
        input: "donglas",
        expected: "TNKLS11111"
    },
    {
        input: "donlan",
        expected: "TNLN111111"
    },
    {
        input: "donn",
        expected: "TN11111111"
    },
    {
        input: "donnald",
        expected: "TNT1111111"
    },
    {
        input: "donne",
        expected: "TN11111111"
    },
    {
        input: "donneily",
        expected: "TNLA111111"
    },
    {
        input: "donnelly",
        expected: "TNLA111111"
    },
    {
        input: "donoghue",
        expected: "TNKA111111"
    },
    {
        input: "donovan",
        expected: "TNFN111111"
    },
    {
        input: "doocey",
        expected: "TSA1111111"
    },
    {
        input: "doody",
        expected: "TTA1111111"
    },
    {
        input: "dooley",
        expected: "TLA1111111"
    },
    {
        input: "doorley",
        expected: "TLA1111111"
    },
    {
        input: "dora",
        expected: "TRA1111111"
    },
    {
        input: "doran",
        expected: "TRN1111111"
    },
    {
        input: "dorathea",
        expected: "TRTA111111"
    },
    {
        input: "dorcas",
        expected: "TKS1111111"
    },
    {
        input: "dore",
        expected: "TA11111111"
    },
    {
        input: "doreen",
        expected: "TRN1111111"
    },
    {
        input: "doreman",
        expected: "TRMN111111"
    },
    {
        input: "dorice",
        expected: "TRK1111111"
    },
    {
        input: "doris",
        expected: "TRS1111111"
    },
    {
        input: "dorles",
        expected: "TLS1111111"
    },
    {
        input: "dorman",
        expected: "TMN1111111"
    },
    {
        input: "dormer",
        expected: "TMA1111111"
    },
    {
        input: "dorney",
        expected: "TNA1111111"
    },
    {
        input: "dorothea",
        expected: "TRTA111111"
    },
    {
        input: "dorothy",
        expected: "TRTA111111"
    },
    {
        input: "dorree",
        expected: "TRA1111111"
    },
    {
        input: "dorreen",
        expected: "TRN1111111"
    },
    {
        input: "dorrian",
        expected: "TRN1111111"
    },
    {
        input: "dorris",
        expected: "TRS1111111"
    },
    {
        input: "dorsey",
        expected: "TSA1111111"
    },
    {
        input: "dorward",
        expected: "TWT1111111"
    },
    {
        input: "dossett",
        expected: "TST1111111"
    },
    {
        input: "douald",
        expected: "TT11111111"
    },
    {
        input: "double",
        expected: "TPA1111111"
    },
    {
        input: "doudle",
        expected: "TTA1111111"
    },
    {
        input: "dougal",
        expected: "TKA1111111"
    },
    {
        input: "dougald",
        expected: "TKT1111111"
    },
    {
        input: "dougali",
        expected: "TKLA111111"
    },
    {
        input: "dougall",
        expected: "TKA1111111"
    },
    {
        input: "dougan",
        expected: "TKN1111111"
    },
    {
        input: "dougherty",
        expected: "TKTA111111"
    },
    {
        input: "doughty",
        expected: "TTA1111111"
    },
    {
        input: "douglans",
        expected: "TKLNS11111"
    },
    {
        input: "douglas",
        expected: "TKLS111111"
    },
    {
        input: "douglass",
        expected: "TKLS111111"
    },
    {
        input: "douherty",
        expected: "TTA1111111"
    },
    {
        input: "doulass",
        expected: "TLS1111111"
    },
    {
        input: "douli",
        expected: "TLA1111111"
    },
    {
        input: "doull",
        expected: "TA11111111"
    },
    {
        input: "dov",
        expected: "TF11111111"
    },
    {
        input: "dove",
        expected: "TF11111111"
    },
    {
        input: "dow",
        expected: "TA11111111"
    },
    {
        input: "dowdall",
        expected: "TTA1111111"
    },
    {
        input: "dowden",
        expected: "TTN1111111"
    },
    {
        input: "dowell",
        expected: "TWA1111111"
    },
    {
        input: "dowey",
        expected: "TWA1111111"
    },
    {
        input: "dowie",
        expected: "TWA1111111"
    },
    {
        input: "dowland",
        expected: "TLNT111111"
    },
    {
        input: "dowling",
        expected: "TLNK111111"
    },
    {
        input: "down",
        expected: "TN11111111"
    },
    {
        input: "downer",
        expected: "TNA1111111"
    },
    {
        input: "downes",
        expected: "TNS1111111"
    },
    {
        input: "downey",
        expected: "TNA1111111"
    },
    {
        input: "downie",
        expected: "TNA1111111"
    },
    {
        input: "downs",
        expected: "TNS1111111"
    },
    {
        input: "doyle",
        expected: "TA11111111"
    },
    {
        input: "drain",
        expected: "TRN1111111"
    },
    {
        input: "drake",
        expected: "TRK1111111"
    },
    {
        input: "drane",
        expected: "TRN1111111"
    },
    {
        input: "draper",
        expected: "TRPA111111"
    },
    {
        input: "dray",
        expected: "TRA1111111"
    },
    {
        input: "drayton",
        expected: "TRTN111111"
    },
    {
        input: "dreaver",
        expected: "TRFA111111"
    },
    {
        input: "dreavor",
        expected: "TRFA111111"
    },
    {
        input: "drees",
        expected: "TRS1111111"
    },
    {
        input: "drench",
        expected: "TRNK111111"
    },
    {
        input: "drennan",
        expected: "TRNN111111"
    },
    {
        input: "drew",
        expected: "TRA1111111"
    },
    {
        input: "drew-daniels",
        expected: "TRTNS11111"
    },
    {
        input: "dripps",
        expected: "TRPS111111"
    },
    {
        input: "driscole",
        expected: "TRSKA11111"
    },
    {
        input: "driscoll",
        expected: "TRSKA11111"
    },
    {
        input: "driscoll-shaw",
        expected: "TRSKSA1111"
    },
    {
        input: "driver",
        expected: "TRFA111111"
    },
    {
        input: "droaver",
        expected: "TRFA111111"
    },
    {
        input: "droscher",
        expected: "TRSKA11111"
    },
    {
        input: "drosier",
        expected: "TRSA111111"
    },
    {
        input: "drumm",
        expected: "TRM1111111"
    },
    {
        input: "drummond",
        expected: "TRMNT11111"
    },
    {
        input: "drury",
        expected: "TRRA111111"
    },
    {
        input: "dry",
        expected: "TRA1111111"
    },
    {
        input: "dryden",
        expected: "TRTN111111"
    },
    {
        input: "drysdale",
        expected: "TRSTA11111"
    },
    {
        input: "dsmond",
        expected: "TSMNT11111"
    },
    {
        input: "duckett",
        expected: "TKT1111111"
    },
    {
        input: "duckmanton",
        expected: "TKMNTN1111"
    },
    {
        input: "duckworth",
        expected: "TKWT111111"
    },
    {
        input: "dudding",
        expected: "TTNK111111"
    },
    {
        input: "duder",
        expected: "TTA1111111"
    },
    {
        input: "dudley",
        expected: "TTLA111111"
    },
    {
        input: "dudson",
        expected: "TTSN111111"
    },
    {
        input: "duell",
        expected: "TA11111111"
    },
    {
        input: "duerden",
        expected: "TTN1111111"
    },
    {
        input: "duff",
        expected: "TF11111111"
    },
    {
        input: "duffy",
        expected: "TFA1111111"
    },
    {
        input: "dugald",
        expected: "TKT1111111"
    },
    {
        input: "dugall",
        expected: "TKA1111111"
    },
    {
        input: "dugdale",
        expected: "TKTA111111"
    },
    {
        input: "duggan",
        expected: "TKN1111111"
    },
    {
        input: "dugleby",
        expected: "TKLPA11111"
    },
    {
        input: "duguid",
        expected: "TKT1111111"
    },
    {
        input: "duhig",
        expected: "TK11111111"
    },
    {
        input: "duig",
        expected: "TK11111111"
    },
    {
        input: "duigan",
        expected: "TKN1111111"
    },
    {
        input: "duignan",
        expected: "TKNN111111"
    },
    {
        input: "duke",
        expected: "TK11111111"
    },
    {
        input: "dulcie",
        expected: "TSA1111111"
    },
    {
        input: "dull",
        expected: "TA11111111"
    },
    {
        input: "dulward",
        expected: "TWT1111111"
    },
    {
        input: "dumas",
        expected: "TMS1111111"
    },
    {
        input: "dumble",
        expected: "TMPA111111"
    },
    {
        input: "dumsday",
        expected: "TMSTA11111"
    },
    {
        input: "dun",
        expected: "TN11111111"
    },
    {
        input: "dunbar",
        expected: "TNPA111111"
    },
    {
        input: "duncall",
        expected: "TNKA111111"
    },
    {
        input: "duncan",
        expected: "TNKN111111"
    },
    {
        input: "dundas",
        expected: "TNTS111111"
    },
    {
        input: "dunean",
        expected: "TNN1111111"
    },
    {
        input: "dunford",
        expected: "TNFT111111"
    },
    {
        input: "dungan",
        expected: "TNKN111111"
    },
    {
        input: "dungey",
        expected: "TNKA111111"
    },
    {
        input: "dunham",
        expected: "TNM1111111"
    },
    {
        input: "dunhar",
        expected: "TNA1111111"
    },
    {
        input: "dunipace",
        expected: "TNPK111111"
    },
    {
        input: "dunkerton",
        expected: "TNKTN11111"
    },
    {
        input: "dunkin",
        expected: "TNKN111111"
    },
    {
        input: "dunkley",
        expected: "TNKLA11111"
    },
    {
        input: "dunlop",
        expected: "TNLP111111"
    },
    {
        input: "dunn",
        expected: "TN11111111"
    },
    {
        input: "dunnage",
        expected: "TNK1111111"
    },
    {
        input: "dunncan",
        expected: "TNKN111111"
    },
    {
        input: "dunne",
        expected: "TN11111111"
    },
    {
        input: "dunnet",
        expected: "TNT1111111"
    },
    {
        input: "dunnig",
        expected: "TNK1111111"
    },
    {
        input: "dunning",
        expected: "TNNK111111"
    },
    {
        input: "dunring",
        expected: "TNRNK11111"
    },
    {
        input: "dunshea",
        expected: "TNSA111111"
    },
    {
        input: "dunsmuir",
        expected: "TNSMA11111"
    },
    {
        input: "dunstan",
        expected: "TNSTN11111"
    },
    {
        input: "dunster",
        expected: "TNSTA11111"
    },
    {
        input: "durand",
        expected: "TRNT111111"
    },
    {
        input: "durie",
        expected: "TRA1111111"
    },
    {
        input: "durning",
        expected: "TNNK111111"
    },
    {
        input: "duro",
        expected: "TRA1111111"
    },
    {
        input: "durrand",
        expected: "TRNT111111"
    },
    {
        input: "durrant",
        expected: "TRNT111111"
    },
    {
        input: "durreen",
        expected: "TRN1111111"
    },
    {
        input: "durry",
        expected: "TRA1111111"
    },
    {
        input: "duthie",
        expected: "TTA1111111"
    },
    {
        input: "dutton",
        expected: "TTN1111111"
    },
    {
        input: "dwan",
        expected: "TWN1111111"
    },
    {
        input: "dwight",
        expected: "TWT1111111"
    },
    {
        input: "dwyer",
        expected: "TWA1111111"
    },
    {
        input: "dyas",
        expected: "TS11111111"
    },
    {
        input: "dyer",
        expected: "TA11111111"
    },
    {
        input: "dyke",
        expected: "TK11111111"
    },
    {
        input: "dykes",
        expected: "TKS1111111"
    },
    {
        input: "dykins",
        expected: "TKNS111111"
    },
    {
        input: "dysart",
        expected: "TST1111111"
    },
    {
        input: "dysaski",
        expected: "TSSKA11111"
    },
    {
        input: "dyson",
        expected: "TSN1111111"
    },
    {
        input: "e",
        expected: "1111111111"
    },
    {
        input: "eaber",
        expected: "APA1111111"
    },
    {
        input: "eade",
        expected: "AT11111111"
    },
    {
        input: "eades",
        expected: "ATS1111111"
    },
    {
        input: "eadie",
        expected: "ATA1111111"
    },
    {
        input: "eadly",
        expected: "ATLA111111"
    },
    {
        input: "eady",
        expected: "ATA1111111"
    },
    {
        input: "eagan",
        expected: "AKN1111111"
    },
    {
        input: "eagar",
        expected: "AKA1111111"
    },
    {
        input: "eager",
        expected: "AKA1111111"
    },
    {
        input: "eagle",
        expected: "AKA1111111"
    },
    {
        input: "eagles",
        expected: "AKLS111111"
    },
    {
        input: "eagleton",
        expected: "AKLTN11111"
    },
    {
        input: "eamilton",
        expected: "AMTN111111"
    },
    {
        input: "eardley",
        expected: "ATLA111111"
    },
    {
        input: "eardly",
        expected: "ATLA111111"
    },
    {
        input: "earl",
        expected: "AA11111111"
    },
    {
        input: "earland",
        expected: "ALNT111111"
    },
    {
        input: "earle",
        expected: "AA11111111"
    },
    {
        input: "earley",
        expected: "ALA1111111"
    },
    {
        input: "early",
        expected: "ALA1111111"
    },
    {
        input: "earnest",
        expected: "ANST111111"
    },
    {
        input: "earnshaw",
        expected: "ANSA111111"
    },
    {
        input: "earold",
        expected: "ART1111111"
    },
    {
        input: "earp",
        expected: "AP11111111"
    },
    {
        input: "earry",
        expected: "ARA1111111"
    },
    {
        input: "earth",
        expected: "AT11111111"
    },
    {
        input: "eary",
        expected: "ARA1111111"
    },
    {
        input: "eason",
        expected: "ASN1111111"
    },
    {
        input: "easson",
        expected: "ASN1111111"
    },
    {
        input: "east",
        expected: "AST1111111"
    },
    {
        input: "easther",
        expected: "ASTA111111"
    },
    {
        input: "easton",
        expected: "ASTN111111"
    },
    {
        input: "eastwood",
        expected: "ASTWT11111"
    },
    {
        input: "eat",
        expected: "AT11111111"
    },
    {
        input: "eaton",
        expected: "ATN1111111"
    },
    {
        input: "eayes",
        expected: "AS11111111"
    },
    {
        input: "ebb",
        expected: "AP11111111"
    },
    {
        input: "ebbie",
        expected: "APA1111111"
    },
    {
        input: "ebdom",
        expected: "APTM111111"
    },
    {
        input: "ebdon",
        expected: "APTN111111"
    },
    {
        input: "eben",
        expected: "APN1111111"
    },
    {
        input: "ebenezer",
        expected: "APNSA11111"
    },
    {
        input: "ebzery",
        expected: "APSRA11111"
    },
    {
        input: "eccles",
        expected: "AKLS111111"
    },
    {
        input: "eckhoff",
        expected: "AKF1111111"
    },
    {
        input: "eckhold",
        expected: "AKT1111111"
    },
    {
        input: "ecsex",
        expected: "AKSK111111"
    },
    {
        input: "eda",
        expected: "ATA1111111"
    },
    {
        input: "eddington",
        expected: "ATNKTN1111"
    },
    {
        input: "ede",
        expected: "AT11111111"
    },
    {
        input: "ede-clendinnen",
        expected: "ATKLNTNN11"
    },
    {
        input: "eden",
        expected: "ATN1111111"
    },
    {
        input: "edgal",
        expected: "AKA1111111"
    },
    {
        input: "edgar",
        expected: "AKA1111111"
    },
    {
        input: "edgares",
        expected: "AKRS111111"
    },
    {
        input: "edge",
        expected: "AK11111111"
    },
    {
        input: "edginton",
        expected: "AKNTN11111"
    },
    {
        input: "edie",
        expected: "ATA1111111"
    },
    {
        input: "edifer",
        expected: "ATFA111111"
    },
    {
        input: "edifu",
        expected: "ATFA111111"
    },
    {
        input: "ediin",
        expected: "ATN1111111"
    },
    {
        input: "edin",
        expected: "ATN1111111"
    },
    {
        input: "edinger",
        expected: "ATNKA11111"
    },
    {
        input: "edington",
        expected: "ATNKTN1111"
    },
    {
        input: "edis",
        expected: "ATS1111111"
    },
    {
        input: "edith",
        expected: "ATT1111111"
    },
    {
        input: "edkins",
        expected: "ATKNS11111"
    },
    {
        input: "edla",
        expected: "ATLA111111"
    },
    {
        input: "edlin",
        expected: "ATLN111111"
    },
    {
        input: "edmenson",
        expected: "ATMNSN1111"
    },
    {
        input: "edmond",
        expected: "ATMNT11111"
    },
    {
        input: "edmonds",
        expected: "ATMNTS1111"
    },
    {
        input: "edmund",
        expected: "ATMNT11111"
    },
    {
        input: "edna",
        expected: "ATNA111111"
    },
    {
        input: "edolph",
        expected: "ATF1111111"
    },
    {
        input: "edric",
        expected: "ATRK111111"
    },
    {
        input: "edridge",
        expected: "ATRK111111"
    },
    {
        input: "edsall",
        expected: "ATSA111111"
    },
    {
        input: "edson",
        expected: "ATSN111111"
    },
    {
        input: "edvina",
        expected: "ATFNA11111"
    },
    {
        input: "edvward",
        expected: "ATFWT11111"
    },
    {
        input: "edwald",
        expected: "ATWT111111"
    },
    {
        input: "edwarcl",
        expected: "ATWKA11111"
    },
    {
        input: "edward",
        expected: "ATWT111111"
    },
    {
        input: "edwardd",
        expected: "ATWT111111"
    },
    {
        input: "edwardi",
        expected: "ATWTA11111"
    },
    {
        input: "edwardl",
        expected: "ATWTA11111"
    },
    {
        input: "edwards",
        expected: "ATWTS11111"
    },
    {
        input: "edwardson",
        expected: "ATWTSN1111"
    },
    {
        input: "edwin",
        expected: "ATWN111111"
    },
    {
        input: "edwina",
        expected: "ATWNA11111"
    },
    {
        input: "edyth",
        expected: "ATT1111111"
    },
    {
        input: "edythe",
        expected: "ATT1111111"
    },
    {
        input: "eenry",
        expected: "ANRA111111"
    },
    {
        input: "eerbert",
        expected: "APT1111111"
    },
    {
        input: "effie",
        expected: "AFA1111111"
    },
    {
        input: "effield",
        expected: "AFT1111111"
    },
    {
        input: "efiza",
        expected: "AFSA111111"
    },
    {
        input: "eflie",
        expected: "AFLA111111"
    },
    {
        input: "egan",
        expected: "AKN1111111"
    },
    {
        input: "egbert",
        expected: "AKPT111111"
    },
    {
        input: "egerton",
        expected: "AKTN111111"
    },
    {
        input: "eggelton",
        expected: "AKTN111111"
    },
    {
        input: "eggers",
        expected: "AKS1111111"
    },
    {
        input: "egglestone",
        expected: "AKLSTN1111"
    },
    {
        input: "eggleton",
        expected: "AKLTN11111"
    },
    {
        input: "eglentine",
        expected: "AKLNTN1111"
    },
    {
        input: "ehler",
        expected: "ALA1111111"
    },
    {
        input: "eila",
        expected: "ALA1111111"
    },
    {
        input: "eileen",
        expected: "ALN1111111"
    },
    {
        input: "eileena",
        expected: "ALNA111111"
    },
    {
        input: "eilene",
        expected: "ALN1111111"
    },
    {
        input: "eilis",
        expected: "ALS1111111"
    },
    {
        input: "eilzabeth",
        expected: "ASPT111111"
    },
    {
        input: "eion",
        expected: "AN11111111"
    },
    {
        input: "eirene",
        expected: "ARN1111111"
    },
    {
        input: "elaine",
        expected: "ALN1111111"
    },
    {
        input: "elbra",
        expected: "APRA111111"
    },
    {
        input: "elder",
        expected: "ATA1111111"
    },
    {
        input: "elders",
        expected: "ATS1111111"
    },
    {
        input: "elding",
        expected: "ATNK111111"
    },
    {
        input: "eldorado",
        expected: "ATRTA11111"
    },
    {
        input: "eldrid",
        expected: "ATRT111111"
    },
    {
        input: "eldridge",
        expected: "ATRK111111"
    },
    {
        input: "eleana",
        expected: "ALNA111111"
    },
    {
        input: "eleanor",
        expected: "ALNA111111"
    },
    {
        input: "eleanora",
        expected: "ALNRA11111"
    },
    {
        input: "eleanore",
        expected: "ALNA111111"
    },
    {
        input: "eleazar",
        expected: "ALSA111111"
    },
    {
        input: "elena",
        expected: "ALNA111111"
    },
    {
        input: "elenor",
        expected: "ALNA111111"
    },
    {
        input: "elenora",
        expected: "ALNRA11111"
    },
    {
        input: "eleonora",
        expected: "ALNRA11111"
    },
    {
        input: "eleonore",
        expected: "ALNA111111"
    },
    {
        input: "elephalet",
        expected: "ALFLT11111"
    },
    {
        input: "elezeard",
        expected: "ALST111111"
    },
    {
        input: "elfreda",
        expected: "AFRTA11111"
    },
    {
        input: "elfrida",
        expected: "AFRTA11111"
    },
    {
        input: "eli",
        expected: "ALA1111111"
    },
    {
        input: "elias",
        expected: "ALS1111111"
    },
    {
        input: "eliezer",
        expected: "ALSA111111"
    },
    {
        input: "elijah",
        expected: "ALA1111111"
    },
    {
        input: "elinor",
        expected: "ALNA111111"
    },
    {
        input: "eliot",
        expected: "ALT1111111"
    },
    {
        input: "eliott",
        expected: "ALT1111111"
    },
    {
        input: "eliphalet",
        expected: "ALFLT11111"
    },
    {
        input: "elisabeth",
        expected: "ALSPT11111"
    },
    {
        input: "elise",
        expected: "ALS1111111"
    },
    {
        input: "elisha",
        expected: "ALSA111111"
    },
    {
        input: "elishe",
        expected: "ALS1111111"
    },
    {
        input: "elison",
        expected: "ALSN111111"
    },
    {
        input: "eliza",
        expected: "ALSA111111"
    },
    {
        input: "elizabel",
        expected: "ALSPA11111"
    },
    {
        input: "elizabeth",
        expected: "ALSPT11111"
    },
    {
        input: "elizie",
        expected: "ALSA111111"
    },
    {
        input: "ella",
        expected: "ALA1111111"
    },
    {
        input: "ellacombe",
        expected: "ALKM111111"
    },
    {
        input: "ellaline",
        expected: "ALLN111111"
    },
    {
        input: "ellanor",
        expected: "ALNA111111"
    },
    {
        input: "elleana",
        expected: "ALNA111111"
    },
    {
        input: "elleanor",
        expected: "ALNA111111"
    },
    {
        input: "ellen",
        expected: "ALN1111111"
    },
    {
        input: "ellenor",
        expected: "ALNA111111"
    },
    {
        input: "ellenora",
        expected: "ALNRA11111"
    },
    {
        input: "ellens",
        expected: "ALNS111111"
    },
    {
        input: "ellery",
        expected: "ALRA111111"
    },
    {
        input: "elleston",
        expected: "ALSTN11111"
    },
    {
        input: "ellie",
        expected: "ALA1111111"
    },
    {
        input: "ellien",
        expected: "ALN1111111"
    },
    {
        input: "elliffe",
        expected: "ALF1111111"
    },
    {
        input: "elliis",
        expected: "ALS1111111"
    },
    {
        input: "ellingwood",
        expected: "ALNKWT1111"
    },
    {
        input: "ellinor",
        expected: "ALNA111111"
    },
    {
        input: "elliobt",
        expected: "ALPT111111"
    },
    {
        input: "elliot",
        expected: "ALT1111111"
    },
    {
        input: "elliott",
        expected: "ALT1111111"
    },
    {
        input: "elliotte",
        expected: "ALT1111111"
    },
    {
        input: "ellis",
        expected: "ALS1111111"
    },
    {
        input: "ellison",
        expected: "ALSN111111"
    },
    {
        input: "ellisson",
        expected: "ALSN111111"
    },
    {
        input: "elliston",
        expected: "ALSTN11111"
    },
    {
        input: "ells",
        expected: "AS11111111"
    },
    {
        input: "ellsmere",
        expected: "ASMA111111"
    },
    {
        input: "elma",
        expected: "AMA1111111"
    },
    {
        input: "elmira",
        expected: "AMRA111111"
    },
    {
        input: "elms",
        expected: "AMS1111111"
    },
    {
        input: "elmsly",
        expected: "AMSLA11111"
    },
    {
        input: "elphick",
        expected: "AFK1111111"
    },
    {
        input: "elphinstone",
        expected: "AFNSTN1111"
    },
    {
        input: "elsa",
        expected: "ASA1111111"
    },
    {
        input: "elsey",
        expected: "ASA1111111"
    },
    {
        input: "elsie",
        expected: "ASA1111111"
    },
    {
        input: "elsinore",
        expected: "ASNA111111"
    },
    {
        input: "elsom",
        expected: "ASM1111111"
    },
    {
        input: "elspeth",
        expected: "ASPT111111"
    },
    {
        input: "elston",
        expected: "ASTN111111"
    },
    {
        input: "elstow",
        expected: "ASTA111111"
    },
    {
        input: "elton",
        expected: "ATN1111111"
    },
    {
        input: "eluburt",
        expected: "ALPT111111"
    },
    {
        input: "elva",
        expected: "AFA1111111"
    },
    {
        input: "elvena",
        expected: "AFNA111111"
    },
    {
        input: "elvene",
        expected: "AFN1111111"
    },
    {
        input: "elvia",
        expected: "AFA1111111"
    },
    {
        input: "elvidge",
        expected: "AFK1111111"
    },
    {
        input: "elvie",
        expected: "AFA1111111"
    },
    {
        input: "elvina",
        expected: "AFNA111111"
    },
    {
        input: "elvira",
        expected: "AFRA111111"
    },
    {
        input: "emanuel",
        expected: "AMNA111111"
    },
    {
        input: "emela",
        expected: "AMLA111111"
    },
    {
        input: "emelia",
        expected: "AMLA111111"
    },
    {
        input: "emelie",
        expected: "AMLA111111"
    },
    {
        input: "emeline",
        expected: "AMLN111111"
    },
    {
        input: "emely",
        expected: "AMLA111111"
    },
    {
        input: "emerson",
        expected: "AMSN111111"
    },
    {
        input: "emery",
        expected: "AMRA111111"
    },
    {
        input: "emest",
        expected: "AMST111111"
    },
    {
        input: "emil",
        expected: "AMA1111111"
    },
    {
        input: "emile",
        expected: "AMA1111111"
    },
    {
        input: "emiley",
        expected: "AMLA111111"
    },
    {
        input: "emilie",
        expected: "AMLA111111"
    },
    {
        input: "emilina",
        expected: "AMLNA11111"
    },
    {
        input: "emiline",
        expected: "AMLN111111"
    },
    {
        input: "emilio",
        expected: "AMLA111111"
    },
    {
        input: "emily",
        expected: "AMLA111111"
    },
    {
        input: "emlis",
        expected: "AMLS111111"
    },
    {
        input: "emma",
        expected: "AMA1111111"
    },
    {
        input: "emmanuel",
        expected: "AMNA111111"
    },
    {
        input: "emmeline",
        expected: "AMLN111111"
    },
    {
        input: "emmerson",
        expected: "AMSN111111"
    },
    {
        input: "emmie",
        expected: "AMA1111111"
    },
    {
        input: "emmy",
        expected: "AMA1111111"
    },
    {
        input: "emond",
        expected: "AMNT111111"
    },
    {
        input: "empey",
        expected: "AMPA111111"
    },
    {
        input: "emslie",
        expected: "AMSLA11111"
    },
    {
        input: "ena",
        expected: "ANA1111111"
    },
    {
        input: "endicott davies",
        expected: "ANTKTFS111"
    },
    {
        input: "endicott-davies",
        expected: "ANTKTFS111"
    },
    {
        input: "endicottdavies",
        expected: "ANTKTFS111"
    },
    {
        input: "eneas",
        expected: "ANS1111111"
    },
    {
        input: "engelbert",
        expected: "ANKPT11111"
    },
    {
        input: "england",
        expected: "ANKLNT1111"
    },
    {
        input: "englefield",
        expected: "ANKLFT1111"
    },
    {
        input: "english",
        expected: "ANKLS11111"
    },
    {
        input: "engo",
        expected: "ANKA111111"
    },
    {
        input: "engstrom",
        expected: "ANKSTRM111"
    },
    {
        input: "enid",
        expected: "ANT1111111"
    },
    {
        input: "enny",
        expected: "ANA1111111"
    },
    {
        input: "enoch",
        expected: "ANK1111111"
    },
    {
        input: "enright",
        expected: "ANRT111111"
    },
    {
        input: "ensor",
        expected: "ANSA111111"
    },
    {
        input: "enticote",
        expected: "ANTKT11111"
    },
    {
        input: "eorne",
        expected: "AN11111111"
    },
    {
        input: "ephraim",
        expected: "AFRM111111"
    },
    {
        input: "ephrain",
        expected: "AFRN111111"
    },
    {
        input: "ephriam",
        expected: "AFRM111111"
    },
    {
        input: "erana",
        expected: "ARNA111111"
    },
    {
        input: "erancis",
        expected: "ARNSS11111"
    },
    {
        input: "erasmus",
        expected: "ARSMS11111"
    },
    {
        input: "erederick",
        expected: "ARTRK11111"
    },
    {
        input: "erek",
        expected: "ARK1111111"
    },
    {
        input: "erenest",
        expected: "ARNST11111"
    },
    {
        input: "erenstrom",
        expected: "ARNSTRM111"
    },
    {
        input: "eric",
        expected: "ARK1111111"
    },
    {
        input: "erich",
        expected: "ARK1111111"
    },
    {
        input: "erickson",
        expected: "ARKSN11111"
    },
    {
        input: "ericson",
        expected: "ARKSN11111"
    },
    {
        input: "erie",
        expected: "ARA1111111"
    },
    {
        input: "erik",
        expected: "ARK1111111"
    },
    {
        input: "erin",
        expected: "ARN1111111"
    },
    {
        input: "erlandson",
        expected: "ALNTSN1111"
    },
    {
        input: "erle",
        expected: "AA11111111"
    },
    {
        input: "erlidge",
        expected: "ALK1111111"
    },
    {
        input: "ermina",
        expected: "AMNA111111"
    },
    {
        input: "ern",
        expected: "AN11111111"
    },
    {
        input: "ernelst",
        expected: "ANST111111"
    },
    {
        input: "ernest",
        expected: "ANST111111"
    },
    {
        input: "ernestina",
        expected: "ANSTNA1111"
    },
    {
        input: "ernestine",
        expected: "ANSTN11111"
    },
    {
        input: "ernestreetfrancis",
        expected: "ANSTRTFRNS"
    },
    {
        input: "ernett",
        expected: "ANT1111111"
    },
    {
        input: "ernie",
        expected: "ANA1111111"
    },
    {
        input: "ernma",
        expected: "ANMA111111"
    },
    {
        input: "ernst",
        expected: "ANST111111"
    },
    {
        input: "erridge",
        expected: "ARK1111111"
    },
    {
        input: "errington",
        expected: "ARNKTN1111"
    },
    {
        input: "errol",
        expected: "ARA1111111"
    },
    {
        input: "erskine",
        expected: "ASKN111111"
    },
    {
        input: "erwin",
        expected: "AWN1111111"
    },
    {
        input: "escott",
        expected: "ASKT111111"
    },
    {
        input: "esdaile",
        expected: "ASTA111111"
    },
    {
        input: "esdale",
        expected: "ASTA111111"
    },
    {
        input: "esher",
        expected: "ASA1111111"
    },
    {
        input: "eskdale",
        expected: "ASKTA11111"
    },
    {
        input: "esma",
        expected: "ASMA111111"
    },
    {
        input: "esme",
        expected: "ASM1111111"
    },
    {
        input: "esmond",
        expected: "ASMNT11111"
    },
    {
        input: "esperson",
        expected: "ASPSN11111"
    },
    {
        input: "espie",
        expected: "ASPA111111"
    },
    {
        input: "esplin",
        expected: "ASPLN11111"
    },
    {
        input: "esquilant",
        expected: "ASKLNT1111"
    },
    {
        input: "essex",
        expected: "ASK1111111"
    },
    {
        input: "essie",
        expected: "ASA1111111"
    },
    {
        input: "esson",
        expected: "ASN1111111"
    },
    {
        input: "essson",
        expected: "ASN1111111"
    },
    {
        input: "estella",
        expected: "ASTLA11111"
    },
    {
        input: "estelle",
        expected: "ASTA111111"
    },
    {
        input: "ester",
        expected: "ASTA111111"
    },
    {
        input: "esther",
        expected: "ASTA111111"
    },
    {
        input: "ethel",
        expected: "ATA1111111"
    },
    {
        input: "ethelbert",
        expected: "ATPT111111"
    },
    {
        input: "ethelinda",
        expected: "ATLNTA1111"
    },
    {
        input: "ethelwin",
        expected: "ATWN111111"
    },
    {
        input: "ethelwyn",
        expected: "ATWN111111"
    },
    {
        input: "etheridge",
        expected: "ATRK111111"
    },
    {
        input: "ethie",
        expected: "ATA1111111"
    },
    {
        input: "etta",
        expected: "ATA1111111"
    },
    {
        input: "ettie",
        expected: "ATA1111111"
    },
    {
        input: "ettrick",
        expected: "ATRK111111"
    },
    {
        input: "etty",
        expected: "ATA1111111"
    },
    {
        input: "eubert",
        expected: "APT1111111"
    },
    {
        input: "eugene",
        expected: "AKN1111111"
    },
    {
        input: "eugenie",
        expected: "AKNA111111"
    },
    {
        input: "eugh",
        expected: "AA11111111"
    },
    {
        input: "eulla",
        expected: "ALA1111111"
    },
    {
        input: "eunice",
        expected: "ANK1111111"
    },
    {
        input: "eunson",
        expected: "ANSN111111"
    },
    {
        input: "euphemia",
        expected: "AFMA111111"
    },
    {
        input: "eurice",
        expected: "ARK1111111"
    },
    {
        input: "eustace",
        expected: "ASTK111111"
    },
    {
        input: "eva",
        expected: "AFA1111111"
    },
    {
        input: "evaline",
        expected: "AFLN111111"
    },
    {
        input: "evalyn",
        expected: "AFLN111111"
    },
    {
        input: "evan",
        expected: "AFN1111111"
    },
    {
        input: "evana",
        expected: "AFNA111111"
    },
    {
        input: "evander",
        expected: "AFNTA11111"
    },
    {
        input: "evandrina",
        expected: "AFNTRNA111"
    },
    {
        input: "evanelina",
        expected: "AFNLNA1111"
    },
    {
        input: "evangaline",
        expected: "AFNKLN1111"
    },
    {
        input: "evangelina",
        expected: "AFNKLNA111"
    },
    {
        input: "evangeline",
        expected: "AFNKLN1111"
    },
    {
        input: "evans",
        expected: "AFNS111111"
    },
    {
        input: "evarard",
        expected: "AFRT111111"
    },
    {
        input: "evatt",
        expected: "AFT1111111"
    },
    {
        input: "evavs",
        expected: "AFFS111111"
    },
    {
        input: "eve",
        expected: "AF11111111"
    },
    {
        input: "eveleen",
        expected: "AFLN111111"
    },
    {
        input: "evelina",
        expected: "AFLNA11111"
    },
    {
        input: "eveline",
        expected: "AFLN111111"
    },
    {
        input: "evelyn",
        expected: "AFLN111111"
    },
    {
        input: "evelyne",
        expected: "AFLN111111"
    },
    {
        input: "everard",
        expected: "AFRT111111"
    },
    {
        input: "everest",
        expected: "AFRST11111"
    },
    {
        input: "everett",
        expected: "AFRT111111"
    },
    {
        input: "everitt",
        expected: "AFRT111111"
    },
    {
        input: "everleigh",
        expected: "AFLA111111"
    },
    {
        input: "everson",
        expected: "AFSN111111"
    },
    {
        input: "every",
        expected: "AFRA111111"
    },
    {
        input: "eveyleen",
        expected: "AFLN111111"
    },
    {
        input: "evin",
        expected: "AFN1111111"
    },
    {
        input: "evinda",
        expected: "AFNTA11111"
    },
    {
        input: "ewan",
        expected: "AWN1111111"
    },
    {
        input: "eward",
        expected: "AWT1111111"
    },
    {
        input: "ewart",
        expected: "AWT1111111"
    },
    {
        input: "ewen",
        expected: "AWN1111111"
    },
    {
        input: "ewens",
        expected: "AWNS111111"
    },
    {
        input: "ewing",
        expected: "AWNK111111"
    },
    {
        input: "ewington-bell",
        expected: "AWNKTNPA11"
    },
    {
        input: "exler",
        expected: "AKLA111111"
    },
    {
        input: "eyles",
        expected: "ALS1111111"
    },
    {
        input: "eyre",
        expected: "AA11111111"
    },
    {
        input: "ezekiel",
        expected: "ASKA111111"
    },
    {
        input: "ezra",
        expected: "ASRA111111"
    },
    {
        input: "faa",
        expected: "FA11111111"
    },
    {
        input: "fabian",
        expected: "FPN1111111"
    },
    {
        input: "facer",
        expected: "FSA1111111"
    },
    {
        input: "facey",
        expected: "FSA1111111"
    },
    {
        input: "fache",
        expected: "FK11111111"
    },
    {
        input: "fackender",
        expected: "FKNTA11111"
    },
    {
        input: "facoory",
        expected: "FKRA111111"
    },
    {
        input: "fagan",
        expected: "FKN1111111"
    },
    {
        input: "fahey",
        expected: "FA11111111"
    },
    {
        input: "fahy",
        expected: "FA11111111"
    },
    {
        input: "faid",
        expected: "FT11111111"
    },
    {
        input: "faigan",
        expected: "FKN1111111"
    },
    {
        input: "fail",
        expected: "FA11111111"
    },
    {
        input: "fair",
        expected: "FA11111111"
    },
    {
        input: "fairbairn",
        expected: "FPN1111111"
    },
    {
        input: "fairburn",
        expected: "FPN1111111"
    },
    {
        input: "faircloth",
        expected: "FKLT111111"
    },
    {
        input: "fairey",
        expected: "FRA1111111"
    },
    {
        input: "fairhall",
        expected: "FA11111111"
    },
    {
        input: "fairhurst",
        expected: "FST1111111"
    },
    {
        input: "fairley",
        expected: "FLA1111111"
    },
    {
        input: "fairlie",
        expected: "FLA1111111"
    },
    {
        input: "fairmaid",
        expected: "FMT1111111"
    },
    {
        input: "fairweather",
        expected: "FWTA111111"
    },
    {
        input: "faith",
        expected: "FT11111111"
    },
    {
        input: "faithful",
        expected: "FTFA111111"
    },
    {
        input: "faithfull",
        expected: "FTFA111111"
    },
    {
        input: "falck",
        expected: "FK11111111"
    },
    {
        input: "falcon",
        expected: "FKN1111111"
    },
    {
        input: "falconar",
        expected: "FKNA111111"
    },
    {
        input: "falconer",
        expected: "FKNA111111"
    },
    {
        input: "falgar",
        expected: "FKA1111111"
    },
    {
        input: "falkinar",
        expected: "FKNA111111"
    },
    {
        input: "falkner",
        expected: "FKNA111111"
    },
    {
        input: "fall",
        expected: "FA11111111"
    },
    {
        input: "fallon",
        expected: "FLN1111111"
    },
    {
        input: "fallowfield",
        expected: "FLFT111111"
    },
    {
        input: "familton",
        expected: "FMTN111111"
    },
    {
        input: "fancis",
        expected: "FNSS111111"
    },
    {
        input: "fancourt",
        expected: "FNKT111111"
    },
    {
        input: "fanner",
        expected: "FNA1111111"
    },
    {
        input: "fannie",
        expected: "FNA1111111"
    },
    {
        input: "fanning",
        expected: "FNNK111111"
    },
    {
        input: "fannon",
        expected: "FNN1111111"
    },
    {
        input: "fanny",
        expected: "FNA1111111"
    },
    {
        input: "fantham",
        expected: "FNTM111111"
    },
    {
        input: "fargie",
        expected: "FKA1111111"
    },
    {
        input: "faris",
        expected: "FRS1111111"
    },
    {
        input: "farland",
        expected: "FLNT111111"
    },
    {
        input: "farmer",
        expected: "FMA1111111"
    },
    {
        input: "farminger",
        expected: "FMNKA11111"
    },
    {
        input: "farnham",
        expected: "FNM1111111"
    },
    {
        input: "farquhar",
        expected: "FKA1111111"
    },
    {
        input: "farquharon",
        expected: "FKRN111111"
    },
    {
        input: "farquhars",
        expected: "FKS1111111"
    },
    {
        input: "farquharson",
        expected: "FKSN111111"
    },
    {
        input: "farr",
        expected: "FA11111111"
    },
    {
        input: "farra",
        expected: "FRA1111111"
    },
    {
        input: "farrant",
        expected: "FRNT111111"
    },
    {
        input: "farrell",
        expected: "FRA1111111"
    },
    {
        input: "farrelly",
        expected: "FRLA111111"
    },
    {
        input: "farrington",
        expected: "FRNKTN1111"
    },
    {
        input: "farrow",
        expected: "FRA1111111"
    },
    {
        input: "farry",
        expected: "FRA1111111"
    },
    {
        input: "fashoda",
        expected: "FSTA111111"
    },
    {
        input: "fastier",
        expected: "FSTA111111"
    },
    {
        input: "faul",
        expected: "FA11111111"
    },
    {
        input: "faulder",
        expected: "FTA1111111"
    },
    {
        input: "faulds",
        expected: "FTS1111111"
    },
    {
        input: "faulkner",
        expected: "FKNA111111"
    },
    {
        input: "faulks",
        expected: "FKS1111111"
    },
    {
        input: "faull",
        expected: "FA11111111"
    },
    {
        input: "favel",
        expected: "FFA1111111"
    },
    {
        input: "favell",
        expected: "FFA1111111"
    },
    {
        input: "fawcett",
        expected: "FST1111111"
    },
    {
        input: "fay",
        expected: "FA11111111"
    },
    {
        input: "fazakerley",
        expected: "FSKLA11111"
    },
    {
        input: "fearn",
        expected: "FN11111111"
    },
    {
        input: "feast",
        expected: "FST1111111"
    },
    {
        input: "feathersto",
        expected: "FTSTA11111"
    },
    {
        input: "featherstone",
        expected: "FTSTN11111"
    },
    {
        input: "feely",
        expected: "FLA1111111"
    },
    {
        input: "feeney",
        expected: "FNA1111111"
    },
    {
        input: "feichley",
        expected: "FKLA111111"
    },
    {
        input: "feil",
        expected: "FA11111111"
    },
    {
        input: "felicha",
        expected: "FLKA111111"
    },
    {
        input: "felicia",
        expected: "FLSA111111"
    },
    {
        input: "felix",
        expected: "FLK1111111"
    },
    {
        input: "fell",
        expected: "FA11111111"
    },
    {
        input: "felmingha",
        expected: "FMNA111111"
    },
    {
        input: "felmingham",
        expected: "FMNM111111"
    },
    {
        input: "feltham",
        expected: "FTM1111111"
    },
    {
        input: "felton",
        expected: "FTN1111111"
    },
    {
        input: "fenby",
        expected: "FNPA111111"
    },
    {
        input: "fendall",
        expected: "FNTA111111"
    },
    {
        input: "fenelon",
        expected: "FNLN111111"
    },
    {
        input: "fennessey",
        expected: "FNSA111111"
    },
    {
        input: "fennessy",
        expected: "FNSA111111"
    },
    {
        input: "fenton",
        expected: "FNTN111111"
    },
    {
        input: "fenwick",
        expected: "FNWK111111"
    },
    {
        input: "ferdeanand",
        expected: "FTNNT11111"
    },
    {
        input: "ferdinand",
        expected: "FTNNT11111"
    },
    {
        input: "ferdinnnd",
        expected: "FTNT111111"
    },
    {
        input: "ferens",
        expected: "FRNS111111"
    },
    {
        input: "fergus",
        expected: "FKS1111111"
    },
    {
        input: "ferguson",
        expected: "FKSN111111"
    },
    {
        input: "fergusson",
        expected: "FKSN111111"
    },
    {
        input: "ferme",
        expected: "FM11111111"
    },
    {
        input: "fern",
        expected: "FN11111111"
    },
    {
        input: "ferne",
        expected: "FN11111111"
    },
    {
        input: "fernie",
        expected: "FNA1111111"
    },
    {
        input: "feron",
        expected: "FRN1111111"
    },
    {
        input: "ferrier",
        expected: "FRA1111111"
    },
    {
        input: "ferris",
        expected: "FRS1111111"
    },
    {
        input: "ferry",
        expected: "FRA1111111"
    },
    {
        input: "fewtrell",
        expected: "FTRA111111"
    },
    {
        input: "ffrost",
        expected: "FRST111111"
    },
    {
        input: "fibbes",
        expected: "FPS1111111"
    },
    {
        input: "fiddes",
        expected: "FTS1111111"
    },
    {
        input: "fiddis",
        expected: "FTS1111111"
    },
    {
        input: "fides",
        expected: "FTS1111111"
    },
    {
        input: "field",
        expected: "FT11111111"
    },
    {
        input: "fielden",
        expected: "FTN1111111"
    },
    {
        input: "fielder",
        expected: "FTA1111111"
    },
    {
        input: "fielding",
        expected: "FTNK111111"
    },
    {
        input: "fieldwick",
        expected: "FTWK111111"
    },
    {
        input: "fifield",
        expected: "FFT1111111"
    },
    {
        input: "figgins",
        expected: "FKNS111111"
    },
    {
        input: "filewood",
        expected: "FLWT111111"
    },
    {
        input: "fillingham",
        expected: "FLNM111111"
    },
    {
        input: "finch",
        expected: "FNK1111111"
    },
    {
        input: "findlater",
        expected: "FNTLTA1111"
    },
    {
        input: "findlav",
        expected: "FNTLF11111"
    },
    {
        input: "findlay",
        expected: "FNTLA11111"
    },
    {
        input: "findley",
        expected: "FNTLA11111"
    },
    {
        input: "findon",
        expected: "FNTN111111"
    },
    {
        input: "finlavson",
        expected: "FNLFSN1111"
    },
    {
        input: "finlay",
        expected: "FNLA111111"
    },
    {
        input: "finlayson",
        expected: "FNLSN11111"
    },
    {
        input: "finley",
        expected: "FNLA111111"
    },
    {
        input: "finlin",
        expected: "FNLN111111"
    },
    {
        input: "finn",
        expected: "FN11111111"
    },
    {
        input: "finnegan",
        expected: "FNKN111111"
    },
    {
        input: "finnerty",
        expected: "FNTA111111"
    },
    {
        input: "finnie",
        expected: "FNA1111111"
    },
    {
        input: "firkin",
        expected: "FKN1111111"
    },
    {
        input: "firth",
        expected: "FT11111111"
    },
    {
        input: "fish",
        expected: "FS11111111"
    },
    {
        input: "fisher",
        expected: "FSA1111111"
    },
    {
        input: "fisken",
        expected: "FSKN111111"
    },
    {
        input: "fisse",
        expected: "FS11111111"
    },
    {
        input: "fitspatrick",
        expected: "FTSPTRK111"
    },
    {
        input: "fitt",
        expected: "FT11111111"
    },
    {
        input: "fitz patrick",
        expected: "FTSPTRK111"
    },
    {
        input: "fitz-patrick",
        expected: "FTSPTRK111"
    },
    {
        input: "fitzclarence",
        expected: "FTSKLRNK11"
    },
    {
        input: "fitzelarence",
        expected: "FTSLRNK111"
    },
    {
        input: "fitzell",
        expected: "FTSA111111"
    },
    {
        input: "fitzer",
        expected: "FTSA111111"
    },
    {
        input: "fitzgeral",
        expected: "FTSKRA1111"
    },
    {
        input: "fitzgerald",
        expected: "FTSKRT1111"
    },
    {
        input: "fitzgibbons",
        expected: "FTSKPNS111"
    },
    {
        input: "fitzpatric",
        expected: "FTSPTRK111"
    },
    {
        input: "fitzpatrick",
        expected: "FTSPTRK111"
    },
    {
        input: "fitzroy",
        expected: "FTSRA11111"
    },
    {
        input: "fiynn",
        expected: "FN11111111"
    },
    {
        input: "flaherty",
        expected: "FLTA111111"
    },
    {
        input: "flahive",
        expected: "FLF1111111"
    },
    {
        input: "flanagan",
        expected: "FLNKN11111"
    },
    {
        input: "flanigan",
        expected: "FLNKN11111"
    },
    {
        input: "flank",
        expected: "FLNK111111"
    },
    {
        input: "flannagan",
        expected: "FLNKN11111"
    },
    {
        input: "flannery",
        expected: "FLNRA11111"
    },
    {
        input: "flanning",
        expected: "FLNNK11111"
    },
    {
        input: "flawn",
        expected: "FLN1111111"
    },
    {
        input: "flaws",
        expected: "FLS1111111"
    },
    {
        input: "fleck",
        expected: "FLK1111111"
    },
    {
        input: "fleet",
        expected: "FLT1111111"
    },
    {
        input: "fleming",
        expected: "FLMNK11111"
    },
    {
        input: "flening",
        expected: "FLNNK11111"
    },
    {
        input: "fletcher",
        expected: "FLKA111111"
    },
    {
        input: "fleteher",
        expected: "FLTA111111"
    },
    {
        input: "flethcher",
        expected: "FLTKA11111"
    },
    {
        input: "flett",
        expected: "FLT1111111"
    },
    {
        input: "fleury",
        expected: "FLRA111111"
    },
    {
        input: "flinders",
        expected: "FLNTS11111"
    },
    {
        input: "flint",
        expected: "FLNT111111"
    },
    {
        input: "flockton",
        expected: "FLKTN11111"
    },
    {
        input: "flood",
        expected: "FLT1111111"
    },
    {
        input: "flora",
        expected: "FLRA111111"
    },
    {
        input: "florabelle",
        expected: "FLRPA11111"
    },
    {
        input: "florann",
        expected: "FLRN111111"
    },
    {
        input: "florencc",
        expected: "FLRNK11111"
    },
    {
        input: "florence",
        expected: "FLRNK11111"
    },
    {
        input: "florice",
        expected: "FLRK111111"
    },
    {
        input: "floris",
        expected: "FLRS111111"
    },
    {
        input: "florisse",
        expected: "FLRS111111"
    },
    {
        input: "florita",
        expected: "FLRTA11111"
    },
    {
        input: "florrie",
        expected: "FLRA111111"
    },
    {
        input: "flossie",
        expected: "FLSA111111"
    },
    {
        input: "floyd",
        expected: "FLT1111111"
    },
    {
        input: "flugge",
        expected: "FLK1111111"
    },
    {
        input: "flynn",
        expected: "FLN1111111"
    },
    {
        input: "foate",
        expected: "FT11111111"
    },
    {
        input: "fogarty",
        expected: "FKTA111111"
    },
    {
        input: "fogo",
        expected: "FKA1111111"
    },
    {
        input: "foley",
        expected: "FLA1111111"
    },
    {
        input: "folwell",
        expected: "FWA1111111"
    },
    {
        input: "foord",
        expected: "FT11111111"
    },
    {
        input: "foote",
        expected: "FT11111111"
    },
    {
        input: "forbes",
        expected: "FPS1111111"
    },
    {
        input: "force",
        expected: "FK11111111"
    },
    {
        input: "ford",
        expected: "FT11111111"
    },
    {
        input: "forde",
        expected: "FT11111111"
    },
    {
        input: "fordham",
        expected: "FTM1111111"
    },
    {
        input: "fordyce",
        expected: "FTK1111111"
    },
    {
        input: "foreman",
        expected: "FRMN111111"
    },
    {
        input: "forest",
        expected: "FRST111111"
    },
    {
        input: "forgeson",
        expected: "FKSN111111"
    },
    {
        input: "forgie",
        expected: "FKA1111111"
    },
    {
        input: "forman",
        expected: "FMN1111111"
    },
    {
        input: "forno",
        expected: "FNA1111111"
    },
    {
        input: "forrest",
        expected: "FRST111111"
    },
    {
        input: "forrester",
        expected: "FRSTA11111"
    },
    {
        input: "forrestina",
        expected: "FRSTNA1111"
    },
    {
        input: "forreter",
        expected: "FRTA111111"
    },
    {
        input: "forscutt",
        expected: "FSKT111111"
    },
    {
        input: "forster",
        expected: "FSTA111111"
    },
    {
        input: "forsyth",
        expected: "FST1111111"
    },
    {
        input: "fort",
        expected: "FT11111111"
    },
    {
        input: "fortune",
        expected: "FTN1111111"
    },
    {
        input: "fosbery",
        expected: "FSPRA11111"
    },
    {
        input: "foster",
        expected: "FSTA111111"
    },
    {
        input: "fothergill",
        expected: "FTKA111111"
    },
    {
        input: "fotheringh",
        expected: "FTRN111111"
    },
    {
        input: "fotheringham",
        expected: "FTRNM11111"
    },
    {
        input: "fotheringharn",
        expected: "FTRNN11111"
    },
    {
        input: "fougere",
        expected: "FKA1111111"
    },
    {
        input: "foulkes",
        expected: "FKS1111111"
    },
    {
        input: "fountain",
        expected: "FNTN111111"
    },
    {
        input: "fow",
        expected: "FA11111111"
    },
    {
        input: "fowell",
        expected: "FWA1111111"
    },
    {
        input: "foweraker",
        expected: "FWRKA11111"
    },
    {
        input: "fowler",
        expected: "FLA1111111"
    },
    {
        input: "fox",
        expected: "FK11111111"
    },
    {
        input: "fox.",
        expected: "FK11111111"
    },
    {
        input: "foxton",
        expected: "FKTN111111"
    },
    {
        input: "fracis",
        expected: "FRSS111111"
    },
    {
        input: "fraer",
        expected: "FRA1111111"
    },
    {
        input: "frago",
        expected: "FRKA111111"
    },
    {
        input: "fraher",
        expected: "FRA1111111"
    },
    {
        input: "fraicis",
        expected: "FRSS111111"
    },
    {
        input: "frame",
        expected: "FRM1111111"
    },
    {
        input: "france",
        expected: "FRNK111111"
    },
    {
        input: "francer",
        expected: "FRNSA11111"
    },
    {
        input: "frances",
        expected: "FRNSS11111"
    },
    {
        input: "franchise",
        expected: "FRNKS11111"
    },
    {
        input: "francie",
        expected: "FRNSA11111"
    },
    {
        input: "francis",
        expected: "FRNSS11111"
    },
    {
        input: "francisca",
        expected: "FRNSSKA111"
    },
    {
        input: "francois",
        expected: "FRNKS11111"
    },
    {
        input: "francusess",
        expected: "FRNKSS1111"
    },
    {
        input: "frank",
        expected: "FRNK111111"
    },
    {
        input: "frankham",
        expected: "FRNKM11111"
    },
    {
        input: "franklin",
        expected: "FRNKLN1111"
    },
    {
        input: "franklyn",
        expected: "FRNKLN1111"
    },
    {
        input: "frankpitt",
        expected: "FRNKPT1111"
    },
    {
        input: "franz",
        expected: "FRNS111111"
    },
    {
        input: "frapwell",
        expected: "FRPWA11111"
    },
    {
        input: "frarnk",
        expected: "FRNK111111"
    },
    {
        input: "frascr",
        expected: "FRSKA11111"
    },
    {
        input: "frasel",
        expected: "FRSA111111"
    },
    {
        input: "fraser",
        expected: "FRSA111111"
    },
    {
        input: "frasor",
        expected: "FRSA111111"
    },
    {
        input: "frazer",
        expected: "FRSA111111"
    },
    {
        input: "frcderick",
        expected: "FKTRK11111"
    },
    {
        input: "fred",
        expected: "FRT1111111"
    },
    {
        input: "freda",
        expected: "FRTA111111"
    },
    {
        input: "fredeick",
        expected: "FRTK111111"
    },
    {
        input: "fredelick",
        expected: "FRTLK11111"
    },
    {
        input: "fredercik",
        expected: "FRTSK11111"
    },
    {
        input: "frederic",
        expected: "FRTRK11111"
    },
    {
        input: "frederica",
        expected: "FRTRKA1111"
    },
    {
        input: "frederich",
        expected: "FRTRK11111"
    },
    {
        input: "frederick",
        expected: "FRTRK11111"
    },
    {
        input: "fredericka",
        expected: "FRTRKA1111"
    },
    {
        input: "fredericld",
        expected: "FRTRKT1111"
    },
    {
        input: "frederidck",
        expected: "FRTRTK1111"
    },
    {
        input: "frederiek",
        expected: "FRTRK11111"
    },
    {
        input: "frederik",
        expected: "FRTRK11111"
    },
    {
        input: "frederlck",
        expected: "FRTK111111"
    },
    {
        input: "fredierick",
        expected: "FRTRK11111"
    },
    {
        input: "fredk",
        expected: "FRTK111111"
    },
    {
        input: "fredric",
        expected: "FRTRK11111"
    },
    {
        input: "fredrica",
        expected: "FRTRKA1111"
    },
    {
        input: "fredrich",
        expected: "FRTRK11111"
    },
    {
        input: "fredrick",
        expected: "FRTRK11111"
    },
    {
        input: "fredrik",
        expected: "FRTRK11111"
    },
    {
        input: "freed",
        expected: "FRT1111111"
    },
    {
        input: "freedman",
        expected: "FRTMN11111"
    },
    {
        input: "freeman",
        expected: "FRMN111111"
    },
    {
        input: "freernan",
        expected: "FRNN111111"
    },
    {
        input: "freid",
        expected: "FRT1111111"
    },
    {
        input: "french",
        expected: "FRNK111111"
    },
    {
        input: "fretwell",
        expected: "FRTWA11111"
    },
    {
        input: "frew",
        expected: "FRA1111111"
    },
    {
        input: "frewen",
        expected: "FRWN111111"
    },
    {
        input: "fric",
        expected: "FRK1111111"
    },
    {
        input: "fricker",
        expected: "FRKA111111"
    },
    {
        input: "friderick",
        expected: "FRTRK11111"
    },
    {
        input: "friedlander",
        expected: "FRTLNTA111"
    },
    {
        input: "friedlich",
        expected: "FRTLK11111"
    },
    {
        input: "friend",
        expected: "FRNT111111"
    },
    {
        input: "frier",
        expected: "FRA1111111"
    },
    {
        input: "frith",
        expected: "FRT1111111"
    },
    {
        input: "froggatt",
        expected: "FRKT111111"
    },
    {
        input: "frood",
        expected: "FRT1111111"
    },
    {
        input: "frost",
        expected: "FRST111111"
    },
    {
        input: "froude",
        expected: "FRT1111111"
    },
    {
        input: "fruhstuch",
        expected: "FRSTK11111"
    },
    {
        input: "fruhstuck",
        expected: "FRSTK11111"
    },
    {
        input: "fruish",
        expected: "FRS1111111"
    },
    {
        input: "fry",
        expected: "FRA1111111"
    },
    {
        input: "frye",
        expected: "FRA1111111"
    },
    {
        input: "fryer",
        expected: "FRA1111111"
    },
    {
        input: "ftzpatrck",
        expected: "FTSPTK1111"
    },
    {
        input: "fuell",
        expected: "FA11111111"
    },
    {
        input: "fulcher",
        expected: "FKA1111111"
    },
    {
        input: "fuldseth",
        expected: "FTST111111"
    },
    {
        input: "fullam",
        expected: "FLM1111111"
    },
    {
        input: "fullarton",
        expected: "FLTN111111"
    },
    {
        input: "fullenia",
        expected: "FLNA111111"
    },
    {
        input: "fuller",
        expected: "FLA1111111"
    },
    {
        input: "fullerton",
        expected: "FLTN111111"
    },
    {
        input: "fulton",
        expected: "FTN1111111"
    },
    {
        input: "furminger",
        expected: "FMNKA11111"
    },
    {
        input: "furness",
        expected: "FNS1111111"
    },
    {
        input: "fursdon",
        expected: "FSTN111111"
    },
    {
        input: "fussell",
        expected: "FSA1111111"
    },
    {
        input: "fyfe",
        expected: "FF11111111"
    },
    {
        input: "fyffe",
        expected: "FF11111111"
    },
    {
        input: "fynmore",
        expected: "FNMA111111"
    },
    {
        input: "gabites",
        expected: "KPTS111111"
    },
    {
        input: "gable",
        expected: "KPA1111111"
    },
    {
        input: "gabriel",
        expected: "KPRA111111"
    },
    {
        input: "gabrielle",
        expected: "KPRA111111"
    },
    {
        input: "gadd",
        expected: "KT11111111"
    },
    {
        input: "gaffaney",
        expected: "KFNA111111"
    },
    {
        input: "gaffeney",
        expected: "KFNA111111"
    },
    {
        input: "gaffey",
        expected: "KFA1111111"
    },
    {
        input: "gaffney",
        expected: "KFNA111111"
    },
    {
        input: "gaiger",
        expected: "KKA1111111"
    },
    {
        input: "gailichan",
        expected: "KLKN111111"
    },
    {
        input: "gain",
        expected: "KN11111111"
    },
    {
        input: "gairdner",
        expected: "KTNA111111"
    },
    {
        input: "galagher",
        expected: "KLKA111111"
    },
    {
        input: "galbraith",
        expected: "KPRT111111"
    },
    {
        input: "gale",
        expected: "KA11111111"
    },
    {
        input: "gall",
        expected: "KA11111111"
    },
    {
        input: "gallacher",
        expected: "KLKA111111"
    },
    {
        input: "gallagher",
        expected: "KLKA111111"
    },
    {
        input: "gallaher",
        expected: "KLA1111111"
    },
    {
        input: "gallan",
        expected: "KLN1111111"
    },
    {
        input: "galland",
        expected: "KLNT111111"
    },
    {
        input: "gallanders",
        expected: "KLNTS11111"
    },
    {
        input: "gallant",
        expected: "KLNT111111"
    },
    {
        input: "gallaway",
        expected: "KLWA111111"
    },
    {
        input: "gallbraith",
        expected: "KPRT111111"
    },
    {
        input: "gallichan",
        expected: "KLKN111111"
    },
    {
        input: "gallie",
        expected: "KLA1111111"
    },
    {
        input: "galliven",
        expected: "KLFN111111"
    },
    {
        input: "gallngher",
        expected: "KNA1111111"
    },
    {
        input: "galloway",
        expected: "KLWA111111"
    },
    {
        input: "gallschef",
        expected: "KSKF111111"
    },
    {
        input: "galt",
        expected: "KT11111111"
    },
    {
        input: "galvin",
        expected: "KFN1111111"
    },
    {
        input: "galway",
        expected: "KWA1111111"
    },
    {
        input: "gambell",
        expected: "KMPA111111"
    },
    {
        input: "gamble",
        expected: "KMPA111111"
    },
    {
        input: "gamet",
        expected: "KMT1111111"
    },
    {
        input: "ganderton",
        expected: "KNTTN11111"
    },
    {
        input: "gantley",
        expected: "KNTLA11111"
    },
    {
        input: "gara",
        expected: "KRA1111111"
    },
    {
        input: "garbutt",
        expected: "KPT1111111"
    },
    {
        input: "garcho",
        expected: "KKA1111111"
    },
    {
        input: "garchow",
        expected: "KKA1111111"
    },
    {
        input: "gard'ner",
        expected: "KTNA111111"
    },
    {
        input: "garden",
        expected: "KTN1111111"
    },
    {
        input: "gardham",
        expected: "KTM1111111"
    },
    {
        input: "gardiner",
        expected: "KTNA111111"
    },
    {
        input: "gardner",
        expected: "KTNA111111"
    },
    {
        input: "gardyne",
        expected: "KTN1111111"
    },
    {
        input: "gare",
        expected: "KA11111111"
    },
    {
        input: "garforth",
        expected: "KFT1111111"
    },
    {
        input: "garham",
        expected: "KM11111111"
    },
    {
        input: "garibaldi",
        expected: "KRPTA11111"
    },
    {
        input: "garland",
        expected: "KLNT111111"
    },
    {
        input: "garlyutt",
        expected: "KLT1111111"
    },
    {
        input: "garnctt",
        expected: "KNKT111111"
    },
    {
        input: "garner",
        expected: "KNA1111111"
    },
    {
        input: "garnet",
        expected: "KNT1111111"
    },
    {
        input: "garnett",
        expected: "KNT1111111"
    },
    {
        input: "garohow",
        expected: "KRA1111111"
    },
    {
        input: "garr",
        expected: "KA11111111"
    },
    {
        input: "garret",
        expected: "KRT1111111"
    },
    {
        input: "garrett",
        expected: "KRT1111111"
    },
    {
        input: "garrich",
        expected: "KRK1111111"
    },
    {
        input: "garrick",
        expected: "KRK1111111"
    },
    {
        input: "garrigan",
        expected: "KRKN111111"
    },
    {
        input: "garron",
        expected: "KRN1111111"
    },
    {
        input: "garrow",
        expected: "KRA1111111"
    },
    {
        input: "garry",
        expected: "KRA1111111"
    },
    {
        input: "garside",
        expected: "KST1111111"
    },
    {
        input: "garstang",
        expected: "KSTNK11111"
    },
    {
        input: "garth",
        expected: "KT11111111"
    },
    {
        input: "garty",
        expected: "KTA1111111"
    },
    {
        input: "garvey",
        expected: "KFA1111111"
    },
    {
        input: "gary",
        expected: "KRA1111111"
    },
    {
        input: "gascoigne",
        expected: "KSKKN11111"
    },
    {
        input: "gasey",
        expected: "KSA1111111"
    },
    {
        input: "gaspar",
        expected: "KSPA111111"
    },
    {
        input: "gaston",
        expected: "KSTN111111"
    },
    {
        input: "gatehouse",
        expected: "KTS1111111"
    },
    {
        input: "gatfield",
        expected: "KTFT111111"
    },
    {
        input: "gatside",
        expected: "KTST111111"
    },
    {
        input: "gatton",
        expected: "KTN1111111"
    },
    {
        input: "gaudin",
        expected: "KTN1111111"
    },
    {
        input: "gaul",
        expected: "KA11111111"
    },
    {
        input: "gauld",
        expected: "KT11111111"
    },
    {
        input: "gault",
        expected: "KT11111111"
    },
    {
        input: "gavan",
        expected: "KFN1111111"
    },
    {
        input: "gavegan",
        expected: "KFKN111111"
    },
    {
        input: "gavigan",
        expected: "KFKN111111"
    },
    {
        input: "gavin",
        expected: "KFN1111111"
    },
    {
        input: "gaw",
        expected: "KA11111111"
    },
    {
        input: "gawn",
        expected: "KN11111111"
    },
    {
        input: "gawne",
        expected: "KN11111111"
    },
    {
        input: "gay",
        expected: "KA11111111"
    },
    {
        input: "gaylor",
        expected: "KLA1111111"
    },
    {
        input: "gaynor",
        expected: "KNA1111111"
    },
    {
        input: "gaytan",
        expected: "KTN1111111"
    },
    {
        input: "gcorge",
        expected: "KK11111111"
    },
    {
        input: "geaney",
        expected: "KNA1111111"
    },
    {
        input: "gear",
        expected: "KA11111111"
    },
    {
        input: "gearing",
        expected: "KRNK111111"
    },
    {
        input: "geary",
        expected: "KRA1111111"
    },
    {
        input: "gebrge",
        expected: "KPK1111111"
    },
    {
        input: "gecrge",
        expected: "KKK1111111"
    },
    {
        input: "geddes",
        expected: "KTS1111111"
    },
    {
        input: "geddis",
        expected: "KTS1111111"
    },
    {
        input: "gedney",
        expected: "KTNA111111"
    },
    {
        input: "gee",
        expected: "KA11111111"
    },
    {
        input: "geen",
        expected: "KN11111111"
    },
    {
        input: "geeorge",
        expected: "KK11111111"
    },
    {
        input: "geering",
        expected: "KRNK111111"
    },
    {
        input: "geeson",
        expected: "KSN1111111"
    },
    {
        input: "geeves",
        expected: "KFS1111111"
    },
    {
        input: "geiger",
        expected: "KKA1111111"
    },
    {
        input: "geleatly",
        expected: "KLTLA11111"
    },
    {
        input: "gellatly",
        expected: "KLTLA11111"
    },
    {
        input: "gemmell",
        expected: "KMA1111111"
    },
    {
        input: "gene",
        expected: "KN11111111"
    },
    {
        input: "genge",
        expected: "KNK1111111"
    },
    {
        input: "genrie",
        expected: "KNRA111111"
    },
    {
        input: "gensik",
        expected: "KNSK111111"
    },
    {
        input: "gent",
        expected: "KNT1111111"
    },
    {
        input: "gentleman",
        expected: "KNTLMN1111"
    },
    {
        input: "geo",
        expected: "KA11111111"
    },
    {
        input: "geoffrev",
        expected: "KFRF111111"
    },
    {
        input: "geoffrey",
        expected: "KFRA111111"
    },
    {
        input: "geoffry",
        expected: "KFRA111111"
    },
    {
        input: "geonge",
        expected: "KNK1111111"
    },
    {
        input: "george",
        expected: "KK11111111"
    },
    {
        input: "georgei",
        expected: "KKA1111111"
    },
    {
        input: "georgeison",
        expected: "KKSN111111"
    },
    {
        input: "georgel",
        expected: "KKA1111111"
    },
    {
        input: "georger",
        expected: "KKA1111111"
    },
    {
        input: "georgeson",
        expected: "KKSN111111"
    },
    {
        input: "georgia",
        expected: "KKA1111111"
    },
    {
        input: "georgina",
        expected: "KKNA111111"
    },
    {
        input: "georgo",
        expected: "KKA1111111"
    },
    {
        input: "georgte",
        expected: "KKT1111111"
    },
    {
        input: "geortre",
        expected: "KTA1111111"
    },
    {
        input: "gerald",
        expected: "KRT1111111"
    },
    {
        input: "geraldine",
        expected: "KRTN111111"
    },
    {
        input: "gerard",
        expected: "KRT1111111"
    },
    {
        input: "gerge",
        expected: "KK11111111"
    },
    {
        input: "gerken",
        expected: "KKN1111111"
    },
    {
        input: "gerrard",
        expected: "KRT1111111"
    },
    {
        input: "gerrie",
        expected: "KRA1111111"
    },
    {
        input: "gershon",
        expected: "KSN1111111"
    },
    {
        input: "gertie",
        expected: "KTA1111111"
    },
    {
        input: "gertrude",
        expected: "KTRT111111"
    },
    {
        input: "gessenox",
        expected: "KSNK111111"
    },
    {
        input: "gether",
        expected: "KTA1111111"
    },
    {
        input: "getken",
        expected: "KTKN111111"
    },
    {
        input: "gevin",
        expected: "KFN1111111"
    },
    {
        input: "gey",
        expected: "KA11111111"
    },
    {
        input: "geytha",
        expected: "KTA1111111"
    },
    {
        input: "geziena",
        expected: "KSNA111111"
    },
    {
        input: "ghadwick",
        expected: "TWK1111111"
    },
    {
        input: "gharles",
        expected: "LS11111111"
    },
    {
        input: "gibb",
        expected: "KP11111111"
    },
    {
        input: "gibbons",
        expected: "KPNS111111"
    },
    {
        input: "gibbs",
        expected: "KPS1111111"
    },
    {
        input: "gibson",
        expected: "KPSN111111"
    },
    {
        input: "gideon",
        expected: "KTN1111111"
    },
    {
        input: "giener",
        expected: "KNA1111111"
    },
    {
        input: "gieorge",
        expected: "KK11111111"
    },
    {
        input: "gifford",
        expected: "KFT1111111"
    },
    {
        input: "giford-browne",
        expected: "KFTPRN1111"
    },
    {
        input: "gil1",
        expected: "KA11111111"
    },
    {
        input: "gilan",
        expected: "KLN1111111"
    },
    {
        input: "gilbert",
        expected: "KPT1111111"
    },
    {
        input: "gilberta",
        expected: "KPTA111111"
    },
    {
        input: "gilbride",
        expected: "KPRT111111"
    },
    {
        input: "gilchrist",
        expected: "KKRST11111"
    },
    {
        input: "gilder",
        expected: "KTA1111111"
    },
    {
        input: "giles",
        expected: "KLS1111111"
    },
    {
        input: "gilfedder",
        expected: "KFTA111111"
    },
    {
        input: "gilfillan",
        expected: "KFLN111111"
    },
    {
        input: "gilhert",
        expected: "KT11111111"
    },
    {
        input: "gilkison",
        expected: "KKSN111111"
    },
    {
        input: "gilks",
        expected: "KKS1111111"
    },
    {
        input: "gill",
        expected: "KA11111111"
    },
    {
        input: "gillam",
        expected: "KLM1111111"
    },
    {
        input: "gillan",
        expected: "KLN1111111"
    },
    {
        input: "gillanders",
        expected: "KLNTS11111"
    },
    {
        input: "gillard",
        expected: "KLT1111111"
    },
    {
        input: "gillender",
        expected: "KLNTA11111"
    },
    {
        input: "giller",
        expected: "KLA1111111"
    },
    {
        input: "gillers",
        expected: "KLS1111111"
    },
    {
        input: "gillespie",
        expected: "KLSPA11111"
    },
    {
        input: "gillett",
        expected: "KLT1111111"
    },
    {
        input: "gilliand",
        expected: "KLNT111111"
    },
    {
        input: "gillick",
        expected: "KLK1111111"
    },
    {
        input: "gillies",
        expected: "KLS1111111"
    },
    {
        input: "gilligan",
        expected: "KLKN111111"
    },
    {
        input: "gillions",
        expected: "KLNS111111"
    },
    {
        input: "gillispie",
        expected: "KLSPA11111"
    },
    {
        input: "gillon",
        expected: "KLN1111111"
    },
    {
        input: "gillooly",
        expected: "KLLA111111"
    },
    {
        input: "gilmolr",
        expected: "KMLA111111"
    },
    {
        input: "gilmore",
        expected: "KMA1111111"
    },
    {
        input: "gilmour",
        expected: "KMA1111111"
    },
    {
        input: "girdler",
        expected: "KTLA111111"
    },
    {
        input: "girdwood",
        expected: "KTWT111111"
    },
    {
        input: "girvan",
        expected: "KFN1111111"
    },
    {
        input: "gisella",
        expected: "KSLA111111"
    },
    {
        input: "gittos",
        expected: "KTS1111111"
    },
    {
        input: "gjersen",
        expected: "KSN1111111"
    },
    {
        input: "gladding",
        expected: "KLTNK11111"
    },
    {
        input: "gladstone",
        expected: "KLTSTN1111"
    },
    {
        input: "gladwin",
        expected: "KLTWN11111"
    },
    {
        input: "gladwish",
        expected: "KLTWS11111"
    },
    {
        input: "gladwith",
        expected: "KLTWT11111"
    },
    {
        input: "gladwys",
        expected: "KLTWS11111"
    },
    {
        input: "gladys",
        expected: "KLTS111111"
    },
    {
        input: "glaister",
        expected: "KLSTA11111"
    },
    {
        input: "glanvill",
        expected: "KLNFA11111"
    },
    {
        input: "glasgow",
        expected: "KLSKA11111"
    },
    {
        input: "glass",
        expected: "KLS1111111"
    },
    {
        input: "glasse",
        expected: "KLS1111111"
    },
    {
        input: "glassett",
        expected: "KLST111111"
    },
    {
        input: "glasson",
        expected: "KLSN111111"
    },
    {
        input: "glau",
        expected: "KLA1111111"
    },
    {
        input: "glault",
        expected: "KLT1111111"
    },
    {
        input: "gledinning",
        expected: "KLTNNK1111"
    },
    {
        input: "glen",
        expected: "KLN1111111"
    },
    {
        input: "glendining",
        expected: "KLNTNNK111"
    },
    {
        input: "glendinnin",
        expected: "KLNTNN1111"
    },
    {
        input: "glendinning",
        expected: "KLNTNNK111"
    },
    {
        input: "glengarry",
        expected: "KLNKRA1111"
    },
    {
        input: "glenn",
        expected: "KLN1111111"
    },
    {
        input: "glennie",
        expected: "KLNA111111"
    },
    {
        input: "glennon",
        expected: "KLNN111111"
    },
    {
        input: "gleorga",
        expected: "KLKA111111"
    },
    {
        input: "gleorge",
        expected: "KLK1111111"
    },
    {
        input: "gleorgina",
        expected: "KLKNA11111"
    },
    {
        input: "glerrie",
        expected: "KLRA111111"
    },
    {
        input: "gleurge",
        expected: "KLK1111111"
    },
    {
        input: "glibb",
        expected: "KLP1111111"
    },
    {
        input: "gliddon",
        expected: "KLTN111111"
    },
    {
        input: "glisby",
        expected: "KLSPA11111"
    },
    {
        input: "glladys",
        expected: "KLTS111111"
    },
    {
        input: "gllespte",
        expected: "KLSPT11111"
    },
    {
        input: "gloag",
        expected: "KLK1111111"
    },
    {
        input: "glordon",
        expected: "KLTN111111"
    },
    {
        input: "glossop",
        expected: "KLSP111111"
    },
    {
        input: "glover",
        expected: "KLFA111111"
    },
    {
        input: "glozier",
        expected: "KLSA111111"
    },
    {
        input: "glrace",
        expected: "KRK1111111"
    },
    {
        input: "glroves",
        expected: "KRFS111111"
    },
    {
        input: "glubbins",
        expected: "KLPNS11111"
    },
    {
        input: "glue",
        expected: "KLA1111111"
    },
    {
        input: "glynn",
        expected: "KLN1111111"
    },
    {
        input: "goatham",
        expected: "KTM1111111"
    },
    {
        input: "gobbitt",
        expected: "KPT1111111"
    },
    {
        input: "goble",
        expected: "KPA1111111"
    },
    {
        input: "godber",
        expected: "KTPA111111"
    },
    {
        input: "godby",
        expected: "KTPA111111"
    },
    {
        input: "goddard",
        expected: "KTT1111111"
    },
    {
        input: "godden",
        expected: "KTN1111111"
    },
    {
        input: "godfred",
        expected: "KTFRT11111"
    },
    {
        input: "godfrey",
        expected: "KTFRA11111"
    },
    {
        input: "goding",
        expected: "KTNK111111"
    },
    {
        input: "godirey",
        expected: "KTRA111111"
    },
    {
        input: "godso",
        expected: "KTSA111111"
    },
    {
        input: "godward",
        expected: "KTWT111111"
    },
    {
        input: "godwin",
        expected: "KTWN111111"
    },
    {
        input: "golda",
        expected: "KTA1111111"
    },
    {
        input: "golden",
        expected: "KTN1111111"
    },
    {
        input: "goldie",
        expected: "KTA1111111"
    },
    {
        input: "golding",
        expected: "KTNK111111"
    },
    {
        input: "goldsmid",
        expected: "KTSMT11111"
    },
    {
        input: "goldsmith",
        expected: "KTSMT11111"
    },
    {
        input: "goldstein",
        expected: "KTSTN11111"
    },
    {
        input: "golightly",
        expected: "KLTLA11111"
    },
    {
        input: "gollan",
        expected: "KLN1111111"
    },
    {
        input: "gollar",
        expected: "KLA1111111"
    },
    {
        input: "gomersall",
        expected: "KMSA111111"
    },
    {
        input: "gomm",
        expected: "KM11111111"
    },
    {
        input: "gong",
        expected: "KNK1111111"
    },
    {
        input: "goninon",
        expected: "KNNN111111"
    },
    {
        input: "gonzaga",
        expected: "KNSKA11111"
    },
    {
        input: "gooch",
        expected: "KK11111111"
    },
    {
        input: "good",
        expected: "KT11111111"
    },
    {
        input: "goodall",
        expected: "KTA1111111"
    },
    {
        input: "goode",
        expected: "KT11111111"
    },
    {
        input: "goodeve",
        expected: "KTF1111111"
    },
    {
        input: "goodey",
        expected: "KTA1111111"
    },
    {
        input: "goodfellow",
        expected: "KTFLA11111"
    },
    {
        input: "goodhall",
        expected: "KTA1111111"
    },
    {
        input: "goodison",
        expected: "KTSN111111"
    },
    {
        input: "goodlet",
        expected: "KTLT111111"
    },
    {
        input: "goodlot",
        expected: "KTLT111111"
    },
    {
        input: "goodman",
        expected: "KTMN111111"
    },
    {
        input: "goodmanson",
        expected: "KTMNSN1111"
    },
    {
        input: "goodridge",
        expected: "KTRK111111"
    },
    {
        input: "goodsir",
        expected: "KTSA111111"
    },
    {
        input: "goodwin",
        expected: "KTWN111111"
    },
    {
        input: "goodyer",
        expected: "KTA1111111"
    },
    {
        input: "goorge",
        expected: "KK11111111"
    },
    {
        input: "gooseman",
        expected: "KSMN111111"
    },
    {
        input: "gordin",
        expected: "KTN1111111"
    },
    {
        input: "gordon",
        expected: "KTN1111111"
    },
    {
        input: "gore",
        expected: "KA11111111"
    },
    {
        input: "gore-johnston",
        expected: "KRNSTN1111"
    },
    {
        input: "gorge",
        expected: "KK11111111"
    },
    {
        input: "gorgeson",
        expected: "KKSN111111"
    },
    {
        input: "gorham",
        expected: "KM11111111"
    },
    {
        input: "gormack",
        expected: "KMK1111111"
    },
    {
        input: "gorman",
        expected: "KMN1111111"
    },
    {
        input: "gormly",
        expected: "KMLA111111"
    },
    {
        input: "gorton",
        expected: "KTN1111111"
    },
    {
        input: "gosham",
        expected: "KSM1111111"
    },
    {
        input: "gosling",
        expected: "KSLNK11111"
    },
    {
        input: "gosney",
        expected: "KSNA111111"
    },
    {
        input: "gottfred",
        expected: "KTFRT11111"
    },
    {
        input: "goudie",
        expected: "KTA1111111"
    },
    {
        input: "gough",
        expected: "KA11111111"
    },
    {
        input: "gould",
        expected: "KT11111111"
    },
    {
        input: "goulston",
        expected: "KSTN111111"
    },
    {
        input: "goulstone",
        expected: "KSTN111111"
    },
    {
        input: "gourlay",
        expected: "KLA1111111"
    },
    {
        input: "gourley",
        expected: "KLA1111111"
    },
    {
        input: "gourlie",
        expected: "KLA1111111"
    },
    {
        input: "govan",
        expected: "KFN1111111"
    },
    {
        input: "gover",
        expected: "KFA1111111"
    },
    {
        input: "gow",
        expected: "KA11111111"
    },
    {
        input: "gowan",
        expected: "KWN1111111"
    },
    {
        input: "gowans",
        expected: "KWNS111111"
    },
    {
        input: "gowdy",
        expected: "KTA1111111"
    },
    {
        input: "gowie",
        expected: "KWA1111111"
    },
    {
        input: "goy",
        expected: "KA11111111"
    },
    {
        input: "goyen",
        expected: "KN11111111"
    },
    {
        input: "grace",
        expected: "KRK1111111"
    },
    {
        input: "gracie",
        expected: "KRSA111111"
    },
    {
        input: "grady",
        expected: "KRTA111111"
    },
    {
        input: "graf",
        expected: "KRF1111111"
    },
    {
        input: "graham",
        expected: "KRM1111111"
    },
    {
        input: "grahame",
        expected: "KRM1111111"
    },
    {
        input: "grahan",
        expected: "KRN1111111"
    },
    {
        input: "grahm",
        expected: "KRM1111111"
    },
    {
        input: "graig",
        expected: "KRK1111111"
    },
    {
        input: "grainger",
        expected: "KRNKA11111"
    },
    {
        input: "grainm",
        expected: "KRNM111111"
    },
    {
        input: "grallam",
        expected: "KRLM111111"
    },
    {
        input: "grame",
        expected: "KRM1111111"
    },
    {
        input: "grammer",
        expected: "KRMA111111"
    },
    {
        input: "grandison",
        expected: "KRNTSN1111"
    },
    {
        input: "grange",
        expected: "KRNK111111"
    },
    {
        input: "grant",
        expected: "KRNT111111"
    },
    {
        input: "grantham",
        expected: "KRNTM11111"
    },
    {
        input: "grass",
        expected: "KRS1111111"
    },
    {
        input: "grattan",
        expected: "KRTN111111"
    },
    {
        input: "gratton",
        expected: "KRTN111111"
    },
    {
        input: "gratwick",
        expected: "KRTWK11111"
    },
    {
        input: "grave",
        expected: "KRF1111111"
    },
    {
        input: "graves",
        expected: "KRFS111111"
    },
    {
        input: "grawford",
        expected: "KRFT111111"
    },
    {
        input: "gray",
        expected: "KRA1111111"
    },
    {
        input: "grayce",
        expected: "KRK1111111"
    },
    {
        input: "graye",
        expected: "KRA1111111"
    },
    {
        input: "grealish",
        expected: "KRLS111111"
    },
    {
        input: "greaney",
        expected: "KRNA111111"
    },
    {
        input: "greatrex",
        expected: "KRTRK11111"
    },
    {
        input: "greaves",
        expected: "KRFS111111"
    },
    {
        input: "green",
        expected: "KRN1111111"
    },
    {
        input: "greenall",
        expected: "KRNA111111"
    },
    {
        input: "greene",
        expected: "KRN1111111"
    },
    {
        input: "greenfield",
        expected: "KRNFT11111"
    },
    {
        input: "greenhalgh",
        expected: "KRNA111111"
    },
    {
        input: "greenhough",
        expected: "KRNA111111"
    },
    {
        input: "greenish",
        expected: "KRNS111111"
    },
    {
        input: "greenland",
        expected: "KRNLNT1111"
    },
    {
        input: "greenslade",
        expected: "KRNSLT1111"
    },
    {
        input: "greensmith",
        expected: "KRNSMT1111"
    },
    {
        input: "greenway",
        expected: "KRNWA11111"
    },
    {
        input: "greenwood",
        expected: "KRNWT11111"
    },
    {
        input: "greenwood-wilson",
        expected: "KRNWTWSN11"
    },
    {
        input: "greenyer",
        expected: "KRNA111111"
    },
    {
        input: "greer",
        expected: "KRA1111111"
    },
    {
        input: "greeves",
        expected: "KRFS111111"
    },
    {
        input: "gregan",
        expected: "KRKN111111"
    },
    {
        input: "gregg",
        expected: "KRK1111111"
    },
    {
        input: "gregory",
        expected: "KRKRA11111"
    },
    {
        input: "greig",
        expected: "KRK1111111"
    },
    {
        input: "greigory",
        expected: "KRKRA11111"
    },
    {
        input: "grenfell",
        expected: "KRNFA11111"
    },
    {
        input: "gresham",
        expected: "KRSM111111"
    },
    {
        input: "greshon",
        expected: "KRSN111111"
    },
    {
        input: "greta",
        expected: "KRTA111111"
    },
    {
        input: "gretchen",
        expected: "KRKN111111"
    },
    {
        input: "gretta",
        expected: "KRTA111111"
    },
    {
        input: "greves",
        expected: "KRFS111111"
    },
    {
        input: "grey",
        expected: "KRA1111111"
    },
    {
        input: "gribben",
        expected: "KRPN111111"
    },
    {
        input: "grice",
        expected: "KRK1111111"
    },
    {
        input: "gridgeman",
        expected: "KRKMN11111"
    },
    {
        input: "grierson",
        expected: "KRSN111111"
    },
    {
        input: "grieve",
        expected: "KRF1111111"
    },
    {
        input: "griffen",
        expected: "KRFN111111"
    },
    {
        input: "griffin",
        expected: "KRFN111111"
    },
    {
        input: "griffith",
        expected: "KRFT111111"
    },
    {
        input: "griffiths",
        expected: "KRFTS11111"
    },
    {
        input: "griffths",
        expected: "KRFTS11111"
    },
    {
        input: "griflin",
        expected: "KRFLN11111"
    },
    {
        input: "grig",
        expected: "KRK1111111"
    },
    {
        input: "grigg",
        expected: "KRK1111111"
    },
    {
        input: "grigsby",
        expected: "KRKSPA1111"
    },
    {
        input: "grimaldi",
        expected: "KRMTA11111"
    },
    {
        input: "grimman",
        expected: "KRMN111111"
    },
    {
        input: "grimmest",
        expected: "KRMST11111"
    },
    {
        input: "grimmett",
        expected: "KRMT111111"
    },
    {
        input: "grimsdale",
        expected: "KRMSTA1111"
    },
    {
        input: "grimsey",
        expected: "KRMSA11111"
    },
    {
        input: "grimshaw",
        expected: "KRMSA11111"
    },
    {
        input: "grimwood",
        expected: "KRMWT11111"
    },
    {
        input: "grin",
        expected: "KRN1111111"
    },
    {
        input: "grindlay",
        expected: "KRNTLA1111"
    },
    {
        input: "grindley",
        expected: "KRNTLA1111"
    },
    {
        input: "grinyer",
        expected: "KRNA111111"
    },
    {
        input: "griselda",
        expected: "KRSTA11111"
    },
    {
        input: "grocott",
        expected: "KRKT111111"
    },
    {
        input: "grogan",
        expected: "KRKN111111"
    },
    {
        input: "groom",
        expected: "KRM1111111"
    },
    {
        input: "grose",
        expected: "KRS1111111"
    },
    {
        input: "grosse",
        expected: "KRS1111111"
    },
    {
        input: "grosvenor",
        expected: "KRSFNA1111"
    },
    {
        input: "grounds",
        expected: "KRNTS11111"
    },
    {
        input: "grover",
        expected: "KRFA111111"
    },
    {
        input: "groves",
        expected: "KRFS111111"
    },
    {
        input: "growden",
        expected: "KRTN111111"
    },
    {
        input: "grubb",
        expected: "KRP1111111"
    },
    {
        input: "grubh",
        expected: "KRP1111111"
    },
    {
        input: "gruitt",
        expected: "KRT1111111"
    },
    {
        input: "grundy",
        expected: "KRNTA11111"
    },
    {
        input: "gruszning",
        expected: "KRSNNK1111"
    },
    {
        input: "grut",
        expected: "KRT1111111"
    },
    {
        input: "gteorge",
        expected: "KTK1111111"
    },
    {
        input: "gubbins",
        expected: "KPNS111111"
    },
    {
        input: "guest",
        expected: "KST1111111"
    },
    {
        input: "guffie",
        expected: "KFA1111111"
    },
    {
        input: "guild",
        expected: "KT11111111"
    },
    {
        input: "guildford",
        expected: "KTFT111111"
    },
    {
        input: "guilen",
        expected: "KLN1111111"
    },
    {
        input: "guilford",
        expected: "KFT1111111"
    },
    {
        input: "guillmot",
        expected: "KMT1111111"
    },
    {
        input: "guinan",
        expected: "KNN1111111"
    },
    {
        input: "guinevere",
        expected: "KNFA111111"
    },
    {
        input: "guinness",
        expected: "KNS1111111"
    },
    {
        input: "gulbins",
        expected: "KPNS111111"
    },
    {
        input: "gullan",
        expected: "KLN1111111"
    },
    {
        input: "gulland",
        expected: "KLNT111111"
    },
    {
        input: "gullen",
        expected: "KLN1111111"
    },
    {
        input: "gum",
        expected: "KM11111111"
    },
    {
        input: "gummer",
        expected: "KMA1111111"
    },
    {
        input: "gumpatzes",
        expected: "KMPTSS1111"
    },
    {
        input: "gunion",
        expected: "KNN1111111"
    },
    {
        input: "gunn",
        expected: "KN11111111"
    },
    {
        input: "gunner",
        expected: "KNA1111111"
    },
    {
        input: "gunning",
        expected: "KNNK111111"
    },
    {
        input: "gunton",
        expected: "KNTN111111"
    },
    {
        input: "gurming",
        expected: "KMNK111111"
    },
    {
        input: "gurr",
        expected: "KA11111111"
    },
    {
        input: "gustafson",
        expected: "KSTFSN1111"
    },
    {
        input: "gustav",
        expected: "KSTF111111"
    },
    {
        input: "gustava",
        expected: "KSTFA11111"
    },
    {
        input: "gustave",
        expected: "KSTF111111"
    },
    {
        input: "guthrie",
        expected: "KTRA111111"
    },
    {
        input: "gutschlag",
        expected: "KTSKLK1111"
    },
    {
        input: "gutsell",
        expected: "KTSA111111"
    },
    {
        input: "guy",
        expected: "KA11111111"
    },
    {
        input: "guyton",
        expected: "KTN1111111"
    },
    {
        input: "gve",
        expected: "KF11111111"
    },
    {
        input: "gwen",
        expected: "KWN1111111"
    },
    {
        input: "gwenath",
        expected: "KWNT111111"
    },
    {
        input: "gwenda",
        expected: "KWNTA11111"
    },
    {
        input: "gwendaline",
        expected: "KWNTLN1111"
    },
    {
        input: "gwendelyne",
        expected: "KWNTLN1111"
    },
    {
        input: "gwendolen",
        expected: "KWNTLN1111"
    },
    {
        input: "gwendolene",
        expected: "KWNTLN1111"
    },
    {
        input: "gwendolin",
        expected: "KWNTLN1111"
    },
    {
        input: "gwendoline",
        expected: "KWNTLN1111"
    },
    {
        input: "gwendolyn",
        expected: "KWNTLN1111"
    },
    {
        input: "gweneth",
        expected: "KWNT111111"
    },
    {
        input: "gwenifer",
        expected: "KWNFA11111"
    },
    {
        input: "gwenoth",
        expected: "KWNT111111"
    },
    {
        input: "gwenyth",
        expected: "KWNT111111"
    },
    {
        input: "gwilliams",
        expected: "KWLMS11111"
    },
    {
        input: "gwladys",
        expected: "KLTS111111"
    },
    {
        input: "gwyn",
        expected: "KWN1111111"
    },
    {
        input: "gwyndoline",
        expected: "KWNTLN1111"
    },
    {
        input: "gwynne",
        expected: "KWN1111111"
    },
    {
        input: "gwynneth",
        expected: "KWNT111111"
    },
    {
        input: "gye",
        expected: "KA11111111"
    },
    {
        input: "gytha",
        expected: "KTA1111111"
    },
    {
        input: "gythar",
        expected: "KTA1111111"
    },
    {
        input: "ha",
        expected: "AA11111111"
    },
    {
        input: "haake",
        expected: "AK11111111"
    },
    {
        input: "haas",
        expected: "AS11111111"
    },
    {
        input: "haberfield",
        expected: "APFT111111"
    },
    {
        input: "habershon",
        expected: "APSN111111"
    },
    {
        input: "hack",
        expected: "AK11111111"
    },
    {
        input: "hackett",
        expected: "AKT1111111"
    },
    {
        input: "haddon",
        expected: "ATN1111111"
    },
    {
        input: "haddrell",
        expected: "ATRA111111"
    },
    {
        input: "hade",
        expected: "AT11111111"
    },
    {
        input: "hadfield",
        expected: "ATFT111111"
    },
    {
        input: "hadlee",
        expected: "ATLA111111"
    },
    {
        input: "hadley",
        expected: "ATLA111111"
    },
    {
        input: "hadlow",
        expected: "ATLA111111"
    },
    {
        input: "haffenden",
        expected: "AFNTN11111"
    },
    {
        input: "hagan",
        expected: "AKN1111111"
    },
    {
        input: "hagarty",
        expected: "AKTA111111"
    },
    {
        input: "hagen",
        expected: "AKN1111111"
    },
    {
        input: "haggart",
        expected: "AKT1111111"
    },
    {
        input: "haggett",
        expected: "AKT1111111"
    },
    {
        input: "haggitt",
        expected: "AKT1111111"
    },
    {
        input: "hague",
        expected: "AKA1111111"
    },
    {
        input: "haidee",
        expected: "ATA1111111"
    },
    {
        input: "haig",
        expected: "AK11111111"
    },
    {
        input: "haigh",
        expected: "AA11111111"
    },
    {
        input: "hailes",
        expected: "ALS1111111"
    },
    {
        input: "hailton",
        expected: "ATN1111111"
    },
    {
        input: "haines",
        expected: "ANS1111111"
    },
    {
        input: "hair",
        expected: "AA11111111"
    },
    {
        input: "hakely",
        expected: "AKLA111111"
    },
    {
        input: "hal",
        expected: "AA11111111"
    },
    {
        input: "halberg",
        expected: "APK1111111"
    },
    {
        input: "halcrow",
        expected: "AKRA111111"
    },
    {
        input: "haldane",
        expected: "ATN1111111"
    },
    {
        input: "hale",
        expected: "AA11111111"
    },
    {
        input: "hales",
        expected: "ALS1111111"
    },
    {
        input: "halfka",
        expected: "AFKA111111"
    },
    {
        input: "halford",
        expected: "AFT1111111"
    },
    {
        input: "halies",
        expected: "ALS1111111"
    },
    {
        input: "halket",
        expected: "AKT1111111"
    },
    {
        input: "halkett",
        expected: "AKT1111111"
    },
    {
        input: "hall",
        expected: "AA11111111"
    },
    {
        input: "hallam",
        expected: "ALM1111111"
    },
    {
        input: "hallas",
        expected: "ALS1111111"
    },
    {
        input: "hallet",
        expected: "ALT1111111"
    },
    {
        input: "hallett",
        expected: "ALT1111111"
    },
    {
        input: "halley",
        expected: "ALA1111111"
    },
    {
        input: "halliday",
        expected: "ALTA111111"
    },
    {
        input: "halligan",
        expected: "ALKN111111"
    },
    {
        input: "hallinan",
        expected: "ALNN111111"
    },
    {
        input: "hallsen",
        expected: "ASN1111111"
    },
    {
        input: "hally",
        expected: "ALA1111111"
    },
    {
        input: "halpin",
        expected: "APN1111111"
    },
    {
        input: "halsinger",
        expected: "ASNKA11111"
    },
    {
        input: "haly",
        expected: "ALA1111111"
    },
    {
        input: "ham",
        expected: "AM11111111"
    },
    {
        input: "hamann",
        expected: "AMN1111111"
    },
    {
        input: "hambleton",
        expected: "AMPLTN1111"
    },
    {
        input: "hamblett",
        expected: "AMPLT11111"
    },
    {
        input: "hamblin",
        expected: "AMPLN11111"
    },
    {
        input: "hambly",
        expected: "AMPLA11111"
    },
    {
        input: "hamer",
        expected: "AMA1111111"
    },
    {
        input: "hames",
        expected: "AMS1111111"
    },
    {
        input: "hamiiton",
        expected: "AMTN111111"
    },
    {
        input: "hamill",
        expected: "AMA1111111"
    },
    {
        input: "hamilton",
        expected: "AMTN111111"
    },
    {
        input: "hamish",
        expected: "AMS1111111"
    },
    {
        input: "hamlin",
        expected: "AMLN111111"
    },
    {
        input: "hamlyn",
        expected: "AMLN111111"
    },
    {
        input: "hammer",
        expected: "AMA1111111"
    },
    {
        input: "hammerly",
        expected: "AMLA111111"
    },
    {
        input: "hammill",
        expected: "AMA1111111"
    },
    {
        input: "hammond",
        expected: "AMNT111111"
    },
    {
        input: "hamon",
        expected: "AMN1111111"
    },
    {
        input: "hampton",
        expected: "AMPTN11111"
    },
    {
        input: "hanan",
        expected: "ANN1111111"
    },
    {
        input: "hananeia",
        expected: "ANNA111111"
    },
    {
        input: "hancock",
        expected: "ANKK111111"
    },
    {
        input: "hancox",
        expected: "ANKK111111"
    },
    {
        input: "hand",
        expected: "ANT1111111"
    },
    {
        input: "handforth",
        expected: "ANTFT11111"
    },
    {
        input: "handisides",
        expected: "ANTSTS1111"
    },
    {
        input: "handley",
        expected: "ANTLA11111"
    },
    {
        input: "hands",
        expected: "ANTS111111"
    },
    {
        input: "handscomb",
        expected: "ANTSKM1111"
    },
    {
        input: "handyside",
        expected: "ANTST11111"
    },
    {
        input: "hanenina",
        expected: "ANNNA11111"
    },
    {
        input: "hanger",
        expected: "ANKA111111"
    },
    {
        input: "hanham",
        expected: "ANM1111111"
    },
    {
        input: "hankey",
        expected: "ANKA111111"
    },
    {
        input: "hankins",
        expected: "ANKNS11111"
    },
    {
        input: "hanley",
        expected: "ANLA111111"
    },
    {
        input: "hanlin",
        expected: "ANLN111111"
    },
    {
        input: "hanlon",
        expected: "ANLN111111"
    },
    {
        input: "hanly",
        expected: "ANLA111111"
    },
    {
        input: "hanna",
        expected: "ANA1111111"
    },
    {
        input: "hannagan",
        expected: "ANKN111111"
    },
    {
        input: "hannah",
        expected: "ANA1111111"
    },
    {
        input: "hannan",
        expected: "ANN1111111"
    },
    {
        input: "hannigan",
        expected: "ANKN111111"
    },
    {
        input: "hanning",
        expected: "ANNK111111"
    },
    {
        input: "hannon",
        expected: "ANN1111111"
    },
    {
        input: "hannora",
        expected: "ANRA111111"
    },
    {
        input: "hanon",
        expected: "ANN1111111"
    },
    {
        input: "hanora",
        expected: "ANRA111111"
    },
    {
        input: "hanorah",
        expected: "ANRA111111"
    },
    {
        input: "hanoura",
        expected: "ANRA111111"
    },
    {
        input: "hanrahan",
        expected: "ANRN111111"
    },
    {
        input: "hans",
        expected: "ANS1111111"
    },
    {
        input: "hansbury",
        expected: "ANSPRA1111"
    },
    {
        input: "hansen",
        expected: "ANSN111111"
    },
    {
        input: "hansford",
        expected: "ANSFT11111"
    },
    {
        input: "hansforrl",
        expected: "ANSFA11111"
    },
    {
        input: "hanson",
        expected: "ANSN111111"
    },
    {
        input: "hansson",
        expected: "ANSN111111"
    },
    {
        input: "hanton",
        expected: "ANTN111111"
    },
    {
        input: "hanvey",
        expected: "ANFA111111"
    },
    {
        input: "harace",
        expected: "ARK1111111"
    },
    {
        input: "harah",
        expected: "ARA1111111"
    },
    {
        input: "haran",
        expected: "ARN1111111"
    },
    {
        input: "harbert",
        expected: "APT1111111"
    },
    {
        input: "harborne",
        expected: "APN1111111"
    },
    {
        input: "harborow",
        expected: "APRA111111"
    },
    {
        input: "harbott",
        expected: "APT1111111"
    },
    {
        input: "harbrow",
        expected: "APRA111111"
    },
    {
        input: "hard",
        expected: "AT11111111"
    },
    {
        input: "hardcastle",
        expected: "ATKSTA1111"
    },
    {
        input: "harden",
        expected: "ATN1111111"
    },
    {
        input: "hardey",
        expected: "ATA1111111"
    },
    {
        input: "hardie",
        expected: "ATA1111111"
    },
    {
        input: "harding",
        expected: "ATNK111111"
    },
    {
        input: "hardman",
        expected: "ATMN111111"
    },
    {
        input: "hardoy",
        expected: "ATA1111111"
    },
    {
        input: "hards",
        expected: "ATS1111111"
    },
    {
        input: "hardwick",
        expected: "ATWK111111"
    },
    {
        input: "hardy",
        expected: "ATA1111111"
    },
    {
        input: "hare",
        expected: "AA11111111"
    },
    {
        input: "harford",
        expected: "AFT1111111"
    },
    {
        input: "hargood",
        expected: "AKT1111111"
    },
    {
        input: "hargrave",
        expected: "AKRF111111"
    },
    {
        input: "hargraves",
        expected: "AKRFS11111"
    },
    {
        input: "hargreave",
        expected: "AKRF111111"
    },
    {
        input: "hargreaves",
        expected: "AKRFS11111"
    },
    {
        input: "harion",
        expected: "ARN1111111"
    },
    {
        input: "harker",
        expected: "AKA1111111"
    },
    {
        input: "harkess",
        expected: "AKS1111111"
    },
    {
        input: "harkness",
        expected: "AKNS111111"
    },
    {
        input: "harl",
        expected: "AA11111111"
    },
    {
        input: "harland",
        expected: "ALNT111111"
    },
    {
        input: "harle",
        expected: "AA11111111"
    },
    {
        input: "harley",
        expected: "ALA1111111"
    },
    {
        input: "harliwich",
        expected: "ALWK111111"
    },
    {
        input: "harlold",
        expected: "ALT1111111"
    },
    {
        input: "harlow",
        expected: "ALA1111111"
    },
    {
        input: "harly",
        expected: "ALA1111111"
    },
    {
        input: "harman",
        expected: "AMN1111111"
    },
    {
        input: "harneiss",
        expected: "ANS1111111"
    },
    {
        input: "harness",
        expected: "ANS1111111"
    },
    {
        input: "harney",
        expected: "ANA1111111"
    },
    {
        input: "harold",
        expected: "ART1111111"
    },
    {
        input: "harper",
        expected: "APA1111111"
    },
    {
        input: "harrah",
        expected: "ARA1111111"
    },
    {
        input: "harrap",
        expected: "ARP1111111"
    },
    {
        input: "harraway",
        expected: "ARWA111111"
    },
    {
        input: "harre",
        expected: "AA11111111"
    },
    {
        input: "harrhy",
        expected: "AA11111111"
    },
    {
        input: "harridge",
        expected: "ARK1111111"
    },
    {
        input: "harries",
        expected: "ARS1111111"
    },
    {
        input: "harriet",
        expected: "ART1111111"
    },
    {
        input: "harriett",
        expected: "ART1111111"
    },
    {
        input: "harrietta",
        expected: "ARTA111111"
    },
    {
        input: "harriette",
        expected: "ART1111111"
    },
    {
        input: "harrington",
        expected: "ARNKTN1111"
    },
    {
        input: "harriot",
        expected: "ART1111111"
    },
    {
        input: "harriott",
        expected: "ART1111111"
    },
    {
        input: "harris",
        expected: "ARS1111111"
    },
    {
        input: "harrison",
        expected: "ARSN111111"
    },
    {
        input: "harrisorl",
        expected: "ARSA111111"
    },
    {
        input: "harrod",
        expected: "ART1111111"
    },
    {
        input: "harrold",
        expected: "ART1111111"
    },
    {
        input: "harrop",
        expected: "ARP1111111"
    },
    {
        input: "harrould",
        expected: "ART1111111"
    },
    {
        input: "harrow",
        expected: "ARA1111111"
    },
    {
        input: "harrv",
        expected: "AF11111111"
    },
    {
        input: "harry",
        expected: "ARA1111111"
    },
    {
        input: "hart",
        expected: "AT11111111"
    },
    {
        input: "hartaway",
        expected: "ATWA111111"
    },
    {
        input: "hartha",
        expected: "ATA1111111"
    },
    {
        input: "hartle",
        expected: "ATA1111111"
    },
    {
        input: "hartley",
        expected: "ATLA111111"
    },
    {
        input: "hartman",
        expected: "ATMN111111"
    },
    {
        input: "hartmann",
        expected: "ATMN111111"
    },
    {
        input: "hartstonge",
        expected: "ATSTNK1111"
    },
    {
        input: "harty",
        expected: "ATA1111111"
    },
    {
        input: "harvey",
        expected: "AFA1111111"
    },
    {
        input: "harvie",
        expected: "AFA1111111"
    },
    {
        input: "harwood",
        expected: "AWT1111111"
    },
    {
        input: "haselden",
        expected: "ASTN111111"
    },
    {
        input: "haskell",
        expected: "ASKA111111"
    },
    {
        input: "haskins",
        expected: "ASKNS11111"
    },
    {
        input: "haskoll",
        expected: "ASKA111111"
    },
    {
        input: "haslett",
        expected: "ASLT111111"
    },
    {
        input: "hason",
        expected: "ASN1111111"
    },
    {
        input: "hassall",
        expected: "ASA1111111"
    },
    {
        input: "hassan",
        expected: "ASN1111111"
    },
    {
        input: "hast",
        expected: "AST1111111"
    },
    {
        input: "hastie",
        expected: "ASTA111111"
    },
    {
        input: "hastings",
        expected: "ASTNKS1111"
    },
    {
        input: "hastngs",
        expected: "ASTNKS1111"
    },
    {
        input: "hatcher",
        expected: "AKA1111111"
    },
    {
        input: "hately",
        expected: "ATLA111111"
    },
    {
        input: "hathaway",
        expected: "ATWA111111"
    },
    {
        input: "hatold",
        expected: "ATT1111111"
    },
    {
        input: "hatt",
        expected: "AT11111111"
    },
    {
        input: "hatten",
        expected: "ATN1111111"
    },
    {
        input: "hatton",
        expected: "ATN1111111"
    },
    {
        input: "haub",
        expected: "AP11111111"
    },
    {
        input: "haugh",
        expected: "AA11111111"
    },
    {
        input: "haughton",
        expected: "ATN1111111"
    },
    {
        input: "haurahan",
        expected: "ARN1111111"
    },
    {
        input: "haush",
        expected: "AS11111111"
    },
    {
        input: "havard",
        expected: "AFT1111111"
    },
    {
        input: "havelock",
        expected: "AFLK111111"
    },
    {
        input: "havilah",
        expected: "AFLA111111"
    },
    {
        input: "havill",
        expected: "AFA1111111"
    },
    {
        input: "havilland",
        expected: "AFLNT11111"
    },
    {
        input: "havward",
        expected: "AFWT111111"
    },
    {
        input: "hawes",
        expected: "AWS1111111"
    },
    {
        input: "hawke",
        expected: "AK11111111"
    },
    {
        input: "hawken",
        expected: "AKN1111111"
    },
    {
        input: "hawker",
        expected: "AKA1111111"
    },
    {
        input: "hawkes",
        expected: "AKS1111111"
    },
    {
        input: "hawkhead",
        expected: "AKT1111111"
    },
    {
        input: "hawkine",
        expected: "AKN1111111"
    },
    {
        input: "hawkins",
        expected: "AKNS111111"
    },
    {
        input: "hawkley",
        expected: "AKLA111111"
    },
    {
        input: "hawley",
        expected: "ALA1111111"
    },
    {
        input: "haworth",
        expected: "AWT1111111"
    },
    {
        input: "hawthorn",
        expected: "ATN1111111"
    },
    {
        input: "haxlett",
        expected: "AKLT111111"
    },
    {
        input: "hay",
        expected: "AA11111111"
    },
    {
        input: "haybittle",
        expected: "APTA111111"
    },
    {
        input: "hayden",
        expected: "ATN1111111"
    },
    {
        input: "haydn",
        expected: "ATN1111111"
    },
    {
        input: "haydock",
        expected: "ATK1111111"
    },
    {
        input: "haydon",
        expected: "ATN1111111"
    },
    {
        input: "haye",
        expected: "AA11111111"
    },
    {
        input: "hayes",
        expected: "AS11111111"
    },
    {
        input: "hayman",
        expected: "AMN1111111"
    },
    {
        input: "haymes",
        expected: "AMS1111111"
    },
    {
        input: "hayne",
        expected: "AN11111111"
    },
    {
        input: "haynes",
        expected: "ANS1111111"
    },
    {
        input: "hayr",
        expected: "AA11111111"
    },
    {
        input: "hayward",
        expected: "AWT1111111"
    },
    {
        input: "hazard",
        expected: "AST1111111"
    },
    {
        input: "hazel",
        expected: "ASA1111111"
    },
    {
        input: "hazelwood",
        expected: "ASWT111111"
    },
    {
        input: "hazlett",
        expected: "ASLT111111"
    },
    {
        input: "head",
        expected: "AT11111111"
    },
    {
        input: "headley",
        expected: "ATLA111111"
    },
    {
        input: "heads",
        expected: "ATS1111111"
    },
    {
        input: "heal",
        expected: "AA11111111"
    },
    {
        input: "heald",
        expected: "AT11111111"
    },
    {
        input: "healer",
        expected: "ALA1111111"
    },
    {
        input: "healey",
        expected: "ALA1111111"
    },
    {
        input: "healy",
        expected: "ALA1111111"
    },
    {
        input: "heaney",
        expected: "ANA1111111"
    },
    {
        input: "heaps",
        expected: "APS1111111"
    },
    {
        input: "heard",
        expected: "AT11111111"
    },
    {
        input: "hearile",
        expected: "ARA1111111"
    },
    {
        input: "hearne",
        expected: "AN11111111"
    },
    {
        input: "hearstell",
        expected: "ASTA111111"
    },
    {
        input: "heart",
        expected: "AT11111111"
    },
    {
        input: "hearty",
        expected: "ATA1111111"
    },
    {
        input: "heasley",
        expected: "ASLA111111"
    },
    {
        input: "heasman",
        expected: "ASMN111111"
    },
    {
        input: "heath",
        expected: "AT11111111"
    },
    {
        input: "heathcote",
        expected: "ATKT111111"
    },
    {
        input: "heather",
        expected: "ATA1111111"
    },
    {
        input: "heathman",
        expected: "ATMN111111"
    },
    {
        input: "heatley",
        expected: "ATLA111111"
    },
    {
        input: "heaton",
        expected: "ATN1111111"
    },
    {
        input: "heaven",
        expected: "AFN1111111"
    },
    {
        input: "heaxlewood",
        expected: "AKLWT11111"
    },
    {
        input: "heazelwood",
        expected: "ASWT111111"
    },
    {
        input: "heazlewood",
        expected: "ASLWT11111"
    },
    {
        input: "hebbard",
        expected: "APT1111111"
    },
    {
        input: "hebditch",
        expected: "APTK111111"
    },
    {
        input: "hebert",
        expected: "APT1111111"
    },
    {
        input: "hector",
        expected: "AKTA111111"
    },
    {
        input: "hectorina",
        expected: "AKTRNA1111"
    },
    {
        input: "hedges",
        expected: "AKS1111111"
    },
    {
        input: "hedgman",
        expected: "AKMN111111"
    },
    {
        input: "hedley",
        expected: "ATLA111111"
    },
    {
        input: "hedlges",
        expected: "ATKS111111"
    },
    {
        input: "hedrick",
        expected: "ATRK111111"
    },
    {
        input: "hedwig",
        expected: "ATWK111111"
    },
    {
        input: "heena",
        expected: "ANA1111111"
    },
    {
        input: "heenan",
        expected: "ANN1111111"
    },
    {
        input: "heffernan",
        expected: "AFNN111111"
    },
    {
        input: "heft",
        expected: "AFT1111111"
    },
    {
        input: "hegarty",
        expected: "AKTA111111"
    },
    {
        input: "heggerty",
        expected: "AKTA111111"
    },
    {
        input: "heggie",
        expected: "AKA1111111"
    },
    {
        input: "heileson",
        expected: "ALSN111111"
    },
    {
        input: "heinrich",
        expected: "ANRK111111"
    },
    {
        input: "helan",
        expected: "ALN1111111"
    },
    {
        input: "helder",
        expected: "ATA1111111"
    },
    {
        input: "helean",
        expected: "ALN1111111"
    },
    {
        input: "helell",
        expected: "ALA1111111"
    },
    {
        input: "helen",
        expected: "ALN1111111"
    },
    {
        input: "helena",
        expected: "ALNA111111"
    },
    {
        input: "helene",
        expected: "ALN1111111"
    },
    {
        input: "helier",
        expected: "ALA1111111"
    },
    {
        input: "hella",
        expected: "ALA1111111"
    },
    {
        input: "hellawell",
        expected: "ALWA111111"
    },
    {
        input: "hellen",
        expected: "ALN1111111"
    },
    {
        input: "heller",
        expected: "ALA1111111"
    },
    {
        input: "helleyer",
        expected: "ALA1111111"
    },
    {
        input: "hellier",
        expected: "ALA1111111"
    },
    {
        input: "hellriegel",
        expected: "ARKA111111"
    },
    {
        input: "hellurietta",
        expected: "ALRTA11111"
    },
    {
        input: "hellyer",
        expected: "ALA1111111"
    },
    {
        input: "helm",
        expected: "AM11111111"
    },
    {
        input: "helmore",
        expected: "AMA1111111"
    },
    {
        input: "helms",
        expected: "AMS1111111"
    },
    {
        input: "helson",
        expected: "ASN1111111"
    },
    {
        input: "hely",
        expected: "ALA1111111"
    },
    {
        input: "hemi",
        expected: "AMA1111111"
    },
    {
        input: "hemingway",
        expected: "AMNKWA1111"
    },
    {
        input: "hemmingway",
        expected: "AMNKWA1111"
    },
    {
        input: "hemsley",
        expected: "AMSLA11111"
    },
    {
        input: "henaghan",
        expected: "ANKN111111"
    },
    {
        input: "hende",
        expected: "ANT1111111"
    },
    {
        input: "hendebourck",
        expected: "ANTPK11111"
    },
    {
        input: "henden",
        expected: "ANTN111111"
    },
    {
        input: "henderson",
        expected: "ANTSN11111"
    },
    {
        input: "hendetson",
        expected: "ANTTSN1111"
    },
    {
        input: "hendley",
        expected: "ANTLA11111"
    },
    {
        input: "hendren",
        expected: "ANTRN11111"
    },
    {
        input: "hendrick",
        expected: "ANTRK11111"
    },
    {
        input: "hendry",
        expected: "ANTRA11111"
    },
    {
        input: "hendy",
        expected: "ANTA111111"
    },
    {
        input: "heneghan",
        expected: "ANKN111111"
    },
    {
        input: "henery",
        expected: "ANRA111111"
    },
    {
        input: "heney",
        expected: "ANA1111111"
    },
    {
        input: "henke",
        expected: "ANK1111111"
    },
    {
        input: "henks",
        expected: "ANKS111111"
    },
    {
        input: "henley",
        expected: "ANLA111111"
    },
    {
        input: "henn",
        expected: "AN11111111"
    },
    {
        input: "hennerrietta",
        expected: "ANRTA11111"
    },
    {
        input: "henness",
        expected: "ANS1111111"
    },
    {
        input: "hennessey",
        expected: "ANSA111111"
    },
    {
        input: "hennessy",
        expected: "ANSA111111"
    },
    {
        input: "hennig",
        expected: "ANK1111111"
    },
    {
        input: "henning",
        expected: "ANNK111111"
    },
    {
        input: "henrick",
        expected: "ANRK111111"
    },
    {
        input: "henricus",
        expected: "ANRKS11111"
    },
    {
        input: "henrietta",
        expected: "ANRTA11111"
    },
    {
        input: "henriette",
        expected: "ANRT111111"
    },
    {
        input: "henrv",
        expected: "ANF1111111"
    },
    {
        input: "henry",
        expected: "ANRA111111"
    },
    {
        input: "hensleigh",
        expected: "ANSLA11111"
    },
    {
        input: "hensley",
        expected: "ANSLA11111"
    },
    {
        input: "henton",
        expected: "ANTN111111"
    },
    {
        input: "henty",
        expected: "ANTA111111"
    },
    {
        input: "henwood",
        expected: "ANWT111111"
    },
    {
        input: "hepburn",
        expected: "APN1111111"
    },
    {
        input: "hephzibah",
        expected: "AFSPA11111"
    },
    {
        input: "heppelthwa",
        expected: "APTWA11111"
    },
    {
        input: "heppelthwaite",
        expected: "APTWT11111"
    },
    {
        input: "hera",
        expected: "ARA1111111"
    },
    {
        input: "herbert",
        expected: "APT1111111"
    },
    {
        input: "herbison",
        expected: "APSN111111"
    },
    {
        input: "herbrt",
        expected: "APT1111111"
    },
    {
        input: "hercules",
        expected: "AKLS111111"
    },
    {
        input: "herd",
        expected: "AT11111111"
    },
    {
        input: "herman",
        expected: "AMN1111111"
    },
    {
        input: "hermione",
        expected: "AMN1111111"
    },
    {
        input: "hern",
        expected: "AN11111111"
    },
    {
        input: "heron",
        expected: "ARN1111111"
    },
    {
        input: "herrich",
        expected: "ARK1111111"
    },
    {
        input: "herrick",
        expected: "ARK1111111"
    },
    {
        input: "herring",
        expected: "ARNK111111"
    },
    {
        input: "herriot",
        expected: "ART1111111"
    },
    {
        input: "herry",
        expected: "ARA1111111"
    },
    {
        input: "hersee",
        expected: "ASA1111111"
    },
    {
        input: "hertz",
        expected: "ATS1111111"
    },
    {
        input: "hervey",
        expected: "AFA1111111"
    },
    {
        input: "heselwood",
        expected: "ASWT111111"
    },
    {
        input: "hesford",
        expected: "ASFT111111"
    },
    {
        input: "heslington",
        expected: "ASLNKTN111"
    },
    {
        input: "heslip",
        expected: "ASLP111111"
    },
    {
        input: "heslop",
        expected: "ASLP111111"
    },
    {
        input: "hessell",
        expected: "ASA1111111"
    },
    {
        input: "hessey",
        expected: "ASA1111111"
    },
    {
        input: "hessian",
        expected: "ASN1111111"
    },
    {
        input: "hessie",
        expected: "ASA1111111"
    },
    {
        input: "hester",
        expected: "ASTA111111"
    },
    {
        input: "hestinger",
        expected: "ASTNKA1111"
    },
    {
        input: "hethering",
        expected: "ATRNK11111"
    },
    {
        input: "hetherington",
        expected: "ATRNKTN111"
    },
    {
        input: "hett",
        expected: "AT11111111"
    },
    {
        input: "hettie",
        expected: "ATA1111111"
    },
    {
        input: "hetty",
        expected: "ATA1111111"
    },
    {
        input: "heury",
        expected: "ARA1111111"
    },
    {
        input: "heward",
        expected: "AWT1111111"
    },
    {
        input: "hewat",
        expected: "AWT1111111"
    },
    {
        input: "hewett",
        expected: "AWT1111111"
    },
    {
        input: "hewitson",
        expected: "AWTSN11111"
    },
    {
        input: "hewitt",
        expected: "AWT1111111"
    },
    {
        input: "hewlett",
        expected: "ALT1111111"
    },
    {
        input: "hewton",
        expected: "ATN1111111"
    },
    {
        input: "hey",
        expected: "AA11111111"
    },
    {
        input: "heydon",
        expected: "ATN1111111"
    },
    {
        input: "heyward",
        expected: "AWT1111111"
    },
    {
        input: "hezio",
        expected: "ASA1111111"
    },
    {
        input: "hickey",
        expected: "AKA1111111"
    },
    {
        input: "hickinbot",
        expected: "AKNPT11111"
    },
    {
        input: "hickinbotham",
        expected: "AKNPTM1111"
    },
    {
        input: "hickman",
        expected: "AKMN111111"
    },
    {
        input: "hicks",
        expected: "AKS1111111"
    },
    {
        input: "hickson",
        expected: "AKSN111111"
    },
    {
        input: "hiddle",
        expected: "ATA1111111"
    },
    {
        input: "higgie",
        expected: "AKA1111111"
    },
    {
        input: "higgins",
        expected: "AKNS111111"
    },
    {
        input: "higginson",
        expected: "AKNSN11111"
    },
    {
        input: "higgs",
        expected: "AKS1111111"
    },
    {
        input: "higham",
        expected: "AKM1111111"
    },
    {
        input: "highet",
        expected: "AKT1111111"
    },
    {
        input: "highley",
        expected: "ALA1111111"
    },
    {
        input: "highs",
        expected: "AS11111111"
    },
    {
        input: "higman",
        expected: "AKMN111111"
    },
    {
        input: "hiil",
        expected: "AA11111111"
    },
    {
        input: "hilary",
        expected: "ALRA111111"
    },
    {
        input: "hilda",
        expected: "ATA1111111"
    },
    {
        input: "hildegarde",
        expected: "ATKT111111"
    },
    {
        input: "hill",
        expected: "AA11111111"
    },
    {
        input: "hillary",
        expected: "ALRA111111"
    },
    {
        input: "hilliar",
        expected: "ALA1111111"
    },
    {
        input: "hilliard",
        expected: "ALT1111111"
    },
    {
        input: "hillier",
        expected: "ALA1111111"
    },
    {
        input: "hilliker",
        expected: "ALKA111111"
    },
    {
        input: "hillis",
        expected: "ALS1111111"
    },
    {
        input: "hilllker",
        expected: "AKA1111111"
    },
    {
        input: "hilma",
        expected: "AMA1111111"
    },
    {
        input: "hilslop",
        expected: "ASLP111111"
    },
    {
        input: "hilton",
        expected: "ATN1111111"
    },
    {
        input: "himburg",
        expected: "AMPK111111"
    },
    {
        input: "himmel",
        expected: "AMA1111111"
    },
    {
        input: "hinchcliff",
        expected: "ANKKLF1111"
    },
    {
        input: "hinchcliffe",
        expected: "ANKKLF1111"
    },
    {
        input: "hincheliff",
        expected: "ANKLF11111"
    },
    {
        input: "hincks",
        expected: "ANKS111111"
    },
    {
        input: "hind",
        expected: "ANT1111111"
    },
    {
        input: "hinde",
        expected: "ANT1111111"
    },
    {
        input: "hindes",
        expected: "ANTS111111"
    },
    {
        input: "hindle",
        expected: "ANTA111111"
    },
    {
        input: "hindmarsh",
        expected: "ANTMS11111"
    },
    {
        input: "hinds",
        expected: "ANTS111111"
    },
    {
        input: "hinemoa",
        expected: "ANMA111111"
    },
    {
        input: "hines",
        expected: "ANS1111111"
    },
    {
        input: "hinex",
        expected: "ANK1111111"
    },
    {
        input: "hingley",
        expected: "ANKLA11111"
    },
    {
        input: "hinimoa",
        expected: "ANMA111111"
    },
    {
        input: "hinkley",
        expected: "ANKLA11111"
    },
    {
        input: "hinton",
        expected: "ANTN111111"
    },
    {
        input: "hiorns",
        expected: "ANS1111111"
    },
    {
        input: "hira",
        expected: "ARA1111111"
    },
    {
        input: "hiram",
        expected: "ARM1111111"
    },
    {
        input: "hirt",
        expected: "AT11111111"
    },
    {
        input: "hiscock",
        expected: "ASKK111111"
    },
    {
        input: "hiscoke",
        expected: "ASKK111111"
    },
    {
        input: "hisgrove",
        expected: "ASKRF11111"
    },
    {
        input: "hislol",
        expected: "ASLA111111"
    },
    {
        input: "hislop",
        expected: "ASLP111111"
    },
    {
        input: "hisshion",
        expected: "ASN1111111"
    },
    {
        input: "hit",
        expected: "AT11111111"
    },
    {
        input: "hitchcock",
        expected: "AKKK111111"
    },
    {
        input: "hitchcox",
        expected: "AKKK111111"
    },
    {
        input: "hitchell",
        expected: "AKA1111111"
    },
    {
        input: "hitchon",
        expected: "AKN1111111"
    },
    {
        input: "hits",
        expected: "ATS1111111"
    },
    {
        input: "hitt",
        expected: "AT11111111"
    },
    {
        input: "hoad",
        expected: "AT11111111"
    },
    {
        input: "hoar",
        expected: "AA11111111"
    },
    {
        input: "hoare",
        expected: "AA11111111"
    },
    {
        input: "hoatten",
        expected: "ATN1111111"
    },
    {
        input: "hobart",
        expected: "APT1111111"
    },
    {
        input: "hobbs",
        expected: "APS1111111"
    },
    {
        input: "hobby",
        expected: "APA1111111"
    },
    {
        input: "hobcraft",
        expected: "APKRFT1111"
    },
    {
        input: "hobcroft",
        expected: "APKRFT1111"
    },
    {
        input: "hobday",
        expected: "APTA111111"
    },
    {
        input: "hobert",
        expected: "APT1111111"
    },
    {
        input: "hobsoil",
        expected: "APSA111111"
    },
    {
        input: "hobson",
        expected: "APSN111111"
    },
    {
        input: "hocking",
        expected: "AKNK111111"
    },
    {
        input: "hodgaon",
        expected: "AKN1111111"
    },
    {
        input: "hodge",
        expected: "AK11111111"
    },
    {
        input: "hodges",
        expected: "AKS1111111"
    },
    {
        input: "hodgetts",
        expected: "AKTS111111"
    },
    {
        input: "hodgins",
        expected: "AKNS111111"
    },
    {
        input: "hodgkins",
        expected: "AKNS111111"
    },
    {
        input: "hodgkinson",
        expected: "AKNSN11111"
    },
    {
        input: "hodgsin",
        expected: "AKSN111111"
    },
    {
        input: "hodgson",
        expected: "AKSN111111"
    },
    {
        input: "hodkins",
        expected: "ATKNS11111"
    },
    {
        input: "hodson",
        expected: "ATSN111111"
    },
    {
        input: "hoeking",
        expected: "AKNK111111"
    },
    {
        input: "hoff",
        expected: "AF11111111"
    },
    {
        input: "hoffman",
        expected: "AFMN111111"
    },
    {
        input: "hoffmann",
        expected: "AFMN111111"
    },
    {
        input: "hoffmeister",
        expected: "AFMSTA1111"
    },
    {
        input: "hofland",
        expected: "AFLNT11111"
    },
    {
        input: "hog",
        expected: "AK11111111"
    },
    {
        input: "hogan",
        expected: "AKN1111111"
    },
    {
        input: "hogarth",
        expected: "AKT1111111"
    },
    {
        input: "hogg",
        expected: "AK11111111"
    },
    {
        input: "hogue",
        expected: "AKA1111111"
    },
    {
        input: "hoirns",
        expected: "ANS1111111"
    },
    {
        input: "holander",
        expected: "ALNTA11111"
    },
    {
        input: "holben",
        expected: "APN1111111"
    },
    {
        input: "hold",
        expected: "AT11111111"
    },
    {
        input: "holdaway",
        expected: "ATWA111111"
    },
    {
        input: "holden",
        expected: "ATN1111111"
    },
    {
        input: "holder",
        expected: "ATA1111111"
    },
    {
        input: "holderness",
        expected: "ATNS111111"
    },
    {
        input: "holdgate",
        expected: "AKT1111111"
    },
    {
        input: "holdsworth",
        expected: "ATSWT11111"
    },
    {
        input: "holgate",
        expected: "AKT1111111"
    },
    {
        input: "holiand",
        expected: "ALNT111111"
    },
    {
        input: "hollamby",
        expected: "ALMPA11111"
    },
    {
        input: "holland",
        expected: "ALNT111111"
    },
    {
        input: "hollander",
        expected: "ALNTA11111"
    },
    {
        input: "hollands",
        expected: "ALNTS11111"
    },
    {
        input: "hollebon",
        expected: "ALPN111111"
    },
    {
        input: "holley",
        expected: "ALA1111111"
    },
    {
        input: "hollick",
        expected: "ALK1111111"
    },
    {
        input: "hollingshead",
        expected: "ALNKST1111"
    },
    {
        input: "hollingworth",
        expected: "ALNKWT1111"
    },
    {
        input: "hollner",
        expected: "ANA1111111"
    },
    {
        input: "hollow",
        expected: "ALA1111111"
    },
    {
        input: "holloway",
        expected: "ALWA111111"
    },
    {
        input: "hollows",
        expected: "ALS1111111"
    },
    {
        input: "holly",
        expected: "ALA1111111"
    },
    {
        input: "holman",
        expected: "AMN1111111"
    },
    {
        input: "holmes",
        expected: "AMS1111111"
    },
    {
        input: "holmes-libbis",
        expected: "AMSLPS1111"
    },
    {
        input: "holmess",
        expected: "AMS1111111"
    },
    {
        input: "holroyd",
        expected: "ART1111111"
    },
    {
        input: "holst",
        expected: "AST1111111"
    },
    {
        input: "holsted",
        expected: "ASTT111111"
    },
    {
        input: "holsten",
        expected: "ASTN111111"
    },
    {
        input: "holt",
        expected: "AT11111111"
    },
    {
        input: "homan",
        expected: "AMN1111111"
    },
    {
        input: "home",
        expected: "AM11111111"
    },
    {
        input: "homer",
        expected: "AMA1111111"
    },
    {
        input: "homfray",
        expected: "AMFRA11111"
    },
    {
        input: "honer",
        expected: "ANA1111111"
    },
    {
        input: "honeybone",
        expected: "ANPN111111"
    },
    {
        input: "honeywood",
        expected: "ANWT111111"
    },
    {
        input: "honner",
        expected: "ANA1111111"
    },
    {
        input: "honor",
        expected: "ANA1111111"
    },
    {
        input: "honora",
        expected: "ANRA111111"
    },
    {
        input: "honoria",
        expected: "ANRA111111"
    },
    {
        input: "honriotte",
        expected: "ANRT111111"
    },
    {
        input: "hoochoo",
        expected: "AKA1111111"
    },
    {
        input: "hood",
        expected: "AT11111111"
    },
    {
        input: "hoogee",
        expected: "AKA1111111"
    },
    {
        input: "hook",
        expected: "AK11111111"
    },
    {
        input: "hooker",
        expected: "AKA1111111"
    },
    {
        input: "hoole",
        expected: "AA11111111"
    },
    {
        input: "hooley",
        expected: "ALA1111111"
    },
    {
        input: "hooper",
        expected: "APA1111111"
    },
    {
        input: "hopcraft",
        expected: "APKRFT1111"
    },
    {
        input: "hope",
        expected: "AP11111111"
    },
    {
        input: "hopewell",
        expected: "APWA111111"
    },
    {
        input: "hopgood",
        expected: "APKT111111"
    },
    {
        input: "hopkins",
        expected: "APKNS11111"
    },
    {
        input: "hopkinson",
        expected: "APKNSN1111"
    },
    {
        input: "hopkirk",
        expected: "APKK111111"
    },
    {
        input: "hopper",
        expected: "APA1111111"
    },
    {
        input: "hopwood",
        expected: "APWT111111"
    },
    {
        input: "horace",
        expected: "ARK1111111"
    },
    {
        input: "horan",
        expected: "ARN1111111"
    },
    {
        input: "horatia",
        expected: "ARSA111111"
    },
    {
        input: "horatio",
        expected: "ARSA111111"
    },
    {
        input: "horatius",
        expected: "ARTS111111"
    },
    {
        input: "hordern",
        expected: "ATN1111111"
    },
    {
        input: "hore",
        expected: "AA11111111"
    },
    {
        input: "hormann",
        expected: "AMN1111111"
    },
    {
        input: "horn",
        expected: "AN11111111"
    },
    {
        input: "hornal",
        expected: "ANA1111111"
    },
    {
        input: "hornby",
        expected: "ANPA111111"
    },
    {
        input: "horncastle",
        expected: "ANKSTA1111"
    },
    {
        input: "horncy",
        expected: "ANSA111111"
    },
    {
        input: "horne",
        expected: "AN11111111"
    },
    {
        input: "hornell",
        expected: "ANA1111111"
    },
    {
        input: "horner",
        expected: "ANA1111111"
    },
    {
        input: "horniblow",
        expected: "ANPLA11111"
    },
    {
        input: "hornsby",
        expected: "ANSPA11111"
    },
    {
        input: "horris",
        expected: "ARS1111111"
    },
    {
        input: "horrobin",
        expected: "ARPN111111"
    },
    {
        input: "horsburg",
        expected: "ASPK111111"
    },
    {
        input: "horsburgh",
        expected: "ASPA111111"
    },
    {
        input: "horsecroft",
        expected: "ASKRFT1111"
    },
    {
        input: "horsham",
        expected: "ASM1111111"
    },
    {
        input: "horsman",
        expected: "ASMN111111"
    },
    {
        input: "hortense",
        expected: "ATNS111111"
    },
    {
        input: "hortle",
        expected: "ATA1111111"
    },
    {
        input: "horton",
        expected: "ATN1111111"
    },
    {
        input: "horwood",
        expected: "AWT1111111"
    },
    {
        input: "hosdell",
        expected: "ASTA111111"
    },
    {
        input: "hosee",
        expected: "ASA1111111"
    },
    {
        input: "hoseit",
        expected: "AST1111111"
    },
    {
        input: "hosie",
        expected: "ASA1111111"
    },
    {
        input: "hoskin",
        expected: "ASKN111111"
    },
    {
        input: "hosking",
        expected: "ASKNK11111"
    },
    {
        input: "hoskins",
        expected: "ASKNS11111"
    },
    {
        input: "hossack",
        expected: "ASK1111111"
    },
    {
        input: "hot",
        expected: "AT11111111"
    },
    {
        input: "hotop",
        expected: "ATP1111111"
    },
    {
        input: "hotton",
        expected: "ATN1111111"
    },
    {
        input: "houghton",
        expected: "ATN1111111"
    },
    {
        input: "houlahan",
        expected: "ALN1111111"
    },
    {
        input: "hould",
        expected: "AT11111111"
    },
    {
        input: "houliston",
        expected: "ALSTN11111"
    },
    {
        input: "houlston",
        expected: "ASTN111111"
    },
    {
        input: "houston",
        expected: "ASTN111111"
    },
    {
        input: "how",
        expected: "AA11111111"
    },
    {
        input: "howard",
        expected: "AWT1111111"
    },
    {
        input: "howarth",
        expected: "AWT1111111"
    },
    {
        input: "howat",
        expected: "AWT1111111"
    },
    {
        input: "howatson",
        expected: "AWTSN11111"
    },
    {
        input: "howden",
        expected: "ATN1111111"
    },
    {
        input: "howe",
        expected: "AA11111111"
    },
    {
        input: "howejohns",
        expected: "AWNS111111"
    },
    {
        input: "howell",
        expected: "AWA1111111"
    },
    {
        input: "howes",
        expected: "AWS1111111"
    },
    {
        input: "howie",
        expected: "AWA1111111"
    },
    {
        input: "howison",
        expected: "AWSN111111"
    },
    {
        input: "howitt",
        expected: "AWT1111111"
    },
    {
        input: "howlett",
        expected: "ALT1111111"
    },
    {
        input: "howley",
        expected: "ALA1111111"
    },
    {
        input: "howman",
        expected: "AMN1111111"
    },
    {
        input: "howorth",
        expected: "AWT1111111"
    },
    {
        input: "howrth",
        expected: "AT11111111"
    },
    {
        input: "hows",
        expected: "AS11111111"
    },
    {
        input: "hoy",
        expected: "AA11111111"
    },
    {
        input: "hoyne",
        expected: "AN11111111"
    },
    {
        input: "hua",
        expected: "AA11111111"
    },
    {
        input: "huband",
        expected: "APNT111111"
    },
    {
        input: "hubbard",
        expected: "APT1111111"
    },
    {
        input: "hubble",
        expected: "APA1111111"
    },
    {
        input: "hubert",
        expected: "APT1111111"
    },
    {
        input: "hucker",
        expected: "AKA1111111"
    },
    {
        input: "hucklebridge",
        expected: "AKLPRK1111"
    },
    {
        input: "hudd",
        expected: "AT11111111"
    },
    {
        input: "huddleston",
        expected: "ATLSTN1111"
    },
    {
        input: "huddlestone",
        expected: "ATLSTN1111"
    },
    {
        input: "hudson",
        expected: "ATSN111111"
    },
    {
        input: "hugget",
        expected: "AKT1111111"
    },
    {
        input: "huggett",
        expected: "AKT1111111"
    },
    {
        input: "huggins",
        expected: "AKNS111111"
    },
    {
        input: "hugh",
        expected: "AA11111111"
    },
    {
        input: "hughan",
        expected: "AKN1111111"
    },
    {
        input: "hughes",
        expected: "AKS1111111"
    },
    {
        input: "hughina",
        expected: "AKNA111111"
    },
    {
        input: "hughson",
        expected: "ASN1111111"
    },
    {
        input: "huh",
        expected: "AA11111111"
    },
    {
        input: "huia",
        expected: "AA11111111"
    },
    {
        input: "hulands",
        expected: "ALNTS11111"
    },
    {
        input: "hulme",
        expected: "AM11111111"
    },
    {
        input: "hume",
        expected: "AM11111111"
    },
    {
        input: "humphrey",
        expected: "AMFRA11111"
    },
    {
        input: "humphreys",
        expected: "AMFRS11111"
    },
    {
        input: "humphries",
        expected: "AMFRS11111"
    },
    {
        input: "hungerford",
        expected: "ANKFT11111"
    },
    {
        input: "hunker",
        expected: "ANKA111111"
    },
    {
        input: "hunrter",
        expected: "ANTA111111"
    },
    {
        input: "hunry",
        expected: "ANRA111111"
    },
    {
        input: "hunt",
        expected: "ANT1111111"
    },
    {
        input: "hunter",
        expected: "ANTA111111"
    },
    {
        input: "huntley",
        expected: "ANTLA11111"
    },
    {
        input: "hurd",
        expected: "AT11111111"
    },
    {
        input: "hurdley",
        expected: "ATLA111111"
    },
    {
        input: "hurley",
        expected: "ALA1111111"
    },
    {
        input: "hurlson",
        expected: "ASN1111111"
    },
    {
        input: "hurndell",
        expected: "ANTA111111"
    },
    {
        input: "huron",
        expected: "ARN1111111"
    },
    {
        input: "hurrell",
        expected: "ARA1111111"
    },
    {
        input: "hurring",
        expected: "ARNK111111"
    },
    {
        input: "hurst",
        expected: "AST1111111"
    },
    {
        input: "hurt",
        expected: "AT11111111"
    },
    {
        input: "husband",
        expected: "ASPNT11111"
    },
    {
        input: "hussey",
        expected: "ASA1111111"
    },
    {
        input: "huston",
        expected: "ASTN111111"
    },
    {
        input: "hutcheon",
        expected: "AKN1111111"
    },
    {
        input: "hutcheson",
        expected: "AKSN111111"
    },
    {
        input: "hutchings",
        expected: "AKNKS11111"
    },
    {
        input: "hutchins",
        expected: "AKNS111111"
    },
    {
        input: "hutchinson",
        expected: "AKNSN11111"
    },
    {
        input: "hutchison",
        expected: "AKSN111111"
    },
    {
        input: "huts",
        expected: "ATS1111111"
    },
    {
        input: "hutt",
        expected: "AT11111111"
    },
    {
        input: "hutton",
        expected: "ATN1111111"
    },
    {
        input: "huxtable",
        expected: "AKTPA11111"
    },
    {
        input: "hvslop",
        expected: "AFSLP11111"
    },
    {
        input: "hy",
        expected: "AA11111111"
    },
    {
        input: "hyacinth",
        expected: "ASNT111111"
    },
    {
        input: "hyde",
        expected: "AT11111111"
    },
    {
        input: "hyde harris",
        expected: "ATRS111111"
    },
    {
        input: "hyde-harris",
        expected: "ATRS111111"
    },
    {
        input: "hyder",
        expected: "ATA1111111"
    },
    {
        input: "hydes",
        expected: "ATS1111111"
    },
    {
        input: "hyland",
        expected: "ALNT111111"
    },
    {
        input: "hylnen",
        expected: "ANN1111111"
    },
    {
        input: "hylton",
        expected: "ATN1111111"
    },
    {
        input: "hyman",
        expected: "AMN1111111"
    },
    {
        input: "hymen",
        expected: "AMN1111111"
    },
    {
        input: "hyndman",
        expected: "ANTMN11111"
    },
    {
        input: "hynes",
        expected: "ANS1111111"
    },
    {
        input: "hynet",
        expected: "ANT1111111"
    },
    {
        input: "hypes",
        expected: "APS1111111"
    },
    {
        input: "hyslop",
        expected: "ASLP111111"
    },
    {
        input: "iaing",
        expected: "ANK1111111"
    },
    {
        input: "ian",
        expected: "AN11111111"
    },
    {
        input: "ianthe",
        expected: "ANT1111111"
    },
    {
        input: "iary",
        expected: "ARA1111111"
    },
    {
        input: "ibbetson",
        expected: "APTSN11111"
    },
    {
        input: "ibbotson",
        expected: "APTSN11111"
    },
    {
        input: "ida",
        expected: "ATA1111111"
    },
    {
        input: "idean",
        expected: "ATN1111111"
    },
    {
        input: "idelia",
        expected: "ATLA111111"
    },
    {
        input: "idiens",
        expected: "ATNS111111"
    },
    {
        input: "idour",
        expected: "ATA1111111"
    },
    {
        input: "ieslie",
        expected: "ASLA111111"
    },
    {
        input: "iggo",
        expected: "AKA1111111"
    },
    {
        input: "iirederick",
        expected: "ARTRK11111"
    },
    {
        input: "ilar",
        expected: "ALA1111111"
    },
    {
        input: "ilena",
        expected: "ALNA111111"
    },
    {
        input: "iles",
        expected: "ALS1111111"
    },
    {
        input: "illes",
        expected: "ALS1111111"
    },
    {
        input: "illingworth",
        expected: "ALNKWT1111"
    },
    {
        input: "ilma",
        expected: "AMA1111111"
    },
    {
        input: "ima",
        expected: "AMA1111111"
    },
    {
        input: "imelda",
        expected: "AMTA111111"
    },
    {
        input: "immaculate",
        expected: "AMKLT11111"
    },
    {
        input: "imrie",
        expected: "AMRA111111"
    },
    {
        input: "ina",
        expected: "ANA1111111"
    },
    {
        input: "ince",
        expected: "ANK1111111"
    },
    {
        input: "incrocci",
        expected: "ANKRKSA111"
    },
    {
        input: "inder",
        expected: "ANTA111111"
    },
    {
        input: "ineawa",
        expected: "ANWA111111"
    },
    {
        input: "inez",
        expected: "ANS1111111"
    },
    {
        input: "ingle",
        expected: "ANKA111111"
    },
    {
        input: "ingles",
        expected: "ANKLS11111"
    },
    {
        input: "inglis",
        expected: "ANKLS11111"
    },
    {
        input: "ingo",
        expected: "ANKA111111"
    },
    {
        input: "ingram",
        expected: "ANKRM11111"
    },
    {
        input: "ings",
        expected: "ANKS111111"
    },
    {
        input: "ingstolle",
        expected: "ANKSTA1111"
    },
    {
        input: "ingstone",
        expected: "ANKSTN1111"
    },
    {
        input: "innes",
        expected: "ANS1111111"
    },
    {
        input: "innis",
        expected: "ANS1111111"
    },
    {
        input: "inram",
        expected: "ANRM111111"
    },
    {
        input: "instone",
        expected: "ANSTN11111"
    },
    {
        input: "inward",
        expected: "ANWT111111"
    },
    {
        input: "inwood",
        expected: "ANWT111111"
    },
    {
        input: "ion",
        expected: "AN11111111"
    },
    {
        input: "iona",
        expected: "ANA1111111"
    },
    {
        input: "iones",
        expected: "ANS1111111"
    },
    {
        input: "ira",
        expected: "ARA1111111"
    },
    {
        input: "ireland",
        expected: "ARLNT11111"
    },
    {
        input: "irene",
        expected: "ARN1111111"
    },
    {
        input: "irine",
        expected: "ARN1111111"
    },
    {
        input: "iris",
        expected: "ARS1111111"
    },
    {
        input: "irma",
        expected: "AMA1111111"
    },
    {
        input: "ironside",
        expected: "ARNST11111"
    },
    {
        input: "irvine",
        expected: "AFN1111111"
    },
    {
        input: "irving",
        expected: "AFNK111111"
    },
    {
        input: "irwin",
        expected: "AWN1111111"
    },
    {
        input: "isa",
        expected: "ASA1111111"
    },
    {
        input: "isaac",
        expected: "ASK1111111"
    },
    {
        input: "isaacs",
        expected: "ASKS111111"
    },
    {
        input: "isaae",
        expected: "ASA1111111"
    },
    {
        input: "isabel",
        expected: "ASPA111111"
    },
    {
        input: "isabela",
        expected: "ASPLA11111"
    },
    {
        input: "isabell",
        expected: "ASPA111111"
    },
    {
        input: "isabella",
        expected: "ASPLA11111"
    },
    {
        input: "isabelle",
        expected: "ASPA111111"
    },
    {
        input: "isadore",
        expected: "ASTA111111"
    },
    {
        input: "isaiah",
        expected: "ASA1111111"
    },
    {
        input: "isalella",
        expected: "ASLLA11111"
    },
    {
        input: "isbella",
        expected: "ASPLA11111"
    },
    {
        input: "isbister",
        expected: "ASPSTA1111"
    },
    {
        input: "isdale",
        expected: "ASTA111111"
    },
    {
        input: "ishmael",
        expected: "ASMA111111"
    },
    {
        input: "isibelle",
        expected: "ASPA111111"
    },
    {
        input: "isita",
        expected: "ASTA111111"
    },
    {
        input: "isitt",
        expected: "AST1111111"
    },
    {
        input: "isla",
        expected: "ASLA111111"
    },
    {
        input: "islay",
        expected: "ASLA111111"
    },
    {
        input: "islip",
        expected: "ASLP111111"
    },
    {
        input: "ismay",
        expected: "ASMA111111"
    },
    {
        input: "ismene",
        expected: "ASMN111111"
    },
    {
        input: "isobel",
        expected: "ASPA111111"
    },
    {
        input: "isobella",
        expected: "ASPLA11111"
    },
    {
        input: "isola",
        expected: "ASLA111111"
    },
    {
        input: "israel",
        expected: "ASRA111111"
    },
    {
        input: "isteed",
        expected: "ASTT111111"
    },
    {
        input: "it",
        expected: "AT11111111"
    },
    {
        input: "iton",
        expected: "ATN1111111"
    },
    {
        input: "iva",
        expected: "AFA1111111"
    },
    {
        input: "ivan",
        expected: "AFN1111111"
    },
    {
        input: "ives",
        expected: "AFS1111111"
    },
    {
        input: "ivie",
        expected: "AFA1111111"
    },
    {
        input: "ivimev",
        expected: "AFMF111111"
    },
    {
        input: "ivimey",
        expected: "AFMA111111"
    },
    {
        input: "ivine",
        expected: "AFN1111111"
    },
    {
        input: "ivo",
        expected: "AFA1111111"
    },
    {
        input: "ivon",
        expected: "AFN1111111"
    },
    {
        input: "ivor",
        expected: "AFA1111111"
    },
    {
        input: "ivory",
        expected: "AFRA111111"
    },
    {
        input: "ivy",
        expected: "AFA1111111"
    },
    {
        input: "iza",
        expected: "ASA1111111"
    },
    {
        input: "j",
        expected: "A111111111"
    },
    {
        input: "ja1es",
        expected: "YS11111111"
    },
    {
        input: "jaap",
        expected: "YP11111111"
    },
    {
        input: "jabez",
        expected: "YPS1111111"
    },
    {
        input: "jack",
        expected: "YK11111111"
    },
    {
        input: "jackison",
        expected: "YKSN111111"
    },
    {
        input: "jacksoh",
        expected: "YKSA111111"
    },
    {
        input: "jackson",
        expected: "YKSN111111"
    },
    {
        input: "jackways",
        expected: "YKWS111111"
    },
    {
        input: "jacl",
        expected: "YKA1111111"
    },
    {
        input: "jacob",
        expected: "YKP1111111"
    },
    {
        input: "jacobina",
        expected: "YKPNA11111"
    },
    {
        input: "jacobs",
        expected: "YKPS111111"
    },
    {
        input: "jacobsen",
        expected: "YKPSN11111"
    },
    {
        input: "jacobson",
        expected: "YKPSN11111"
    },
    {
        input: "jacques",
        expected: "YKS1111111"
    },
    {
        input: "jacues",
        expected: "YKS1111111"
    },
    {
        input: "jager",
        expected: "YKA1111111"
    },
    {
        input: "jago",
        expected: "YKA1111111"
    },
    {
        input: "jaicobs",
        expected: "YKPS111111"
    },
    {
        input: "jaimes",
        expected: "YMS1111111"
    },
    {
        input: "jake",
        expected: "YK11111111"
    },
    {
        input: "jam",
        expected: "YM11111111"
    },
    {
        input: "jamcs",
        expected: "YMKS111111"
    },
    {
        input: "jame",
        expected: "YM11111111"
    },
    {
        input: "jamee",
        expected: "YMA1111111"
    },
    {
        input: "james",
        expected: "YMS1111111"
    },
    {
        input: "jamesalbany",
        expected: "YMSPNA1111"
    },
    {
        input: "jamesina",
        expected: "YMSNA11111"
    },
    {
        input: "jamesines",
        expected: "YMSNS11111"
    },
    {
        input: "jameson",
        expected: "YMSN111111"
    },
    {
        input: "jamies",
        expected: "YMS1111111"
    },
    {
        input: "jamieson",
        expected: "YMSN111111"
    },
    {
        input: "jamison",
        expected: "YMSN111111"
    },
    {
        input: "jamos",
        expected: "YMS1111111"
    },
    {
        input: "janbe",
        expected: "YNP1111111"
    },
    {
        input: "jane",
        expected: "YN11111111"
    },
    {
        input: "janes",
        expected: "YNS1111111"
    },
    {
        input: "janet",
        expected: "YNT1111111"
    },
    {
        input: "janetta",
        expected: "YNTA111111"
    },
    {
        input: "janette",
        expected: "YNT1111111"
    },
    {
        input: "janie",
        expected: "YNA1111111"
    },
    {
        input: "janies",
        expected: "YNS1111111"
    },
    {
        input: "janowsky",
        expected: "YNSKA11111"
    },
    {
        input: "jansen",
        expected: "YNSN111111"
    },
    {
        input: "janson",
        expected: "YNSN111111"
    },
    {
        input: "janthe",
        expected: "YNT1111111"
    },
    {
        input: "jaokson",
        expected: "YKSN111111"
    },
    {
        input: "japp",
        expected: "YP11111111"
    },
    {
        input: "jaquiery",
        expected: "YKRA111111"
    },
    {
        input: "jarden",
        expected: "YTN1111111"
    },
    {
        input: "jardine",
        expected: "YTN1111111"
    },
    {
        input: "jarlies",
        expected: "YLS1111111"
    },
    {
        input: "jarman",
        expected: "YMN1111111"
    },
    {
        input: "jarmes",
        expected: "YMS1111111"
    },
    {
        input: "jarnes",
        expected: "YNS1111111"
    },
    {
        input: "jarrtes",
        expected: "YTS1111111"
    },
    {
        input: "jarves",
        expected: "YFS1111111"
    },
    {
        input: "jarvie",
        expected: "YFA1111111"
    },
    {
        input: "jarvis",
        expected: "YFS1111111"
    },
    {
        input: "jas",
        expected: "YS11111111"
    },
    {
        input: "jason",
        expected: "YSN1111111"
    },
    {
        input: "jaspeh",
        expected: "YSPA111111"
    },
    {
        input: "jasper",
        expected: "YSPA111111"
    },
    {
        input: "jean",
        expected: "YN11111111"
    },
    {
        input: "jeane",
        expected: "YN11111111"
    },
    {
        input: "jeanet",
        expected: "YNT1111111"
    },
    {
        input: "jeanetta",
        expected: "YNTA111111"
    },
    {
        input: "jeanette",
        expected: "YNT1111111"
    },
    {
        input: "jeanie",
        expected: "YNA1111111"
    },
    {
        input: "jeanne",
        expected: "YN11111111"
    },
    {
        input: "jeannetta",
        expected: "YNTA111111"
    },
    {
        input: "jeannette",
        expected: "YNT1111111"
    },
    {
        input: "jeannie",
        expected: "YNA1111111"
    },
    {
        input: "jeannings",
        expected: "YNNKS11111"
    },
    {
        input: "jeavons",
        expected: "YFNS111111"
    },
    {
        input: "jeesie",
        expected: "YSA1111111"
    },
    {
        input: "jefcoate",
        expected: "YFKT111111"
    },
    {
        input: "jefferson",
        expected: "YFSN111111"
    },
    {
        input: "jeffery",
        expected: "YFRA111111"
    },
    {
        input: "jeffrey",
        expected: "YFRA111111"
    },
    {
        input: "jeffreys",
        expected: "YFRS111111"
    },
    {
        input: "jeffries",
        expected: "YFRS111111"
    },
    {
        input: "jeffs",
        expected: "YFS1111111"
    },
    {
        input: "jefierson",
        expected: "YFSN111111"
    },
    {
        input: "jefterson",
        expected: "YFTSN11111"
    },
    {
        input: "jelley",
        expected: "YLA1111111"
    },
    {
        input: "jells",
        expected: "YS11111111"
    },
    {
        input: "jelly",
        expected: "YLA1111111"
    },
    {
        input: "jemima",
        expected: "YMMA111111"
    },
    {
        input: "jemina",
        expected: "YMNA111111"
    },
    {
        input: "jen",
        expected: "YN11111111"
    },
    {
        input: "jenetta",
        expected: "YNTA111111"
    },
    {
        input: "jenette",
        expected: "YNT1111111"
    },
    {
        input: "jenkin",
        expected: "YNKN111111"
    },
    {
        input: "jenkins",
        expected: "YNKNS11111"
    },
    {
        input: "jenks",
        expected: "YNKS111111"
    },
    {
        input: "jenn",
        expected: "YN11111111"
    },
    {
        input: "jenner",
        expected: "YNA1111111"
    },
    {
        input: "jennet",
        expected: "YNT1111111"
    },
    {
        input: "jennie",
        expected: "YNA1111111"
    },
    {
        input: "jennings",
        expected: "YNNKS11111"
    },
    {
        input: "jenny",
        expected: "YNA1111111"
    },
    {
        input: "jens",
        expected: "YNS1111111"
    },
    {
        input: "jensen",
        expected: "YNSN111111"
    },
    {
        input: "jenson",
        expected: "YNSN111111"
    },
    {
        input: "jenvey",
        expected: "YNFA111111"
    },
    {
        input: "jeoffrey",
        expected: "YFRA111111"
    },
    {
        input: "jephson",
        expected: "YFSN111111"
    },
    {
        input: "jephthah",
        expected: "YFTA111111"
    },
    {
        input: "jepson",
        expected: "YPSN111111"
    },
    {
        input: "jeremiah",
        expected: "YRMA111111"
    },
    {
        input: "jerkins",
        expected: "YKNS111111"
    },
    {
        input: "jervis",
        expected: "YFS1111111"
    },
    {
        input: "jeseie",
        expected: "YSA1111111"
    },
    {
        input: "jesoph",
        expected: "YSF1111111"
    },
    {
        input: "jess",
        expected: "YS11111111"
    },
    {
        input: "jessa",
        expected: "YSA1111111"
    },
    {
        input: "jesse",
        expected: "YS11111111"
    },
    {
        input: "jessep",
        expected: "YSP1111111"
    },
    {
        input: "jessica",
        expected: "YSKA111111"
    },
    {
        input: "jessie",
        expected: "YSA1111111"
    },
    {
        input: "jessy",
        expected: "YSA1111111"
    },
    {
        input: "jethro",
        expected: "YTRA111111"
    },
    {
        input: "jewel",
        expected: "YWA1111111"
    },
    {
        input: "jewett",
        expected: "YWT1111111"
    },
    {
        input: "jewiss",
        expected: "YWS1111111"
    },
    {
        input: "jillian",
        expected: "YLN1111111"
    },
    {
        input: "jim",
        expected: "YM11111111"
    },
    {
        input: "jinnie",
        expected: "YNA1111111"
    },
    {
        input: "jlardey",
        expected: "ALTA111111"
    },
    {
        input: "joan",
        expected: "YN11111111"
    },
    {
        input: "joann",
        expected: "YN11111111"
    },
    {
        input: "joanna",
        expected: "YNA1111111"
    },
    {
        input: "joannie",
        expected: "YNA1111111"
    },
    {
        input: "job",
        expected: "YP11111111"
    },
    {
        input: "jobberns",
        expected: "YPNS111111"
    },
    {
        input: "jober",
        expected: "YPA1111111"
    },
    {
        input: "joblin",
        expected: "YPLN111111"
    },
    {
        input: "jocelyn",
        expected: "YSLN111111"
    },
    {
        input: "joe",
        expected: "YA11111111"
    },
    {
        input: "joel",
        expected: "YA11111111"
    },
    {
        input: "joffre",
        expected: "YFA1111111"
    },
    {
        input: "johan",
        expected: "YN11111111"
    },
    {
        input: "johann",
        expected: "YN11111111"
    },
    {
        input: "johanna",
        expected: "YNA1111111"
    },
    {
        input: "johannah",
        expected: "YNA1111111"
    },
    {
        input: "johannes",
        expected: "YNS1111111"
    },
    {
        input: "johansen",
        expected: "YNSN111111"
    },
    {
        input: "johansson",
        expected: "YNSN111111"
    },
    {
        input: "johh",
        expected: "YA11111111"
    },
    {
        input: "johhston",
        expected: "YSTN111111"
    },
    {
        input: "john",
        expected: "YN11111111"
    },
    {
        input: "johnann",
        expected: "YNN1111111"
    },
    {
        input: "johnanna",
        expected: "YNNA111111"
    },
    {
        input: "johnina",
        expected: "YNNA111111"
    },
    {
        input: "johnpatrick",
        expected: "YNPTRK1111"
    },
    {
        input: "johns",
        expected: "YNS1111111"
    },
    {
        input: "johnsen",
        expected: "YNSN111111"
    },
    {
        input: "johnson",
        expected: "YNSN111111"
    },
    {
        input: "johnston",
        expected: "YNSTN11111"
    },
    {
        input: "johnstone",
        expected: "YNSTN11111"
    },
    {
        input: "johnthomas",
        expected: "YNTMS11111"
    },
    {
        input: "johnwilliam",
        expected: "YNWLM11111"
    },
    {
        input: "johr",
        expected: "YA11111111"
    },
    {
        input: "johrl",
        expected: "YA11111111"
    },
    {
        input: "johu",
        expected: "YA11111111"
    },
    {
        input: "joiln",
        expected: "YN11111111"
    },
    {
        input: "jollanna",
        expected: "YLNA111111"
    },
    {
        input: "jolly",
        expected: "YLA1111111"
    },
    {
        input: "jolm",
        expected: "YM11111111"
    },
    {
        input: "jolmson",
        expected: "YMSN111111"
    },
    {
        input: "joln",
        expected: "YN11111111"
    },
    {
        input: "jon",
        expected: "YN11111111"
    },
    {
        input: "jonah",
        expected: "YNA1111111"
    },
    {
        input: "jonas",
        expected: "YNS1111111"
    },
    {
        input: "jonathan",
        expected: "YNTN111111"
    },
    {
        input: "joncs",
        expected: "YNKS111111"
    },
    {
        input: "jondon",
        expected: "YNTN111111"
    },
    {
        input: "jones",
        expected: "YNS1111111"
    },
    {
        input: "jones-neilson",
        expected: "YNSNSN1111"
    },
    {
        input: "jonl",
        expected: "YNA1111111"
    },
    {
        input: "jonn",
        expected: "YN11111111"
    },
    {
        input: "jopp",
        expected: "YP11111111"
    },
    {
        input: "jopsen",
        expected: "YPSN111111"
    },
    {
        input: "jopson",
        expected: "YPSN111111"
    },
    {
        input: "jordan",
        expected: "YTN1111111"
    },
    {
        input: "jorgen",
        expected: "YKN1111111"
    },
    {
        input: "jory",
        expected: "YRA1111111"
    },
    {
        input: "josep",
        expected: "YSP1111111"
    },
    {
        input: "joseph",
        expected: "YSF1111111"
    },
    {
        input: "josephgeorge",
        expected: "YSFKK11111"
    },
    {
        input: "josephia",
        expected: "YSFA111111"
    },
    {
        input: "josephine",
        expected: "YSFN111111"
    },
    {
        input: "josephson",
        expected: "YSFSN11111"
    },
    {
        input: "josh",
        expected: "YS11111111"
    },
    {
        input: "joshua",
        expected: "YSA1111111"
    },
    {
        input: "josiah",
        expected: "YSA1111111"
    },
    {
        input: "josie",
        expected: "YSA1111111"
    },
    {
        input: "josieph",
        expected: "YSF1111111"
    },
    {
        input: "josland",
        expected: "YSLNT11111"
    },
    {
        input: "joslin",
        expected: "YSLN111111"
    },
    {
        input: "josoph",
        expected: "YSF1111111"
    },
    {
        input: "jospeh",
        expected: "YSPA111111"
    },
    {
        input: "joss",
        expected: "YS11111111"
    },
    {
        input: "joues",
        expected: "YS11111111"
    },
    {
        input: "joughin",
        expected: "YKN1111111"
    },
    {
        input: "jovce",
        expected: "YFK1111111"
    },
    {
        input: "jowey",
        expected: "YWA1111111"
    },
    {
        input: "jowitt",
        expected: "YWT1111111"
    },
    {
        input: "jowsey",
        expected: "YSA1111111"
    },
    {
        input: "jowsy",
        expected: "YSA1111111"
    },
    {
        input: "joy",
        expected: "YA11111111"
    },
    {
        input: "joyce",
        expected: "YK11111111"
    },
    {
        input: "joyee",
        expected: "YA11111111"
    },
    {
        input: "joyner",
        expected: "YNA1111111"
    },
    {
        input: "joynt",
        expected: "YNT1111111"
    },
    {
        input: "juanita",
        expected: "YNTA111111"
    },
    {
        input: "judd",
        expected: "YT11111111"
    },
    {
        input: "judson",
        expected: "YTSN111111"
    },
    {
        input: "jukes",
        expected: "YKS1111111"
    },
    {
        input: "jules",
        expected: "YLS1111111"
    },
    {
        input: "julia",
        expected: "YLA1111111"
    },
    {
        input: "julian",
        expected: "YLN1111111"
    },
    {
        input: "juliana",
        expected: "YLNA111111"
    },
    {
        input: "juliann",
        expected: "YLN1111111"
    },
    {
        input: "julianna",
        expected: "YLNA111111"
    },
    {
        input: "julie",
        expected: "YLA1111111"
    },
    {
        input: "julin",
        expected: "YLN1111111"
    },
    {
        input: "julius",
        expected: "YLS1111111"
    },
    {
        input: "jull",
        expected: "YA11111111"
    },
    {
        input: "june",
        expected: "YN11111111"
    },
    {
        input: "junge",
        expected: "YNK1111111"
    },
    {
        input: "jurdine",
        expected: "YTN1111111"
    },
    {
        input: "juries",
        expected: "YRS1111111"
    },
    {
        input: "jury",
        expected: "YRA1111111"
    },
    {
        input: "justice",
        expected: "YSTK111111"
    },
    {
        input: "justin",
        expected: "YSTN111111"
    },
    {
        input: "justina",
        expected: "YSTNA11111"
    },
    {
        input: "kahlenberg",
        expected: "KLNPK11111"
    },
    {
        input: "kain",
        expected: "KN11111111"
    },
    {
        input: "kaiserin",
        expected: "KSRN111111"
    },
    {
        input: "kaler",
        expected: "KLA1111111"
    },
    {
        input: "kane",
        expected: "KN11111111"
    },
    {
        input: "kania",
        expected: "KNA1111111"
    },
    {
        input: "kannervischer",
        expected: "KNFSKA1111"
    },
    {
        input: "kannewischer",
        expected: "KNWSKA1111"
    },
    {
        input: "karen",
        expected: "KRN1111111"
    },
    {
        input: "karl",
        expected: "KA11111111"
    },
    {
        input: "karney",
        expected: "KNA1111111"
    },
    {
        input: "kate",
        expected: "KT11111111"
    },
    {
        input: "katern",
        expected: "KTN1111111"
    },
    {
        input: "kath",
        expected: "KT11111111"
    },
    {
        input: "katharine",
        expected: "KTRN111111"
    },
    {
        input: "katherine",
        expected: "KTRN111111"
    },
    {
        input: "kathleen",
        expected: "KTLN111111"
    },
    {
        input: "katie",
        expected: "KTA1111111"
    },
    {
        input: "katrine",
        expected: "KTRN111111"
    },
    {
        input: "kavanagh",
        expected: "KFNA111111"
    },
    {
        input: "kay",
        expected: "KA11111111"
    },
    {
        input: "kaye",
        expected: "KA11111111"
    },
    {
        input: "keach",
        expected: "KK11111111"
    },
    {
        input: "kean",
        expected: "KN11111111"
    },
    {
        input: "keane",
        expected: "KN11111111"
    },
    {
        input: "kearney",
        expected: "KNA1111111"
    },
    {
        input: "kearns",
        expected: "KNS1111111"
    },
    {
        input: "kearsley",
        expected: "KSLA111111"
    },
    {
        input: "keast",
        expected: "KST1111111"
    },
    {
        input: "keates",
        expected: "KTS1111111"
    },
    {
        input: "keating",
        expected: "KTNK111111"
    },
    {
        input: "kebblewhite",
        expected: "KPLWT11111"
    },
    {
        input: "kedzlie",
        expected: "KTSLA11111"
    },
    {
        input: "kee",
        expected: "KA11111111"
    },
    {
        input: "kee]ey",
        expected: "KA11111111"
    },
    {
        input: "keeler",
        expected: "KLA1111111"
    },
    {
        input: "keeley",
        expected: "KLA1111111"
    },
    {
        input: "keeling",
        expected: "KLNK111111"
    },
    {
        input: "keen",
        expected: "KN11111111"
    },
    {
        input: "keenall",
        expected: "KNA1111111"
    },
    {
        input: "keenan",
        expected: "KNN1111111"
    },
    {
        input: "keenan oli",
        expected: "KNNLA11111"
    },
    {
        input: "keene",
        expected: "KN11111111"
    },
    {
        input: "keennelly",
        expected: "KNLA111111"
    },
    {
        input: "keeshan",
        expected: "KSN1111111"
    },
    {
        input: "kehoe",
        expected: "KA11111111"
    },
    {
        input: "keillor",
        expected: "KLA1111111"
    },
    {
        input: "keinan",
        expected: "KNN1111111"
    },
    {
        input: "keir",
        expected: "KA11111111"
    },
    {
        input: "keirnan",
        expected: "KNN1111111"
    },
    {
        input: "keith",
        expected: "KT11111111"
    },
    {
        input: "keitha",
        expected: "KTA1111111"
    },
    {
        input: "kelburne",
        expected: "KPN1111111"
    },
    {
        input: "keliher",
        expected: "KLA1111111"
    },
    {
        input: "kellahan",
        expected: "KLN1111111"
    },
    {
        input: "kellan",
        expected: "KLN1111111"
    },
    {
        input: "kellas",
        expected: "KLS1111111"
    },
    {
        input: "kellehan",
        expected: "KLN1111111"
    },
    {
        input: "keller",
        expected: "KLA1111111"
    },
    {
        input: "kelley",
        expected: "KLA1111111"
    },
    {
        input: "kelliher",
        expected: "KLA1111111"
    },
    {
        input: "kelly",
        expected: "KLA1111111"
    },
    {
        input: "kemohan",
        expected: "KMN1111111"
    },
    {
        input: "kemp",
        expected: "KMP1111111"
    },
    {
        input: "kempson",
        expected: "KMPSN11111"
    },
    {
        input: "kempthorne",
        expected: "KMPTN11111"
    },
    {
        input: "kempton",
        expected: "KMPTN11111"
    },
    {
        input: "kemshed",
        expected: "KMST111111"
    },
    {
        input: "kemsley",
        expected: "KMSLA11111"
    },
    {
        input: "kendal",
        expected: "KNTA111111"
    },
    {
        input: "kendall",
        expected: "KNTA111111"
    },
    {
        input: "kendell",
        expected: "KNTA111111"
    },
    {
        input: "kendrick",
        expected: "KNTRK11111"
    },
    {
        input: "kenllard",
        expected: "KNLT111111"
    },
    {
        input: "kenn",
        expected: "KN11111111"
    },
    {
        input: "kenna",
        expected: "KNA1111111"
    },
    {
        input: "kennard",
        expected: "KNT1111111"
    },
    {
        input: "kenneally",
        expected: "KNLA111111"
    },
    {
        input: "kennealy",
        expected: "KNLA111111"
    },
    {
        input: "kennedy",
        expected: "KNTA111111"
    },
    {
        input: "kennelly",
        expected: "KNLA111111"
    },
    {
        input: "kennerly",
        expected: "KNLA111111"
    },
    {
        input: "kenneth",
        expected: "KNT1111111"
    },
    {
        input: "kenney",
        expected: "KNA1111111"
    },
    {
        input: "kenny",
        expected: "KNA1111111"
    },
    {
        input: "kenshole",
        expected: "KNSA111111"
    },
    {
        input: "kensington",
        expected: "KNSNKTN111"
    },
    {
        input: "kensler",
        expected: "KNSLA11111"
    },
    {
        input: "kent",
        expected: "KNT1111111"
    },
    {
        input: "kenward",
        expected: "KNWT111111"
    },
    {
        input: "kenyon",
        expected: "KNN1111111"
    },
    {
        input: "keogh",
        expected: "KA11111111"
    },
    {
        input: "keohane",
        expected: "KN11111111"
    },
    {
        input: "keown",
        expected: "KN11111111"
    },
    {
        input: "ker",
        expected: "KA11111111"
    },
    {
        input: "keren",
        expected: "KRN1111111"
    },
    {
        input: "keriah",
        expected: "KRA1111111"
    },
    {
        input: "kernick",
        expected: "KNK1111111"
    },
    {
        input: "kernohan",
        expected: "KNN1111111"
    },
    {
        input: "kerr",
        expected: "KA11111111"
    },
    {
        input: "kerrigan",
        expected: "KRKN111111"
    },
    {
        input: "kerse",
        expected: "KS11111111"
    },
    {
        input: "kershaw",
        expected: "KSA1111111"
    },
    {
        input: "kessel",
        expected: "KSA1111111"
    },
    {
        input: "kesteven",
        expected: "KSTFN11111"
    },
    {
        input: "kett",
        expected: "KT11111111"
    },
    {
        input: "kettle",
        expected: "KTA1111111"
    },
    {
        input: "keturah",
        expected: "KTRA111111"
    },
    {
        input: "kewish",
        expected: "KWS1111111"
    },
    {
        input: "key",
        expected: "KA11111111"
    },
    {
        input: "keyes",
        expected: "KS11111111"
    },
    {
        input: "keys",
        expected: "KS11111111"
    },
    {
        input: "kezia",
        expected: "KSA1111111"
    },
    {
        input: "keziah",
        expected: "KSA1111111"
    },
    {
        input: "kibblewhite",
        expected: "KPLWT11111"
    },
    {
        input: "kidd",
        expected: "KT11111111"
    },
    {
        input: "kidston",
        expected: "KTSTN11111"
    },
    {
        input: "kiee",
        expected: "KA11111111"
    },
    {
        input: "kiely",
        expected: "KLA1111111"
    },
    {
        input: "kienan",
        expected: "KNN1111111"
    },
    {
        input: "kieran",
        expected: "KRN1111111"
    },
    {
        input: "kiernan",
        expected: "KNN1111111"
    },
    {
        input: "kilchin",
        expected: "KKN1111111"
    },
    {
        input: "kilgariff",
        expected: "KKRF111111"
    },
    {
        input: "kilgarrif",
        expected: "KKRF111111"
    },
    {
        input: "kilgour",
        expected: "KKA1111111"
    },
    {
        input: "kilkeary",
        expected: "KKRA111111"
    },
    {
        input: "killilea",
        expected: "KLLA111111"
    },
    {
        input: "killin",
        expected: "KLN1111111"
    },
    {
        input: "kilner",
        expected: "KNA1111111"
    },
    {
        input: "kilpatrick",
        expected: "KPTRK11111"
    },
    {
        input: "kilroy",
        expected: "KRA1111111"
    },
    {
        input: "kimber",
        expected: "KMPA111111"
    },
    {
        input: "kincaid",
        expected: "KNKT111111"
    },
    {
        input: "kinch",
        expected: "KNK1111111"
    },
    {
        input: "kindley",
        expected: "KNTLA11111"
    },
    {
        input: "king",
        expected: "KNK1111111"
    },
    {
        input: "kingford",
        expected: "KNKFT11111"
    },
    {
        input: "kingsford",
        expected: "KNKSFT1111"
    },
    {
        input: "kingsland",
        expected: "KNKSLNT111"
    },
    {
        input: "kingsley",
        expected: "KNKSLA1111"
    },
    {
        input: "kingston",
        expected: "KNKSTN1111"
    },
    {
        input: "kininmonth",
        expected: "KNNMNT1111"
    },
    {
        input: "kinloch",
        expected: "KNLK111111"
    },
    {
        input: "kinlock",
        expected: "KNLK111111"
    },
    {
        input: "kinmont",
        expected: "KNMNT11111"
    },
    {
        input: "kinnaird",
        expected: "KNT1111111"
    },
    {
        input: "kinnear",
        expected: "KNA1111111"
    },
    {
        input: "kinney",
        expected: "KNA1111111"
    },
    {
        input: "kippenberg",
        expected: "KPNPK11111"
    },
    {
        input: "kippenberger",
        expected: "KPNPKA1111"
    },
    {
        input: "kirby",
        expected: "KPA1111111"
    },
    {
        input: "kirk",
        expected: "KK11111111"
    },
    {
        input: "kirkaldie",
        expected: "KKTA111111"
    },
    {
        input: "kirkby",
        expected: "KKPA111111"
    },
    {
        input: "kirkcaldie",
        expected: "KKTA111111"
    },
    {
        input: "kirkcaldy",
        expected: "KKTA111111"
    },
    {
        input: "kirke",
        expected: "KK11111111"
    },
    {
        input: "kirkham",
        expected: "KKM1111111"
    },
    {
        input: "kirkland",
        expected: "KKLNT11111"
    },
    {
        input: "kirkly",
        expected: "KKLA111111"
    },
    {
        input: "kirkness",
        expected: "KKNS111111"
    },
    {
        input: "kirkpatrick",
        expected: "KKPTRK1111"
    },
    {
        input: "kirkwood",
        expected: "KKWT111111"
    },
    {
        input: "kirnan",
        expected: "KNN1111111"
    },
    {
        input: "kirton",
        expected: "KTN1111111"
    },
    {
        input: "kirwan",
        expected: "KWN1111111"
    },
    {
        input: "kitchen",
        expected: "KKN1111111"
    },
    {
        input: "kitchin",
        expected: "KKN1111111"
    },
    {
        input: "kitching",
        expected: "KKNK111111"
    },
    {
        input: "kite",
        expected: "KT11111111"
    },
    {
        input: "kitt",
        expected: "KT11111111"
    },
    {
        input: "kitterick",
        expected: "KTRK111111"
    },
    {
        input: "kittie",
        expected: "KTA1111111"
    },
    {
        input: "kitto",
        expected: "KTA1111111"
    },
    {
        input: "kitty",
        expected: "KTA1111111"
    },
    {
        input: "klahn",
        expected: "KLN1111111"
    },
    {
        input: "klee",
        expected: "KLA1111111"
    },
    {
        input: "kleeber",
        expected: "KLPA111111"
    },
    {
        input: "klimeck",
        expected: "KLMK111111"
    },
    {
        input: "knewstubb",
        expected: "KNSTP11111"
    },
    {
        input: "knigbt",
        expected: "KNKPT11111"
    },
    {
        input: "knight",
        expected: "KNT1111111"
    },
    {
        input: "knights",
        expected: "KNTS111111"
    },
    {
        input: "knipe",
        expected: "KNP1111111"
    },
    {
        input: "knopp",
        expected: "KNP1111111"
    },
    {
        input: "knowles",
        expected: "KNLS111111"
    },
    {
        input: "knox",
        expected: "KNK1111111"
    },
    {
        input: "knudsen",
        expected: "KNTSN11111"
    },
    {
        input: "knudson",
        expected: "KNTSN11111"
    },
    {
        input: "koa",
        expected: "KA11111111"
    },
    {
        input: "kofoed",
        expected: "KFT1111111"
    },
    {
        input: "kollberg",
        expected: "KPK1111111"
    },
    {
        input: "koller",
        expected: "KLA1111111"
    },
    {
        input: "koren",
        expected: "KRN1111111"
    },
    {
        input: "korner",
        expected: "KNA1111111"
    },
    {
        input: "kraus",
        expected: "KRS1111111"
    },
    {
        input: "krause",
        expected: "KRS1111111"
    },
    {
        input: "kreft",
        expected: "KRFT111111"
    },
    {
        input: "kroon",
        expected: "KRN1111111"
    },
    {
        input: "kropp",
        expected: "KRP1111111"
    },
    {
        input: "krox",
        expected: "KRK1111111"
    },
    {
        input: "kruskoff",
        expected: "KRSKF11111"
    },
    {
        input: "kruskopf",
        expected: "KRSKPF1111"
    },
    {
        input: "kuff",
        expected: "KF11111111"
    },
    {
        input: "kum",
        expected: "KM11111111"
    },
    {
        input: "kummert",
        expected: "KMT1111111"
    },
    {
        input: "kurt",
        expected: "KT11111111"
    },
    {
        input: "ky]e",
        expected: "KA11111111"
    },
    {
        input: "kydd",
        expected: "KT11111111"
    },
    {
        input: "kyle",
        expected: "KA11111111"
    },
    {
        input: "kyra",
        expected: "KRA1111111"
    },
    {
        input: "l",
        expected: "A111111111"
    },
    {
        input: "l'estrange",
        expected: "LSTRNK1111"
    },
    {
        input: "la roche",
        expected: "LRK1111111"
    },
    {
        input: "labes",
        expected: "LPS1111111"
    },
    {
        input: "lacey",
        expected: "LSA1111111"
    },
    {
        input: "lachlan",
        expected: "LKLN111111"
    },
    {
        input: "lack",
        expected: "LK11111111"
    },
    {
        input: "ladd",
        expected: "LT11111111"
    },
    {
        input: "ladislas",
        expected: "LTSLS11111"
    },
    {
        input: "laery",
        expected: "LRA1111111"
    },
    {
        input: "laffey",
        expected: "LFA1111111"
    },
    {
        input: "lafranchie",
        expected: "LFRNKA1111"
    },
    {
        input: "lagan",
        expected: "LKN1111111"
    },
    {
        input: "lahman",
        expected: "LMN1111111"
    },
    {
        input: "lahood",
        expected: "LT11111111"
    },
    {
        input: "laidlaw",
        expected: "LTLA111111"
    },
    {
        input: "lain",
        expected: "LN11111111"
    },
    {
        input: "laine",
        expected: "LN11111111"
    },
    {
        input: "laing",
        expected: "LNK1111111"
    },
    {
        input: "laird",
        expected: "LT11111111"
    },
    {
        input: "lake",
        expected: "LK11111111"
    },
    {
        input: "lakeman",
        expected: "LKMN111111"
    },
    {
        input: "lale",
        expected: "LA11111111"
    },
    {
        input: "laley",
        expected: "LLA1111111"
    },
    {
        input: "lallah",
        expected: "LLA1111111"
    },
    {
        input: "laloli",
        expected: "LLLA111111"
    },
    {
        input: "lamb",
        expected: "LM11111111"
    },
    {
        input: "lambert",
        expected: "LMPT111111"
    },
    {
        input: "lambeth",
        expected: "LMPT111111"
    },
    {
        input: "lambie",
        expected: "LMPA111111"
    },
    {
        input: "lamborn",
        expected: "LMPN111111"
    },
    {
        input: "lambton",
        expected: "LMPTN11111"
    },
    {
        input: "lamham",
        expected: "LMM1111111"
    },
    {
        input: "lamont",
        expected: "LMNT111111"
    },
    {
        input: "lampard",
        expected: "LMPT111111"
    },
    {
        input: "lampen",
        expected: "LMPN111111"
    },
    {
        input: "lamsel",
        expected: "LMSA111111"
    },
    {
        input: "lan",
        expected: "LN11111111"
    },
    {
        input: "lancaster",
        expected: "LNKSTA1111"
    },
    {
        input: "lance",
        expected: "LNK1111111"
    },
    {
        input: "lancelot",
        expected: "LNSLT11111"
    },
    {
        input: "landerson",
        expected: "LNTSN11111"
    },
    {
        input: "landrebe",
        expected: "LNTRP11111"
    },
    {
        input: "landreth",
        expected: "LNTRT11111"
    },
    {
        input: "landriken",
        expected: "LNTRKN1111"
    },
    {
        input: "lane",
        expected: "LN11111111"
    },
    {
        input: "laney",
        expected: "LNA1111111"
    },
    {
        input: "lang",
        expected: "LNK1111111"
    },
    {
        input: "langdon",
        expected: "LNKTN11111"
    },
    {
        input: "langevad",
        expected: "LNKFT11111"
    },
    {
        input: "langford",
        expected: "LNKFT11111"
    },
    {
        input: "langham",
        expected: "LNM1111111"
    },
    {
        input: "langlands",
        expected: "LNKLNTS111"
    },
    {
        input: "langley",
        expected: "LNKLA11111"
    },
    {
        input: "langlow",
        expected: "LNKLA11111"
    },
    {
        input: "langmuir",
        expected: "LNKMA11111"
    },
    {
        input: "langston",
        expected: "LNKSTN1111"
    },
    {
        input: "lanham",
        expected: "LNM1111111"
    },
    {
        input: "lanini",
        expected: "LNNA111111"
    },
    {
        input: "lansley",
        expected: "LNSLA11111"
    },
    {
        input: "lappan",
        expected: "LPN1111111"
    },
    {
        input: "lapsley",
        expected: "LPSLA11111"
    },
    {
        input: "lardner",
        expected: "LTNA111111"
    },
    {
        input: "larkin",
        expected: "LKN1111111"
    },
    {
        input: "larking",
        expected: "LKNK111111"
    },
    {
        input: "larkins",
        expected: "LKNS111111"
    },
    {
        input: "larldng",
        expected: "LTNK111111"
    },
    {
        input: "larner",
        expected: "LNA1111111"
    },
    {
        input: "laroche",
        expected: "LRK1111111"
    },
    {
        input: "lars",
        expected: "LS11111111"
    },
    {
        input: "larsen",
        expected: "LSN1111111"
    },
    {
        input: "larson",
        expected: "LSN1111111"
    },
    {
        input: "larty",
        expected: "LTA1111111"
    },
    {
        input: "lascelles",
        expected: "LSLS111111"
    },
    {
        input: "latham",
        expected: "LTM1111111"
    },
    {
        input: "latimer",
        expected: "LTMA111111"
    },
    {
        input: "latta",
        expected: "LTA1111111"
    },
    {
        input: "latter",
        expected: "LTA1111111"
    },
    {
        input: "lattimer",
        expected: "LTMA111111"
    },
    {
        input: "lattimore",
        expected: "LTMA111111"
    },
    {
        input: "lauchlan",
        expected: "LKLN111111"
    },
    {
        input: "lauder",
        expected: "LTA1111111"
    },
    {
        input: "laug",
        expected: "LK11111111"
    },
    {
        input: "laughland",
        expected: "LLNT111111"
    },
    {
        input: "laughlin",
        expected: "LLN1111111"
    },
    {
        input: "launa",
        expected: "LNA1111111"
    },
    {
        input: "launcelot",
        expected: "LNSLT11111"
    },
    {
        input: "laura",
        expected: "LRA1111111"
    },
    {
        input: "laurel",
        expected: "LRA1111111"
    },
    {
        input: "lauren",
        expected: "LRN1111111"
    },
    {
        input: "laurena",
        expected: "LRNA111111"
    },
    {
        input: "laurence",
        expected: "LRNK111111"
    },
    {
        input: "laurencia",
        expected: "LRNSA11111"
    },
    {
        input: "laurenson",
        expected: "LRNSN11111"
    },
    {
        input: "laurentine",
        expected: "LRNTN11111"
    },
    {
        input: "lauri",
        expected: "LRA1111111"
    },
    {
        input: "laurie",
        expected: "LRA1111111"
    },
    {
        input: "laurinda",
        expected: "LRNTA11111"
    },
    {
        input: "lauris",
        expected: "LRS1111111"
    },
    {
        input: "laveana",
        expected: "LFNA111111"
    },
    {
        input: "lavender",
        expected: "LFNTA11111"
    },
    {
        input: "laverty",
        expected: "LFTA111111"
    },
    {
        input: "lavery",
        expected: "LFRA111111"
    },
    {
        input: "lavina",
        expected: "LFNA111111"
    },
    {
        input: "lavinia",
        expected: "LFNA111111"
    },
    {
        input: "lavinla",
        expected: "LFNLA11111"
    },
    {
        input: "law",
        expected: "LA11111111"
    },
    {
        input: "lawence",
        expected: "LWNK111111"
    },
    {
        input: "lawer",
        expected: "LWA1111111"
    },
    {
        input: "lawfield",
        expected: "LFT1111111"
    },
    {
        input: "lawford",
        expected: "LFT1111111"
    },
    {
        input: "lawless",
        expected: "LLS1111111"
    },
    {
        input: "lawliss",
        expected: "LLS1111111"
    },
    {
        input: "lawlor",
        expected: "LLA1111111"
    },
    {
        input: "lawloss",
        expected: "LLS1111111"
    },
    {
        input: "lawrance",
        expected: "LRNK111111"
    },
    {
        input: "lawrence",
        expected: "LRNK111111"
    },
    {
        input: "lawrenson",
        expected: "LRNSN11111"
    },
    {
        input: "lawrie",
        expected: "LRA1111111"
    },
    {
        input: "lawry",
        expected: "LRA1111111"
    },
    {
        input: "laws",
        expected: "LS11111111"
    },
    {
        input: "lawson",
        expected: "LSN1111111"
    },
    {
        input: "lawton",
        expected: "LTN1111111"
    },
    {
        input: "lax",
        expected: "LK11111111"
    },
    {
        input: "layburn",
        expected: "LPN1111111"
    },
    {
        input: "laycock",
        expected: "LKK1111111"
    },
    {
        input: "laytham",
        expected: "LTM1111111"
    },
    {
        input: "layton",
        expected: "LTN1111111"
    },
    {
        input: "lazarus",
        expected: "LSRS111111"
    },
    {
        input: "lbbetson",
        expected: "PTSN111111"
    },
    {
        input: "le brun",
        expected: "LPRN111111"
    },
    {
        input: "le couteur",
        expected: "LKTA111111"
    },
    {
        input: "le fevre",
        expected: "LFFA111111"
    },
    {
        input: "le gal",
        expected: "LKA1111111"
    },
    {
        input: "le page",
        expected: "LPK1111111"
    },
    {
        input: "le sueur",
        expected: "LSA1111111"
    },
    {
        input: "le vavasour",
        expected: "LFFSA11111"
    },
    {
        input: "lea",
        expected: "LA11111111"
    },
    {
        input: "leach",
        expected: "LK11111111"
    },
    {
        input: "leadbetter",
        expected: "LTPTA11111"
    },
    {
        input: "leah",
        expected: "LA11111111"
    },
    {
        input: "leahy",
        expected: "LA11111111"
    },
    {
        input: "lealy",
        expected: "LLA1111111"
    },
    {
        input: "lean",
        expected: "LN11111111"
    },
    {
        input: "leaper",
        expected: "LPA1111111"
    },
    {
        input: "lear",
        expected: "LA11111111"
    },
    {
        input: "learmond",
        expected: "LMNT111111"
    },
    {
        input: "leary",
        expected: "LRA1111111"
    },
    {
        input: "leask",
        expected: "LSK1111111"
    },
    {
        input: "leatham",
        expected: "LTM1111111"
    },
    {
        input: "leathem",
        expected: "LTM1111111"
    },
    {
        input: "leather",
        expected: "LTA1111111"
    },
    {
        input: "leatherland",
        expected: "LTLNT11111"
    },
    {
        input: "leathley",
        expected: "LTLA111111"
    },
    {
        input: "leckie",
        expected: "LKA1111111"
    },
    {
        input: "leclie",
        expected: "LKLA111111"
    },
    {
        input: "lecouteur",
        expected: "LKTA111111"
    },
    {
        input: "leddicott",
        expected: "LTKT111111"
    },
    {
        input: "ledestian",
        expected: "LTSN111111"
    },
    {
        input: "ledgerwood",
        expected: "LKWT111111"
    },
    {
        input: "ledlie",
        expected: "LTLA111111"
    },
    {
        input: "lee",
        expected: "LA11111111"
    },
    {
        input: "leece",
        expected: "LK11111111"
    },
    {
        input: "leech",
        expected: "LK11111111"
    },
    {
        input: "leedale",
        expected: "LTA1111111"
    },
    {
        input: "leeden",
        expected: "LTN1111111"
    },
    {
        input: "leemin",
        expected: "LMN1111111"
    },
    {
        input: "leeming",
        expected: "LMNK111111"
    },
    {
        input: "leery",
        expected: "LRA1111111"
    },
    {
        input: "lees",
        expected: "LS11111111"
    },
    {
        input: "leete",
        expected: "LT11111111"
    },
    {
        input: "lefevre",
        expected: "LFFA111111"
    },
    {
        input: "legal",
        expected: "LKA1111111"
    },
    {
        input: "legall",
        expected: "LKA1111111"
    },
    {
        input: "legat",
        expected: "LKT1111111"
    },
    {
        input: "legg",
        expected: "LK11111111"
    },
    {
        input: "legge",
        expected: "LK11111111"
    },
    {
        input: "leggett",
        expected: "LKT1111111"
    },
    {
        input: "leggott",
        expected: "LKT1111111"
    },
    {
        input: "lehmann",
        expected: "LMN1111111"
    },
    {
        input: "leicester",
        expected: "LSSTA11111"
    },
    {
        input: "leigh",
        expected: "LA11111111"
    },
    {
        input: "leighton",
        expected: "LTN1111111"
    },
    {
        input: "leihy",
        expected: "LA11111111"
    },
    {
        input: "leila",
        expected: "LLA1111111"
    },
    {
        input: "leishman",
        expected: "LSMN111111"
    },
    {
        input: "leitch",
        expected: "LK11111111"
    },
    {
        input: "leith",
        expected: "LT11111111"
    },
    {
        input: "lelia",
        expected: "LLA1111111"
    },
    {
        input: "lella",
        expected: "LLA1111111"
    },
    {
        input: "lelliott",
        expected: "LLT1111111"
    },
    {
        input: "lemin",
        expected: "LMN1111111"
    },
    {
        input: "lemon",
        expected: "LMN1111111"
    },
    {
        input: "lena",
        expected: "LNA1111111"
    },
    {
        input: "lenard",
        expected: "LNT1111111"
    },
    {
        input: "lendrum",
        expected: "LNTRM11111"
    },
    {
        input: "leng",
        expected: "LNK1111111"
    },
    {
        input: "lenihan",
        expected: "LNN1111111"
    },
    {
        input: "lennan",
        expected: "LNN1111111"
    },
    {
        input: "lennard",
        expected: "LNT1111111"
    },
    {
        input: "lennie",
        expected: "LNA1111111"
    },
    {
        input: "lennon",
        expected: "LNN1111111"
    },
    {
        input: "lennox",
        expected: "LNK1111111"
    },
    {
        input: "lenora",
        expected: "LNRA111111"
    },
    {
        input: "lenton",
        expected: "LNTN111111"
    },
    {
        input: "lenz",
        expected: "LNS1111111"
    },
    {
        input: "leo",
        expected: "LA11111111"
    },
    {
        input: "leocadia",
        expected: "LKTA111111"
    },
    {
        input: "leon",
        expected: "LN11111111"
    },
    {
        input: "leona",
        expected: "LNA1111111"
    },
    {
        input: "leonard",
        expected: "LNT1111111"
    },
    {
        input: "leonia",
        expected: "LNA1111111"
    },
    {
        input: "leonie",
        expected: "LNA1111111"
    },
    {
        input: "leonora",
        expected: "LNRA111111"
    },
    {
        input: "leontine",
        expected: "LNTN111111"
    },
    {
        input: "leopold",
        expected: "LPT1111111"
    },
    {
        input: "leper",
        expected: "LPA1111111"
    },
    {
        input: "lepine",
        expected: "LPN1111111"
    },
    {
        input: "lepper",
        expected: "LPA1111111"
    },
    {
        input: "leppingvell",
        expected: "LPNKFA1111"
    },
    {
        input: "leppingwell",
        expected: "LPNKWA1111"
    },
    {
        input: "lerleine",
        expected: "LLN1111111"
    },
    {
        input: "lerrigo",
        expected: "LRKA111111"
    },
    {
        input: "lesla",
        expected: "LSLA111111"
    },
    {
        input: "lesle",
        expected: "LSA1111111"
    },
    {
        input: "lesley",
        expected: "LSLA111111"
    },
    {
        input: "leslie",
        expected: "LSLA111111"
    },
    {
        input: "leslle",
        expected: "LSA1111111"
    },
    {
        input: "lesney",
        expected: "LSNA111111"
    },
    {
        input: "lester",
        expected: "LSTA111111"
    },
    {
        input: "lesueur",
        expected: "LSA1111111"
    },
    {
        input: "leta",
        expected: "LTA1111111"
    },
    {
        input: "lethaby",
        expected: "LTPA111111"
    },
    {
        input: "lethbridge",
        expected: "LTPRK11111"
    },
    {
        input: "lethridge",
        expected: "LTRK111111"
    },
    {
        input: "letiris",
        expected: "LTRS111111"
    },
    {
        input: "letita",
        expected: "LTTA111111"
    },
    {
        input: "letitia",
        expected: "LTSA111111"
    },
    {
        input: "lettia",
        expected: "LTSA111111"
    },
    {
        input: "lettice",
        expected: "LTK1111111"
    },
    {
        input: "lettie",
        expected: "LTA1111111"
    },
    {
        input: "letts",
        expected: "LTS1111111"
    },
    {
        input: "letty",
        expected: "LTA1111111"
    },
    {
        input: "leung chung",
        expected: "LNKNK11111"
    },
    {
        input: "levenia",
        expected: "LFNA111111"
    },
    {
        input: "levi",
        expected: "LFA1111111"
    },
    {
        input: "levido",
        expected: "LFTA111111"
    },
    {
        input: "levina",
        expected: "LFNA111111"
    },
    {
        input: "levinia",
        expected: "LFNA111111"
    },
    {
        input: "levinsohn",
        expected: "LFNSN11111"
    },
    {
        input: "levy",
        expected: "LFA1111111"
    },
    {
        input: "lewellyn",
        expected: "LWLN111111"
    },
    {
        input: "lewies",
        expected: "LWS1111111"
    },
    {
        input: "lewis",
        expected: "LWS1111111"
    },
    {
        input: "lewisham",
        expected: "LWSM111111"
    },
    {
        input: "leyden",
        expected: "LTN1111111"
    },
    {
        input: "leydon",
        expected: "LTN1111111"
    },
    {
        input: "leyland",
        expected: "LLNT111111"
    },
    {
        input: "leys",
        expected: "LS11111111"
    },
    {
        input: "leyson",
        expected: "LSN1111111"
    },
    {
        input: "lezlie",
        expected: "LSLA111111"
    },
    {
        input: "lichtenstein",
        expected: "LKTNSTN111"
    },
    {
        input: "lickie",
        expected: "LKA1111111"
    },
    {
        input: "liddell",
        expected: "LTA1111111"
    },
    {
        input: "liddicoat",
        expected: "LTKT111111"
    },
    {
        input: "liddle",
        expected: "LTA1111111"
    },
    {
        input: "lidston",
        expected: "LTSTN11111"
    },
    {
        input: "lied",
        expected: "LT11111111"
    },
    {
        input: "liggins",
        expected: "LKNS111111"
    },
    {
        input: "lightbourne",
        expected: "LTPN111111"
    },
    {
        input: "lightfoot",
        expected: "LTFT111111"
    },
    {
        input: "lil",
        expected: "LA11111111"
    },
    {
        input: "lila",
        expected: "LLA1111111"
    },
    {
        input: "lilas",
        expected: "LLS1111111"
    },
    {
        input: "lilburn",
        expected: "LPN1111111"
    },
    {
        input: "lilburne",
        expected: "LPN1111111"
    },
    {
        input: "lileth",
        expected: "LLT1111111"
    },
    {
        input: "lilia",
        expected: "LLA1111111"
    },
    {
        input: "liliam",
        expected: "LLM1111111"
    },
    {
        input: "lilian",
        expected: "LLN1111111"
    },
    {
        input: "lilias",
        expected: "LLS1111111"
    },
    {
        input: "lilla",
        expected: "LLA1111111"
    },
    {
        input: "lillan",
        expected: "LLN1111111"
    },
    {
        input: "lillas",
        expected: "LLS1111111"
    },
    {
        input: "lilley",
        expected: "LLA1111111"
    },
    {
        input: "lillia",
        expected: "LLA1111111"
    },
    {
        input: "lillian",
        expected: "LLN1111111"
    },
    {
        input: "lillias",
        expected: "LLS1111111"
    },
    {
        input: "lillie",
        expected: "LLA1111111"
    },
    {
        input: "lillingstone",
        expected: "LLNKSTN111"
    },
    {
        input: "lillis",
        expected: "LLS1111111"
    },
    {
        input: "lilly",
        expected: "LLA1111111"
    },
    {
        input: "lilv",
        expected: "LF11111111"
    },
    {
        input: "lily",
        expected: "LLA1111111"
    },
    {
        input: "lina",
        expected: "LNA1111111"
    },
    {
        input: "lincoln",
        expected: "LNKN111111"
    },
    {
        input: "lind",
        expected: "LNT1111111"
    },
    {
        input: "linda",
        expected: "LNTA111111"
    },
    {
        input: "lindley",
        expected: "LNTLA11111"
    },
    {
        input: "lindo",
        expected: "LNTA111111"
    },
    {
        input: "lindon",
        expected: "LNTN111111"
    },
    {
        input: "lindsay",
        expected: "LNTSA11111"
    },
    {
        input: "lineham",
        expected: "LNM1111111"
    },
    {
        input: "linford",
        expected: "LNFT111111"
    },
    {
        input: "ling",
        expected: "LNK1111111"
    },
    {
        input: "linklater",
        expected: "LNKLTA1111"
    },
    {
        input: "linkston",
        expected: "LNKSTN1111"
    },
    {
        input: "linnane",
        expected: "LNN1111111"
    },
    {
        input: "linnet",
        expected: "LNT1111111"
    },
    {
        input: "linney",
        expected: "LNA1111111"
    },
    {
        input: "linsdell",
        expected: "LNSTA11111"
    },
    {
        input: "lintern",
        expected: "LNTN111111"
    },
    {
        input: "linton",
        expected: "LNTN111111"
    },
    {
        input: "lionel",
        expected: "LNA1111111"
    },
    {
        input: "lionella",
        expected: "LNLA111111"
    },
    {
        input: "lionelle",
        expected: "LNA1111111"
    },
    {
        input: "lipman",
        expected: "LPMN111111"
    },
    {
        input: "lippert",
        expected: "LPT1111111"
    },
    {
        input: "lischner",
        expected: "LSKNA11111"
    },
    {
        input: "lisette",
        expected: "LST1111111"
    },
    {
        input: "lisle",
        expected: "LSA1111111"
    },
    {
        input: "list",
        expected: "LST1111111"
    },
    {
        input: "lister",
        expected: "LSTA111111"
    },
    {
        input: "liston",
        expected: "LSTN111111"
    },
    {
        input: "listor",
        expected: "LSTA111111"
    },
    {
        input: "litolff",
        expected: "LTF1111111"
    },
    {
        input: "littie",
        expected: "LTA1111111"
    },
    {
        input: "little",
        expected: "LTA1111111"
    },
    {
        input: "littlejohn",
        expected: "LTLN111111"
    },
    {
        input: "littlewood",
        expected: "LTLWT11111"
    },
    {
        input: "livingston",
        expected: "LFNKSTN111"
    },
    {
        input: "livingstone",
        expected: "LFNKSTN111"
    },
    {
        input: "lizzie",
        expected: "LSA1111111"
    },
    {
        input: "llewellyn",
        expected: "LWLN111111"
    },
    {
        input: "llewelyn",
        expected: "LWLN111111"
    },
    {
        input: "llles",
        expected: "LS11111111"
    },
    {
        input: "lloyd",
        expected: "LT11111111"
    },
    {
        input: "lna",
        expected: "NA11111111"
    },
    {
        input: "lngram",
        expected: "NKRM111111"
    },
    {
        input: "lnwood",
        expected: "NWT1111111"
    },
    {
        input: "loader",
        expected: "LTA1111111"
    },
    {
        input: "loades",
        expected: "LTS1111111"
    },
    {
        input: "loan",
        expected: "LN11111111"
    },
    {
        input: "loasby",
        expected: "LSPA111111"
    },
    {
        input: "lobb",
        expected: "LP11111111"
    },
    {
        input: "loche",
        expected: "LK11111111"
    },
    {
        input: "lochhead",
        expected: "LKT1111111"
    },
    {
        input: "lochore",
        expected: "LKA1111111"
    },
    {
        input: "lock",
        expected: "LK11111111"
    },
    {
        input: "lockerbie",
        expected: "LKPA111111"
    },
    {
        input: "lockett",
        expected: "LKT1111111"
    },
    {
        input: "lockhart",
        expected: "LKT1111111"
    },
    {
        input: "lockhead",
        expected: "LKT1111111"
    },
    {
        input: "lockie",
        expected: "LKA1111111"
    },
    {
        input: "lockstone",
        expected: "LKSTN11111"
    },
    {
        input: "lockwood",
        expected: "LKWT111111"
    },
    {
        input: "lockyer",
        expected: "LKA1111111"
    },
    {
        input: "lodge",
        expected: "LK11111111"
    },
    {
        input: "loeffler",
        expected: "LFLA111111"
    },
    {
        input: "loftus",
        expected: "LFTS111111"
    },
    {
        input: "logan",
        expected: "LKN1111111"
    },
    {
        input: "logg",
        expected: "LK11111111"
    },
    {
        input: "loggie",
        expected: "LKA1111111"
    },
    {
        input: "logic",
        expected: "LKK1111111"
    },
    {
        input: "logie",
        expected: "LKA1111111"
    },
    {
        input: "logue",
        expected: "LKA1111111"
    },
    {
        input: "lohrey",
        expected: "LRA1111111"
    },
    {
        input: "lois",
        expected: "LS11111111"
    },
    {
        input: "loke",
        expected: "LK11111111"
    },
    {
        input: "loma",
        expected: "LMA1111111"
    },
    {
        input: "lomas",
        expected: "LMS1111111"
    },
    {
        input: "lombardi",
        expected: "LMPTA11111"
    },
    {
        input: "lona",
        expected: "LNA1111111"
    },
    {
        input: "loney",
        expected: "LNA1111111"
    },
    {
        input: "long",
        expected: "LNK1111111"
    },
    {
        input: "longhurst",
        expected: "LNST111111"
    },
    {
        input: "longley",
        expected: "LNKLA11111"
    },
    {
        input: "longman",
        expected: "LNKMN11111"
    },
    {
        input: "longmore",
        expected: "LNKMA11111"
    },
    {
        input: "longstaff",
        expected: "LNKSTF1111"
    },
    {
        input: "longworth",
        expected: "LNKWT11111"
    },
    {
        input: "lonie",
        expected: "LNA1111111"
    },
    {
        input: "lonsdale",
        expected: "LNSTA11111"
    },
    {
        input: "lora",
        expected: "LRA1111111"
    },
    {
        input: "loraine",
        expected: "LRN1111111"
    },
    {
        input: "lord",
        expected: "LT11111111"
    },
    {
        input: "loreen",
        expected: "LRN1111111"
    },
    {
        input: "lorenz",
        expected: "LRNS111111"
    },
    {
        input: "lorimer",
        expected: "LRMA111111"
    },
    {
        input: "loring",
        expected: "LRNK111111"
    },
    {
        input: "loris",
        expected: "LRS1111111"
    },
    {
        input: "lorna",
        expected: "LNA1111111"
    },
    {
        input: "lorraine",
        expected: "LRN1111111"
    },
    {
        input: "lory",
        expected: "LRA1111111"
    },
    {
        input: "lot",
        expected: "LT11111111"
    },
    {
        input: "lothian",
        expected: "LTN1111111"
    },
    {
        input: "lott",
        expected: "LT11111111"
    },
    {
        input: "lottia",
        expected: "LTSA111111"
    },
    {
        input: "lottie",
        expected: "LTA1111111"
    },
    {
        input: "lotty",
        expected: "LTA1111111"
    },
    {
        input: "louden",
        expected: "LTN1111111"
    },
    {
        input: "louder",
        expected: "LTA1111111"
    },
    {
        input: "loudon",
        expected: "LTN1111111"
    },
    {
        input: "lough",
        expected: "LA11111111"
    },
    {
        input: "loughill",
        expected: "LKA1111111"
    },
    {
        input: "loughlin",
        expected: "LLN1111111"
    },
    {
        input: "loughnan",
        expected: "LNN1111111"
    },
    {
        input: "loughran",
        expected: "LRN1111111"
    },
    {
        input: "loughrey",
        expected: "LRA1111111"
    },
    {
        input: "louia",
        expected: "LA11111111"
    },
    {
        input: "louie",
        expected: "LA11111111"
    },
    {
        input: "louis",
        expected: "LS11111111"
    },
    {
        input: "louisa",
        expected: "LSA1111111"
    },
    {
        input: "louise",
        expected: "LS11111111"
    },
    {
        input: "lousley",
        expected: "LSLA111111"
    },
    {
        input: "lovatt",
        expected: "LFT1111111"
    },
    {
        input: "love",
        expected: "LF11111111"
    },
    {
        input: "loveless",
        expected: "LFLS111111"
    },
    {
        input: "lovell",
        expected: "LFA1111111"
    },
    {
        input: "lovelock",
        expected: "LFLK111111"
    },
    {
        input: "low",
        expected: "LA11111111"
    },
    {
        input: "lowden",
        expected: "LTN1111111"
    },
    {
        input: "lowe",
        expected: "LA11111111"
    },
    {
        input: "lowen",
        expected: "LWN1111111"
    },
    {
        input: "lower",
        expected: "LWA1111111"
    },
    {
        input: "lowery",
        expected: "LWRA111111"
    },
    {
        input: "lowes",
        expected: "LWS1111111"
    },
    {
        input: "lowie",
        expected: "LWA1111111"
    },
    {
        input: "lowrey",
        expected: "LRA1111111"
    },
    {
        input: "lowry",
        expected: "LRA1111111"
    },
    {
        input: "loyd",
        expected: "LT11111111"
    },
    {
        input: "loydall",
        expected: "LTA1111111"
    },
    {
        input: "lrene",
        expected: "RN11111111"
    },
    {
        input: "lrvine",
        expected: "FN11111111"
    },
    {
        input: "lsaac",
        expected: "SK11111111"
    },
    {
        input: "lsaacs",
        expected: "SKS1111111"
    },
    {
        input: "lsabel",
        expected: "SPA1111111"
    },
    {
        input: "lsabella",
        expected: "SPLA111111"
    },
    {
        input: "luanna",
        expected: "LNA1111111"
    },
    {
        input: "lucas",
        expected: "LKS1111111"
    },
    {
        input: "lucerne",
        expected: "LSN1111111"
    },
    {
        input: "lucey",
        expected: "LSA1111111"
    },
    {
        input: "lucie",
        expected: "LSA1111111"
    },
    {
        input: "lucilla",
        expected: "LSLA111111"
    },
    {
        input: "lucille",
        expected: "LSA1111111"
    },
    {
        input: "lucina",
        expected: "LSNA111111"
    },
    {
        input: "lucius",
        expected: "LSS1111111"
    },
    {
        input: "luckhurst",
        expected: "LKST111111"
    },
    {
        input: "lucretia",
        expected: "LKRSA11111"
    },
    {
        input: "lucy",
        expected: "LSA1111111"
    },
    {
        input: "ludlow",
        expected: "LTLA111111"
    },
    {
        input: "ludwig",
        expected: "LTWK111111"
    },
    {
        input: "luella",
        expected: "LLA1111111"
    },
    {
        input: "luff",
        expected: "LF11111111"
    },
    {
        input: "luke",
        expected: "LK11111111"
    },
    {
        input: "lukey",
        expected: "LKA1111111"
    },
    {
        input: "lulu",
        expected: "LLA1111111"
    },
    {
        input: "lumb",
        expected: "LM11111111"
    },
    {
        input: "lumsden",
        expected: "LMSTN11111"
    },
    {
        input: "lunam",
        expected: "LNM1111111"
    },
    {
        input: "lunan",
        expected: "LNN1111111"
    },
    {
        input: "lunardi",
        expected: "LNTA111111"
    },
    {
        input: "lund",
        expected: "LNT1111111"
    },
    {
        input: "lundberg",
        expected: "LNTPK11111"
    },
    {
        input: "lundon",
        expected: "LNTN111111"
    },
    {
        input: "lundquist",
        expected: "LNTKST1111"
    },
    {
        input: "lungley",
        expected: "LNKLA11111"
    },
    {
        input: "lunham",
        expected: "LNM1111111"
    },
    {
        input: "lunn",
        expected: "LN11111111"
    },
    {
        input: "lunnam",
        expected: "LNM1111111"
    },
    {
        input: "lurline",
        expected: "LLN1111111"
    },
    {
        input: "luscombe",
        expected: "LSKM111111"
    },
    {
        input: "lusher",
        expected: "LSA1111111"
    },
    {
        input: "lusk",
        expected: "LSK1111111"
    },
    {
        input: "luskie",
        expected: "LSKA111111"
    },
    {
        input: "luslie",
        expected: "LSLA111111"
    },
    {
        input: "lust",
        expected: "LST1111111"
    },
    {
        input: "lva",
        expected: "FA11111111"
    },
    {
        input: "lvingstone",
        expected: "FNKSTN1111"
    },
    {
        input: "lvy",
        expected: "FA11111111"
    },
    {
        input: "lyall",
        expected: "LA11111111"
    },
    {
        input: "lyda",
        expected: "LTA1111111"
    },
    {
        input: "lyddy",
        expected: "LTA1111111"
    },
    {
        input: "lyders",
        expected: "LTS1111111"
    },
    {
        input: "lydia",
        expected: "LTA1111111"
    },
    {
        input: "lydiate",
        expected: "LTT1111111"
    },
    {
        input: "lye",
        expected: "LA11111111"
    },
    {
        input: "lyeaght",
        expected: "LT11111111"
    },
    {
        input: "lyell",
        expected: "LA11111111"
    },
    {
        input: "lygia",
        expected: "LKA1111111"
    },
    {
        input: "lyla",
        expected: "LLA1111111"
    },
    {
        input: "lylah",
        expected: "LLA1111111"
    },
    {
        input: "lyle",
        expected: "LA11111111"
    },
    {
        input: "lylie",
        expected: "LLA1111111"
    },
    {
        input: "lylo",
        expected: "LLA1111111"
    },
    {
        input: "lymburn",
        expected: "LMPN111111"
    },
    {
        input: "lynass",
        expected: "LNS1111111"
    },
    {
        input: "lynch",
        expected: "LNK1111111"
    },
    {
        input: "lynda",
        expected: "LNTA111111"
    },
    {
        input: "lyndburst",
        expected: "LNTPST1111"
    },
    {
        input: "lynden",
        expected: "LNTN111111"
    },
    {
        input: "lyndhurst",
        expected: "LNTST11111"
    },
    {
        input: "lyndon",
        expected: "LNTN111111"
    },
    {
        input: "lyndsay",
        expected: "LNTSA11111"
    },
    {
        input: "lyndsey",
        expected: "LNTSA11111"
    },
    {
        input: "lyng",
        expected: "LNK1111111"
    },
    {
        input: "lynn",
        expected: "LN11111111"
    },
    {
        input: "lynskey",
        expected: "LNSKA11111"
    },
    {
        input: "lyon",
        expected: "LN11111111"
    },
    {
        input: "lyons",
        expected: "LNS1111111"
    },
    {
        input: "lysaght",
        expected: "LST1111111"
    },
    {
        input: "lythgoe",
        expected: "LTKA111111"
    },
    {
        input: "lytle",
        expected: "LTA1111111"
    },
    {
        input: "lyttle",
        expected: "LTA1111111"
    },
    {
        input: "m orris",
        expected: "MRS1111111"
    },
    {
        input: "mabel",
        expected: "MPA1111111"
    },
    {
        input: "mabelle",
        expected: "MPA1111111"
    },
    {
        input: "mable",
        expected: "MPA1111111"
    },
    {
        input: "mabon",
        expected: "MPN1111111"
    },
    {
        input: "macale",
        expected: "MKA1111111"
    },
    {
        input: "macallan",
        expected: "MKLN111111"
    },
    {
        input: "macallum",
        expected: "MKLM111111"
    },
    {
        input: "macan",
        expected: "MKN1111111"
    },
    {
        input: "macandrew",
        expected: "MKNTRA1111"
    },
    {
        input: "macarthur",
        expected: "MKTA111111"
    },
    {
        input: "macartney",
        expected: "MKTNA11111"
    },
    {
        input: "macaskill",
        expected: "MKSKA11111"
    },
    {
        input: "macassey",
        expected: "MKSA111111"
    },
    {
        input: "macaulay",
        expected: "MKLA111111"
    },
    {
        input: "macauley",
        expected: "MKLA111111"
    },
    {
        input: "macavoy",
        expected: "MKFA111111"
    },
    {
        input: "macbeath",
        expected: "MKPT111111"
    },
    {
        input: "macbeth",
        expected: "MKPT111111"
    },
    {
        input: "macbryde",
        expected: "MKPRT11111"
    },
    {
        input: "maccallum",
        expected: "MKLM111111"
    },
    {
        input: "maccartie",
        expected: "MKTA111111"
    },
    {
        input: "maccoll",
        expected: "MKA1111111"
    },
    {
        input: "macdonald",
        expected: "MKTNT11111"
    },
    {
        input: "macdonall",
        expected: "MKTNA11111"
    },
    {
        input: "macdonell",
        expected: "MKTNA11111"
    },
    {
        input: "macdonnell",
        expected: "MKTNA11111"
    },
    {
        input: "macdougall",
        expected: "MKTKA11111"
    },
    {
        input: "macduff",
        expected: "MKTF111111"
    },
    {
        input: "mace",
        expected: "MK11111111"
    },
    {
        input: "maceewan",
        expected: "MSWN111111"
    },
    {
        input: "macer",
        expected: "MSA1111111"
    },
    {
        input: "macewan",
        expected: "MSWN111111"
    },
    {
        input: "macey",
        expected: "MSA1111111"
    },
    {
        input: "macfarlane",
        expected: "MKFLN11111"
    },
    {
        input: "macfie",
        expected: "MKFA111111"
    },
    {
        input: "macghie",
        expected: "MKA1111111"
    },
    {
        input: "macgibbon",
        expected: "MKPN111111"
    },
    {
        input: "macgregor",
        expected: "MKRKA11111"
    },
    {
        input: "macguire",
        expected: "MKA1111111"
    },
    {
        input: "machell",
        expected: "MKA1111111"
    },
    {
        input: "machin",
        expected: "MKN1111111"
    },
    {
        input: "machridge",
        expected: "MKRK111111"
    },
    {
        input: "maciean",
        expected: "MSN1111111"
    },
    {
        input: "macildowie",
        expected: "MSTWA11111"
    },
    {
        input: "macinnes",
        expected: "MSNS111111"
    },
    {
        input: "macintosh",
        expected: "MSNTS11111"
    },
    {
        input: "macintyre",
        expected: "MSNTA11111"
    },
    {
        input: "macivor",
        expected: "MSFA111111"
    },
    {
        input: "mack",
        expected: "MK11111111"
    },
    {
        input: "mackay",
        expected: "MKA1111111"
    },
    {
        input: "mackean",
        expected: "MKN1111111"
    },
    {
        input: "mackechnic",
        expected: "MKKNK11111"
    },
    {
        input: "mackechnie",
        expected: "MKKNA11111"
    },
    {
        input: "mackellar",
        expected: "MKLA111111"
    },
    {
        input: "mackenzie",
        expected: "MKNSA11111"
    },
    {
        input: "mackersey",
        expected: "MKSA111111"
    },
    {
        input: "mackersy",
        expected: "MKSA111111"
    },
    {
        input: "mackey",
        expected: "MKA1111111"
    },
    {
        input: "mackie",
        expected: "MKA1111111"
    },
    {
        input: "mackinnon",
        expected: "MKNN111111"
    },
    {
        input: "mackintosh",
        expected: "MKNTS11111"
    },
    {
        input: "mackisack",
        expected: "MKSK111111"
    },
    {
        input: "mackney",
        expected: "MKNA111111"
    },
    {
        input: "macknight",
        expected: "MKNT111111"
    },
    {
        input: "mackrell",
        expected: "MKRA111111"
    },
    {
        input: "mackridge",
        expected: "MKRK111111"
    },
    {
        input: "mackway jones",
        expected: "MKWNS11111"
    },
    {
        input: "mackway-jones",
        expected: "MKWNS11111"
    },
    {
        input: "mackwayjones",
        expected: "MKWNS11111"
    },
    {
        input: "macky",
        expected: "MKA1111111"
    },
    {
        input: "maclachlan",
        expected: "MKLKLN1111"
    },
    {
        input: "maclaren",
        expected: "MKLRN11111"
    },
    {
        input: "maclatchy",
        expected: "MKLKA11111"
    },
    {
        input: "maclean",
        expected: "MKLN111111"
    },
    {
        input: "maclellan",
        expected: "MKLLN11111"
    },
    {
        input: "maclennan",
        expected: "MKLNN11111"
    },
    {
        input: "macleod",
        expected: "MKLT111111"
    },
    {
        input: "maclonald",
        expected: "MKLNT11111"
    },
    {
        input: "macmanus",
        expected: "MKMNS11111"
    },
    {
        input: "macmaster",
        expected: "MKMSTA1111"
    },
    {
        input: "macmillan",
        expected: "MKMLN11111"
    },
    {
        input: "macnee",
        expected: "MKNA111111"
    },
    {
        input: "macnicol",
        expected: "MKNKA11111"
    },
    {
        input: "macniven",
        expected: "MKNFN11111"
    },
    {
        input: "macomish",
        expected: "MKMS111111"
    },
    {
        input: "macpherson",
        expected: "MKFSN11111"
    },
    {
        input: "macquaid",
        expected: "MKT1111111"
    },
    {
        input: "macrae",
        expected: "MKRA111111"
    },
    {
        input: "macswain",
        expected: "MKSWN11111"
    },
    {
        input: "macwilliam",
        expected: "MKWLM11111"
    },
    {
        input: "madalene",
        expected: "MTLN111111"
    },
    {
        input: "madaline",
        expected: "MTLN111111"
    },
    {
        input: "madarlane",
        expected: "MTLN111111"
    },
    {
        input: "madden",
        expected: "MTN1111111"
    },
    {
        input: "maddern",
        expected: "MTN1111111"
    },
    {
        input: "maddie",
        expected: "MTA1111111"
    },
    {
        input: "maddigan",
        expected: "MTKN111111"
    },
    {
        input: "maddox",
        expected: "MTK1111111"
    },
    {
        input: "maddren",
        expected: "MTRN111111"
    },
    {
        input: "madeleine",
        expected: "MTLN111111"
    },
    {
        input: "madeline",
        expected: "MTLN111111"
    },
    {
        input: "madell",
        expected: "MTA1111111"
    },
    {
        input: "maden",
        expected: "MTN1111111"
    },
    {
        input: "madge",
        expected: "MK11111111"
    },
    {
        input: "madglene",
        expected: "MKLN111111"
    },
    {
        input: "madigan",
        expected: "MTKN111111"
    },
    {
        input: "mae",
        expected: "MA11111111"
    },
    {
        input: "maffan",
        expected: "MFN1111111"
    },
    {
        input: "magdalen",
        expected: "MKTLN11111"
    },
    {
        input: "magdalena",
        expected: "MKTLNA1111"
    },
    {
        input: "magdalene",
        expected: "MKTLN11111"
    },
    {
        input: "magdaline",
        expected: "MKTLN11111"
    },
    {
        input: "magdeline",
        expected: "MKTLN11111"
    },
    {
        input: "magee",
        expected: "MKA1111111"
    },
    {
        input: "maggie",
        expected: "MKA1111111"
    },
    {
        input: "magner",
        expected: "MKNA111111"
    },
    {
        input: "magnus",
        expected: "MKNS111111"
    },
    {
        input: "magnustina",
        expected: "MKNSTNA111"
    },
    {
        input: "magorian",
        expected: "MKRN111111"
    },
    {
        input: "maguire",
        expected: "MKA1111111"
    },
    {
        input: "mahala",
        expected: "MLA1111111"
    },
    {
        input: "mahalm",
        expected: "MM11111111"
    },
    {
        input: "mahan",
        expected: "MN11111111"
    },
    {
        input: "maharey",
        expected: "MRA1111111"
    },
    {
        input: "maher",
        expected: "MA11111111"
    },
    {
        input: "mahon",
        expected: "MN11111111"
    },
    {
        input: "mahoney",
        expected: "MNA1111111"
    },
    {
        input: "mahony",
        expected: "MNA1111111"
    },
    {
        input: "mai",
        expected: "MA11111111"
    },
    {
        input: "maicolm",
        expected: "MKM1111111"
    },
    {
        input: "maida",
        expected: "MTA1111111"
    },
    {
        input: "maie",
        expected: "MA11111111"
    },
    {
        input: "maills",
        expected: "MS11111111"
    },
    {
        input: "maim",
        expected: "MM11111111"
    },
    {
        input: "main",
        expected: "MN11111111"
    },
    {
        input: "maine",
        expected: "MN11111111"
    },
    {
        input: "maines",
        expected: "MNS1111111"
    },
    {
        input: "mainland",
        expected: "MNLNT11111"
    },
    {
        input: "mains",
        expected: "MNS1111111"
    },
    {
        input: "mair",
        expected: "MA11111111"
    },
    {
        input: "maira",
        expected: "MRA1111111"
    },
    {
        input: "maisie",
        expected: "MSA1111111"
    },
    {
        input: "maitland",
        expected: "MTLNT11111"
    },
    {
        input: "major",
        expected: "MA11111111"
    },
    {
        input: "majorie",
        expected: "MRA1111111"
    },
    {
        input: "majory",
        expected: "MRA1111111"
    },
    {
        input: "maker",
        expected: "MKA1111111"
    },
    {
        input: "malachi",
        expected: "MLKA111111"
    },
    {
        input: "malcolm",
        expected: "MKM1111111"
    },
    {
        input: "malcolmson",
        expected: "MKMSN11111"
    },
    {
        input: "malden",
        expected: "MTN1111111"
    },
    {
        input: "maleod",
        expected: "MLT1111111"
    },
    {
        input: "maler",
        expected: "MLA1111111"
    },
    {
        input: "maley",
        expected: "MLA1111111"
    },
    {
        input: "malladew",
        expected: "MLTA111111"
    },
    {
        input: "mallett",
        expected: "MLT1111111"
    },
    {
        input: "malley",
        expected: "MLA1111111"
    },
    {
        input: "malloch",
        expected: "MLK1111111"
    },
    {
        input: "malone",
        expected: "MLN1111111"
    },
    {
        input: "maloney",
        expected: "MLNA111111"
    },
    {
        input: "malthus",
        expected: "MTS1111111"
    },
    {
        input: "maltravers",
        expected: "MTRFS11111"
    },
    {
        input: "malvena",
        expected: "MFNA111111"
    },
    {
        input: "mamie",
        expected: "MMA1111111"
    },
    {
        input: "mana",
        expected: "MNA1111111"
    },
    {
        input: "manallack",
        expected: "MNLK111111"
    },
    {
        input: "manaton",
        expected: "MNTN111111"
    },
    {
        input: "mander",
        expected: "MNTA111111"
    },
    {
        input: "manderson",
        expected: "MNTSN11111"
    },
    {
        input: "manes",
        expected: "MNS1111111"
    },
    {
        input: "mangan",
        expected: "MNKN111111"
    },
    {
        input: "mangin",
        expected: "MNKN111111"
    },
    {
        input: "manie",
        expected: "MNA1111111"
    },
    {
        input: "manion",
        expected: "MNN1111111"
    },
    {
        input: "manley",
        expected: "MNLA111111"
    },
    {
        input: "manlove",
        expected: "MNLF111111"
    },
    {
        input: "mann",
        expected: "MN11111111"
    },
    {
        input: "mannin",
        expected: "MNN1111111"
    },
    {
        input: "manning",
        expected: "MNNK111111"
    },
    {
        input: "mannix",
        expected: "MNK1111111"
    },
    {
        input: "mano",
        expected: "MNA1111111"
    },
    {
        input: "mansell",
        expected: "MNSA111111"
    },
    {
        input: "mansfield",
        expected: "MNSFT11111"
    },
    {
        input: "manson",
        expected: "MNSN111111"
    },
    {
        input: "mantell",
        expected: "MNTA111111"
    },
    {
        input: "maples",
        expected: "MPLS111111"
    },
    {
        input: "marah",
        expected: "MRA1111111"
    },
    {
        input: "marama",
        expected: "MRMA111111"
    },
    {
        input: "maraval",
        expected: "MRFA111111"
    },
    {
        input: "marcella",
        expected: "MSLA111111"
    },
    {
        input: "marcelle",
        expected: "MSA1111111"
    },
    {
        input: "marchant",
        expected: "MKNT111111"
    },
    {
        input: "marcia",
        expected: "MSA1111111"
    },
    {
        input: "marcus",
        expected: "MKS1111111"
    },
    {
        input: "marcussen",
        expected: "MKSN111111"
    },
    {
        input: "mardon",
        expected: "MTN1111111"
    },
    {
        input: "marechal",
        expected: "MRKA111111"
    },
    {
        input: "maree",
        expected: "MRA1111111"
    },
    {
        input: "marett",
        expected: "MRT1111111"
    },
    {
        input: "maretta",
        expected: "MRTA111111"
    },
    {
        input: "marette",
        expected: "MRT1111111"
    },
    {
        input: "margaret",
        expected: "MKRT111111"
    },
    {
        input: "margareta",
        expected: "MKRTA11111"
    },
    {
        input: "margarete",
        expected: "MKRT111111"
    },
    {
        input: "margarett",
        expected: "MKRT111111"
    },
    {
        input: "margaretta",
        expected: "MKRTA11111"
    },
    {
        input: "margarita",
        expected: "MKRTA11111"
    },
    {
        input: "margarretta",
        expected: "MKRTA11111"
    },
    {
        input: "margerett",
        expected: "MKRT111111"
    },
    {
        input: "margerie",
        expected: "MKRA111111"
    },
    {
        input: "margerite",
        expected: "MKRT111111"
    },
    {
        input: "margery",
        expected: "MKRA111111"
    },
    {
        input: "margeurite",
        expected: "MKRT111111"
    },
    {
        input: "margharita",
        expected: "MRTA111111"
    },
    {
        input: "margherita",
        expected: "MRTA111111"
    },
    {
        input: "margie",
        expected: "MKA1111111"
    },
    {
        input: "margorie",
        expected: "MKRA111111"
    },
    {
        input: "margory",
        expected: "MKRA111111"
    },
    {
        input: "margretta",
        expected: "MKRTA11111"
    },
    {
        input: "marguereta",
        expected: "MKRTA11111"
    },
    {
        input: "margueretta",
        expected: "MKRTA11111"
    },
    {
        input: "marguerita",
        expected: "MKRTA11111"
    },
    {
        input: "marguerite",
        expected: "MKRT111111"
    },
    {
        input: "margurerite",
        expected: "MKRRT11111"
    },
    {
        input: "maria",
        expected: "MRA1111111"
    },
    {
        input: "mariam",
        expected: "MRM1111111"
    },
    {
        input: "marian",
        expected: "MRN1111111"
    },
    {
        input: "marianne",
        expected: "MRN1111111"
    },
    {
        input: "maribel",
        expected: "MRPA111111"
    },
    {
        input: "marica",
        expected: "MRKA111111"
    },
    {
        input: "marie",
        expected: "MRA1111111"
    },
    {
        input: "marieta",
        expected: "MRTA111111"
    },
    {
        input: "marina",
        expected: "MRNA111111"
    },
    {
        input: "marion",
        expected: "MRN1111111"
    },
    {
        input: "maris",
        expected: "MRS1111111"
    },
    {
        input: "marita",
        expected: "MRTA111111"
    },
    {
        input: "marius",
        expected: "MRS1111111"
    },
    {
        input: "marjorie",
        expected: "MRRA111111"
    },
    {
        input: "marjorio",
        expected: "MRRA111111"
    },
    {
        input: "marjory",
        expected: "MRRA111111"
    },
    {
        input: "mark",
        expected: "MK11111111"
    },
    {
        input: "markby",
        expected: "MKPA111111"
    },
    {
        input: "markham",
        expected: "MKM1111111"
    },
    {
        input: "markland",
        expected: "MKLNT11111"
    },
    {
        input: "marks",
        expected: "MKS1111111"
    },
    {
        input: "marlovv",
        expected: "MLF1111111"
    },
    {
        input: "marlow",
        expected: "MLA1111111"
    },
    {
        input: "marmaduke",
        expected: "MMTK111111"
    },
    {
        input: "marple",
        expected: "MPA1111111"
    },
    {
        input: "marr",
        expected: "MA11111111"
    },
    {
        input: "marrah",
        expected: "MRA1111111"
    },
    {
        input: "marrett",
        expected: "MRT1111111"
    },
    {
        input: "marrette",
        expected: "MRT1111111"
    },
    {
        input: "marriage",
        expected: "MRK1111111"
    },
    {
        input: "marrian",
        expected: "MRN1111111"
    },
    {
        input: "marriner",
        expected: "MRNA111111"
    },
    {
        input: "marriott",
        expected: "MRT1111111"
    },
    {
        input: "marris",
        expected: "MRS1111111"
    },
    {
        input: "marrison",
        expected: "MRSN111111"
    },
    {
        input: "marryatt",
        expected: "MRT1111111"
    },
    {
        input: "marsden",
        expected: "MSTN111111"
    },
    {
        input: "marsella",
        expected: "MSLA111111"
    },
    {
        input: "marsh",
        expected: "MS11111111"
    },
    {
        input: "marshall",
        expected: "MSA1111111"
    },
    {
        input: "marsllall",
        expected: "MSLA111111"
    },
    {
        input: "marson",
        expected: "MSN1111111"
    },
    {
        input: "marston",
        expected: "MSTN111111"
    },
    {
        input: "martha",
        expected: "MTA1111111"
    },
    {
        input: "martin",
        expected: "MTN1111111"
    },
    {
        input: "marton",
        expected: "MTN1111111"
    },
    {
        input: "marwick",
        expected: "MWK1111111"
    },
    {
        input: "mary",
        expected: "MRA1111111"
    },
    {
        input: "marychurch",
        expected: "MRKK111111"
    },
    {
        input: "mashers",
        expected: "MSS1111111"
    },
    {
        input: "masie",
        expected: "MSA1111111"
    },
    {
        input: "maskell",
        expected: "MSKA111111"
    },
    {
        input: "maskill",
        expected: "MSKA111111"
    },
    {
        input: "maskrey",
        expected: "MSKRA11111"
    },
    {
        input: "maslen",
        expected: "MSLN111111"
    },
    {
        input: "maslin",
        expected: "MSLN111111"
    },
    {
        input: "mason",
        expected: "MSN1111111"
    },
    {
        input: "massetti",
        expected: "MSTA111111"
    },
    {
        input: "massey",
        expected: "MSA1111111"
    },
    {
        input: "masson",
        expected: "MSN1111111"
    },
    {
        input: "masters",
        expected: "MSTS111111"
    },
    {
        input: "masterton",
        expected: "MSTTN11111"
    },
    {
        input: "mata",
        expected: "MTA1111111"
    },
    {
        input: "mataura",
        expected: "MTRA111111"
    },
    {
        input: "mathea",
        expected: "MTA1111111"
    },
    {
        input: "mather",
        expected: "MTA1111111"
    },
    {
        input: "mathers",
        expected: "MTS1111111"
    },
    {
        input: "matheson",
        expected: "MTSN111111"
    },
    {
        input: "mathew",
        expected: "MTA1111111"
    },
    {
        input: "mathews",
        expected: "MTS1111111"
    },
    {
        input: "mathewson",
        expected: "MTSN111111"
    },
    {
        input: "mathias",
        expected: "MTS1111111"
    },
    {
        input: "mathie",
        expected: "MTA1111111"
    },
    {
        input: "mathieson",
        expected: "MTSN111111"
    },
    {
        input: "mathina",
        expected: "MTNA111111"
    },
    {
        input: "mathison",
        expected: "MTSN111111"
    },
    {
        input: "matier",
        expected: "MTA1111111"
    },
    {
        input: "matilda",
        expected: "MTTA111111"
    },
    {
        input: "matlewson",
        expected: "MTLSN11111"
    },
    {
        input: "matravers",
        expected: "MTRFS11111"
    },
    {
        input: "matron",
        expected: "MTRN111111"
    },
    {
        input: "matthew",
        expected: "MTA1111111"
    },
    {
        input: "matthews",
        expected: "MTS1111111"
    },
    {
        input: "matthewson",
        expected: "MTSN111111"
    },
    {
        input: "mattie",
        expected: "MTA1111111"
    },
    {
        input: "mattingle",
        expected: "MTNKA11111"
    },
    {
        input: "mattingley",
        expected: "MTNKLA1111"
    },
    {
        input: "mattinglv",
        expected: "MTNKF11111"
    },
    {
        input: "mattingly",
        expected: "MTNKLA1111"
    },
    {
        input: "mattllews",
        expected: "MTLS111111"
    },
    {
        input: "mattson",
        expected: "MTSN111111"
    },
    {
        input: "matuschka",
        expected: "MTSKKA1111"
    },
    {
        input: "maubon",
        expected: "MPN1111111"
    },
    {
        input: "maud",
        expected: "MT11111111"
    },
    {
        input: "mauda",
        expected: "MTA1111111"
    },
    {
        input: "maude",
        expected: "MT11111111"
    },
    {
        input: "maudie",
        expected: "MTA1111111"
    },
    {
        input: "mauger",
        expected: "MKA1111111"
    },
    {
        input: "maunder",
        expected: "MNTA111111"
    },
    {
        input: "maurce",
        expected: "MK11111111"
    },
    {
        input: "maureen",
        expected: "MRN1111111"
    },
    {
        input: "maurice",
        expected: "MRK1111111"
    },
    {
        input: "maurie",
        expected: "MRA1111111"
    },
    {
        input: "mavbee",
        expected: "MFPA111111"
    },
    {
        input: "maving",
        expected: "MFNK111111"
    },
    {
        input: "mavis",
        expected: "MFS1111111"
    },
    {
        input: "mavora",
        expected: "MFRA111111"
    },
    {
        input: "maw",
        expected: "MA11111111"
    },
    {
        input: "mawer",
        expected: "MWA1111111"
    },
    {
        input: "mawhinney",
        expected: "MWNA111111"
    },
    {
        input: "mawson",
        expected: "MSN1111111"
    },
    {
        input: "max",
        expected: "MK11111111"
    },
    {
        input: "maxime",
        expected: "MKM1111111"
    },
    {
        input: "maxton",
        expected: "MKTN111111"
    },
    {
        input: "maxwell",
        expected: "MKWA111111"
    },
    {
        input: "may",
        expected: "MA11111111"
    },
    {
        input: "mayall",
        expected: "MA11111111"
    },
    {
        input: "maybee",
        expected: "MPA1111111"
    },
    {
        input: "mayda",
        expected: "MTA1111111"
    },
    {
        input: "maye",
        expected: "MA11111111"
    },
    {
        input: "mayer",
        expected: "MA11111111"
    },
    {
        input: "mayers",
        expected: "MS11111111"
    },
    {
        input: "mayfield",
        expected: "MFT1111111"
    },
    {
        input: "mayhew",
        expected: "MA11111111"
    },
    {
        input: "mayn",
        expected: "MN11111111"
    },
    {
        input: "maynard",
        expected: "MNT1111111"
    },
    {
        input: "mayne",
        expected: "MN11111111"
    },
    {
        input: "mayo",
        expected: "MA11111111"
    },
    {
        input: "mays",
        expected: "MS11111111"
    },
    {
        input: "mayston",
        expected: "MSTN111111"
    },
    {
        input: "maythal",
        expected: "MTA1111111"
    },
    {
        input: "mayvee",
        expected: "MFA1111111"
    },
    {
        input: "mayze",
        expected: "MS11111111"
    },
    {
        input: "mazey",
        expected: "MSA1111111"
    },
    {
        input: "mb",
        expected: "M111111111"
    },
    {
        input: "mbmb",
        expected: "MPM1111111"
    },
    {
        input: "mcadam",
        expected: "MKTM111111"
    },
    {
        input: "mcade",
        expected: "MKT1111111"
    },
    {
        input: "mcadie",
        expected: "MKTA111111"
    },
    {
        input: "mcalister",
        expected: "MKLSTA1111"
    },
    {
        input: "mcallan",
        expected: "MKLN111111"
    },
    {
        input: "mcallen",
        expected: "MKLN111111"
    },
    {
        input: "mcalliste",
        expected: "MKLST11111"
    },
    {
        input: "mcallister",
        expected: "MKLSTA1111"
    },
    {
        input: "mcalpine",
        expected: "MKPN111111"
    },
    {
        input: "mcanally",
        expected: "MKNLA11111"
    },
    {
        input: "mcansh",
        expected: "MKNS111111"
    },
    {
        input: "mcanulty",
        expected: "MKNTA11111"
    },
    {
        input: "mcara",
        expected: "MKRA111111"
    },
    {
        input: "mcarley",
        expected: "MKLA111111"
    },
    {
        input: "mcarthur",
        expected: "MKTA111111"
    },
    {
        input: "mcartney",
        expected: "MKTNA11111"
    },
    {
        input: "mcatamney",
        expected: "MKTMNA1111"
    },
    {
        input: "mcateer",
        expected: "MKTA111111"
    },
    {
        input: "mcaulay",
        expected: "MKLA111111"
    },
    {
        input: "mcauley",
        expected: "MKLA111111"
    },
    {
        input: "mcauliff",
        expected: "MKLF111111"
    },
    {
        input: "mcauliffe",
        expected: "MKLF111111"
    },
    {
        input: "mcauslin",
        expected: "MKSLN11111"
    },
    {
        input: "mcbain",
        expected: "MKPN111111"
    },
    {
        input: "mcbeath",
        expected: "MKPT111111"
    },
    {
        input: "mcbetah",
        expected: "MKPTA11111"
    },
    {
        input: "mcbeth",
        expected: "MKPT111111"
    },
    {
        input: "mcbey",
        expected: "MKPA111111"
    },
    {
        input: "mcbricle",
        expected: "MKPRKA1111"
    },
    {
        input: "mcbride",
        expected: "MKPRT11111"
    },
    {
        input: "mcbryde",
        expected: "MKPRT11111"
    },
    {
        input: "mccabe",
        expected: "MKP1111111"
    },
    {
        input: "mccafferty",
        expected: "MKFTA11111"
    },
    {
        input: "mccaffry",
        expected: "MKFRA11111"
    },
    {
        input: "mccaig",
        expected: "MKK1111111"
    },
    {
        input: "mccall",
        expected: "MKA1111111"
    },
    {
        input: "mccallion",
        expected: "MKLN111111"
    },
    {
        input: "mccallum",
        expected: "MKLM111111"
    },
    {
        input: "mccalman",
        expected: "MKMN111111"
    },
    {
        input: "mccambie",
        expected: "MKMPA11111"
    },
    {
        input: "mccammon",
        expected: "MKMN111111"
    },
    {
        input: "mccann",
        expected: "MKN1111111"
    },
    {
        input: "mccardell",
        expected: "MKTA111111"
    },
    {
        input: "mccarrigan",
        expected: "MKRKN11111"
    },
    {
        input: "mccarten",
        expected: "MKTN111111"
    },
    {
        input: "mccarter",
        expected: "MKTA111111"
    },
    {
        input: "mccarthy",
        expected: "MKTA111111"
    },
    {
        input: "mccartney",
        expected: "MKTNA11111"
    },
    {
        input: "mccarty",
        expected: "MKTA111111"
    },
    {
        input: "mccash",
        expected: "MKS1111111"
    },
    {
        input: "mccaskill",
        expected: "MKSKA11111"
    },
    {
        input: "mccaughan",
        expected: "MKKN111111"
    },
    {
        input: "mccaul",
        expected: "MKA1111111"
    },
    {
        input: "mccauley",
        expected: "MKLA111111"
    },
    {
        input: "mccauseland",
        expected: "MKSLNT1111"
    },
    {
        input: "mccausland",
        expected: "MKSLNT1111"
    },
    {
        input: "mccaw",
        expected: "MKA1111111"
    },
    {
        input: "mccawe",
        expected: "MKA1111111"
    },
    {
        input: "mccay",
        expected: "MKA1111111"
    },
    {
        input: "mcchesney",
        expected: "MKSNA11111"
    },
    {
        input: "mccielland",
        expected: "MKSLNT1111"
    },
    {
        input: "mcciue",
        expected: "MKSA111111"
    },
    {
        input: "mcclatchv",
        expected: "MKLKF11111"
    },
    {
        input: "mcclatchy",
        expected: "MKLKA11111"
    },
    {
        input: "mcclean",
        expected: "MKLN111111"
    },
    {
        input: "mccleery",
        expected: "MKLRA11111"
    },
    {
        input: "mcclelland",
        expected: "MKLLNT1111"
    },
    {
        input: "mcclenaghan",
        expected: "MKLNKN1111"
    },
    {
        input: "mcclintock",
        expected: "MKLNTK1111"
    },
    {
        input: "mcclue",
        expected: "MKLA111111"
    },
    {
        input: "mccluggage",
        expected: "MKLKK11111"
    },
    {
        input: "mcclure",
        expected: "MKLA111111"
    },
    {
        input: "mccluskey",
        expected: "MKLSKA1111"
    },
    {
        input: "mcclusky",
        expected: "MKLSKA1111"
    },
    {
        input: "mcclymont",
        expected: "MKLMNT1111"
    },
    {
        input: "mccoll",
        expected: "MKA1111111"
    },
    {
        input: "mccolloch",
        expected: "MKLK111111"
    },
    {
        input: "mccolluch",
        expected: "MKLK111111"
    },
    {
        input: "mccombe",
        expected: "MKM1111111"
    },
    {
        input: "mccombie",
        expected: "MKMPA11111"
    },
    {
        input: "mcconechy",
        expected: "MKNKA11111"
    },
    {
        input: "mcconnachie",
        expected: "MKNKA11111"
    },
    {
        input: "mcconnel",
        expected: "MKNA111111"
    },
    {
        input: "mcconnell",
        expected: "MKNA111111"
    },
    {
        input: "mcconnichie",
        expected: "MKNKA11111"
    },
    {
        input: "mcconnochi",
        expected: "MKNKA11111"
    },
    {
        input: "mcconnochie",
        expected: "MKNKA11111"
    },
    {
        input: "mcconnohie",
        expected: "MKNA111111"
    },
    {
        input: "mccord",
        expected: "MKT1111111"
    },
    {
        input: "mccorie",
        expected: "MKRA111111"
    },
    {
        input: "mccorkinda",
        expected: "MKKNTA1111"
    },
    {
        input: "mccorkindale",
        expected: "MKKNTA1111"
    },
    {
        input: "mccorkingdale",
        expected: "MKKNKTA111"
    },
    {
        input: "mccormack",
        expected: "MKMK111111"
    },
    {
        input: "mccormacl",
        expected: "MKMKA11111"
    },
    {
        input: "mccormick",
        expected: "MKMK111111"
    },
    {
        input: "mccort",
        expected: "MKT1111111"
    },
    {
        input: "mccowan",
        expected: "MKWN111111"
    },
    {
        input: "mccoy",
        expected: "MKA1111111"
    },
    {
        input: "mccracken",
        expected: "MKRKN11111"
    },
    {
        input: "mccreadie",
        expected: "MKRTA11111"
    },
    {
        input: "mccreath",
        expected: "MKRT111111"
    },
    {
        input: "mccrindle",
        expected: "MKRNTA1111"
    },
    {
        input: "mccrone",
        expected: "MKRN111111"
    },
    {
        input: "mccrorie",
        expected: "MKRRA11111"
    },
    {
        input: "mccrory",
        expected: "MKRRA11111"
    },
    {
        input: "mccrossan",
        expected: "MKRSN11111"
    },
    {
        input: "mccrossin",
        expected: "MKRSN11111"
    },
    {
        input: "mccubbin",
        expected: "MKPN111111"
    },
    {
        input: "mcculloch",
        expected: "MKLK111111"
    },
    {
        input: "mccullock",
        expected: "MKLK111111"
    },
    {
        input: "mccullough",
        expected: "MKLA111111"
    },
    {
        input: "mccune",
        expected: "MKN1111111"
    },
    {
        input: "mccunn",
        expected: "MKN1111111"
    },
    {
        input: "mccurdie",
        expected: "MKTA111111"
    },
    {
        input: "mccurdy",
        expected: "MKTA111111"
    },
    {
        input: "mccurrach",
        expected: "MKRK111111"
    },
    {
        input: "mccurrie",
        expected: "MKRA111111"
    },
    {
        input: "mccusker",
        expected: "MKSKA11111"
    },
    {
        input: "mccuskey",
        expected: "MKSKA11111"
    },
    {
        input: "mccutcheon",
        expected: "MKKN111111"
    },
    {
        input: "mcdermid",
        expected: "MKTMT11111"
    },
    {
        input: "mcdermitt",
        expected: "MKTMT11111"
    },
    {
        input: "mcdermott",
        expected: "MKTMT11111"
    },
    {
        input: "mcdevitt",
        expected: "MKTFT11111"
    },
    {
        input: "mcdiarmid",
        expected: "MKTMT11111"
    },
    {
        input: "mcdonald",
        expected: "MKTNT11111"
    },
    {
        input: "mcdonall",
        expected: "MKTNA11111"
    },
    {
        input: "mcdonell",
        expected: "MKTNA11111"
    },
    {
        input: "mcdonnell",
        expected: "MKTNA11111"
    },
    {
        input: "mcdouall",
        expected: "MKTA111111"
    },
    {
        input: "mcdougall",
        expected: "MKTKA11111"
    },
    {
        input: "mcdowall",
        expected: "MKTWA11111"
    },
    {
        input: "mcdowell",
        expected: "MKTWA11111"
    },
    {
        input: "mcduff",
        expected: "MKTF111111"
    },
    {
        input: "mceachern",
        expected: "MSKN111111"
    },
    {
        input: "mceachran",
        expected: "MSKRN11111"
    },
    {
        input: "mceay",
        expected: "MSA1111111"
    },
    {
        input: "mcelhenny",
        expected: "MSNA111111"
    },
    {
        input: "mcelivee",
        expected: "MSLFA11111"
    },
    {
        input: "mcelroy",
        expected: "MSRA111111"
    },
    {
        input: "mceneany",
        expected: "MSNNA11111"
    },
    {
        input: "mcentee",
        expected: "MSNTA11111"
    },
    {
        input: "mcevoy",
        expected: "MSFA111111"
    },
    {
        input: "mcewan",
        expected: "MSWN111111"
    },
    {
        input: "mcewen",
        expected: "MSWN111111"
    },
    {
        input: "mcfadden",
        expected: "MKFTN11111"
    },
    {
        input: "mcfadgen",
        expected: "MKFKN11111"
    },
    {
        input: "mcfadyen",
        expected: "MKFTN11111"
    },
    {
        input: "mcfadzen",
        expected: "MKFTSN1111"
    },
    {
        input: "mcfarlane",
        expected: "MKFLN11111"
    },
    {
        input: "mcfaull",
        expected: "MKFA111111"
    },
    {
        input: "mcfeeters",
        expected: "MKFTS11111"
    },
    {
        input: "mcfelin",
        expected: "MKFLN11111"
    },
    {
        input: "mcfetridge",
        expected: "MKFTRK1111"
    },
    {
        input: "mcfie",
        expected: "MKFA111111"
    },
    {
        input: "mcgahan",
        expected: "MKN1111111"
    },
    {
        input: "mcgarrigle",
        expected: "MKRKA11111"
    },
    {
        input: "mcgarry",
        expected: "MKRA111111"
    },
    {
        input: "mcgavick",
        expected: "MKFK111111"
    },
    {
        input: "mcgavin",
        expected: "MKFN111111"
    },
    {
        input: "mcgaw",
        expected: "MKA1111111"
    },
    {
        input: "mcgee",
        expected: "MKA1111111"
    },
    {
        input: "mcgeorge",
        expected: "MKK1111111"
    },
    {
        input: "mcgetrick",
        expected: "MKTRK11111"
    },
    {
        input: "mcgettigan",
        expected: "MKTKN11111"
    },
    {
        input: "mcghee",
        expected: "MKA1111111"
    },
    {
        input: "mcghie",
        expected: "MKA1111111"
    },
    {
        input: "mcgill",
        expected: "MKA1111111"
    },
    {
        input: "mcgill brown",
        expected: "MKPRN11111"
    },
    {
        input: "mcgill-bro",
        expected: "MKPRA11111"
    },
    {
        input: "mcgill-brown",
        expected: "MKPRN11111"
    },
    {
        input: "mcgillivary",
        expected: "MKLFRA1111"
    },
    {
        input: "mcgilvary",
        expected: "MKFRA11111"
    },
    {
        input: "mcgilvray",
        expected: "MKFRA11111"
    },
    {
        input: "mcgimpsey",
        expected: "MKMPSA1111"
    },
    {
        input: "mcginness",
        expected: "MKNS111111"
    },
    {
        input: "mcginty",
        expected: "MKNTA11111"
    },
    {
        input: "mcgirr",
        expected: "MKA1111111"
    },
    {
        input: "mcgirt",
        expected: "MKT1111111"
    },
    {
        input: "mcglashan",
        expected: "MKLSN11111"
    },
    {
        input: "mcgllie",
        expected: "MKLA111111"
    },
    {
        input: "mcgoldrick",
        expected: "MKTRK11111"
    },
    {
        input: "mcgolligal",
        expected: "MKLKA11111"
    },
    {
        input: "mcgonigal",
        expected: "MKNKA11111"
    },
    {
        input: "mcgoogan",
        expected: "MKKN111111"
    },
    {
        input: "mcgoun",
        expected: "MKN1111111"
    },
    {
        input: "mcgoverne",
        expected: "MKFN111111"
    },
    {
        input: "mcgowan",
        expected: "MKWN111111"
    },
    {
        input: "mcgradie",
        expected: "MKRTA11111"
    },
    {
        input: "mcgrath",
        expected: "MKRT111111"
    },
    {
        input: "mcgregor",
        expected: "MKRKA11111"
    },
    {
        input: "mcgriffiths",
        expected: "MKRFTS1111"
    },
    {
        input: "mcguckin",
        expected: "MKKN111111"
    },
    {
        input: "mcguffie",
        expected: "MKFA111111"
    },
    {
        input: "mcguigan",
        expected: "MKKN111111"
    },
    {
        input: "mcguire",
        expected: "MKA1111111"
    },
    {
        input: "mchardy",
        expected: "MKTA111111"
    },
    {
        input: "mcharry",
        expected: "MKRA111111"
    },
    {
        input: "mchealy",
        expected: "MKLA111111"
    },
    {
        input: "mchenry",
        expected: "MKNRA11111"
    },
    {
        input: "mchoull",
        expected: "MKA1111111"
    },
    {
        input: "mchugh",
        expected: "MKA1111111"
    },
    {
        input: "mchutchcson",
        expected: "MKKKSN1111"
    },
    {
        input: "mchutcheson",
        expected: "MKKSN11111"
    },
    {
        input: "mchutchon",
        expected: "MKKN111111"
    },
    {
        input: "mciachlan",
        expected: "MSKLN11111"
    },
    {
        input: "mciaren",
        expected: "MSRN111111"
    },
    {
        input: "mciean",
        expected: "MSN1111111"
    },
    {
        input: "mcielland",
        expected: "MSLNT11111"
    },
    {
        input: "mcieod",
        expected: "MST1111111"
    },
    {
        input: "mciintyre",
        expected: "MSNTA11111"
    },
    {
        input: "mcilroy",
        expected: "MSRA111111"
    },
    {
        input: "mcindoe",
        expected: "MSNTA11111"
    },
    {
        input: "mcinerney",
        expected: "MSNNA11111"
    },
    {
        input: "mcinnes",
        expected: "MSNS111111"
    },
    {
        input: "mcintosh",
        expected: "MSNTS11111"
    },
    {
        input: "mcintosn",
        expected: "MSNTSN1111"
    },
    {
        input: "mcintyre",
        expected: "MSNTA11111"
    },
    {
        input: "mcisaac",
        expected: "MSSK111111"
    },
    {
        input: "mciver",
        expected: "MSFA111111"
    },
    {
        input: "mcivor",
        expected: "MSFA111111"
    },
    {
        input: "mckague",
        expected: "MKKA111111"
    },
    {
        input: "mckane",
        expected: "MKN1111111"
    },
    {
        input: "mckay",
        expected: "MKA1111111"
    },
    {
        input: "mckaye",
        expected: "MKA1111111"
    },
    {
        input: "mckean",
        expected: "MKN1111111"
    },
    {
        input: "mckeand",
        expected: "MKNT111111"
    },
    {
        input: "mckeay",
        expected: "MKA1111111"
    },
    {
        input: "mckechie",
        expected: "MKKA111111"
    },
    {
        input: "mckechnie",
        expected: "MKKNA11111"
    },
    {
        input: "mckecknie",
        expected: "MKKNA11111"
    },
    {
        input: "mckee",
        expected: "MKA1111111"
    },
    {
        input: "mckeefry",
        expected: "MKFRA11111"
    },
    {
        input: "mckeeiry",
        expected: "MKRA111111"
    },
    {
        input: "mckeeman",
        expected: "MKMN111111"
    },
    {
        input: "mckeen",
        expected: "MKN1111111"
    },
    {
        input: "mckeenan",
        expected: "MKNN111111"
    },
    {
        input: "mckeich",
        expected: "MKK1111111"
    },
    {
        input: "mckellar",
        expected: "MKLA111111"
    },
    {
        input: "mckelvey",
        expected: "MKFA111111"
    },
    {
        input: "mckelvie",
        expected: "MKFA111111"
    },
    {
        input: "mckendry",
        expected: "MKNTRA1111"
    },
    {
        input: "mckenna",
        expected: "MKNA111111"
    },
    {
        input: "mckenney",
        expected: "MKNA111111"
    },
    {
        input: "mckenzie",
        expected: "MKNSA11111"
    },
    {
        input: "mckeown",
        expected: "MKN1111111"
    },
    {
        input: "mckernan",
        expected: "MKNN111111"
    },
    {
        input: "mckerras",
        expected: "MKRS111111"
    },
    {
        input: "mckerrow",
        expected: "MKRA111111"
    },
    {
        input: "mckessar",
        expected: "MKSA111111"
    },
    {
        input: "mcketterick",
        expected: "MKTRK11111"
    },
    {
        input: "mckewell",
        expected: "MKWA111111"
    },
    {
        input: "mckewen",
        expected: "MKWN111111"
    },
    {
        input: "mckey",
        expected: "MKA1111111"
    },
    {
        input: "mckibbin",
        expected: "MKPN111111"
    },
    {
        input: "mckie",
        expected: "MKA1111111"
    },
    {
        input: "mckillop",
        expected: "MKLP111111"
    },
    {
        input: "mckinlay",
        expected: "MKNLA11111"
    },
    {
        input: "mckinley",
        expected: "MKNLA11111"
    },
    {
        input: "mckinnel",
        expected: "MKNA111111"
    },
    {
        input: "mckinney",
        expected: "MKNA111111"
    },
    {
        input: "mckinnie",
        expected: "MKNA111111"
    },
    {
        input: "mckinnon",
        expected: "MKNN111111"
    },
    {
        input: "mckirdy",
        expected: "MKTA111111"
    },
    {
        input: "mckissock",
        expected: "MKSK111111"
    },
    {
        input: "mckitterick",
        expected: "MKTRK11111"
    },
    {
        input: "mcknight",
        expected: "MKNT111111"
    },
    {
        input: "mckone",
        expected: "MKN1111111"
    },
    {
        input: "mclachlan",
        expected: "MKLKLN1111"
    },
    {
        input: "mclanachan",
        expected: "MKLNKN1111"
    },
    {
        input: "mclaren",
        expected: "MKLRN11111"
    },
    {
        input: "mclatchie",
        expected: "MKLKA11111"
    },
    {
        input: "mclauchan",
        expected: "MKLKN11111"
    },
    {
        input: "mclauchlan",
        expected: "MKLKLN1111"
    },
    {
        input: "mclauchlin",
        expected: "MKLKLN1111"
    },
    {
        input: "mclaughlan",
        expected: "MKLLN11111"
    },
    {
        input: "mclaughlin",
        expected: "MKLLN11111"
    },
    {
        input: "mclav",
        expected: "MKLF111111"
    },
    {
        input: "mclay",
        expected: "MKLA111111"
    },
    {
        input: "mclcan",
        expected: "MKKN111111"
    },
    {
        input: "mclean",
        expected: "MKLN111111"
    },
    {
        input: "mclear",
        expected: "MKLA111111"
    },
    {
        input: "mcleary",
        expected: "MKLRA11111"
    },
    {
        input: "mcleavey",
        expected: "MKLFA11111"
    },
    {
        input: "mcleay",
        expected: "MKLA111111"
    },
    {
        input: "mcledd",
        expected: "MKLT111111"
    },
    {
        input: "mcledowne",
        expected: "MKLTN11111"
    },
    {
        input: "mcledowney",
        expected: "MKLTNA1111"
    },
    {
        input: "mcleely",
        expected: "MKLLA11111"
    },
    {
        input: "mclellan",
        expected: "MKLLN11111"
    },
    {
        input: "mclelland",
        expected: "MKLLNT1111"
    },
    {
        input: "mclenaghin",
        expected: "MKLNKN1111"
    },
    {
        input: "mclennan",
        expected: "MKLNN11111"
    },
    {
        input: "mcleod",
        expected: "MKLT111111"
    },
    {
        input: "mclevie",
        expected: "MKLFA11111"
    },
    {
        input: "mclintock",
        expected: "MKLNTK1111"
    },
    {
        input: "mcliskey",
        expected: "MKLSKA1111"
    },
    {
        input: "mcllroy",
        expected: "MKRA111111"
    },
    {
        input: "mclndoe",
        expected: "MKNTA11111"
    },
    {
        input: "mclnnes",
        expected: "MKNS111111"
    },
    {
        input: "mclntosh",
        expected: "MKNTS11111"
    },
    {
        input: "mclntvre",
        expected: "MKNTFA1111"
    },
    {
        input: "mclntyre",
        expected: "MKNTA11111"
    },
    {
        input: "mcloud",
        expected: "MKLT111111"
    },
    {
        input: "mcloughlin",
        expected: "MKLLN11111"
    },
    {
        input: "mclure",
        expected: "MKLA111111"
    },
    {
        input: "mcluskey",
        expected: "MKLSKA1111"
    },
    {
        input: "mclusky",
        expected: "MKLSKA1111"
    },
    {
        input: "mclver",
        expected: "MKFA111111"
    },
    {
        input: "mclvor",
        expected: "MKFA111111"
    },
    {
        input: "mcmahon",
        expected: "MKMN111111"
    },
    {
        input: "mcmann",
        expected: "MKMN111111"
    },
    {
        input: "mcmannes",
        expected: "MKMNS11111"
    },
    {
        input: "mcmanus",
        expected: "MKMNS11111"
    },
    {
        input: "mcmaster",
        expected: "MKMSTA1111"
    },
    {
        input: "mcmath",
        expected: "MKMT111111"
    },
    {
        input: "mcmeeking",
        expected: "MKMKNK1111"
    },
    {
        input: "mcmillan",
        expected: "MKMLN11111"
    },
    {
        input: "mcmillen",
        expected: "MKMLN11111"
    },
    {
        input: "mcminn",
        expected: "MKMN111111"
    },
    {
        input: "mcmorran",
        expected: "MKMRN11111"
    },
    {
        input: "mcmulen",
        expected: "MKMLN11111"
    },
    {
        input: "mcmullan",
        expected: "MKMLN11111"
    },
    {
        input: "mcmullen",
        expected: "MKMLN11111"
    },
    {
        input: "mcmurray",
        expected: "MKMRA11111"
    },
    {
        input: "mcmurtrie",
        expected: "MKMTRA1111"
    },
    {
        input: "mcnab",
        expected: "MKNP111111"
    },
    {
        input: "mcnair",
        expected: "MKNA111111"
    },
    {
        input: "mcnally",
        expected: "MKNLA11111"
    },
    {
        input: "mcnalty",
        expected: "MKNTA11111"
    },
    {
        input: "mcnama",
        expected: "MKNMA11111"
    },
    {
        input: "mcnamara",
        expected: "MKNMRA1111"
    },
    {
        input: "mcnamee",
        expected: "MKNMA11111"
    },
    {
        input: "mcnarey",
        expected: "MKNRA11111"
    },
    {
        input: "mcnarry",
        expected: "MKNRA11111"
    },
    {
        input: "mcnatty",
        expected: "MKNTA11111"
    },
    {
        input: "mcnaught",
        expected: "MKNT111111"
    },
    {
        input: "mcnaughton",
        expected: "MKNTN11111"
    },
    {
        input: "mcnauglton",
        expected: "MKNKTN1111"
    },
    {
        input: "mcnee",
        expected: "MKNA111111"
    },
    {
        input: "mcneil",
        expected: "MKNA111111"
    },
    {
        input: "mcneill",
        expected: "MKNA111111"
    },
    {
        input: "mcneish",
        expected: "MKNS111111"
    },
    {
        input: "mcnicol",
        expected: "MKNKA11111"
    },
    {
        input: "mcnicoll",
        expected: "MKNKA11111"
    },
    {
        input: "mcnie",
        expected: "MKNA111111"
    },
    {
        input: "mcniel",
        expected: "MKNA111111"
    },
    {
        input: "mcnish",
        expected: "MKNS111111"
    },
    {
        input: "mcnoe",
        expected: "MKNA111111"
    },
    {
        input: "mcnulty",
        expected: "MKNTA11111"
    },
    {
        input: "mcnultz",
        expected: "MKNTS11111"
    },
    {
        input: "mconie",
        expected: "MKNA111111"
    },
    {
        input: "mcouarrie",
        expected: "MKRA111111"
    },
    {
        input: "mcoueen",
        expected: "MKN1111111"
    },
    {
        input: "mcowan",
        expected: "MKWN111111"
    },
    {
        input: "mcpate",
        expected: "MKPT111111"
    },
    {
        input: "mcpeak",
        expected: "MKPK111111"
    },
    {
        input: "mcphail",
        expected: "MKFA111111"
    },
    {
        input: "mcpheat",
        expected: "MKFT111111"
    },
    {
        input: "mcphee",
        expected: "MKFA111111"
    },
    {
        input: "mcphersoll",
        expected: "MKFSA11111"
    },
    {
        input: "mcpherson",
        expected: "MKFSN11111"
    },
    {
        input: "mcquaid",
        expected: "MKT1111111"
    },
    {
        input: "mcquarrie",
        expected: "MKRA111111"
    },
    {
        input: "mcqueen",
        expected: "MKN1111111"
    },
    {
        input: "mcquilty",
        expected: "MKTA111111"
    },
    {
        input: "mcrae",
        expected: "MKRA111111"
    },
    {
        input: "mcritchie",
        expected: "MKRKA11111"
    },
    {
        input: "mcrobie",
        expected: "MKRPA11111"
    },
    {
        input: "mcrohie",
        expected: "MKRA111111"
    },
    {
        input: "mcshain",
        expected: "MKSN111111"
    },
    {
        input: "mcshaw",
        expected: "MKSA111111"
    },
    {
        input: "mcskimming",
        expected: "MKSKMNK111"
    },
    {
        input: "mcsoriley",
        expected: "MKSRLA1111"
    },
    {
        input: "mcsorlay",
        expected: "MKSLA11111"
    },
    {
        input: "mcsourley",
        expected: "MKSLA11111"
    },
    {
        input: "mcstay",
        expected: "MKSTA11111"
    },
    {
        input: "mcswan",
        expected: "MKSWN11111"
    },
    {
        input: "mcsweeney",
        expected: "MKSWNA1111"
    },
    {
        input: "mcsweeny",
        expected: "MKSWNA1111"
    },
    {
        input: "mctaggart",
        expected: "MKTKT11111"
    },
    {
        input: "mctagget",
        expected: "MKTKT11111"
    },
    {
        input: "mctaggett",
        expected: "MKTKT11111"
    },
    {
        input: "mctague",
        expected: "MKTKA11111"
    },
    {
        input: "mctainsh",
        expected: "MKTNS11111"
    },
    {
        input: "mctamney",
        expected: "MKTMNA1111"
    },
    {
        input: "mctavish",
        expected: "MKTFS11111"
    },
    {
        input: "mcternan",
        expected: "MKTNN11111"
    },
    {
        input: "mctigue",
        expected: "MKTKA11111"
    },
    {
        input: "mcveigh",
        expected: "MKFA111111"
    },
    {
        input: "mcvey",
        expected: "MKFA111111"
    },
    {
        input: "mcvicar",
        expected: "MKFKA11111"
    },
    {
        input: "mcvickar",
        expected: "MKFKA11111"
    },
    {
        input: "mcvicker",
        expected: "MKFKA11111"
    },
    {
        input: "mcvie",
        expected: "MKFA111111"
    },
    {
        input: "mcwatt",
        expected: "MKWT111111"
    },
    {
        input: "mcwen",
        expected: "MKWN111111"
    },
    {
        input: "mcwilliam",
        expected: "MKWLM11111"
    },
    {
        input: "mcwillian",
        expected: "MKWLN11111"
    },
    {
        input: "mead",
        expected: "MT11111111"
    },
    {
        input: "meade",
        expected: "MT11111111"
    },
    {
        input: "meadowcroft",
        expected: "MTKRFT1111"
    },
    {
        input: "meadows",
        expected: "MTS1111111"
    },
    {
        input: "mearns",
        expected: "MNS1111111"
    },
    {
        input: "mears",
        expected: "MS11111111"
    },
    {
        input: "mechaelis",
        expected: "MKLS111111"
    },
    {
        input: "mechen",
        expected: "MKN1111111"
    },
    {
        input: "mecracken",
        expected: "MKRKN11111"
    },
    {
        input: "meda",
        expected: "MTA1111111"
    },
    {
        input: "medder",
        expected: "MTA1111111"
    },
    {
        input: "meder",
        expected: "MTA1111111"
    },
    {
        input: "medhurst",
        expected: "MTST111111"
    },
    {
        input: "medley",
        expected: "MTLA111111"
    },
    {
        input: "medlicott",
        expected: "MTLKT11111"
    },
    {
        input: "medlin",
        expected: "MTLN111111"
    },
    {
        input: "mee",
        expected: "MA11111111"
    },
    {
        input: "meehan",
        expected: "MN11111111"
    },
    {
        input: "meek",
        expected: "MK11111111"
    },
    {
        input: "meekin",
        expected: "MKN1111111"
    },
    {
        input: "meekison",
        expected: "MKSN111111"
    },
    {
        input: "meeks",
        expected: "MKS1111111"
    },
    {
        input: "meenan",
        expected: "MNN1111111"
    },
    {
        input: "meevoy",
        expected: "MFA1111111"
    },
    {
        input: "mefarlane",
        expected: "MFLN111111"
    },
    {
        input: "meffan",
        expected: "MFN1111111"
    },
    {
        input: "mefie",
        expected: "MFA1111111"
    },
    {
        input: "mehalski",
        expected: "MSKA111111"
    },
    {
        input: "meighan",
        expected: "MKN1111111"
    },
    {
        input: "meikle",
        expected: "MKA1111111"
    },
    {
        input: "meiklejohn",
        expected: "MKLN111111"
    },
    {
        input: "meiklejolm",
        expected: "MKLM111111"
    },
    {
        input: "meikljohn",
        expected: "MKLN111111"
    },
    {
        input: "meinung",
        expected: "MNNK111111"
    },
    {
        input: "meivor",
        expected: "MFA1111111"
    },
    {
        input: "mekee",
        expected: "MKA1111111"
    },
    {
        input: "mekenzie",
        expected: "MKNSA11111"
    },
    {
        input: "melanie",
        expected: "MLNA111111"
    },
    {
        input: "melba",
        expected: "MPA1111111"
    },
    {
        input: "meldrum",
        expected: "MTRM111111"
    },
    {
        input: "melean",
        expected: "MLN1111111"
    },
    {
        input: "melen",
        expected: "MLN1111111"
    },
    {
        input: "melhop",
        expected: "MP11111111"
    },
    {
        input: "melia",
        expected: "MLA1111111"
    },
    {
        input: "melitus",
        expected: "MLTS111111"
    },
    {
        input: "melladew",
        expected: "MLTA111111"
    },
    {
        input: "mellars",
        expected: "MLS1111111"
    },
    {
        input: "mellett",
        expected: "MLT1111111"
    },
    {
        input: "mellon",
        expected: "MLN1111111"
    },
    {
        input: "mellor",
        expected: "MLA1111111"
    },
    {
        input: "melrose",
        expected: "MRS1111111"
    },
    {
        input: "melser",
        expected: "MSA1111111"
    },
    {
        input: "melton",
        expected: "MTN1111111"
    },
    {
        input: "melva",
        expected: "MFA1111111"
    },
    {
        input: "melville",
        expected: "MFA1111111"
    },
    {
        input: "melvin",
        expected: "MFN1111111"
    },
    {
        input: "melvlle",
        expected: "MFA1111111"
    },
    {
        input: "melvyn",
        expected: "MFN1111111"
    },
    {
        input: "mena",
        expected: "MNA1111111"
    },
    {
        input: "mendelsohn",
        expected: "MNTSN11111"
    },
    {
        input: "mendoza",
        expected: "MNTSA11111"
    },
    {
        input: "menhinick",
        expected: "MNNK111111"
    },
    {
        input: "menia",
        expected: "MNA1111111"
    },
    {
        input: "menlove",
        expected: "MNLF111111"
    },
    {
        input: "menry",
        expected: "MNRA111111"
    },
    {
        input: "menton",
        expected: "MNTN111111"
    },
    {
        input: "menzie",
        expected: "MNSA111111"
    },
    {
        input: "menzies",
        expected: "MNSS111111"
    },
    {
        input: "mera",
        expected: "MRA1111111"
    },
    {
        input: "mercedes",
        expected: "MSTS111111"
    },
    {
        input: "mercer",
        expected: "MSA1111111"
    },
    {
        input: "merchant",
        expected: "MKNT111111"
    },
    {
        input: "mercia",
        expected: "MSA1111111"
    },
    {
        input: "mercier",
        expected: "MSA1111111"
    },
    {
        input: "mercy",
        expected: "MSA1111111"
    },
    {
        input: "meredith",
        expected: "MRTT111111"
    },
    {
        input: "merian",
        expected: "MRN1111111"
    },
    {
        input: "merle",
        expected: "MA11111111"
    },
    {
        input: "merlin",
        expected: "MLN1111111"
    },
    {
        input: "merrial",
        expected: "MRA1111111"
    },
    {
        input: "merrie",
        expected: "MRA1111111"
    },
    {
        input: "merrin",
        expected: "MRN1111111"
    },
    {
        input: "merry",
        expected: "MRA1111111"
    },
    {
        input: "merton",
        expected: "MTN1111111"
    },
    {
        input: "mervyn",
        expected: "MFN1111111"
    },
    {
        input: "meryl",
        expected: "MRA1111111"
    },
    {
        input: "meryle",
        expected: "MRA1111111"
    },
    {
        input: "messenger",
        expected: "MSNKA11111"
    },
    {
        input: "messent",
        expected: "MSNT111111"
    },
    {
        input: "messer",
        expected: "MSA1111111"
    },
    {
        input: "meston",
        expected: "MSTN111111"
    },
    {
        input: "met",
        expected: "MT11111111"
    },
    {
        input: "meta",
        expected: "MTA1111111"
    },
    {
        input: "metcalf",
        expected: "MTKF111111"
    },
    {
        input: "metcalfe",
        expected: "MTKF111111"
    },
    {
        input: "methers",
        expected: "MTS1111111"
    },
    {
        input: "methven",
        expected: "MTFN111111"
    },
    {
        input: "metson",
        expected: "MTSN111111"
    },
    {
        input: "metta",
        expected: "MTA1111111"
    },
    {
        input: "metz",
        expected: "MTS1111111"
    },
    {
        input: "mew",
        expected: "MA11111111"
    },
    {
        input: "mewhinney",
        expected: "MWNA111111"
    },
    {
        input: "meyer",
        expected: "MA11111111"
    },
    {
        input: "meynard",
        expected: "MNT1111111"
    },
    {
        input: "miah",
        expected: "MA11111111"
    },
    {
        input: "michael",
        expected: "MKA1111111"
    },
    {
        input: "michaelis",
        expected: "MKLS111111"
    },
    {
        input: "michale",
        expected: "MKA1111111"
    },
    {
        input: "michelle",
        expected: "MKA1111111"
    },
    {
        input: "michie",
        expected: "MKA1111111"
    },
    {
        input: "middendorf",
        expected: "MTNTF11111"
    },
    {
        input: "middlebrook",
        expected: "MTLPRK1111"
    },
    {
        input: "middleditch",
        expected: "MTLTK11111"
    },
    {
        input: "middlemass",
        expected: "MTLMS11111"
    },
    {
        input: "middlemiss",
        expected: "MTLMS11111"
    },
    {
        input: "middleton",
        expected: "MTLTN11111"
    },
    {
        input: "midgley",
        expected: "MKLA111111"
    },
    {
        input: "miehael",
        expected: "MA11111111"
    },
    {
        input: "mignon",
        expected: "MKNN111111"
    },
    {
        input: "miils",
        expected: "MS11111111"
    },
    {
        input: "mil1er",
        expected: "MLA1111111"
    },
    {
        input: "milbum",
        expected: "MPM1111111"
    },
    {
        input: "milburn",
        expected: "MPN1111111"
    },
    {
        input: "milburne",
        expected: "MPN1111111"
    },
    {
        input: "mildenhall",
        expected: "MTNA111111"
    },
    {
        input: "mildred",
        expected: "MTRT111111"
    },
    {
        input: "milena",
        expected: "MLNA111111"
    },
    {
        input: "miles",
        expected: "MLS1111111"
    },
    {
        input: "milgrove",
        expected: "MKRF111111"
    },
    {
        input: "milis",
        expected: "MLS1111111"
    },
    {
        input: "mill",
        expected: "MA11111111"
    },
    {
        input: "millar",
        expected: "MLA1111111"
    },
    {
        input: "millard",
        expected: "MLT1111111"
    },
    {
        input: "millca",
        expected: "MKA1111111"
    },
    {
        input: "millea",
        expected: "MLA1111111"
    },
    {
        input: "millen",
        expected: "MLN1111111"
    },
    {
        input: "miller",
        expected: "MLA1111111"
    },
    {
        input: "millet",
        expected: "MLT1111111"
    },
    {
        input: "millian",
        expected: "MLN1111111"
    },
    {
        input: "millicent",
        expected: "MLSNT11111"
    },
    {
        input: "millie",
        expected: "MLA1111111"
    },
    {
        input: "milligan",
        expected: "MLKN111111"
    },
    {
        input: "milliken",
        expected: "MLKN111111"
    },
    {
        input: "millin",
        expected: "MLN1111111"
    },
    {
        input: "milliner",
        expected: "MLNA111111"
    },
    {
        input: "millington",
        expected: "MLNKTN1111"
    },
    {
        input: "millis",
        expected: "MLS1111111"
    },
    {
        input: "millow",
        expected: "MLA1111111"
    },
    {
        input: "mills",
        expected: "MS11111111"
    },
    {
        input: "milly",
        expected: "MLA1111111"
    },
    {
        input: "milne",
        expected: "MN11111111"
    },
    {
        input: "milner",
        expected: "MNA1111111"
    },
    {
        input: "milnes",
        expected: "MNS1111111"
    },
    {
        input: "milo",
        expected: "MLA1111111"
    },
    {
        input: "milsom",
        expected: "MSM1111111"
    },
    {
        input: "milton",
        expected: "MTN1111111"
    },
    {
        input: "milward",
        expected: "MWT1111111"
    },
    {
        input: "mima",
        expected: "MMA1111111"
    },
    {
        input: "mimie",
        expected: "MMA1111111"
    },
    {
        input: "mina",
        expected: "MNA1111111"
    },
    {
        input: "minan",
        expected: "MNN1111111"
    },
    {
        input: "mindo",
        expected: "MNTA111111"
    },
    {
        input: "mine",
        expected: "MN11111111"
    },
    {
        input: "minehan",
        expected: "MNN1111111"
    },
    {
        input: "miners",
        expected: "MNS1111111"
    },
    {
        input: "minihan",
        expected: "MNN1111111"
    },
    {
        input: "minn",
        expected: "MN11111111"
    },
    {
        input: "minna",
        expected: "MNA1111111"
    },
    {
        input: "minnie",
        expected: "MNA1111111"
    },
    {
        input: "minton",
        expected: "MNTN111111"
    },
    {
        input: "mira",
        expected: "MRA1111111"
    },
    {
        input: "mirams",
        expected: "MRMS111111"
    },
    {
        input: "miranda",
        expected: "MRNTA11111"
    },
    {
        input: "miriam",
        expected: "MRM1111111"
    },
    {
        input: "mirian",
        expected: "MRN1111111"
    },
    {
        input: "miriel",
        expected: "MRA1111111"
    },
    {
        input: "mirnie",
        expected: "MNA1111111"
    },
    {
        input: "miro",
        expected: "MRA1111111"
    },
    {
        input: "miscall",
        expected: "MSKA111111"
    },
    {
        input: "miskel",
        expected: "MSKA111111"
    },
    {
        input: "missen",
        expected: "MSN1111111"
    },
    {
        input: "mister",
        expected: "MSTA111111"
    },
    {
        input: "mitchall",
        expected: "MKA1111111"
    },
    {
        input: "mitchel",
        expected: "MKA1111111"
    },
    {
        input: "mitchell",
        expected: "MKA1111111"
    },
    {
        input: "mitehell",
        expected: "MTA1111111"
    },
    {
        input: "mitson",
        expected: "MTSN111111"
    },
    {
        input: "mitten",
        expected: "MTN1111111"
    },
    {
        input: "mlburn",
        expected: "MPN1111111"
    },
    {
        input: "mlls",
        expected: "MS11111111"
    },
    {
        input: "mnlloy",
        expected: "MNLA111111"
    },
    {
        input: "moana",
        expected: "MNA1111111"
    },
    {
        input: "moar",
        expected: "MA11111111"
    },
    {
        input: "moara",
        expected: "MRA1111111"
    },
    {
        input: "mobbs",
        expected: "MPS1111111"
    },
    {
        input: "mockford",
        expected: "MKFT111111"
    },
    {
        input: "mockler",
        expected: "MKLA111111"
    },
    {
        input: "modonald",
        expected: "MTNT111111"
    },
    {
        input: "moen",
        expected: "MN11111111"
    },
    {
        input: "moffat",
        expected: "MFT1111111"
    },
    {
        input: "moffatt",
        expected: "MFT1111111"
    },
    {
        input: "moffett",
        expected: "MFT1111111"
    },
    {
        input: "moffitt",
        expected: "MFT1111111"
    },
    {
        input: "mogie",
        expected: "MKA1111111"
    },
    {
        input: "moher",
        expected: "MA11111111"
    },
    {
        input: "moir",
        expected: "MA11111111"
    },
    {
        input: "moira",
        expected: "MRA1111111"
    },
    {
        input: "moirison",
        expected: "MRSN111111"
    },
    {
        input: "mokenzie",
        expected: "MKNSA11111"
    },
    {
        input: "moles",
        expected: "MLS1111111"
    },
    {
        input: "moller",
        expected: "MLA1111111"
    },
    {
        input: "mollie",
        expected: "MLA1111111"
    },
    {
        input: "mollison",
        expected: "MLSN111111"
    },
    {
        input: "molloy",
        expected: "MLA1111111"
    },
    {
        input: "molly",
        expected: "MLA1111111"
    },
    {
        input: "moloney",
        expected: "MLNA111111"
    },
    {
        input: "molonoy",
        expected: "MLNA111111"
    },
    {
        input: "mona",
        expected: "MNA1111111"
    },
    {
        input: "monaghan",
        expected: "MNKN111111"
    },
    {
        input: "monagon",
        expected: "MNKN111111"
    },
    {
        input: "monahan",
        expected: "MNN1111111"
    },
    {
        input: "monatague",
        expected: "MNTKA11111"
    },
    {
        input: "monckton",
        expected: "MNKTN11111"
    },
    {
        input: "moncrieff",
        expected: "MNKRF11111"
    },
    {
        input: "moncrieft",
        expected: "MNKRFT1111"
    },
    {
        input: "moncur",
        expected: "MNKA111111"
    },
    {
        input: "mong",
        expected: "MNK1111111"
    },
    {
        input: "monica",
        expected: "MNKA111111"
    },
    {
        input: "monihan",
        expected: "MNN1111111"
    },
    {
        input: "monk",
        expected: "MNK1111111"
    },
    {
        input: "monkman",
        expected: "MNKMN11111"
    },
    {
        input: "monro",
        expected: "MNRA111111"
    },
    {
        input: "monson",
        expected: "MNSN111111"
    },
    {
        input: "montague",
        expected: "MNTKA11111"
    },
    {
        input: "monteath",
        expected: "MNTT111111"
    },
    {
        input: "monteith",
        expected: "MNTT111111"
    },
    {
        input: "montgomery",
        expected: "MNTKMRA111"
    },
    {
        input: "montgomor",
        expected: "MNTKMA1111"
    },
    {
        input: "montgoner",
        expected: "MNTKNA1111"
    },
    {
        input: "mony",
        expected: "MNA1111111"
    },
    {
        input: "moodie",
        expected: "MTA1111111"
    },
    {
        input: "moody",
        expected: "MTA1111111"
    },
    {
        input: "moon",
        expected: "MN11111111"
    },
    {
        input: "mooney",
        expected: "MNA1111111"
    },
    {
        input: "moor",
        expected: "MA11111111"
    },
    {
        input: "moore",
        expected: "MA11111111"
    },
    {
        input: "moore-wrig",
        expected: "MRRK111111"
    },
    {
        input: "moore-wright",
        expected: "MRRT111111"
    },
    {
        input: "moorehead",
        expected: "MRT1111111"
    },
    {
        input: "moores",
        expected: "MRS1111111"
    },
    {
        input: "moorhonse",
        expected: "MNS1111111"
    },
    {
        input: "moorhouse",
        expected: "MS11111111"
    },
    {
        input: "mora",
        expected: "MRA1111111"
    },
    {
        input: "moran",
        expected: "MRN1111111"
    },
    {
        input: "more",
        expected: "MA11111111"
    },
    {
        input: "moreland",
        expected: "MRLNT11111"
    },
    {
        input: "morell",
        expected: "MRA1111111"
    },
    {
        input: "moreton",
        expected: "MRTN111111"
    },
    {
        input: "morgan",
        expected: "MKN1111111"
    },
    {
        input: "morgan roberts",
        expected: "MKNRPTS111"
    },
    {
        input: "morgan-roberts",
        expected: "MKNRPTS111"
    },
    {
        input: "morgon",
        expected: "MKN1111111"
    },
    {
        input: "moriarty",
        expected: "MRTA111111"
    },
    {
        input: "morice",
        expected: "MRK1111111"
    },
    {
        input: "morie",
        expected: "MRA1111111"
    },
    {
        input: "moriee",
        expected: "MRA1111111"
    },
    {
        input: "moris",
        expected: "MRS1111111"
    },
    {
        input: "morison",
        expected: "MRSN111111"
    },
    {
        input: "moritzson",
        expected: "MRTSN11111"
    },
    {
        input: "morkane",
        expected: "MKN1111111"
    },
    {
        input: "morland",
        expected: "MLNT111111"
    },
    {
        input: "morley",
        expected: "MLA1111111"
    },
    {
        input: "moro",
        expected: "MRA1111111"
    },
    {
        input: "moroney",
        expected: "MRNA111111"
    },
    {
        input: "morpeth",
        expected: "MPT1111111"
    },
    {
        input: "morrall",
        expected: "MRA1111111"
    },
    {
        input: "morrell",
        expected: "MRA1111111"
    },
    {
        input: "morris",
        expected: "MRS1111111"
    },
    {
        input: "morrisey",
        expected: "MRSA111111"
    },
    {
        input: "morrison",
        expected: "MRSN111111"
    },
    {
        input: "morriss",
        expected: "MRS1111111"
    },
    {
        input: "morrissey",
        expected: "MRSA111111"
    },
    {
        input: "morrow",
        expected: "MRA1111111"
    },
    {
        input: "mortimer",
        expected: "MTMA111111"
    },
    {
        input: "morton",
        expected: "MTN1111111"
    },
    {
        input: "morwood",
        expected: "MWT1111111"
    },
    {
        input: "moseley",
        expected: "MSLA111111"
    },
    {
        input: "moses",
        expected: "MSS1111111"
    },
    {
        input: "mosley",
        expected: "MSLA111111"
    },
    {
        input: "moss",
        expected: "MS11111111"
    },
    {
        input: "mothes",
        expected: "MTS1111111"
    },
    {
        input: "motion",
        expected: "MSN1111111"
    },
    {
        input: "mouat",
        expected: "MT11111111"
    },
    {
        input: "moulin",
        expected: "MLN1111111"
    },
    {
        input: "mount",
        expected: "MNT1111111"
    },
    {
        input: "mountford",
        expected: "MNTFT11111"
    },
    {
        input: "mountney",
        expected: "MNTNA11111"
    },
    {
        input: "moura",
        expected: "MRA1111111"
    },
    {
        input: "mouritsen",
        expected: "MRTSN11111"
    },
    {
        input: "mowat",
        expected: "MWT1111111"
    },
    {
        input: "mowatt",
        expected: "MWT1111111"
    },
    {
        input: "mowbray",
        expected: "MPRA111111"
    },
    {
        input: "mower",
        expected: "MWA1111111"
    },
    {
        input: "mowhray",
        expected: "MRA1111111"
    },
    {
        input: "moyal",
        expected: "MA11111111"
    },
    {
        input: "moyle",
        expected: "MA11111111"
    },
    {
        input: "moynihan",
        expected: "MNN1111111"
    },
    {
        input: "moyra",
        expected: "MRA1111111"
    },
    {
        input: "mrytle",
        expected: "MRTA111111"
    },
    {
        input: "muareen",
        expected: "MRN1111111"
    },
    {
        input: "mudge",
        expected: "MK11111111"
    },
    {
        input: "mueller",
        expected: "MLA1111111"
    },
    {
        input: "mugh",
        expected: "MA11111111"
    },
    {
        input: "muiorhead",
        expected: "MT11111111"
    },
    {
        input: "muir",
        expected: "MA11111111"
    },
    {
        input: "muirbead",
        expected: "MPT1111111"
    },
    {
        input: "muirhead",
        expected: "MT11111111"
    },
    {
        input: "muithead",
        expected: "MTT1111111"
    },
    {
        input: "mulcahy",
        expected: "MKA1111111"
    },
    {
        input: "mulch",
        expected: "MK11111111"
    },
    {
        input: "muldowney",
        expected: "MTNA111111"
    },
    {
        input: "mulgrew",
        expected: "MKRA111111"
    },
    {
        input: "mulhern",
        expected: "MN11111111"
    },
    {
        input: "mulhollan",
        expected: "MLN1111111"
    },
    {
        input: "mulholland",
        expected: "MLNT111111"
    },
    {
        input: "mullally",
        expected: "MLLA111111"
    },
    {
        input: "mullaly",
        expected: "MLLA111111"
    },
    {
        input: "mullan",
        expected: "MLN1111111"
    },
    {
        input: "mullay",
        expected: "MLA1111111"
    },
    {
        input: "mullen",
        expected: "MLN1111111"
    },
    {
        input: "mullholland",
        expected: "MLNT111111"
    },
    {
        input: "mulligan",
        expected: "MLKN111111"
    },
    {
        input: "mullin",
        expected: "MLN1111111"
    },
    {
        input: "mulling",
        expected: "MLNK111111"
    },
    {
        input: "mullins",
        expected: "MLNS111111"
    },
    {
        input: "mulloy",
        expected: "MLA1111111"
    },
    {
        input: "mulqueen",
        expected: "MKN1111111"
    },
    {
        input: "mulquin",
        expected: "MKN1111111"
    },
    {
        input: "mulrine",
        expected: "MRN1111111"
    },
    {
        input: "mulrooney",
        expected: "MRNA111111"
    },
    {
        input: "mulvihill",
        expected: "MFA1111111"
    },
    {
        input: "mumford",
        expected: "MMFT111111"
    },
    {
        input: "muncaster",
        expected: "MNKSTA1111"
    },
    {
        input: "munday",
        expected: "MNTA111111"
    },
    {
        input: "munden",
        expected: "MNTN111111"
    },
    {
        input: "mundie",
        expected: "MNTA111111"
    },
    {
        input: "mundy",
        expected: "MNTA111111"
    },
    {
        input: "munford",
        expected: "MNFT111111"
    },
    {
        input: "mungo",
        expected: "MNKA111111"
    },
    {
        input: "munibe",
        expected: "MNP1111111"
    },
    {
        input: "munn",
        expected: "MN11111111"
    },
    {
        input: "munrly",
        expected: "MNLA111111"
    },
    {
        input: "munro",
        expected: "MNRA111111"
    },
    {
        input: "munton",
        expected: "MNTN111111"
    },
    {
        input: "muntz",
        expected: "MNTS111111"
    },
    {
        input: "mura",
        expected: "MRA1111111"
    },
    {
        input: "muray",
        expected: "MRA1111111"
    },
    {
        input: "murch",
        expected: "MK11111111"
    },
    {
        input: "murchison",
        expected: "MKSN111111"
    },
    {
        input: "murchland",
        expected: "MKLNT11111"
    },
    {
        input: "murcott",
        expected: "MKT1111111"
    },
    {
        input: "murdie",
        expected: "MTA1111111"
    },
    {
        input: "murdo",
        expected: "MTA1111111"
    },
    {
        input: "murdoch",
        expected: "MTK1111111"
    },
    {
        input: "murdock",
        expected: "MTK1111111"
    },
    {
        input: "murdoeh",
        expected: "MTA1111111"
    },
    {
        input: "murfitt",
        expected: "MFT1111111"
    },
    {
        input: "murial",
        expected: "MRA1111111"
    },
    {
        input: "murie",
        expected: "MRA1111111"
    },
    {
        input: "muriel",
        expected: "MRA1111111"
    },
    {
        input: "murison",
        expected: "MRSN111111"
    },
    {
        input: "murly",
        expected: "MLA1111111"
    },
    {
        input: "murphy",
        expected: "MFA1111111"
    },
    {
        input: "murray",
        expected: "MRA1111111"
    },
    {
        input: "murrow",
        expected: "MRA1111111"
    },
    {
        input: "murtagh",
        expected: "MTA1111111"
    },
    {
        input: "murtha",
        expected: "MTA1111111"
    },
    {
        input: "mussen",
        expected: "MSN1111111"
    },
    {
        input: "mustard",
        expected: "MSTT111111"
    },
    {
        input: "mutch",
        expected: "MK11111111"
    },
    {
        input: "mutimer",
        expected: "MTMA111111"
    },
    {
        input: "mutter",
        expected: "MTA1111111"
    },
    {
        input: "mvers",
        expected: "MFS1111111"
    },
    {
        input: "myers",
        expected: "MS11111111"
    },
    {
        input: "myfert",
        expected: "MFT1111111"
    },
    {
        input: "myles",
        expected: "MLS1111111"
    },
    {
        input: "mynot",
        expected: "MNT1111111"
    },
    {
        input: "myra",
        expected: "MRA1111111"
    },
    {
        input: "myrtle",
        expected: "MTA1111111"
    },
    {
        input: "myttle",
        expected: "MTA1111111"
    },
    {
        input: "naamah",
        expected: "NMA1111111"
    },
    {
        input: "naesmith",
        expected: "NSMT111111"
    },
    {
        input: "nairn",
        expected: "NN11111111"
    },
    {
        input: "naismith",
        expected: "NSMT111111"
    },
    {
        input: "nalder",
        expected: "NTA1111111"
    },
    {
        input: "nancarrow",
        expected: "NNKRA11111"
    },
    {
        input: "nance",
        expected: "NNK1111111"
    },
    {
        input: "nancie",
        expected: "NNSA111111"
    },
    {
        input: "nancy",
        expected: "NNSA111111"
    },
    {
        input: "nancybell",
        expected: "NNSPA11111"
    },
    {
        input: "naney",
        expected: "NNA1111111"
    },
    {
        input: "nankivell",
        expected: "NNKFA11111"
    },
    {
        input: "nanney",
        expected: "NNA1111111"
    },
    {
        input: "nano",
        expected: "NNA1111111"
    },
    {
        input: "nansbell",
        expected: "NNSPA11111"
    },
    {
        input: "nantes",
        expected: "NNTS111111"
    },
    {
        input: "naomi",
        expected: "NMA1111111"
    },
    {
        input: "naphtali",
        expected: "NFTLA11111"
    },
    {
        input: "napier",
        expected: "NPA1111111"
    },
    {
        input: "napoleon",
        expected: "NPLN111111"
    },
    {
        input: "napper",
        expected: "NPA1111111"
    },
    {
        input: "nardor",
        expected: "NTA1111111"
    },
    {
        input: "narman",
        expected: "NMN1111111"
    },
    {
        input: "narotamdas",
        expected: "NRTMTS1111"
    },
    {
        input: "narracott",
        expected: "NRKT111111"
    },
    {
        input: "nash",
        expected: "NS11111111"
    },
    {
        input: "nasham",
        expected: "NSM1111111"
    },
    {
        input: "natalie",
        expected: "NTLA111111"
    },
    {
        input: "nathan",
        expected: "NTN1111111"
    },
    {
        input: "nathaniel",
        expected: "NTNA111111"
    },
    {
        input: "natta",
        expected: "NTA1111111"
    },
    {
        input: "natusch",
        expected: "NTSK111111"
    },
    {
        input: "naughton",
        expected: "NTN1111111"
    },
    {
        input: "naumann",
        expected: "NMN1111111"
    },
    {
        input: "naylon",
        expected: "NLN1111111"
    },
    {
        input: "naylor",
        expected: "NLA1111111"
    },
    {
        input: "neah",
        expected: "NA11111111"
    },
    {
        input: "neal",
        expected: "NA11111111"
    },
    {
        input: "neale",
        expected: "NA11111111"
    },
    {
        input: "neame",
        expected: "NM11111111"
    },
    {
        input: "neason",
        expected: "NSN1111111"
    },
    {
        input: "neave",
        expected: "NF11111111"
    },
    {
        input: "needham",
        expected: "NTM1111111"
    },
    {
        input: "nees",
        expected: "NS11111111"
    },
    {
        input: "neeve",
        expected: "NF11111111"
    },
    {
        input: "nehoff",
        expected: "NF11111111"
    },
    {
        input: "neil",
        expected: "NA11111111"
    },
    {
        input: "neilands",
        expected: "NLNTS11111"
    },
    {
        input: "neilina",
        expected: "NLNA111111"
    },
    {
        input: "neill",
        expected: "NA11111111"
    },
    {
        input: "neilson",
        expected: "NSN1111111"
    },
    {
        input: "neiper",
        expected: "NPA1111111"
    },
    {
        input: "neiss",
        expected: "NS11111111"
    },
    {
        input: "neitch",
        expected: "NK11111111"
    },
    {
        input: "nelilson",
        expected: "NLSN111111"
    },
    {
        input: "nell",
        expected: "NA11111111"
    },
    {
        input: "nella",
        expected: "NLA1111111"
    },
    {
        input: "nelletta",
        expected: "NLTA111111"
    },
    {
        input: "nellia",
        expected: "NLA1111111"
    },
    {
        input: "nellic",
        expected: "NLK1111111"
    },
    {
        input: "nellie",
        expected: "NLA1111111"
    },
    {
        input: "nellin",
        expected: "NLN1111111"
    },
    {
        input: "nellson",
        expected: "NSN1111111"
    },
    {
        input: "nelly",
        expected: "NLA1111111"
    },
    {
        input: "nelon",
        expected: "NLN1111111"
    },
    {
        input: "nelsion",
        expected: "NSN1111111"
    },
    {
        input: "nelslon",
        expected: "NSLN111111"
    },
    {
        input: "nelson",
        expected: "NSN1111111"
    },
    {
        input: "nelson-thyberg",
        expected: "NSNTPK1111"
    },
    {
        input: "nenetta",
        expected: "NNTA111111"
    },
    {
        input: "nera",
        expected: "NRA1111111"
    },
    {
        input: "nesbett",
        expected: "NSPT111111"
    },
    {
        input: "nesbit",
        expected: "NSPT111111"
    },
    {
        input: "nesbitt",
        expected: "NSPT111111"
    },
    {
        input: "ness",
        expected: "NS11111111"
    },
    {
        input: "nessie",
        expected: "NSA1111111"
    },
    {
        input: "nesta",
        expected: "NSTA111111"
    },
    {
        input: "nester",
        expected: "NSTA111111"
    },
    {
        input: "nestor",
        expected: "NSTA111111"
    },
    {
        input: "netherton",
        expected: "NTTN111111"
    },
    {
        input: "netta",
        expected: "NTA1111111"
    },
    {
        input: "netterwille",
        expected: "NTWA111111"
    },
    {
        input: "nettie",
        expected: "NTA1111111"
    },
    {
        input: "neumann",
        expected: "NMN1111111"
    },
    {
        input: "nevill",
        expected: "NFA1111111"
    },
    {
        input: "neville",
        expected: "NFA1111111"
    },
    {
        input: "nevin",
        expected: "NFN1111111"
    },
    {
        input: "nevison",
        expected: "NFSN111111"
    },
    {
        input: "new",
        expected: "NA11111111"
    },
    {
        input: "newall",
        expected: "NWA1111111"
    },
    {
        input: "newands",
        expected: "NWNTS11111"
    },
    {
        input: "newbold",
        expected: "NPT1111111"
    },
    {
        input: "newbound",
        expected: "NPNT111111"
    },
    {
        input: "newbury",
        expected: "NPRA111111"
    },
    {
        input: "newell",
        expected: "NWA1111111"
    },
    {
        input: "newey",
        expected: "NWA1111111"
    },
    {
        input: "newland",
        expected: "NLNT111111"
    },
    {
        input: "newlands",
        expected: "NLNTS11111"
    },
    {
        input: "newman",
        expected: "NMN1111111"
    },
    {
        input: "newmark",
        expected: "NMK1111111"
    },
    {
        input: "newmarsh",
        expected: "NMS1111111"
    },
    {
        input: "newsham-west",
        expected: "NSMWST1111"
    },
    {
        input: "newsome",
        expected: "NSM1111111"
    },
    {
        input: "newson",
        expected: "NSN1111111"
    },
    {
        input: "newton",
        expected: "NTN1111111"
    },
    {
        input: "neylan",
        expected: "NLN1111111"
    },
    {
        input: "neylon",
        expected: "NLN1111111"
    },
    {
        input: "ngaere",
        expected: "NKA1111111"
    },
    {
        input: "ngahuir",
        expected: "NKA1111111"
    },
    {
        input: "ngaira",
        expected: "NKRA111111"
    },
    {
        input: "ngaire",
        expected: "NKA1111111"
    },
    {
        input: "ngaria",
        expected: "NKRA111111"
    },
    {
        input: "ngarita",
        expected: "NKRTA11111"
    },
    {
        input: "ngyra",
        expected: "NKRA111111"
    },
    {
        input: "ngyre",
        expected: "NKA1111111"
    },
    {
        input: "niall",
        expected: "NA11111111"
    },
    {
        input: "niary",
        expected: "NRA1111111"
    },
    {
        input: "nicalena",
        expected: "NKLNA11111"
    },
    {
        input: "nichol",
        expected: "NKA1111111"
    },
    {
        input: "nichola",
        expected: "NKLA111111"
    },
    {
        input: "nicholas",
        expected: "NKLS111111"
    },
    {
        input: "nicholis",
        expected: "NKLS111111"
    },
    {
        input: "nicholl",
        expected: "NKA1111111"
    },
    {
        input: "nicholls",
        expected: "NKS1111111"
    },
    {
        input: "nichols",
        expected: "NKS1111111"
    },
    {
        input: "nicholson",
        expected: "NKSN111111"
    },
    {
        input: "nickels",
        expected: "NKS1111111"
    },
    {
        input: "nickoll",
        expected: "NKA1111111"
    },
    {
        input: "nicol",
        expected: "NKA1111111"
    },
    {
        input: "nicolena",
        expected: "NKLNA11111"
    },
    {
        input: "nicolina",
        expected: "NKLNA11111"
    },
    {
        input: "nicoll",
        expected: "NKA1111111"
    },
    {
        input: "nicolson",
        expected: "NKSN111111"
    },
    {
        input: "niel",
        expected: "NA11111111"
    },
    {
        input: "niels",
        expected: "NS11111111"
    },
    {
        input: "nielson",
        expected: "NSN1111111"
    },
    {
        input: "nieper",
        expected: "NPA1111111"
    },
    {
        input: "nigel",
        expected: "NKA1111111"
    },
    {
        input: "nightingale",
        expected: "NTNKA11111"
    },
    {
        input: "nikander",
        expected: "NKNTA11111"
    },
    {
        input: "nikel",
        expected: "NKA1111111"
    },
    {
        input: "niles",
        expected: "NLS1111111"
    },
    {
        input: "nils",
        expected: "NS11111111"
    },
    {
        input: "nilson",
        expected: "NSN1111111"
    },
    {
        input: "nilsson",
        expected: "NSN1111111"
    },
    {
        input: "nimmo",
        expected: "NMA1111111"
    },
    {
        input: "nina",
        expected: "NNA1111111"
    },
    {
        input: "nind",
        expected: "NNT1111111"
    },
    {
        input: "ninetta",
        expected: "NNTA111111"
    },
    {
        input: "ninian",
        expected: "NNN1111111"
    },
    {
        input: "nisbet",
        expected: "NSPT111111"
    },
    {
        input: "nisbitt",
        expected: "NSPT111111"
    },
    {
        input: "nissen",
        expected: "NSN1111111"
    },
    {
        input: "nita",
        expected: "NTA1111111"
    },
    {
        input: "niven",
        expected: "NFN1111111"
    },
    {
        input: "nixon",
        expected: "NKN1111111"
    },
    {
        input: "nixson",
        expected: "NKSN111111"
    },
    {
        input: "no",
        expected: "NA11111111"
    },
    {
        input: "noble",
        expected: "NPA1111111"
    },
    {
        input: "noel",
        expected: "NA11111111"
    },
    {
        input: "noeleen",
        expected: "NLN1111111"
    },
    {
        input: "noeline",
        expected: "NLN1111111"
    },
    {
        input: "noell",
        expected: "NA11111111"
    },
    {
        input: "noelle",
        expected: "NA11111111"
    },
    {
        input: "nohar",
        expected: "NA11111111"
    },
    {
        input: "noilina",
        expected: "NLNA111111"
    },
    {
        input: "nola",
        expected: "NLA1111111"
    },
    {
        input: "nolan",
        expected: "NLN1111111"
    },
    {
        input: "nona",
        expected: "NNA1111111"
    },
    {
        input: "noney",
        expected: "NNA1111111"
    },
    {
        input: "noni",
        expected: "NNA1111111"
    },
    {
        input: "nonie",
        expected: "NNA1111111"
    },
    {
        input: "noonal",
        expected: "NNA1111111"
    },
    {
        input: "noonan",
        expected: "NNN1111111"
    },
    {
        input: "noone",
        expected: "NN11111111"
    },
    {
        input: "nora",
        expected: "NRA1111111"
    },
    {
        input: "norah",
        expected: "NRA1111111"
    },
    {
        input: "norden",
        expected: "NTN1111111"
    },
    {
        input: "noreen",
        expected: "NRN1111111"
    },
    {
        input: "norine",
        expected: "NRN1111111"
    },
    {
        input: "norma",
        expected: "NMA1111111"
    },
    {
        input: "norman",
        expected: "NMN1111111"
    },
    {
        input: "normena",
        expected: "NMNA111111"
    },
    {
        input: "normina",
        expected: "NMNA111111"
    },
    {
        input: "norris",
        expected: "NRS1111111"
    },
    {
        input: "norrish",
        expected: "NRS1111111"
    },
    {
        input: "north",
        expected: "NT11111111"
    },
    {
        input: "northcoat",
        expected: "NTKT111111"
    },
    {
        input: "northey",
        expected: "NTA1111111"
    },
    {
        input: "norton",
        expected: "NTN1111111"
    },
    {
        input: "norton taylor",
        expected: "NTNTLA1111"
    },
    {
        input: "norton-taylor",
        expected: "NTNTLA1111"
    },
    {
        input: "norwood",
        expected: "NWT1111111"
    },
    {
        input: "noseda",
        expected: "NSTA111111"
    },
    {
        input: "noslie",
        expected: "NSLA111111"
    },
    {
        input: "noster",
        expected: "NSTA111111"
    },
    {
        input: "notlen",
        expected: "NTLN111111"
    },
    {
        input: "notman",
        expected: "NTMN111111"
    },
    {
        input: "nottage",
        expected: "NTK1111111"
    },
    {
        input: "nova",
        expected: "NFA1111111"
    },
    {
        input: "nowland",
        expected: "NLNT111111"
    },
    {
        input: "nowlands",
        expected: "NLNTS11111"
    },
    {
        input: "noy",
        expected: "NA11111111"
    },
    {
        input: "nozlie",
        expected: "NSLA111111"
    },
    {
        input: "ntowland",
        expected: "NTLNT11111"
    },
    {
        input: "nugent",
        expected: "NKNT111111"
    },
    {
        input: "nunn",
        expected: "NN11111111"
    },
    {
        input: "nunns",
        expected: "NNS1111111"
    },
    {
        input: "nuttall",
        expected: "NTA1111111"
    },
    {
        input: "nutting",
        expected: "NTNK111111"
    },
    {
        input: "nxon",
        expected: "NKN1111111"
    },
    {
        input: "nyhon",
        expected: "NN11111111"
    },
    {
        input: "nyra",
        expected: "NRA1111111"
    },
    {
        input: "o sullivan",
        expected: "ASLFN11111"
    },
    {
        input: "o'beirne",
        expected: "APN1111111"
    },
    {
        input: "o'berg",
        expected: "APK1111111"
    },
    {
        input: "o'brian",
        expected: "APRN111111"
    },
    {
        input: "o'briean",
        expected: "APRN111111"
    },
    {
        input: "o'brien",
        expected: "APRN111111"
    },
    {
        input: "o'calaghan",
        expected: "AKLKN11111"
    },
    {
        input: "o'callagh",
        expected: "AKLA111111"
    },
    {
        input: "o'callaghan",
        expected: "AKLKN11111"
    },
    {
        input: "o'connell",
        expected: "AKNA111111"
    },
    {
        input: "o'connor",
        expected: "AKNA111111"
    },
    {
        input: "o'corrnan",
        expected: "AKNN111111"
    },
    {
        input: "o'dea",
        expected: "ATA1111111"
    },
    {
        input: "o'docherty",
        expected: "ATKTA11111"
    },
    {
        input: "o'donnell",
        expected: "ATNA111111"
    },
    {
        input: "o'donohue",
        expected: "ATNA111111"
    },
    {
        input: "o'dowd",
        expected: "ATT1111111"
    },
    {
        input: "o'driscoll",
        expected: "ATRSKA1111"
    },
    {
        input: "o'dwyer",
        expected: "ATWA111111"
    },
    {
        input: "o'farrell",
        expected: "AFRA111111"
    },
    {
        input: "o'fee",
        expected: "AFA1111111"
    },
    {
        input: "o'gorman",
        expected: "AKMN111111"
    },
    {
        input: "o'grady",
        expected: "AKRTA11111"
    },
    {
        input: "o'hallora",
        expected: "ALRA111111"
    },
    {
        input: "o'halloran",
        expected: "ALRN111111"
    },
    {
        input: "o'hara",
        expected: "ARA1111111"
    },
    {
        input: "o'hare",
        expected: "AA11111111"
    },
    {
        input: "o'kane",
        expected: "AKN1111111"
    },
    {
        input: "o'kean",
        expected: "AKN1111111"
    },
    {
        input: "o'keefe",
        expected: "AKF1111111"
    },
    {
        input: "o'keeffe",
        expected: "AKF1111111"
    },
    {
        input: "o'leary",
        expected: "ALRA111111"
    },
    {
        input: "o'loughlin",
        expected: "ALLN111111"
    },
    {
        input: "o'mahoney",
        expected: "AMNA111111"
    },
    {
        input: "o'malley",
        expected: "AMLA111111"
    },
    {
        input: "o'meara",
        expected: "AMRA111111"
    },
    {
        input: "o'neil",
        expected: "ANA1111111"
    },
    {
        input: "o'neill",
        expected: "ANA1111111"
    },
    {
        input: "o'rawe",
        expected: "ARA1111111"
    },
    {
        input: "o'regan",
        expected: "ARKN111111"
    },
    {
        input: "o'reilly",
        expected: "ARLA111111"
    },
    {
        input: "o'rogan",
        expected: "ARKN111111"
    },
    {
        input: "o'rourke",
        expected: "ARK1111111"
    },
    {
        input: "o'shannessy",
        expected: "ASNSA11111"
    },
    {
        input: "o'shaughnessy",
        expected: "ASNSA11111"
    },
    {
        input: "o'shea",
        expected: "ASA1111111"
    },
    {
        input: "o'sullivan",
        expected: "ASLFN11111"
    },
    {
        input: "o'toole",
        expected: "ATA1111111"
    },
    {
        input: "o1sen",
        expected: "ASN1111111"
    },
    {
        input: "oag",
        expected: "AK11111111"
    },
    {
        input: "oakden",
        expected: "AKTN111111"
    },
    {
        input: "oakes",
        expected: "AKS1111111"
    },
    {
        input: "oare",
        expected: "AA11111111"
    },
    {
        input: "oaten",
        expected: "ATN1111111"
    },
    {
        input: "oates",
        expected: "ATS1111111"
    },
    {
        input: "oban",
        expected: "APN1111111"
    },
    {
        input: "oben",
        expected: "APN1111111"
    },
    {
        input: "ockwell",
        expected: "AKWA111111"
    },
    {
        input: "octavia",
        expected: "AKTFA11111"
    },
    {
        input: "octavius",
        expected: "AKTFS11111"
    },
    {
        input: "ocwell",
        expected: "AKWA111111"
    },
    {
        input: "oddie",
        expected: "ATA1111111"
    },
    {
        input: "odham",
        expected: "ATM1111111"
    },
    {
        input: "odin",
        expected: "ATN1111111"
    },
    {
        input: "oenond",
        expected: "ANNT111111"
    },
    {
        input: "oettli",
        expected: "ATLA111111"
    },
    {
        input: "offen",
        expected: "AFN1111111"
    },
    {
        input: "officer",
        expected: "AFSA111111"
    },
    {
        input: "ofllen",
        expected: "AFLN111111"
    },
    {
        input: "often",
        expected: "AFTN111111"
    },
    {
        input: "ogborne",
        expected: "AKPN111111"
    },
    {
        input: "ogden",
        expected: "AKTN111111"
    },
    {
        input: "ogg",
        expected: "AK11111111"
    },
    {
        input: "ogier",
        expected: "AKA1111111"
    },
    {
        input: "ogilvie",
        expected: "AKFA111111"
    },
    {
        input: "ogivie",
        expected: "AKFA111111"
    },
    {
        input: "ogston",
        expected: "AKSTN11111"
    },
    {
        input: "ola",
        expected: "ALA1111111"
    },
    {
        input: "olaf",
        expected: "ALF1111111"
    },
    {
        input: "olai",
        expected: "ALA1111111"
    },
    {
        input: "old",
        expected: "AT11111111"
    },
    {
        input: "oldenburg",
        expected: "ATNPK11111"
    },
    {
        input: "oldham",
        expected: "ATM1111111"
    },
    {
        input: "oldman",
        expected: "ATMN111111"
    },
    {
        input: "olds",
        expected: "ATS1111111"
    },
    {
        input: "ole",
        expected: "AA11111111"
    },
    {
        input: "olef",
        expected: "ALF1111111"
    },
    {
        input: "oley",
        expected: "ALA1111111"
    },
    {
        input: "olga",
        expected: "AKA1111111"
    },
    {
        input: "oliphant",
        expected: "ALFNT11111"
    },
    {
        input: "olive",
        expected: "ALF1111111"
    },
    {
        input: "olivel",
        expected: "ALFA111111"
    },
    {
        input: "oliver",
        expected: "ALFA111111"
    },
    {
        input: "olivera",
        expected: "ALFRA11111"
    },
    {
        input: "oliverpaul",
        expected: "ALFPA11111"
    },
    {
        input: "olivia",
        expected: "ALFA111111"
    },
    {
        input: "olivo",
        expected: "ALFA111111"
    },
    {
        input: "ollerensh",
        expected: "ALRNS11111"
    },
    {
        input: "ollerenshaw",
        expected: "ALRNSA1111"
    },
    {
        input: "olliffe",
        expected: "ALF1111111"
    },
    {
        input: "olliver",
        expected: "ALFA111111"
    },
    {
        input: "olof",
        expected: "ALF1111111"
    },
    {
        input: "oloff",
        expected: "ALF1111111"
    },
    {
        input: "olsen",
        expected: "ASN1111111"
    },
    {
        input: "olsien",
        expected: "ASN1111111"
    },
    {
        input: "olson",
        expected: "ASN1111111"
    },
    {
        input: "olvia",
        expected: "AFA1111111"
    },
    {
        input: "olvie",
        expected: "AFA1111111"
    },
    {
        input: "olwyn",
        expected: "AWN1111111"
    },
    {
        input: "omand",
        expected: "AMNT111111"
    },
    {
        input: "ombler",
        expected: "AMPLA11111"
    },
    {
        input: "onawe",
        expected: "ANA1111111"
    },
    {
        input: "onie",
        expected: "ANA1111111"
    },
    {
        input: "oonah",
        expected: "ANA1111111"
    },
    {
        input: "ophir",
        expected: "AFA1111111"
    },
    {
        input: "ora",
        expected: "ARA1111111"
    },
    {
        input: "oral",
        expected: "ARA1111111"
    },
    {
        input: "orange",
        expected: "ARNK111111"
    },
    {
        input: "orbell",
        expected: "APA1111111"
    },
    {
        input: "orchard",
        expected: "AKT1111111"
    },
    {
        input: "orchiston",
        expected: "AKSTN11111"
    },
    {
        input: "organ",
        expected: "AKN1111111"
    },
    {
        input: "oriel",
        expected: "ARA1111111"
    },
    {
        input: "orlando",
        expected: "ALNTA11111"
    },
    {
        input: "orlowski",
        expected: "ALSKA11111"
    },
    {
        input: "orlowsli",
        expected: "ALSLA11111"
    },
    {
        input: "orm",
        expected: "AM11111111"
    },
    {
        input: "orma",
        expected: "AMA1111111"
    },
    {
        input: "ormand",
        expected: "AMNT111111"
    },
    {
        input: "ormandy",
        expected: "AMNTA11111"
    },
    {
        input: "orme",
        expected: "AM11111111"
    },
    {
        input: "ormond",
        expected: "AMNT111111"
    },
    {
        input: "ormrod",
        expected: "AMRT111111"
    },
    {
        input: "ormston",
        expected: "AMSTN11111"
    },
    {
        input: "orpah",
        expected: "APA1111111"
    },
    {
        input: "orpheus",
        expected: "AFS1111111"
    },
    {
        input: "orpwood",
        expected: "APWT111111"
    },
    {
        input: "orr",
        expected: "AA11111111"
    },
    {
        input: "orthus",
        expected: "ATS1111111"
    },
    {
        input: "orton",
        expected: "ATN1111111"
    },
    {
        input: "orvis",
        expected: "AFS1111111"
    },
    {
        input: "ory",
        expected: "ARA1111111"
    },
    {
        input: "osald",
        expected: "AST1111111"
    },
    {
        input: "osborn",
        expected: "ASPN111111"
    },
    {
        input: "osborne",
        expected: "ASPN111111"
    },
    {
        input: "oscar",
        expected: "ASKA111111"
    },
    {
        input: "oslin",
        expected: "ASLN111111"
    },
    {
        input: "osmand",
        expected: "ASMNT11111"
    },
    {
        input: "osmond",
        expected: "ASMNT11111"
    },
    {
        input: "oson",
        expected: "ASN1111111"
    },
    {
        input: "ostarasch",
        expected: "ASTRSK1111"
    },
    {
        input: "osten",
        expected: "ASTN111111"
    },
    {
        input: "oswald",
        expected: "ASWT111111"
    },
    {
        input: "oswin",
        expected: "ASWN111111"
    },
    {
        input: "othelia",
        expected: "ATLA111111"
    },
    {
        input: "otilia",
        expected: "ATLA111111"
    },
    {
        input: "otten",
        expected: "ATN1111111"
    },
    {
        input: "otto",
        expected: "ATA1111111"
    },
    {
        input: "ottrey",
        expected: "ATRA111111"
    },
    {
        input: "otway",
        expected: "ATWA111111"
    },
    {
        input: "oudaille",
        expected: "ATA1111111"
    },
    {
        input: "ough",
        expected: "AA11111111"
    },
    {
        input: "ouinn",
        expected: "AN11111111"
    },
    {
        input: "ouston",
        expected: "ASTN111111"
    },
    {
        input: "out",
        expected: "AT11111111"
    },
    {
        input: "outram",
        expected: "ATRM111111"
    },
    {
        input: "ovenden",
        expected: "AFNTN11111"
    },
    {
        input: "overell",
        expected: "AFRA111111"
    },
    {
        input: "overton",
        expected: "AFTN111111"
    },
    {
        input: "overtop",
        expected: "AFTP111111"
    },
    {
        input: "owen",
        expected: "AWN1111111"
    },
    {
        input: "owens",
        expected: "AWNS111111"
    },
    {
        input: "owles",
        expected: "ALS1111111"
    },
    {
        input: "oxford",
        expected: "AKFT111111"
    },
    {
        input: "oxiey",
        expected: "AKA1111111"
    },
    {
        input: "ozanne",
        expected: "ASN1111111"
    },
    {
        input: "ozmond",
        expected: "ASMNT11111"
    },
    {
        input: "paap",
        expected: "PP11111111"
    },
    {
        input: "paape",
        expected: "PP11111111"
    },
    {
        input: "paaris",
        expected: "PRS1111111"
    },
    {
        input: "pacey",
        expected: "PSA1111111"
    },
    {
        input: "packer",
        expected: "PKA1111111"
    },
    {
        input: "packfr",
        expected: "PKFA111111"
    },
    {
        input: "packman",
        expected: "PKMN111111"
    },
    {
        input: "padget",
        expected: "PKT1111111"
    },
    {
        input: "padgett",
        expected: "PKT1111111"
    },
    {
        input: "paganini",
        expected: "PKNNA11111"
    },
    {
        input: "page",
        expected: "PK11111111"
    },
    {
        input: "pagel",
        expected: "PKA1111111"
    },
    {
        input: "paget",
        expected: "PKT1111111"
    },
    {
        input: "paimer",
        expected: "PMA1111111"
    },
    {
        input: "painc",
        expected: "PNK1111111"
    },
    {
        input: "paine",
        expected: "PN11111111"
    },
    {
        input: "painter",
        expected: "PNTA111111"
    },
    {
        input: "painton",
        expected: "PNTN111111"
    },
    {
        input: "paisley",
        expected: "PSLA111111"
    },
    {
        input: "palatchie",
        expected: "PLKA111111"
    },
    {
        input: "palenski",
        expected: "PLNSKA1111"
    },
    {
        input: "palleson",
        expected: "PLSN111111"
    },
    {
        input: "pallister",
        expected: "PLSTA11111"
    },
    {
        input: "palmer",
        expected: "PMA1111111"
    },
    {
        input: "palser",
        expected: "PSA1111111"
    },
    {
        input: "pamela",
        expected: "PMLA111111"
    },
    {
        input: "pank",
        expected: "PNK1111111"
    },
    {
        input: "pansy",
        expected: "PNSA111111"
    },
    {
        input: "panting",
        expected: "PNTNK11111"
    },
    {
        input: "panton",
        expected: "PNTN111111"
    },
    {
        input: "par",
        expected: "PA11111111"
    },
    {
        input: "paranthoiene",
        expected: "PRNTN11111"
    },
    {
        input: "parata",
        expected: "PRTA111111"
    },
    {
        input: "parcell",
        expected: "PSA1111111"
    },
    {
        input: "parcells",
        expected: "PSS1111111"
    },
    {
        input: "pargiter",
        expected: "PKTA111111"
    },
    {
        input: "paris",
        expected: "PRS1111111"
    },
    {
        input: "parish",
        expected: "PRS1111111"
    },
    {
        input: "park",
        expected: "PK11111111"
    },
    {
        input: "parke",
        expected: "PK11111111"
    },
    {
        input: "parker",
        expected: "PKA1111111"
    },
    {
        input: "parkes",
        expected: "PKS1111111"
    },
    {
        input: "parkhill",
        expected: "PKA1111111"
    },
    {
        input: "parkin",
        expected: "PKN1111111"
    },
    {
        input: "parkinson",
        expected: "PKNSN11111"
    },
    {
        input: "parler",
        expected: "PLA1111111"
    },
    {
        input: "parlett",
        expected: "PLT1111111"
    },
    {
        input: "parnell",
        expected: "PNA1111111"
    },
    {
        input: "parr",
        expected: "PA11111111"
    },
    {
        input: "parrish",
        expected: "PRS1111111"
    },
    {
        input: "parry",
        expected: "PRA1111111"
    },
    {
        input: "parslow",
        expected: "PSLA111111"
    },
    {
        input: "parsond",
        expected: "PSNT111111"
    },
    {
        input: "parsons",
        expected: "PSNS111111"
    },
    {
        input: "parsonson",
        expected: "PSNSN11111"
    },
    {
        input: "partel",
        expected: "PTA1111111"
    },
    {
        input: "partridge",
        expected: "PTRK111111"
    },
    {
        input: "pasco",
        expected: "PSKA111111"
    },
    {
        input: "pascoe",
        expected: "PSKA111111"
    },
    {
        input: "paskell",
        expected: "PSKA111111"
    },
    {
        input: "passmore",
        expected: "PSMA111111"
    },
    {
        input: "pastor",
        expected: "PSTA111111"
    },
    {
        input: "pastorell",
        expected: "PSTRA11111"
    },
    {
        input: "pastorelli",
        expected: "PSTRLA1111"
    },
    {
        input: "patay",
        expected: "PTA1111111"
    },
    {
        input: "patch",
        expected: "PK11111111"
    },
    {
        input: "patchett",
        expected: "PKT1111111"
    },
    {
        input: "patcrson",
        expected: "PTKSN11111"
    },
    {
        input: "pate",
        expected: "PT11111111"
    },
    {
        input: "paterson",
        expected: "PTSN111111"
    },
    {
        input: "patey",
        expected: "PTA1111111"
    },
    {
        input: "patience",
        expected: "PTNK111111"
    },
    {
        input: "paton",
        expected: "PTN1111111"
    },
    {
        input: "patorson",
        expected: "PTSN111111"
    },
    {
        input: "patrck",
        expected: "PTK1111111"
    },
    {
        input: "patricia",
        expected: "PTRSA11111"
    },
    {
        input: "patrick",
        expected: "PTRK111111"
    },
    {
        input: "pattenden",
        expected: "PTNTN11111"
    },
    {
        input: "patterson",
        expected: "PTSN111111"
    },
    {
        input: "pattillo",
        expected: "PTLA111111"
    },
    {
        input: "pattinson",
        expected: "PTNSN11111"
    },
    {
        input: "pattison",
        expected: "PTSN111111"
    },
    {
        input: "patton",
        expected: "PTN1111111"
    },
    {
        input: "pattorson",
        expected: "PTSN111111"
    },
    {
        input: "pattrick",
        expected: "PTRK111111"
    },
    {
        input: "paul",
        expected: "PA11111111"
    },
    {
        input: "pauley",
        expected: "PLA1111111"
    },
    {
        input: "paulin",
        expected: "PLN1111111"
    },
    {
        input: "paulina",
        expected: "PLNA111111"
    },
    {
        input: "pauline",
        expected: "PLN1111111"
    },
    {
        input: "paull",
        expected: "PA11111111"
    },
    {
        input: "paviour-smith",
        expected: "PFSMT11111"
    },
    {
        input: "pavioursmith",
        expected: "PFSMT11111"
    },
    {
        input: "pavitt",
        expected: "PFT1111111"
    },
    {
        input: "pavletich",
        expected: "PFLTK11111"
    },
    {
        input: "paxton",
        expected: "PKTN111111"
    },
    {
        input: "pay",
        expected: "PA11111111"
    },
    {
        input: "payne",
        expected: "PN11111111"
    },
    {
        input: "paynter",
        expected: "PNTA111111"
    },
    {
        input: "payton",
        expected: "PTN1111111"
    },
    {
        input: "pcrteous",
        expected: "PKTS111111"
    },
    {
        input: "peace",
        expected: "PK11111111"
    },
    {
        input: "peach",
        expected: "PK11111111"
    },
    {
        input: "peacock",
        expected: "PKK1111111"
    },
    {
        input: "peake",
        expected: "PK11111111"
    },
    {
        input: "pearce",
        expected: "PK11111111"
    },
    {
        input: "pearl",
        expected: "PA11111111"
    },
    {
        input: "pearless",
        expected: "PLS1111111"
    },
    {
        input: "pearlie",
        expected: "PLA1111111"
    },
    {
        input: "pearn",
        expected: "PN11111111"
    },
    {
        input: "pears",
        expected: "PS11111111"
    },
    {
        input: "pearse",
        expected: "PS11111111"
    },
    {
        input: "pearson",
        expected: "PSN1111111"
    },
    {
        input: "peart",
        expected: "PT11111111"
    },
    {
        input: "peat",
        expected: "PT11111111"
    },
    {
        input: "peate",
        expected: "PT11111111"
    },
    {
        input: "peates",
        expected: "PTS1111111"
    },
    {
        input: "peattie",
        expected: "PTA1111111"
    },
    {
        input: "peck",
        expected: "PK11111111"
    },
    {
        input: "pedder",
        expected: "PTA1111111"
    },
    {
        input: "peddie",
        expected: "PTA1111111"
    },
    {
        input: "peden",
        expected: "PTN1111111"
    },
    {
        input: "pedlar",
        expected: "PTLA111111"
    },
    {
        input: "pedlow",
        expected: "PTLA111111"
    },
    {
        input: "pedofsky",
        expected: "PTFSKA1111"
    },
    {
        input: "peebles",
        expected: "PPLS111111"
    },
    {
        input: "peel",
        expected: "PA11111111"
    },
    {
        input: "pegg",
        expected: "PK11111111"
    },
    {
        input: "peggie",
        expected: "PKA1111111"
    },
    {
        input: "peggotty",
        expected: "PKTA111111"
    },
    {
        input: "peggy",
        expected: "PKA1111111"
    },
    {
        input: "pelatchie",
        expected: "PLKA111111"
    },
    {
        input: "pell",
        expected: "PA11111111"
    },
    {
        input: "pellett",
        expected: "PLT1111111"
    },
    {
        input: "pellowe",
        expected: "PLA1111111"
    },
    {
        input: "pelvin",
        expected: "PFN1111111"
    },
    {
        input: "pemberton",
        expected: "PMPTN11111"
    },
    {
        input: "penelope",
        expected: "PNLP111111"
    },
    {
        input: "penfold",
        expected: "PNFT111111"
    },
    {
        input: "penhey",
        expected: "PNA1111111"
    },
    {
        input: "penman",
        expected: "PNMN111111"
    },
    {
        input: "pennell",
        expected: "PNA1111111"
    },
    {
        input: "pennington",
        expected: "PNNKTN1111"
    },
    {
        input: "penno",
        expected: "PNA1111111"
    },
    {
        input: "penny",
        expected: "PNA1111111"
    },
    {
        input: "pennychuick",
        expected: "PNKK111111"
    },
    {
        input: "pennycuick",
        expected: "PNKK111111"
    },
    {
        input: "penpiatt",
        expected: "PNPT111111"
    },
    {
        input: "penrose",
        expected: "PNRS111111"
    },
    {
        input: "penson",
        expected: "PNSN111111"
    },
    {
        input: "pentecost",
        expected: "PNTKST1111"
    },
    {
        input: "penty",
        expected: "PNTA111111"
    },
    {
        input: "peoples",
        expected: "PPLS111111"
    },
    {
        input: "pepper",
        expected: "PPA1111111"
    },
    {
        input: "pepperell",
        expected: "PPRA111111"
    },
    {
        input: "pepperill",
        expected: "PPRA111111"
    },
    {
        input: "peppiatt",
        expected: "PPT1111111"
    },
    {
        input: "peppler",
        expected: "PPLA111111"
    },
    {
        input: "percival",
        expected: "PSFA111111"
    },
    {
        input: "percy",
        expected: "PSA1111111"
    },
    {
        input: "percystreetclair",
        expected: "PSSTRTKLA1"
    },
    {
        input: "pereira",
        expected: "PRRA111111"
    },
    {
        input: "pereival",
        expected: "PRFA111111"
    },
    {
        input: "perera",
        expected: "PRRA111111"
    },
    {
        input: "perey",
        expected: "PRA1111111"
    },
    {
        input: "perfin",
        expected: "PFN1111111"
    },
    {
        input: "perguson",
        expected: "PKSN111111"
    },
    {
        input: "perkins",
        expected: "PKNS111111"
    },
    {
        input: "perks",
        expected: "PKS1111111"
    },
    {
        input: "pernisky",
        expected: "PNSKA11111"
    },
    {
        input: "perrers",
        expected: "PRS1111111"
    },
    {
        input: "perriam",
        expected: "PRM1111111"
    },
    {
        input: "perriman",
        expected: "PRMN111111"
    },
    {
        input: "perrin",
        expected: "PRN1111111"
    },
    {
        input: "perriton",
        expected: "PRTN111111"
    },
    {
        input: "perry",
        expected: "PRA1111111"
    },
    {
        input: "pertha",
        expected: "PTA1111111"
    },
    {
        input: "peson",
        expected: "PSN1111111"
    },
    {
        input: "pete",
        expected: "PT11111111"
    },
    {
        input: "peter",
        expected: "PTA1111111"
    },
    {
        input: "peters",
        expected: "PTS1111111"
    },
    {
        input: "petersen",
        expected: "PTSN111111"
    },
    {
        input: "peterson",
        expected: "PTSN111111"
    },
    {
        input: "petherick",
        expected: "PTRK111111"
    },
    {
        input: "petre",
        expected: "PTA1111111"
    },
    {
        input: "petrie",
        expected: "PTRA111111"
    },
    {
        input: "petterson",
        expected: "PTSN111111"
    },
    {
        input: "pettet",
        expected: "PTT1111111"
    },
    {
        input: "pettigrew",
        expected: "PTKRA11111"
    },
    {
        input: "pettit",
        expected: "PTT1111111"
    },
    {
        input: "pettitt",
        expected: "PTT1111111"
    },
    {
        input: "pfeifer",
        expected: "PFFA111111"
    },
    {
        input: "phair",
        expected: "FA11111111"
    },
    {
        input: "phaup",
        expected: "FP11111111"
    },
    {
        input: "phbe",
        expected: "FP11111111"
    },
    {
        input: "phebe",
        expected: "FP11111111"
    },
    {
        input: "phedora",
        expected: "FTRA111111"
    },
    {
        input: "phelan",
        expected: "FLN1111111"
    },
    {
        input: "pheodora",
        expected: "FTRA111111"
    },
    {
        input: "philip",
        expected: "FLP1111111"
    },
    {
        input: "philippa",
        expected: "FLPA111111"
    },
    {
        input: "philips",
        expected: "FLPS111111"
    },
    {
        input: "phillip",
        expected: "FLP1111111"
    },
    {
        input: "phillipa",
        expected: "FLPA111111"
    },
    {
        input: "phillipps",
        expected: "FLPS111111"
    },
    {
        input: "phillips",
        expected: "FLPS111111"
    },
    {
        input: "phillis",
        expected: "FLS1111111"
    },
    {
        input: "philomena",
        expected: "FLMNA11111"
    },
    {
        input: "philp",
        expected: "FP11111111"
    },
    {
        input: "philpott",
        expected: "FPT1111111"
    },
    {
        input: "phimester",
        expected: "FMSTA11111"
    },
    {
        input: "phimister",
        expected: "FMSTA11111"
    },
    {
        input: "phoebe",
        expected: "FP11111111"
    },
    {
        input: "phoenix",
        expected: "FNK1111111"
    },
    {
        input: "phylis",
        expected: "FLS1111111"
    },
    {
        input: "phyliss",
        expected: "FLS1111111"
    },
    {
        input: "phyllis",
        expected: "FLS1111111"
    },
    {
        input: "picard",
        expected: "PKT1111111"
    },
    {
        input: "pice",
        expected: "PK11111111"
    },
    {
        input: "pickard",
        expected: "PKT1111111"
    },
    {
        input: "picken",
        expected: "PKN1111111"
    },
    {
        input: "pickering",
        expected: "PKRNK11111"
    },
    {
        input: "picket",
        expected: "PKT1111111"
    },
    {
        input: "pickett",
        expected: "PKT1111111"
    },
    {
        input: "pickford",
        expected: "PKFT111111"
    },
    {
        input: "pickles",
        expected: "PKLS111111"
    },
    {
        input: "picklis",
        expected: "PKLS111111"
    },
    {
        input: "pickup",
        expected: "PKP1111111"
    },
    {
        input: "pickworth",
        expected: "PKWT111111"
    },
    {
        input: "picton",
        expected: "PKTN111111"
    },
    {
        input: "piddingto",
        expected: "PTNKTA1111"
    },
    {
        input: "piddington",
        expected: "PTNKTN1111"
    },
    {
        input: "pidduck",
        expected: "PTK1111111"
    },
    {
        input: "pierard",
        expected: "PRT1111111"
    },
    {
        input: "pierce",
        expected: "PK11111111"
    },
    {
        input: "piercy",
        expected: "PSA1111111"
    },
    {
        input: "pigott",
        expected: "PKT1111111"
    },
    {
        input: "pike",
        expected: "PK11111111"
    },
    {
        input: "pilbrow",
        expected: "PPRA111111"
    },
    {
        input: "pile",
        expected: "PA11111111"
    },
    {
        input: "pilet",
        expected: "PLT1111111"
    },
    {
        input: "pilkington",
        expected: "PKNKTN1111"
    },
    {
        input: "pilling",
        expected: "PLNK111111"
    },
    {
        input: "pimley",
        expected: "PMLA111111"
    },
    {
        input: "pinder",
        expected: "PNTA111111"
    },
    {
        input: "pine",
        expected: "PN11111111"
    },
    {
        input: "pinfold",
        expected: "PNFT111111"
    },
    {
        input: "pink",
        expected: "PNK1111111"
    },
    {
        input: "pinkerton",
        expected: "PNKTN11111"
    },
    {
        input: "pinkham",
        expected: "PNKM111111"
    },
    {
        input: "pinkney",
        expected: "PNKNA11111"
    },
    {
        input: "pinnington",
        expected: "PNNKTN1111"
    },
    {
        input: "piper",
        expected: "PPA1111111"
    },
    {
        input: "pirie",
        expected: "PRA1111111"
    },
    {
        input: "pirrett",
        expected: "PRT1111111"
    },
    {
        input: "pistor",
        expected: "PSTA111111"
    },
    {
        input: "pitcher",
        expected: "PKA1111111"
    },
    {
        input: "pitfield",
        expected: "PTFT111111"
    },
    {
        input: "pithie",
        expected: "PTA1111111"
    },
    {
        input: "pitkethley",
        expected: "PTKTLA1111"
    },
    {
        input: "pittaway",
        expected: "PTWA111111"
    },
    {
        input: "pitts",
        expected: "PTS1111111"
    },
    {
        input: "pizey",
        expected: "PSA1111111"
    },
    {
        input: "plaice",
        expected: "PLK1111111"
    },
    {
        input: "plank",
        expected: "PLNK111111"
    },
    {
        input: "plato",
        expected: "PLTA111111"
    },
    {
        input: "plaw",
        expected: "PLA1111111"
    },
    {
        input: "playter",
        expected: "PLTA111111"
    },
    {
        input: "pleace",
        expected: "PLK1111111"
    },
    {
        input: "pleasance",
        expected: "PLSNK11111"
    },
    {
        input: "pleasant",
        expected: "PLSNT11111"
    },
    {
        input: "pledger",
        expected: "PLKA111111"
    },
    {
        input: "plew",
        expected: "PLA1111111"
    },
    {
        input: "plimmer",
        expected: "PLMA111111"
    },
    {
        input: "pluck",
        expected: "PLK1111111"
    },
    {
        input: "plumb",
        expected: "PLM1111111"
    },
    {
        input: "plumley",
        expected: "PLMLA11111"
    },
    {
        input: "plumridge",
        expected: "PLMRK11111"
    },
    {
        input: "plunket",
        expected: "PLNKT11111"
    },
    {
        input: "plunkett",
        expected: "PLNKT11111"
    },
    {
        input: "poat",
        expected: "PT11111111"
    },
    {
        input: "pocklingto",
        expected: "PKLNKTA111"
    },
    {
        input: "pocklington",
        expected: "PKLNKTN111"
    },
    {
        input: "pockson",
        expected: "PKSN111111"
    },
    {
        input: "poff",
        expected: "PF11111111"
    },
    {
        input: "poilock",
        expected: "PLK1111111"
    },
    {
        input: "pointon",
        expected: "PNTN111111"
    },
    {
        input: "poland",
        expected: "PLNT111111"
    },
    {
        input: "polglase",
        expected: "PKLS111111"
    },
    {
        input: "polkinghorn",
        expected: "PKNN111111"
    },
    {
        input: "polkinghorne",
        expected: "PKNN111111"
    },
    {
        input: "pollard",
        expected: "PLT1111111"
    },
    {
        input: "pollett",
        expected: "PLT1111111"
    },
    {
        input: "pollock",
        expected: "PLK1111111"
    },
    {
        input: "polloek",
        expected: "PLK1111111"
    },
    {
        input: "pollon",
        expected: "PLN1111111"
    },
    {
        input: "polly",
        expected: "PLA1111111"
    },
    {
        input: "polson",
        expected: "PSN1111111"
    },
    {
        input: "polwarth",
        expected: "PWT1111111"
    },
    {
        input: "polworth",
        expected: "PWT1111111"
    },
    {
        input: "pomeroy",
        expected: "PMRA111111"
    },
    {
        input: "pomies",
        expected: "PMS1111111"
    },
    {
        input: "ponsford",
        expected: "PNSFT11111"
    },
    {
        input: "pont",
        expected: "PNT1111111"
    },
    {
        input: "ponton",
        expected: "PNTN111111"
    },
    {
        input: "pontor",
        expected: "PNTA111111"
    },
    {
        input: "pool",
        expected: "PA11111111"
    },
    {
        input: "poole",
        expected: "PA11111111"
    },
    {
        input: "pope",
        expected: "PP11111111"
    },
    {
        input: "popham",
        expected: "PFM1111111"
    },
    {
        input: "poppelwell",
        expected: "PPWA111111"
    },
    {
        input: "popperell",
        expected: "PPRA111111"
    },
    {
        input: "popple",
        expected: "PPA1111111"
    },
    {
        input: "poppleton",
        expected: "PPLTN11111"
    },
    {
        input: "poppy",
        expected: "PPA1111111"
    },
    {
        input: "porrott",
        expected: "PRT1111111"
    },
    {
        input: "port",
        expected: "PT11111111"
    },
    {
        input: "port.eous",
        expected: "PTS1111111"
    },
    {
        input: "porteous",
        expected: "PTS1111111"
    },
    {
        input: "porter",
        expected: "PTA1111111"
    },
    {
        input: "porthous",
        expected: "PTS1111111"
    },
    {
        input: "porthouse",
        expected: "PTS1111111"
    },
    {
        input: "portwine",
        expected: "PTWN111111"
    },
    {
        input: "potter",
        expected: "PTA1111111"
    },
    {
        input: "potts",
        expected: "PTS1111111"
    },
    {
        input: "poulsen",
        expected: "PSN1111111"
    },
    {
        input: "poulson",
        expected: "PSN1111111"
    },
    {
        input: "poulter",
        expected: "PTA1111111"
    },
    {
        input: "pound",
        expected: "PNT1111111"
    },
    {
        input: "poupart",
        expected: "PPT1111111"
    },
    {
        input: "povey",
        expected: "PFA1111111"
    },
    {
        input: "powe",
        expected: "PA11111111"
    },
    {
        input: "powell",
        expected: "PWA1111111"
    },
    {
        input: "power",
        expected: "PWA1111111"
    },
    {
        input: "powley",
        expected: "PLA1111111"
    },
    {
        input: "poyntz",
        expected: "PNTS111111"
    },
    {
        input: "prain",
        expected: "PRN1111111"
    },
    {
        input: "pratchel",
        expected: "PRKA111111"
    },
    {
        input: "pratt",
        expected: "PRT1111111"
    },
    {
        input: "prattey",
        expected: "PRTA111111"
    },
    {
        input: "prattley",
        expected: "PRTLA11111"
    },
    {
        input: "pratzall",
        expected: "PRTSA11111"
    },
    {
        input: "pratzel",
        expected: "PRTSA11111"
    },
    {
        input: "pre",
        expected: "PA11111111"
    },
    {
        input: "prebble",
        expected: "PRPA111111"
    },
    {
        input: "preddy",
        expected: "PRTA111111"
    },
    {
        input: "preece",
        expected: "PRK1111111"
    },
    {
        input: "preen",
        expected: "PRN1111111"
    },
    {
        input: "prendergast",
        expected: "PRNTKST111"
    },
    {
        input: "prenderville",
        expected: "PRNTFA1111"
    },
    {
        input: "prentice",
        expected: "PRNTK11111"
    },
    {
        input: "presbury",
        expected: "PRSPRA1111"
    },
    {
        input: "prescott",
        expected: "PRSKT11111"
    },
    {
        input: "preston",
        expected: "PRSTN11111"
    },
    {
        input: "pretoria",
        expected: "PRTRA11111"
    },
    {
        input: "pretty",
        expected: "PRTA111111"
    },
    {
        input: "price",
        expected: "PRK1111111"
    },
    {
        input: "prichard",
        expected: "PRKT111111"
    },
    {
        input: "prictor",
        expected: "PRKTA11111"
    },
    {
        input: "pridham",
        expected: "PRTM111111"
    },
    {
        input: "priee",
        expected: "PRA1111111"
    },
    {
        input: "priest",
        expected: "PRST111111"
    },
    {
        input: "priestly",
        expected: "PRSTLA1111"
    },
    {
        input: "prince",
        expected: "PRNK111111"
    },
    {
        input: "pringle",
        expected: "PRNKA11111"
    },
    {
        input: "pringle:",
        expected: "PRNKA11111"
    },
    {
        input: "printz",
        expected: "PRNTS11111"
    },
    {
        input: "prior",
        expected: "PRA1111111"
    },
    {
        input: "prisca",
        expected: "PRSKA11111"
    },
    {
        input: "priscilla",
        expected: "PRSLA11111"
    },
    {
        input: "priston",
        expected: "PRSTN11111"
    },
    {
        input: "pritchard",
        expected: "PRKT111111"
    },
    {
        input: "pritchett",
        expected: "PRKT111111"
    },
    {
        input: "procter",
        expected: "PRKTA11111"
    },
    {
        input: "proctor",
        expected: "PRKTA11111"
    },
    {
        input: "pronse",
        expected: "PRNS111111"
    },
    {
        input: "propsting",
        expected: "PRPSTNK111"
    },
    {
        input: "prosser",
        expected: "PRSA111111"
    },
    {
        input: "prothesia",
        expected: "PRTSA11111"
    },
    {
        input: "proud",
        expected: "PRT1111111"
    },
    {
        input: "proudfoot",
        expected: "PRTFT11111"
    },
    {
        input: "prouse",
        expected: "PRS1111111"
    },
    {
        input: "prout",
        expected: "PRT1111111"
    },
    {
        input: "provan",
        expected: "PRFN111111"
    },
    {
        input: "proven",
        expected: "PRFN111111"
    },
    {
        input: "provo",
        expected: "PRFA111111"
    },
    {
        input: "prowse",
        expected: "PRS1111111"
    },
    {
        input: "prudence",
        expected: "PRTNK11111"
    },
    {
        input: "prudentchia",
        expected: "PRTNKA1111"
    },
    {
        input: "prvde",
        expected: "PFT1111111"
    },
    {
        input: "pryde",
        expected: "PRT1111111"
    },
    {
        input: "pryna",
        expected: "PRNA111111"
    },
    {
        input: "pryor",
        expected: "PRA1111111"
    },
    {
        input: "pucchegud",
        expected: "PKKT111111"
    },
    {
        input: "puddy",
        expected: "PTA1111111"
    },
    {
        input: "pullar",
        expected: "PLA1111111"
    },
    {
        input: "puller",
        expected: "PLA1111111"
    },
    {
        input: "pullyn",
        expected: "PLN1111111"
    },
    {
        input: "punch",
        expected: "PNK1111111"
    },
    {
        input: "purcell",
        expected: "PSA1111111"
    },
    {
        input: "purches",
        expected: "PKS1111111"
    },
    {
        input: "purdie",
        expected: "PTA1111111"
    },
    {
        input: "purnell",
        expected: "PNA1111111"
    },
    {
        input: "purtill",
        expected: "PTA1111111"
    },
    {
        input: "purton",
        expected: "PTN1111111"
    },
    {
        input: "purves",
        expected: "PFS1111111"
    },
    {
        input: "purvis",
        expected: "PFS1111111"
    },
    {
        input: "pybus",
        expected: "PPS1111111"
    },
    {
        input: "pye",
        expected: "PA11111111"
    },
    {
        input: "pyke",
        expected: "PK11111111"
    },
    {
        input: "pyle",
        expected: "PA11111111"
    },
    {
        input: "pym",
        expected: "PM11111111"
    },
    {
        input: "pyn",
        expected: "PN11111111"
    },
    {
        input: "pyne",
        expected: "PN11111111"
    },
    {
        input: "pynor",
        expected: "PNA1111111"
    },
    {
        input: "pyott",
        expected: "PT11111111"
    },
    {
        input: "pyper",
        expected: "PPA1111111"
    },
    {
        input: "pyrke",
        expected: "PK11111111"
    },
    {
        input: "pyster",
        expected: "PSTA111111"
    },
    {
        input: "pywell",
        expected: "PWA1111111"
    },
    {
        input: "q uinn",
        expected: "KN11111111"
    },
    {
        input: "qtto",
        expected: "KTA1111111"
    },
    {
        input: "quaid",
        expected: "KT11111111"
    },
    {
        input: "quaife",
        expected: "KF11111111"
    },
    {
        input: "quaile",
        expected: "KA11111111"
    },
    {
        input: "quam",
        expected: "KM11111111"
    },
    {
        input: "quan",
        expected: "KN11111111"
    },
    {
        input: "quarterma",
        expected: "KTMA111111"
    },
    {
        input: "quartermain",
        expected: "KTMN111111"
    },
    {
        input: "quartermaln",
        expected: "KTMN111111"
    },
    {
        input: "quarterman",
        expected: "KTMN111111"
    },
    {
        input: "queen",
        expected: "KN11111111"
    },
    {
        input: "queenie",
        expected: "KNA1111111"
    },
    {
        input: "quelch",
        expected: "KK11111111"
    },
    {
        input: "quennell",
        expected: "KNA1111111"
    },
    {
        input: "queree",
        expected: "KRA1111111"
    },
    {
        input: "quest",
        expected: "KST1111111"
    },
    {
        input: "quested",
        expected: "KSTT111111"
    },
    {
        input: "quickenden",
        expected: "KKNTN11111"
    },
    {
        input: "quickfall",
        expected: "KKFA111111"
    },
    {
        input: "quigg",
        expected: "KK11111111"
    },
    {
        input: "quigley",
        expected: "KKLA111111"
    },
    {
        input: "quill",
        expected: "KA11111111"
    },
    {
        input: "quin",
        expected: "KN11111111"
    },
    {
        input: "quine",
        expected: "KN11111111"
    },
    {
        input: "quinlan",
        expected: "KNLN111111"
    },
    {
        input: "quinn",
        expected: "KN11111111"
    },
    {
        input: "quinton",
        expected: "KNTN111111"
    },
    {
        input: "quirk",
        expected: "KK11111111"
    },
    {
        input: "quirke",
        expected: "KK11111111"
    },
    {
        input: "qvam",
        expected: "KFM1111111"
    },
    {
        input: "rabbidge",
        expected: "RPK1111111"
    },
    {
        input: "rabbitt",
        expected: "RPT1111111"
    },
    {
        input: "rac1kley",
        expected: "RKLA111111"
    },
    {
        input: "race",
        expected: "RK11111111"
    },
    {
        input: "rachael",
        expected: "RKA1111111"
    },
    {
        input: "rachal",
        expected: "RKA1111111"
    },
    {
        input: "rachall",
        expected: "RKA1111111"
    },
    {
        input: "rachel",
        expected: "RKA1111111"
    },
    {
        input: "rackham",
        expected: "RKM1111111"
    },
    {
        input: "rackley",
        expected: "RKLA111111"
    },
    {
        input: "radd",
        expected: "RT11111111"
    },
    {
        input: "radford",
        expected: "RTFT111111"
    },
    {
        input: "radium",
        expected: "RTM1111111"
    },
    {
        input: "rae",
        expected: "RA11111111"
    },
    {
        input: "raeburn",
        expected: "RPN1111111"
    },
    {
        input: "raffills",
        expected: "RFS1111111"
    },
    {
        input: "raglan",
        expected: "RKLN111111"
    },
    {
        input: "raillsford",
        expected: "RSFT111111"
    },
    {
        input: "railton",
        expected: "RTN1111111"
    },
    {
        input: "rainbow",
        expected: "RNPA111111"
    },
    {
        input: "raine",
        expected: "RN11111111"
    },
    {
        input: "raines",
        expected: "RNS1111111"
    },
    {
        input: "rainham",
        expected: "RNM1111111"
    },
    {
        input: "rains",
        expected: "RNS1111111"
    },
    {
        input: "rainsay",
        expected: "RNSA111111"
    },
    {
        input: "rainsford",
        expected: "RNSFT11111"
    },
    {
        input: "rainton",
        expected: "RNTN111111"
    },
    {
        input: "raiph",
        expected: "RF11111111"
    },
    {
        input: "raitt",
        expected: "RT11111111"
    },
    {
        input: "raler",
        expected: "RLA1111111"
    },
    {
        input: "rallinshaw",
        expected: "RLNSA11111"
    },
    {
        input: "ralor",
        expected: "RLA1111111"
    },
    {
        input: "ralph",
        expected: "RF11111111"
    },
    {
        input: "ralston",
        expected: "RSTN111111"
    },
    {
        input: "ralusay",
        expected: "RLSA111111"
    },
    {
        input: "ramage",
        expected: "RMK1111111"
    },
    {
        input: "rambaum",
        expected: "RMPM111111"
    },
    {
        input: "rampton",
        expected: "RMPTN11111"
    },
    {
        input: "ramsay",
        expected: "RMSA111111"
    },
    {
        input: "ramsbottom-isherwood",
        expected: "RMSPTMSWT1"
    },
    {
        input: "ramsden",
        expected: "RMSTN11111"
    },
    {
        input: "ramsey",
        expected: "RMSA111111"
    },
    {
        input: "randal",
        expected: "RNTA111111"
    },
    {
        input: "randall",
        expected: "RNTA111111"
    },
    {
        input: "randell",
        expected: "RNTA111111"
    },
    {
        input: "randle",
        expected: "RNTA111111"
    },
    {
        input: "randolph",
        expected: "RNTF111111"
    },
    {
        input: "ranger",
        expected: "RNKA111111"
    },
    {
        input: "rani",
        expected: "RNA1111111"
    },
    {
        input: "rankin",
        expected: "RNKN111111"
    },
    {
        input: "ransay",
        expected: "RNSA111111"
    },
    {
        input: "ransom",
        expected: "RNSM111111"
    },
    {
        input: "raper",
        expected: "RPA1111111"
    },
    {
        input: "raphael",
        expected: "RFA1111111"
    },
    {
        input: "rappe",
        expected: "RP11111111"
    },
    {
        input: "rapsom",
        expected: "RPSM111111"
    },
    {
        input: "rapson",
        expected: "RPSN111111"
    },
    {
        input: "rasmas",
        expected: "RSMS111111"
    },
    {
        input: "rasmussen",
        expected: "RSMSN11111"
    },
    {
        input: "rasrnussen",
        expected: "RSNSN11111"
    },
    {
        input: "rather",
        expected: "RTA1111111"
    },
    {
        input: "rattigan",
        expected: "RTKN111111"
    },
    {
        input: "rattley",
        expected: "RTLA111111"
    },
    {
        input: "rattray",
        expected: "RTRA111111"
    },
    {
        input: "raven",
        expected: "RFN1111111"
    },
    {
        input: "ravenscroft",
        expected: "RFNSKRFT11"
    },
    {
        input: "ravenswood",
        expected: "RFNSWT1111"
    },
    {
        input: "ravenvood",
        expected: "RFNFT11111"
    },
    {
        input: "ravenwood",
        expected: "RFNWT11111"
    },
    {
        input: "rawcliffe",
        expected: "RKLF111111"
    },
    {
        input: "rawe",
        expected: "RA11111111"
    },
    {
        input: "rawei",
        expected: "RWA1111111"
    },
    {
        input: "rawena",
        expected: "RWNA111111"
    },
    {
        input: "rawlence",
        expected: "RLNK111111"
    },
    {
        input: "rawley",
        expected: "RLA1111111"
    },
    {
        input: "rawlings",
        expected: "RLNKS11111"
    },
    {
        input: "rawlins",
        expected: "RLNS111111"
    },
    {
        input: "rawlinson",
        expected: "RLNSN11111"
    },
    {
        input: "rawnsley",
        expected: "RNSLA11111"
    },
    {
        input: "rawon",
        expected: "RWN1111111"
    },
    {
        input: "rawson",
        expected: "RSN1111111"
    },
    {
        input: "rawstron",
        expected: "RSTRN11111"
    },
    {
        input: "ray",
        expected: "RA11111111"
    },
    {
        input: "rayena",
        expected: "RNA1111111"
    },
    {
        input: "raymie",
        expected: "RMA1111111"
    },
    {
        input: "raymond",
        expected: "RMNT111111"
    },
    {
        input: "raymonde",
        expected: "RMNT111111"
    },
    {
        input: "raymund",
        expected: "RMNT111111"
    },
    {
        input: "rayna",
        expected: "RNA1111111"
    },
    {
        input: "rayner",
        expected: "RNA1111111"
    },
    {
        input: "rayson",
        expected: "RSN1111111"
    },
    {
        input: "rea",
        expected: "RA11111111"
    },
    {
        input: "read",
        expected: "RT11111111"
    },
    {
        input: "reader",
        expected: "RTA1111111"
    },
    {
        input: "readman",
        expected: "RTMN111111"
    },
    {
        input: "ready",
        expected: "RTA1111111"
    },
    {
        input: "real",
        expected: "RA11111111"
    },
    {
        input: "reardon",
        expected: "RTN1111111"
    },
    {
        input: "reay",
        expected: "RA11111111"
    },
    {
        input: "rebbecca",
        expected: "RPKA111111"
    },
    {
        input: "rebecca",
        expected: "RPKA111111"
    },
    {
        input: "rebeckah",
        expected: "RPKA111111"
    },
    {
        input: "rebekah",
        expected: "RPKA111111"
    },
    {
        input: "reddell",
        expected: "RTA1111111"
    },
    {
        input: "redder",
        expected: "RTA1111111"
    },
    {
        input: "reddie",
        expected: "RTA1111111"
    },
    {
        input: "redding",
        expected: "RTNK111111"
    },
    {
        input: "reddington",
        expected: "RTNKTN1111"
    },
    {
        input: "redfearn",
        expected: "RTFN111111"
    },
    {
        input: "redidingto",
        expected: "RTTNKTA111"
    },
    {
        input: "redman",
        expected: "RTMN111111"
    },
    {
        input: "redmayne",
        expected: "RTMN111111"
    },
    {
        input: "redmond",
        expected: "RTMNT11111"
    },
    {
        input: "redvers",
        expected: "RTFS111111"
    },
    {
        input: "redwood",
        expected: "RTWT111111"
    },
    {
        input: "reece",
        expected: "RK11111111"
    },
    {
        input: "reed",
        expected: "RT11111111"
    },
    {
        input: "reeder",
        expected: "RTA1111111"
    },
    {
        input: "reekie",
        expected: "RKA1111111"
    },
    {
        input: "rees",
        expected: "RS11111111"
    },
    {
        input: "reeve",
        expected: "RF11111111"
    },
    {
        input: "reeves",
        expected: "RFS1111111"
    },
    {
        input: "reggett",
        expected: "RKT1111111"
    },
    {
        input: "reggiardo",
        expected: "RKTA111111"
    },
    {
        input: "regina",
        expected: "RKNA111111"
    },
    {
        input: "reginald",
        expected: "RKNT111111"
    },
    {
        input: "regnault",
        expected: "RKNT111111"
    },
    {
        input: "reid",
        expected: "RT11111111"
    },
    {
        input: "reidboult",
        expected: "RTPT111111"
    },
    {
        input: "reider",
        expected: "RTA1111111"
    },
    {
        input: "reidle",
        expected: "RTA1111111"
    },
    {
        input: "reidy",
        expected: "RTA1111111"
    },
    {
        input: "reilly",
        expected: "RLA1111111"
    },
    {
        input: "reimer",
        expected: "RMA1111111"
    },
    {
        input: "rein",
        expected: "RN11111111"
    },
    {
        input: "reiss",
        expected: "RS11111111"
    },
    {
        input: "reita",
        expected: "RTA1111111"
    },
    {
        input: "rekowski",
        expected: "RKSKA11111"
    },
    {
        input: "rema",
        expected: "RMA1111111"
    },
    {
        input: "remie",
        expected: "RMA1111111"
    },
    {
        input: "remlie",
        expected: "RMLA111111"
    },
    {
        input: "rena",
        expected: "RNA1111111"
    },
    {
        input: "rendall",
        expected: "RNTA111111"
    },
    {
        input: "rendel",
        expected: "RNTA111111"
    },
    {
        input: "render",
        expected: "RNTA111111"
    },
    {
        input: "rendle",
        expected: "RNTA111111"
    },
    {
        input: "rene",
        expected: "RN11111111"
    },
    {
        input: "renee",
        expected: "RNA1111111"
    },
    {
        input: "renfree",
        expected: "RNFRA11111"
    },
    {
        input: "renfrew",
        expected: "RNFRA11111"
    },
    {
        input: "renna",
        expected: "RNA1111111"
    },
    {
        input: "renney",
        expected: "RNA1111111"
    },
    {
        input: "rennie",
        expected: "RNA1111111"
    },
    {
        input: "rennolds",
        expected: "RNTS111111"
    },
    {
        input: "renton",
        expected: "RNTN111111"
    },
    {
        input: "rentoul",
        expected: "RNTA111111"
    },
    {
        input: "renwick",
        expected: "RNWK111111"
    },
    {
        input: "reny",
        expected: "RNA1111111"
    },
    {
        input: "rero",
        expected: "RRA1111111"
    },
    {
        input: "restieaux",
        expected: "RSTK111111"
    },
    {
        input: "reta",
        expected: "RTA1111111"
    },
    {
        input: "retta",
        expected: "RTA1111111"
    },
    {
        input: "reuben",
        expected: "RPN1111111"
    },
    {
        input: "revina",
        expected: "RFNA111111"
    },
    {
        input: "rewa",
        expected: "RWA1111111"
    },
    {
        input: "rewi",
        expected: "RWA1111111"
    },
    {
        input: "rex",
        expected: "RK11111111"
    },
    {
        input: "rexiter",
        expected: "RKTA111111"
    },
    {
        input: "reyna",
        expected: "RNA1111111"
    },
    {
        input: "reynell",
        expected: "RNA1111111"
    },
    {
        input: "reynolds",
        expected: "RNTS111111"
    },
    {
        input: "rhind",
        expected: "NT11111111"
    },
    {
        input: "rhoda",
        expected: "TA11111111"
    },
    {
        input: "rhoderick",
        expected: "TRK1111111"
    },
    {
        input: "rhodes",
        expected: "TS11111111"
    },
    {
        input: "rhoma",
        expected: "MA11111111"
    },
    {
        input: "rhona",
        expected: "NA11111111"
    },
    {
        input: "rhynd",
        expected: "NT11111111"
    },
    {
        input: "riach",
        expected: "RK11111111"
    },
    {
        input: "rica",
        expected: "RKA1111111"
    },
    {
        input: "rice",
        expected: "RK11111111"
    },
    {
        input: "rich",
        expected: "RK11111111"
    },
    {
        input: "richald",
        expected: "RKT1111111"
    },
    {
        input: "richard",
        expected: "RKT1111111"
    },
    {
        input: "richardd",
        expected: "RKT1111111"
    },
    {
        input: "richards",
        expected: "RKTS111111"
    },
    {
        input: "richardso",
        expected: "RKTSA11111"
    },
    {
        input: "richardson",
        expected: "RKTSN11111"
    },
    {
        input: "richdale",
        expected: "RKTA111111"
    },
    {
        input: "richena",
        expected: "RKNA111111"
    },
    {
        input: "riches",
        expected: "RKS1111111"
    },
    {
        input: "richmond",
        expected: "RKMNT11111"
    },
    {
        input: "ricka",
        expected: "RKA1111111"
    },
    {
        input: "rickard",
        expected: "RKT1111111"
    },
    {
        input: "ridd",
        expected: "RT11111111"
    },
    {
        input: "riddell",
        expected: "RTA1111111"
    },
    {
        input: "riddick",
        expected: "RTK1111111"
    },
    {
        input: "ridding",
        expected: "RTNK111111"
    },
    {
        input: "riddle",
        expected: "RTA1111111"
    },
    {
        input: "riddoch",
        expected: "RTK1111111"
    },
    {
        input: "riddock",
        expected: "RTK1111111"
    },
    {
        input: "rideout",
        expected: "RTT1111111"
    },
    {
        input: "ridgeon",
        expected: "RKN1111111"
    },
    {
        input: "ridgewell",
        expected: "RKWA111111"
    },
    {
        input: "ridgwell",
        expected: "RKWA111111"
    },
    {
        input: "ridland",
        expected: "RTLNT11111"
    },
    {
        input: "ridler",
        expected: "RTLA111111"
    },
    {
        input: "ridley",
        expected: "RTLA111111"
    },
    {
        input: "riederer",
        expected: "RTRA111111"
    },
    {
        input: "riedle",
        expected: "RTA1111111"
    },
    {
        input: "rieka",
        expected: "RKA1111111"
    },
    {
        input: "riely",
        expected: "RLA1111111"
    },
    {
        input: "rieta",
        expected: "RTA1111111"
    },
    {
        input: "rigby",
        expected: "RKPA111111"
    },
    {
        input: "rigger",
        expected: "RKA1111111"
    },
    {
        input: "riggs",
        expected: "RKS1111111"
    },
    {
        input: "riha",
        expected: "RA11111111"
    },
    {
        input: "riley",
        expected: "RLA1111111"
    },
    {
        input: "rillstone",
        expected: "RSTN111111"
    },
    {
        input: "rilly",
        expected: "RLA1111111"
    },
    {
        input: "rima",
        expected: "RMA1111111"
    },
    {
        input: "rimeiman",
        expected: "RMMN111111"
    },
    {
        input: "rimmer",
        expected: "RMA1111111"
    },
    {
        input: "rimmington",
        expected: "RMNKTN1111"
    },
    {
        input: "rina",
        expected: "RNA1111111"
    },
    {
        input: "ringer",
        expected: "RNKA111111"
    },
    {
        input: "ringrose",
        expected: "RNKRS11111"
    },
    {
        input: "riorden",
        expected: "RTN1111111"
    },
    {
        input: "riparata",
        expected: "RPRTA11111"
    },
    {
        input: "ripley",
        expected: "RPLA111111"
    },
    {
        input: "ripp",
        expected: "RP11111111"
    },
    {
        input: "rippin",
        expected: "RPN1111111"
    },
    {
        input: "risk",
        expected: "RSK1111111"
    },
    {
        input: "rissman",
        expected: "RSMN111111"
    },
    {
        input: "rita",
        expected: "RTA1111111"
    },
    {
        input: "ritcbie",
        expected: "RTKPA11111"
    },
    {
        input: "ritchie",
        expected: "RKA1111111"
    },
    {
        input: "ritchle",
        expected: "RKA1111111"
    },
    {
        input: "rittenberg",
        expected: "RTNPK11111"
    },
    {
        input: "rive",
        expected: "RF11111111"
    },
    {
        input: "rivers",
        expected: "RFS1111111"
    },
    {
        input: "rivett",
        expected: "RFT1111111"
    },
    {
        input: "rix",
        expected: "RK11111111"
    },
    {
        input: "rixon",
        expected: "RKN1111111"
    },
    {
        input: "roa",
        expected: "RA11111111"
    },
    {
        input: "roach",
        expected: "RK11111111"
    },
    {
        input: "roache",
        expected: "RK11111111"
    },
    {
        input: "roan",
        expected: "RN11111111"
    },
    {
        input: "roanna",
        expected: "RNA1111111"
    },
    {
        input: "robb",
        expected: "RP11111111"
    },
    {
        input: "robbs",
        expected: "RPS1111111"
    },
    {
        input: "robena",
        expected: "RPNA111111"
    },
    {
        input: "roberston",
        expected: "RPSTN11111"
    },
    {
        input: "robert",
        expected: "RPT1111111"
    },
    {
        input: "roberta",
        expected: "RPTA111111"
    },
    {
        input: "robertina",
        expected: "RPTNA11111"
    },
    {
        input: "roberton",
        expected: "RPTN111111"
    },
    {
        input: "roberts",
        expected: "RPTS111111"
    },
    {
        input: "robertsan",
        expected: "RPTSN11111"
    },
    {
        input: "robertshaw",
        expected: "RPTSA11111"
    },
    {
        input: "robertsn",
        expected: "RPTSN11111"
    },
    {
        input: "robertson",
        expected: "RPTSN11111"
    },
    {
        input: "robetrson",
        expected: "RPTSN11111"
    },
    {
        input: "robilliard",
        expected: "RPLT111111"
    },
    {
        input: "robin",
        expected: "RPN1111111"
    },
    {
        input: "robina",
        expected: "RPNA111111"
    },
    {
        input: "robins",
        expected: "RPNS111111"
    },
    {
        input: "robinson",
        expected: "RPNSN11111"
    },
    {
        input: "robjohns",
        expected: "RPNS111111"
    },
    {
        input: "robortson",
        expected: "RPTSN11111"
    },
    {
        input: "robson",
        expected: "RPSN111111"
    },
    {
        input: "rocard",
        expected: "RKT1111111"
    },
    {
        input: "roche",
        expected: "RK11111111"
    },
    {
        input: "rockliff",
        expected: "RKLF111111"
    },
    {
        input: "rodden",
        expected: "RTN1111111"
    },
    {
        input: "roddick",
        expected: "RTK1111111"
    },
    {
        input: "roderick",
        expected: "RTRK111111"
    },
    {
        input: "roderique",
        expected: "RTRKA11111"
    },
    {
        input: "rodger",
        expected: "RKA1111111"
    },
    {
        input: "rodgers",
        expected: "RKS1111111"
    },
    {
        input: "rodgerson",
        expected: "RKSN111111"
    },
    {
        input: "rodgrer",
        expected: "RKRA111111"
    },
    {
        input: "rodman",
        expected: "RTMN111111"
    },
    {
        input: "rodney",
        expected: "RTNA111111"
    },
    {
        input: "rodrick",
        expected: "RTRK111111"
    },
    {
        input: "roe",
        expected: "RA11111111"
    },
    {
        input: "roebuck",
        expected: "RPK1111111"
    },
    {
        input: "rogan",
        expected: "RKN1111111"
    },
    {
        input: "rogen",
        expected: "RKN1111111"
    },
    {
        input: "roger",
        expected: "RKA1111111"
    },
    {
        input: "rogers",
        expected: "RKS1111111"
    },
    {
        input: "rogersion",
        expected: "RKSN111111"
    },
    {
        input: "rogerson",
        expected: "RKSN111111"
    },
    {
        input: "roggers",
        expected: "RKS1111111"
    },
    {
        input: "rohan",
        expected: "RN11111111"
    },
    {
        input: "rohertson",
        expected: "RTSN111111"
    },
    {
        input: "roland",
        expected: "RLNT111111"
    },
    {
        input: "rolfe",
        expected: "RF11111111"
    },
    {
        input: "rolinson",
        expected: "RLNSN11111"
    },
    {
        input: "rolland",
        expected: "RLNT111111"
    },
    {
        input: "rollins",
        expected: "RLNS111111"
    },
    {
        input: "rollinson",
        expected: "RLNSN11111"
    },
    {
        input: "rollo",
        expected: "RLA1111111"
    },
    {
        input: "rolson",
        expected: "RSN1111111"
    },
    {
        input: "rolton",
        expected: "RTN1111111"
    },
    {
        input: "roma",
        expected: "RMA1111111"
    },
    {
        input: "romeril",
        expected: "RMRA111111"
    },
    {
        input: "rona",
        expected: "RNA1111111"
    },
    {
        input: "ronald",
        expected: "RNT1111111"
    },
    {
        input: "ronaldson",
        expected: "RNTSN11111"
    },
    {
        input: "ronstad",
        expected: "RNSTT11111"
    },
    {
        input: "rooney",
        expected: "RNA1111111"
    },
    {
        input: "rorley",
        expected: "RLA1111111"
    },
    {
        input: "rosa",
        expected: "RSA1111111"
    },
    {
        input: "rosabell",
        expected: "RSPA111111"
    },
    {
        input: "rosabella",
        expected: "RSPLA11111"
    },
    {
        input: "rosaland",
        expected: "RSLNT11111"
    },
    {
        input: "rosaleene",
        expected: "RSLN111111"
    },
    {
        input: "rosalie",
        expected: "RSLA111111"
    },
    {
        input: "rosalind",
        expected: "RSLNT11111"
    },
    {
        input: "rosaline",
        expected: "RSLN111111"
    },
    {
        input: "rosalla",
        expected: "RSLA111111"
    },
    {
        input: "rosamond",
        expected: "RSMNT11111"
    },
    {
        input: "rosamund",
        expected: "RSMNT11111"
    },
    {
        input: "rosana",
        expected: "RSNA111111"
    },
    {
        input: "rosanah",
        expected: "RSNA111111"
    },
    {
        input: "rosanna",
        expected: "RSNA111111"
    },
    {
        input: "rosannah",
        expected: "RSNA111111"
    },
    {
        input: "rosanne",
        expected: "RSN1111111"
    },
    {
        input: "rosavear",
        expected: "RSFA111111"
    },
    {
        input: "roscena",
        expected: "RSNA111111"
    },
    {
        input: "roscow",
        expected: "RSKA111111"
    },
    {
        input: "rose",
        expected: "RS11111111"
    },
    {
        input: "roseana",
        expected: "RSNA111111"
    },
    {
        input: "roseanna",
        expected: "RSNA111111"
    },
    {
        input: "roseina",
        expected: "RSNA111111"
    },
    {
        input: "rosella",
        expected: "RSLA111111"
    },
    {
        input: "rosemay",
        expected: "RSMA111111"
    },
    {
        input: "rosemond",
        expected: "RSMNT11111"
    },
    {
        input: "rosena",
        expected: "RSNA111111"
    },
    {
        input: "rosenbroc",
        expected: "RSNPRK1111"
    },
    {
        input: "rosenbrock",
        expected: "RSNPRK1111"
    },
    {
        input: "rosenbrook",
        expected: "RSNPRK1111"
    },
    {
        input: "rosenlrock",
        expected: "RSNRK11111"
    },
    {
        input: "rosetta",
        expected: "RSTA111111"
    },
    {
        input: "rosevear",
        expected: "RSFA111111"
    },
    {
        input: "roseveare",
        expected: "RSFA111111"
    },
    {
        input: "rosewarne",
        expected: "RSWN111111"
    },
    {
        input: "rosie",
        expected: "RSA1111111"
    },
    {
        input: "rosiena",
        expected: "RSNA111111"
    },
    {
        input: "rosina",
        expected: "RSNA111111"
    },
    {
        input: "rosins",
        expected: "RSNS111111"
    },
    {
        input: "roskilley",
        expected: "RSKLA11111"
    },
    {
        input: "ross",
        expected: "RS11111111"
    },
    {
        input: "rossbotham",
        expected: "RSPTM11111"
    },
    {
        input: "rosser",
        expected: "RSA1111111"
    },
    {
        input: "rossiter",
        expected: "RSTA111111"
    },
    {
        input: "rosson",
        expected: "RSN1111111"
    },
    {
        input: "rothwell",
        expected: "RTWA111111"
    },
    {
        input: "rotting",
        expected: "RTNK111111"
    },
    {
        input: "rough",
        expected: "RF11111111"
    },
    {
        input: "roughan",
        expected: "RFN1111111"
    },
    {
        input: "roulston",
        expected: "RSTN111111"
    },
    {
        input: "round",
        expected: "RNT1111111"
    },
    {
        input: "rourke",
        expected: "RK11111111"
    },
    {
        input: "rousc",
        expected: "RSK1111111"
    },
    {
        input: "rouse",
        expected: "RS11111111"
    },
    {
        input: "roustad",
        expected: "RSTT111111"
    },
    {
        input: "rout",
        expected: "RT11111111"
    },
    {
        input: "routledge",
        expected: "RTLK111111"
    },
    {
        input: "routlege",
        expected: "RTLK111111"
    },
    {
        input: "rowan",
        expected: "RWN1111111"
    },
    {
        input: "rowden",
        expected: "RTN1111111"
    },
    {
        input: "rowe",
        expected: "RA11111111"
    },
    {
        input: "rowell",
        expected: "RWA1111111"
    },
    {
        input: "rowena",
        expected: "RWNA111111"
    },
    {
        input: "rowland",
        expected: "RLNT111111"
    },
    {
        input: "rowlands",
        expected: "RLNTS11111"
    },
    {
        input: "rowlatt",
        expected: "RLT1111111"
    },
    {
        input: "rowley",
        expected: "RLA1111111"
    },
    {
        input: "rowse",
        expected: "RS11111111"
    },
    {
        input: "roxburgh",
        expected: "RKPA111111"
    },
    {
        input: "roy",
        expected: "RA11111111"
    },
    {
        input: "royal",
        expected: "RA11111111"
    },
    {
        input: "roydhouse",
        expected: "RTS1111111"
    },
    {
        input: "rozel",
        expected: "RSA1111111"
    },
    {
        input: "rua",
        expected: "RA11111111"
    },
    {
        input: "ruahine",
        expected: "RN11111111"
    },
    {
        input: "ruben",
        expected: "RPN1111111"
    },
    {
        input: "rubena",
        expected: "RPNA111111"
    },
    {
        input: "rubenia",
        expected: "RPNA111111"
    },
    {
        input: "rubina",
        expected: "RPNA111111"
    },
    {
        input: "rubins",
        expected: "RPNS111111"
    },
    {
        input: "rubinson",
        expected: "RPNSN11111"
    },
    {
        input: "rubv",
        expected: "RPF1111111"
    },
    {
        input: "ruby",
        expected: "RPA1111111"
    },
    {
        input: "rubye",
        expected: "RPA1111111"
    },
    {
        input: "ruck",
        expected: "RK11111111"
    },
    {
        input: "rudd",
        expected: "RT11111111"
    },
    {
        input: "ruddiman",
        expected: "RTMN111111"
    },
    {
        input: "ruddle",
        expected: "RTA1111111"
    },
    {
        input: "ruddy",
        expected: "RTA1111111"
    },
    {
        input: "rudhall",
        expected: "RTA1111111"
    },
    {
        input: "rudkin",
        expected: "RTKN111111"
    },
    {
        input: "rudland",
        expected: "RTLNT11111"
    },
    {
        input: "rudolf",
        expected: "RTF1111111"
    },
    {
        input: "rudolph",
        expected: "RTF1111111"
    },
    {
        input: "ruff",
        expected: "RF11111111"
    },
    {
        input: "ruffell",
        expected: "RFA1111111"
    },
    {
        input: "rufus",
        expected: "RFS1111111"
    },
    {
        input: "rugby",
        expected: "RKPA111111"
    },
    {
        input: "ruhen",
        expected: "RN11111111"
    },
    {
        input: "rui",
        expected: "RA11111111"
    },
    {
        input: "ruia",
        expected: "RA11111111"
    },
    {
        input: "rule",
        expected: "RA11111111"
    },
    {
        input: "rumble",
        expected: "RMPA111111"
    },
    {
        input: "rumley",
        expected: "RMLA111111"
    },
    {
        input: "rump",
        expected: "RMP1111111"
    },
    {
        input: "rumsey",
        expected: "RMSA111111"
    },
    {
        input: "runa",
        expected: "RNA1111111"
    },
    {
        input: "runcie",
        expected: "RNSA111111"
    },
    {
        input: "runciman",
        expected: "RNSMN11111"
    },
    {
        input: "rundle",
        expected: "RNTA111111"
    },
    {
        input: "ruper",
        expected: "RPA1111111"
    },
    {
        input: "rupert",
        expected: "RPT1111111"
    },
    {
        input: "ruruhira",
        expected: "RRRA111111"
    },
    {
        input: "rusbatch",
        expected: "RSPK111111"
    },
    {
        input: "rush",
        expected: "RS11111111"
    },
    {
        input: "rush-munro",
        expected: "RSMNRA1111"
    },
    {
        input: "rushton",
        expected: "RSTN111111"
    },
    {
        input: "rushworth",
        expected: "RSWT111111"
    },
    {
        input: "russell",
        expected: "RSA1111111"
    },
    {
        input: "rust",
        expected: "RST1111111"
    },
    {
        input: "ruston",
        expected: "RSTN111111"
    },
    {
        input: "ruth",
        expected: "RT11111111"
    },
    {
        input: "rutherfor",
        expected: "RTFA111111"
    },
    {
        input: "rutherforcl",
        expected: "RTFKA11111"
    },
    {
        input: "rutherford",
        expected: "RTFT111111"
    },
    {
        input: "ruthsatz",
        expected: "RTSTS11111"
    },
    {
        input: "ruthven",
        expected: "RTFN111111"
    },
    {
        input: "rutland",
        expected: "RTLNT11111"
    },
    {
        input: "rutledge",
        expected: "RTLK111111"
    },
    {
        input: "rutter",
        expected: "RTA1111111"
    },
    {
        input: "ruttledge",
        expected: "RTLK111111"
    },
    {
        input: "ryall",
        expected: "RA11111111"
    },
    {
        input: "ryan",
        expected: "RN11111111"
    },
    {
        input: "ryburn",
        expected: "RPN1111111"
    },
    {
        input: "ryder",
        expected: "RTA1111111"
    },
    {
        input: "rylance",
        expected: "RLNK111111"
    },
    {
        input: "rylatt",
        expected: "RLT1111111"
    },
    {
        input: "saah",
        expected: "SA11111111"
    },
    {
        input: "saba",
        expected: "SPA1111111"
    },
    {
        input: "sabina",
        expected: "SPNA111111"
    },
    {
        input: "sabiston",
        expected: "SPSTN11111"
    },
    {
        input: "sachtler",
        expected: "SKTLA11111"
    },
    {
        input: "sadd",
        expected: "ST11111111"
    },
    {
        input: "sadie",
        expected: "STA1111111"
    },
    {
        input: "sadler",
        expected: "STLA111111"
    },
    {
        input: "safey",
        expected: "SFA1111111"
    },
    {
        input: "sagar",
        expected: "SKA1111111"
    },
    {
        input: "sage",
        expected: "SK11111111"
    },
    {
        input: "saggers",
        expected: "SKS1111111"
    },
    {
        input: "saidie",
        expected: "STA1111111"
    },
    {
        input: "saimond",
        expected: "SMNT111111"
    },
    {
        input: "sainsbury",
        expected: "SNSPRA1111"
    },
    {
        input: "salinger",
        expected: "SLNKA11111"
    },
    {
        input: "salisbury",
        expected: "SLSPRA1111"
    },
    {
        input: "sallderson",
        expected: "STSN111111"
    },
    {
        input: "salmon",
        expected: "SMN1111111"
    },
    {
        input: "salmond",
        expected: "SMNT111111"
    },
    {
        input: "salt",
        expected: "ST11111111"
    },
    {
        input: "salter",
        expected: "STA1111111"
    },
    {
        input: "sam",
        expected: "SM11111111"
    },
    {
        input: "sampson",
        expected: "SMPSN11111"
    },
    {
        input: "samson",
        expected: "SMSN111111"
    },
    {
        input: "samuda",
        expected: "SMTA111111"
    },
    {
        input: "samuel",
        expected: "SMA1111111"
    },
    {
        input: "samuelena",
        expected: "SMLNA11111"
    },
    {
        input: "samuels",
        expected: "SMS1111111"
    },
    {
        input: "sanaway",
        expected: "SNWA111111"
    },
    {
        input: "sand",
        expected: "SNT1111111"
    },
    {
        input: "sanders",
        expected: "SNTS111111"
    },
    {
        input: "sanderson",
        expected: "SNTSN11111"
    },
    {
        input: "sandes",
        expected: "SNTS111111"
    },
    {
        input: "sandey",
        expected: "SNTA111111"
    },
    {
        input: "sandilands",
        expected: "SNTLNTS111"
    },
    {
        input: "sandland",
        expected: "SNTLNT1111"
    },
    {
        input: "sandle",
        expected: "SNTA111111"
    },
    {
        input: "sando",
        expected: "SNTA111111"
    },
    {
        input: "sandom",
        expected: "SNTM111111"
    },
    {
        input: "sandrey",
        expected: "SNTRA11111"
    },
    {
        input: "sandry",
        expected: "SNTRA11111"
    },
    {
        input: "sands",
        expected: "SNTS111111"
    },
    {
        input: "sandys",
        expected: "SNTS111111"
    },
    {
        input: "sangster",
        expected: "SNKSTA1111"
    },
    {
        input: "sansom",
        expected: "SNSM111111"
    },
    {
        input: "sanson",
        expected: "SNSN111111"
    },
    {
        input: "sanuel",
        expected: "SNA1111111"
    },
    {
        input: "sapsford",
        expected: "SPSFT11111"
    },
    {
        input: "sapwell",
        expected: "SPWA111111"
    },
    {
        input: "sara",
        expected: "SRA1111111"
    },
    {
        input: "sarah",
        expected: "SRA1111111"
    },
    {
        input: "sargeant",
        expected: "SKNT111111"
    },
    {
        input: "sarginson",
        expected: "SKNSN11111"
    },
    {
        input: "sarkies",
        expected: "SKS1111111"
    },
    {
        input: "satterthwaite",
        expected: "STTWT11111"
    },
    {
        input: "saul",
        expected: "SA11111111"
    },
    {
        input: "saunders",
        expected: "SNTS111111"
    },
    {
        input: "saunderson",
        expected: "SNTSN11111"
    },
    {
        input: "savage",
        expected: "SFK1111111"
    },
    {
        input: "saverio",
        expected: "SFRA111111"
    },
    {
        input: "savigny",
        expected: "SFKNA11111"
    },
    {
        input: "savory",
        expected: "SFRA111111"
    },
    {
        input: "sawers",
        expected: "SWS1111111"
    },
    {
        input: "sawyer",
        expected: "SWA1111111"
    },
    {
        input: "saxby",
        expected: "SKPA111111"
    },
    {
        input: "saxon",
        expected: "SKN1111111"
    },
    {
        input: "saxton",
        expected: "SKTN111111"
    },
    {
        input: "say",
        expected: "SA11111111"
    },
    {
        input: "sayer",
        expected: "SA11111111"
    },
    {
        input: "sayers",
        expected: "SS11111111"
    },
    {
        input: "scager",
        expected: "SKKA111111"
    },
    {
        input: "scaife",
        expected: "SKF1111111"
    },
    {
        input: "scales",
        expected: "SKLS111111"
    },
    {
        input: "scammell",
        expected: "SKMA111111"
    },
    {
        input: "scandrett",
        expected: "SKNTRT1111"
    },
    {
        input: "scanlan",
        expected: "SKNLN11111"
    },
    {
        input: "scanlon",
        expected: "SKNLN11111"
    },
    {
        input: "scannell",
        expected: "SKNA111111"
    },
    {
        input: "scarfe",
        expected: "SKF1111111"
    },
    {
        input: "schapansk",
        expected: "SKPNSK1111"
    },
    {
        input: "schapanski",
        expected: "SKPNSKA111"
    },
    {
        input: "schaper",
        expected: "SKPA111111"
    },
    {
        input: "schaumann",
        expected: "SKMN111111"
    },
    {
        input: "scherek",
        expected: "SKRK111111"
    },
    {
        input: "schlaadt",
        expected: "SKLT111111"
    },
    {
        input: "schluter",
        expected: "SKLTA11111"
    },
    {
        input: "schmaltz",
        expected: "SKMTS11111"
    },
    {
        input: "schmeltz",
        expected: "SKMTS11111"
    },
    {
        input: "schmelz",
        expected: "SKMS111111"
    },
    {
        input: "schmetz",
        expected: "SKMTS11111"
    },
    {
        input: "schmidt",
        expected: "SKMT111111"
    },
    {
        input: "schofield",
        expected: "SKFT111111"
    },
    {
        input: "scholes",
        expected: "SKLS111111"
    },
    {
        input: "schollar",
        expected: "SKLA111111"
    },
    {
        input: "scholtz",
        expected: "SKTS111111"
    },
    {
        input: "schrick",
        expected: "SKRK111111"
    },
    {
        input: "schroeder",
        expected: "SKRTA11111"
    },
    {
        input: "schruffer",
        expected: "SKRFA11111"
    },
    {
        input: "schulenbe",
        expected: "SKLNP11111"
    },
    {
        input: "schulenberg",
        expected: "SKLNPK1111"
    },
    {
        input: "schulenbur",
        expected: "SKLNPA1111"
    },
    {
        input: "schulenburg",
        expected: "SKLNPK1111"
    },
    {
        input: "schultz",
        expected: "SKTS111111"
    },
    {
        input: "schultze",
        expected: "SKTS111111"
    },
    {
        input: "schwartfeger",
        expected: "SKWTFKA111"
    },
    {
        input: "scobie",
        expected: "SKPA111111"
    },
    {
        input: "scoble",
        expected: "SKPA111111"
    },
    {
        input: "scoffeld",
        expected: "SKFT111111"
    },
    {
        input: "scofieid",
        expected: "SKFT111111"
    },
    {
        input: "scofield",
        expected: "SKFT111111"
    },
    {
        input: "scohle",
        expected: "SKA1111111"
    },
    {
        input: "scoles",
        expected: "SKLS111111"
    },
    {
        input: "scollay",
        expected: "SKLA111111"
    },
    {
        input: "scolon",
        expected: "SKLN111111"
    },
    {
        input: "scoones",
        expected: "SKNS111111"
    },
    {
        input: "scores",
        expected: "SKRS111111"
    },
    {
        input: "scorgie",
        expected: "SKKA111111"
    },
    {
        input: "scott",
        expected: "SKT1111111"
    },
    {
        input: "scoular",
        expected: "SKLA111111"
    },
    {
        input: "scouler",
        expected: "SKLA111111"
    },
    {
        input: "scoullar",
        expected: "SKLA111111"
    },
    {
        input: "scrivener",
        expected: "SKRFNA1111"
    },
    {
        input: "scrymgeour",
        expected: "SKRMKA1111"
    },
    {
        input: "scudamore",
        expected: "SKTMA11111"
    },
    {
        input: "scully",
        expected: "SKLA111111"
    },
    {
        input: "sculpher",
        expected: "SKFA111111"
    },
    {
        input: "scurr",
        expected: "SKA1111111"
    },
    {
        input: "seager",
        expected: "SKA1111111"
    },
    {
        input: "seal",
        expected: "SA11111111"
    },
    {
        input: "seales",
        expected: "SLS1111111"
    },
    {
        input: "seaman",
        expected: "SMN1111111"
    },
    {
        input: "seamer",
        expected: "SMA1111111"
    },
    {
        input: "searchfield",
        expected: "SKFT111111"
    },
    {
        input: "searchileld",
        expected: "SKLT111111"
    },
    {
        input: "searl",
        expected: "SA11111111"
    },
    {
        input: "searle",
        expected: "SA11111111"
    },
    {
        input: "season",
        expected: "SSN1111111"
    },
    {
        input: "seath",
        expected: "ST11111111"
    },
    {
        input: "seaton",
        expected: "STN1111111"
    },
    {
        input: "seatree",
        expected: "STRA111111"
    },
    {
        input: "seaward",
        expected: "SWT1111111"
    },
    {
        input: "sedal",
        expected: "STA1111111"
    },
    {
        input: "sedden",
        expected: "STN1111111"
    },
    {
        input: "seddon",
        expected: "STN1111111"
    },
    {
        input: "seed",
        expected: "ST11111111"
    },
    {
        input: "seehof",
        expected: "SF11111111"
    },
    {
        input: "seelen",
        expected: "SLN1111111"
    },
    {
        input: "seguin",
        expected: "SKN1111111"
    },
    {
        input: "seherek",
        expected: "SRK1111111"
    },
    {
        input: "seidelin",
        expected: "STLN111111"
    },
    {
        input: "seigle",
        expected: "SKA1111111"
    },
    {
        input: "selah",
        expected: "SLA1111111"
    },
    {
        input: "selby",
        expected: "SPA1111111"
    },
    {
        input: "selem",
        expected: "SLM1111111"
    },
    {
        input: "selena",
        expected: "SLNA111111"
    },
    {
        input: "self",
        expected: "SF11111111"
    },
    {
        input: "selige",
        expected: "SLK1111111"
    },
    {
        input: "selina",
        expected: "SLNA111111"
    },
    {
        input: "selinda",
        expected: "SLNTA11111"
    },
    {
        input: "sell",
        expected: "SA11111111"
    },
    {
        input: "sellar",
        expected: "SLA1111111"
    },
    {
        input: "sellars",
        expected: "SLS1111111"
    },
    {
        input: "seller",
        expected: "SLA1111111"
    },
    {
        input: "selma",
        expected: "SMA1111111"
    },
    {
        input: "selwyn",
        expected: "SWN1111111"
    },
    {
        input: "semple",
        expected: "SMPA111111"
    },
    {
        input: "senior",
        expected: "SNA1111111"
    },
    {
        input: "seott",
        expected: "ST11111111"
    },
    {
        input: "septimus",
        expected: "SPTMS11111"
    },
    {
        input: "seque",
        expected: "SKA1111111"
    },
    {
        input: "serafina",
        expected: "SRFNA11111"
    },
    {
        input: "sergia",
        expected: "SKA1111111"
    },
    {
        input: "service",
        expected: "SFK1111111"
    },
    {
        input: "seth",
        expected: "ST11111111"
    },
    {
        input: "setter",
        expected: "STA1111111"
    },
    {
        input: "sevenson",
        expected: "SFNSN11111"
    },
    {
        input: "sew hoy",
        expected: "SWA1111111"
    },
    {
        input: "sewart",
        expected: "SWT1111111"
    },
    {
        input: "sewell",
        expected: "SWA1111111"
    },
    {
        input: "sewhoy",
        expected: "SWA1111111"
    },
    {
        input: "sexton",
        expected: "SKTN111111"
    },
    {
        input: "seymour",
        expected: "SMA1111111"
    },
    {
        input: "shackell",
        expected: "SKA1111111"
    },
    {
        input: "shackleton",
        expected: "SKLTN11111"
    },
    {
        input: "shacklock",
        expected: "SKLK111111"
    },
    {
        input: "shadbolt",
        expected: "STPT111111"
    },
    {
        input: "shallcrass",
        expected: "SKRS111111"
    },
    {
        input: "shallish",
        expected: "SLS1111111"
    },
    {
        input: "shalpe",
        expected: "SP11111111"
    },
    {
        input: "shanahan",
        expected: "SNN1111111"
    },
    {
        input: "shand",
        expected: "SNT1111111"
    },
    {
        input: "shankland",
        expected: "SNKLNT1111"
    },
    {
        input: "shanks",
        expected: "SNKS111111"
    },
    {
        input: "shann",
        expected: "SN11111111"
    },
    {
        input: "shannahan",
        expected: "SNN1111111"
    },
    {
        input: "shannon",
        expected: "SNN1111111"
    },
    {
        input: "shardlow",
        expected: "STLA111111"
    },
    {
        input: "sharkey",
        expected: "SKA1111111"
    },
    {
        input: "sharkie",
        expected: "SKA1111111"
    },
    {
        input: "sharland",
        expected: "SLNT111111"
    },
    {
        input: "sharp",
        expected: "SP11111111"
    },
    {
        input: "sharpe",
        expected: "SP11111111"
    },
    {
        input: "shaw",
        expected: "SA11111111"
    },
    {
        input: "shea",
        expected: "SA11111111"
    },
    {
        input: "shea-lawlo",
        expected: "SLLA111111"
    },
    {
        input: "shea-lawlor",
        expected: "SLLA111111"
    },
    {
        input: "shearer",
        expected: "SRA1111111"
    },
    {
        input: "shearing",
        expected: "SRNK111111"
    },
    {
        input: "shears",
        expected: "SS11111111"
    },
    {
        input: "shearsby",
        expected: "SSPA111111"
    },
    {
        input: "sheath",
        expected: "ST11111111"
    },
    {
        input: "sheddan",
        expected: "STN1111111"
    },
    {
        input: "sheed",
        expected: "ST11111111"
    },
    {
        input: "sheehan",
        expected: "SN11111111"
    },
    {
        input: "sheehy",
        expected: "SA11111111"
    },
    {
        input: "sheen",
        expected: "SN11111111"
    },
    {
        input: "sheenan",
        expected: "SNN1111111"
    },
    {
        input: "sheila",
        expected: "SLA1111111"
    },
    {
        input: "sheldrake",
        expected: "STRK111111"
    },
    {
        input: "shelia",
        expected: "SLA1111111"
    },
    {
        input: "shelton",
        expected: "STN1111111"
    },
    {
        input: "shelverton",
        expected: "SFTN111111"
    },
    {
        input: "shene",
        expected: "SN11111111"
    },
    {
        input: "shenken",
        expected: "SNKN111111"
    },
    {
        input: "shennan",
        expected: "SNN1111111"
    },
    {
        input: "shephard",
        expected: "SFT1111111"
    },
    {
        input: "shepherd",
        expected: "SFT1111111"
    },
    {
        input: "shepparcl",
        expected: "SPKA111111"
    },
    {
        input: "sheppard",
        expected: "SPT1111111"
    },
    {
        input: "shepperd",
        expected: "SPT1111111"
    },
    {
        input: "shepphard",
        expected: "SPFT111111"
    },
    {
        input: "sherburd",
        expected: "SPT1111111"
    },
    {
        input: "sherer",
        expected: "SRA1111111"
    },
    {
        input: "sheridan",
        expected: "SRTN111111"
    },
    {
        input: "sheridian",
        expected: "SRTN111111"
    },
    {
        input: "sheriff",
        expected: "SRF1111111"
    },
    {
        input: "sherlaw",
        expected: "SLA1111111"
    },
    {
        input: "sherlock",
        expected: "SLK1111111"
    },
    {
        input: "sherriff",
        expected: "SRF1111111"
    },
    {
        input: "sherwill",
        expected: "SWA1111111"
    },
    {
        input: "sherwood",
        expected: "SWT1111111"
    },
    {
        input: "shieffelbien",
        expected: "SFPN111111"
    },
    {
        input: "shiel",
        expected: "SA11111111"
    },
    {
        input: "shiela",
        expected: "SLA1111111"
    },
    {
        input: "shields",
        expected: "STS1111111"
    },
    {
        input: "shiels",
        expected: "SS11111111"
    },
    {
        input: "shier",
        expected: "SA11111111"
    },
    {
        input: "shierlaw",
        expected: "SLA1111111"
    },
    {
        input: "shiffington",
        expected: "SFNKTN1111"
    },
    {
        input: "shilcock",
        expected: "SKK1111111"
    },
    {
        input: "shillum",
        expected: "SLM1111111"
    },
    {
        input: "shilton",
        expected: "STN1111111"
    },
    {
        input: "shine",
        expected: "SN11111111"
    },
    {
        input: "shing",
        expected: "SNK1111111"
    },
    {
        input: "shipman",
        expected: "SPMN111111"
    },
    {
        input: "shirer",
        expected: "SRA1111111"
    },
    {
        input: "shires",
        expected: "SRS1111111"
    },
    {
        input: "shirley",
        expected: "SLA1111111"
    },
    {
        input: "shirreffs",
        expected: "SRFS111111"
    },
    {
        input: "shona",
        expected: "SNA1111111"
    },
    {
        input: "shore",
        expected: "SA11111111"
    },
    {
        input: "shorney",
        expected: "SNA1111111"
    },
    {
        input: "short",
        expected: "ST11111111"
    },
    {
        input: "shortt",
        expected: "ST11111111"
    },
    {
        input: "shrimpton",
        expected: "SRMPTN1111"
    },
    {
        input: "shrubsole",
        expected: "SRPSA11111"
    },
    {
        input: "shuffill",
        expected: "SFA1111111"
    },
    {
        input: "shugar",
        expected: "SKA1111111"
    },
    {
        input: "shutt",
        expected: "ST11111111"
    },
    {
        input: "siah",
        expected: "SA11111111"
    },
    {
        input: "sibbald",
        expected: "SPT1111111"
    },
    {
        input: "sibley",
        expected: "SPLA111111"
    },
    {
        input: "sibyl",
        expected: "SPA1111111"
    },
    {
        input: "sickels",
        expected: "SKS1111111"
    },
    {
        input: "sidell",
        expected: "STA1111111"
    },
    {
        input: "sidey",
        expected: "STA1111111"
    },
    {
        input: "sidney",
        expected: "STNA111111"
    },
    {
        input: "sidon",
        expected: "STN1111111"
    },
    {
        input: "sidona",
        expected: "STNA111111"
    },
    {
        input: "sidoy",
        expected: "STA1111111"
    },
    {
        input: "sievwright",
        expected: "SFRT111111"
    },
    {
        input: "signa",
        expected: "SKNA111111"
    },
    {
        input: "signe",
        expected: "SKN1111111"
    },
    {
        input: "sigrid",
        expected: "SKRT111111"
    },
    {
        input: "silas",
        expected: "SLS1111111"
    },
    {
        input: "silena",
        expected: "SLNA111111"
    },
    {
        input: "silk",
        expected: "SK11111111"
    },
    {
        input: "silken",
        expected: "SKN1111111"
    },
    {
        input: "silsby",
        expected: "SSPA111111"
    },
    {
        input: "silva",
        expected: "SFA1111111"
    },
    {
        input: "silver",
        expected: "SFA1111111"
    },
    {
        input: "silverstone",
        expected: "SFSTN11111"
    },
    {
        input: "silvertsen",
        expected: "SFTSN11111"
    },
    {
        input: "silvester",
        expected: "SFSTA11111"
    },
    {
        input: "silvi",
        expected: "SFA1111111"
    },
    {
        input: "sim",
        expected: "SM11111111"
    },
    {
        input: "sime",
        expected: "SM11111111"
    },
    {
        input: "simeon",
        expected: "SMN1111111"
    },
    {
        input: "simes",
        expected: "SMS1111111"
    },
    {
        input: "simkin",
        expected: "SMKN111111"
    },
    {
        input: "simm",
        expected: "SM11111111"
    },
    {
        input: "simmonds",
        expected: "SMNTS11111"
    },
    {
        input: "simmons",
        expected: "SMNS111111"
    },
    {
        input: "simms",
        expected: "SMS1111111"
    },
    {
        input: "simnons",
        expected: "SMNNS11111"
    },
    {
        input: "simon",
        expected: "SMN1111111"
    },
    {
        input: "simons",
        expected: "SMNS111111"
    },
    {
        input: "simonsen",
        expected: "SMNSN11111"
    },
    {
        input: "simpkins",
        expected: "SMPKNS1111"
    },
    {
        input: "simpson",
        expected: "SMPSN11111"
    },
    {
        input: "sims",
        expected: "SMS1111111"
    },
    {
        input: "simson",
        expected: "SMSN111111"
    },
    {
        input: "sina",
        expected: "SNA1111111"
    },
    {
        input: "sinclair",
        expected: "SNKLA11111"
    },
    {
        input: "sinclait",
        expected: "SNKLT11111"
    },
    {
        input: "sinclar",
        expected: "SNKLA11111"
    },
    {
        input: "sincock",
        expected: "SNKK111111"
    },
    {
        input: "sincok",
        expected: "SNKK111111"
    },
    {
        input: "sing",
        expected: "SNK1111111"
    },
    {
        input: "singleton",
        expected: "SNKLTN1111"
    },
    {
        input: "sings",
        expected: "SNKS111111"
    },
    {
        input: "sinith",
        expected: "SNT1111111"
    },
    {
        input: "sinnamon",
        expected: "SNMN111111"
    },
    {
        input: "sinton",
        expected: "SNTN111111"
    },
    {
        input: "sirnmonds",
        expected: "SNMNTS1111"
    },
    {
        input: "sise",
        expected: "SS11111111"
    },
    {
        input: "sissy",
        expected: "SSA1111111"
    },
    {
        input: "sitley",
        expected: "STLA111111"
    },
    {
        input: "sitopson",
        expected: "STPSN11111"
    },
    {
        input: "sivell",
        expected: "SFA1111111"
    },
    {
        input: "sivertsen",
        expected: "SFTSN11111"
    },
    {
        input: "sivewright",
        expected: "SFRT111111"
    },
    {
        input: "sixton",
        expected: "SKTN111111"
    },
    {
        input: "sizen",
        expected: "SSN1111111"
    },
    {
        input: "sizer",
        expected: "SSA1111111"
    },
    {
        input: "skeane",
        expected: "SKN1111111"
    },
    {
        input: "skeels",
        expected: "SKS1111111"
    },
    {
        input: "skeen",
        expected: "SKN1111111"
    },
    {
        input: "skeene",
        expected: "SKN1111111"
    },
    {
        input: "skeet",
        expected: "SKT1111111"
    },
    {
        input: "skelton",
        expected: "SKTN111111"
    },
    {
        input: "skene",
        expected: "SKN1111111"
    },
    {
        input: "skeoch",
        expected: "SKK1111111"
    },
    {
        input: "skerrett",
        expected: "SKRT111111"
    },
    {
        input: "skiffington",
        expected: "SKFNKTN111"
    },
    {
        input: "skilton",
        expected: "SKTN111111"
    },
    {
        input: "skimer",
        expected: "SKMA111111"
    },
    {
        input: "skinner",
        expected: "SKNA111111"
    },
    {
        input: "skipworth",
        expected: "SKPWT11111"
    },
    {
        input: "skirving",
        expected: "SKFNK11111"
    },
    {
        input: "skow",
        expected: "SKA1111111"
    },
    {
        input: "skrimpton",
        expected: "SKRMPTN111"
    },
    {
        input: "skuse",
        expected: "SKS1111111"
    },
    {
        input: "slack",
        expected: "SLK1111111"
    },
    {
        input: "slade",
        expected: "SLT1111111"
    },
    {
        input: "slater",
        expected: "SLTA111111"
    },
    {
        input: "slatter",
        expected: "SLTA111111"
    },
    {
        input: "slattery",
        expected: "SLTRA11111"
    },
    {
        input: "slaughter",
        expected: "SLTA111111"
    },
    {
        input: "slee",
        expected: "SLA1111111"
    },
    {
        input: "sleeman",
        expected: "SLMN111111"
    },
    {
        input: "slemint",
        expected: "SLMNT11111"
    },
    {
        input: "slent",
        expected: "SLNT111111"
    },
    {
        input: "slight",
        expected: "SLT1111111"
    },
    {
        input: "sligo",
        expected: "SLKA111111"
    },
    {
        input: "slinner",
        expected: "SLNA111111"
    },
    {
        input: "sloan",
        expected: "SLN1111111"
    },
    {
        input: "sloper",
        expected: "SLPA111111"
    },
    {
        input: "slovley",
        expected: "SLFLA11111"
    },
    {
        input: "slowey",
        expected: "SLWA111111"
    },
    {
        input: "slowley",
        expected: "SLLA111111"
    },
    {
        input: "slowly",
        expected: "SLLA111111"
    },
    {
        input: "slyfield",
        expected: "SLFT111111"
    },
    {
        input: "smail",
        expected: "SMA1111111"
    },
    {
        input: "smaill",
        expected: "SMA1111111"
    },
    {
        input: "smales",
        expected: "SMLS111111"
    },
    {
        input: "small",
        expected: "SMA1111111"
    },
    {
        input: "smalley",
        expected: "SMLA111111"
    },
    {
        input: "smallman",
        expected: "SMMN111111"
    },
    {
        input: "smart",
        expected: "SMT1111111"
    },
    {
        input: "smea]",
        expected: "SMA1111111"
    },
    {
        input: "smeal",
        expected: "SMA1111111"
    },
    {
        input: "smear",
        expected: "SMA1111111"
    },
    {
        input: "smeaton",
        expected: "SMTN111111"
    },
    {
        input: "smedley",
        expected: "SMTLA11111"
    },
    {
        input: "smellie",
        expected: "SMLA111111"
    },
    {
        input: "smethurst",
        expected: "SMTST11111"
    },
    {
        input: "smiley",
        expected: "SMLA111111"
    },
    {
        input: "smitb",
        expected: "SMTP111111"
    },
    {
        input: "smith",
        expected: "SMT1111111"
    },
    {
        input: "smith-palmer",
        expected: "SMTPMA1111"
    },
    {
        input: "smither",
        expected: "SMTA111111"
    },
    {
        input: "smithpalmer",
        expected: "SMTPMA1111"
    },
    {
        input: "smithson",
        expected: "SMTSN11111"
    },
    {
        input: "smitl",
        expected: "SMTA111111"
    },
    {
        input: "smolenski",
        expected: "SMLNSKA111"
    },
    {
        input: "smyth",
        expected: "SMT1111111"
    },
    {
        input: "smythe",
        expected: "SMT1111111"
    },
    {
        input: "sneade",
        expected: "SNT1111111"
    },
    {
        input: "sneddon",
        expected: "SNTN111111"
    },
    {
        input: "snell",
        expected: "SNA1111111"
    },
    {
        input: "snelleksz",
        expected: "SNLKS11111"
    },
    {
        input: "snook",
        expected: "SNK1111111"
    },
    {
        input: "snow",
        expected: "SNA1111111"
    },
    {
        input: "snowball",
        expected: "SNPA111111"
    },
    {
        input: "snowden",
        expected: "SNTN111111"
    },
    {
        input: "snowdon",
        expected: "SNTN111111"
    },
    {
        input: "social",
        expected: "SSA1111111"
    },
    {
        input: "soden",
        expected: "STN1111111"
    },
    {
        input: "solomon",
        expected: "SLMN111111"
    },
    {
        input: "somerled",
        expected: "SMLT111111"
    },
    {
        input: "somerviile",
        expected: "SMFA111111"
    },
    {
        input: "somervill",
        expected: "SMFA111111"
    },
    {
        input: "somerville",
        expected: "SMFA111111"
    },
    {
        input: "somes",
        expected: "SMS1111111"
    },
    {
        input: "sommerfield",
        expected: "SMFT111111"
    },
    {
        input: "sommerville",
        expected: "SMFA111111"
    },
    {
        input: "sonntag",
        expected: "SNTK111111"
    },
    {
        input: "sontag",
        expected: "SNTK111111"
    },
    {
        input: "soper",
        expected: "SPA1111111"
    },
    {
        input: "sophia",
        expected: "SFA1111111"
    },
    {
        input: "sophie",
        expected: "SFA1111111"
    },
    {
        input: "sophrania",
        expected: "SFRNA11111"
    },
    {
        input: "sophrona",
        expected: "SFRNA11111"
    },
    {
        input: "sophronia",
        expected: "SFRNA11111"
    },
    {
        input: "sophy",
        expected: "SFA1111111"
    },
    {
        input: "sorenson",
        expected: "SRNSN11111"
    },
    {
        input: "soulsby",
        expected: "SSPA111111"
    },
    {
        input: "soundy",
        expected: "SNTA111111"
    },
    {
        input: "souness",
        expected: "SNS1111111"
    },
    {
        input: "sourdon",
        expected: "STN1111111"
    },
    {
        input: "souter",
        expected: "STA1111111"
    },
    {
        input: "south",
        expected: "ST11111111"
    },
    {
        input: "southall",
        expected: "STA1111111"
    },
    {
        input: "southam",
        expected: "STM1111111"
    },
    {
        input: "southberg",
        expected: "STPK111111"
    },
    {
        input: "southern",
        expected: "STN1111111"
    },
    {
        input: "southey",
        expected: "STA1111111"
    },
    {
        input: "southorn",
        expected: "STN1111111"
    },
    {
        input: "soutter",
        expected: "STA1111111"
    },
    {
        input: "spain",
        expected: "SPN1111111"
    },
    {
        input: "spalding",
        expected: "SPTNK11111"
    },
    {
        input: "spargo",
        expected: "SPKA111111"
    },
    {
        input: "sparks",
        expected: "SPKS111111"
    },
    {
        input: "sparnon",
        expected: "SPNN111111"
    },
    {
        input: "sparrow",
        expected: "SPRA111111"
    },
    {
        input: "spatz",
        expected: "SPTS111111"
    },
    {
        input: "spaul",
        expected: "SPA1111111"
    },
    {
        input: "spavin",
        expected: "SPFN111111"
    },
    {
        input: "spear",
        expected: "SPA1111111"
    },
    {
        input: "spedding",
        expected: "SPTNK11111"
    },
    {
        input: "speden",
        expected: "SPTN111111"
    },
    {
        input: "speid",
        expected: "SPT1111111"
    },
    {
        input: "speight",
        expected: "SPT1111111"
    },
    {
        input: "speir",
        expected: "SPA1111111"
    },
    {
        input: "speirs",
        expected: "SPS1111111"
    },
    {
        input: "spell",
        expected: "SPA1111111"
    },
    {
        input: "spellman",
        expected: "SPMN111111"
    },
    {
        input: "spence",
        expected: "SPNK111111"
    },
    {
        input: "spencer",
        expected: "SPNSA11111"
    },
    {
        input: "spenseley",
        expected: "SPNSLA1111"
    },
    {
        input: "spensley",
        expected: "SPNSLA1111"
    },
    {
        input: "spiers",
        expected: "SPS1111111"
    },
    {
        input: "spillane",
        expected: "SPLN111111"
    },
    {
        input: "spinks",
        expected: "SPNKS11111"
    },
    {
        input: "spinner",
        expected: "SPNA111111"
    },
    {
        input: "spiro",
        expected: "SPRA111111"
    },
    {
        input: "spong",
        expected: "SPNK111111"
    },
    {
        input: "spooner",
        expected: "SPNA111111"
    },
    {
        input: "spowart",
        expected: "SPWT111111"
    },
    {
        input: "spragg",
        expected: "SPRK111111"
    },
    {
        input: "spraggon",
        expected: "SPRKN11111"
    },
    {
        input: "sprague",
        expected: "SPRKA11111"
    },
    {
        input: "spratt",
        expected: "SPRT111111"
    },
    {
        input: "spray",
        expected: "SPRA111111"
    },
    {
        input: "spring",
        expected: "SPRNK11111"
    },
    {
        input: "springhall",
        expected: "SPRNA11111"
    },
    {
        input: "sproat",
        expected: "SPRT111111"
    },
    {
        input: "sprott",
        expected: "SPRT111111"
    },
    {
        input: "sproule",
        expected: "SPRA111111"
    },
    {
        input: "sproull",
        expected: "SPRA111111"
    },
    {
        input: "spurden",
        expected: "SPTN111111"
    },
    {
        input: "sputter",
        expected: "SPTA111111"
    },
    {
        input: "squiness",
        expected: "SKNS111111"
    },
    {
        input: "squire",
        expected: "SKA1111111"
    },
    {
        input: "squires",
        expected: "SKRS111111"
    },
    {
        input: "st",
        expected: "ST11111111"
    },
    {
        input: "st george",
        expected: "STKK111111"
    },
    {
        input: "stabb",
        expected: "STP1111111"
    },
    {
        input: "stables",
        expected: "STPLS11111"
    },
    {
        input: "stackhouse",
        expected: "STKS111111"
    },
    {
        input: "stade",
        expected: "STT1111111"
    },
    {
        input: "stafford",
        expected: "STFT111111"
    },
    {
        input: "stagpoole",
        expected: "STKPA11111"
    },
    {
        input: "staines",
        expected: "STNS111111"
    },
    {
        input: "stainton",
        expected: "STNTN11111"
    },
    {
        input: "staite",
        expected: "STT1111111"
    },
    {
        input: "stakey",
        expected: "STKA111111"
    },
    {
        input: "stalker",
        expected: "STKA111111"
    },
    {
        input: "stallard",
        expected: "STLT111111"
    },
    {
        input: "stammers",
        expected: "STMS111111"
    },
    {
        input: "stamper",
        expected: "STMPA11111"
    },
    {
        input: "stanafield",
        expected: "STNFT11111"
    },
    {
        input: "stanaway",
        expected: "STNWA11111"
    },
    {
        input: "stanbrook",
        expected: "STNPRK1111"
    },
    {
        input: "standen",
        expected: "STNTN11111"
    },
    {
        input: "standfield",
        expected: "STNTFT1111"
    },
    {
        input: "standring",
        expected: "STNTRNK111"
    },
    {
        input: "stanford",
        expected: "STNFT11111"
    },
    {
        input: "stanhope",
        expected: "STNP111111"
    },
    {
        input: "staniford",
        expected: "STNFT11111"
    },
    {
        input: "stanislaus",
        expected: "STNSLS1111"
    },
    {
        input: "stanislaw",
        expected: "STNSLA1111"
    },
    {
        input: "stanislaws",
        expected: "STNSLS1111"
    },
    {
        input: "stanley",
        expected: "STNLA11111"
    },
    {
        input: "stannens",
        expected: "STNNS11111"
    },
    {
        input: "stanners",
        expected: "STNS111111"
    },
    {
        input: "stanton",
        expected: "STNTN11111"
    },
    {
        input: "staples",
        expected: "STPLS11111"
    },
    {
        input: "stapleton",
        expected: "STPLTN1111"
    },
    {
        input: "starham",
        expected: "STM1111111"
    },
    {
        input: "stark",
        expected: "STK1111111"
    },
    {
        input: "starkey",
        expected: "STKA111111"
    },
    {
        input: "starr",
        expected: "STA1111111"
    },
    {
        input: "stasia",
        expected: "STSA111111"
    },
    {
        input: "statham",
        expected: "STTM111111"
    },
    {
        input: "statney",
        expected: "STTNA11111"
    },
    {
        input: "staunton",
        expected: "STNTN11111"
    },
    {
        input: "stead",
        expected: "STT1111111"
    },
    {
        input: "steadman",
        expected: "STTMN11111"
    },
    {
        input: "stedman",
        expected: "STTMN11111"
    },
    {
        input: "stedward",
        expected: "STTWT11111"
    },
    {
        input: "steedman",
        expected: "STTMN11111"
    },
    {
        input: "steeds",
        expected: "STTS111111"
    },
    {
        input: "steel",
        expected: "STA1111111"
    },
    {
        input: "steele",
        expected: "STA1111111"
    },
    {
        input: "steen",
        expected: "STN1111111"
    },
    {
        input: "steensoll",
        expected: "STNSA11111"
    },
    {
        input: "steenson",
        expected: "STNSN11111"
    },
    {
        input: "steffens",
        expected: "STFNS11111"
    },
    {
        input: "steinman",
        expected: "STNMN11111"
    },
    {
        input: "stella",
        expected: "STLA111111"
    },
    {
        input: "stem",
        expected: "STM1111111"
    },
    {
        input: "stempa",
        expected: "STMPA11111"
    },
    {
        input: "stenhouse",
        expected: "STNS111111"
    },
    {
        input: "stennouse",
        expected: "STNS111111"
    },
    {
        input: "stent",
        expected: "STNT111111"
    },
    {
        input: "stentiford",
        expected: "STNTFT1111"
    },
    {
        input: "stepbenson",
        expected: "STPNSN1111"
    },
    {
        input: "stephanie",
        expected: "STFNA11111"
    },
    {
        input: "stephen",
        expected: "STFN111111"
    },
    {
        input: "stephens",
        expected: "STFNS11111"
    },
    {
        input: "stephenso",
        expected: "STFNSA1111"
    },
    {
        input: "stephenson",
        expected: "STFNSN1111"
    },
    {
        input: "sterart",
        expected: "STRT111111"
    },
    {
        input: "sterling",
        expected: "STLNK11111"
    },
    {
        input: "stesvart",
        expected: "STSFT11111"
    },
    {
        input: "stevart",
        expected: "STFT111111"
    },
    {
        input: "steven",
        expected: "STFN111111"
    },
    {
        input: "stevens",
        expected: "STFNS11111"
    },
    {
        input: "stevenson",
        expected: "STFNSN1111"
    },
    {
        input: "steward",
        expected: "STWT111111"
    },
    {
        input: "stewart",
        expected: "STWT111111"
    },
    {
        input: "stewarty",
        expected: "STWTA11111"
    },
    {
        input: "stgeorge",
        expected: "STKK111111"
    },
    {
        input: "stichann",
        expected: "STKN111111"
    },
    {
        input: "stichmann",
        expected: "STKMN11111"
    },
    {
        input: "stickman",
        expected: "STKMN11111"
    },
    {
        input: "stiglish",
        expected: "STKLS11111"
    },
    {
        input: "stiles",
        expected: "STLS111111"
    },
    {
        input: "still",
        expected: "STA1111111"
    },
    {
        input: "stinso",
        expected: "STNSA11111"
    },
    {
        input: "stinson",
        expected: "STNSN11111"
    },
    {
        input: "stirling",
        expected: "STLNK11111"
    },
    {
        input: "stisie",
        expected: "STSA111111"
    },
    {
        input: "stiven",
        expected: "STFN111111"
    },
    {
        input: "stobie",
        expected: "STPA111111"
    },
    {
        input: "stock",
        expected: "STK1111111"
    },
    {
        input: "stockdale",
        expected: "STKTA11111"
    },
    {
        input: "stocker",
        expected: "STKA111111"
    },
    {
        input: "stoddart",
        expected: "STTT111111"
    },
    {
        input: "stohr",
        expected: "STA1111111"
    },
    {
        input: "stoke",
        expected: "STK1111111"
    },
    {
        input: "stokes",
        expected: "STKS111111"
    },
    {
        input: "stone",
        expected: "STN1111111"
    },
    {
        input: "stonebrid",
        expected: "STNPRT1111"
    },
    {
        input: "stonebridge",
        expected: "STNPRK1111"
    },
    {
        input: "stoneham",
        expected: "STNM111111"
    },
    {
        input: "stook",
        expected: "STK1111111"
    },
    {
        input: "storer",
        expected: "STRA111111"
    },
    {
        input: "storey",
        expected: "STRA111111"
    },
    {
        input: "storie",
        expected: "STRA111111"
    },
    {
        input: "storm",
        expected: "STM1111111"
    },
    {
        input: "storrie",
        expected: "STRA111111"
    },
    {
        input: "storry",
        expected: "STRA111111"
    },
    {
        input: "stort",
        expected: "STT1111111"
    },
    {
        input: "story",
        expected: "STRA111111"
    },
    {
        input: "stothart",
        expected: "STTT111111"
    },
    {
        input: "stott",
        expected: "STT1111111"
    },
    {
        input: "stout",
        expected: "STT1111111"
    },
    {
        input: "stowell",
        expected: "STWA111111"
    },
    {
        input: "stozepanski",
        expected: "STSPNSKA11"
    },
    {
        input: "strachan",
        expected: "STRKN11111"
    },
    {
        input: "strack",
        expected: "STRK111111"
    },
    {
        input: "strafford",
        expected: "STRFT11111"
    },
    {
        input: "strain",
        expected: "STRN111111"
    },
    {
        input: "strang",
        expected: "STRNK11111"
    },
    {
        input: "strange",
        expected: "STRNK11111"
    },
    {
        input: "stratford",
        expected: "STRTFT1111"
    },
    {
        input: "strathern",
        expected: "STRTN11111"
    },
    {
        input: "stratton",
        expected: "STRTN11111"
    },
    {
        input: "straw",
        expected: "STRA111111"
    },
    {
        input: "strawbridge",
        expected: "STRPRK1111"
    },
    {
        input: "street",
        expected: "STRT111111"
    },
    {
        input: "strelna",
        expected: "STRNA11111"
    },
    {
        input: "strickett",
        expected: "STRKT11111"
    },
    {
        input: "stright",
        expected: "STRT111111"
    },
    {
        input: "stringer",
        expected: "STRNKA1111"
    },
    {
        input: "stronach",
        expected: "STRNK11111"
    },
    {
        input: "strong",
        expected: "STRNK11111"
    },
    {
        input: "strop",
        expected: "STRP111111"
    },
    {
        input: "stroud",
        expected: "STRT111111"
    },
    {
        input: "strouts",
        expected: "STRTS11111"
    },
    {
        input: "struan",
        expected: "STRN111111"
    },
    {
        input: "struckett",
        expected: "STRKT11111"
    },
    {
        input: "struthers",
        expected: "STRTS11111"
    },
    {
        input: "stuart",
        expected: "STT1111111"
    },
    {
        input: "stuart-miller",
        expected: "STTMLA1111"
    },
    {
        input: "stubbs",
        expected: "STPS111111"
    },
    {
        input: "stubley",
        expected: "STPLA11111"
    },
    {
        input: "stuckey",
        expected: "STKA111111"
    },
    {
        input: "stumbles",
        expected: "STMPLS1111"
    },
    {
        input: "sturgeon",
        expected: "STKN111111"
    },
    {
        input: "sturtevan",
        expected: "STTFN11111"
    },
    {
        input: "sturz",
        expected: "STS1111111"
    },
    {
        input: "styche",
        expected: "STK1111111"
    },
    {
        input: "styles",
        expected: "STLS111111"
    },
    {
        input: "sudden",
        expected: "STN1111111"
    },
    {
        input: "suddens",
        expected: "STNS111111"
    },
    {
        input: "sugden",
        expected: "SKTN111111"
    },
    {
        input: "suilivan",
        expected: "SLFN111111"
    },
    {
        input: "sullivan",
        expected: "SLFN111111"
    },
    {
        input: "sullivar",
        expected: "SLFA111111"
    },
    {
        input: "summerell",
        expected: "SMRA111111"
    },
    {
        input: "summerfield",
        expected: "SMFT111111"
    },
    {
        input: "summers",
        expected: "SMS1111111"
    },
    {
        input: "sumner",
        expected: "SMNA111111"
    },
    {
        input: "sunderland",
        expected: "SNTLNT1111"
    },
    {
        input: "surrey",
        expected: "SRA1111111"
    },
    {
        input: "susan",
        expected: "SSN1111111"
    },
    {
        input: "susanah",
        expected: "SSNA111111"
    },
    {
        input: "susanna",
        expected: "SSNA111111"
    },
    {
        input: "susannah",
        expected: "SSNA111111"
    },
    {
        input: "susanne",
        expected: "SSN1111111"
    },
    {
        input: "susie",
        expected: "SSA1111111"
    },
    {
        input: "susy",
        expected: "SSA1111111"
    },
    {
        input: "sutcliffe",
        expected: "STKLF11111"
    },
    {
        input: "suter",
        expected: "STA1111111"
    },
    {
        input: "suters",
        expected: "STS1111111"
    },
    {
        input: "sutherlan",
        expected: "STLN111111"
    },
    {
        input: "sutherland",
        expected: "STLNT11111"
    },
    {
        input: "sutherlard",
        expected: "STLT111111"
    },
    {
        input: "sutton",
        expected: "STN1111111"
    },
    {
        input: "swale",
        expected: "SWA1111111"
    },
    {
        input: "swan",
        expected: "SWN1111111"
    },
    {
        input: "swanerton",
        expected: "SWNTN11111"
    },
    {
        input: "swanger",
        expected: "SWNKA11111"
    },
    {
        input: "swann",
        expected: "SWN1111111"
    },
    {
        input: "swanson",
        expected: "SWNSN11111"
    },
    {
        input: "swanston",
        expected: "SWNSTN1111"
    },
    {
        input: "swanwick",
        expected: "SWNWK11111"
    },
    {
        input: "sweeney",
        expected: "SWNA111111"
    },
    {
        input: "sweetman",
        expected: "SWTMN11111"
    },
    {
        input: "sweetnam",
        expected: "SWTNM11111"
    },
    {
        input: "swell",
        expected: "SWA1111111"
    },
    {
        input: "swete",
        expected: "SWT1111111"
    },
    {
        input: "swift",
        expected: "SWFT111111"
    },
    {
        input: "swinburne",
        expected: "SWNPN11111"
    },
    {
        input: "swindley",
        expected: "SWNTLA1111"
    },
    {
        input: "swinley",
        expected: "SWNLA11111"
    },
    {
        input: "swinney",
        expected: "SWNA111111"
    },
    {
        input: "swinton",
        expected: "SWNTN11111"
    },
    {
        input: "switalla",
        expected: "SWTLA11111"
    },
    {
        input: "switalli",
        expected: "SWTLA11111"
    },
    {
        input: "switzer",
        expected: "SWTSA11111"
    },
    {
        input: "sybella",
        expected: "SPLA111111"
    },
    {
        input: "sybil",
        expected: "SPA1111111"
    },
    {
        input: "syder",
        expected: "STA1111111"
    },
    {
        input: "sydnev",
        expected: "STNF111111"
    },
    {
        input: "sydney",
        expected: "STNA111111"
    },
    {
        input: "sykes",
        expected: "SKS1111111"
    },
    {
        input: "sylva",
        expected: "SFA1111111"
    },
    {
        input: "sylvia",
        expected: "SFA1111111"
    },
    {
        input: "sylvie",
        expected: "SFA1111111"
    },
    {
        input: "syme",
        expected: "SM11111111"
    },
    {
        input: "symes",
        expected: "SMS1111111"
    },
    {
        input: "symington",
        expected: "SMNKTN1111"
    },
    {
        input: "symon",
        expected: "SMN1111111"
    },
    {
        input: "symonds",
        expected: "SMNTS11111"
    },
    {
        input: "syndercombe",
        expected: "SNTKM11111"
    },
    {
        input: "syril",
        expected: "SRA1111111"
    },
    {
        input: "sythes",
        expected: "STS1111111"
    },
    {
        input: "tabitha",
        expected: "TPTA111111"
    },
    {
        input: "tabor",
        expected: "TPA1111111"
    },
    {
        input: "tackson",
        expected: "TKSN111111"
    },
    {
        input: "taggart",
        expected: "TKT1111111"
    },
    {
        input: "taine",
        expected: "TN11111111"
    },
    {
        input: "tait",
        expected: "TT11111111"
    },
    {
        input: "talbert",
        expected: "TPT1111111"
    },
    {
        input: "talbot",
        expected: "TPT1111111"
    },
    {
        input: "talboys",
        expected: "TPS1111111"
    },
    {
        input: "tall",
        expected: "TA11111111"
    },
    {
        input: "tallant",
        expected: "TLNT111111"
    },
    {
        input: "tamar",
        expected: "TMA1111111"
    },
    {
        input: "tamblyn",
        expected: "TMPLN11111"
    },
    {
        input: "tanner",
        expected: "TNA1111111"
    },
    {
        input: "tansey",
        expected: "TNSA111111"
    },
    {
        input: "tansleiy",
        expected: "TNSLA11111"
    },
    {
        input: "tansley",
        expected: "TNSLA11111"
    },
    {
        input: "tapley",
        expected: "TPLA111111"
    },
    {
        input: "taplin",
        expected: "TPLN111111"
    },
    {
        input: "tapper",
        expected: "TPA1111111"
    },
    {
        input: "tapson",
        expected: "TPSN111111"
    },
    {
        input: "tarbutt",
        expected: "TPT1111111"
    },
    {
        input: "tarleton",
        expected: "TLTN111111"
    },
    {
        input: "tarlton",
        expected: "TTN1111111"
    },
    {
        input: "tarrant",
        expected: "TRNT111111"
    },
    {
        input: "tartakover",
        expected: "TTKFA11111"
    },
    {
        input: "tarves",
        expected: "TFS1111111"
    },
    {
        input: "tasker",
        expected: "TSKA111111"
    },
    {
        input: "tasma",
        expected: "TSMA111111"
    },
    {
        input: "tasman",
        expected: "TSMN111111"
    },
    {
        input: "tate",
        expected: "TT11111111"
    },
    {
        input: "tattersal",
        expected: "TTSA111111"
    },
    {
        input: "tattersall",
        expected: "TTSA111111"
    },
    {
        input: "tattersfield",
        expected: "TTSFT11111"
    },
    {
        input: "taunt",
        expected: "TNT1111111"
    },
    {
        input: "tavendale",
        expected: "TFNTA11111"
    },
    {
        input: "taverner",
        expected: "TFNA111111"
    },
    {
        input: "tavlor",
        expected: "TFLA111111"
    },
    {
        input: "tayior",
        expected: "TA11111111"
    },
    {
        input: "tayler",
        expected: "TLA1111111"
    },
    {
        input: "tayles",
        expected: "TLS1111111"
    },
    {
        input: "taylor",
        expected: "TLA1111111"
    },
    {
        input: "teague",
        expected: "TKA1111111"
    },
    {
        input: "teale",
        expected: "TA11111111"
    },
    {
        input: "teariki",
        expected: "TRKA111111"
    },
    {
        input: "tearle",
        expected: "TA11111111"
    },
    {
        input: "teasdale",
        expected: "TSTA111111"
    },
    {
        input: "tebbett",
        expected: "TPT1111111"
    },
    {
        input: "teer",
        expected: "TA11111111"
    },
    {
        input: "teesdale",
        expected: "TSTA111111"
    },
    {
        input: "tegg",
        expected: "TK11111111"
    },
    {
        input: "telfer",
        expected: "TFA1111111"
    },
    {
        input: "telford",
        expected: "TFT1111111"
    },
    {
        input: "teller",
        expected: "TLA1111111"
    },
    {
        input: "temperence",
        expected: "TMPRNK1111"
    },
    {
        input: "tempero",
        expected: "TMPRA11111"
    },
    {
        input: "temperton",
        expected: "TMPTN11111"
    },
    {
        input: "templcton",
        expected: "TMPKTN1111"
    },
    {
        input: "temple",
        expected: "TMPA111111"
    },
    {
        input: "templeton",
        expected: "TMPLTN1111"
    },
    {
        input: "tenbeth",
        expected: "TNPT111111"
    },
    {
        input: "tennant",
        expected: "TNNT111111"
    },
    {
        input: "tennent",
        expected: "TNNT111111"
    },
    {
        input: "tennet",
        expected: "TNT1111111"
    },
    {
        input: "tepene",
        expected: "TPN1111111"
    },
    {
        input: "terence",
        expected: "TRNK111111"
    },
    {
        input: "teresa",
        expected: "TRSA111111"
    },
    {
        input: "teresae",
        expected: "TRSA111111"
    },
    {
        input: "ternce",
        expected: "TNK1111111"
    },
    {
        input: "terry",
        expected: "TRA1111111"
    },
    {
        input: "teschner",
        expected: "TSKNA11111"
    },
    {
        input: "tesse",
        expected: "TS11111111"
    },
    {
        input: "tessie",
        expected: "TSA1111111"
    },
    {
        input: "teviotdale",
        expected: "TFTA111111"
    },
    {
        input: "thackwel",
        expected: "TKWA111111"
    },
    {
        input: "thaddeus",
        expected: "TTS1111111"
    },
    {
        input: "thea",
        expected: "TA11111111"
    },
    {
        input: "theima",
        expected: "TMA1111111"
    },
    {
        input: "thelma",
        expected: "TMA1111111"
    },
    {
        input: "theodocia",
        expected: "TTSA111111"
    },
    {
        input: "theodora",
        expected: "TTRA111111"
    },
    {
        input: "theodore",
        expected: "TTA1111111"
    },
    {
        input: "theodosia",
        expected: "TTSA111111"
    },
    {
        input: "theophilus",
        expected: "TFLS111111"
    },
    {
        input: "theresa",
        expected: "TRSA111111"
    },
    {
        input: "therese",
        expected: "TRS1111111"
    },
    {
        input: "thiele",
        expected: "TA11111111"
    },
    {
        input: "thin",
        expected: "TN11111111"
    },
    {
        input: "thinn",
        expected: "TN11111111"
    },
    {
        input: "third",
        expected: "TT11111111"
    },
    {
        input: "thirza",
        expected: "TSA1111111"
    },
    {
        input: "tholmas",
        expected: "TMS1111111"
    },
    {
        input: "thom",
        expected: "TM11111111"
    },
    {
        input: "thomas",
        expected: "TMS1111111"
    },
    {
        input: "thomasena",
        expected: "TMSNA11111"
    },
    {
        input: "thomasina",
        expected: "TMSNA11111"
    },
    {
        input: "thomason",
        expected: "TMSN111111"
    },
    {
        input: "thomlinson",
        expected: "TMLNSN1111"
    },
    {
        input: "thompson",
        expected: "TMPSN11111"
    },
    {
        input: "thomson",
        expected: "TMSN111111"
    },
    {
        input: "thonas",
        expected: "TNS1111111"
    },
    {
        input: "thora",
        expected: "TRA1111111"
    },
    {
        input: "thorapson",
        expected: "TRPSN11111"
    },
    {
        input: "thorburn",
        expected: "TPN1111111"
    },
    {
        input: "thorita",
        expected: "TRTA111111"
    },
    {
        input: "thorley",
        expected: "TLA1111111"
    },
    {
        input: "thorn",
        expected: "TN11111111"
    },
    {
        input: "thornburg",
        expected: "TNPK111111"
    },
    {
        input: "thornburgh",
        expected: "TNPA111111"
    },
    {
        input: "thornhill",
        expected: "TNA1111111"
    },
    {
        input: "thornicroft",
        expected: "TNKRFT1111"
    },
    {
        input: "thornley",
        expected: "TNLA111111"
    },
    {
        input: "thornton",
        expected: "TNTN111111"
    },
    {
        input: "thorp",
        expected: "TP11111111"
    },
    {
        input: "thotnpson",
        expected: "TTNPSN1111"
    },
    {
        input: "thow",
        expected: "TA11111111"
    },
    {
        input: "thriza",
        expected: "TRSA111111"
    },
    {
        input: "throp",
        expected: "TRP1111111"
    },
    {
        input: "thurlow",
        expected: "TLA1111111"
    },
    {
        input: "thursa",
        expected: "TSA1111111"
    },
    {
        input: "thurstan",
        expected: "TSTN111111"
    },
    {
        input: "thurston",
        expected: "TSTN111111"
    },
    {
        input: "thurza",
        expected: "TSA1111111"
    },
    {
        input: "thwaites",
        expected: "TWTS111111"
    },
    {
        input: "thyrza",
        expected: "TSA1111111"
    },
    {
        input: "thyza",
        expected: "TSA1111111"
    },
    {
        input: "tibbles",
        expected: "TPLS111111"
    },
    {
        input: "tibbs",
        expected: "TPS1111111"
    },
    {
        input: "tidey",
        expected: "TTA1111111"
    },
    {
        input: "tierney",
        expected: "TNA1111111"
    },
    {
        input: "tighe",
        expected: "TA11111111"
    },
    {
        input: "tighe umbers",
        expected: "TKMPS11111"
    },
    {
        input: "tighe-umbers",
        expected: "TKMPS11111"
    },
    {
        input: "tigheumbers",
        expected: "TKMPS11111"
    },
    {
        input: "tilburn",
        expected: "TPN1111111"
    },
    {
        input: "tilbury",
        expected: "TPRA111111"
    },
    {
        input: "tilley",
        expected: "TLA1111111"
    },
    {
        input: "tilleyshor",
        expected: "TLSA111111"
    },
    {
        input: "tilleyshort",
        expected: "TLST111111"
    },
    {
        input: "tillie",
        expected: "TLA1111111"
    },
    {
        input: "tillyshort",
        expected: "TLST111111"
    },
    {
        input: "tilson",
        expected: "TSN1111111"
    },
    {
        input: "tiltman",
        expected: "TTMN111111"
    },
    {
        input: "tily",
        expected: "TLA1111111"
    },
    {
        input: "timlin",
        expected: "TMLN111111"
    },
    {
        input: "timmings",
        expected: "TMNKS11111"
    },
    {
        input: "timmins",
        expected: "TMNS111111"
    },
    {
        input: "timms",
        expected: "TMS1111111"
    },
    {
        input: "timothy",
        expected: "TMTA111111"
    },
    {
        input: "tims",
        expected: "TMS1111111"
    },
    {
        input: "tiney",
        expected: "TNA1111111"
    },
    {
        input: "tini",
        expected: "TNA1111111"
    },
    {
        input: "tinnock",
        expected: "TNK1111111"
    },
    {
        input: "tinson",
        expected: "TNSN111111"
    },
    {
        input: "tiny",
        expected: "TNA1111111"
    },
    {
        input: "tipa",
        expected: "TPA1111111"
    },
    {
        input: "tippet",
        expected: "TPT1111111"
    },
    {
        input: "tippett",
        expected: "TPT1111111"
    },
    {
        input: "tisdall",
        expected: "TSTA111111"
    },
    {
        input: "titchener",
        expected: "TKNA111111"
    },
    {
        input: "titchner",
        expected: "TKNA111111"
    },
    {
        input: "titclhener",
        expected: "TTKNA11111"
    },
    {
        input: "tither",
        expected: "TTA1111111"
    },
    {
        input: "titohener",
        expected: "TTNA111111"
    },
    {
        input: "tiverner",
        expected: "TFNA111111"
    },
    {
        input: "tizard",
        expected: "TST1111111"
    },
    {
        input: "tizzie",
        expected: "TSA1111111"
    },
    {
        input: "tlimlin",
        expected: "TLMLN11111"
    },
    {
        input: "tlomson",
        expected: "TLMSN11111"
    },
    {
        input: "tnlley",
        expected: "TNLA111111"
    },
    {
        input: "toal",
        expected: "TA11111111"
    },
    {
        input: "toase",
        expected: "TS11111111"
    },
    {
        input: "tobin",
        expected: "TPN1111111"
    },
    {
        input: "tod",
        expected: "TT11111111"
    },
    {
        input: "toda",
        expected: "TTA1111111"
    },
    {
        input: "todd",
        expected: "TT11111111"
    },
    {
        input: "tofield",
        expected: "TFT1111111"
    },
    {
        input: "tohill",
        expected: "TA11111111"
    },
    {
        input: "tointon",
        expected: "TNTN111111"
    },
    {
        input: "tolley",
        expected: "TLA1111111"
    },
    {
        input: "tolmie",
        expected: "TMA1111111"
    },
    {
        input: "tom",
        expected: "TM11111111"
    },
    {
        input: "tombs",
        expected: "TMPS111111"
    },
    {
        input: "tomkins",
        expected: "TMKNS11111"
    },
    {
        input: "tomkinson",
        expected: "TMKNSN1111"
    },
    {
        input: "tomlinson",
        expected: "TMLNSN1111"
    },
    {
        input: "tompkins",
        expected: "TMPKNS1111"
    },
    {
        input: "toms",
        expected: "TMS1111111"
    },
    {
        input: "tonar",
        expected: "TNA1111111"
    },
    {
        input: "toner",
        expected: "TNA1111111"
    },
    {
        input: "tones",
        expected: "TNS1111111"
    },
    {
        input: "toneycliffe",
        expected: "TNKLF11111"
    },
    {
        input: "tonkin",
        expected: "TNKN111111"
    },
    {
        input: "tonkinson",
        expected: "TNKNSN1111"
    },
    {
        input: "tonner",
        expected: "TNA1111111"
    },
    {
        input: "tonnor",
        expected: "TNA1111111"
    },
    {
        input: "toohey",
        expected: "TA11111111"
    },
    {
        input: "toohill",
        expected: "TA11111111"
    },
    {
        input: "toohoy",
        expected: "TA11111111"
    },
    {
        input: "tooman",
        expected: "TMN1111111"
    },
    {
        input: "toomer",
        expected: "TMA1111111"
    },
    {
        input: "toomey",
        expected: "TMA1111111"
    },
    {
        input: "tooner",
        expected: "TNA1111111"
    },
    {
        input: "tootell",
        expected: "TTA1111111"
    },
    {
        input: "topp",
        expected: "TP11111111"
    },
    {
        input: "torpey",
        expected: "TPA1111111"
    },
    {
        input: "torrance",
        expected: "TRNK111111"
    },
    {
        input: "torrie",
        expected: "TRA1111111"
    },
    {
        input: "tosh",
        expected: "TS11111111"
    },
    {
        input: "toshack",
        expected: "TSK1111111"
    },
    {
        input: "tosswill",
        expected: "TSWA111111"
    },
    {
        input: "tough",
        expected: "TF11111111"
    },
    {
        input: "touncy",
        expected: "TNSA111111"
    },
    {
        input: "tourell",
        expected: "TRA1111111"
    },
    {
        input: "tousseint",
        expected: "TSNT111111"
    },
    {
        input: "tout",
        expected: "TT11111111"
    },
    {
        input: "towart",
        expected: "TWT1111111"
    },
    {
        input: "towle",
        expected: "TA11111111"
    },
    {
        input: "towler",
        expected: "TLA1111111"
    },
    {
        input: "town",
        expected: "TN11111111"
    },
    {
        input: "towniey",
        expected: "TNA1111111"
    },
    {
        input: "townley",
        expected: "TNLA111111"
    },
    {
        input: "townrow",
        expected: "TNRA111111"
    },
    {
        input: "townsend",
        expected: "TNSNT11111"
    },
    {
        input: "townshend",
        expected: "TNSNT11111"
    },
    {
        input: "towsey",
        expected: "TSA1111111"
    },
    {
        input: "towson",
        expected: "TSN1111111"
    },
    {
        input: "toy",
        expected: "TA11111111"
    },
    {
        input: "toye",
        expected: "TA11111111"
    },
    {
        input: "tracey",
        expected: "TRSA111111"
    },
    {
        input: "tracy",
        expected: "TRSA111111"
    },
    {
        input: "traherne",
        expected: "TRN1111111"
    },
    {
        input: "trail",
        expected: "TRA1111111"
    },
    {
        input: "traill",
        expected: "TRA1111111"
    },
    {
        input: "trainor",
        expected: "TRNA111111"
    },
    {
        input: "tranter",
        expected: "TRNTA11111"
    },
    {
        input: "trapski",
        expected: "TRPSKA1111"
    },
    {
        input: "travena",
        expected: "TRFNA11111"
    },
    {
        input: "traves",
        expected: "TRFS111111"
    },
    {
        input: "travis",
        expected: "TRFS111111"
    },
    {
        input: "traynor",
        expected: "TRNA111111"
    },
    {
        input: "treacy",
        expected: "TRSA111111"
    },
    {
        input: "treadwell",
        expected: "TRTWA11111"
    },
    {
        input: "trebilcock",
        expected: "TRPKK11111"
    },
    {
        input: "tree",
        expected: "TRA1111111"
    },
    {
        input: "treeweek",
        expected: "TRWK111111"
    },
    {
        input: "tregea",
        expected: "TRKA111111"
    },
    {
        input: "tregear",
        expected: "TRKA111111"
    },
    {
        input: "tregilgus",
        expected: "TRKKS11111"
    },
    {
        input: "tregoning",
        expected: "TRKNNK1111"
    },
    {
        input: "tregonning",
        expected: "TRKNNK1111"
    },
    {
        input: "treleaven",
        expected: "TRLFN11111"
    },
    {
        input: "treloar",
        expected: "TRLA111111"
    },
    {
        input: "tremaine",
        expected: "TRMN111111"
    },
    {
        input: "tremella",
        expected: "TRMLA11111"
    },
    {
        input: "trena",
        expected: "TRNA111111"
    },
    {
        input: "trench",
        expected: "TRNK111111"
    },
    {
        input: "trencll",
        expected: "TRNKA11111"
    },
    {
        input: "trene",
        expected: "TRN1111111"
    },
    {
        input: "trengrove",
        expected: "TRNKRF1111"
    },
    {
        input: "trentham",
        expected: "TRNTM11111"
    },
    {
        input: "trenwith",
        expected: "TRNWT11111"
    },
    {
        input: "trerise",
        expected: "TRRS111111"
    },
    {
        input: "tresa",
        expected: "TRSA111111"
    },
    {
        input: "tressider",
        expected: "TRSTA11111"
    },
    {
        input: "tressler",
        expected: "TRSLA11111"
    },
    {
        input: "trestrail",
        expected: "TRSTRA1111"
    },
    {
        input: "tretheway",
        expected: "TRTWA11111"
    },
    {
        input: "trevarthan",
        expected: "TRFTN11111"
    },
    {
        input: "trevathan",
        expected: "TRFTN11111"
    },
    {
        input: "trevena",
        expected: "TRFNA11111"
    },
    {
        input: "trevenna",
        expected: "TRFNA11111"
    },
    {
        input: "treves",
        expected: "TRFS111111"
    },
    {
        input: "trevor",
        expected: "TRFA111111"
    },
    {
        input: "treweek",
        expected: "TRWK111111"
    },
    {
        input: "trewera",
        expected: "TRWRA11111"
    },
    {
        input: "trewern",
        expected: "TRWN111111"
    },
    {
        input: "trewhellar",
        expected: "TRWLA11111"
    },
    {
        input: "trewick",
        expected: "TRWK111111"
    },
    {
        input: "trezise",
        expected: "TRSS111111"
    },
    {
        input: "triggs",
        expected: "TRKS111111"
    },
    {
        input: "trilby",
        expected: "TRPA111111"
    },
    {
        input: "trim",
        expected: "TRM1111111"
    },
    {
        input: "trimble",
        expected: "TRMPA11111"
    },
    {
        input: "trimnell",
        expected: "TRMNA11111"
    },
    {
        input: "trinder",
        expected: "TRNTA11111"
    },
    {
        input: "tripp",
        expected: "TRP1111111"
    },
    {
        input: "trixie",
        expected: "TRKA111111"
    },
    {
        input: "trnbull",
        expected: "TNPA111111"
    },
    {
        input: "troadic",
        expected: "TRTK111111"
    },
    {
        input: "troomer",
        expected: "TRMA111111"
    },
    {
        input: "troon",
        expected: "TRN1111111"
    },
    {
        input: "trotman",
        expected: "TRTMN11111"
    },
    {
        input: "trott",
        expected: "TRT1111111"
    },
    {
        input: "trotter",
        expected: "TRTA111111"
    },
    {
        input: "trounce",
        expected: "TRNK111111"
    },
    {
        input: "troup",
        expected: "TRP1111111"
    },
    {
        input: "trow",
        expected: "TRA1111111"
    },
    {
        input: "trower",
        expected: "TRWA111111"
    },
    {
        input: "truesdale",
        expected: "TRSTA11111"
    },
    {
        input: "truscott",
        expected: "TRSKT11111"
    },
    {
        input: "try",
        expected: "TRA1111111"
    },
    {
        input: "tryphena",
        expected: "TRFNA11111"
    },
    {
        input: "trythall",
        expected: "TRTA111111"
    },
    {
        input: "tubman",
        expected: "TPMN111111"
    },
    {
        input: "tubmar",
        expected: "TPMA111111"
    },
    {
        input: "tuck",
        expected: "TK11111111"
    },
    {
        input: "tucker",
        expected: "TKA1111111"
    },
    {
        input: "tuckey",
        expected: "TKA1111111"
    },
    {
        input: "tudor",
        expected: "TTA1111111"
    },
    {
        input: "tui",
        expected: "TA11111111"
    },
    {
        input: "tuite",
        expected: "TT11111111"
    },
    {
        input: "tull",
        expected: "TA11111111"
    },
    {
        input: "tulley",
        expected: "TLA1111111"
    },
    {
        input: "tulloch",
        expected: "TLK1111111"
    },
    {
        input: "tully",
        expected: "TLA1111111"
    },
    {
        input: "tunam",
        expected: "TNM1111111"
    },
    {
        input: "tunnell",
        expected: "TNA1111111"
    },
    {
        input: "tunnicliffe",
        expected: "TNKLF11111"
    },
    {
        input: "tunzelman",
        expected: "TNSMN11111"
    },
    {
        input: "tuohy",
        expected: "TA11111111"
    },
    {
        input: "turley",
        expected: "TLA1111111"
    },
    {
        input: "turlington",
        expected: "TLNKTN1111"
    },
    {
        input: "turllbull",
        expected: "TPA1111111"
    },
    {
        input: "turnbull",
        expected: "TNPA111111"
    },
    {
        input: "turner",
        expected: "TNA1111111"
    },
    {
        input: "turpin",
        expected: "TPN1111111"
    },
    {
        input: "turton",
        expected: "TTN1111111"
    },
    {
        input: "turvey",
        expected: "TFA1111111"
    },
    {
        input: "tustain",
        expected: "TSTN111111"
    },
    {
        input: "tutty",
        expected: "TTA1111111"
    },
    {
        input: "tuxford",
        expected: "TKFT111111"
    },
    {
        input: "tvlee",
        expected: "TFLA111111"
    },
    {
        input: "twaddell",
        expected: "TWTA111111"
    },
    {
        input: "twaddle",
        expected: "TWTA111111"
    },
    {
        input: "tweed",
        expected: "TWT1111111"
    },
    {
        input: "tweedale",
        expected: "TWTA111111"
    },
    {
        input: "tweedie",
        expected: "TWTA111111"
    },
    {
        input: "tweedle",
        expected: "TWTA111111"
    },
    {
        input: "tweedy",
        expected: "TWTA111111"
    },
    {
        input: "twelftree",
        expected: "TWFTRA1111"
    },
    {
        input: "twemlow",
        expected: "TWMLA11111"
    },
    {
        input: "twhigg",
        expected: "TWK1111111"
    },
    {
        input: "twining",
        expected: "TWNNK11111"
    },
    {
        input: "twist",
        expected: "TWST111111"
    },
    {
        input: "twose",
        expected: "TWS1111111"
    },
    {
        input: "tye",
        expected: "TA11111111"
    },
    {
        input: "tylee",
        expected: "TLA1111111"
    },
    {
        input: "tyler",
        expected: "TLA1111111"
    },
    {
        input: "tynan",
        expected: "TNN1111111"
    },
    {
        input: "tyre",
        expected: "TA11111111"
    },
    {
        input: "tyree",
        expected: "TRA1111111"
    },
    {
        input: "tyrie",
        expected: "TRA1111111"
    },
    {
        input: "tyrrell",
        expected: "TRA1111111"
    },
    {
        input: "tyrrell-baxter",
        expected: "TRPKTA1111"
    },
    {
        input: "tysoll",
        expected: "TSA1111111"
    },
    {
        input: "tyson",
        expected: "TSN1111111"
    },
    {
        input: "udy",
        expected: "ATA1111111"
    },
    {
        input: "ufton",
        expected: "AFTN111111"
    },
    {
        input: "ulick",
        expected: "ALK1111111"
    },
    {
        input: "ulrica",
        expected: "ARKA111111"
    },
    {
        input: "ulricka",
        expected: "ARKA111111"
    },
    {
        input: "umbers",
        expected: "AMPS111111"
    },
    {
        input: "una",
        expected: "ANA1111111"
    },
    {
        input: "underwood",
        expected: "ANTWT11111"
    },
    {
        input: "unwin",
        expected: "ANWN111111"
    },
    {
        input: "uphill",
        expected: "AFA1111111"
    },
    {
        input: "upson",
        expected: "APSN111111"
    },
    {
        input: "ural",
        expected: "ARA1111111"
    },
    {
        input: "ure",
        expected: "AA11111111"
    },
    {
        input: "uren",
        expected: "ARN1111111"
    },
    {
        input: "uresilla",
        expected: "ARSLA11111"
    },
    {
        input: "ureta",
        expected: "ARTA111111"
    },
    {
        input: "urquhart",
        expected: "AKT1111111"
    },
    {
        input: "ursula",
        expected: "ASLA111111"
    },
    {
        input: "usher",
        expected: "ASA1111111"
    },
    {
        input: "usherwood",
        expected: "ASWT111111"
    },
    {
        input: "ussher",
        expected: "ASA1111111"
    },
    {
        input: "ussherwood",
        expected: "ASWT111111"
    },
    {
        input: "uta",
        expected: "ATA1111111"
    },
    {
        input: "utteridge",
        expected: "ATRK111111"
    },
    {
        input: "uttley",
        expected: "ATLA111111"
    },
    {
        input: "vaidya",
        expected: "FTA1111111"
    },
    {
        input: "vaile",
        expected: "FA11111111"
    },
    {
        input: "valarie",
        expected: "FLRA111111"
    },
    {
        input: "valda",
        expected: "FTA1111111"
    },
    {
        input: "valdemar",
        expected: "FTMA111111"
    },
    {
        input: "valencia",
        expected: "FLNSA11111"
    },
    {
        input: "valentine",
        expected: "FLNTN11111"
    },
    {
        input: "valerie",
        expected: "FLRA111111"
    },
    {
        input: "vallance",
        expected: "FLNK111111"
    },
    {
        input: "valli",
        expected: "FLA1111111"
    },
    {
        input: "valma",
        expected: "FMA1111111"
    },
    {
        input: "valpy",
        expected: "FPA1111111"
    },
    {
        input: "van",
        expected: "FN11111111"
    },
    {
        input: "vance",
        expected: "FNK1111111"
    },
    {
        input: "vanda",
        expected: "FNTA111111"
    },
    {
        input: "vanes",
        expected: "FNS1111111"
    },
    {
        input: "vanessa",
        expected: "FNSA111111"
    },
    {
        input: "vann",
        expected: "FN11111111"
    },
    {
        input: "vara",
        expected: "FRA1111111"
    },
    {
        input: "varcoe",
        expected: "FKA1111111"
    },
    {
        input: "varey",
        expected: "FRA1111111"
    },
    {
        input: "varian",
        expected: "FRN1111111"
    },
    {
        input: "varney",
        expected: "FNA1111111"
    },
    {
        input: "vartha",
        expected: "FTA1111111"
    },
    {
        input: "vashti",
        expected: "FSTA111111"
    },
    {
        input: "vaughan",
        expected: "FKN1111111"
    },
    {
        input: "veal",
        expected: "FA11111111"
    },
    {
        input: "veda",
        expected: "FTA1111111"
    },
    {
        input: "vedder",
        expected: "FTA1111111"
    },
    {
        input: "veida",
        expected: "FTA1111111"
    },
    {
        input: "veint",
        expected: "FNT1111111"
    },
    {
        input: "veitch",
        expected: "FK11111111"
    },
    {
        input: "ven our",
        expected: "FNA1111111"
    },
    {
        input: "vendella",
        expected: "FNTLA11111"
    },
    {
        input: "venessa",
        expected: "FNSA111111"
    },
    {
        input: "venn",
        expected: "FN11111111"
    },
    {
        input: "venning",
        expected: "FNNK111111"
    },
    {
        input: "venour",
        expected: "FNA1111111"
    },
    {
        input: "venus",
        expected: "FNS1111111"
    },
    {
        input: "vera",
        expected: "FRA1111111"
    },
    {
        input: "vercoe",
        expected: "FKA1111111"
    },
    {
        input: "verdon",
        expected: "FTN1111111"
    },
    {
        input: "verdun",
        expected: "FTN1111111"
    },
    {
        input: "vere",
        expected: "FA11111111"
    },
    {
        input: "verena",
        expected: "FRNA111111"
    },
    {
        input: "verey",
        expected: "FRA1111111"
    },
    {
        input: "verion",
        expected: "FRN1111111"
    },
    {
        input: "verity",
        expected: "FRTA111111"
    },
    {
        input: "verna",
        expected: "FNA1111111"
    },
    {
        input: "verner",
        expected: "FNA1111111"
    },
    {
        input: "verngreen",
        expected: "FNKRN11111"
    },
    {
        input: "vernon",
        expected: "FNN1111111"
    },
    {
        input: "verona",
        expected: "FRNA111111"
    },
    {
        input: "veronica",
        expected: "FRNKA11111"
    },
    {
        input: "vesper",
        expected: "FSPA111111"
    },
    {
        input: "vette",
        expected: "FT11111111"
    },
    {
        input: "vezey",
        expected: "FSA1111111"
    },
    {
        input: "vial",
        expected: "FA11111111"
    },
    {
        input: "vickers",
        expected: "FKS1111111"
    },
    {
        input: "vickery",
        expected: "FKRA111111"
    },
    {
        input: "victor",
        expected: "FKTA111111"
    },
    {
        input: "victoria",
        expected: "FKTRA11111"
    },
    {
        input: "vida",
        expected: "FTA1111111"
    },
    {
        input: "vietoria",
        expected: "FTRA111111"
    },
    {
        input: "vik",
        expected: "FK11111111"
    },
    {
        input: "vile",
        expected: "FA11111111"
    },
    {
        input: "vilera",
        expected: "FLRA111111"
    },
    {
        input: "vilhelm",
        expected: "FM11111111"
    },
    {
        input: "villa",
        expected: "FLA1111111"
    },
    {
        input: "vina",
        expected: "FNA1111111"
    },
    {
        input: "vince",
        expected: "FNK1111111"
    },
    {
        input: "vincent",
        expected: "FNSNT11111"
    },
    {
        input: "vine",
        expected: "FN11111111"
    },
    {
        input: "viney",
        expected: "FNA1111111"
    },
    {
        input: "vintiner",
        expected: "FNTNA11111"
    },
    {
        input: "vintinner",
        expected: "FNTNA11111"
    },
    {
        input: "vintinuer",
        expected: "FNTNA11111"
    },
    {
        input: "vioiet",
        expected: "FT11111111"
    },
    {
        input: "viola",
        expected: "FLA1111111"
    },
    {
        input: "violet",
        expected: "FLT1111111"
    },
    {
        input: "violetta",
        expected: "FLTA111111"
    },
    {
        input: "violette",
        expected: "FLT1111111"
    },
    {
        input: "virgil",
        expected: "FKA1111111"
    },
    {
        input: "virginia",
        expected: "FKNA111111"
    },
    {
        input: "virtue",
        expected: "FTA1111111"
    },
    {
        input: "vitharson",
        expected: "FTSN111111"
    },
    {
        input: "viva",
        expected: "FFA1111111"
    },
    {
        input: "vivian",
        expected: "FFN1111111"
    },
    {
        input: "vivien",
        expected: "FFN1111111"
    },
    {
        input: "vivienne",
        expected: "FFN1111111"
    },
    {
        input: "vlietstra",
        expected: "FLTSTRA111"
    },
    {
        input: "voight",
        expected: "FT11111111"
    },
    {
        input: "voigt",
        expected: "FKT1111111"
    },
    {
        input: "voiler",
        expected: "FLA1111111"
    },
    {
        input: "voisey",
        expected: "FSA1111111"
    },
    {
        input: "voller",
        expected: "FLA1111111"
    },
    {
        input: "vona",
        expected: "FNA1111111"
    },
    {
        input: "vosper",
        expected: "FSPA111111"
    },
    {
        input: "voyce",
        expected: "FK11111111"
    },
    {
        input: "voysey",
        expected: "FSA1111111"
    },
    {
        input: "vyner",
        expected: "FNA1111111"
    },
    {
        input: "waby",
        expected: "WPA1111111"
    },
    {
        input: "wacher",
        expected: "WKA1111111"
    },
    {
        input: "wackeldin",
        expected: "WKTN111111"
    },
    {
        input: "wackeldine",
        expected: "WKTN111111"
    },
    {
        input: "wackier",
        expected: "WKA1111111"
    },
    {
        input: "wackilden",
        expected: "WKTN111111"
    },
    {
        input: "wackildene",
        expected: "WKTN111111"
    },
    {
        input: "waddel",
        expected: "WTA1111111"
    },
    {
        input: "waddell",
        expected: "WTA1111111"
    },
    {
        input: "waddle",
        expected: "WTA1111111"
    },
    {
        input: "wade",
        expected: "WT11111111"
    },
    {
        input: "wadie",
        expected: "WTA1111111"
    },
    {
        input: "wadsworth",
        expected: "WTSWT11111"
    },
    {
        input: "waghorn",
        expected: "WKN1111111"
    },
    {
        input: "waghorne",
        expected: "WKN1111111"
    },
    {
        input: "waghornee",
        expected: "WKNA111111"
    },
    {
        input: "wagner",
        expected: "WKNA111111"
    },
    {
        input: "wah",
        expected: "WA11111111"
    },
    {
        input: "wahren",
        expected: "WRN1111111"
    },
    {
        input: "wahrlich",
        expected: "WLK1111111"
    },
    {
        input: "waide",
        expected: "WT11111111"
    },
    {
        input: "waigth",
        expected: "WKT1111111"
    },
    {
        input: "wain",
        expected: "WN11111111"
    },
    {
        input: "wainhouse",
        expected: "WNS1111111"
    },
    {
        input: "waite",
        expected: "WT11111111"
    },
    {
        input: "wakefield",
        expected: "WKFT111111"
    },
    {
        input: "wakelin",
        expected: "WKLN111111"
    },
    {
        input: "wakeling",
        expected: "WKLNK11111"
    },
    {
        input: "walden",
        expected: "WTN1111111"
    },
    {
        input: "waldie",
        expected: "WTA1111111"
    },
    {
        input: "waldren",
        expected: "WTRN111111"
    },
    {
        input: "waldron",
        expected: "WTRN111111"
    },
    {
        input: "wales",
        expected: "WLS1111111"
    },
    {
        input: "wali",
        expected: "WLA1111111"
    },
    {
        input: "walkem",
        expected: "WKM1111111"
    },
    {
        input: "walker",
        expected: "WKA1111111"
    },
    {
        input: "walkern",
        expected: "WKN1111111"
    },
    {
        input: "walkinshaw",
        expected: "WKNSA11111"
    },
    {
        input: "walks",
        expected: "WKS1111111"
    },
    {
        input: "wall",
        expected: "WA11111111"
    },
    {
        input: "wallace",
        expected: "WLK1111111"
    },
    {
        input: "wallen",
        expected: "WLN1111111"
    },
    {
        input: "waller",
        expected: "WLA1111111"
    },
    {
        input: "wallin",
        expected: "WLN1111111"
    },
    {
        input: "walling-jones",
        expected: "WLNKNS1111"
    },
    {
        input: "wallinger",
        expected: "WLNKA11111"
    },
    {
        input: "wallis",
        expected: "WLS1111111"
    },
    {
        input: "walls",
        expected: "WS11111111"
    },
    {
        input: "walmeley",
        expected: "WMLA111111"
    },
    {
        input: "walmsey",
        expected: "WMSA111111"
    },
    {
        input: "walmsley",
        expected: "WMSLA11111"
    },
    {
        input: "walmslsey",
        expected: "WMSSA11111"
    },
    {
        input: "walquest",
        expected: "WKST111111"
    },
    {
        input: "walquist",
        expected: "WKST111111"
    },
    {
        input: "walscott",
        expected: "WSKT111111"
    },
    {
        input: "walsh",
        expected: "WS11111111"
    },
    {
        input: "walter",
        expected: "WTA1111111"
    },
    {
        input: "walters",
        expected: "WTS1111111"
    },
    {
        input: "walton",
        expected: "WTN1111111"
    },
    {
        input: "waltor",
        expected: "WTA1111111"
    },
    {
        input: "wance",
        expected: "WNK1111111"
    },
    {
        input: "ward",
        expected: "WT11111111"
    },
    {
        input: "warden",
        expected: "WTN1111111"
    },
    {
        input: "wardrop",
        expected: "WTRP111111"
    },
    {
        input: "wards",
        expected: "WTS1111111"
    },
    {
        input: "ware",
        expected: "WA11111111"
    },
    {
        input: "wares",
        expected: "WRS1111111"
    },
    {
        input: "wark",
        expected: "WK11111111"
    },
    {
        input: "warne",
        expected: "WN11111111"
    },
    {
        input: "warner",
        expected: "WNA1111111"
    },
    {
        input: "warnock",
        expected: "WNK1111111"
    },
    {
        input: "warreil",
        expected: "WRA1111111"
    },
    {
        input: "warrell",
        expected: "WRA1111111"
    },
    {
        input: "warren",
        expected: "WRN1111111"
    },
    {
        input: "warrington",
        expected: "WRNKTN1111"
    },
    {
        input: "warwick",
        expected: "WWK1111111"
    },
    {
        input: "warwood",
        expected: "WWT1111111"
    },
    {
        input: "washer",
        expected: "WSA1111111"
    },
    {
        input: "wason",
        expected: "WSN1111111"
    },
    {
        input: "wassell",
        expected: "WSA1111111"
    },
    {
        input: "water",
        expected: "WTA1111111"
    },
    {
        input: "waterfield",
        expected: "WTFT111111"
    },
    {
        input: "waterhous",
        expected: "WTS1111111"
    },
    {
        input: "waters",
        expected: "WTS1111111"
    },
    {
        input: "waterson",
        expected: "WTSN111111"
    },
    {
        input: "waterston",
        expected: "WTSTN11111"
    },
    {
        input: "wates",
        expected: "WTS1111111"
    },
    {
        input: "watkins",
        expected: "WTKNS11111"
    },
    {
        input: "watler",
        expected: "WTLA111111"
    },
    {
        input: "watling",
        expected: "WTLNK11111"
    },
    {
        input: "watmough",
        expected: "WTMA111111"
    },
    {
        input: "watsan",
        expected: "WTSN111111"
    },
    {
        input: "watsol1",
        expected: "WTSA111111"
    },
    {
        input: "watson",
        expected: "WTSN111111"
    },
    {
        input: "watt",
        expected: "WT11111111"
    },
    {
        input: "watters",
        expected: "WTS1111111"
    },
    {
        input: "watterson",
        expected: "WTSN111111"
    },
    {
        input: "watts",
        expected: "WTS1111111"
    },
    {
        input: "wattson",
        expected: "WTSN111111"
    },
    {
        input: "waugh",
        expected: "WA11111111"
    },
    {
        input: "way",
        expected: "WA11111111"
    },
    {
        input: "wcatherston",
        expected: "KTSTN11111"
    },
    {
        input: "weaherburn",
        expected: "WPN1111111"
    },
    {
        input: "wealherston",
        expected: "WSTN111111"
    },
    {
        input: "weatherall",
        expected: "WTRA111111"
    },
    {
        input: "weatherbur",
        expected: "WTPA111111"
    },
    {
        input: "weatherburn",
        expected: "WTPN111111"
    },
    {
        input: "weatherell",
        expected: "WTRA111111"
    },
    {
        input: "weatheret",
        expected: "WTRT111111"
    },
    {
        input: "weatherst",
        expected: "WTST111111"
    },
    {
        input: "weathersto",
        expected: "WTSTA11111"
    },
    {
        input: "weatherston",
        expected: "WTSTN11111"
    },
    {
        input: "weatherstone",
        expected: "WTSTN11111"
    },
    {
        input: "weaver",
        expected: "WFA1111111"
    },
    {
        input: "weavers",
        expected: "WFS1111111"
    },
    {
        input: "webb",
        expected: "WP11111111"
    },
    {
        input: "webber",
        expected: "WPA1111111"
    },
    {
        input: "webh",
        expected: "WP11111111"
    },
    {
        input: "webling",
        expected: "WPLNK11111"
    },
    {
        input: "webster",
        expected: "WPSTA11111"
    },
    {
        input: "weddell",
        expected: "WTA1111111"
    },
    {
        input: "wedderspo",
        expected: "WTSPA11111"
    },
    {
        input: "wedderspoo",
        expected: "WTSPA11111"
    },
    {
        input: "wedderspoon",
        expected: "WTSPN11111"
    },
    {
        input: "wedgwood",
        expected: "WKWT111111"
    },
    {
        input: "wedlake",
        expected: "WTLK111111"
    },
    {
        input: "wedlock",
        expected: "WTLK111111"
    },
    {
        input: "wee",
        expected: "WA11111111"
    },
    {
        input: "weedon",
        expected: "WTN1111111"
    },
    {
        input: "weight",
        expected: "WT11111111"
    },
    {
        input: "weightman",
        expected: "WTMN111111"
    },
    {
        input: "weir",
        expected: "WA11111111"
    },
    {
        input: "welbourn",
        expected: "WPN1111111"
    },
    {
        input: "welby",
        expected: "WPA1111111"
    },
    {
        input: "welch",
        expected: "WK11111111"
    },
    {
        input: "weldon",
        expected: "WTN1111111"
    },
    {
        input: "welham",
        expected: "WM11111111"
    },
    {
        input: "wellard",
        expected: "WLT1111111"
    },
    {
        input: "wellbourn",
        expected: "WPN1111111"
    },
    {
        input: "wellbrock",
        expected: "WPRK111111"
    },
    {
        input: "wellburn",
        expected: "WPN1111111"
    },
    {
        input: "weller",
        expected: "WLA1111111"
    },
    {
        input: "wellesley",
        expected: "WLSLA11111"
    },
    {
        input: "wellington",
        expected: "WLNKTN1111"
    },
    {
        input: "wellman",
        expected: "WMN1111111"
    },
    {
        input: "wells",
        expected: "WS11111111"
    },
    {
        input: "wellsted",
        expected: "WSTT111111"
    },
    {
        input: "welnoski",
        expected: "WNSKA11111"
    },
    {
        input: "welply",
        expected: "WPLA111111"
    },
    {
        input: "welsford",
        expected: "WSFT111111"
    },
    {
        input: "welsh",
        expected: "WS11111111"
    },
    {
        input: "welstead",
        expected: "WSTT111111"
    },
    {
        input: "wenborn",
        expected: "WNPN111111"
    },
    {
        input: "wendelken",
        expected: "WNTKN11111"
    },
    {
        input: "wenlock",
        expected: "WNLK111111"
    },
    {
        input: "wenthersto",
        expected: "WNTSTA1111"
    },
    {
        input: "wentworth",
        expected: "WNTWT11111"
    },
    {
        input: "werner",
        expected: "WNA1111111"
    },
    {
        input: "wesby",
        expected: "WSPA111111"
    },
    {
        input: "wesley",
        expected: "WSLA111111"
    },
    {
        input: "wesney",
        expected: "WSNA111111"
    },
    {
        input: "wessman",
        expected: "WSMN111111"
    },
    {
        input: "west",
        expected: "WST1111111"
    },
    {
        input: "westake",
        expected: "WSTK111111"
    },
    {
        input: "westbrook",
        expected: "WSTPRK1111"
    },
    {
        input: "westcott",
        expected: "WSTKT11111"
    },
    {
        input: "western",
        expected: "WSTN111111"
    },
    {
        input: "westfield",
        expected: "WSTFT11111"
    },
    {
        input: "westfold",
        expected: "WSTFT11111"
    },
    {
        input: "westlake",
        expected: "WSTLK11111"
    },
    {
        input: "westland",
        expected: "WSTLNT1111"
    },
    {
        input: "weston",
        expected: "WSTN111111"
    },
    {
        input: "westwood",
        expected: "WSTWT11111"
    },
    {
        input: "wetherilt",
        expected: "WTRT111111"
    },
    {
        input: "wethersto",
        expected: "WTSTA11111"
    },
    {
        input: "wetherstone",
        expected: "WTSTN11111"
    },
    {
        input: "wethey",
        expected: "WTA1111111"
    },
    {
        input: "wetney",
        expected: "WTNA111111"
    },
    {
        input: "weyland",
        expected: "WLNT111111"
    },
    {
        input: "weymouth",
        expected: "WMT1111111"
    },
    {
        input: "whaley",
        expected: "WLA1111111"
    },
    {
        input: "wharin",
        expected: "WRN1111111"
    },
    {
        input: "wharten",
        expected: "WTN1111111"
    },
    {
        input: "wharton",
        expected: "WTN1111111"
    },
    {
        input: "wheatley",
        expected: "WTLA111111"
    },
    {
        input: "wheeier",
        expected: "WA11111111"
    },
    {
        input: "wheelan",
        expected: "WLN1111111"
    },
    {
        input: "wheelel",
        expected: "WLA1111111"
    },
    {
        input: "wheeler",
        expected: "WLA1111111"
    },
    {
        input: "wheeley",
        expected: "WLA1111111"
    },
    {
        input: "wheelwright",
        expected: "WRT1111111"
    },
    {
        input: "whelan",
        expected: "WLN1111111"
    },
    {
        input: "whenua",
        expected: "WNA1111111"
    },
    {
        input: "whetter",
        expected: "WTA1111111"
    },
    {
        input: "whibe",
        expected: "WP11111111"
    },
    {
        input: "whileley",
        expected: "WLLA111111"
    },
    {
        input: "whineray",
        expected: "WNRA111111"
    },
    {
        input: "whinray",
        expected: "WNRA111111"
    },
    {
        input: "whipp",
        expected: "WP11111111"
    },
    {
        input: "whiston",
        expected: "WSTN111111"
    },
    {
        input: "whitaker",
        expected: "WTKA111111"
    },
    {
        input: "whitburn",
        expected: "WTPN111111"
    },
    {
        input: "whitcombe",
        expected: "WTKM111111"
    },
    {
        input: "white",
        expected: "WT11111111"
    },
    {
        input: "white-pars",
        expected: "WTPS111111"
    },
    {
        input: "white-parsons",
        expected: "WTPSNS1111"
    },
    {
        input: "whitefield",
        expected: "WTFT111111"
    },
    {
        input: "whitehead",
        expected: "WTT1111111"
    },
    {
        input: "whitehorl",
        expected: "WTA1111111"
    },
    {
        input: "whitehorn",
        expected: "WTN1111111"
    },
    {
        input: "whiteley",
        expected: "WTLA111111"
    },
    {
        input: "whiteside",
        expected: "WTST111111"
    },
    {
        input: "whitfield",
        expected: "WTFT111111"
    },
    {
        input: "whiting",
        expected: "WTNK111111"
    },
    {
        input: "whitley",
        expected: "WTLA111111"
    },
    {
        input: "whitlow",
        expected: "WTLA111111"
    },
    {
        input: "whitney",
        expected: "WTNA111111"
    },
    {
        input: "whito",
        expected: "WTA1111111"
    },
    {
        input: "whitson",
        expected: "WTSN111111"
    },
    {
        input: "whittaker",
        expected: "WTKA111111"
    },
    {
        input: "whittall",
        expected: "WTA1111111"
    },
    {
        input: "whittet",
        expected: "WTT1111111"
    },
    {
        input: "whitticase",
        expected: "WTKS111111"
    },
    {
        input: "whittington",
        expected: "WTNKTN1111"
    },
    {
        input: "whittleston",
        expected: "WTLSTN1111"
    },
    {
        input: "whittlestone",
        expected: "WTLSTN1111"
    },
    {
        input: "whitton",
        expected: "WTN1111111"
    },
    {
        input: "whitty",
        expected: "WTA1111111"
    },
    {
        input: "whvte",
        expected: "FT11111111"
    },
    {
        input: "whyman",
        expected: "WMN1111111"
    },
    {
        input: "whyndham",
        expected: "WNTM111111"
    },
    {
        input: "whyte",
        expected: "WT11111111"
    },
    {
        input: "wiberg",
        expected: "WPK1111111"
    },
    {
        input: "wicko",
        expected: "WKA1111111"
    },
    {
        input: "wicks",
        expected: "WKS1111111"
    },
    {
        input: "wicksteed",
        expected: "WKSTT11111"
    },
    {
        input: "widdowson",
        expected: "WTSN111111"
    },
    {
        input: "wide",
        expected: "WT11111111"
    },
    {
        input: "widhart",
        expected: "WTT1111111"
    },
    {
        input: "wigg",
        expected: "WK11111111"
    },
    {
        input: "wiggins",
        expected: "WKNS111111"
    },
    {
        input: "wight",
        expected: "WT11111111"
    },
    {
        input: "wightman",
        expected: "WTMN111111"
    },
    {
        input: "wiikinson",
        expected: "WKNSN11111"
    },
    {
        input: "wikland",
        expected: "WKLNT11111"
    },
    {
        input: "wilberfoss",
        expected: "WPFS111111"
    },
    {
        input: "wilbert",
        expected: "WPT1111111"
    },
    {
        input: "wilbur",
        expected: "WPA1111111"
    },
    {
        input: "wilby",
        expected: "WPA1111111"
    },
    {
        input: "wilcox",
        expected: "WKK1111111"
    },
    {
        input: "wilde",
        expected: "WT11111111"
    },
    {
        input: "wilden",
        expected: "WTN1111111"
    },
    {
        input: "wilder",
        expected: "WTA1111111"
    },
    {
        input: "wildey",
        expected: "WTA1111111"
    },
    {
        input: "wildgoose",
        expected: "WKS1111111"
    },
    {
        input: "wildie",
        expected: "WTA1111111"
    },
    {
        input: "wilding",
        expected: "WTNK111111"
    },
    {
        input: "wildoy",
        expected: "WTA1111111"
    },
    {
        input: "wiles",
        expected: "WLS1111111"
    },
    {
        input: "wiley",
        expected: "WLA1111111"
    },
    {
        input: "wilfred",
        expected: "WFRT111111"
    },
    {
        input: "wilfrid",
        expected: "WFRT111111"
    },
    {
        input: "wilhelm",
        expected: "WM11111111"
    },
    {
        input: "wilhelmena",
        expected: "WMNA111111"
    },
    {
        input: "wilhelmina",
        expected: "WMNA111111"
    },
    {
        input: "wilhelmsen",
        expected: "WMSN111111"
    },
    {
        input: "wilhelmson",
        expected: "WMSN111111"
    },
    {
        input: "wilhemenia",
        expected: "WMNA111111"
    },
    {
        input: "wilhemina",
        expected: "WMNA111111"
    },
    {
        input: "wilheminia",
        expected: "WMNA111111"
    },
    {
        input: "wilkeison",
        expected: "WKSN111111"
    },
    {
        input: "wilkerson",
        expected: "WKSN111111"
    },
    {
        input: "wilkie",
        expected: "WKA1111111"
    },
    {
        input: "wilkin",
        expected: "WKN1111111"
    },
    {
        input: "wilkinon",
        expected: "WKNN111111"
    },
    {
        input: "wilkins",
        expected: "WKNS111111"
    },
    {
        input: "wilkinson",
        expected: "WKNSN11111"
    },
    {
        input: "will",
        expected: "WA11111111"
    },
    {
        input: "willamina",
        expected: "WLMNA11111"
    },
    {
        input: "willcocks",
        expected: "WKKS111111"
    },
    {
        input: "willen",
        expected: "WLN1111111"
    },
    {
        input: "willers",
        expected: "WLS1111111"
    },
    {
        input: "willett",
        expected: "WLT1111111"
    },
    {
        input: "william",
        expected: "WLM1111111"
    },
    {
        input: "williame",
        expected: "WLM1111111"
    },
    {
        input: "williamina",
        expected: "WLMNA11111"
    },
    {
        input: "williammina",
        expected: "WLMNA11111"
    },
    {
        input: "williams",
        expected: "WLMS111111"
    },
    {
        input: "williamso",
        expected: "WLMSA11111"
    },
    {
        input: "williamson",
        expected: "WLMSN11111"
    },
    {
        input: "willianson",
        expected: "WLNSN11111"
    },
    {
        input: "williarns",
        expected: "WLNS111111"
    },
    {
        input: "williden",
        expected: "WLTN111111"
    },
    {
        input: "willie",
        expected: "WLA1111111"
    },
    {
        input: "willis",
        expected: "WLS1111111"
    },
    {
        input: "willitn",
        expected: "WLTN111111"
    },
    {
        input: "willocks",
        expected: "WLKS111111"
    },
    {
        input: "willon",
        expected: "WLN1111111"
    },
    {
        input: "willox",
        expected: "WLK1111111"
    },
    {
        input: "wills",
        expected: "WS11111111"
    },
    {
        input: "willson",
        expected: "WSN1111111"
    },
    {
        input: "wilma",
        expected: "WMA1111111"
    },
    {
        input: "wilmot",
        expected: "WMT1111111"
    },
    {
        input: "wiloy",
        expected: "WLA1111111"
    },
    {
        input: "wilson",
        expected: "WSN1111111"
    },
    {
        input: "wilson-brown",
        expected: "WSNPRN1111"
    },
    {
        input: "wilson-pyne",
        expected: "WSNPN11111"
    },
    {
        input: "wilton",
        expected: "WTN1111111"
    },
    {
        input: "wimpellny",
        expected: "WMPNA11111"
    },
    {
        input: "wimpenny",
        expected: "WMPNA11111"
    },
    {
        input: "winchester",
        expected: "WNKSTA1111"
    },
    {
        input: "winchestor",
        expected: "WNKSTA1111"
    },
    {
        input: "windelburn",
        expected: "WNTPN11111"
    },
    {
        input: "windeler",
        expected: "WNTLA11111"
    },
    {
        input: "winder",
        expected: "WNTA111111"
    },
    {
        input: "winders",
        expected: "WNTS111111"
    },
    {
        input: "windsor",
        expected: "WNTSA11111"
    },
    {
        input: "windus",
        expected: "WNTS111111"
    },
    {
        input: "wine",
        expected: "WN11111111"
    },
    {
        input: "winefield",
        expected: "WNFT111111"
    },
    {
        input: "winepress",
        expected: "WNPRS11111"
    },
    {
        input: "winfred",
        expected: "WNFRT11111"
    },
    {
        input: "wing",
        expected: "WNK1111111"
    },
    {
        input: "wingfield",
        expected: "WNKFT11111"
    },
    {
        input: "wingham",
        expected: "WNM1111111"
    },
    {
        input: "winifred",
        expected: "WNFRT11111"
    },
    {
        input: "winkfield",
        expected: "WNKFT11111"
    },
    {
        input: "winn",
        expected: "WN11111111"
    },
    {
        input: "winnie",
        expected: "WNA1111111"
    },
    {
        input: "winniefred",
        expected: "WNFRT11111"
    },
    {
        input: "winnifred",
        expected: "WNFRT11111"
    },
    {
        input: "winnifrid",
        expected: "WNFRT11111"
    },
    {
        input: "winslade",
        expected: "WNSLT11111"
    },
    {
        input: "winston",
        expected: "WNSTN11111"
    },
    {
        input: "winter",
        expected: "WNTA111111"
    },
    {
        input: "winterr",
        expected: "WNTA111111"
    },
    {
        input: "winton",
        expected: "WNTN111111"
    },
    {
        input: "wintrup",
        expected: "WNTRP11111"
    },
    {
        input: "wise",
        expected: "WS11111111"
    },
    {
        input: "wisely",
        expected: "WSLA111111"
    },
    {
        input: "wiseman",
        expected: "WSMN111111"
    },
    {
        input: "wishart",
        expected: "WST1111111"
    },
    {
        input: "wisnesky",
        expected: "WSNSKA1111"
    },
    {
        input: "witchall",
        expected: "WKA1111111"
    },
    {
        input: "witchalls",
        expected: "WKS1111111"
    },
    {
        input: "withecomb",
        expected: "WTKM111111"
    },
    {
        input: "withecombe",
        expected: "WTKM111111"
    },
    {
        input: "witheford",
        expected: "WTFT111111"
    },
    {
        input: "withell",
        expected: "WTA1111111"
    },
    {
        input: "withelmsen",
        expected: "WTMSN11111"
    },
    {
        input: "witherford",
        expected: "WTFT111111"
    },
    {
        input: "withers",
        expected: "WTS1111111"
    },
    {
        input: "withey",
        expected: "WTA1111111"
    },
    {
        input: "withington",
        expected: "WTNKTN1111"
    },
    {
        input: "withnell",
        expected: "WTNA111111"
    },
    {
        input: "withy",
        expected: "WTA1111111"
    },
    {
        input: "witley",
        expected: "WTLA111111"
    },
    {
        input: "witt",
        expected: "WT11111111"
    },
    {
        input: "wix",
        expected: "WK11111111"
    },
    {
        input: "wkitty",
        expected: "KTA1111111"
    },
    {
        input: "wlight",
        expected: "LT11111111"
    },
    {
        input: "wlitticase",
        expected: "LTKS111111"
    },
    {
        input: "woadhead",
        expected: "WTT1111111"
    },
    {
        input: "wohlers",
        expected: "WLS1111111"
    },
    {
        input: "wohlmann",
        expected: "WMN1111111"
    },
    {
        input: "wolf",
        expected: "WF11111111"
    },
    {
        input: "wolfe",
        expected: "WF11111111"
    },
    {
        input: "wolfenden",
        expected: "WFNTN11111"
    },
    {
        input: "wolfinden",
        expected: "WFNTN11111"
    },
    {
        input: "wolgast",
        expected: "WKST111111"
    },
    {
        input: "wolstenhol",
        expected: "WSTNA11111"
    },
    {
        input: "wolstenholme",
        expected: "WSTNM11111"
    },
    {
        input: "wong",
        expected: "WNK1111111"
    },
    {
        input: "wood",
        expected: "WT11111111"
    },
    {
        input: "woodberry",
        expected: "WTPRA11111"
    },
    {
        input: "woodbury",
        expected: "WTPRA11111"
    },
    {
        input: "woodfield",
        expected: "WTFT111111"
    },
    {
        input: "woodford",
        expected: "WTFT111111"
    },
    {
        input: "woodger",
        expected: "WKA1111111"
    },
    {
        input: "woodham",
        expected: "WTM1111111"
    },
    {
        input: "woodhead",
        expected: "WTT1111111"
    },
    {
        input: "woodhill",
        expected: "WTA1111111"
    },
    {
        input: "woodhouse",
        expected: "WTS1111111"
    },
    {
        input: "woodifiel",
        expected: "WTFA111111"
    },
    {
        input: "woodifield",
        expected: "WTFT111111"
    },
    {
        input: "wooding",
        expected: "WTNK111111"
    },
    {
        input: "woodley",
        expected: "WTLA111111"
    },
    {
        input: "woodrow",
        expected: "WTRA111111"
    },
    {
        input: "woods",
        expected: "WTS1111111"
    },
    {
        input: "woodside",
        expected: "WTST111111"
    },
    {
        input: "woodward",
        expected: "WTWT111111"
    },
    {
        input: "wooldridge",
        expected: "WTRK111111"
    },
    {
        input: "woolf",
        expected: "WF11111111"
    },
    {
        input: "woolland",
        expected: "WLNT111111"
    },
    {
        input: "woolley",
        expected: "WLA1111111"
    },
    {
        input: "woolliams",
        expected: "WLMS111111"
    },
    {
        input: "woolnough",
        expected: "WNA1111111"
    },
    {
        input: "wooster",
        expected: "WSTA111111"
    },
    {
        input: "wooton",
        expected: "WTN1111111"
    },
    {
        input: "wootten",
        expected: "WTN1111111"
    },
    {
        input: "wootton",
        expected: "WTN1111111"
    },
    {
        input: "worger",
        expected: "WKA1111111"
    },
    {
        input: "work",
        expected: "WK11111111"
    },
    {
        input: "workman",
        expected: "WKMN111111"
    },
    {
        input: "workn1an",
        expected: "WKNN111111"
    },
    {
        input: "worrall",
        expected: "WRA1111111"
    },
    {
        input: "worsdell",
        expected: "WSTA111111"
    },
    {
        input: "worth",
        expected: "WT11111111"
    },
    {
        input: "worthingt",
        expected: "WTNKT11111"
    },
    {
        input: "worthingto",
        expected: "WTNKTA1111"
    },
    {
        input: "worthington",
        expected: "WTNKTN1111"
    },
    {
        input: "wortley",
        expected: "WTLA111111"
    },
    {
        input: "wotherspoon",
        expected: "WTSPN11111"
    },
    {
        input: "wragge",
        expected: "RK11111111"
    },
    {
        input: "wraggo",
        expected: "RKA1111111"
    },
    {
        input: "wraight",
        expected: "RT11111111"
    },
    {
        input: "wrathall",
        expected: "RTA1111111"
    },
    {
        input: "wrather",
        expected: "RTA1111111"
    },
    {
        input: "wray",
        expected: "RA11111111"
    },
    {
        input: "wreathall",
        expected: "RTA1111111"
    },
    {
        input: "wregglesworth",
        expected: "RKLSWT1111"
    },
    {
        input: "wren",
        expected: "RN11111111"
    },
    {
        input: "wrenn",
        expected: "RN11111111"
    },
    {
        input: "wrght",
        expected: "T111111111"
    },
    {
        input: "wrigglesworth",
        expected: "RKLSWT1111"
    },
    {
        input: "wright",
        expected: "RT11111111"
    },
    {
        input: "wrightson",
        expected: "RTSN111111"
    },
    {
        input: "wrignt",
        expected: "RKNT111111"
    },
    {
        input: "writer",
        expected: "RTA1111111"
    },
    {
        input: "wroblenski",
        expected: "RPLNSKA111"
    },
    {
        input: "wward",
        expected: "WT11111111"
    },
    {
        input: "wyatt",
        expected: "WT11111111"
    },
    {
        input: "wyber",
        expected: "WPA1111111"
    },
    {
        input: "wyborn",
        expected: "WPN1111111"
    },
    {
        input: "wycherley",
        expected: "WKLA111111"
    },
    {
        input: "wyinks",
        expected: "WNKS111111"
    },
    {
        input: "wylie",
        expected: "WLA1111111"
    },
    {
        input: "wyllie",
        expected: "WLA1111111"
    },
    {
        input: "wyman",
        expected: "WMN1111111"
    },
    {
        input: "wyness",
        expected: "WNS1111111"
    },
    {
        input: "wynie",
        expected: "WNA1111111"
    },
    {
        input: "wynks",
        expected: "WNKS111111"
    },
    {
        input: "wynn",
        expected: "WN11111111"
    },
    {
        input: "wynne",
        expected: "WN11111111"
    },
    {
        input: "wyse",
        expected: "WS11111111"
    },
    {
        input: "yamm",
        expected: "YM11111111"
    },
    {
        input: "yardley",
        expected: "YTLA111111"
    },
    {
        input: "yarlett",
        expected: "YLT1111111"
    },
    {
        input: "yates",
        expected: "YTS1111111"
    },
    {
        input: "yelds",
        expected: "YTS1111111"
    },
    {
        input: "yelland",
        expected: "YLNT111111"
    },
    {
        input: "yemm",
        expected: "YM11111111"
    },
    {
        input: "yeoman",
        expected: "YMN1111111"
    },
    {
        input: "yerex",
        expected: "YRK1111111"
    },
    {
        input: "yet",
        expected: "YT11111111"
    },
    {
        input: "yetti",
        expected: "YTA1111111"
    },
    {
        input: "yip",
        expected: "YP11111111"
    },
    {
        input: "york",
        expected: "YK11111111"
    },
    {
        input: "yorstan",
        expected: "YSTN111111"
    },
    {
        input: "yorston",
        expected: "YSTN111111"
    },
    {
        input: "youds",
        expected: "YTS1111111"
    },
    {
        input: "young",
        expected: "YNK1111111"
    },
    {
        input: "young kwong",
        expected: "YNKWNK1111"
    },
    {
        input: "youngman",
        expected: "YNKMN11111"
    },
    {
        input: "youngson",
        expected: "YNKSN11111"
    },
    {
        input: "ysabel",
        expected: "ASPA111111"
    },
    {
        input: "yuill",
        expected: "YA11111111"
    },
    {
        input: "yvetta",
        expected: "AFTA111111"
    },
    {
        input: "yvonne",
        expected: "AFN1111111"
    },
    {
        input: "zealandia",
        expected: "SLNTA11111"
    },
    {
        input: "zeby",
        expected: "SPA1111111"
    },
    {
        input: "zela",
        expected: "SLA1111111"
    },
    {
        input: "zella",
        expected: "SLA1111111"
    },
    {
        input: "zelland",
        expected: "SLNT111111"
    },
    {
        input: "zeller",
        expected: "SLA1111111"
    },
    {
        input: "zelma",
        expected: "SMA1111111"
    },
    {
        input: "zetta",
        expected: "STA1111111"
    },
    {
        input: "zillah",
        expected: "SLA1111111"
    },
    {
        input: "zimmerman",
        expected: "SMMN111111"
    },
    {
        input: "zita",
        expected: "STA1111111"
    },
    {
        input: "zoe",
        expected: "SA11111111"
    },
    {
        input: "zohra",
        expected: "SRA1111111"
    },
    {
        input: "zola",
        expected: "SLA1111111"
    },
    {
        input: "zona",
        expected: "SNA1111111"
    },
    {
        input: "zouch",
        expected: "SK11111111"
    },
    {
        input: "zwimpfer",
        expected: "SWMPFA1111"
    }
];
