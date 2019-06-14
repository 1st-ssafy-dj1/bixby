module.exports.function = function vliveResponse () {
  
  /*
  const http = require('http');
  const console = require('console');
  let result = {};
  let base_url = null;
  let response = null;
  
  base_url = "http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/schedules/v-live/3/?format=json";
  response = http.getUrl(base_url, {format:"json", cacheTime:1000, returnHeaders:true});
  
  console.log(response)

  const ArtistInfo = response.parsed
  */
  
  // 더미데이터 만들어서 테스트하기
  let result = [
    {
      "channel": "BTS",
      "title": "급하게 방송 켰어요 뿌잉!",
      "startAt": "17:00"
    },
    {
      "channel": "BTS",
      "title": "얼굴 보실래요?",
      "startAt": "19:00"
    },
    {
      "channel": "BTS",
      "title": "야간 치킨먹방 갑니다 ^^",
      "startAt": "23:00"
    }
  ]
  
  /*
  result.title = ArtistInfo.title;
  result.group = ArtistInfo.group;
  result.site_url = ArtistInfo.site_url;
  result.poster_url = ArtistInfo.poster_url;
  result.start_at = ArtistInfo.start_at;
  */
  
  return result
}
