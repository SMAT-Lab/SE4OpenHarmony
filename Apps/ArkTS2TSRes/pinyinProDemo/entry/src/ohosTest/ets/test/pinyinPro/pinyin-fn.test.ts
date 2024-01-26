let __generate__Id: number = 0;
function generateId(): string {
    return "pinyin-fn.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { pinyin } from 'pinyin-pro';
export default function pinyinFnTest() {
    describe('pinyinFn', () => {
        it('pinyin_fn_withspace', 0, () => {
            const result = pinyin('测试..  ..', {
                type: 'array'
            });
            expect(result).assertDeepEquals(['cè', 'shì', '.', '.', ' ', ' ', '.', '.']);
        });
        it('pinyin_fn_emptystring', 0, () => {
            const resultStr = pinyin('');
            const resultArr = pinyin('', {
                type: 'array'
            });
            expect(resultStr).assertEqual('');
            expect(resultArr).assertDeepEquals([]);
        });
        it('pinyin_fn_origin', 0, () => {
            const result = pinyin('赵钱孙李吧');
            expect(result).assertEqual('zhào qián sūn lǐ ba');
        });
        it('array', 0, () => {
            const result = pinyin('赵钱孙李吧', {
                type: 'array'
            });
            expect(result).assertDeepEquals(['zhào', 'qián', 'sūn', 'lǐ', 'ba']);
        });
        it('right_pinyin', 0, () => {
            const result = pinyin('手下败将');
            expect(result).assertEqual('shǒu xià bài jiàng');
        });
        it('left_pinyin', 0, () => {
            const result = pinyin('避难所');
            expect(result).assertEqual('bì nàn suǒ');
        });
        it('long_text', 0, () => {
            const result = pinyin(`大海深处的一条美人鱼一直对大海之外的世界充满了好奇，她一直想要出去看看海之外的世界，她的父母兄弟姐妹们却告诉她海以外的世界非常险恶，人心非常险恶，如果人类发现她美人鱼的身份她就会陷入非常危险的境地，他们劝告她不要出去。她不相信，她觉得自己有能力保护好自己，等她玩一段时间她就回来，否则这始终会是她心里的一个遗憾，她不想在大海里局限的过完这一生。一天，她趁家里不注意偷偷溜上岸，幻化成人型，向离海越来越远的地方走去，美人鱼的美貌所到之处皆换来一阵惊叹，但她不知道的是她的身后一直跟着一个人，从她上岸的那刻开始。身后跟着的男人越来越接近她，在她毫无防备的情况下走向她，他打着想要跟她做朋友的名义与美人鱼交谈，美人鱼告诉他自己在家里是最小的所以自己叫小小，和家里闹了别扭就独自一人跑了出来，男人说：“我叫李浩博，你很有趣，我们可以做个朋友吗？”美人鱼心里非常高兴，没想到自己刚上岸这么快就有了朋友，单纯的美人鱼想也不想就答应了，天色渐晚，考虑到小小无处可去，李浩博问她是否愿意去自己家里先将就住着，小小想既然是朋友而且自己也没有去处就点了点头，等小小睡着后，李浩博走向一个偏僻的地方对着电话说了句又来了单生意，准备下，便挂了电话。第二天，李浩博问小小有没有工作，他可以给她介绍，小小好奇的问：“什么工作呀？”浩博对她说：“是可以让很多人知道你并且喜欢你的工作。”小小兴奋的答应了。吃过饭，浩博带她去了工作室签了协议，便将她交给了老师带她训练，每天唱歌，舞蹈的练习从未停止，虽然辛苦但为了让更多人认识她，她从不抱怨，浩博也每天忙完自己的事后就会来接她回家，会问她累不累，会给她做饭，一年之后她出道了，浩博帮她接了很多电视剧，电影，广告代言，小小的名气越来越大，粉丝越来越多，小小非常开心，浩博也一直担任着她的经纪人，慢慢的她越来越喜欢现在的生活，她甚至快忘了自己是条美人鱼，她觉得自己和其他人没有任何不同，也忘了要回到海里和海里的父母兄弟姐妹。她对浩博非常信任，他让自己做什么小小就会去做什么。虽然是一个新人，但她单纯，善良，娱乐圈里很多人都喜欢她，她的朋友也从开始的只有浩博变得越来越多，但她发现她对浩博却不再像是开始的朋友的情感，她好喜欢他，浩博对她也一直很好，小小觉得他应该也是喜欢自己的，她喝醉后他会照顾她，拍完戏累到不行的时候他会背她回家，她每天过的充实而又快乐，她好喜欢现在的生活，她希望一直像现在一样。每次接受采访，问到她与浩博是不是有不一样的关系，是不是已经在一起了，她总是笑笑，浩博跟她说对外必须说自己单身不然会影响她的发展，虽然她不在乎这些但是是浩博说的她只好答应，她觉得浩博这样做是为了保护她，十年过去，她已不再是当初刚出道的新人，手上的资源也越来越少，她想要安稳，想要浩博一直陪着她，可浩博和她在一起的时间越来越少，她对自己认为浩博也喜欢自己的想法动摇了，她问了好几次浩博喜不喜欢自己，他总是沉默或者找其他话题回避了这个问题，她想起之前一位前辈对她说的“期待所带来的满足感，最美好的，不是别人满足了自己的期待，而是我们满足了别人的期待。”“现在的我应该满足了他的期待了吧，我成为了他当初想让我成为的那种人，有了名气，可以给他带来财富，我不哭不闹，所有事情都听从他的安排，顺从他的心意，在他心里自己还有什么不好呢？”小小看着浩博想着。她觉得好累，每天不停的工作，完成他给她的每个任务，她想让自己好好休息一段时间，多一些和他相处的时间，她跟浩博说自己想休息一段时间，浩博想了想同意了，第二天她便宣布了自己将暂时退出娱乐圈，浩博送她回了家，他对她说明天带她去个地方就走了，她不知道他要带她去哪，但她相信他，她不知道他是什么时候回来的，他叫醒她的时候已经是第二天早晨了，一如既往地，他们一起吃过早餐，她跟在他身后来到一个从未来过的地方，这个地方好冷，他们一起走进去，她想要拉浩博，但他却突然跑开了，她愣在原地。一个铁制的笼子从天而降困住了她，她呆呆的望着浩博那张冷漠的脸，“我以为自己满足了你的期待，我以为我在你心里是不同的，我以为你起码对我是有一点喜欢的，我以为我们会一直在一起，我以为你会一直对我好的，原来，一切都只是我以为。为什么这么对我？”他冷冷地说：“因为你已经没有价值了，从一开始接近你就是为了利用你，就是为了让你给我赚钱，如果不是因为你对我来说是一笔巨大的财富，我怎么可能会去讨好你，说到底还是你太天真了，我说什么你都信。”小小现在才明白当初父母不让她上岸说的话，“你一开始就知道我的身份是不是？”“对，从你上岸的那一刻我就知道了，现在是你最后能发挥的价值了，也不枉我对你费心了这么多年。”“原来十几年的陪伴我在你眼里终究抵不过钱。”看着浩博决绝的转身离开的那刻小小哭的撕心裂肺，她后悔自己当初不管不顾的上岸了。她不知道自己要被带去哪，只从那些人的话语中知道他们要用自己做实验，研究东西。被运送去另一个地方的路上她被救了，是她的哥哥们将那些人打晕将她带回海里，看着哥哥们身上的血她好恨浩博，更恨自己，海里等着她的是父母兄弟姐妹，她才明白会一直在自己身后的只有家人，她发誓再不上岸，此后再不见人类。海底深处才是她的家，这些人鱼和每一条鱼才是她该依赖信任的，原来它们在这里，它们一直都在这里守着她。`);
            expect(result).assertEqual(result);
        });
    });
}
