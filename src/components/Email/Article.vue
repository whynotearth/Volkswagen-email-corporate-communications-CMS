<template>
  <div
    class="article flex justify-between w-full flex shadow-8dp relative break-words my-2 cursor-pointer"
    :style="active !== -1 ? '' : `border-color: #${article.category.color}`"
    :class="active !== -1 ? 'border-3 border-secondary' : 'border-2'"
    @click="$emit('clicked')"
  >
    <div class="absolute bg-white left-0 ml-5 -mt-4 p-1 rounded-full">
      <div v-if="active !== -1" class="rounded-full h-4 w-4 bg-secondary px-1 text-xs text-white">
        {{ active + 1 }}
      </div>
      <img v-else :src="article.category.image" alt="catg" draggable="false" class="h-4 w-4 object-contain" />
    </div>
    <div class="px-2 py-5 flex-shrink-0 w-16">
      <img :src="article.image || article.category.image" alt="article" draggable="false" />
    </div>
    <div class="w-full my-auto mx-2 text-lg break-all">
      {{ article.headline | truncate }}
    </div>
    <!-- Disabled for MVP -->
    <!-- <div class="my-auto text-right relative outline-none">
        <More class="cursor-pointer" @click.stop.prevent="toggleMenu" />
        <div v-show="menu" class="absolute top-0 right-0 text-left bg-white shadow-8dp rounded-md mr-5 py-2 text-base">
          <router-link to="/edit" class="block py-2 px-4 leading-5 hover:text-secondary cursor-pointer">
            Edit
          </router-link>
          <router-link to="/delete" class="block py-2 px-4 leading-5 hover:text-error cursor-pointer">
            Delete
          </router-link>
        </div>
      </div> -->
  </div>
</template>

<script>
// import More from '@/assets/more.svg';

export default {
  name: 'Article',
  // components: { More },
  props: {
    article: {
      type: Object
    },
    active: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    hideMenu() {
      this.menu = false;
    },
    showMenu() {
      this.menu = true;
    },
    toggleMenu() {
      if (this.menu) {
        this.hideMenu();
      } else {
        this.showMenu();
      }
    }
  },
  filters: {
    truncate: function(value) {
      if (value.length < 51) return value;
      else return value.slice(0, 51) + '...';
    }
  }
};
</script>

<style scoped>
.article {
  min-height: 104px;
  max-height: 113px;
}
</style>
