<template>
  <span class="character__checks">
    <Increment 
      :source="character"
      :target="`skills.${skill.name}`"
      :apply-mod="skill.mod"
      :base-value="skill.value"
      :label="`skills.${skill.name}`"
      :show-zero="true"
    />
    <v-icon
      v-if="skill.combact"
      x-small
    >mdi-sword</v-icon>
    <v-icon
      v-if="skill.armorPenality"
      x-small
    >mdi-shield-off</v-icon>
    <v-icon
      v-if="skill.repeat"
      x-small
    >mdi-repeat</v-icon>
  </span>
</template>
<script>
import Increment from '~/components/Increment'

export default {
  components:{
    Increment
  },
  props: {
    skill: {
      type: Object,
      required: true
    },
    character: {
      type: Object,
      required: true
    }
  },
}
</script>