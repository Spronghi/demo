<template>
  <div v-if="$route.query.id">
    <Class :class-id="$route.query.id" />
  </div>
</template>
<script>
import Class from '~/components/classes/Class'

export default {
  components: {
    Class
  }
}
</script>
