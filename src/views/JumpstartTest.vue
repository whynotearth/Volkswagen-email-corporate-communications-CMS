<template>
  <div>
    <PageNavigation />
    <div class="w-full max-w-4xl mx-auto">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4">
        <div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="SubjectInput">
              Subject
            </label>
            <input
              v-model="subjectInput"
              name="Subject"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="SubjectInput"
              type="text"
              placeholder="Write subject"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="DateInput">
              Date
            </label>
            <input
              v-model="dateInput"
              name="DateInput"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Subject"
              type="text"
              placeholder="Write date"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="ToInput">
              To
            </label>
            <input
              v-model="toInput"
              name="ToInput"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ToInput"
              type="text"
              placeholder="To"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="DescriptionInput">
              Description
            </label>
            <textarea
              v-model="descriptionInput"
              rows="12"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="DescriptionInput"
              type="text"
              placeholder="Write description"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="submit()"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PageNavigation from '@/components/PageNavigation.vue';

export default {
  components: { PageNavigation },
  name: 'JumpstartTest',
  data() {
    return {
      descriptionInput: '',
      toInput: '',
      subjectInput: '',
      dateInput: ''
    };
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch('jumpstart/test', {
          params: {
            body: {
              date: this.dateInput,
              description: this.descriptionInput,
              to: this.toInput,
              subject: this.subjectInput
            }
          }
        });
        alert('Successfully sent');
      } catch (error) {
        alert('Not sent, an error occured.');

        console.log(error);
      }
    }
  }
};
</script>
