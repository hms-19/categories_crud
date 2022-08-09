<template>
    <Navbar />
    <router-view></router-view>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
import Navbar from './src/components/Navbar.vue'

export default {
    name : "App",
    components : {
        Navbar
    },
    computed : mapGetters(['getCategories']),
    methods : {
        ...mapActions(['fetchCategories'])
    },
    mounted(){
        this.fetchCategories()
    }
}
</script>