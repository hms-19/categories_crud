import { api } from "../../api"

const state = {
    categories: [],
    category: {}
}

const getters = {
    getCategories : (state) => state.categories.data,
    getCategory : (state) => state.category.data

}

const mutations = {
    setCategories (state,categories) {
        state.categories = categories
    },
    getSingleCategory (state,category) {
        state.category = category
    }
}

const actions = {
    async fetchCategories ({ commit }){
        const res = await api.get('/categories')

        commit('setCategories',res.data)
    },

    async fetchSingleCategory ({ commit },id){

        const res = this.state.categories

        // console.log("CAT",res)

        // commit('getSingleCategory',res)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}