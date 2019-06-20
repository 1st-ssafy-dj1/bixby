module.exports.function = function vliveVideoResponse (artistVideo) {
  
  const http = require('http')
  const console = require('console')
  let base_url = null
  let response = null
  let result = []
  let cnt = 0
  
  // base_url = "http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/schedules/v-live/channel/" + artistName + "/?format=json"
  // base_url = "http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/schedules/v-live/?format=json"
  base_url = "http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/schedules/v-live/video/" + artistVideo + "/" + cnt + "/?format=json"
  response = http.getUrl(base_url, {format:"json", cacheTime:1000, returnHeaders:true})
  const ArtistInfo = response.parsed
  
  // ArtistName ()== 가수명) 넣어주기
  ArtistInfo.forEach( each => {
    let tempResult = {}
    tempResult.startAt = each.start_at
    tempResult.channel = each.channel
    tempResult.title   = each.title
    tempResult.imgUrl  = each.img_url
    tempResult.videoUrl = each.video_url
    tempResult.artistVideo = artistVideo
    result.push(tempResult)
  })

  return result
}
