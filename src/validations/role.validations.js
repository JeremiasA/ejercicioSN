const activeUser = require('../activeUser');

const isAdmin = () => {
    if (activeUser.user.role !== "super") {
        return "Permission denied: Super user privileges needed.";
};
}

const isReadOnly = () => {
    if (activeUser.user.role === "read-only") {
        return "Permission denied for 'read-only' users.";
};
}

module.exports = {isAdmin, isReadOnly}