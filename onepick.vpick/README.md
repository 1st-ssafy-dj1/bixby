# README



# VPICK

## 1. 구현된 기능

1.  vlive에서 현재 방송중인 것을 알려줍니다. (생방송 알려줘)
 	2.  vlive에 있는 동영상을 검색해줍니다. ({bts} 비디오 보여줘)
 	3.  vlive 일정표에 있는 가수의 일정을 검색해줍니다. ({bts} 일정 알려줘)

​	

## 2. 작동방식

위에 제시된 3가지의 발화는 api 서버에 요청을 보내 데이터를 받아와 view에서 보여줍니다.

api 서버 url : http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/docs/

### 1) 생방송 알려줘

   * `code/vliveOnair.js` 를 통해 로직이 수행됩니다.

   * api 요청 주소는 GET http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/schedules/v-live/onlive/?format=json 입니다.

   * 응답 형식은 아래와 같습니다.

     ``` json
     [
       {
         "start_at": "8:55 PM",
         "title": "[DELAY LIVE] 2019 MONSTA X WORLD TOUR  IN LA",
         "channel": "MONSTA X",
         "img_url": "https://github.com/AshleyRyu/JS-intro/blob/master/image/KakaoTalk_Photo_2019-06-21-20-38-45.png?raw=true",
         "video_url": "https://www.vlive.tv/video/143355"
       },
       {
         "start_at": "9:55 PM",
         "title": "[ENOi] 빈나는 라디온 #11",
         "channel": "ENOi(이엔오아이)",
         "img_url": "https://github.com/AshleyRyu/JS-intro/blob/master/image/KakaoTalk_Photo_2019-06-21-20-38-45.png?raw=true",
         "video_url": "https://www.vlive.tv/video/144213"
       },
     ...
     ]
     ```

     * 이 중 img_url은 크롤링을 해올 수 없어서 자체 제작한 이미지로 대체하였습니다. (위의 값은 변경 이전의 대체 이미지였습니다.) 
     * 해당 이미지 파일들은 `assets/images`에 있는 `onair1.png`, `onair2.png`, `onair3.png` 입니다.

   * `resources/base/views/OnairVideos.view.bxb`에서 해당 결과의 갯수가 하나일 때와 여러개일 때를 구분하여 레이아웃을 다르게 보여줍니다. 

     * `resources/base/layouts/details/onair_datails.layout.bxb` 파일은 리스트 중 하나를 클릭하거나, 결과가 하나일 때 보여집니다.  
     * `resources/base/layouts/details/vliveOnairGo.layout.bxb` 에서 `code/openOnair.js`를 호출합니다.

   * openOnair.js

     * 선택한 생방송 영상의 url을 리턴합니다.
     * `resources/base/views/OpenBrowser_Result.view` 에서 해당 url로 V LIVE 앱을 실행시키거나 웹페이지를 띄웁니다.

### 2) {bts} 비디오 보여줘

* `code/vliveVideoResponse.js` 에서 로직이 수행됩니다.

* api 요청 주소는 GET http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/schedules/v-live/video/bts/0/?format=json 입니다.

  * 마지막에 bts 와 숫자 0 은 bts 키워드의 동영상들 중 20개를 뜻합니다. 숫자 1을 넣으면 21~ 40 번째 동영상 정보를 가져옵니다. 응답 형식은 아래와 같습니다.

  ``` json
  [
      ...
      {
      "channel": "BTS",
      "title": "BTS Live : 전 눈물이 없는 사람입니다 😭",
      "img_url": "https://v-phinf.pstatic.net/20190603_170/1559518401889jANfV_PNG/upload_Screenshot_2019-06-03-08-32-277E2.png?type=f228_128",
      "video_url": "https://www.vlive.tv/video/132457"
    },
    {
      "channel": "BTS",
      "title": "BTS Live : 에~오~!",
      "img_url": "https://v-phinf.pstatic.net/20190602_41/1559430049932M81Ra_PNG/upload_Screenshot_2019-06-02-07-57-507E2.png?type=f228_128",
      "video_url": "https://www.vlive.tv/video/132393"
    }
  ]
  ```

* `resources/base/views/VideoResultsView.view.bxb` 에서 해당 발화의 뷰를 처리합니다. 위와 마찬가지로 결과값이 1보다 크면 리스트로, 하나일 땐 바로 디테일 레이아웃으로 보여줍니다.

  * `resources/base/layouts/details/video_details.layout.bxb` 에서 `videoGo.layout.bxb`를 출력합니다.
  * `resources/base/layouts/details/videoGo.layout.bxb` 에서 버튼 클릭시 `code/openApp.js`를 호출합니다.

* openApp.js
  * 선택한 video 의 url를 반환합니다.
  * `resources/base/views/OpenBrowser_Result.view` 에서 해당 url로 V LIVE 앱을 실행시키거나 웹페이지를 띄웁니다.



### 3) {bts} 일정 알려줘

* `code/vliveResponse.js`에서 로직이 수행됩니다.

* api 요청 주소는 GET http://django-env.ibkiuksqzh.us-west-2.elasticbeanstalk.com/api/v1/schedules/v-live/channel/bts/?format=json 입니다.

  * bts는 키워드입니다. 발화로 인식된 단어가 키워드로서 요청됩니다. 응답 형식은 아래와 같습니다.

  ``` json
  [
    {
      "start_at": "2019-08-12T15:00:00",
      "channel": "BTS",
      "title": "[Main Cam] BTS 5TH MUSTER 'MAGIC SHOP' in SEOUL",
      "img_url": "https://v-phinf.pstatic.net/20190809_31/15653319314171NE25_JPEG/upload_Untitled-1.jpg?type=f228_128"
    },
    {
      "start_at": "2019-08-12T15:00:00",
      "channel": "BTS",
      "title": "[Multi Cam] BTS 5TH MUSTER 'MAGIC SHOP' in SEOUL (EAST+WEST+SOUTH+NORTH CAM)",
      "img_url": "https://v-phinf.pstatic.net/20190809_6/1565330328462dnubn_JPEG/upload_BTS_MUSTER4EBB684ED95A02.jpg?type=f228_128"
    }
  ]
  ```

* `resources/base/views/ResultsView.view.bxb` 에서 해당 발화의 뷰를 처리합니다. 위와 마찬가지로 결과값이 1보다 크면 일정을 카드형태의 리스트로, 하나일 땐 바로 디테일 레이아웃으로 보여줍니다.

* 위의 두 발화와는 다르게 링크가 없습니다.





## 3. 인지하고 있는 문제점 및 개선해야 할 사항

* 동영상 검색시 최신 동영상 순으로 정렬하여 보여주지 못합니다.
* 검색 기능 최적화
* 지금은 동영상이 20개만 나옵니다. 연속 발화 등을 통해 처리할 수 있지 않을까 생각합니다.
* 동영상 검색 시, 이미지가 없는 항목에 대해 default 이미지(빅스비 로고)를 설정했지만 어울리지 않아 바꿔야 합니다.