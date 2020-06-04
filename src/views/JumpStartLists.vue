<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader title="Blue Delta" :to-link="{ name: 'BlueDeltaMain' }" />
    </template>
    <template #content>
      <BaseTabs>
        <BaseTab name="TODAY" selected="true">
          <div v-for="(plan, index) in todayPlan" :key="index" class="cursor-pointer" @click="selectPlan(plan)">
            <JumpStartItem :model="plan" />
          </div>
          <div v-if="!todayPlan.length" class="py-8">You don't have a plan for today</div>
        </BaseTab>
        <BaseTab name="UPCOMING">
          <div v-for="(plan, index) in upcomingPlan" :key="index" class="cursor-pointer" @click="selectPlan(plan)">
            <JumpStartItem :model="plan" />
          </div>
          <div v-if="!upcomingPlan.length" class="py-8">You don't have a plan for upcoming</div>
        </BaseTab>
      </BaseTabs>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import JumpStartItem from '@/components/JumpStartListItem.vue';
import NavigationBottom from '@/components/BaseNavigationBottom';
import LayoutFixedFooter from '@/components/LayoutFixedFooter.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { isToday, parseISO } from 'date-fns';

export default {
  name: 'JumpStartLists',
  components: { BaseAppBarHeader, BaseTabs, BaseTab, JumpStartItem, LayoutFixedFooter, NavigationBottom },
  computed: {
    ...mapGetters('email', ['get_daily_plan']),
    todayPlan() {
      let data = [];
      for (let i = 0; i < this.get_daily_plan.length; i++) {
        if (isToday(parseISO(this.get_daily_plan[i].dateTime))) {
          data.push(this.get_daily_plan[i]);
        }
      }
      return data;
    },
    upcomingPlan() {
      let data = [];
      for (let i = 0; i < this.get_daily_plan.length; i++) {
        if (!isToday(parseISO(this.get_daily_plan[i].dateTime))) {
          data.push(this.get_daily_plan[i]);
        }
      }
      return data;
    }
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
