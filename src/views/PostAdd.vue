<template>
  <div>
    <PageNavigation />
    <div class="w-full max-w-4xl mx-auto">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4">
        <div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="PostAddHeadline">
              Headline
            </label>
            <input
              v-model="headline"
              name="Headline"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="PostAddHeadline"
              type="text"
              placeholder="Write a title"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="PostAddContent">
              Content
            </label>
            <textarea
              v-model="content"
              rows="12"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="PostAddContent"
              type="text"
              placeholder="Write post content"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="PostAddImageUpload">
              Images
            </label>
            <ImageUpload v-model="images" />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="submit()"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PageNavigation from '@/components/PageNavigation.vue';
import ImageUpload from '@/components/ImageUpload/ImageUpload.vue';

export default {
  components: { PageNavigation, ImageUpload },
  name: 'PostAddPage',
  data() {
    return {
      headline: '',
      content: '',
      images: []
    };
  },
  methods: {
    submit() {
      try {
        this.$store.dispatch('post/addItem', {
          body: {
            categoryId: 29,
            headline: 'some headline',
            description: 'some description',
            date: '2020-04-10T15:42:20.253Z',
            price: 0,
            eventDate: '2020-04-10T15:42:20.253Z'
            // images: ['string']
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
