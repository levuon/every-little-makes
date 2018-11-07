var num = 1;
var list;
function show(arg) {
    console.log(arg);
}
show([123, 456]);
var CustomConsole = (function () {
    function CustomConsole() {
    }
    CustomConsole.prototype.log = function (arg) {
        console.log(arg);
    };
    return CustomConsole;
}());
var AlterLevel;
(function (AlterLevel) {
    AlterLevel[AlterLevel["info"] = 0] = "info";
    AlterLevel[AlterLevel["warning"] = 1] = "warning";
    AlterLevel[AlterLevel["error"] = 2] = "error";
})(AlterLevel || (AlterLevel = {}));
function getAlertSubscribers(level) {
    var emails = new Array();
    switch (level) {
        case AlterLevel.info:
            emails.push('liuhuan@133.cn');
            break;
        case AlterLevel.warning:
            emails.push('levuon@163.com');
            emails.push('levuonliu@gmail.com');
            break;
        case AlterLevel.error:
            emails.push('642752282@qq.com');
            break;
        default:
            throw new Error('Invalid level');
    }
    return emails;
}
console.log(getAlertSubscribers(AlterLevel.info));
