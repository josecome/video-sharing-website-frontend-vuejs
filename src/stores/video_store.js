import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useStoreVideo = defineStore('video_store', () => {
  const localToken = ref('no_token')
  const link = ref('')
  const statusOfLike = ref(false)
  const SourceType = ref('')
  const SourceId = ref(0)
  const TypeOfLike = ref('')

  const postData = async () => {
    const v = { source_type: SourceType.value, source_id: SourceId.value, type_of_like: TypeOfLike.value }
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

  return { sendLike, statusOfLike, SourceType, SourceId, TypeOfLike }
})
