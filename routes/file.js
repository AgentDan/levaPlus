const {Router} = require('express')
const router = Router()
const File = require("../models/File")
const User = require('../models/User')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storageConfig = multer.diskStorage({
    destination: async (req, file, callback) => {
        try {
            const userID = req.query.userID
            const user = await User.findById(userID)
            const userDir = path.join(__dirname, '../uploads/', user.username)

            if (!fs.existsSync(userDir)) {
                fs.mkdirSync(userDir, { recursive: true });
            }

            callback(null, userDir);

        }catch (err) {
            console.log("ERROR to destination multer:", err)
            callback(err, null)
        }

    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({storage: storageConfig});

router.post("/addfile", upload.fields([{name: "file"}, {name: "planFile", maxCount: 1}]), async (req, res) => {
    try {
        const fileName = req.files['file'] ? req.files['file'][0].originalname : null;
        const filePlane = req.files['planFile'] ? req.files['planFile'][0].originalname : null;
        const userId = req.body.userId

        if (!fileName) {
            return res.status(400).json({message: "Файл проекта обязателен"});
        }

        const existingFileName = await File.findOne({file: fileName, owner: userId})
        const existingFilePlan = await File.findOne({file: filePlane, owner: userId})

        if (existingFileName) {
            return res.status(404).json({message: 'Фаил с таким именем уже существует!'})
        }

        const newFile = new File({
            owner: userId,
            file: fileName,
            filePlan: filePlane
        })

        await newFile.save();
        res.json({message: 'File upload'})

    } catch (error) {
        res.status(500).json({message: "My Error"})
    }
})

router.get('/list', async (req, res) => {
    try {
        const newlist = await File.find().populate('owner', 'username')
        res.json(newlist)
    } catch (error) {
        console.log(error)
    }
})

router.get('/userfiles/:id', async (req, res)=>{
    try {
        const id = req.params.id
        const projects = await File.find({owner: id})
        res.status(200).json(projects)

    }catch (error){
        res.status(400).json({message: error})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const file = await File.findById(id).populate('owner', 'username');

        const filePath = path.join(__dirname, `../uploads/${file.owner.username}`, file.file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await File.deleteOne({_id: id})

        res.json({message: "File deleted"})
    } catch (error) {
        res.status(500).json({message: "My error"})
    }
})

router.post('/save', async (req, res) => {
    try {
        const { modelPathLeva, env } = req.body;
        console.log("env : ", env);
        const gltf = JSON.parse(fs.readFileSync(modelPathLeva, "utf-8"));
        gltf.scenes[0].extras.env = env;
        fs.writeFileSync(modelPathLeva, JSON.stringify(gltf, null, 2), "utf-8");
    } catch (error) {
        console.error("Ошибка при сохранении GLTF:", error);
        res.status(400).json({ message: error.message || error.toString() });
    }
});

module.exports = router