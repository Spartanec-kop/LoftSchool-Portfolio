<template lang="pug">
  .skillGroup
    .group-title
      .group-title-input(:class="editTitle ? 'input-edited' : '' ")
        input.skill-group-name-input(
          placeholder="Название новой группы"
          :value="skillGroup.name"
          :readOnly="editTitleComputed ? false : true"
          ref="skillGroupName"
          )
      .button-set
        .edit-buttons(
          v-if="editTitleComputed"
        )
          .apply(
            @click="editSkillGroupName"
          ) &#10004;
          .cancel(
            @click="cancelEdit"
          ) &#215;
        .edit(
            @click="editTitle = !editTitle"
            v-if="!editTitleComputed"
          )
            svg.skill-icon
              use(:xlink:href="this.$importSvg('pencil')")  
    hr.spliter
    .group-body
      skill(
        v-for="(item, i) in skillGroup.skills"
        :skill="item"
        :key="`${item.name}_${i}`"
        :iterator="i"
        @removeSkill="removeSkill"
        )
    .add-skill
      .new-skill
        input.skill-name-input(
          placeholder="Новый навык"
          ref="newSkillName"
          )
        
      .new-count
        input.skill-count-input(
            :value="100"
            ref="newSkillCount"
            )
        .percent %
      .plus-wrapper(
        @click="addSkill"
      )
        plus
</template>
<script>
import skill from './skill'
export default {
  components:{skill},
  name: 'skillsGroup',
  props:{
    skillGroup:Object
  },
  data() {
    return{
      editTitle: false,
    }
  },
  computed:{
    editTitleComputed(){
      return this.editTitle || this.skillGroup.name.length == 0
    }
  },
  methods:{
    editSkillGroupName(){
      this.skillGroup.name = this.$refs.skillGroupName.value;
      this.editTitle = false;
    },
    addSkill(){
      this.skillGroup.skills.push({
        title: this.$refs.newSkillName.value,
        count: this.$refs.newSkillCount.value,
      })
      this.$refs.newSkillName.value = "";
      this.$refs.newSkillCount.value = 100;
    },
    cancelEdit(){
      this.editTitle = false;
    },
    removeSkill(skill){
      this.skillGroup.skills.splice(this.skillGroup.skills.indexOf(skill), 1);
    }
  }
}
</script>
<style lang="postcss" scoped>
.skillGroup{
  position: relative;
  padding:20px;
  background-color: white;
}
.group-title{
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}

.group-title-input{
  
  width: 60%;  
}
  .input-edited{
    border-bottom: 1px solid;
}

.button-set{
  display: flex;
  align-items: center;
}
.skill-group-name-input{
  background-color: transparent;
  border-color: transparent;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.89;
}
.edit-buttons{
  display: flex;
  align-items: center;
}
.edit{
  padding-right: 22px;
  cursor: pointer;
}

.skill-icon{
  width: 15px;
  height: 15px;
  fill:#a0a5b1;
}

.spliter{
  opacity: 0.15;
}

.group-body{
  padding-bottom: 140px;
}

.apply{
  color: #00d70a;
  font-size: 20px;
  font-weight: 900;
  padding-right: 20px;
  line-height: 0.5;
  cursor: pointer;
}
.cancel{
  color: #bf2929;
  font-size: 30px;
  font-weight: 900;
  line-height: 0.5;
  padding-right: 10px;
  cursor: pointer;
}
.add-skill{
  position: absolute;
  right: 31px;
  bottom: 31px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* padding-top: 70px; */
}

.new-skill{
  display: flex;
  margin-right: 10px;
  width:45%;
  justify-content: flex-end;
  height: 100%;
  border-bottom: 1px solid;
}
.skill-name-input,
.skill-count-input{
  width:100%;
}

.new-count{
  display: flex;
  width: 55px;
  height: 100%;
  margin-right: 30px;
  border-bottom: 1px solid;
}
.skill-name-input,
.skill-count-input,
.percent{
  font-size: 16px;
  font-weight: 600;
  color: #a0a5b1;
  background-color: transparent;
  border-color: transparent;
  line-height: 2;
}

.plus-wrapper{
  width: 40px;
  height: 40px;
  font-size: 30px;
  font-weight: 600; 
}
</style>