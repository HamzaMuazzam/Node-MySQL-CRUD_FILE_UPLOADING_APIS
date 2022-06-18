const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const multer = require('multer');

require("dotenv").config(); //TODO: ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const {InitFileUploader,FileUploadingApisTest} = require("./fileUploader/file_uploader")

const AppRoutes = require('./routes/allRoutes')
//TODO: Create application instance
// using const app = express();
const app = express();
app.use(morgan("dev"));

app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/uploads/images', express.static('uploads'));
app.use('/uploads/videos', express.static('uploads'));
app.use('/uploads/pdf_documents', express.static('uploads'));
app.use('/uploads/zip_files', express.static('uploads'));

class AppInstance {

    initApp() {

        //TODO: Middleware
//


//TODO: parse application/x-www-form-urlencoded
        app.use(express.urlencoded({extended: false}));
        app.use(express.json()); // parse json bodies in the request object

//TODO: Redirect requests to endpoint starting with /posts to postRoutes.js
//         app.use(allRouters);
        app.use(new AppRoutes().initAppRouts())


//TODO: Global Error Handler. IMPORTANT function params MUST start with err
        app.use((err, req, res, next) => {
            console.log(err.stack);
            console.log(err.name);
            console.log(err.code);

            res.status(500).json({
                message: "Something went rely wrong",
            });
        });


//TODO: Listen on pc port
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
        FileUploadingApisTest.initFileApis(app)

    }
}

new AppInstance().initApp();

