<template>
    <div class="sideNav">
        <router-link to="/" class="router-link logo">
            <h2>Contact Book</h2>
        </router-link>
        <div class="search-bar">
            <input
                v-model="search"
                type="text"
                class="form-control"
                id="search"
                placeholder="Search for the contact"
            >
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="contacts-title">
            <h3>Business Contacts</h3>
            <router-link to="/new-contact" class="router-link">
                <i class="fa-solid fa-user-plus"></i>
            </router-link>
        </div>
        <div class="contact-list">
            <ContactList
                :searchedContacts="searchedContacts"
                @deleteContact="filterContacts"
            />
        </div>
    </div>
</template>

<script>
    import ContactList from '../components/ContactList.vue';

    export default {
        name: 'SideNav',
        components: {ContactList},
        props: ['deletedFoundContact', 'savedEditedContact', 'latestContacts'],
        emits: ['updatedContacts'],
        data: function() {
            return {
                search: '',
                contacts: this.latestContacts
            }
        },
        created() {
            // Get contatcs from local storage if it exist
            const stroredContacts = localStorage.getItem('latestContacts')
            if(stroredContacts) {
                this.contacts = JSON.parse(stroredContacts)
            }
        },
        computed: {
            searchedContacts: function() {
                return this.contacts.filter(
                    contact => contact.lastName.toLowerCase().includes(this.search.toLowerCase()) || 
                    contact.firstName.toLowerCase().includes(this.search.toLowerCase())
                )
            }
        },
        methods: {
            filterContacts(deletedContact) {
                this.contacts = this.contacts.filter(
                    contact => contact.id !== deletedContact.id
                )
                this.$emit('updatedContacts', this.contacts)
            }
        },
        watch: {
            // watch the props that are passed from <ContactDetails />
            deletedFoundContact: {
                deep: true,
                handler: function(deletedFoundContact) {
                    this.contacts = this.contacts.filter(
                        contact => contact.id !== deletedFoundContact.id
                    )
                    this.$emit('updatedContacts', this.contacts)
                }
            },
            savedEditedContact: {
                deep: true,
                handler: function(savedEditedContact) {
                    this.contacts = this.contacts.map(
                        contact => contact.id == savedEditedContact.id ? {...savedEditedContact} : contact
                    )
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/variables';

    .sideNav {
        background-color: $dark-bg;
        padding: 50px 40px;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 50px;

        h2 {
            color: $primary-color;
        }

    }
    
    .search-bar {
        position: relative;

        input {
            background-color: $dark-bg;
            color: $white;
            border: 1px solid $white;
            border-radius: $md;

            &::placeholder {
                color: $white;
            }

            &:focus {
                background-color: $dark-bg;
                color: $white;
                border: 1px solid $white;
                border-radius: $md;
            }
        }

        i {
            position: absolute;
            top: $sm;
            right: $lg;
            color: $white;
            font-size: 18px;
        }
    }
    
    .contacts {
        &-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: $white;

            i {
                font-size: 28px;
            }
        }
    }

    .contact {
        &-list {
            display: flex;
            flex-direction: column;
            gap: $md;
            height: 614px;
            width: calc(100% + $md);
            overflow-y: scroll;
            padding-right: $md;
            
            &::-webkit-scrollbar {
                width: $xs;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($white, 0.6);
                border-radius: $sm;
            }
        }
    }
</style>