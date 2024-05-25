
const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const fs = require('fs');
const https = require('https');

// HTTPS 서버 생성
const server = https.createServer({
  cert: fs.readFileSync('path/to/cert.pem'),
  key: fs.readFileSync('path/to/key.pem')
});

const app = express();

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// HTTP 서버와 WebSocket 서버를 동일한 포트에서 실행
server.on('request', app);

// WebSocket 서버 생성
const wss = new WebSocket.Server({ server });

// 메시지를 저장할 배열
const messages = [];

// 클라이언트 연결 시 처리
wss.on('connection', function connection(ws) {
    console.log('클라이언트가 연결되었습니다.');

    // 저장된 메시지 전송
    messages.forEach((message) => {
        ws.send(message);
    });

    // 클라이언트로부터 메시지 수신 시 처리
    ws.on('message', function incoming(message) {
        console.log('클라이언트로부터 메시지 수신:', message);

        // 메시지를 저장
        messages.push(message);

        // 연결된 모든 클라이언트에게 메시지 전송
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                try {
                    client.send(message);
                } catch (error) {
                    console.error('메시지 전송 실패:', error);
                }
            }
        });
    });
});

// HTTPS 서버 시작
server.listen(8080, () => {
  console.log('서버가 https://localhost:8080 에서 시작되었습니다.');
});
