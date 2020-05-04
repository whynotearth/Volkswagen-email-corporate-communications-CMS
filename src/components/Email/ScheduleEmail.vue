<template>
  <div class="py-6 flex-grow">
    <div class="container px-4 text-left">
      <div class="flex relative">
        <div class="flex-auto">
          <BaseDropdown placeholder="Schedule time" :options="time_slots" v-model="$v.schedule_time.$model">
            <template #title="{ selectedOption }">
              <span v-if="time_slots.length === 0" class="text-gray-500">
                No time slots!
              </span>
              <span v-else-if="selectedOption">
                Schedule
                <span class="ml-2 em-medium">
                  {{ millisecondToTime(selectedOption) }}
                </span>
              </span>
            </template>
            <template #option="{ option }">
              <span>
                {{ millisecondToTime(option) }}
              </span>
            </template>
          </BaseDropdown>
        </div>
        <p v-if="$v.schedule_time.$error" class="text-xs text-error">
          Please select time.
        </p>
      </div>
      <div class="bg-brand-gradient h-full p-8">
        <div class="mx-auto max-w-sm">
          <img v-if="get_preview_link.length > 0" :src="get_preview_link" @error="update_preview_link('')" />
          <Logo v-else class="mx-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown';
import Logo from '@/assets/white_logo.svg';
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ScheduleEmail',
  components: { BaseDropdown, Logo },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    schedule_time: {
      required
    }
  },
  mounted() {
    if (this.get_postIds.length === 0) return this.$router.push({ name: 'EmailsAdd', params: { step: 2 } });
  },
  computed: {
    ...mapGetters('email', ['get_schedule_time', 'get_preview_link', 'get_email_date', 'get_postIds']),
    schedule_time: {
      get() {
        return this.get_schedule_time;
      },
      set(value) {
        this.update_schedule_time(value);
      }
    },
    time_slots() {
      let time = [];
      if (this.get_email_date) {
        let d = new Date(this.get_email_date);
        let start = 800;
        let end = 2400;
        let startHours = Math.floor(start / 100) * 3600000;
        let endHours = Math.floor(end / 100) * 3600000;
        let startMinutes = (start % 100) * 60000;
        let endMinutes = (end % 100) * 60000;
        let startTime = startHours + startMinutes;
        let endTime = endHours + endMinutes;
        d.setHours(0, 0, 0, 0);
        if (Date.now() > d.getTime()) startTime = Date.now() - d.getTime() + 900000;
        for (let i = startTime; i <= endTime; i += 900000) {
          time.push(i);
        }
      }
      return time;
    }
  },
  methods: {
    ...mapMutations('email', ['update_schedule_time', 'update_preview_link']),
    millisecondToTime(duration) {
      let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      return hours + ':' + minutes;
    }
  }
};
</script>

<style></style>
