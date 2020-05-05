export default class Video {
  constructor ({ aid, bvid, tid, tname, pic, title, duration, view, danmaku }) {
    this.aid = aid
    this.bvid = bvid
    this.tid = tid
    this.tname = tname
    this.pic = pic
    this.title = title
    this.duration = duration
    this.view = view
    this.danmaku = danmaku
  }
}

export function createVideo (videoData) {
  return new Video({
    aid: videoData.aid,
    bvid: videoData.bvid,
    tid: videoData.tid,
    tname: videoData.tname,
    pic: videoData.pic,
    title: videoData.title,
    duration: videoData.duration,
    view: videoData.stat.view,
    danmaku: videoData.stat.danmaku
  })
}
