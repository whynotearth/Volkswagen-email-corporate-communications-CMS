<template>
  <div class="">
    <BaseAppBarHeader title="Email" :to-link="backLink">
      <div class="flex-grow inline-block text-right">
        <img
          class="float-right w-5 cursor-pointer"
          @click="toggleMenu()"
          src="https://user-images.githubusercontent.com/5694308/78644324-e730da00-78df-11ea-84b2-047e5bf57c2a.png"
        />
        <ul v-if="isMenu" class="w-1/3 menu shadow-8dp">
          <li class="text-left">
            <router-link class="px-2 py-3 block w-full" :to="`${selectedEmail.id}/edit`">Edit</router-link>
          </li>
          <li class="px-2 py-3 text-left cursor-pointer" @click="deleteEmail()">Delete</li>
        </ul>
      </div>
    </BaseAppBarHeader>
    <div class="flex">
      <ul class="w-full pt-4 ">
        <li class="flex flex-wrap text-left px-4 py-4">
          <div class="w-full">{{ selectedEmail.email }}</div>
          <div class="w-full item-details text-xs pt-1">
            {{ selectedEmail.creationDateTime }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'EmailListItem',
  components: { BaseAppBarHeader },
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
  methods: {
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
  float: right;
  top: 60px;
  background: white;
  border-radius: 4px;
  right: 0;
}
</style>
