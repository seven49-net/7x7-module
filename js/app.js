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

(function () {

  if (document.querySelector(".grid-7x7")) {
    var grid = document.querySelector(".grid-7x7 .grid");
    var count = document.querySelector(".grid-7x7-container .number");

    var customItems = document.querySelectorAll(".custom-items .custom-item");
    var customItemsCount = customItems.length;

    var counter = 0;
    var limit = 49;

    // build item
    var item = function (c) {
      var item = document.createElement("div");
      item.innerHTML = "<span class='counter'>" + c + "</span>";
      item.setAttribute("class", "grid-item grid-item-" + c);
      return item;
    };

    // self-invoking, recursive function
    (function appendItem() {
      if (counter++ == limit) return;

      setTimeout(function () {
        console.log(counter);
        grid.appendChild(item(counter));
        count.innerHTML = counter;
        // recursive
        appendItem();
      }, 50);
    })();

    var editContent = function (item) {
      var classlist = item.classList;
      if (classlist.contains("Link") || classlist.contains("Download")) {

        var a = item.querySelector("a");
        return a ? a.innerHTML = "<span class='title'>" + a.innerHTML + "</span>" : false;

      }
      if (classlist.contains("Text")) {

        return item.innerHTML = "<div class='center-text'>" + item.innerHTML + "</div>";

      }
      if (classlist.contains("Image")) {

        var href = item.querySelector("a") ? item.querySelector("a").getAttribute("href") : "";
        var title = item.querySelector("h3") ? item.querySelector("h3").innerHTML : null;
        var txt = item.querySelector(".ImageText") ? item.querySelector(".ImageText").innerHTML : null;

        var img = item.querySelector("img");
        var alt = img.getAttribute("alt");
        var imgTitle = document.createElement("span");
        imgTitle.setAttribute("class", "image-title");
        imgTitle.innerHTML = alt;

        var wrap = document.createElement("div");

        if (href) {
          wrap = document.createElement("a");
          wrap.setAttribute("href", href);
        }
        wrap.setAttribute("class", "wrapper");
        var image = document.createElement("div");
        image.setAttribute("class", "image");
        image.appendChild(img);
        wrap.appendChild(image);

        var text = document.createElement("div");
        text.setAttribute("class", "text");
        text.appendChild(imgTitle);
        if (title) {
          var t = document.createElement("span");
          t.setAttribute("class", "text-title");
          t.innerHTML = title;
          text.appendChild(t);
        }
        if (txt) {
          var tt = document.createElement("div");
          tt.setAttribute("class", "text-text");
          tt.innerHTML = txt;
          text.appendChild(tt);
        }
        wrap.appendChild(text);
        return item.innerHTML = wrap.outerHTML;
      }

    };

    if (customItems.length) {
      customItems.forEach(editContent);

      // for (var i = 0; i < customItemsCount; i++) {
      //   var a = customItems[i].querySelector("a");
      //   if (a) {
      //     a.innerHTML = "<span class='title'>" + a.innerHTML + "</span>";
      //   }
      // }
    }


  }

})();