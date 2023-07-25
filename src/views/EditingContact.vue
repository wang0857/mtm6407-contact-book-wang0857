<template>
    <Message
        v-if="isSubmit"
        :isError="isError"
        @resetSubmitStatus="resetSubmit"
    >
        {{
            isError ? 'You missed something or filled in invalid answers. Please check again.' :
            'You have successfully edited a contact! The page is redirecting to details page...'
        }}
    </Message>
    <form class="editContact-form" @submit.prevent="submitAddContact">
        <div class="editContact-inputField">
            <label for="firstName" class="form-label">First Name: </label>
            <input
                v-model="editedContact.firstName"
                type="text"
                class="form-control"
                id="firstName"
                required
                @invalid="invalidatedForm"
            >
        </div>
        <div class="editContact-inputField">
            <label for="lastName" class="form-label">Last Name: </label>
            <input
                v-model="editedContact.lastName"
                type="text"
                class="form-control"
                id="lastName"
                required
                @invalid="invalidatedForm"
            >
        </div>
        <div class="editContact-inputField">
            <label for="title" class="form-label">Title: </label>
            <input
                v-model="editedContact.title"
                type="text"
                class="form-control"
                id="title"
                required
                @invalid="invalidatedForm"
            >
        </div>
        <div class="editContact-inputField">
            <label for="department" class="form-label">Department: </label>
            <input
                v-model="editedContact.department"
                type="text"
                class="form-control"
                id="department"
                required
                @invalid="invalidatedForm"
            >
        </div>
        <div class="editContact-inputField">
            <label for="email" class="form-label">Email Address: </label>
            <input
                v-model="editedContact.email"
                type="email"
                class="form-control"
                id="email"
                required
                @invalid="invalidatedForm"
            >
        </div>
        <div class="editContact-inputField">
            <label for="phone" class="form-label">Phone: </label>
            <input
                v-model="editedContact.phone"
                type="tel"
                class="form-control"
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                @invalid="invalidatedForm"
            >
        </div>
        <div class="editContact-inputField">
            <label for="extension" class="form-label">Extension: </label>
            <input
                v-model="editedContact.extension"
                type="text"
                class="form-control"
                id="extension"
                required
                @invalid="invalidatedForm"
            >
        </div>
        <div class="editContact-inputField">
            <label for="fax" class="form-label">Fax: </label>
            <input
                v-model="editedContact.fax"
                type="tel"
                class="form-control"
                id="fax"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                @invalid="invalidatedForm"
            >
        </div>
        <div class="editContact-btns">
            <button
                type="submit"
                class="btn primary"
                @click="saveContact"
            >Save</button>
            <button class="btn secondary" @click="backToDetails">Cancel</button>
        </div>
    </form>
</template>

<script>
    import Message from '../components/Message.vue'

    export default {
        name: 'EditingContact',
        props: ['id', 'foundContact'],
        emits: ['cancelEditing', 'isEditingContact', 'updateSavedContact'],
        components: { Message },
        data: function() {
            return {
                isSubmit: false,
                isError: false,
                editedContact: {
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
                defaultDetails: {
                    id: this.foundContact.id,
                    firstName: this.foundContact.firstName,
                    lastName: this.foundContact.lastName,
                    title: this.foundContact.title,
                    department: this.foundContact.department,
                    email: this.foundContact.email,
                    phone: this.foundContact.phone,
                    extension: this.foundContact.extension,
                    fax: this.foundContact.fax
                }
            }
        },
        methods: {
            backToDetails() {
                this.$emit('cancelEditing', false)
                this.$router.push('/contact/' + this.id)
            },
            saveContact() {
                this.isSubmit = true

                // Rest the Submit Status and redirect to details page
                this._submitTimer = setInterval(() => {
                    this.isSubmit = false
                }, 4000)
            },
            invalidatedForm() {
                this.isError = true

                // Rest the Eorro Status after resetting Submit Status
                this._errorTimer = setInterval(() => {
                    this.isError = false
                }, 5000)
            },
            resetSubmit() {
                clearInterval(this._submitTimer)
                this.isSubmit = false
            },
            submitAddContact() {
                this.$emit('updateSavedContact', this.editedContact)

                this._redirectTimer = setInterval(() => {
                    this.$router.push('/contact/' + this.id)
                }, 3000)
            }
        },
        created() {
            this.editedContact = this.defaultDetails
        },
        mounted() {
            // Set initial editing status to be true when refreshing page
            this.$emit('isEditingContact', true)
        },
        unmounted() {
            this.$emit('cancelEditing', false)

            clearInterval(this._submitTimer)
            clearInterval(this._errorTimer)
            clearInterval(this._redirectTimer)
        },
        watch: {
            id: function() {
                // Reset editing status when change to another contact from SideNav
                this.$emit('isEditingContact', true)
            },
            // Change the default contact information when changing contacts from SideNav  
            // foundContact: {
            //     deep: true,
            //     handler: function() {
            //         this.editedContact = this.foundContact
            //     }
            // }
        }
    }
</script>

<style lang="scss">
    @import '../scss/variables';

    .editContact {
        &-title {
            display: flex;
            justify-content: space-between;
        }
        
        &-btns {
            grid-column: 1 / 3;
            display: flex;
            justify-content: end;
            gap: 40px;
        }

        &-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 70px;
            font-size: 18px;
        }

        &-inputField {
            display: flex;
            align-items: center;
            gap: $sm;

            .form-label {
                width: 30%;
            }

            input {
                background-color: $dark-bg;
                color: $white;
                border: 1px solid $white;
                border-radius: $md;
                font-size: 18px;

                &::placeholder {
                    color: $white;
                    font-size: 18px;
                }

                &:focus {
                    background-color: $dark-bg;
                    color: $white;
                    border: 1px solid $white;
                    border-radius: $md;
                }
            }
        }
    }
</style>