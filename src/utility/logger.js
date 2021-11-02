const configuration = require("../config");
const LogProvider = require("./"+configuration.log.provider.name);

const logProvider = new LogProvider();

module.exports = (clazz) => {
    
    const enumLevel = {
        "INFO": ["INFO"],
        "WARN": ["INFO", "WARN"],
        "DEBUG": ["INFO", "WARN", "DEBUG"],
        "ERROR": ["INFO", "WARN", "DEBUG", "ERROR"]
    }
    return {
        info: (message) => {
            if (enumLevel[configuration.log.level].indexOf("INFO") > -1){
                logProvider.save(`INFO ${clazz} [${new Date()}] => ${JSON.stringify(message)}`, "INFO");
            }
        },
        debug: (message) => {
            if (enumLevel[configuration.log.level].indexOf("DEBUG") > -1){
                logProvider.save(`DEBUG ${clazz} [${new Date()}] => ${JSON.stringify(message)}`, "DEBUG");
            }
        },
        warn: (message) =>{
            if (enumLevel[configuration.log.level].indexOf("WARN") > -1){
                logProvider.save(`WARN ${clazz} [${new Date()}] => ${JSON.stringify(message)}`, "WARN");
            }
        },
        error: (message) =>{
            if (enumLevel[configuration.log.level].indexOf("ERROR") > -1){
                logProvider.save(`ERROR ${clazz} [${new Date()}] => ${JSON.stringify(message)}`, "ERROR");
            }
        }
    }
}