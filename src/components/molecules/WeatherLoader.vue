<template>
  <div class="weather-loading">
    <svg
      class="weather-icon"
      width="120"
      height="105"
      viewBox="0 0 120 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_1_2139)" class="sun">
        <circle cx="71.8227" cy="24.2345" r="18.1095" fill="#FFAB0B" />
      </g>

      <foreignObject x="0.875" y="0.544128" width="118.328" height="103.692">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style="
            backdrop-filter: blur(8px);
            clip-path: url(#bgblur_0_1_2139_clip_path);
            height: 100%;
            width: 100%;
          "
        ></div>
      </foreignObject>

      <g filter="url(#filter1_di_1_2139)" data-figma-bg-blur-radius="16" class="cloud">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M44.2864 56.2334C44.204 56.2352 44.1213 56.2361 44.0384 56.2361C37.873 56.2361 32.875 51.2381 32.875 45.0727C32.875 40.8887 35.1768 37.2423 38.5831 35.3308C38.5815 35.2293 38.5807 35.1276 38.5807 35.0257C38.5807 24.8186 46.8552 16.5441 57.0623 16.5441C65.8667 16.5441 73.2332 22.7008 75.0915 30.9438C81.8285 31.2267 87.2033 36.7778 87.2033 43.5843C87.2033 50.5717 81.5389 56.2361 74.5515 56.2361C74.3854 56.2361 74.22 56.2329 74.0554 56.2266V56.2361H44.2864V56.2334Z"
          fill="url(#paint0_radial_1_2139)"
          fill-opacity="0.77"
        />
      </g>

      <g style="mix-blend-mode: soft-light" filter="url(#filter2_di_1_2139)" class="cloud-dark">
        <circle cx="44.0384" cy="45.0727" r="11.1634" fill="#848484" />
      </g>

      <g class="raindrops">
        <path
          class="raindrop"
          d="M57.5919 62.1626C57.8243 61.9431 58.2074 62.0817 58.2435 62.3983L58.5371 64.9759C58.6788 66.2197 57.4583 67.1812 56.2794 66.7547C55.1005 66.3282 54.7873 64.8118 55.7001 63.9496L57.5919 62.1626Z"
          fill="#00D0E2"
        />
        <path
          class="raindrop"
          d="M64.7861 62.1626C65.0185 61.9431 65.4016 62.0817 65.4376 62.3983L65.7312 64.9759C65.8729 66.2197 64.6525 67.1812 63.4735 66.7547C62.2946 66.3282 61.9815 64.8118 62.8943 63.9496L64.7861 62.1626Z"
          fill="#00D0E2"
        />
        <path
          class="raindrop"
          d="M72.4764 62.1626C72.7088 61.9431 73.0919 62.0817 73.128 62.3983L73.4216 64.9759C73.5632 66.2197 72.3428 67.1812 71.1639 66.7547C69.9849 66.3282 69.6718 64.8118 70.5846 63.9496L72.4764 62.1626Z"
          fill="#00D0E2"
        />
        <path
          class="raindrop"
          d="M60.0724 70.1044C60.3044 69.8849 60.6873 70.024 60.7237 70.341L61.0197 72.9212C61.1626 74.1662 59.9443 75.1273 58.7659 74.6992C57.5876 74.271 57.2731 72.753 58.1842 71.891L60.0724 70.1044Z"
          fill="#00D0E2"
        />
        <path
          class="raindrop"
          d="M67.2666 70.1044C67.4986 69.8849 67.8815 70.024 67.9179 70.341L68.2139 72.9212C68.3568 74.1662 67.1385 75.1273 65.9601 74.6992C64.7818 74.271 64.4673 72.753 65.3784 71.891L67.2666 70.1044Z"
          fill="#00D0E2"
        />
      </g>

      <defs>
        <filter
          id="filter0_i_1_2139"
          x="43.7133"
          y="6.125"
          width="46.2189"
          height="49.2189"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-10" dy="13" />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.886275 0 0 0 0 0 0 0 0 0.9 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_2139" />
        </filter>
        <filter
          id="filter1_di_1_2139"
          x="0.875"
          y="0.544128"
          width="118.328"
          height="103.692"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="16" />
          <feGaussianBlur stdDeviation="16" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.2015 0 0 0 0 0.3875 0 0 0 0.2 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2139" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_2139"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="2" />
          <feGaussianBlur stdDeviation="7" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1_2139" />
        </filter>
        <clipPath id="bgblur_0_1_2139_clip_path" transform="translate(-0.875 -0.544128)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M44.2864 56.2334C44.204 56.2352 44.1213 56.2361 44.0384 56.2361C37.873 56.2361 32.875 51.2381 32.875 45.0727C32.875 40.8887 35.1768 37.2423 38.5831 35.3308C38.5815 35.2293 38.5807 35.1276 38.5807 35.0257C38.5807 24.8186 46.8552 16.5441 57.0623 16.5441C65.8667 16.5441 73.2332 22.7008 75.0915 30.9438C81.8285 31.2267 87.2033 36.7778 87.2033 43.5843C87.2033 50.5717 81.5389 56.2361 74.5515 56.2361C74.3854 56.2361 74.22 56.2329 74.0554 56.2266V56.2361H44.2864V56.2334Z"
          />
        </clipPath>
        <filter
          id="filter2_di_1_2139"
          x="24.875"
          y="17.9094"
          width="52.3267"
          height="50.3267"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-2" dy="-10" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2139" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_2139"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="22" dy="12" />
          <feGaussianBlur stdDeviation="11" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.74 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1_2139" />
        </filter>
        <radialGradient
          id="paint0_radial_1_2139"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(52.0176 25.0071) rotate(90.6693) scale(31.2149 35.6204)"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#99CEFF" />
        </radialGradient>
      </defs>
    </svg>

    <div v-if="showLoadingText" class="loading-text">
      {{ loadingText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

const props = withDefaults(
  defineProps<{
    loadingText?: string
    showLoadingText?: boolean
    size?: 'small' | 'medium' | 'large'
  }>(),
  {
    loadingText: 'Loading Weather...',
    showLoadingText: true,
    size: 'medium',
  },
)
</script>

<style scoped>
.weather-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.weather-icon {
  width: 120px;
  height: 105px;
}

/* Size variations */
.weather-loading.small .weather-icon {
  width: 80px;
  height: 70px;
}

.weather-loading.large .weather-icon {
  width: 160px;
  height: 140px;
}

.loading-text {
  font-size: 16px;
  font-weight: 500;
  opacity: 0.8;
  animation: pulse 2s ease-in-out infinite;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.sun {
  animation: rotate 4s linear infinite;
  transform-origin: 71.8227px 24.2345px;
}

.cloud {
  animation: float 3s ease-in-out infinite;
}

.cloud-dark {
  animation: float 3s ease-in-out infinite 0.5s;
}

.raindrop {
  animation: fall 1.5s ease-in infinite;
}

.raindrop:nth-child(2) {
  animation-delay: 0.2s;
}

.raindrop:nth-child(3) {
  animation-delay: 0.4s;
}

.raindrop:nth-child(4) {
  animation-delay: 0.6s;
}

.raindrop:nth-child(5) {
  animation-delay: 0.8s;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes fall {
  0% {
    transform: translateY(-5px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(15px);
    opacity: 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>
