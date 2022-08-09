<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-9 col-sm-12 mx-auto">
                <div class="card bg-white border-0 shadow-lg p-3 mt-5">
                    <h3 class="text-center fs-3 fw-bold my-2">
                        {{ title }}
                    </h3>

                    <div class="mb-3">
                        <label for="name" class="form-label">Enter Category Name <span class="text-danger">*</span></label>
                        <input type="text" id="name" v-model="name" placeholder="Category Name" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="parent_id" class="form-label">Select Parent Category</label>
                        <select name="parent_id" id="parent_id" v-model="parent_id" class="form-select">
                            <option value="">This is Parent</option>

                            <option :value="cat.id" :key="cat.id" v-for="cat in getCategories">
                                {{cat.name}}
                            </option>
                        </select>
                    </div>
                    <div v-if="id">
                        <button @click="handleUpdate" class="btn btn-dark">Update</button>
                    </div>
                    <div v-else>
                        <button @click="handleCreate" class="btn btn-dark">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { api } from '../api'

export default {
    name : "Manage",
    data(){
        return {
            title : 'Create Category',
            name : '',
            parent_id : null,
            id : '',
        }
    },
    created() {
        this.id = this.$route.params.id ?? null
        if(this.id) {
            
            this.fetchSingleCategory(this.id)

            this.title = 'Update Category'
            // this.name = this.getCategory.name
            // this.parent_id = this.getCategory.parent_id

        }
        else{
            this.title = 'Create Category'
        }
        
    },

    computed: mapGetters(['getCategories','getCategory']),
    methods : {
        ...mapActions(['fetchSingleCategory']),

        async handleCreate (){
            const res = await api.post('/categories',{
                name: this.name,
                parent_id: this.parent_id
            })

            if(res.status == 200 && res.data.message){
                this.$router.push('/category')
            }
        },
        async handleUpdate (){
            const res = await api.put(`/categories/${this.id}`,{
                name: this.name,
                parent_id: this.parent_id
            })

            if(res.status == 200 && res.data.message){
                this.$router.push('/category')
            }
        }
    }
}
</script>