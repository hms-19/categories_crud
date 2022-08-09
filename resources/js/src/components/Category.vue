<template>
    <h1>Category</h1>
    <draggable class="dragArea list-group w-full">
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="element in getCategories"
        :key="element.name"
      >
        {{ element.name }}
      </div>
    </draggable>

</template>

<script>

import { defineComponent } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { mapGetters } from 'vuex'

export default defineComponent({
    name : "Category",
    components: {
      draggable: VueDraggableNext,
    },
    data(){
      return{
        enabled: true,
        dragging: false,
      }
    },
    computed: mapGetters(['getCategories']),
    methods: {
      
    }

})
</script>