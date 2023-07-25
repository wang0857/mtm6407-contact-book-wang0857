<template>
    <div class="view-container">
        <div class="title-container">
            <h1>
                {{ isEditing ? 'Editing Contact' : 'Contact Details' }}
            </h1>
            <router-link
                v-if="isEditing"
                :to="'/contact/' + foundContact.id"
                class="router-link"
            >
                <i class="fa-solid fa-chevron-left"></i>
                <span class="back">Back to Contact Details</span>
            </router-link>
            <router-link
                v-else
                to="/"
                class="router-link"
            >
                <i class="fa-solid fa-chevron-left"></i>
                <span class="back">Back to Contact Book</span>
            </router-link>
        </div>
        <div  v-if="!isEditing" class="contactDetails-container">
            <img
                :src="`https://picsum.photos/id/${foundContact.id + 50}/200`"
                :alt="`${foundContact.firstName}`"
                class="contactDetails-img"
            >
            <div class="contactDetails-details">
                <h2>{{ foundContact.lastName }}, {{ foundContact.firstName }}</h2>
                <p>First Name: {{ foundContact.firstName }}</p>
                <p>Last Name: {{ foundContact.lastName }}</p>
                <p>Title: {{ foundContact.title }}</p>
                <p>Department: {{ foundContact.department }}</p>
            </div>
            <div class="contactDetails-details">
                <p>Email: {{ foundContact.email }}</p>
                <p>Phone: {{ foundContact.phone }}</p>
                <p>Extension: {{ foundContact.extension }}</p>
                <p>Fax: {{ foundContact.fax }}</p>
            </div>
        </div>
        <div v-if="!isEditing" class="contactDetails-btns">
            <button class="btn primary" @click="editFoundContact(foundContact)">Edit</button>
            <button class="btn secondary" @click="deleteFoundContact(foundContact)">Delete</button>
        </div>
        <router-view
            :id="id"
            :foundContact="foundContact"
            @cancelEditing="cancelEditing"
            @isEditingContact="isEditingContact"
            @updateSavedContact="updateSavedContact"
        />
    </div>
</template>

<script>    
    export default {
        name: 'ContactDetails',
        props: ['id', 'latestContacts'], 
        emits: ['getDeletedContact', 'updateSavedContacts', 'getSavedContact'],
        data: function() {
            return {
                foundContact: {
                    id: null,
                    firstName: "",
                    lastName: "",
                    title: "",
                    department: "",
                    email: "",
                    phone: "",
                    extension: null,
                    fax: ""
                },
                isEditing: false,
                updatedContacts: []
            }
        },
        created() {
            if(this.latestContacts.find(contact => contact.id == this.id)) {
                // use '==' because this.id is a string
                this.foundContact = this.latestContacts.find(contact => contact.id == this.id)
            } else {
                // If the contact didn't exist, redirect to 404NotFound page
                this.$router.push('/404NotFound')
            }
        },
        methods: {
            deleteFoundContact(foundContact) {
                this.$emit('getDeletedContact', foundContact)
                this.$router.push('/')
            },
            editFoundContact(foundContact) {
                this.isEditing = true
                this.$router.push('/contact/' + foundContact.id + '/edit')
            },
            cancelEditing(cancelEditing) {
                this.isEditing = cancelEditing
            },
            isEditingContact(initialEditingStatus) {
                this.isEditing = initialEditingStatus
            },
            updateSavedContact(savedContact) {
                this.updatedContacts = this.latestContacts.map(
                    contact => contact.id == savedContact.id ? {...savedContact} : contact
                )
                this.$emit('updateSavedContacts', this.updatedContacts)

                // Emit the saved contact so that the SideNav watch the changes, too
                this.$emit('getSavedContact', savedContact)
            }
        },
        watch: {
            // watch the props that are passed from main.js
            // Change the details when clicking on the SideNav
            latestContacts: function() {
                if(this.latestContacts.find(contact => contact.id == this.id)) {
                    // use '==' because this.id is a string
                    this.foundContact = this.latestContacts.find(contact => contact.id == this.id)
                } else {
                    this.$router.push('/404NotFound')
                }
            }
        }
    }
</script>

<style lang="scss">
@import '../scss/variables';

.contactDetails {
    &-container {
        display: grid;
        grid-template-columns: 200px 1fr 1fr;
        gap: 100px;
    }

    &-img {
        border-radius: 100px;
    }

    &-details {
        h2 {
            color: $primary-color;
        }

        p {
            color: $tertiary-color;
        }
    }

    &-btns {
        display: flex;
        justify-content: end;
        gap: 40px;
    }
}
</style>