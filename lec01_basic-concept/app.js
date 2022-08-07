const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    /* form 태그의 action에 "/messgae"를 입력했기 때문에 무언가를 입력하고 Send버튼을 누르면
       localhost:3000/message 페이지로 이동한다  */
    res.write(
      '<body><form action="/message" method="POST"><input type="text"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    /* res.end()를 return 안해도 실행은 되지만 return으로 익명함수 실행을 종료한다. 리턴문 아래 코드들은 실행 안되게 하기 위해서다 */
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Sever</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  /* end() 메서드 실행한 이후에는 res 부분의 내용을 수정할 수 없다 */
  res.end();
});

server.listen(3000);
