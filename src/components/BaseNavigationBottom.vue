<template>
  <nav class="flex w-full relative bottom-0 bg-transparent z-20">
    <div class="flex flex-auto">
      <div class=" bg-primary flex-1"></div>
      <div class="container container--border px-0">
        <div class="flex relative">
          <ul class="flex-auto text-left menu list-none bg-primary px-2 md:px-0">
            <li class="text-white inline-block m-2 mb-1 text-xs">
              <router-link class="router-link" to="/">
                <HomeIcon class="m-auto" />
                Home
              </router-link>
            </li>
            <li class="text-white inline-block m-2 mb-1 text-xs">
              <router-link class="router-link" to="/activity-feed/memos">
                <EmailIcon class="m-auto" />
                Memo Stats
              </router-link>
            </li>
          </ul>
          <img
            class="bottom-nav-icon"
            src="https://res.cloudinary.com/whynotearth/image/upload/v1588090427/Volkswagen/cms/Bottom_Nav_2x_vzwf6q.svg"
          />
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
        </div>
      </div>
      <div class=" bg-primary flex-1"></div>
    </div>
  </nav>
</template>

<script>
import AddIcon from '@/assets/add.svg';
import HomeIcon from '@/assets/home.svg';
import MemoIcon from '@/assets/memo.svg';
import EmailIcon from '@/assets/email.svg';

export default {
  name: 'NavigationBottom',
  components: { AddIcon, HomeIcon, MemoIcon, EmailIcon },
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
  height: 56px;
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
  left: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.54);
}
.router-link-exact-active {
  color: #03b3f9 !important;
  opacity: 1 !important;
}
.router-link-exact-active svg path {
  fill: #03b3f9 !important;
  fill-opacity: 1 !important;
}
.router-link {
  color: white;
  opacity: 0.54;
}
.router-link svg path {
  fill: white;
  fill-opacity: 0.54;
}
.container--border {
  @screen md {
    border-left: 24px solid;
    border-right: 24px solid;
    @apply border-primary;
  }
}
</style>
