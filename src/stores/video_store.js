import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useStoreVideo = defineStore('video_store', (TypeOfLike) => {
  const localToken = ref('no_token')
  const link = ref('')
  const statusOfLike = ref(false)

  const postData = async () => {
    const v = { type_of_like: TypeOfLike }
    const res = await axios.post(link.value, v, {
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: `Bearer ${localToken.value}`
      }
    })
    return res
  }
  //isLoggedin.value = true
  function sendLike() {
    link.value = 'http://127.0.0.1:8000/api/like/'
    postData() === 'success'? statusOfLike.value = true : statusOfLike.value = false
  }

  return { sendLike, statusOfLike }
})
