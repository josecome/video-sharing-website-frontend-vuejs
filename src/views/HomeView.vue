<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import axios from 'axios'
import Cart from '../components/Cart.vue'

const localToken = ref('no_token')
const list_of_video = ref([1, 2, 3])
const link = ref('http://127.0.0.1:8000/api/')

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
  list_of_video.value = res.data
  //console.log(res)
}

onBeforeMount(getData)
</script>

<template>
  <main>
    <div>
      <div
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
        style="color: #0606a7; width: 100%; background-color: #d6dcd7; border-radius: 32px"
      >
        <Cart v-for="v in list_of_video" :video="v" />
      </div>
    </div>
  </main>
</template>
