<template>
    <div class="view-container">
        <div class="title-container">
            <h1>Add New Contact</h1>
            <router-link to="/" class="router-link">
                <i class="fa-solid fa-chevron-left"></i>
                <span class="back">Back to Contact Book</span>
            </router-link>
        </div>
        <Message
            v-if="isSubmit"
            :isError="isError"
            @resetSubmitStatus="resetSubmit"
        >
            {{
                isError ? 'You missed something or filled in invalid answers. Please check again.' :
                'You have successfully added a contact! The page is redirecting to Contact Book page...'
            }}
        </Message>
        <form class="newContact-form" @submit.prevent="addContact">
            <img
                src="https://picsum.photos/200"
                alt="New Photo"
                class="newContact-img"
            >
            <div class="newContact-inputField">
                <label for="firstName" class="form-label">First Name: </label>
                <input
                    v-model="newContact.firstName"
                    type="text"
                    class="form-control"
                    id="firstName"
                    placeholder="Your first name"
                    required
                    @invalid="invalidatedForm"
                >
            </div>
            <div class="newContact-inputField">
                <label for="lastName" class="form-label">Last Name: </label>
                <input
                    v-model="newContact.lastName"
                    type="text"
                    class="form-control"
                    id="lastName"
                    placeholder="Your last name"
                    required
                    @invalid="invalidatedForm"
                >
            </div>
            <div class="newContact-inputField">
                <label for="title" class="form-label">Title: </label>
                <input
                    v-model="newContact.title"
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Your title"
                    required
                    @invalid="invalidatedForm"
                >
            </div>
            <div class="newContact-inputField">
                <label for="department" class="form-label">Department: </label>
                <input
                    v-model="newContact.department"
                    type="text"
                    class="form-control"
                    id="department"
                    placeholder="Your department"
                    required
                    @invalid="invalidatedForm"
                >
            </div>
            <div class="newContact-inputField">
                <label for="email" class="form-label">Email Address: </label>
                <input
                    v-model="newContact.email"
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Your email address"
                    required
                    @invalid="invalidatedForm"
                >
            </div>
            <div class="newContact-inputField">
                <label for="phone" class="form-label">Phone: </label>
                <input
                    v-model="newContact.phone"
                    type="tel"
                    class="form-control"
                    id="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="Ex: 123-456-7890"
                    required
                    @invalid="invalidatedForm"
                >
            </div>
            <div class="newContact-inputField">
                <label for="extension" class="form-label">Extension: </label>
                <input
                    v-model="newContact.extension"
                    type="text"
                    class="form-control"
                    id="extension"
                    placeholder="Your extension"
                    required
                    @invalid="invalidatedForm"
                >
            </div>
            <div class="newContact-inputField">
                <label for="fax" class="form-label">Fax: </label>
                <input
                    v-model="newContact.fax"
                    type="tel"
                    class="form-control"
                    id="fax"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="Ex: 123-456-7890"
                    required
                    @invalid="invalidatedForm"
                >
            </div>
            <div class="newContact-submit">
                <button
                    type="submit"
                    class="btn primary"
                    @click="submitContact"
                >Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
    import Message from '../components/Message.vue';
    import contacts from '../utils/contacts';
    
    export default {
    name: "NewContact",
    components: { Message },
    props: ['latestContacts'],
    emits: ['addNewContact'],
    data: function () {
        return {
            contacts: contacts,
            newContact: {
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
            isSubmit: false,
            isError: false,
            newContactList: this.latestContacts
        };
    },
    methods: {
        submitContact() {
            this.isSubmit = true

            // Rest the Submit Status
            this._submitTimer = setInterval(() => {
                this.isSubmit = false
            }, 5000)
        },
        invalidatedForm() {
            this.isError = true

            // Rest the Eorro Status after resetting Submit Status
            this._errorTimer = setInterval(() => {
                this.isError = false
            }, 6000)
        },
        addContact() {
            if(this.latestContacts.length < this.contacts.length) {
                const newId = this.contacts.length + 1
                this.newContact.id = newId
            } else {
                const newId = this.latestContacts.length + 1
                this.newContact.id = newId
            }
            this.newContactList.push(this.newContact)
            this.newContactList.sort(
                (a, b) => a.lastName > b.lastName ? 1 :
                a.lastName < b.lastName ? -1 : 0
            )
            this.$emit('addNewContact', this.newContactList)

            this.newContact = {
                id: null,
                firstName: "",
                lastName: "",
                title: "",
                department: "",
                email: "",
                phone: "",
                extension: null,
                fax: ""
            }

            this._redirectTimer = setInterval(() => {
                this.$router.push('/')
            }, 4000)
        },
        resetSubmit() {
            clearInterval(this._submitTimer)
            this.isSubmit = false
        }
    },
    unmounted() {
        clearInterval(this._submitTimer)
        clearInterval(this._errorTimer)
        clearInterval(this._redirectTimer)
    }
}
</script>

<style lang="scss">
    @import '../scss//variables';

    .newContact {
        &-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 70px;
            font-size: 18px;
        }

        &-img {
            border-radius: 100px;
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

        &-submit {
            display: flex;
            justify-content: end;
        }
    }
</style>