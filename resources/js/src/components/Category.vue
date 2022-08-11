<template>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-12 mx-auto" v-if="getCategories.length > 0">
            <div
                class=""
                v-for="element in getCategories"
                :key="element.id"
              >
                
              <div class="bg-gray-700 m-1 py-3 rounded-md d-flex justify-content-between align-items-center">
                <h4 class="fw-bold">{{ element.name }}</h4>
                <div class="d-flex gap-3">
                  <router-link class="bg-white border-0 outline-0" :to="'/manage/'+element.id">
                    <i class='bx bx-edit-alt fs-5'></i>
                  </router-link>
                  <a class="bg-white text-danger border-0 outline-0" @click="handleDelete(element.id)">
                    <i class='bx bx-trash-alt fs-5'></i>
                  </a>
                </div>
              </div>
              <draggable class="dragArea list-group w-full">
                  <div
                  class="list-group-item bg-gray-300 m-1 p-3 rounded-md d-flex justify-content-between align-items-center"
                  v-for="el in element.sub_category"
                  :key="el.name"
                  >
                  <p class="align-middle">
                    {{ el.name }}
                  </p>
                  <div class="d-flex gap-3">
                    <router-link class="bg-white border-0 outline-0" :to="'/manage/'+el.id">
                      <i class='bx bx-edit-alt fs-5'></i>
                    </router-link>
                    <a class="bg-white text-danger border-0 outline-0" @click="handleDelete(el.id)">
                      <i class='bx bx-trash-alt fs-5'></i>
                    </a>
                    <i class='bx bx-menu fs-5'></i>
                  </div>
                </div>
              </draggable>

              <hr>
            </div>
          </div>
          <div v-else>
              <h2 class="text-center mt-3">{{message}}</h2>
            </div>
        </div>
      </div>
</template>

<script>

import { defineComponent } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
    name : "Category",
    components: {
      draggable: VueDraggableNext,
    },
    data(){
      return{
        message : "There is no data"
      }
    },
    computed: mapGetters(['getCategories']),
    methods: {
        ...mapActions(['deleteCategory']),
        handleDelete(id) {
          if(confirm('Are you sure?')){
            this.deleteCategory(id)
          }
        }
    }

})
</script>