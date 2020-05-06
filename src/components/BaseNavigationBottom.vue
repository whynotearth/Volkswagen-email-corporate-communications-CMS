<template>
  <nav class="flex w-full relative bottom-0 bg-transparent z-20" id="bottom-nav">
    <div class="flex flex-auto">
      <div class=" bg-primary flex-1"></div>
      <div class="container container--border px-0">
        <div class="flex relative">
          <ul class="flex-auto arrange text-left menu list-none bg-primary px-2 md:px-0">
            <li class="text-white inline-block m-2 mb-1 text-xs">
              <router-link class="router-link" to="/">
                <HomeIcon class="m-auto" />
                Home
              </router-link>
            </li>
            <li class="text-white inline-block m-2 mb-1 text-xs">
              <router-link class="router-link" to="/activity-feed/memos">
                <StatsIcon class="m-auto" />
                Stats
              </router-link>
            </li>
            <li class="text-white inline-block m-2 mb-1 text-xs">
              <router-link class="router-link" to="/activity-feed/memos">
                <MemoStatslIcon class="m-auto" />
                Blue Delta
              </router-link>
            </li>
            <li class="text-white inline-block m-2 mb-1 text-xs">
              <router-link class="router-link" to="/activity-feed/memos">
                <BookingIcon class="m-auto" />
                Article
              </router-link>
            </li>
          </ul>
          <img
            class="bottom-nav-icon"
            src="https://res.cloudinary.com/whynotearth/image/upload/v1588090427/Volkswagen/cms/Bottom_Nav_2x_vzwf6q.svg"
          />
          <ul :class="{ ' opened': isOpen }" class="toggle-menu list-none">
            <li class="flex whitespace-no-wrap text-white text-xs justify-end my-3">
              <router-link to="/posts/add" class="flex items-center">
                Article
                <div
                  class="rounded-full h-10 w-10 flex items-center justify-center bg-secondary ml-2
                shadow-6dp"
                >
                  <PostIcon class="m-auto" />
                </div>
              </router-link>
            </li>
            <li class="flex whitespace-no-wrap text-white text-xs justify-end my-2">
              <router-link to="/memo/add" class="flex items-center">
                Memo
                <div
                  class="rounded-full h-10 w-10 flex items-center justify-center bg-secondary ml-2
                shadow-6dp"
                >
                  <MemoIcon class="m-auto" />
                </div>
              </router-link>
            </li>
          </ul>
          <div class="flex content-center toggle-button bg-secondary shadow-6dp" @click="toggleMenu()">
            <AddIcon class="m-auto ease-in-out" :class="{ 'rotate-45': isOpen }" />
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
import MemoStatslIcon from '@/assets/memo-stats.svg';
import PostIcon from '@/assets/post.svg';
import BookingIcon from '@/assets/booking.svg';
import StatsIcon from '@/assets/stats.svg';

export default {
  name: 'NavigationBottom',
  components: { AddIcon, HomeIcon, MemoIcon, MemoStatslIcon, PostIcon, BookingIcon, StatsIcon },
  props: {},
  data() {
    return {
      isOpen: false,
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0
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
  top: -37px;
  right: 23px;
}
.ease-in-out {
  transition: transform ease-in 0.2s;
}
.rotate-45 {
  transform: rotate(45deg);
}
ul.toggle-menu > li {
  position: absolute;
  top: 0;
  right: 0;
  transition: all 0.2s ease;
}
ul.toggle-menu.opened > li:nth-child(1) {
  transition-duration: 150ms;
  top: -70px;
}
ul.toggle-menu.opened > li:nth-child(2) {
  transition-duration: 250ms;
  top: -130px;
}
.arrange {
  display: flex;
  justify-content: space-evenly;
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
