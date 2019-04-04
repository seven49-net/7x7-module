(function() {

  if (document.querySelector(".grid-7x7")) {
    var grid = document.querySelector(".grid-7x7 .grid");
    var count = document.querySelector(".grid-7x7-container .number");

    var counter = 0;
    var limit = 49;

    // build item
    function item(c) {
      var item = document.createElement("div");
      item.innerHTML = "<span class='counter'>" + c + "</span>";
      item.setAttribute("class", "grid-item");
      return item;
    }

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
  }

})();