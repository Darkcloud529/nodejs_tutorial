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
    // storage: 업로드한 파일을 어디에 저장할 것인가 
    storage: multer.diskStorage({
        destination(req, file, done) {
          done(null, 'uploads/'); // 저장할 위치
        },
        filename(req, file, done) {
          const ext = path.extname(file.originalname); // 확장자
          done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
  });
// app.use(upload.single('image'));
// 위 방법도 가능하지만 이미지 업로드의 경우 특정 라우터에서만 해당되기 때문에 위 방법을 잘 사용하지 않는다. 

// upload.single, array, field, none() 경우는 form 내 형태에 따라 다르다. 
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('ok');
});
  