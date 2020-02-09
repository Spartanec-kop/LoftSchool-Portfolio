<template lang="pug">
  .admin-skill.tooltip
    .input-tooltip(:class="{'showed':showError}") {{'не все поля заполнены'}}
    .name(:class="edit ? 'input-edited' : '' ")
      input.skill-name-input(
          :value="skill.title"
          :readOnly="edit ? false : true"
          :ref="`skill-name__${iterator}`"
          )
    .count-button  
      .count(:class="edit ? 'input-edited' : '' ")
        input.skill-count-input(
            :value="skill.percent"
            :readOnly="edit ? false : true"
            :ref="`skill-count__${iterator}`"
            )
        .percent %
      .skill-buttons
        .edit-buttons(
          v-if="edit"
        )
          .apply(
            @click="editSkill"
          ) &#10004;
          .cancel(
              @click="cancelEdit"
            ) &#215;
        .default-buttons(
          v-if="!edit"
        )
          .edit(
            @click="edit = !edit"
          )
            svg.skill-icon
              use(:xlink:href="this.$importSvg('pencil')")
          .remove(
            @click="$emit('removeSkill', skill)"
          )
            svg.skill-icon
              use(:xlink:href="this.$importSvg('trash')")          
</template>
<script>
export default {
  name: 'skill',
  props:{
    defaultSkill: Object,
    iterator:Number
  },
  data(){
    return{
      skill:{},
      edit: false,
      showError:false
    }
  },
  methods:{
    editSkill(){
      if (this.$refs[`skill-name__${this.iterator}`].value != '' &&
          this.$refs[`skill-count__${this.iterator}`].value != ''){
        this.$axios.post(`/skills/${this.skill.id}`, {title: this.$refs[`skill-name__${this.iterator}`].value,
                                                    percent: this.$refs[`skill-count__${this.iterator}`].value,
                                                    category: this.skill.category
                                                    })
                                                    .then(Response => {
                                                      this.skill = Response.data.skill
                                                    })
                                                    .catch(error => {
                                                      console.log(error.Response);
                                                    });
                                                    this.edit = false;
                                                    this.showError = false;
      }
      else{
        this.showError = true;
      }                                                  
    },
    cancelEdit(){
      this.edit = false;
      this.showError = false;
    }
  },
  beforeMount(){
    this.skill = this.defaultSkill;
  }
}
</script>
<style lang="postcss" scoped>
.input-tooltip{
  bottom: -100%;
}
.admin-skill{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-right: 0px;
}

.default-buttons{
  display: flex;
}
.edit-buttons{
  display: flex;
  align-items: center;
}

.name{
  width: 60%;
  margin-right: 20px;
}

.skill-name-input{
  background-color: transparent;
  border-color: transparent;
  width:100%;
}

.count-button{
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.count{
  display: flex;
  align-items: center;
  width: 60px;
  padding-right: 10px;
}

.skill-count-input{
  width:100%;
  background-color: transparent;
  border-color: transparent;
}
.percent{
  font-size: 16px;   
}

.skill-name-input,
.skill-count-input,
.percent{
  font-size: 16px;
  line-height: 2;
  font-weight: 600;
  color: #a0a5b1;
}
.input-edited{
  border-bottom: 1px solid;
}
.skill-icon{
  width: 15px;
  height: 15px;
  fill:#a0a5b1;
}

.edit{
  padding-right: 22px;
  cursor: pointer;
}
.remove{
  padding-right: 10px;
  cursor: pointer;
}

.apply{
  color: #00d70a;
  font-size: 20px;
  font-weight: 900;
  padding-right: 20px;
  cursor: pointer;
}
.cancel{
  color: #bf2929;
  font-size: 30px;
  font-weight: 900;
  padding-right: 10px;
  line-height: 0.5;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .name{
    width: 50%;
  }

  .count-button{
    width: 50%;
  }
}

</style>