import axios from "../../requests";

export default {
  namespaced: true,
  state: {
    reviews: []
  },
  actions: {
    fetchReviews({ commit }, userId) {
      axios
        .get(`/reviews/${userId}`)
        .then(Response => {
          commit("FETCH_REVIEWS", Response.data);
        })
        .catch(error => {
          console.log(error.Response);
        });
    },
    addReview({ commit }, formData) {
      axios
        .post(`/reviews`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(Response => {
          commit("ADD_REVIEW", Response.data);
        })
        .catch(error => {
          console.log(error.Response);
        });
    },
    saveReview({ commit }, data) {
      axios
        .post(`/reviews/${data.reviewId}`, data.formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(Response => {
          commit("SAVE_REVIEW", Response.data.review);
        })
        .catch(error => {
          console.log(error.Response);
        });
    },
    removeReview({ commit }, review) {
      axios
        .delete(`/reviews/${review.id}`)
        .then(commit("REMOVE_REVIEW", review))
        .catch(error => {
          console.log(error.Response);
        });
    }
  },
  mutations: {
    FETCH_REVIEWS: (state, data) => (state.reviews = data),
    ADD_REVIEW: (state, review) => {
      state.reviews.push(review);
    },
    SAVE_REVIEW: (state, review) => {
      state.reviews = state.reviews.map(w => {
        return w.id === review.id ? review : w;
      });
    },
    REMOVE_REVIEW: (state, review) => {
      state.reviews.splice(state.reviews.indexOf(review), 1);
    }
  }
};
