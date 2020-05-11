<template>
  <div class="">
    <BaseAppBarHeader title="Blue Delta" :to-link="{ name: 'Dashboard' }" />
    <div class="flex flex-col py-3">
      <div class="container px-0 md:px-6">
        <template v-for="(plan, index) in get_daily_plan">
          <JumpStartItem :key="index" :model="plan" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import JumpStartItem from '@/components/JumpStartListItem.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'JumpStart',
  components: { BaseAppBarHeader, JumpStartItem },
  computed: {
    ...mapGetters('article', ['get_daily_plan'])
  },
  mounted() {
    this.fetch_daily_plan();
  },
  methods: {
    ...mapActions('article', ['fetch_daily_plan'])
  }
};
</script>
