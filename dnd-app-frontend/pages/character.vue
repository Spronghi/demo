<template>
  <div v-if="$route.query.id">
    <Character :character-id="$route.query.id" />
  </div>
</template>
<script>
import Character from '~/components/character/Character'

export default {
  components: {
    Character
  }
}
</script>
