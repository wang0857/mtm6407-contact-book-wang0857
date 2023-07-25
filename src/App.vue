<template>
  <div class="grid-container">
    <SideNav
      @updatedContacts="updateContacts"
      :deletedFoundContact="deletedFoundContact"
      :savedEditedContact="savedEditedContact"
      :latestContacts="latestContacts"
    />
    <router-view
      :latestContacts="latestContacts"
      @getDeletedContact="getDeletedContact"
      @addNewContact="updateContacts"
      @updateSavedContacts="updateContacts"
      @getSavedContact="getSavedContact"
    />
  </div>
</template>

<script>
  import SideNav from './components/SideNav.vue';
  import contacts from './utils/contacts';

  export default {
    name: 'App',
    components: {SideNav},
    data: function() {
      return {
        latestContacts: contacts,
        deletedFoundContact: {
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
        savedEditedContact: {
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
      }
    },
    created() {
      contacts.sort(
        (a, b) => a.lastName > b.lastName ? 1 :
        a.lastName < b.lastName ? -1 : 0
      )

      // Get contatcs from local storage if it exist
      // localStorage.clear()
      const stroredContacts = localStorage.getItem('latestContacts')
      if(stroredContacts) {
        this.latestContacts = JSON.parse(stroredContacts)
      }
    },
    methods: {
      updateContacts(updatedContacts) {
        this.latestContacts = updatedContacts
      },
      // This is for passing props to SideNav
      getDeletedContact(deleteContact) {
        this.deletedFoundContact = deleteContact
      },
      getSavedContact(savedContact) {
        this.savedEditedContact = savedContact
      }
    },
    watch: {
      // Set Item in local storage once user add/edit/deleted the contacts
      latestContacts: {
        deep: true,
        handler: function(updatedLatestContacts) {
          localStorage.setItem('latestContacts', JSON.stringify(updatedLatestContacts))
        }
      }
    }
  }
</script>