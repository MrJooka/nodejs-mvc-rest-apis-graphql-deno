const http = require('http');

function rqListener(req, res) {
  console.log(req);
}

const server = http.createServer(rqListener);

server.listen(
  // 첫번째 인수는 port 번호이다
  3000
);

/* 이제 Terminal에서 node app.js 타이핑해서 파일을 실행하면 터미널의 명령입력창은 비활성화된다.
왜냐하면 app.js의 실행이 끝나지 않았기 때문이다 */
