<template>
  <div class="character_stats">
    <span
      v-for="(f, i) in from"
      :key="i"
    >
      <Increment 
        :class="{'ml-2':i>0}"
        :source="character"
        :target="f.target"
        :label="f.label"
        :show-zero="true"
        :show-mod="true"
        :show-sign="false"
      />
    </span>
  </div>
</template>
<script>
import Increment from '~/components/Increment'

export default {
  components: {
    Increment
  },
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    from: [
      { target: 'str', label: 'character.stats.str'},
      { target: 'dex', label: 'character.stats.dex'},
      { target: 'con', label: 'character.stats.con'},
      { target: 'int', label: 'character.stats.int'},
      { target: 'wis', label: 'character.stats.wis'},
      { target: 'cha', label: 'character.stats.cha'},
    ]
  })
}
</script>
