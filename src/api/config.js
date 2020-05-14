// 请求状态标识
export const ERR_OK = 0

// 轮播图图片资源
export const sliderImage = [
  'https://i0.hdslb.com/bfs/archive/0877cdd4b401b66d578841ad0cebbf1dec95fe07.jpg@480w_270h',
  'https://i0.hdslb.com/bfs/archive/1de7300e9793ee713c8e6515df9439378dd8c790.jpg@480w_270h',
  'https://i0.hdslb.com/bfs/archive/9e0ffb1650d9b68ae61bf02a18bf5892f9902890.jpg@480w_270h',
  'https://i0.hdslb.com/bfs/archive/68cb764e2a9060623f2678928588fd1d5b3aae75.png@480w_270h'
]

// 所有分区视频对应的tid或rid
export const regionTags = [
  {
    name: '首页',
    key: 0
  },
  {
    name: '动画',
    key: 1,
    blocks: [
      { name: '推荐', key: 1 },
      { name: 'MAD·AMV', key: 24 },
      { name: 'MMD·3D', key: 25 },
      { name: '短片·手书·配音', key: 47 },
      { name: '特摄', key: 86 },
      { name: '综合', key: 27 }
    ]
  },
  {
    name: '番剧',
    key: 13,
    blocks: [
      { name: '推荐', key: 13 },
      { name: '连载动画', key: 33 },
      { name: '完结动画', key: 32 },
      { name: '资讯', key: 51 },
      { name: '官方延伸', key: 152 }
    ]
  },
  {
    name: '国创',
    key: 167,
    blocks: [
      { name: '推荐', key: 167 },
      { name: '国产动画', key: 153 },
      { name: '国产原创相关', key: 168 },
      { name: '布袋戏', key: 169 },
      { name: '动态漫·广播剧', key: 195 },
      { name: '资讯', key: 170 }
    ]
  },
  {
    name: '音乐',
    key: 3,
    blocks: [
      { name: '推荐', key: 3 },
      { name: '原创音乐', key: 28 },
      { name: '翻唱', key: 31 },
      { name: 'VOCALOID·UTAU', key: 30 },
      { name: '电音', key: 194 },
      { name: '演奏', key: 59 },
      { name: 'MV', key: 193 },
      { name: '音乐现场', key: 29 },
      { name: '音乐综合', key: 130 }
    ]
  },
  {
    name: '舞蹈',
    key: 129,
    blocks: [
      { name: '推荐', key: 129 },
      { name: '宅舞', key: 20 },
      { name: '街舞', key: 198 },
      { name: '明星舞蹈', key: 199 },
      { name: '中国舞', key: 200 },
      { name: '舞蹈综合', key: 154 },
      { name: '舞蹈教程', key: 156 }
    ]
  },
  {
    name: '游戏',
    key: 4,
    blocks: [
      { name: '推荐', key: 4 },
      { name: '单机游戏', key: 17 },
      { name: '电子竞技', key: 171 },
      { name: '手机游戏', key: 172 },
      { name: '网络游戏', key: 65 },
      { name: '桌游棋牌', key: 173 },
      { name: 'GMV', key: 121 },
      { name: '音游', key: 136 },
      { name: 'Mugen', key: 19 }
    ]
  },
  {
    name: '科技',
    key: 36,
    blocks: [
      { name: '推荐', key: 36 },
      { name: '科学科普', key: 201 },
      { name: '社科人文', key: 124 },
      { name: '野生技术协会', key: 122 },
      { name: '演讲·公开课', key: 39 },
      { name: '星海', key: 96 },
      { name: '机械', key: 98 },
      { name: '汽车', key: 176 }
    ]
  },
  {
    name: '数码',
    key: 188,
    blocks: [
      { name: '推荐', key: 188 },
      { name: '手机平板', key: 95 },
      { name: '电脑装机', key: 189 },
      { name: '摄影摄像', key: 190 },
      { name: '影音智能', key: 191 }
    ]
  },
  {
    name: '生活',
    key: 160,
    blocks: [
      { name: '推荐', key: 160 },
      { name: '搞笑', key: 138 },
      { name: '日常', key: 21 },
      { name: '美食圈', key: 76 },
      { name: '动物圈', key: 75 },
      { name: '手工', key: 161 },
      { name: '绘画', key: 162 },
      { name: '运动', key: 163 },
      { name: '其他', key: 174 }
    ]
  },
  {
    name: '鬼畜',
    key: 119,
    blocks: [
      { name: '推荐', key: 119 },
      { name: '鬼畜调教', key: 22 },
      { name: '音MAD', key: 26 },
      { name: '人力VOCALOID', key: 126 },
      { name: '教程演示', key: 127 }
    ]
  },
  {
    name: '时尚',
    key: 155,
    blocks: [
      { name: '推荐', key: 155 },
      { name: '美妆', key: 157 },
      { name: '服饰', key: 158 },
      { name: '健身', key: 164 },
      { name: 'T台', key: 159 },
      { name: '风尚标', key: 192 }
    ]
  },
  {
    name: '娱乐',
    key: 5,
    blocks: [
      { name: '推荐', key: 5 },
      { name: '综艺', key: 71 },
      { name: '明星', key: 137 },
      { name: 'Korea相关', key: 131 }
    ]
  },
  {
    name: '影视',
    key: 181,
    blocks: [
      { name: '推荐', key: 181 },
      { name: '影视杂谈', key: 182 },
      { name: '影视剪辑', key: 183 },
      { name: '短片', key: 85 },
      { name: '预告·资讯', key: 184 }
    ]
  },
  {
    name: '广告',
    key: 165,
    blocks: [
      { name: '推荐', key: 165 }
    ]
  },
  {
    name: '纪录片',
    key: 177,
    blocks: [
      { name: '推荐', key: 177 },
      { name: '人文·历史', key: 37 },
      { name: '科学·探索·自然', key: 178 },
      { name: '军事', key: 179 },
      { name: '社会·美食·旅行', key: 180 }
    ]
  },
  {
    name: '电影',
    key: 23,
    blocks: [
      { name: '推荐', key: 23 },
      { name: '华语电影', key: 147 },
      { name: '欧美电影', key: 145 },
      { name: '日本电影', key: 146 },
      { name: '其他国家', key: 83 }
    ]
  },
  {
    name: '电视剧',
    key: 11,
    blocks: [
      { name: '推荐', key: 11 },
      { name: '国产剧', key: 185 },
      { name: '海外剧', key: 187 }
    ]
  },
  { name: '直播', key: -1 },
  { name: '相簿', key: -2 }
]
