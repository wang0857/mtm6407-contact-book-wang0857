<template>
    <div class="view-container">
        <h1>404 Not Found.</h1>
        <h2>The contact didn't exist or was deleted. If you are not directed to homepage in {{ count }} seconds, please click <router-link to="/" class="router-link auto-direct">here</router-link>.</h2>
  </div>
</template>

<script>
    export default {
        name: 'PathNotFound',
        data: function() {
            return {
                count: 3
            }
        },
        mounted() {
            this._timerId = setInterval(() => {
                this.count = this.count - 1
            }, 1000)
            this._secondTimder = setInterval(() => {
                this.$router.push('/')
            }, 3000)
        },
        unmounted() {
            clearInterval(this._timerId)
            clearInterval(this._secondTimder)
        }
    }
</script>