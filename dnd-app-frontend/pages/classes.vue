<template>
  <div>
    <ClassesList />
  </div>
</template>

<script>
import ClassesList from "~/components/classes/ClassesList";

export default {
  components: {
    ClassesList
  },
  head () {
    return {
      title: this.$t('classes.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('classes.description') }
      ]
    }
  }
};
</script>
