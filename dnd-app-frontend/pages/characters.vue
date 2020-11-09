<template>
  <div>
    <CharacterList />
  </div>
</template>

<script>
import CharacterList from "~/components/character/CharacterList";

export default {
  components: {
    CharacterList
  },
  head () {
    return {
      title: this.$t('character_list.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('character_list.description') }
      ]
    }
  }
};
</script>
