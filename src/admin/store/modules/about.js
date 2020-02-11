import axios from "../../requests";

export default {
  namespaced: true,
  state: {
    categories: []
  },
  actions: {
    fetchCategories({ commit }, userId) {
      axios
        .get("/categories/" + userId)
        .then(Response => {
          commit("SET_CATEGORIES", Response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addClearCategory({ commit }) {
      commit("ADD_CLEAR_CATEGORY");
    },
    addCategory({ commit }, title) {
      axios
        .post("/categories", title)
        .then(Response => {
          commit("REMOVE_CATEGORY", { id: "" });
          commit("ADD_CATEGORY", Response.data);
        })
        .catch(error => {
          console.log(error.Response);
        });
    },
    renameCategory({ commit }, data) {
      axios
        .post(`/categories/${data.category.id}`, { title: data.title })
        .then(Response => {
          commit("RENAME_CATEGORY", Response.data.category);
        })
        .catch(Response => {
          console.log(Response);
        });
    },
    removeCategory({ commit }, category) {
      axios
        .delete("/categories/" + category.id)
        .then(commit("REMOVE_CATEGORY", category))
        .catch(error => {
          console.log(error.Response);
        });
    },
    addSkillAction({ commit }, skill) {
      axios
        .post("/skills", skill)
        .then(Response => {
          commit("ADD_SKILL", Response.data);
        })
        .catch(error => {
          console.log(error.Response);
        });
    },
    removeSkill({ commit }, skill) {
      //commit("REMOVE_SKILL", skill)
      axios
        .delete(`/skills/${skill.id}`)
        .then(commit("REMOVE_SKILL", skill))
        .catch(error => {
          console.log(error.Response);
        });
    },
    editSkillAction({ commit }, skill) {
      axios
        .post(`/skills/${skill.id}`, skill)
        .then(Response => {
          //this.skill = Response.data.skill;
          commit("EDIT_SKILL", Response.data.skill);
        })
        .catch(error => {
          console.log(error.Response);
        });
    }
  },
  mutations: {
    SET_CATEGORIES: (state, data) => (state.categories = data),
    REMOVE_CATEGORY: (state, category) => {
      state.categories = state.categories.filter(c => c.id != category.id);
    },
    ADD_CATEGORY: (state, category) => {
      state.categories.unshift(category);
    },
    ADD_CLEAR_CATEGORY: state => {
      state.categories.unshift({ category: "", id: "" });
    },
    RENAME_CATEGORY: (state, category) => {
      let findCategory = state.categories.find(c => c.id == category.id);
      findCategory.category = category.category;
    },
    ADD_SKILL: (state, skill) => {
      let category = state.categories.find(c => c.id == skill.category);
      category.skills.push(skill);
    },
    REMOVE_SKILL: (state, skill) => {
      let category = state.categories.find(c => c.id == skill.category);
      category.skills = category.skills.filter(c => c.id != skill.id);
    },
    EDIT_SKILL: (state, skill) => {
      let category = state.categories.find(c => c.id == skill.category);

      category.skills = category.skills.map(c => {
        return c.id === skill.id ? skill : c;
      });
    }
  }
};
