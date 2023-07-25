<template>
  <div class="view-container">
    <h1>Find Contact by Alphabet</h1>
    <div class="contactBook-container">
      <div
        v-for="alphabet in alphabets"
        :key="alphabet"
        class="contactBook-alphabet"
      >
        <h2>{{ alphabet }}</h2>
        <hr>
        <div
          v-for="contact in latestContacts"
          :key="contact.id"
          class="contactBook-names">
          <div v-if="contact.lastName[0] === alphabet" class="contactBook-name">
            <router-link :to="'/contact/' + contact.id" class="router-link">
              {{ contact.lastName }}, {{ contact.firstName }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  const alphabets = [...Array(26).keys()].map((n) => String.fromCharCode(65 + n))

  export default {
    name: 'ContactBook',
    props: ['latestContacts'],
    data: function() {
      return {
        alphabets: alphabets
      }
    }
  }

</script>

<style lang="scss">
  @import '../scss/variables';

  .contactBook {
    &-container {
      display: grid;
      grid-template-columns: 1fr;
      gap:$lg;
      width: 100%;
      height: 800px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
          width: $xs;
      }

      &::-webkit-scrollbar-thumb {
          background-color: rgba($white, 0.6);
          border-radius: $sm;
      }
    }

    &-alphabet {
      hr {
        background-color: $white;
      }
    }

    &-names {
      display: flex;
      flex-direction: column;
    }

    &-name {
      display: flex;
      align-items: center;
      gap: $xlg;
      font-size: 22px;

      &:last-child {
        margin-bottom: $sm;
      }
    }
  }
</style>