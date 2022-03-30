const multer = require('multer');
const fs = require('fs');

// 서버 시작 전 upload 폴더를 찾고 없으면 폴더 생성
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({ // 메모리 스토리지
        destination(req, file, done) {
          done(null, 'uploads/'); // 저장할 위치
        },
        filename(req, file, done) {
          const ext = path.extname(file.originalname);
          done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
  });
  app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('ok');
  });
  