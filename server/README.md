# Monitoring Web
- Frontend Public IP: 43.200.5.235
- Backend Public IP: 43.200.5.235/5000
- 3000번 포트에서 http 엔드포인트로 get 요청을 보내면 5000번 포트에서 실행 중인 express가 적절한 응답을 보낸다.
- instance 연결 방법
    - $ ssh -i "frontendkey.pem" ubuntu@ec2-13-125-217-213.ap-northeast-2.compute.amazonaws.com 

 # 메인화면
 ![image](https://user-images.githubusercontent.com/33484628/166213871-7b71c32e-dbe9-4d38-9cb8-702a94d41621.png)
- JSX, SCSS 사용하여 각 컴포넌트, 페이지별 모듈화

</br>

# Server 라이브러리 정리
- nmp i mongoose --save
- nmp i axios --save
- nmp i express --save
- nmp i cors --save
- npm i csvtojson --save
- npm i nodemon --save


## react 에러 발생 시
- npm upgrade
- npm i react react-dom
- npm install -g react-scripts

![image](https://user-images.githubusercontent.com/33484628/166095371-fb82ed90-391b-45e4-a2b3-cd74c709dcb5.png)
- 메인페이지(home) 모습
- 각 페이지 별 (로그인, 세부사항, 차트 등) 이동은 React-Router-Dom 사용 예정
- 메인 페이지는 카드 형태

</br>

# MongoDB 연결하기

### mongoose 라이브러리로 MongoDB에 value 넣어주기

![1111](https://user-images.githubusercontent.com/33975284/168006534-430c8d8e-3e43-4740-acbb-763b6e683593.PNG)
- mongodb atlas에서 연결 URL를 사용하여 mongoose에서 DB에 연결되었는지 확인하기.

</br>

![23132](https://user-images.githubusercontent.com/33975284/168721689-9f4b6d21-3520-4b0a-b8be-6747670f8233.PNG)

</br>

- ID, PW를 통해서 유저마다 다른 api 통신을 통해 유저가 가지고 있는 고유의 데이터를 볼 수 있음 

</br>

![zxxczxc](https://user-images.githubusercontent.com/33975284/168721739-58460c69-d798-46d6-ae47-d03b11fd4a79.PNG)

- mongoDB connection open 하는 방법


- axios를 통해 db의 data를 받아와서 array 배열로 수신
- context provider 내의 변수들을 꺼내와서 사용

</br>

![2222222](https://user-images.githubusercontent.com/33975284/168485254-a877bea2-37a2-413f-90a0-f6faf025cf49.PNG)
- 공백 문자 처리 문제

</br>

![dsfz](https://user-images.githubusercontent.com/33975284/168485353-e6f86e91-1198-4fc5-9dee-4009ae20f8e9.PNG)
- usecontext로 contextProvider내의 변수 사용
- import dbContext from "../../db/dbContext";
- import React, { useState, useContext } from 'react';

# MongoDB 저장 방식

</br>

![db](https://user-images.githubusercontent.com/33975284/169108733-21b728bf-0264-4475-8b1a-ea399c7d3712.PNG)
- MyFirstDatabase 라는 데이터베이스 이름 내에 가져올 파일들의 날짜를 collection 이름으로 저장하여 사용

## dbProvider 사용 시 주의점
- axios를 통한 정보를 받는 것이 느려 가끔 Content가 undefined로 처리되는 에러가 생김

</br>

 ![2222](https://user-images.githubusercontent.com/33975284/169108961-e789f687-b42f-4fa0-97d0-64498258e918.PNG)

</br>

- 이미지와 같이 content가 비어있는지 확인한 후 사용하면 axios에서 받은 데이터를 통해 사용


# 사용한 기술 stack
 - JSX 
 - JSX(JavaScript XML)는 JavaScript를 확장한 문법입니다. UI가 어떻게 생겨야 하는지 설명하기 위해 React와 함께 사용할 것을 권장합니다. JSX라고 하면 템플릿 언어가 떠오를 수도 있지만, JavaScript의 모든 기능이 포함되어 있습니다.
 - 브라우저에서 실행하기 전에 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환된다. 

 
 
 

