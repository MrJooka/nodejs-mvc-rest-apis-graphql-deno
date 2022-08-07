const http = require("http");

function rqListener(req, res) {
  console.log(req);
  /*  이벤트 루프를 종료시키는 메서드이다 */
  process.exit();
}

const server = http.createServer(rqListener);

/* listen메서드를 실행함으로써 event loop가 계속 실행된다. */
server.listen(
  // 첫번째 인수는 port 번호이다
  3000
);
