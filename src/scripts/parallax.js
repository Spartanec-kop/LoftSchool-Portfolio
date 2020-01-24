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
      
      let lAyersFitered = [...layers].filter(i => i.classList && i.classList.contains('parallax__layer') )
      lAyersFitered.forEach((element, i) => {
          this.move(element, wScroll, (i + 1) * 40);       
      });
    }
  }
}());

window.onscroll = function () {
  let wScroll = window.pageYOffset;

  parallax.init(wScroll)
}