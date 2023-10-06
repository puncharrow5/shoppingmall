<!-- PROJECT LOGO -->
<a name="readme-top"></a>
<br />
<div align="center">
  <h1 align="center">Shoppingmall Website Project</h1>

  <p align="center">
    <br />
    <a href="https://github.com/puncharrow5/shoppingmall"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## 프로젝트 소개

![coverimage](https://github.com/puncharrow5/shoppingmall/assets/45795161/5630abfa-0fa9-45e8-aa78-48e72aef748e)

개인적으로 좋아하는 전자악기회사인 Strymon사의 웹 쇼핑몰 사이트를 만들어보았습니다.

* Strymon사에서 제공하는 제품들을 구경할 수 있습니다.
* 제품들의 상세 정보를 확인해보세요!
* 맘에 드는 제품들을 장바구니에 추가하세요!

### 프로젝트 목적
* 이 프로젝트를 시작한 이유는 웹 개발에서 프론트엔드에서부터 백엔드까지 직접 구현하면서 웹의 전반적인 흐름을 파악하기 위해 시작하게 되었습니다.
* 또한, 프로젝트 시작 전까진 다른 사이트들에서 제공하는 오픈 API를 받아와 사용해본 경험밖에 없었기 때문에 직접 API를 제작하는 경험을 하고 싶었습니다.

<a href="https://geode-divan-811.notion.site/Strymon-Instrument-Company-0195cee5e91b441498afe417fe1d14bd">노션 바로가기</a>

<p align="right">(<a href="#readme-top">맨 위로</a>)</p>



## Built With
### Front-End
<div>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</div>

### Back-End
<div>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
</div>

### Environment
<div>
  <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
</div>

<p align="right">(<a href="#readme-top">맨 위로</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Node.js와 npm가 설치되어있어야 합니다.
1. Node.js를 설치합니다. https://nodejs.org/ko/download
2. npm을 설치합니다.
  ```sh
  npm install npm@latest -g
  ```

### Installation
1. MongoDB에서 API 키를 발급 받습니다. https://www.mongodb.com
2. 깃허브에서 리포지토리를 클론합니다.
   ```sh
   git clone https://github.com/puncharrow5/shoppingmall
   ```
3. frontend폴더와 backend폴더에 각각 npm을 설치합니다.
   ```sh
   npm install
   ```
4. MongoDB에서 발급받은 api키와 jwt의 secretkey를 backend 폴더에 .env파일을 추가하여 설정합니다.
   ```sh
   MONGO_CODE="enter your MongoDB key"
   JWT_SECRET="secretkey"
   ```
5. backend/src/index.js에서 설정한 port 번호를 frontend 폴더에 .env파일을 추가하여 설정합니다.
   ```sh
   VITE_SERVER_URL="http://localhost:portnumber"
   ```

### Run
1. backend 폴더에 터미널을 통해 서버를 실행시킵니다.
   ```sh
   npm run dev
   ```
2. frontend 폴더에 터미널을 통해 클라이언트를 실행시킵니다.
   ```sh
   npm run dev
   ```
3. frontend 폴더의 터미널에 표시된 주소를 브라우저에 입력해 웹사이트에 접속합니다.
   ```sh
   http://localhost:5173/
   ```

<p align="right">(<a href="#readme-top">맨 위로</a>)</p>



<!-- Screenshots -->
## Screenshots

|회원 가입|로그인|
|:---:|:---:|
|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/5e9f2ab2-444d-4831-8a6e-661bce351660" width="400px" height="220px">|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/1e274a3b-90d2-43d6-97d6-10fcf115ffd3" width="400px" height="220px">|
|메인 페이지|상품 검색|
|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/367ad46e-21f3-4c52-96e2-8d92e4f8a5b5" width="400px" height="220px">|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/e9410d0c-8c88-43fb-97ab-b93145f80857" width="400px" height="220px">|
|상품 업로드|상품 상세 페이지|
|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/3b23fcb1-3ac2-4e1a-995f-4bee7243fdd2" width="400px" height="220px">|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/845328ab-9837-4fb1-a952-cc5bcc820d5a" width="400px" height="220px">|
|장바구니 & 상품 결제|주 내역 확인|
|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/5952efd1-4ce6-4430-8769-13d683c6b1ef" width="400px" height="220px">|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/e0926ff1-0e18-4271-8f7c-bf0d3388348d">|

<p align="right">(<a href="#readme-top">맨 위로</a>)</p>



<!-- CONTACT -->
## Contact

E-mail : osh4761@hanmail.net

Notion : https://geode-divan-811.notion.site/a44da1efdf5b47ea8fe12a8f85b216ad

Project Link : https://github.com/puncharrow5/shoppingmall

<p align="right">(<a href="#readme-top">맨 위로</a>)</p>





