<script setup>
import { ref, onMounted } from 'vue'
defineProps({
video: {
    type: String,
    required: true
  },
})
</script>
<template>
  <div class="card"  style="width: 18rem; padding: 10px; margin: 10px;">
    <a href="/videos/{{ video.id }}">
      <img
        :src="'http://127.0.0.1:8000/storage/video_images/' + video.video_image"
        class="card-img-top imgb"
        alt="..."
      />
    </a>
    <div class="card-body">
      <h5 class="card-title">{{ video.title_of_video }}</h5>
      <p class="card-text">{{ video.user }}</p>
      <p class="card-text pb">
        <i class="bi bi-eye ib">{{ ' ' + video.views }}</i>
        {{ video.created_at }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.imgb {
  width: 260px;
  height: 200px;
}

.pb {
  font-size: 11px;
}
.ib {
  padding-right: 4px;
}
</style>
