const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

// 파일의 mimeType에 따른 확장자를 반환하는 함수
function getExtName(mimeType) {
  if (mimeType === "image/jpeg") {
    return "jpg";
  }

  if (mimeType === "image/png") {
    return "png";
  }

  return "";
}

let directory = path.join(process.env.INIT_CWD, 'public/user/image/');
let storage = multer.diskStorage({
  // [파일이 저장될 폴더 경로]
  destination: async (req, file, cb) => {

    // 폴더가 아직 없으면 폴더를 생성한다.
    await fsPromises.access(directory, fs.constants.F_OK).catch(async () => {
      try {
        await fsPromises.mkdir(directory, { recursive: true });
      } catch (err) {
        console.error(err);
      }
    });

    // 파일이 저장될 폴더 지정
    cb(null, directory);
  },

  // [저장될 파일 이름]
  filename: (req, file, cb) => {
    // 파일 형식에 따라서 확장자를 붙여준다.
    let mimeType = getExtName(file.mimetype);
    cb(null, req.user.username + "." + mimeType);
  }
});
const userImageUpload = multer({storage: storage});

module.exports.userImageUpload = userImageUpload;