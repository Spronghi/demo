<template>
  <v-row no-gutters>
    <Feat
      v-for="feat in feats" 
      :key="feat._id"
      :feat="feat"
    />
  </v-row>
</template>
<script>
/*
 * This component visualize a list of feat for the character.
 * I prefered to wrap the Feat component, so I can customize the feats
 * visualized in the character in a simple way and so on.
 */
import Feat from '~/components/Feat'

export default {
  components: {
    Feat
  },
  props: {
    feats: {
      type: Array,
      required: true
    }
  }
}
</script>
<style>
  .character__feats .v-expansion-panel-content__wrap{
    padding: 0
  }

  .character__feats .v-expansion-panel-header {
    min-height: 20px;
    height: 41px;
  }
</style>
