<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Post />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Post from '@/components/Post.vue';

@Component({
  components: {
    Post,
  },
})
export default class AboutView extends Vue {}
</script>
