<template>
  <BaseDropdown
    class="relative dropdown-text__align-left"
    placeholder="Schedule: No time selected"
    :options="time_slots"
    v-model="selectedTime"
  >
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
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown';

export default {
  name: 'TimePicker',
  components: { BaseDropdown },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      selectedTime: null
    };
  },
  computed: {
    time_slots() {
      let time = [];
      let d = new Date('00:00');
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
      return time;
    }
  },
  methods: {
    millisecondToTime(duration) {
      let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      return hours + ':' + minutes;
    }
  },
  watch: {
    selectedTime(value) {
      this.$emit('change', this.millisecondToTime(value));
    }
  }
};
</script>

<style>
.dropdown-text__align-left div.items-strech,
.dropdown-text__align-left .option {
  text-align: left;
}
</style>
