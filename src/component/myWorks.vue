<template lang="pug"> 
  .slider
    .slider-main-window
      img.sl-img.main-img(:src="activeItem.imageUrl ? createImageUrl(activeItem.imageUrl) : ''")
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
    .number {{activeItem.id}}    
</template>
<script>

import sliderTape from "./sliderTape"
export default {
  components:{slidertape: sliderTape},
  name: "myWorks",
  data(){
    return{
      activeItem: {},
      lastPreview:[],
      windowWidth:0,
      works:[
        {
          id:1,
          name: 'works1',
          imageUrl: '1.jpg',
          imagePreview: '1.jpg'
        },
        {
          id:2,
          name: 'works2',
          imageUrl: '2.jpg',
          imagePreview: '2.jpg'
        },
        {
          id:3,
          name: 'works3',
          imageUrl: '3.jpg',
          imagePreview: '3.jpg'
        },
        {
          id:4,
          name: 'works4',
          imageUrl: '4.jpg',
          imagePreview: '4.jpg'
        },
        {
          id:5,
          name: 'works5',
          imageUrl: '5.jpg',
          imagePreview: '5.jpg'
        },
      ],
    }
  },
  computed:{
    
  },

  mounted(){
    this.activeItem = this.works[0];
  },

  created() {
    window.addEventListener('resize', this.updateWidth);
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