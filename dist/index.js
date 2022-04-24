"use strict";
var dragFileList = document.getElementById("drag-file-list");
var items = document.getElementsByClassName("drag-file-item");
var _loop_1 = function (i) {
    var item = items[i];
    item.addEventListener("dragstart", function (e) {
        item.style.opacity = "0.4";
    });
    item.addEventListener("dragend", function (e) {
        item.style.opacity = "1";
    });
};
for (var i = 0; i < items.length; i++) {
    _loop_1(i);
}
//# sourceMappingURL=index.js.map