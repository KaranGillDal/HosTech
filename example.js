const crypto=require('crypto')
const multer=require('multer')
const GridFsStorage=require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const imageget=require('./imagehandle/imagesget')

let gfs
connection.once('open', () => {
    // Init stream
    gfs = Grid(connection.db, mongoose.mongo);  
    gfs.collection('uploads');
  });
  const storage = new GridFsStorage({
    url: `mongodb+srv://karangill:${process.env.MONGO_PASSWORD}@cluster0.npz4x.mongodb.net/${process.env.DATABASE}retryWrites=true&w=majority`,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
      });
    }
  });
const upload=multer({storage});


app.post('/upload', upload.single('file'),(req, res)=>{
    console.log(req.body);  
    res.json({file:req.file});
  });
  app.get('/pic', (req,res)=>{
          gfs.files.findOne({ filename: "make-your-profile-picture-more-interesting.jpg" }, (err, file) => {
            // Check if the input is a valid image or not
            if (!file || file.length === 0) {
              return res.status(404).json({
                err: 'No file exists'
              });
            }
            // If the file exists then check whether it is an image
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
              // Read output to browser
              const readstream = gfs.createReadStream(file.filename);
              readstream.pipe(res);
            } else {
              res.status(404).json({
                err: 'Not an image'
              });
            }
          });
  });
  