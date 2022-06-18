const TutorialModelClass = require("../models/TutorialModel");

exports.getAllTut = async (req, res, next) => {
    try {
        const [tuts, _] = await TutorialModelClass.findAll();

        res.status(200).json({ count: tuts.length, tuts: tuts });
    } catch (error) {
        next(error);
    }
};

exports.createNewTut = async (req, res, next) => {
    try {
        let { title, body } = req.body;
        let post = new TutorialModelClass(title, body);

        post = await post.save();

        res.status(201).json({ message: "Tutorials created" });
    } catch (error) {
        next(error);
    }
};

exports.getTutById = async (req, res, next) => {
    try {
        let postId = req.params.id;

        let [post, _] = await TutorialModelClass.findById(postId);

        res.status(200).json({ post: post[0] });
    } catch (error) {
        next(error);
    }
};
