const http = require('http');

function rqListener(req, res) {
  console.log(req);
}

// app.js 를 실행해도 console에 아무것도 안찍히는 이유는 아래 서버가 한번 실행만 되고 메모리에 저장되지 않았기 때문이다.
// const server에 선언해줘야한다(할당해야한다).
http.createServer(rqListener);
