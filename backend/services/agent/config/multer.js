//multer frontend se pdf ya image lekar ayega aur temp folder ke andar rakh dega, fir agent ke andar se usko read karke process karega

import fs from "fs"
import path from "path"
import multer from "multer"

const uploadDir=path.resolve("./temp")

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true})
}

