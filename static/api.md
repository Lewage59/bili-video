> 此文档为非官方接口文档，无法保证接口有效性。
> 以下接口为本项目目前使用的接口（也可以直接看src/api/文件目录下的接口）

## 首页模块
推荐视频 https://www.bilibili.com/index/ding.json

## 搜索模块
默认搜索词 http://api.bilibili.cn/x/web-interface/search/default

搜索热词 https://s.search.bilibili.com/main/hotword

搜索提示词 http://api.bilibili.cn/suggest

参数 | 说明
---|---
term | 搜索词

搜索结果列表（综合排序） https://api.bilibili.com/x/web-interface/search/all/v2

参数 | 说明
---|---
keyword | 关键词
page | 页数
pagesize | 单页数量

搜索结果列表排序方式 https://api.bilibili.com/x/web-interface/search/type

参数 | 说明
---|---
keyword | 关键词
page | 页数
pagesize | 单页数量
order | 排序方式update，click，dm

## 视频详情模块
视频信息 https://api.bilibili.com/x/web-interface/view

参数 | 说明
---|---
bvid | 视频bv号

单个视频推荐信息 https://api.bilibili.com/x/web-interface/archive/related

参数 | 说明
---|---
bvid | 视频bv号

视频评论内容 https://api.bilibili.com/x/v2/reply/main

参数 | 说明
---|---
oid | 视频aid
type | 评论类型，值1

视频标签 https://api.bilibili.com/x/tag/archive/tags

参数 | 说明
---|---
aid | 视频aid

## 分区视频模块

分区视频信息 https://api.bilibili.com/x/web-interface/dynamic/region
> 此部分rid分区名称在项目api/config.js文件中已经对应相应rid分区名

参数 | 说明
---|---
rid | 分区号

## 视频排行榜模块

分区视频排行榜 https://api.bilibili.com/x/web-interface/ranking

参数 | 说明
---|---
rid | 分区号
day | 1：单日榜、3：三日榜、7：一周榜，默认为3

> 如需更多api可看此项目->>> [bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)