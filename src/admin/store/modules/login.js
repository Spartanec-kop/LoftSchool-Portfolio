import axios from "../../requests";

export default {
  state:{
    user:{}
  },
  mutations:{
    SET_USER:(state, data) => (state.user = data.user)
  },
  actions:{
    async setUser({commit}){
      try{
       const {data} = await axios.get("/user")
       commit('SET_USER', data)
      } catch(e){
       console.log(e)
       commit('SET_USER', {})
      }
     }
  },
  getters:{
    user(state){
      return state.user;
    }
  }
}