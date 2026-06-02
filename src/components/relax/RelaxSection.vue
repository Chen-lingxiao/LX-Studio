<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Calendar } from 'lucide-vue-next'
import MusicPlayer from './MusicPlayer.vue'
import { fetchHistoryEvents as apiFetchHistoryEvents, fetchCalendarDay } from '../../utils/api'
import { useAudioPlayer } from '../../composables/useAudioPlayer'

const { songs } = useAudioPlayer()

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})

const historyEvents = ref([])
const calendarData = ref(null)
const isLoading = ref(false)
const hasError = ref(false)
const historyListRef = ref(null)
const touchStartY = ref(0)
const isAtTop = ref(false)
const isAtBottom = ref(false)

const funnyEvents = [
  { year: '2063', title: '人类首次曲速飞行，与瓦肯人首次接触' },
  { year: '2151', title: '进取号NX-01启航，开启人类深空探索' },
  { year: '2161', title: '星际联邦正式成立' },
  { year: '2245', title: '经典进取号NCC-1701正式服役' },
  { year: '2267', title: '联邦与克林贡爆发全面战争' },
  { year: '2365', title: '人类首次遭遇博格文明' },
  { year: '2366', title: '沃尔夫359战役，联邦舰队重创' },
  { year: '2373', title: '博格再度入侵地球，历史险些被改写' },
  { year: '2375', title: '自治领战争结束，银河系格局重塑' },
  { year: '2378', title: '航海家号历经艰险返回地球' }
]

const currentDate = ref(new Date())
const today = computed(() => {
  const date = currentDate.value
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekDay = weekDays[date.getDay()]
  return { year, month, day, weekDay }
})



const fetchHistoryEvents = async () => {
  isLoading.value = true
  hasError.value = false
  const { year, month, day } = today.value

  const [events, calendar] = await Promise.all([
    apiFetchHistoryEvents(month, day),
    fetchCalendarDay(year, month, day)
  ])

  if (events && events.length > 0) {
    historyEvents.value = events.map(event => ({
      year: event.date?.split('年')[0] || '',
      title: event.title
    }))
  } else {
    hasError.value = true
  }

  if (calendar) {
    calendarData.value = calendar
  }

  isLoading.value = false
}

const handleWheel = (event) => {
  const list = historyListRef.value
  if (!list) return

  const scrollTop = list.scrollTop
  const scrollHeight = list.scrollHeight
  const clientHeight = list.clientHeight

  const canScrollUp = scrollTop > 0
  const canScrollDown = scrollTop < scrollHeight - clientHeight - 10

  if (!canScrollUp && event.deltaY < 0) {
    event.preventDefault()
    event.stopPropagation()
  }

  if (!canScrollDown && event.deltaY > 0) {
    event.preventDefault()
    event.stopPropagation()
  }
}

const handleTouchStart = (event) => {
  touchStartY.value = event.touches[0].clientY
}

const handleTouchMove = (event) => {
  const list = historyListRef.value
  if (!list) return

  const touchCurrentY = event.touches[0].clientY
  const deltaY = touchCurrentY - touchStartY.value
  touchStartY.value = touchCurrentY

  const scrollTop = list.scrollTop
  const scrollHeight = list.scrollHeight
  const clientHeight = list.clientHeight

  const canScrollUp = scrollTop > 0
  const canScrollDown = scrollTop < scrollHeight - clientHeight - 10

  if (!canScrollUp && deltaY > 0) {
    event.preventDefault()
    event.stopPropagation()
  }

  if (!canScrollDown && deltaY < 0) {
    event.preventDefault()
    event.stopPropagation()
  }
}

onMounted(() => {
  fetchHistoryEvents()

  const list = historyListRef.value
  if (list) {
    list.addEventListener('wheel', handleWheel, { passive: false })
    list.addEventListener('touchstart', handleTouchStart, { passive: true })
    list.addEventListener('touchmove', handleTouchMove, { passive: false })
  }
})

onUnmounted(() => {
  const list = historyListRef.value
  if (list) {
    list.removeEventListener('wheel', handleWheel)
    list.removeEventListener('touchstart', handleTouchStart)
    list.removeEventListener('touchmove', handleTouchMove)
  }
})
</script>

