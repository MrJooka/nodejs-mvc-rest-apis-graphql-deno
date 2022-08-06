const http = require('http');

function rqListener(req, res) {
  console.log(req);
}

const server = http.createServer(rqListener);

// 서버가 구동되게 만들려면 listen 메서드를 사용해야한다
server.listen();
