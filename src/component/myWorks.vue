<template lang="pug"> 
.section.section4
  .container
    .section4-title#section4 Мои работы
    .section4-body
      .slider
        .slider-main-window
          img.sl-img.main-img(:src="activeItem ? 'https://webdev-api.loftschool.com/' + activeItem.photo : ''")
          slidertape(
            :works="showingPreview()" 
            :activeItem="activeItem"
            v-on:select-work="changeActiveItem"
            :v-if="showSlidertape"
            )
        .slider-buttons
          button.slider-button.slider-button__up(
            @click="changeUp"
            :disabled="upButtonDisabled()"
            :class="upButtonDisabled() ? 'slider-disable' : '' "
          )
            svg.slider-button-icon__up(
              :class="upButtonDisabled() ? 'slider-disable' : '' "
            )
              use(:xlink:href="createSvgUrl('arrow-down')")
          button.slider-button.slider-button__down(
            @click="changeDown"
            :disabled="downButtonDisabled()"
            :class="downButtonDisabled() ? 'slider-disable' : '' "
          )
            svg.slider-button-icon__down(
              :class="downButtonDisabled() ? 'slider-disable' : '' "
            )
              use(:xlink:href="createSvgUrl('arrow-down')")
        .number {{works.indexOf(activeItem) + 1}}    
      .description
          .description-tags
            ul.tags-items(
              v-if="activeItem"
            )
              li.tag(               
                v-for="item in activeItem.techs.split(',')"
              )
                .tag-text {{item}}
          .description-title 
            span {{activeItem.title}}
          .description-body
            span {{activeItem.description}}
          .description-link
            a.site(:href='activeItem.link' target="_blank")
              svg.site-link
                use(:xlink:href="createSvgUrl('link')")
              span.site-link-title Посмотреть cайт 
</template>
<script>

import sliderTape from "./sliderTape"
import axios from './../requests'
export default {
  components:{slidertape: sliderTape},
  name: "myWorks",
  data(){
    return{
      activeItem: {},
      lastPreview:[],
      windowWidth:0,
      works:[]
    }
  },
  async created() {
    window.addEventListener('resize', this.updateWidth);
    await axios.get('/works/248')
    .then(Response => {
      this.works = Response.data;
      this.activeItem = Response.data[0];
    })
    .catch(error => {
      console.log(error.Response);
    });
  },

  methods:{
    showingPreview(){ 
      let indexActiveItem = this.works.indexOf(this.activeItem);
      if(this.showSlidertape()) {
        if (this.threeMessage()) {
          if (this.lastPreview.length == 0){
            this.lastPreview = [this.works[indexActiveItem],
                                this.works[indexActiveItem + 1],
                                this.works[indexActiveItem + 2]
                                ]                    
            return this.lastPreview
          }
          else{
            return this.lastPreview
          }
        }
        else if (this.fourthMessage()) {
          if (this.lastPreview.length == 0){
            this.lastPreview = [this.works[indexActiveItem],
                                this.works[indexActiveItem + 1],
                                this.works[indexActiveItem + 2],
                                this.works[indexActiveItem + 3]
                                ]                   
            return this.lastPreview
          }
          else{
            return this.lastPreview
          }                                   
        }       
      }
    },

    updateWidth() {
      this.lastPreview = [];
      this.activeItem = this.works[0];
      this.showingPreview()
    },

    showSlidertape(){
      return window.innerWidth > 600 && this.works.indexOf(this.activeItem) + 1 ? true : false
    },

    threeMessage(){
      return window.innerWidth <= 1270 ? true : false
    },

    fourthMessage(){
      return window.innerWidth > 1270 ? true : false
    },

    createSvgUrl(iconName){
      let icon = require(`images/icons/${iconName}.svg`);
      return icon.default.url;
    },

    createImageUrl(pictureName){
      return require(`images/content/${pictureName}`);
    },

    changeActiveItem(item){
      this.activeItem = item
    },

    changeUp(){
      if (this.works.indexOf(this.activeItem)){
        if (this.lastPreview[0].id == this.activeItem.id){
          let newPreview =[]
          if (this.threeMessage()){
            newPreview = [this.works[this.works.indexOf(this.activeItem)-1],
                        this.works[this.works.indexOf(this.activeItem)],
                        this.works[this.works.indexOf(this.activeItem)+1]
                        ]
          }
          if (this.fourthMessage()){
            newPreview = [this.works[this.works.indexOf(this.activeItem)-1],
                        this.works[this.works.indexOf(this.activeItem)],
                        this.works[this.works.indexOf(this.activeItem)+1],
                        this.works[this.works.indexOf(this.activeItem)+2]
                        ]
          }         
          this.lastPreview = newPreview;                
        }
        this.activeItem =  this.works[this.works.indexOf(this.activeItem) - 1];
      }      
    },

    changeDown(){
      if (this.works.indexOf(this.activeItem) != this.works.length - 1){
        let newPreview =[]
        if (this.threeMessage()){
          if (this.lastPreview[2].id == this.activeItem.id){
            newPreview = [this.works[this.works.indexOf(this.activeItem)-1],
                          this.works[this.works.indexOf(this.activeItem)],
                          this.works[this.works.indexOf(this.activeItem) + 1]
                          ]
            this.lastPreview = newPreview;                
          }
        }

        if (this.fourthMessage()){
          if (this.lastPreview[3].id == this.activeItem.id){
            newPreview = [this.works[this.works.indexOf(this.activeItem)-2],
                          this.works[this.works.indexOf(this.activeItem)-1],
                          this.works[this.works.indexOf(this.activeItem)],
                          this.works[this.works.indexOf(this.activeItem) + 1]
                          ]
            this.lastPreview = newPreview;                
          }
        }
        
        this.activeItem =  this.works[this.works.indexOf(this.activeItem) + 1];
      }
    },

    upButtonDisabled(){
      return this.works.indexOf(this.activeItem) == 0
    },

    downButtonDisabled(){
      return this.works.indexOf(this.activeItem) == this.works.length - 1
    }
  }
}
</script>