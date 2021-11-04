module.exports = {
    replaceSpecialCharacters: (name) => {
        return name.replace(/[^a-zA-Z0-9_\.]/g, "");
    }
}