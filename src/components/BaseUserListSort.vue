<template>
  <div>
    <div v-for="(user, index) in sortedUserList" :key="index" class="border-t pt-1 text-left bg-surface">
      <span class="tg-caption-mobile pl-6 text-black em-medium">{{ user.group }}</span>
      <BaseUserItem v-for="(item, index2) in user.children" :key="index2" :item="item">
        <template #more>
          <a class="relative" href="#">
            <More class="cursor-pointer" />
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
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  components: { BaseUserItem, More },
  data() {
    return {
      sortedUserList: null
    };
  },
  mounted() {
    this.sortingByGroupLetter();
  },
  methods: {
    sortingByGroupLetter() {
      this.list.sort((a, b) =>
        a.firstName.trim() > b.firstName.trim() ? 1 : b.firstName.trim() > a.firstName.trim() ? -1 : 0
      );
      let data = this.list.reduce((stash, current) => {
        // get first letter of name of current element
        let group = current.firstName[0];
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