<template>
  <div class="relax-section">
    <div class="relax-content">
      <div class="relax-header">
        <h2 class="relax-title"></h2>
        <p class="relax-subtitle">𝓛𝓲𝓿𝓮 𝓵𝓸𝓷𝓰 𝓪𝓷𝓭 𝓹𝓻𝓸𝓼𝓹𝓮𝓻</p>
      </div>

      <div class="relax-main">
        <!-- 左侧：音乐播放器 -->
        <div class="music-column">
          <div class="section-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span>音乐</span>
          </div>
          <MusicPlayer :songs="songs" />
        </div>

        <!-- 右侧：日期和历史 -->
        <div class="date-column">
          <!-- 上面：日历日期 -->
          <div class="calendar-area">
            <div class="section-header">
              <Calendar :size="16" />
              <span>今日</span>
            </div>
            <div class="date-display">
              <div class="date-main">
                <span class="date-num">{{ String(today.year) }}</span>
                <span class="date-slash">/</span>
                <span class="date-num">{{ String(today.month).padStart(2, '0') }}</span>
                <span class="date-slash">/</span>
                <span class="date-num">{{ String(today.day).padStart(2, '0') }}</span>
              </div>
              <div class="date-weekday-row">
                <span class="date-weekday">{{ calendarData?.week || today.weekDay }}</span>
                <span v-if="calendarData" class="weekday-divider">|</span>
                <div v-if="calendarData" class="calendar-details">
                  <span v-if="calendarData.gzYear" class="calendar-item">{{ calendarData.gzYear }}</span>
                  <span v-if="calendarData.gzYear && calendarData.gzMonth" class="calendar-divider">·</span>
                  <span v-if="calendarData.gzMonth" class="calendar-item">{{ calendarData.gzMonth }}</span>
                  <span v-if="(calendarData.gzMonth || calendarData.gzYear) && calendarData.gzDate"
                    class="calendar-divider">·</span>
                  <span v-if="calendarData.gzDate" class="calendar-item">{{ calendarData.gzDate }}</span>
                  <span
                    v-if="(calendarData.gzDate || calendarData.gzMonth || calendarData.gzYear) && (calendarData.lMonth || calendarData.lDate)"
                    class="calendar-divider">·</span>
                  <span v-if="calendarData.lMonth && calendarData.lDate" class="calendar-item">农历 {{ calendarData.lMonth
                    }}月{{ calendarData.lDate }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 下面：历史上的今天 -->
          <div class="history-area">
            <div class="section-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>历史上的今天</span>
            </div>
            <div ref="historyListRef" class="history-list custom-scrollbar">
              <template v-if="!hasError">
                <div v-for="(event, index) in historyEvents" :key="index" class="history-item">
                  <span class="history-year">{{ event.year }}年</span>
                  <span class="history-dot">·</span>
                  <span class="history-event">{{ event.title }}</span>
                </div>
              </template>
              <template v-else>
                <div class="loading-text error-text">抱歉服务出错了，暂无数据~</div>
                <div v-for="(event, index) in funnyEvents" :key="'funny-' + index" class="history-item funny-item">
                  <span class="history-year">{{ event.year }}年</span>
                  <span class="history-dot">·</span>
                  <span class="history-event">{{ event.title }}</span>
                </div>
              </template>
              <div v-if="isLoading" class="loading-text">加载中...</div>
            </div>
          </div>

          <!-- 免责声明 -->
          <div class="disclaimer">
            <span>内容来自第三方接口，可能存在误差，仅供参考，不构成史实依据</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.relax-section {
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  z-index: 10;
  position: relative;
}

.relax-content {
  width: 100%;
  max-width: 1200px;
}

.relax-header {
  text-align: center;
  margin-bottom: 40px;
}

.relax-title {
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.2rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.relax-subtitle {
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

.relax-subtitle {
  font-size: 1.1rem;
  color: rgba(224, 242, 254, 0.85);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
}

.relax-main {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(186, 230, 253, 0.9);
  margin-bottom: 20px;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}

/* 左侧音乐列 */
.music-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

/* 右侧日期列 */
.date-column {
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
}

.disclaimer {
  font-size: 0.7rem;
  color: rgba(148, 163, 184, 0.6);
  text-align: center;
  padding-top: 8px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.calendar-area {
  flex-shrink: 0;
}

.history-area {
  flex: 1;
}

.date-display {
  text-align: left;
}

.date-main {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.date-num {
  color: rgba(255, 255, 255, 0.98);
  text-shadow:
    0 0 20px rgba(99, 102, 241, 0.6),
    0 0 40px rgba(56, 189, 248, 0.4),
    0 1px 8px rgba(0, 0, 0, 0.4);
}

.date-slash {
  color: rgba(125, 211, 252, 0.85);
  margin: 0 8px;
  text-shadow: 0 0 10px rgba(125, 211, 252, 0.5);
}

.date-weekday-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.date-weekday {
  font-size: 1.15rem;
  color: rgba(165, 243, 252, 0.9);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}

.weekday-divider {
  color: rgba(165, 243, 252, 0.4);
  font-size: 1rem;
}

.date-message {
  font-size: 1rem;
  color: rgba(253, 224, 71, 0.75);
  text-shadow: 0 0 8px rgba(253, 224, 71, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(253, 224, 71, 0.04);
  border-radius: 20px;
  width: fit-content;
  border: 1px solid rgba(253, 224, 71, 0.12);
}

.date-message::before {
  content: '';
  width: 6px;
  height: 6px;
  background: rgba(253, 224, 71, 0.6);
  border-radius: 50%;
}

.calendar-details {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.15rem;
  color: rgba(165, 243, 252, 0.75);
}

.calendar-item {
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.calendar-divider {
  color: rgba(165, 243, 252, 0.4);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 300px;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.history-list::-webkit-scrollbar {
  width: 4px;
}

.history-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 2px;
}

.history-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}

.history-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.history-item:last-child {
  border-bottom: none;
}

.history-year {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(96, 165, 250, 0.9);
  min-width: 65px;
  flex-shrink: 0;
  text-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
}

.history-dot {
  color: rgba(125, 211, 252, 0.8);
  flex-shrink: 0;
}

.history-event {
  font-size: 0.95rem;
  color: rgba(241, 245, 249, 0.9);
  line-height: 1.6;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.loading-text {
  color: rgba(125, 211, 252, 0.8);
  font-size: 0.9rem;
  padding: 12px 0;
}

.error-text {
  color: rgba(251, 191, 36, 0.9);
  font-style: italic;
  margin-bottom: 8px;
}

.funny-item .history-event {
  color: rgba(167, 139, 250, 0.85);
}

@media (max-width: 900px) {
  .relax-main {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .date-column {
    order: -1;
  }
}

@media (max-width: 768px) {
  .relax-title {
    font-size: 1.8rem;
  }

  .date-main {
    font-size: 1.8rem;
  }
}
</style>