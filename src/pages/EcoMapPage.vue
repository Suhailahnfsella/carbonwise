<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { ref, onMounted, shallowRef, computed } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const jatimDistricts = ref([])
const showLocationPrompt = ref(false)
const userLocation = ref(null)
const map = shallowRef(null)
const sortOrder = ref('desc')
let geojsonLayer = null

const carbonData = {
  "Bangkalan": { current: 2.8, previous: 2.9 },
  "Banyuwangi": { current: 2.5, previous: 2.6 },
  "Blitar": { current: 2.7, previous: 2.7 },
  "Bojonegoro": { current: 3.0, previous: 2.8 },
  "Bondowoso": { current: 2.4, previous: 2.5 },
  "Gresik": { current: 3.2, previous: 3.0 },
  "Jember": { current: 2.6, previous: 2.7 },
  "Jombang": { current: 2.9, previous: 2.8 },
  "Kediri": { current: 3.1, previous: 3.0 },
  "Lamongan": { current: 2.7, previous: 2.6 },
  "Lumajang": { current: 2.5, previous: 2.4 },
  "Madiun": { current: 2.8, previous: 2.9 },
  "Magetan": { current: 2.4, previous: 2.5 },
  "Malang": { current: 2.9, previous: 2.8 },
  "Mojokerto": { current: 3.0, previous: 2.9 },
  "Nganjuk": { current: 2.6, previous: 2.7 },
  "Ngawi": { current: 2.5, previous: 2.6 },
  "Pacitan": { current: 2.3, previous: 2.4 },
  "Pamekasan": { current: 2.4, previous: 2.3 },
  "Pasuruan": { current: 3.1, previous: 3.0 },
  "Ponorogo": { current: 2.5, previous: 2.6 },
  "Probolinggo": { current: 2.8, previous: 2.9 },
  "Sampang": { current: 2.4, previous: 2.5 },
  "Sidoarjo": { current: 3.3, previous: 3.1 },
  "Situbondo": { current: 2.3, previous: 2.4 },
  "Sumenep": { current: 2.4, previous: 2.5 },
  "Trenggalek": { current: 2.4, previous: 2.5 },
  "Tuban": { current: 2.7, previous: 2.8 },
  "Tulungagung": { current: 2.6, previous: 2.7 },
  "Surabaya": { current: 3.5, previous: 3.3 },
  "Batu": { current: 2.8, previous: 2.7 },
  "Kediri Kota": { current: 3.0, previous: 2.9 },
  "Madiun Kota": { current: 2.9, previous: 2.8 },
  "Malang Kota": { current: 2.8, previous: 2.7 },
  "Mojokerto Kota": { current: 2.9, previous: 2.8 },
  "Pasuruan Kota": { current: 3.0, previous: 2.9 },
  "Probolinggo Kota": { current: 2.9, previous: 2.8 },
  "Blitar Kota": { current: 2.7, previous: 2.6 }
}

const getColorByCarbon = (value) => {
  return value > 3.2 ? '#d73027' :
    value > 2.9 ? '#fc8d59' :
      value > 2.6 ? '#fee08b' :
        value > 2.3 ? '#d9ef8b' :
          '#91cf60'
}

const getTrend = (current, previous) => {
  if (current > previous) return { direction: 'up', text: '↑ Meningkat', color: 'text-red-500' }
  if (current < previous) return { direction: 'down', text: '↓ Menurun', color: 'text-green-500' }
  return { direction: 'stable', text: '→ Stabil', color: 'text-gray-500' }
}

const styleFeature = (feature) => {
  const districtName = feature.properties.WADMKK || feature.properties.NAMOBJ
  const carbonValue = carbonData[districtName]?.current || 2.5

  return {
    fillColor: getColorByCarbon(carbonValue),
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  }
}

const sortedDistricts = computed(() => {
  return [...jatimDistricts.value].sort((a, b) => {
    return sortOrder.value === 'desc'
      ? b.carbonFootprint - a.carbonFootprint
      : a.carbonFootprint - b.carbonFootprint
  })
})

const highlightFeature = (e) => {
  const layer = e.target
  layer.setStyle({
    weight: 3,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.9
  })
  layer.bringToFront()
}

const initMap = async () => {
  map.value = L.map('map-container').setView([-7.8, 112.8], 8)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map.value)

  try {
    const response = await fetch('/RBIJAWATIMUR.geojson')
    const geoData = await response.json()

    geojsonLayer = L.geoJson(geoData, {
      style: styleFeature,
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: highlightFeature,
          mouseout: e => geojsonLayer.resetStyle(e.target),
          click: e => map.value.fitBounds(e.target.getBounds())
        })

        const districtName = feature.properties.WADMKK || feature.properties.NAMOBJ
        const data = carbonData[districtName] || { current: 2.5, previous: 2.5 }
        const trend = getTrend(data.current, data.previous)

        layer.bindPopup(`
          <b>${districtName}</b><br>
          Jejak Karbon: ${data.current.toFixed(1)} ton/kapita<br>
          Tren: <span class="${trend.color}">${trend.text}</span>
        `)
      }
    }).addTo(map.value)

    jatimDistricts.value = geoData.features.map(feature => {
      const districtName = feature.properties.WADMKK || feature.properties.NAMOBJ
      const data = carbonData[districtName] || { current: 2.5, previous: 2.5 }
      const trend = getTrend(data.current, data.previous)

      let lat = -7.8, lng = 112.8
      if (feature.geometry?.coordinates?.[0]?.[0]) {
        const coords = feature.geometry.coordinates[0][0]
        const center = coords.reduce((acc, [lng, lat]) => {
          acc.lng += lng
          acc.lat += lat
          return acc
        }, { lng: 0, lat: 0 })
        lng = center.lng / coords.length
        lat = center.lat / coords.length
      }

      return {
        id: feature.properties.OBJECTID,
        name: districtName,
        carbonFootprint: data.current,
        trend: trend,
        lat: lat,
        lng: lng
      }
    })

    addLegend()
  } catch (error) {
    console.error('Gagal memuat GeoJSON:', error)
  }
}

