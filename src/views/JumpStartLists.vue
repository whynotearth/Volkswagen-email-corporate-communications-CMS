<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader title="Blue Delta" :to-link="{ name: 'BlueDeltaMain' }" />
    </template>
    <template #content>
      <div class="flex flex-col py-6">
        <div class="container px-0 md:px-6">
          <div v-for="(plan, index) in get_daily_plan" :key="index" class="cursor-pointer" @click="selectPlan(plan)">
            <JumpStartItem :model="plan" />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import JumpStartItem from '@/components/JumpStartListItem.vue';
import NavigationBottom from '@/components/BaseNavigationBottom';
import LayoutFixedFooter from '@/components/LayoutFixedFooter.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'JumpStart',
  components: { BaseAppBarHeader, JumpStartItem, LayoutFixedFooter, NavigationBottom },
  computed: {
    ...mapGetters('email', ['get_daily_plan'])
  },
  mounted() {
    this.fetch_daily_plan();
  },
  methods: {
    ...mapActions('email', ['fetch_daily_plan', 'update_selected_articles']),
    ...mapMutations('email', ['update_selected_plan', 'update_email_date', 'update_available_articles']),
    selectPlan(plan) {
      this.update_selected_plan(plan);
      this.update_available_articles(plan.articles);
      this.update_selected_articles();
      for (let i = 0; i < 5; i++) {
        if (plan.articles[i]) {
          this.update_selected_articles(plan.articles[i]);
        } else break;
      }
      this.update_email_date(plan.dateTime);
      if (plan.jumpStartId) {
        this.$router.push({ name: 'EditBlueDelta', params: { id: plan.jumpStartId } });
      } else {
        this.$router.push({ name: 'AddBlueDelta', params: { date: plan.dateTime } });
      }
    }
  }
};
</script>
