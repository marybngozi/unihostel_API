const fs = require("fs");
const logFile = new Date().toISOString().split("T")[0] + ".log";

module.exports = async(data) => {
    // Check if the file exists in the current directory, and if it is readable.
    const checkfile = fs.existsSync("./logs/" + logFile)

    const datetime = new Date(Date.now()).toLocaleString();
    let mainData = data+" at "+datetime
    if (!checkfile) {
        fs.writeFileSync("./logs/" + file, mainData)
    } else {
        fs.appendFileSync("./logs/" + file, mainData)
    }
}

