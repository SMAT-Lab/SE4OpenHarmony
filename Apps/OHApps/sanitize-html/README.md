# sanitize-html

## 简介

sanitize-html 提供了HTML清理API，支持HTML片段清理。内置默认的标签、属性等、可根据默认属性进行HTML清理，同时也可进行自行配置，根据用户需求进行自定义HTML清理规则。

## 下载安装

```
ohpm install @ohos/sanitize-html
```

OpenHarmony
ohpm 环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明

引入HTML清理接口，根据不同配置规则，获取不同的清理结果。

```
import sanitizeHtml from 'sanitize-html';
```


```
默认配置：
sanitizeHtml.defaults = {
  allowedTags: [
    // Content sectioning
    'address', 'article', 'aside', 'footer', 'header',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup',
    'main', 'nav', 'section',
    // Text content
    'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure',
    'hr', 'li', 'main', 'ol', 'p', 'pre', 'ul',
    // Inline text semantics
    'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn',
    'em', 'i', 'kbd', 'mark', 'q',
    'rb', 'rp', 'rt', 'rtc', 'ruby',
    's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
    // Table content
    'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th',
    'thead', 'tr'
  ],
  disallowedTagsMode: 'discard',
  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ]
  },
  selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
  // URL schemes we permit
  allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'tel' ],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
  allowProtocolRelative: true,
  enforceHtmlBoundary: false
};
```



### 1. 配置允许的标签

1. 覆盖默认允许的标签集合

   ```
   sanitizeHtml.defaults.allowedTags = ['img','iframe']
   sanitizeHtml(html)
   或
   sanitizeHtml(html,{allowedTags:['img','iframe']})
   ```

2. 追加默认允许的标签

   ```
   sanitizeHtml.defaults.allowedTags.push('img')
   sanitizeHtml(html)
   或
   sanitizeHtml.defaults.allowedTags.concat(['img','iframe'])
   sanitizeHtml(html)
   ```

3. 配置允许所有标签

   ```
   sanitizeHtml(html,{allowedTags:false})
   或
   sanitizeHtml(html,{allowedTags:undefined})
   ```

### 2. 配置允许的属性

1. 覆盖默认允许的属性集合

   ```
   sanitizeHtml.defaults.allowedAttributes = {'a':['href'，'src']}
   sanitizeHtml(html)
   或
   sanitizeHtml(html,{allowedAttributes:{'a':['href'，'src']}})
   
   // 为所有标签添加属性使用 * 作为key值
   sanitizeHtml(html,{allowedAttributes:{'*':['id','class']}})
   ```

2. 追加默认允许的属性

   ```
   // 获取到想要追加属性的标签，注意：需要allowedTags中允许该标签
   let attrs = sanitizeHtml.defaults.allowedAttributes['a']
   
   attrs.push('name')
   sanitizeHtml(html)
   或 
   attrs.concat(['name','id'])
   sanitizeHtml(html)
   ```

3. 配置允许所有属性

   ```
   sanitizeHtml(html,{allowedAttributes:false})
   或
   sanitizeHtml(html,{allowedAttributes:undefined})
   ```

### 3. 配置允许的协议

1. 覆盖默认允许的属性集合

   ```
   sanitizeHtml.defaults.allowedSchemes = ['http', 'https', 'sms'];
   sanitizeHtml(html)
   或
   sanitizeHtml(html,{allowedSchemes:['http', 'https', 'sms']})
   ```

2. 追加默认允许的属性

   ```
   sanitizeHtml.defaults.allowedSchemes.push('sms')
   sanitizeHtml(html)
   或
   sanitizeHtml.defaults.allowedSchemes.concat(['sms','data'])
   sanitizeHtml(html)
   ```

### 4. 为指定标签配置允许的协议

1. 覆盖已配置的特定标签允许的协议，注意：需要allowedTags中允许该标签

   ```
   sanitizeHtml(html,{allowedSchemesByTag:{a:['sms','data']}})
   ```

2. 为特定标签设置允许的协议，注意：需要allowedTags中允许该标签

   ```
   sanitizeHtml.defaults.allowedSchemesByTag['a'] = ['sms', 'data'];
   sanitizeHtml(html)
   ```

### 5.配置允许使用协议链接的属性

