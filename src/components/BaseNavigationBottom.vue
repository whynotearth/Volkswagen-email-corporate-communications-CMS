<template>
  <nav class="flex w-full fixed bottom-0 bg-transparent">
    <ul class="flex-auto text-left menu list-none bg-primary px-2">
      <li class="text-white inline-block m-2 mb-1 text-xs">
        <router-link to="/">
          <HomeIcon class="m-auto" />
          Home
        </router-link>
      </li>
      <li class="text-white inline-block m-2 mb-1 text-xs">
        <router-link to="/activity-feed/memos">
          <EmailIcon class="m-auto" />
          Memo Stats
        </router-link>
      </li>
    </ul>
    <BottomNavIcon class="bottom-nav-icon" />
    <div class="flex content-center toggle-button bg-secondary shadow-6dp" @click="toggleMenu()">
      <AddIcon class="m-auto ease-in-out" :class="{ 'rotate-45': isOpen }" />
      <ul v-if="isOpen" class="toggle-menu list-none">
        <li class="flex whitespace-no-wrap text-white text-xs">
          <router-link to="/memo/add" class="flex items-center">
            Internal Memo
            <div
              class="rounded-full h-10 w-10 flex items-center justify-center bg-secondary ml-2
              shadow-6dp"
            >
              <MemoIcon class="m-auto" />
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-if="isOpen" class="overlay"></div>
  </nav>
</template>

<script>
import AddIcon from '@/assets/add.svg';
import HomeIcon from '@/assets/home.svg';
import MemoIcon from '@/assets/memo.svg';
import EmailIcon from '@/assets/email.svg';
import BottomNavIcon from '@/assets/bottom-nav.svg';

export default {
  name: 'NavigationBottom',
  components: { AddIcon, HomeIcon, MemoIcon, EmailIcon, BottomNavIcon },
  props: {},
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.bottom-nav-icon {
  position: relative;
  float: right;
}
.toggle-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  position: absolute;
  top: -30px;
  right: 16px;
}
.toggle-menu {
  position: absolute;
  top: -50px;
  right: 10px;
}
.rotate-45 {
  transform: rotate(45deg);
}
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.54);
}
.router-link-exact-active {
  color: #03b3f9;
}
.router-link-exact-active svg path {
  fill: #03b3f9 !important;
}
</style>
