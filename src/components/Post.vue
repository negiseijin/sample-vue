<template>
  <div>
    <v-data-table :headers="headers" :items="item" :items-per-page="5" class="elevation-1"></v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/lib/api';
import { Post as TypePost } from '@/types/sub_system/business/screen';

@Component
export default class Post extends Vue {
  item: TypePost[] = [];
  headers = [
    {
      text: 'ID',
      align: 'start',
      sortable: false,
      value: 'id',
    },
    {
      text: 'Title',
      value: 'title',
    },
    {
      text: 'createdAt',
      value: 'createdAt',
    },
  ];
  fetchGet = async () => {
    const res = await api.get<Array<TypePost>>('post');
    this.item = [...res.data];
    console.log(this.item);
  };

  mounted(): void {
    this.fetchGet();
  }
}
</script>

<style scoped></style>
