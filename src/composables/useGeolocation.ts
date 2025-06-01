import { ref, onMounted } from 'vue'

export const useGeolocation = () => {
  const coords = ref<{ lat: number; lon: number } | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const fetchLocation = () => {
    loading.value = true

    if (!navigator.geolocation) {
      error.value = 'Geolocation is not supported by your browser'
      loading.value = false
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords.value = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
        console.log('this rans')
        loading.value = false
      },
      (err) => {
        error.value = err.message
        loading.value = false
      },
    )
  }

  onMounted(() => {
    // fetchLocation()
  })

  return {
    coords,
    error,
    loading,
    fetchLocation,
  }
}
