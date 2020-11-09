<template>
  <v-app>
    <!-- SIDEBAR -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      dark
      temporary
    >
      <v-list dense>
        <v-list-item class="pl-3">
          <div class="site-logo pt-3">
            <span>{{ $t(appName) }}</span>
            <span class="overline">{{ appVersion }}</span>
          </div>
        </v-list-item>
        <v-divider class="my-3" />
        <template v-for="item in items">
          <v-list-item
            :key="item.text"
            :to="item.to"
            router
            exact
            link
            nuxt
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(item.text) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- END SIDEBAR -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      dense
      dark
    >
      <Pinned />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-0 pl-4 mr-5 hidden-sm-and-down">
        <span>{{ $t(title) }}</span>
        <span
          v-if="current.default"
          class="overline"
        >{{ appVersion }}</span>
      </v-toolbar-title>
      <v-spacer />
      <Minimized />
      <v-avatar>
        <v-icon
          dark
        >
          mdi-account-circle
        </v-icon>
      </v-avatar>
    </v-app-bar>
    <v-container class="margin">
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
import Pinned from '../components/Pinned'
import Minimized from '../components/Minimized'
import { version, name } from "../package.json";

export default {
  components: {
    Pinned,
    Minimized
  },
  data: () => ({
    appVersion: version,
    appName: name,
    drawer: false,
    items: [
      {
        icon: "mdi-home",
        text: "home.title",
        to: "/",
        default: true
      },
      {
        icon: "mdi-baby-face-outline",
        text: "home.characters",
        to: "/characters"
      },
      {
        icon: "mdi-bullseye-arrow",
        text: "home.classes",
        to: "/classes"
      },
      {
        icon: "mdi-duck",
        text: "home.feats",
        to: "/feats"
      }
    ]
  }),
  computed: {
    current() {
      const inItems = this.items.filter(p => this.$route.path === p.to)
      if(inItems.length) return inItems[0]

      return { default: true }
    },
    title() {
      return this.current.default ? this.appName : this.current.text;
    }
  }
};
</script>
<style scoped>
.v-list-item__icon:first-child {
  margin-right: 10px;
}

.margin {
  margin-top: 60px;
}

</style>
