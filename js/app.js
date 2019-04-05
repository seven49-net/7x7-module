// ie 11 polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
   console.info("forEach Polyfill für IE11");
   NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
         callback.call(thisArg, this[i], i, this);
      }
   };
}

(function() {

  if (document.querySelector(".grid-7x7")) {
    var grid = document.querySelector(".grid-7x7 .grid");
    var count = document.querySelector(".grid-7x7-container .number");

    var customItems = document.querySelectorAll(".custom-items .custom-item");
    var customItemsCount =  customItems.length;

    var counter = 0;
    var limit = 49;

    // build item
    var item = function(c) {
      var item = document.createElement("div");
      item.innerHTML = "<span class='counter'>" + c + "</span>";
      item.setAttribute("class", "grid-item");
      return item;
    };

    // self-invoking, recursive function
    (function appendItem() {
      if (counter++ == limit) return;

      setTimeout(function() {
        console.log(counter);
        grid.appendChild(item(counter));
        count.innerHTML = counter;
        // recursive
        appendItem();
      }, 100);
    })();

    var makeTitle = function(item) {
      var a = item.querySelector("a");
      return a ? a.innerHTML = "<span class='title'>" + a.innerHTML + "</span>" : '';
    };

    if (customItems.length) {
      customItems.forEach(makeTitle);

      // for (var i = 0; i < customItemsCount; i++) {
      //   var a = customItems[i].querySelector("a");
      //   if (a) {
      //     a.innerHTML = "<span class='title'>" + a.innerHTML + "</span>";
      //   }
      // }
    }


  }

})();