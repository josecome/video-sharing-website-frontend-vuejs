<script setup>
import { ref, onMounted, onBeforeMount, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const localToken = ref('no_token')
const video = ref([])
const video_like = ref(0)
const video_love = ref(0)
const video_sad = ref(0)

import { useStoreVideo } from '@/stores/video_store'
import { storeToRefs } from 'pinia'
const video_store = useStoreVideo()
const { statusOfLike, SourceType, SourceId, TypeOfLike } = storeToRefs(video_store)
const list_of_videos = ref([1, 2, 3, 4])

const link = ref(`http://127.0.0.1:8000/api/video/${route.params.id}`)

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
  video_like.value = Object.keys(res.data.data.likes.filter(v => v.type === 'like')).length;
  video_love.value = Object.keys(res.data.data.likes.filter(v => v.type === 'love')).length;
  video_sad.value = Object.keys(res.data.data.likes.filter(v => v.type === 'sad')).length;
}

const getDataOptionsOfVideos = async () => {
  const v = { categories: 'all' }
  const resOptionsOfVideos = await axios.get(`${link.value}/options_of_videos`, v, {
    headers: {
      Accept: 'application/json',
      //'Content-Type': 'application/json',
      Authorization: `Bearer ${localToken.value}`
    }
  })
  //console.log(resOptionsOfVideos.data)
  list_of_videos.value = resOptionsOfVideos.data
}
async function sendData(type_of_like, source_type, source_id) {
  SourceType.value = source_type
  SourceId.value = source_id
  TypeOfLike = type_of_like
  video_store.sendLike
}
onBeforeMount(getData)
onBeforeMount(getDataOptionsOfVideos)
</script>

<template>
  <table>
    <tr>
      <td style="vertical-align: top">
        <video width="800" height="350" style="margin-top: 0px" controls>
          <source src="" type="video/mp4" />
        </video>
        <br />
        <h2>{{ video.title_of_video }}</h2>
        <table>
          <tr>
            <td>
              <a :href="''" class="userstylepic" style="text-decoration: none;">
                <strong style="color: white">
                  {{ video.user.split('')[0] }}
                </strong>
              </a>
              <span style="font-size: 22px; font-weight: bold;">{{ video.title_of_video }}</span><br />
              <i class="bi bi-eye ib">{{ ' ' + video.views }}</i>
            </td>
            <td style="width: 300px; text-align: right;">
              <button 
              style="margin-right: 20px; padding: 8px; border: 1px solid gray; border-radius: 26px; background-color: #6D6D6C; color: white;">
                Subscribe
              </button>
              <i class="bi bi-hand-thumbs-up" @click="() => sendData('like', 'video', `${ video.id }`)" style="padding-right: 10px">
                {{ video_like }}
              </i>
              <i class="bi bi bi-heart" @click="() => sendData('love', 'video', `${ video.id }`)" style="padding-right: 10px">
                {{ video_love }}
              </i>
              <i class="bi bi-hand-thumbs-down" @click="() => sendData('sad', 'video', `${ video.id }`)" style="padding-right: 10px">
                {{ video_sad }}
              </i>
            </td>
          </tr>
        </table>
        <br />
        <div>
          <div class="card-body divcommentstyle container">
            <a :href="''" class="userstylepic2" style="text-decoration: none;">
                <strong style="color: white">
                  {{ video.user.split('')[0] }}
                </strong>
              </a>
            <input
                  type="text"
                  class="commentcontent"
                  onChange="(e) => { setPostCommenttxt(e.target.value)}"
                  placeholder="Write a comment..."
                />
                <button type="button" class="btn btn-light" style="margin-left: 10px; font-style: italic;">Post</button>
            </div>
          <div
            v-for="comment in video.comments"
            class="card w-75 mb-3"
            style="background-color: #d6dcd7; width: 800px"
          >
            <div class="card-body">
              <p class="card-text">{{ comment.comment }}</p>
              <br />
              <i class="bi bi-hand-thumbs-up" @click="() => sendData('like', 'comment', `${ comment.id }`)" style="padding-right: 10px">
                {{ Object.keys(comment.likes.filter((like) => like.type === 'like')).length }}
              </i>
              <i class="bi bi bi-heart" @click="() => sendData('love', 'comment', `${ comment.id }`)" style="padding-right: 10px">
                {{ Object.keys(comment.likes.filter((like) => like.type === 'love')).length }}
              </i>
              <i class="bi bi-hand-thumbs-down" @click="() => sendData('sad', 'comment', `${ comment.id }`)" style="padding-right: 10px">
                {{ Object.keys(comment.likes.filter((like) => like.type === 'sad')).length }}
              </i>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div>
          <div
            v-for="video in list_of_videos"
            class="card"
            style="width: 18rem; padding: 10px; margin: 10px"
          >
            <a :href="`/video/${video.id}`">
              <img
                :src="`http://127.0.0.1:8000/storage/video_images/${video.video_image}`"
                class="card-img-top"
                style="width: 260px; height: 200px"
                alt="..."
              />
            </a>
            <div class="card-body">
              <h5 class="card-title">{{ video.title_of_video }}</h5>
              <p class="card-text">{{ video.user.name }}</p>
              <p class="card-text" style="font-size: 11px">
                <i class="bi bi-eye" style="padding-right: 4px">{{ video.views }}</i>
                {{ `${ video.created_at.split('-')[2].charAt(0)}${ video.created_at.split('-')[2].charAt(1)}/${ video.created_at.split('-')[1]}/${ video.created_at.split('-')[0]}` }}
              </p>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>
