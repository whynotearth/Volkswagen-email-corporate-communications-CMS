<template>
  <div>
    <div v-for="(user, index) in sortedUserList" :key="index" class="border-t pt-1 text-left">
      <span class="tg-caption-mobile pl-6 emphasis">{{ user.group }}</span>
      <BaseUserItem v-for="(item, index2) in user.children" :key="index2" :item="item">
        <template #more>
          <a class="relative" href="#">
            <More class="cursor-pointer" @click="item.click = !item.click" />
            <ul v-if="item.click" class="menu shadow-8dp">
              <li class="p-2 tg-body-mobile text-left cursor-pointer">Edit</li>
              <li class="p-2 tg-body-mobile text-left cursor-pointer">Delete</li>
            </ul>
          </a>
        </template>
      </BaseUserItem>
    </div>
  </div>
</template>

<script>
import BaseUserItem from '@/components/BaseUserItem';
import More from '@/assets/more.svg';

export default {
  name: 'UserList',
  components: { BaseUserItem, More },
  data() {
    return {
      userList: [
        { name: 'Jack', click: false },
        { name: 'Rose', click: false },
        { name: 'David', click: false },
        { name: 'Ziba', click: false },
        { name: 'Hanna', click: false },
        { name: 'Emma', click: false },
        { name: 'Elen', click: false },
        { name: 'Emma Ian', click: false },
        { name: 'Anna', click: false },
        { name: 'Adrian', click: false },
        { name: 'Alis', click: false }
      ],
      sortedUserList: null
    };
  },
  mounted() {
    this.sortingByGroupLetter();
  },
  methods: {
    sortingByGroupLetter() {
      this.userList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
      let data = this.userList.reduce((stash, current) => {
        // get first letter of name of current element
        let group = current.name[0];
        if (!stash[group]) {
          stash[group] = { group, children: [current] };
        } else {
          stash[group].children.push(current);
        }
        return stash;
      }, {});
      this.sortedUserList = Object.values(data);
    }
  }
};
</script>

<style scoped>
.emphasis {
  color: rgba(0, 0, 0, 0.54);
}
.menu {
  position: absolute;
  top: 30px;
  background: white;
  border-radius: 4px;
  right: 10px;
  width: 114px;
  z-index: 1;
}
</style>
