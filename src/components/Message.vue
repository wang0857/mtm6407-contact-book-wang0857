<template>
    <div
        :class="`alert alert-${isError ? 'warning' : 'success'} alert-dismissible fade show`"
        role="alert"
    >
        <slot></slot>
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            @click="resetSubmitStatus"
        ></button>
    </div>
</template>

<script>
    export default {
        name: 'Message',
        props: ['isError'],
        emits: ['resetSubmitStatus'],
        methods: {
            resetSubmitStatus() {
                this.$emit('resetSubmitStatus', false)
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/variables';

    .alert {
        position: sticky;
        top: $sm;
    }
</style>