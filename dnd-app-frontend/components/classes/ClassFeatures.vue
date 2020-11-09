<template>
  <v-row no-gutters>
    <v-row
      v-if="classFeatures.length"
      class="mt-4 mb-2"
      no-gutters
    >
      <span class="col-12 mb-0 subtitle-1 primary--text">
        {{ $t('classes.class_features') }}
      </span>
            
      <v-row
        class="my-2"
        no-gutters
      >
        <b>{{ $t('class.proficiency.a') }}</b>
        <b class="ml-1">{{ $t(name).toLowerCase() }}</b>
        <b class="ml-1">{{ $t('class.proficiency.with') }}:</b>
        <span class="ml-1">{{ proficiencyWith(proficiency) }}</span>
      </v-row>            
      <v-row
        v-for="feat in classFeatures"
        :key="feat.name"
        class="my-2"
        no-gutters
      >
        <span><b>{{ $t(feat.name) }}</b>: {{ $t(feat.description) }} </span>
      </v-row>
    </v-row>
    <v-simple-table
      class="classes__table"
      dense
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center col-small">
              Level
            </th>
            <th class="text-left">
              Special
            </th>
            <th class="text-center col-small">
              BAB
            </th>
            <th class="text-center col-small">
              Fort
            </th>
            <th class="text-center col-small">
              Ref
            </th>
            <th class="text-center col-small">
              Will
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="level in levels"
            :key="level.name"
          >
            <td class="text-center col-small">
              {{ level.value }}
            </td>
            <td>{{ level.choises.map(c => $t(c.name)).join(', ') }}</td>
            <td class="text-center col-small">
              +{{ bonus('bab', level.value) }}
            </td>
            <td class="text-center col-small">
              +{{ bonus('fort', level.value) }}
            </td>
            <td class="text-center col-small">
              +{{ bonus('ref', level.value) }}
            </td>
            <td class="text-center col-small">
              +{{ bonus('will', level.value) }}
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
    levels: {
      type: Array,
      required: true
    },
    proficiency: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    classFeatures(){
      const features = []
      this.levels.forEach(l => l.choises.forEach(c => features.push(c)) );
      return features.filter((obj, pos, arr) =>  arr.map(mapObj => mapObj.name).indexOf(obj.name) === pos );
    }
  },
  methods: {
    bonus(bonus, level){
      let result = 0
      
      this.levels.forEach(l => result += (l.value <= level ? (l[bonus] || 0) : 0))

      return result || 0
    },
    proficiencyWith(proficiency) {
      return proficiency.map(p => this.$t(`class.proficiency.${p}`).toLowerCase()).join(', ')
    }
  }
}
</script>
<style scoped>
  .classes__table {
    width: 100%;
  }

  .classes__table .col-small {
     width: 50px
  }

  .classes__table td {
    font-size: small;
    padding: 3px 16px;
  }
</style>
