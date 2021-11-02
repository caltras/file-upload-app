module.exports = class ConsoleLogger {

    save(message, type){
        if (type === "INFO") {
            console.log(message);
            return;
        }
        if (type === "DEBUG") {
            console.debug(message);
            return;
        }
        if (type === "WARN") {
            console.log(message);
            return;
        }
        if (type === "ERROR") {
            console.error(message);
            return;
        }

    }
}