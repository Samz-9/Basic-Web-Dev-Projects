import fsp from "fs/promises"
import fs from "fs"
import path from "path"
let oldpath = "c:\\Users\\HP\\Desktop\\vsc webd\\Exercises\\ex 16 web clutter"
let files = await fsp.readdir(oldpath)
for (const e of files) {
    let ext = e.split(".")[e.split(".").length - 1]
    let extdir = path.join(oldpath, ext)
    console.log(e)
    if (e.endsWith(".js") || e.endsWith(".json") || e.endsWith("modules")) {
        continue
    }
    else if (fs.existsSync(extdir)) {
        fsp.rename(path.join(oldpath, e), path.join(extdir, e))
    }
    else {
        fsp.mkdir(extdir)
        fsp.rename(path.join(oldpath, e), path.join(extdir, e))
    }

}