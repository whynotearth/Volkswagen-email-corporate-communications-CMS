<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader title="Blue Delta" :to-link="{ name: 'Dashboard' }" />
    </template>
    <template #content>
      <div class="flex flex-col py-3">
        <div class="container px-0 md:px-6">
          <router-link
            v-for="(plan, index) in get_daily_plan"
            :to="{ name: 'EditBlueDelta', params: { id: plan.jumpStartId || 1 } }"
            :key="index"
            class="cursor-pointer"
          >
            <JumpStartItem :model="plan" />
          </router-link>
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import JumpStartItem from '@/components/JumpStartListItem.vue';
import { mapGetters, mapActions } from 'vuex';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';

export default {
  name: 'JumpStart',
  components: { BaseAppBarHeader, JumpStartItem, LayoutFixedScrollable },
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
