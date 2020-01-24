let parallax = (function(){
  let parallaxNode = document.querySelector('.parallax');

  return {
    nodeExists:parallaxNode.childNodes,
    move: function(block, windowScroll, strafeAmount){
      let strafe = windowScroll / -strafeAmount + '%';
      let transformString = `translate3d(0, ${strafe}, 0)`

      let style = block.style;

      style.transform = transformString;
      style.webkitTransform = transformString;
    },
    init: function(wScroll){
      
      let layers =parallaxNode.childNodes ? [...parallaxNode.childNodes].filter(i => i.classList && i.classList.contains('parallax__layer') ) :[]
      layers.forEach((element, i) => {
          this.move(element, wScroll, (i + 1) * 40);       
      });
    }
  }
}());

window.onscroll = function () {
  let wScroll = window.pageYOffset;
  
  if (parallax.nodeExists){
    parallax.init(wScroll)
  } 
}