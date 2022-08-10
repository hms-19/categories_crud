import { api } from "../../api"

const state = {
    categories: [],
}

const getters = {
    getCategories : (state) => state.categories,
}

const mutations = {
    set : (state,categories) => state.categories = categories.data,
    add : (state,category) => {

        if(category.parent_id){
            const cat = state.categories.find(cat => cat.id == category.parent_id).sub_category
            cat.push(category)
        }
        else{
            state.categories.unshift(category)
            
        }
    },
    update : (state,category) => {

        if(category.parent_id && category.old_parent_id !== null){
            if(category.old_parent_id !== category.parent_id){
                const cat = state.categories.find(cat => cat.id == category.old_parent_id)

                const scat = cat.sub_category.find(cat => cat.parent_id == category.old_parent_id && cat.id == category.id)
                const oldscat = cat.sub_category.filter(cat => cat.parent_id == category.old_parent_id && cat.id !== category.id)
                        
                scat.name = category.name
                scat.parent_id = category.parent_id

                state.categories.find(cat => cat.id == category.parent_id).sub_category.push(scat)
                state.categories.find(cat => cat.id == category.old_parent_id).sub_category = oldscat
            }  
            else{
                const cat = state.categories.find(cat => cat.id == category.parent_id).sub_category

                const scat = cat.find(c => c.id == category.id)
                scat.name = category.name
            }                      
        }
        else if(category.parent_id == null && category.old_parent_id !== null){

            state.categories.unshift(category)
            const cat = state.categories.find(cat => cat.id == category.old_parent_id)
            const oldscat = cat.sub_category.filter(cat =>  cat.id !== category.id)
            state.categories.find(cat => cat.id == category.old_parent_id).sub_category = oldscat
            



        }
        else if(category.old_parent_id == null && category.parent_id !== null){
            state.categories.find(cat => cat.id == category.parent_id).sub_category.push(category)
            if(category.sub_category.length > 0){
                category.sub_category.forEach(scat => {
                    state.categories.find(cat => cat.id == category.parent_id).sub_category.push(scat)
                });
            }
            state.categories = state.categories.filter(cat => cat.id !== category.id)
        }
        else{
            let cat = state.categories.find(cat => cat.id == category.id)

            cat.name = category.name
            cat.parent_id = category.id

        }
    },
    delete : (state,category) => {
        if(category.parent_id){
            let cat = state.categories.find(cat => cat.id == category.old_parent_id)

            let scat = cat.sub_category.filter(cat => cat.id !== category.id)

            cat.sub_category = scat
            
        }
        else{
            const cat = state.categories.filter(cat => cat.id !== category.id)

            state.categories = cat
        }
    }
}

const actions = {
    async fetchCategories ({ commit }){
        const res = await api.get('/categories')

        commit('set',res.data)
    },

    async addNewCategory ({commit},newCategory) {
        const res = await api.post('/categories',newCategory)
        commit('add',res.data.data)
    },

    async updateCategory ({commit},{newCategory,id}) {

        
        const res = await api.put(`/categories/${id}`,newCategory)

        console.log(res)
        commit('update',res.data.data)

    },

    async deleteCategory ({commit},id) {

        const res = await api.delete(`/categories/${id}`)

        commit('delete',res.data.data)

    }
}

export default {
    state,
    getters,
    mutations,
    actions
}