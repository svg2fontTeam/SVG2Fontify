# SVG2Fontify

## 🚨 문제 정의
리액트에서 SVG를 가져오는 방법 중 많이 쓰이는 방법인 `SVG-in-JS` 방법은 사실 성능적으로 좋지 않습니다. 
svg는 자바스크립트가 아니라 이미지를 나타내는 html과 유사한 xml태그로, SVG 코드를 자바스크립트 번들 안에 넣게 된다면 파싱과 컴파일 과정을 거치게 되어 자바스크립트 엔진이 소스코드를 처리하는 시간을 더 오래 걸리게 되는데요, 이러한 문제를 해결하기 위해 `<img />`를 사용하거나, SVG에 `use`를 사용하는 방법을 쓰거나,`IconFont`로 변환하여 사용하는 방법들이 있습니다. 

이중 `IconFont`를 사용하는 방법을 택하였을 때 
1) Figma에서 디자이너가 작업한 SVG를 코드화하여 저장하고,
2) Iconfont로 변환해 주는 서비스를 이용하여 ,
3) 다시 작업 폴더에 저장하는 과정들은 꽤나 번거롭고 시간적인 비용이 드는 작업입니다.

저희는 이러한 문제를 해결하고자 Figma에서 선택한 SVG들을 바로 Iconfont로 변환하여 저장하여 사용할 수 있는 Figma 플러그인을 개발하여 생산성을 높이고자 했습니다. 

## 🧩 요구사항 명세
![image](https://hackmd.io/_uploads/rJOTrGEg0.png)
![image](https://hackmd.io/_uploads/rJpGifNgA.png)


## 🗓️ 일정
![image](https://hackmd.io/_uploads/SkqOx7EgA.png)
![image](https://hackmd.io/_uploads/BJQklmNxA.png)

## 📍 참고 자료
[Breaking Up with SVG-in-JS in 2023](https://kurtextrem.de/posts/svg-in-js)
[React 개발자를 위한 피그마 플러그인 개발(feat. 온보딩)](https://techblog.woowahan.com/8339/)
