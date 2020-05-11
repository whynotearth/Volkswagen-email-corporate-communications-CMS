<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader title="Blue Delta" :to-link="{ name: 'Dashboard' }" />
    </template>
    <template #content>
      <div class="flex flex-col py-3">
        <div class="container px-0 md:px-6">
          <div v-for="(plan, index) in get_daily_plan" :key="index" class="cursor-pointer" @click="selectPlan(plan)">
            <JumpStartItem :model="plan" />
          </div>
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import JumpStartItem from '@/components/JumpStartListItem.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
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
    ...mapActions('article', ['fetch_daily_plan']),
    ...mapActions('email', ['update_selected_articles']),
    ...mapMutations('email', ['update_selected_plan', 'update_email_date']),
    selectPlan(plan) {
      this.update_selected_articles();
      this.update_selected_plan(plan);
      plan.articles.forEach(plan => {
        this.update_selected_articles(plan);
      });
      this.update_email_date(plan.date);
      this.$router.push({ name: 'EditBlueDelta', params: { id: plan.jumpStartId } });
    }
  }
};
</script>
