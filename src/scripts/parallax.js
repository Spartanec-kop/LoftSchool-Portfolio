let parallax = (function(){
  let parallaxMountainNode = document.querySelector('.parallax');
  let parallaxBuddaNode = document.querySelector('.parallax-budda');

  return {
    nodeExists:parallaxMountainNode.childNodes,
    move: function(block, windowScroll, strafeAmount){
      let strafe = windowScroll / -strafeAmount + '%';
      let transformString = `translate3d(0, ${strafe}, 0)`

      let style = block.style;

      style.transform = transformString;
      style.webkitTransform = transformString;
    },
    init: function(wScroll){
      if (wScroll < window.innerHeight * 2) {
        let layers =parallaxMountainNode.childNodes ? [...parallaxMountainNode.childNodes].filter(i => i.classList && i.classList.contains('parallax__layer') ) :[]
        layers.forEach((element, i) => {
            this.move(element, wScroll, (i + 1) * 40);       
        });
      }
      let parallaxBuddaPositionStart = parallaxBuddaNode.parentNode.offsetTop + (parallaxBuddaNode.offsetHeight / 100 * 5);
      if (wScroll >= parallaxBuddaPositionStart ) {
        let layers =parallaxBuddaNode.childNodes ? [...parallaxBuddaNode.childNodes].filter(i => i.classList && i.classList.contains('parallax__layer') ) :[]
        layers.forEach((element, i) => {
            this.move(element, wScroll - parallaxBuddaPositionStart < 100 ? 0 : wScroll - parallaxBuddaPositionStart, (i + 1) * 40);                
        });
      }
    }
  }
}());

window.onscroll = function () {
  let wScroll = window.pageYOffset;
  
  if (window.innerWidth > 768 && parallax.nodeExists){
    parallax.init(wScroll)
  } 
}