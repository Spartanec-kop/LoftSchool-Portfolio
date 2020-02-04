export default {
  install(Vue, options){
    Vue.prototype.$importImg = function(url){
      return require(`../../images/${url}`);
    }

    Vue.prototype.$importSvg = function(iconName){
      let icon = require(`../../images/icons/${iconName}.svg`);
    return icon.default.url;
    }
  }
}