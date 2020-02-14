import axios from "../../requests";

export default {
  namespaced: true,
  state: {
    works: []
  },
  actions: {
    fetchWorks({ commit, rootState }) {
      axios
        .get(`/works/${rootState.login.user.id}`)
        .then(Response => {
          commit("FETCH_WORKS", Response.data);
        })
        .catch(error => {
          console.log(error.Response);
        });
    },
    addWork({ commit }, formData) {
      axios
        .post(`/works`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(Response => {
          commit("ADD_WORK", Response.data);
        })
        .catch(error => {
          console.log(error.Response);
        });
    },
    saveWork({ commit }, data) {
      axios
        .post(`/works/${data.workId}`, data.formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(Response => {
          commit("SAVE_WORK", Response.data.work);
        })
        .catch(error => {
          console.log(error.Response);
        });
    },
    removeWork({ commit }, work) {
      axios
        .delete(`/works/${work.id}`)
        .then(commit("REMOVE_WORK", work))
        .catch(error => {
          console.log(error.Response);
        });
    }
  },
  mutations: {
    FETCH_WORKS: (state, data) => (state.works = data),
    ADD_WORK: (state, work) => {
      state.works.push(work);
    },
    SAVE_WORK: (state, work) => {
      state.works = state.works.map(w => {
        return w.id === work.id ? work : w;
      });
    },
    REMOVE_WORK: (state, work) => {
      state.works.splice(state.works.indexOf(work), 1);
    }
  }
};
