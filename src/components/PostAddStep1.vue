<template>
  <div class="py-6 flex-grow">
    <div class="container px-0 md:px-4 text-left">
      <ul class="list-none bg-background">
        <li class="flex items-center text-left cursor-pointer py-1 px-2 active">
          <div class="w-12 h-12">
            <PriorityIcon />
          </div>
          <div class="flex-auto">
            <div class="w-full body-1-mobile">Priority</div>
            <div class="w-full text-xs text-black em-disabled">Top daily announcements</div>
          </div>
        </li>
        <li class="flex items-center text-left cursor-pointer py-1 px-2">
          <div class="w-12 h-12 flex items-center justify-center">
            <AnswerIcon />
          </div>
          <div class="flex-auto">
            <div class="w-full body-1-mobile">Answers At A Glance</div>
            <div class="w-full text-xs text-black em-disabled">Answer commonly-asked questions</div>
          </div>
        </li>
        <li class="flex items-center text-left cursor-pointer py-1 px-2">
          <div class="w-12 h-12 flex items-center justify-center">
            <EventIcon />
          </div>
          <div class="flex-auto">
            <div class="w-full body-1-mobile">Events</div>
            <div class="w-full text-xs text-black em-disabled">Company-wide event announcements</div>
          </div>
        </li>
        <li class="flex items-center text-left cursor-pointer py-1 px-2">
          <div class="w-12 h-12 flex items-center justify-center">
            <PlantIcon />
          </div>
          <div class="flex-auto">
            <div class="w-full body-1-mobile">Plant</div>
            <div class="w-full text-xs text-black em-disabled">Factory-wide reminders and announcements</div>
          </div>
        </li>
        <li class="flex items-center text-left cursor-pointer py-1 px-2">
          <div class="w-12 h-12 flex items-center justify-center">
            <PeopleIcon />
          </div>
          <div class="flex-auto">
            <div class="w-full body-1-mobile">People</div>
            <div class="w-full text-xs text-black em-disabled">Stories and spotlights</div>
          </div>
        </li>
        <li class="flex items-center text-left cursor-pointer py-1 px-2">
          <div class="w-12 h-12 flex items-center justify-center">
            <CommunityIcon />
          </div>
          <div class="flex-auto">
            <div class="w-full body-1-mobile">Community</div>
            <div class="w-full text-xs text-black em-disabled">Company culture, volunteering, and more</div>
          </div>
        </li>
        <li class="flex items-center text-left cursor-pointer py-1 px-2">
          <div class="w-12 h-12 flex items-center justify-center">
            <OneTeamIcon />
          </div>
          <div class="flex-auto">
            <div class="w-full body-1-mobile">One Team</div>
            <div class="w-full text-xs text-black em-disabled">One Team update and announcements</div>
          </div>
        </li>
        <li class="flex items-center text-left cursor-pointer py-1 px-2">
          <div class="w-12 h-12 flex items-center justify-center">
            <AttachmentsIcon />
          </div>
          <div class="flex-auto">
            <div class="w-full body-1-mobile">Attachments</div>
            <div class="w-full text-xs text-black em-disabled">Extra document attachments</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PriorityIcon from '@/assets/priority.svg';
import AnswerIcon from '@/assets/answer.svg';
import EventIcon from '@/assets/event.svg';
import PlantIcon from '@/assets/plant.svg';
import PeopleIcon from '@/assets/people.svg';
import CommunityIcon from '@/assets/community.svg';
import OneTeamIcon from '@/assets/oneteam.svg';
import AttachmentsIcon from '@/assets/attachments.svg';

export default {
  name: 'PostAddStep1',
  components: {
    PriorityIcon,
    AnswerIcon,
    EventIcon,
    PlantIcon,
    PeopleIcon,
    CommunityIcon,
    OneTeamIcon,
    AttachmentsIcon
  }
};
</script>

<style scoped>
.active {
  background: rgba(3, 179, 249, 0.12);
}
</style>
