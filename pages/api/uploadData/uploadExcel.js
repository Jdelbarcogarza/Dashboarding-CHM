import nextConnect from 'next-connect';
import onError from '../../../common/errormiddleware'
import multer from 'multer';

const handler = nextConnect(onError);

let storage = multer.diskStorage({
  destination: function(req,file,cb) { cb(null, './public/Excel') },
  filename: function (req, file, cb) { cb(null, file.originalname) },
});

let upload = multer ( {
  storage: storage,
});

let uploadFile = upload.single("file");

handler.use(uploadFile);
handler.post((req,res) => {
  console.log('req', req.file);
  res.status(200).send("Uploades File");
})

export default handler;

// Disallow body parsing, consume as stream
export const config = {
  api: {
    bodyParser: false,
  },
};