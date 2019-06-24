module.exports.function = function vliveResponse (artistName) {
  
  const http = require('http')
  const console = require('console')
  let base_url = null
  let response = null
  let result = []
  
  base_url = "http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/schedules/v-live/channel/" + artistName + "/?format=json"
  // base_url = "http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/schedules/v-live/?format=json"
  response = http.getUrl(base_url, {format:"json", cacheTime:1000, returnHeaders:true})
  const ArtistInfo = response.parsed
  
  // ArtistName ()== 가수명) 넣어주기
  ArtistInfo.forEach( each => {
    let tempResult = {}
    startAt = each.start_at
    startAt = startAt.slice(0, 4) + '년 ' + startAt.slice(5, 7) + '월 ' + startAt.slice(8, 10) + '일 ' + startAt.slice(11, 13) + '시 ' + startAt.slice(14, 16) + '분'
    tempResult.startAt = startAt
    // tempResult.startAt = 
    tempResult.channel = each.channel
    tempResult.title   = each.title
    tempResult.imgUrl  = each.img_url
    tempResult.artistName = artistName
    result.push(tempResult)
  })

  return result
}
