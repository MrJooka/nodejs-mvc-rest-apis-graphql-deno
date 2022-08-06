const http = require('http');

function rqListener(req, res) {
  console.log(req);
}

// 서버에 요청이 들어올 때마다 createSever의 매개변수인 callback 함수가 실행된다
http.createServer(rqListener);
