let parallax = (function(){
  let layers = document.querySelector('.parallax').childNodes;

  return {
    move: function(block, windowScroll, strafeAmount){
      let strafe = windowScroll / -strafeAmount + '%';
      let transformString = `translate3d(0, ${strafe}, 0)`

      let style = block.style;

      style.transform = transformString;
      style.webkitTransform = transformString;
    },
    init: function(wScroll){
      let j = 1;
      layers.forEach((element, i) => {
        if (element.classList && element.classList.contains('parallax__layer')){
          this.move(element, wScroll, j * 40);
          j++;
        }        
      });
    }
  }
}());

window.onscroll = function () {
  let wScroll = window.pageYOffset;

  parallax.init(wScroll)
}