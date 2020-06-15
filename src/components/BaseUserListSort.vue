<template>
  <div>
    <div v-for="(user, index) in sortedUserList" :key="index" class="border-t pt-1 text-left bg-surface">
      <span class="tg-caption-mobile pl-6 text-black em-medium">{{ user.group }}</span>
      <BaseUserItem v-for="(item, index2) in user.children" :key="index2" :item="item">
        <template #more>
          <router-link
            class="relative"
            :to="{ name: 'UserListProfile', params: { groupName: $route.params.groupName, id: item.id } }"
          >
            <More class="cursor-pointer" />
          </router-link>
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
      this.list.sort((a, b) => {
        const x = a.firstName === null ? '' : '' + a.firstName;
        const y = b.firstName === null ? '' : '' + b.firstName;
        return x > y ? 1 : x === y ? 0 : -1;
      });
      let data = this.list.reduce((stash, current) => {
        // get first letter of name of current element
        let group = current.firstName ? current.firstName[0] : 'No Name';
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
