<template>
  <v-row
    v-if="skills.length"
    class="mt-4 mb-2"
    no-gutters
  >
    <span class="col-12 mb-0 subtitle-1 primary--text">
      {{ $t('classes.skills') }}
    </span>
            
    <v-simple-table
      class="classes__table"
      dense
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Skill name
            </th>
            <th class="text-center">
              Key Ability
            </th>
            <th class="text-center">
              Trained Only
            </th>
            <th class="text-center">
              Armor Check Penality
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="skill in skills"
            :key="skill.name"
          >
            <td class="text-left">
              {{ $t(skill.name) }}
            </td>
            <td class="text-center">
              {{ $t('mod.'+skill.mod) }}
            </td>
            <td class="text-center">
              <v-icon
                v-if="skill.trained"
                color="success"
                small
              >
                mdi-check-outline
              </v-icon>
              <v-icon
                v-else
                color="error"
                small
              >
                mdi-do-not-disturb
              </v-icon>
            </td>
            <td class="text-center">
              <v-icon
                v-if="skill.armorPenality"
                color="success"
                small
              >
                mdi-check-outline
              </v-icon>
              <v-icon
                v-else
                color="error"
                small
              >
                mdi-do-not-disturb
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-row>
</template>
<script>
export default {
  props: {
    skills: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped>
  .classes__table .col-small {
     width: 50px
  }

  .classes__table td {
    font-size: small;
    padding: 3px 16px;
  }

</style>
