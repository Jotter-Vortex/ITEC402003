# Monitoring Web
- ```npm start```
- OpenVas에서 점검한 내역을 웹에 표시. 사용자는 쉽게 진단 대상 웹서버의 취약점 진단이 가능함


![image](https://user-images.githubusercontent.com/33484628/168099693-b3d67ed2-4395-4caf-a1fe-5b9d6a47588e.png)
- 메인페이지(home) 모습
- 각 페이지 별 (로그인, 세부사항, 차트 등) 이동은 React-Router-Dom 사용 예정
- Dash Board를 메인으로 하여 항목별로 세부 사항을 확인할 수 있음


## react 에러 발생 시
- ```npm upgrade```
- ```npm i react react-dom```
- ```npm install -g react-scripts```


# 사용한 기술 stack
 - JSX 
 - JSX(JavaScript XML)는 JavaScript를 확장한 문법입니다. UI가 어떻게 생겨야 하는지 설명하기 위해 React와 함께 사용할 것을 권장합니다. JSX라고 하면 템플릿 언어가 떠오를 수도 있지만, JavaScript의 모든 기능이 포함되어 있습니다.
 - 브라우저에서 실행하기 전에 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환된다. 


# 메인화면
- JSX, SCSS 사용하여 각 컴포넌트, 페이지별 모듈화

## 내부 Structure
- Home.jsx
  - Sidebar.jsx
  - Navbar.jsx
  - Widget1.jsx / Widget2.jsx / Widget3.jsx
  - Chart1.jsx / Chart2.jsx
  - Reporting_table.jsx
- Details.jsx
  - Sidebar.jsx
  - Navbar.jsx
- Chart.jsx
  - Sidebar.jsx
  - Navbar.jsx


## 서버 자원 사용률 가져오기
 - Amazon EC2 Cloudwatch 이용 (Amzaon SDK 사용, https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html)
   - Amazon SDK 이용법부터 숙지 필요 (시간?)
 - 서버 리눅스에서 직접 bash 파일 이용하여 값 도출 후 전송
   - 에러 발생 가능성 높음
 - Resource monitoring NPM 
   - https://www.npmjs.com/package/simple-apm-agent
   - https://www.npmjs.com/package/cpu-stats (로컬 자원 API)
   - https://www.npmjs.com/package/uriel
 - 서버 자체에서 자원 사용량을 들고오는 방법이 복잡하여 분석 필요함 


# 프론트엔드 이슈사항

## 렌더링 시 콘솔 및 함수가 여러번 호출되는 경우
 - React의 strict mode 때문
 - https://ko.reactjs.org/docs/strict-mode.html
 - Strict 모드는 Fragment와 같이 동작하며 child까지 모두 엄격하게 검사하는 것. (개발모드에서만 작동하지만, 함수값 설정시 오류 발생 가능)
 ---
 - 해결방법
 - index.js 내부에 ```<React.StrictMode>``` 해제
 ![image](https://user-images.githubusercontent.com/33484628/169258132-bc27ca6c-5284-4279-b9a7-8d9ab5b03876.png)
 
 
 
 ## Details Page db값 에러 (진행중)
 - db 배열값 처리하는 과정에서 에러가 있으니 감안 부탁드립니다. (WIP)





