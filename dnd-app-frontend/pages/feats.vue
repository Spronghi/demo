<template>
  <div>
    <FeatList />
  </div>
</template>

<script>
import FeatList from "~/components/FeatList";

export default {
  components: {
    FeatList
  },
  head () {
    return {
      title: this.$t('feats.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('feats.description') }
      ]
    }
  }
};
</script>