1. 覆盖默认允许使用协议链接的属性集合，注意：需要标签允许设置的属性

   ```
   sanitizeHtml.defaults.allowedSchemesAppliedToAttributes = ['href','src'];
   sanitizeHtml(html)
   或
   sanitizeHtml(html,{allowedSchemesAppliedToAttributes:['href','src']})
   ```

2. 追加默认允许使用协议链接的属性，注意：需要标签允许设置的属性

   ```
   sanitizeHtml.defaults.allowedSchemesAppliedToAttributes.push('src')
   sanitizeHtml(html)
   或
   sanitizeHtml.defaults.allowedSchemesAppliedToAttributes.concat(['src','href'])
   sanitizeHtml(html)
   ```

### 6.配置自关闭的标签

1. 覆盖默认自关闭标签集合

   ```
   sanitizeHtml.defaults.selfClosing =['img','br']
   sanitizeHtml(html) 
   或
   sanitizeHtml(html,{selfClosing:['img','br']})
   ```

2. 追加自关闭的标签

   ```
   sanitizeHtml.defaults.selfClosing.push('sms')
   sanitizeHtml(html) 
   或
   sanitizeHtml.defaults.selfClosing.concat(['sms','data'])
   sanitizeHtml(html) 
   ```

### 7.配置不允许标签的处理模式

默认discard：删除不允许的标签，escape：转义不允许的标签（子标签是被允许的时候，不进行转义，只转义不允许的标签），recursiveEscape 转义不允许的标签及其所有子标签，不管子标签是否被允许

```
sanitizeHtml(html,{disallowedTagsMode:'discard'})
或
sanitizeHtml(html,{disallowedTagsMode:'escape'})
或
sanitizeHtml(html,{disallowedTagsMode:'recursiveEscape'})
```

### 8.配置是否允许协议链接使用相对路径

默认为true，允许协议使用相对路径

```
sanitizeHtml(html,{allowProtocolRelative:true})
或
sanitizeHtml(html,{allowProtocolRelative:false})
```

### 9.配置是否强制限制HTML边界

默认false,不强制限制HTML边界，设置为true时，强制限制HTML边界，丢弃HTML标签外的内容

```
sanitizeHtml(html,{enforceHtmlBoundary:false})
或
sanitizeHtml(html,{enforceHtmlBoundary:true})
```

### 10.配置标签允许的样式

```
sanitizeHtml(html,{
	allowedStyles:{
		'*':color:[/yellow/],
		'text-align': [/left/, /right/, /center/, /justify/, /initial/],
        'font-size': [/36px/]
	}})
```

### 11.配置标签允许的class

```
sanitizeHtml(html,{allowedClasses:{'a':['class1','class2']}})
```

### 12.配置iframe标签src属性中链接内允许的主机地址

```
sanitizeHtml(html,{
	allowedTags:['iframe'],
	allowedAttributes:{
		iframe:['src','href']
		},
	allowedIframeHostnames:['www.youtube.com', 'player.vimeo.com']
})
```

### 13.配置iframe标签src属性中链接内允许的域名

```
sanitizeHtml(html,{
	allowedTags:['iframe'],
	allowedAttributes:{
		iframe:['src','href']
		},
	allowedIframeDomains:['zoom.us']
})
```

### 14.配置iframe标签src属性中链接是否允许相对路径

```
sanitizeHtml(html,{
	allowedTags:['iframe'],
	allowedAttributes:{
		iframe:['src','href']
		},
	allowIframeRelativeUrls:false
})
```

### 15.配置script标签中src属性中链接内允许的主机地址

```
sanitizeHtml(html,{
	allowedTags:['script'],
	allowedAttributes:{
		script:['src','href']
		},
	allowedScriptHostnames:['www.youtube.com', 'player.vimeo.com']
})
```

### 16.配置script标签src属性中链接内允许的域名

```
sanitizeHtml(html,{
	allowedTags:['script'],
	allowedAttributes:{
		script:['src','href']
		},
	allowedScriptDomains:['www.youtube.com', 'player.vimeo.com']
})
```

### 17.配置文本过滤器

```
sanitizeHtml(html,{
	textFilter: function (text, tagName) {
         return text.replace(/\s/g, '_');
    }})
```

