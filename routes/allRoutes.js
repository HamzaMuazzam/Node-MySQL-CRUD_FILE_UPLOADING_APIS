const routers = require('express').Router();
const fs =require("fs")

class AppRoutes {


    initAppRouts() {
        this.#rootRoute();
        this.#userRouts();
        this.#postRouts();
        // this.#rootRoutePost();
        return routers;
    }

    #userRouts(){
        routers.use("/tutorials", require("./tutorialsRouts"));
    }

    #postRouts(){
        routers.use("/posts", require("./postRoutes"));
    }

    #rootRoute(){
        routers.get('/', (req, res) => {
            //TODO: to get all files  from form-data in postman
            // console.log(req.files)
            res.send({
                welcome: "WELCOME"
            })
        })
    }
    // #rootRoutePost(){
    //     routers.post('/', (req, res) => {
    //         //TODO: to get all files  from form-data in postman
    //         console.log(req.files.key.data)
    //         fs.writeFile('../uploads/image.png', req.files.key.data, err => {
    //             if (err) {
    //                 console.error(err);
    //             }
    //             // file written successfully
    //         });
    //
    //
    //         res.send({
    //             welcome: "WELCOME"
    //         })
    //     })
    // }

}

module.exports = AppRoutes;