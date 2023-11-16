<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const localToken = ref('no_token')
const video = ref([])
const list_of_videos = ref([])
const link = ref(`http://127.0.0.1:8000/api/video/${ route.params.id }`)

const getData = async () => {
  const v = { categories: 'all' }
  const res = await axios.get(link.value, v, {
    headers: {
      Accept: 'application/json',
      //'Content-Type': 'application/json',
      Authorization: `Bearer ${localToken.value}`
    }
  })
  console.log(res.data)
  video.value = res.data.data   
}
 
  const getDataOptionsOfVideos = async () => {
  const v = { categories: 'all' }
  const resOptionsOfVideos = await axios.get(`${ link.value }/options_of_videos`, v, {
    headers: {
      Accept: 'application/json',
      //'Content-Type': 'application/json',
      Authorization: `Bearer ${localToken.value}`
    }
  })
  console.log(resOptionsOfVideos.data)
  list_of_videos.value  = resOptionsOfVideos.data;
}
onMounted( getData )
onMounted( getDataOptionsOfVideos )
</script>

<template>
            <table>
            <tr>
                <td style="vertical-align: top;">
                   <video width="800" height="350" style="margin-top: 0px;" controls>
                        <source src="" type="video/mp4">
                    </video>   <br />
                    <h2>{{ video.title_of_video }}</h2>
                    <br />
                    <div>
                        <div v-for="comment in video.comments" class="card w-75 mb-3" style="background-color: #D6DCD7; width: 800px;">
                            <div class="card-body">
                                <p class="card-text">{{ comment.comment }}</p>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div>
                        <div v-for="video in list_of_videos" class="card" style="width: 18rem; padding: 10px; margin: 10px;">
                            <a 
                            :href="`/video/${ video.id }`">
                            <img 
                            :src="`http://127.0.0.1:8000/storage/video_images/${ video.video_image }`"
                              class="card-img-top"
                              style="width: 260px; height: 200px;"
                              alt="...">
                            </a>
                            <div class="card-body">
                                <h5 class="card-title">{{ video.title_of_video }}</h5>
                                <p class="card-text">{{ video.user_id }}</p>
                                <p class="card-text" style="font-size: 11px;">
                                <i class="bi bi-eye" style="padding-right: 4px;">{{ video.views }}</i> {{ video.created_at }}
                                </p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
</template>