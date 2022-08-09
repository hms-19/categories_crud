<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 px-2">
        <a class="navbar-brand" href="#">Coding Test</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link class="nav-item nav-link active" to="/">Home</router-link>
                <router-link class="nav-item nav-link" to="/manage">Create</router-link>
            </div>
        </div>
    </nav>
</template>