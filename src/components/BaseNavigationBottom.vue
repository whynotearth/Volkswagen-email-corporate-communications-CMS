<template>
  <nav class="flex w-full fixed bottom-0 bg-transparent">
    <ul class="flex-auto text-left menu list-none bg-primary">
      <li class="text-white inline-block m-2 mb-1 text-xs">
        <HomeIcon class="m-auto" />
        Home
      </li>
      <li class="text-white inline-block m-2 mb-1 text-xs">
        <MemoIcon class="m-auto" />
        Memo Stats
      </li>
    </ul>
    <BottomNavIcon class="bottom-nav-icon"/>
    <div class="flex content-center toggle-button bg-secondary">
      <AddIcon class="m-auto" />
    </div>
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
  props: {}
};
</script>

<style scoped>
.bottom-nav-icon {
  position: relative;
  float: right;
}
.w-icon {
  width: 18px;
}
.toggle-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  position: absolute;
  top: -30px;
  right: 16px;
}
</style>
