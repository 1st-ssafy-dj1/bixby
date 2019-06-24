module.exports.function = function vliveOnAir () {
  
    // vlive에서 생방송 일정 가져오는 액션에 대한 JS
    const console  = require('console')
    let http       = require("http")
    let baseUrl    = 'http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/schedules/v-live/onlive/?format=json'
    let result     = []
    
    let response = http.getUrl(baseUrl, {format:"json", cacheTime:1000, returnHeaders:true})
    let resTemp  = response.parsed

    let onairs = ['/images/onair1.png',
                  '/images/onair2.png',
                  '/images/onair3.png'
    ]
    console.log(resTemp)
    
    resTemp.forEach( res => {
      let temResult = {}
      temResult.startAt  = res.start_at
      temResult.channel  = res.channel
      temResult.title    = res.title
      temResult.imgUrl   = onairs[Math.floor(Math.random()*onairs.length)]
      temResult.videoUrl = res.video_url
      result.push(temResult)
    })
    
    return result  
  }