const addLegend = () => {
  const legend = L.control({ position: 'bottomright' })

  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'info legend')
    const grades = [2.3, 2.6, 2.9, 3.2]

    div.innerHTML = '<div style="padding:6px 8px;background:white;"><b>Jejak Karbon (ton/kapita)</b></div>'

    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
        `<i style="background:${getColorByCarbon(grades[i] + 0.1)}"></i> ${grades[i]}${grades[i + 1] ? `–${grades[i + 1]}` : '+'}<br>`
    }

    return div
  }

  legend.addTo(map.value)
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
}

onMounted(() => {
  initMap()
  showLocationPrompt.value = true
})

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        showLocationPrompt.value = false
        addUserLocationMarker()
      },
      (error) => {
        console.error("Gagal mendapatkan lokasi:", error)
        showLocationPrompt.value = false
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  } else {
    alert("Browser tidak mendukung geolokasi")
    showLocationPrompt.value = false
  }
}

const addUserLocationMarker = () => {
  if (!map.value || !userLocation.value) return

  const userIcon = L.divIcon({
    className: 'user-location-marker',
    html: `<div class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></div>
           <div class="relative inline-flex rounded-full h-4 w-4 bg-blue-600"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })

  L.marker([userLocation.value.lat, userLocation.value.lng], {
    icon: userIcon,
    zIndexOffset: 1000
  })
    .addTo(map.value)
    .bindPopup('<b>Lokasi Anda Saat Ini</b>')
    .openPopup()

  map.value.flyTo([userLocation.value.lat, userLocation.value.lng], 13, {
    animate: true,
    duration: 1
  })
}

const acceptLocation = () => getLocation()
const rejectLocation = () => {
  showLocationPrompt.value = false
}
</script>

<template>
  <DashboardLayout>
    <template #title>
      <span class="text-primaryblue">Eco</span><span class="text-darkgreen">Map</span>
    </template>

    <template #description>
      <h3 class="text-xl font-semibold text-primaryblue mt-1 mb-1">Visualisasi Jejak Karbon</h3>
      <p class="text-sm"><b>Peta ini menampilkan distribusi jejak karbon di Jawa Timur</b> berdasarkan data aktivitas
        pengguna.
        <b class="text-secondaryblue">Gunakan tombol sortir</b> untuk mengurutkan dari nilai tertinggi atau terendah.
      </p>
    </template>

    <div v-if="showLocationPrompt" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-xl max-w-md mx-6">
        <h3 class="text-lg text-primaryoranye font-semibold mb-2">Izin Lokasi</h3>
        <p class="mb-4 text-gray-700">Izinkan akses lokasi untuk pengalaman lebih baik</p>
        <div class="flex justify-end space-x-3">
          <button @click="rejectLocation"
            class="px-4 py-2 border border-primaryoranye hover:border-primaryoranye/80 text-primaryoranye hover:text-primaryoranye/80 cursor-pointer rounded-lg">Nanti</button>
          <button @click="acceptLocation"
            class="px-4 py-2 bg-primaryoranye hover:bg-secondaryoranye text-white rounded-lg">Izinkan</button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white p-4 rounded-lg shadow lg:col-span-2 h-[500px]">
        <div id="map-container" class="h-full w-full rounded z-0"></div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="sticky top-0 z-10 bg-white p-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-lg text-darkblue">Data Jejak Karbon</h3>
            <button @click="toggleSortOrder" :class="{
              'bg-primaryoranye text-white hover:bg-secondaryorange': sortOrder === 'desc',
              'bg-semigreen text-white hover:bg-greenlight': sortOrder === 'asc'
            }" class="px-3 py-1 text-sm rounded transition-colors duration-200">
              {{ sortOrder === 'desc' ? 'Tertinggi' : 'Terendah' }}
            </button>
          </div>
        </div>

        <div class="overflow-y-auto max-h-[500px] p-4">
          <div class="space-y-2">
            <div v-for="district in sortedDistricts" :key="district.id"
              class="p-3 border border-gray-300 rounded-lg hover:shadow-md cursor-pointer transition-colors"
              @mouseenter="$event => map.setView([district.lat, district.lng], 10)">
              <div class="flex justify-between items-center">
                <span class="font-medium text-darkblue">{{ district.name }}</span>
                <span :style="{ color: getColorByCarbon(district.carbonFootprint) }" class="font-bold">
                  {{ district.carbonFootprint.toFixed(1) }} ton
                </span>
              </div>
              <div class="mt-1 text-sm flex items-center">
                <span class="text-gray-500 mr-1">Status:</span>
                <span :class="district.trend.color">
                  {{ district.trend.text }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style>
.leaflet-popup-content {
  font-family: 'poppins';
  font-size: 13px;
  line-height: 1.5;
}

.leaflet-popup-content b {
  color: darkblue;
}

.info {
  padding: 6px 8px;
  font: 14px/16px Arial, sans-serif;
  background: white;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.legend {
  line-height: 18px;
  color: #555;
}

.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
  clear: both;
}
</style>
