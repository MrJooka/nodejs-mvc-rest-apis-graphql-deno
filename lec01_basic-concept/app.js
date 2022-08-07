const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  /* setHeader를 설정하지 않으면 브라우저에서 response가 어떤 데이터 타입인지 알 수 없기 때문에 읽지 못한다 */
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Sever</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  /* end() 메서드 실행한 이후에는 res 부분의 내용을 수정할 수 없다 */
  res.end();
});

server.listen(3000);