### 18.设置标签过滤器

```
sanitizeHtml(html, {
            exclusiveFilter: function (frame) {
              return frame.tag === 'a' && !frame.text.trim();
            }
    })
```

### 19.设置不允许标签不保留文本

```
sanitizeHtml(html,{nonTextTags:['tagName']})
```

### 20.配置转换标签

1. 无属性标签转换

   ```
   sanitizeHtml(html,{transformTags:{ol:'ul'}})
   ```

2. 带属性标签转换

   ```
   sanitizeHtml(html,{
   	transformTags:{
   		ol:sanitizeHtml.simpleTransform('ul',		
   			{
   				class:'foo',
   				name:'newAttrName'
   			}),
   			allowedAttributes:{
   				ul:['class','name']
   			}
   		}})
   ```



### 21.配置HTML解析规则

```
sanitizeHtml(html,{parser:{recognizeCDATA: true}})
```



## 接口说明

```
function sanitize(dirty: string, options?: sanitize.IOptions): string;

interface IOptions {
	// 设置允许的标签，false|undefined表示不验证
    allowedTags?: string[] | false | undefined; 
    // 设置允许的属性，false|undefined表示不验证
    allowedAttributes?: Record<string, AllowedAttribute[]> | false | undefined;
    // 设置允许的协议名称
    allowedSchemes?: string[];
    // 设置允许有链接的标签
    allowedSchemesByTag?: { [tagName: string]: string[] };
    // 设置允许有链接的属性
    allowedSchemesAppliedToAttributes?: string[];
    // 设置自关闭标签
    selfClosing?: string[];
    // 设置不允许标签处理模式：discard:丢弃，escape:转义不允许的标签，
    // recursiveEscape转义不允许标签及其子标签，不管子标签是否是被允许的
    disallowedTagsMode?: DisallowedTagsModes;
    // 链接地址是否允许相对路径
    allowProtocolRelative?: boolean;
    // 是否强制限制HTML边界
    enforceHtmlBoundary?: boolean;
    // 设置允许的样式
    allowedStyles?: { [tagName: string]: { [styleKey: string]: RegExp[] } };
    // 设置允许的class
    allowedClasses?: { [tagName: string]: Array<string | RegExp> };
    // 设置iframe标签的src属性中链接内允许的主机地址
    allowedIframeHostnames?: string[];
    // 设置iframe标签的src属性中链接内允许的域名
    allowedIframeDomains?: string[];
    // 设置iframe标签的src属性中链接是否允许相对地址
    allowIframeRelativeUrls?: boolean;
    // 设置script标签的src属性中链接内允许的主机地址
    allowedScriptHostnames?: string[];
    // 设置script标签的src属性中链接内允许的域名
    allowedScriptDomains?: string[];
    // 设置文本过滤器
    textFilter?: ((text: string, tagName: string) => string);
    // 设置标签过滤器
    exclusiveFilter?: ((frame: IFrame) => boolean);
    // 设置不允许标签不保留文本
    nonTextTags?: string[];
    // 设置转换标签
    transformTags?: { [tagName: string]: string | Transformer };
    // 设置HTML解析规则
    parser?: ParserOptions;
  }
  
  
  interface Attributes { [attr: string]: string; }

  interface Tag { tagName: string; attribs: Attributes; text?: string | undefined; }
  
  type Transformer = (tagName: string, attribs: Attributes) => Tag;

  type AllowedAttribute = string | { name: string; multiple?: boolean | undefined; values: string[] };

  type DisallowedTagsModes = 'discard' | 'escape' | 'recursiveEscape';
  
  function simpleTransform(tagName: string, attribs: Attributes, merge?: boolean): Transformer;
```

## 约束与限制
在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317),OpenHarmony SDK:API11 (4.1.0.36)。

## 目录

```
/SanitizeHtml       # 工程根目录
├── entry                  # 示例代码文件夹
├── library    # 三方库源码文件夹
│   └── src
│       ├── index.ets      # 对外暴露文件的存放目录
│       └──main
│          ├── js          # sanitize-html 
               ├── index.js          # 源代码      
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

本项目基于 [MIT](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/blob/master/sanitize-html/LICENSE) 协议，请自由地享受和参与开源。
