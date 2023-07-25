<template>
    <div
        v-for="contact in searchedContacts"
        :key="contact.id"
        class="contact-item"
    >
        <img
            :src="`https://picsum.photos/id/${contact.id + 50}/80`"
            :alt="`${contact.firstName}`"
            class="contact-img"
        >
        <div class="contact-name">
            <router-link :to="'/contact/' + contact.id" class="router-link">
                <h5>{{ contact.lastName }}, {{ contact.firstName }}</h5>
            </router-link>
        </div>
        <div class="contact-kebab">
            <router-link :to="'/contact/' + contact.id + '/edit'" class="router-link">
                <i class="fa-solid fa-pen"></i>
            </router-link>
            <i
                class="fa-solid fa-trash router-link"
                @click="deleteContact(contact)"
            ></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ContactList',
        props: ['searchedContacts'],
        emits: ['deleteContact'],
        methods: {
            deleteContact(contact) {
                this.$emit('deleteContact', contact)
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/variables';

    .contact {
        &-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: $lg;
        }

        &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: $white;
        }

        &-img {
            border-radius: 100px;
        }

        &-name {
            display: flex;
            flex-direction: column;
            width: 187px;

            h5 {
                margin-bottom: 0px;
            }
        }

        &-kebab {
            display: flex;
            gap: $md;
            
            i {
                font-size: $lg;
                cursor: pointer;
            }
        }
    }

</style>