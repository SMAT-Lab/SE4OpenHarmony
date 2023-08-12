from urllib.parse import urlencode
import requests
from lxml import etree
from urllib.request import urlopen
# 导入BeautifulSoup
from bs4 import BeautifulSoup as bf

ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240"

# hrefs=[]
# for i in range(1,16):
#     print(i)
#     url="https://github.com/search?q=OpenHarmony&type=repositories&p="+str(i)
#     html = urlopen(url)
#     obj = bf(html.read(),'html.parser')
#     title = obj.head.title
#     href = obj.find_all('a',class_="Link__StyledLink-sc-14289xe-0 fIqerb")
#     with open('href.txt','a+')as f:
#         f.write(str(i)+'\n')
#         for h in href:
#             f.write(str(h.get("href"))+'\n')

# with open('href.txt','w')as f:
#     for herf in hrefs:
#         f.write(herf+'\n')
with open("githubHref.txt")as f:
    hrefs=f.read().split('\n')

gits=[]
with open('githubGits.txt')as f:
    count=len(f.readlines())

for i,herf in enumerate(hrefs) :
    if i <count:
        continue
    try:
        url = "https://github.com/"+herf
        html = urlopen(url)
        obj = bf(html.read(),'html.parser')
        title = obj.head.title
        git = obj.find_all('input',class_="form-control input-monospace input-sm color-bg-subtle")
        with open('githubGits.txt','a+')as f:
            f.write(git[0].get("value")+'\n')
    except:
        with open('githubGits.txt','a+')as f:
            f.write('??????????????????????????????\n')
        print(i,herf)
    # with requests.request('GET',url,headers = {'User-agent':ua}) as res:
    #     content = res.text          #获取HTML的内容
    #     html = etree.HTML(content)  #分析HTML，返回DOM根节点
    #     git = html.xpath( "//input[@class='form-control input-monospace input-sm color-bg-subtle']/@value")  #使用xpath函数，返回文本列表
    #     gits.append(git[0])

# with open('gits.txt','w')as f:
#     for g in gits:
#         f.write(g+'\n')