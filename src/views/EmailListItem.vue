<template>
  <LayoutFixedScrollable>
    <template #content>
      <div class="">
        <BaseAppBarHeader title="Email" :to-link="backLink">
          <template #menu>
            <div class="flex-grow inline-block text-right">
              <a href="#" class="relative">
                <img
                  class="float-right w-5 cursor-pointer"
                  @click="toggleMenu()"
                  src="https://user-images.githubusercontent.com/5694308/78644324-e730da00-78df-11ea-84b2-047e5bf57c2a.png"
                />
                <ul v-if="isMenu" class="menu shadow-8dp">
                  <li class="text-left">
                    <router-link class="px-2 py-3 block w-full" :to="`${selectedEmail.id}/edit`">Edit</router-link>
                  </li>
                  <li class="px-2 py-3 text-left cursor-pointer" @click="deleteEmail()">Delete</li>
                </ul>
              </a>
            </div>
          </template>
        </BaseAppBarHeader>
        <div class="flex">
          <ul class="container px-0 md:px-6 pt-4">
            <li class="flex flex-wrap text-left px-4 py-4">
              <div class="w-full">{{ selectedEmail.email }}</div>
              <div class="w-full item-details text-xs pt-1">
                {{ formatDate(selectedEmail.creationDateTime, 'M/d/yyyy') }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatDate } from '@/helpers.js';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import NavigationBottom from '@/components/BaseNavigationBottom';

export default {
  name: 'EmailListItem',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedScrollable },
  data() {
    return {
      isMenu: false
    };
  },
  computed: {
    ...mapGetters('distributionGroup', ['selectedEmail']),
    backLink() {
      return `/settings/email-lists/${this.$route.params.groupName}`;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations('distributionGroup', ['selectEmail']),
    formatDate,
    init() {
      if (Object.entries(this.selectedEmail).length === 0) {
        this.$store.dispatch('distributionGroup/getEmails', this.$route.params.groupName).then(data => {
          const item = data.find(item => item.id == this.$route.params.id);
          this.selectEmail(item);
        });
      }
    },
    toggleMenu() {
      this.isMenu = !this.isMenu;
    },
    deleteEmail() {
      this.$store.dispatch('distributionGroup/deleteEmail').then(() => {
        this.$router.push({ name: 'EmailLists' });
      });
    }
  }
};
</script>

<style scoped>
.item-details {
  color: rgba(0, 0, 0, 0.38);
}

.menu {
  position: absolute;
  top: 46px;
  background: white;
  border-radius: 4px;
  right: -30px;
  width: 114px;
}
</style>
