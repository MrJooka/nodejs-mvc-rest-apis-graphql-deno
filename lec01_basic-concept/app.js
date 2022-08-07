const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      /* wirteFileSync는 Sync에서 알 수 있듯이 동기화 코드이다. 해당 코드 실행을 완료할 때까지 그 아래 코드들은 실행 되지 않는다.
        여기서는 텍스트 몇개이지만, 예를 들어 수백 Giga 용량의 파일을 생성한다고 한다면.. 서버는 아예 멈춰버릴 것이다.
        ==> 그래서 fs.writeFile메서드를 사용해야한다
       */
      // fs.writeFileSync("message.txt", message);

      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      /* 아래 코드는 write파일이 정상적으로 생성된 후에야 실행되어야 하기때문에 writeFile 완료 이벤트 리스너로 옮긴다.
      그래야 해당 리스너가 실행되어 오류가 나도 서버가 멈추는 일이 없기 때문이다.
      
      ** IMPORTANT NODE.JS SERVER 코드는 모드 이벤트 드라이븐 아키텍트를 바탕으로 짜야한다.

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end(); */
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Sever</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
