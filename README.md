<!-- PROJECT LOGO -->
<a name="readme-top"></a>
<br />
<div align="center">
  <h1 align="center">Strymon Instrument Project</h1>

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

<p align="right">(<a href="#readme-top">맨 위로</a>)</p>


<!-- Stacks -->
## 기술 스택
### Front-End
<div>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/redux-7649bd?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/reduxtoolkit-7649bd?style=for-the-badge&logo=redux&logoColor=white">
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

|기술 스택|선택 이유|
|:-----:|---|
|JavaScript|프로젝트 시작 당시엔 백엔드에 대한 이해와 TypeScript에 대한 숙련도가 높지 않아 익숙한 언어인 JavaScript로 개발을 시작하게 되었습니다.|
|React|React를 선택한 주된 이유는 저에게 가장 익숙한 라이브러리이기 때문입니다. 그리고 컴포넌트 기반으로 개발하기 때문에 코드를 재사용하고 유지보수하기 쉽습니다.<br/> 또한, 많은 기업들에서 프로덕션 전반에 걸쳐 사용하기 때문에 레퍼런스가 풍부합니다. 그리고 이로 인해 커뮤니티가 활발해 개발시 트러블이 발생할 경우 도움을 받기 쉽습니다.|
|Redux|유저 정보와 상품 정보 등 전역 상태 관리를 위해 사용했습니다.|
|Redux Toolkit|Redux 사용 시 발생하는 복잡성을 줄이고 효율적으로 사용할 수 있게 해줍니다. 이로 인해 개발을 간소화하고 효율적으로 만들어줍니다.|
|Axios|Promise 기반의 HTTP cilent 라이브러리로 개발하면서 api 호출을 위해 fetch보단 axios를 위주로 사용했기 때문에 더 익숙해 선택했습니다. 그리고 axios interceptor와 axios instance를 사용함으로 관리 및 유지보수가 용이하다는 장점도 갖고 있습니다.|
|TailwindCSS|인라인 형식으로 CSS를 작성하기 때문에 컨택스트 전환이 적고 클래스명을 따로 짓지 않아도 되기 때문에 시간을 많이 절약할 수 있어 선택했습니다.<br/> 또한, 컴포넌트 생성과 관리가 쉽고 유지보수하기 편하며 스타일링 할 때 일관성있는 디자인이 가능합니다.|
|Node.js|백엔드 개발을 위해 새로운 언어를 공부하지 않고 JavaScript를 활용하기 위해 선택했습니다.|
|Express.js|Node.js의 웹 프레임워크로 RESTFul API 서버를 구축하기 위해 선택했습니다.|
|MongoDB|데이터베이스를 다루는 경험이 처음이였기 때문에 NoSql DB로 CRUD 단계에서 가장 쉽게 사용할 수 있는 MongoDB를 선택했습니다.|
<br/>


<!-- MainFunctions -->
## 주요 기능

|회원 가입|로그인|
|:---:|:---:|
|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/5e9f2ab2-444d-4831-8a6e-661bce351660" width="400px" height="220px">|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/1e274a3b-90d2-43d6-97d6-10fcf115ffd3" width="400px" height="220px">|
|메인 페이지|상품 검색|
|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/367ad46e-21f3-4c52-96e2-8d92e4f8a5b5" width="400px" height="220px">|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/e9410d0c-8c88-43fb-97ab-b93145f80857" width="400px" height="220px">|
|상품 업로드|상품 상세 페이지|
|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/3b23fcb1-3ac2-4e1a-995f-4bee7243fdd2" width="400px" height="220px">|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/845328ab-9837-4fb1-a952-cc5bcc820d5a" width="400px" height="220px">|
|장바구니 & 상품 결제|주 내역 확인|
|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/5952efd1-4ce6-4430-8769-13d683c6b1ef" width="400px" height="220px">|<img src="https://github.com/puncharrow5/shoppingmall/assets/45795161/e0926ff1-0e18-4271-8f7c-bf0d3388348d" width="400px" height="220px">|

<p align="right">(<a href="#readme-top">맨 위로</a>)</p>



<!-- CONTACT -->
## Contact

E-mail : osh4761@hanmail.net

Notion : https://geode-divan-811.notion.site/a44da1efdf5b47ea8fe12a8f85b216ad

Project Link : https://github.com/puncharrow5/shoppingmall

<p align="right">(<a href="#readme-top">맨 위로</a>)</p>





