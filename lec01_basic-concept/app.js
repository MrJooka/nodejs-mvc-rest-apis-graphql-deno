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
      fs.writeFileSync("message.txt", message);
      /*  하지만 아래코드가 리스너에서 등록되어 버린다면 16번째줄의 if문에서의 return이 사라져 38번째 코드 가 실행되어버린다.
          리스너는 비동기로 실행되기 때문에 43번째에서 응답을 종료해버린 후
          다시 비동기인 req.on('end) 리스너가 실행되기 때문에 res.end()를 다시 실행시키면서 에러를 발생시킨다

          ==> req.on('end')구문 자체를 return 시켜서 if문 아래 코드가 실행되지 않게 한다
      */
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
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
