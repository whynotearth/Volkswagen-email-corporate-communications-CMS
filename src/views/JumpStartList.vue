<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader title="JumpStart" :to-link="{ name: 'JumpStart' }" />
    </template>
    <template #content>
      <BaseTabs>
        <BaseTab name="Today" selected="true">
          <div v-for="(plan, index) in todayPlan" :key="index" class="cursor-pointer" @click="selectPlan(plan)">
            <JumpStartItem :model="plan" />
          </div>
          <div v-if="!todayPlan.length" class="py-8">
            <p>
              There is nothing scheduled today.
              <router-link class="text-secondary" :to="{ name: 'ArticleCategorySelection' }"
                >Write some articles to start creating your JumpStart</router-link
              >.
            </p>
          </div>
        </BaseTab>
        <BaseTab name="Upcoming">
          <div v-for="(plan, index) in upcomingPlan" :key="index" class="cursor-pointer" @click="selectPlan(plan)">
            <JumpStartItem :model="plan" />
          </div>
          <div v-if="!upcomingPlan.length" class="py-8">
            <p>
              There is nothing scheduled.
              <router-link class="text-secondary" :to="{ name: 'ArticleCategorySelection' }"
                >Write some articles to start creating your JumpStart</router-link
              >.
            </p>
          </div>
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
  name: 'JumpStartList',
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
        this.$router.push({ name: 'JumpStartEdit', params: { id: plan.jumpStartId } });
      } else {
        this.$router.push({ name: 'JumpStartAdd', params: { date: plan.dateTime } });
      }
    }
  }
};
</script>
