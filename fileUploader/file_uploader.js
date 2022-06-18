const multer = require('multer');

 class InitFileUploader {

    static  initFileUploader(){
        let feedFolder;

            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    console.log("destinication")
                    cb(null, `./uploads/${feedFolder}`);
                },
                filename: function(req, file, cb) {
                    console.log("filename")
                    cb(null, new Date().toISOString() + file.originalname);
                }
            });
            const fileFilter = (req, file, cb) => {
                console.log(file.mimetype)
                // reject a file
                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                    feedFolder="images/"
                    /// TODO true ka mtlb hai write krdo file
                    // TODO if you want to store a file to upload and save
                    //  then pass <true> as second parameter in callback like below
                    //  cb(null, true);
                    cb(null, true);
                } else if(file.mimetype === 'video/quicktime' /*|| file.mimetype === 'image/png'*/){
                    feedFolder="videos/"

                    cb(null, true);
                } else if(file.mimetype === 'application/zip' /*|| file.mimetype === 'image/png'*/){
                    feedFolder="zip_files/"
                    cb(null, true);
                }else if(file.mimetype === 'application/octet-stream' /*|| file.mimetype === 'image/png'*/){
                    feedFolder="zip_files/"

                    cb(null, true);
                } else if(file.mimetype === 'application/pdf' /*|| file.mimetype === 'image/png'*/){
                    feedFolder="pdf_documents/"

                    cb(null, true);
                } else if(file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' /*|| file.mimetype === 'image/png'*/){
                    feedFolder="pdf_documents/"

                    cb(null, true);
                }
                else{
                    /// TODO agr false pass kryn gyn cb ko to file write nhin hogi. cb(null, false);
                    console.log(file)
                    feedFolder="public/"
                    cb(null, true);
                }
                // TODO if you want to reject a file to upload and save
                //  then pass <false> as second parameter in callback like below
                //  cb(null, false);




            };
            return multer({
                storage: storage,
                limits: {
                    fileSize: 1024 * 1024 * 500
                },
                fileFilter: fileFilter
            });

    }

}



 class FileUploadingApisTest{
    static  initFileApis(app){

    app.post('/singleFile', InitFileUploader.initFileUploader().single('productImage'),
        (req, res) => {
            //TODO: to get all files  from form-data in postman

            console.log(req.file)
            res.send({
                welcome: "WELCOME"
            })
        })
    app.post('/multiFileArray', InitFileUploader.initFileUploader().array('photos', 3),
        (req, res) => {
            //TODO: to get all files  from form-data in postman
            console.log(req.files)
            res.send({
                welcome: "WELCOME"
            })
        })
    app.post('/multipleFiles', InitFileUploader.initFileUploader().any(),
        (req, res) => {
            //TODO: to get all files  from form-data in postman
            console.log(req.body.name)
            console.log(req.body.age)
            console.log(req.files)


            res.send({
                welcome: "WELCOME"
            })
        })


    const cpUpload = InitFileUploader.initFileUploader().fields(
        [
            {name: 'avatar', maxCount: 1},
            {name: 'gallery', maxCount: 8},
            {name: 'name'},
        ],

    )
    app.post('/cool-profile', (req, res, next) => {
        console.log("MIDDLE WARE");

        next()

    },(req, res, next) => {
        console.log("MIDDLE WARE2");

        next()

    },(req, res, next) => {
        console.log("MIDDLE WARE3");

        next()

    }, cpUpload, function (req, res, next) {
        res.send({
            welcome: "WELCOME",
            body:req.body,
            queryParams:req.query
        })
    })
}
 }
module.exports = {FileUploadingApisTest,InitFileUploader};
