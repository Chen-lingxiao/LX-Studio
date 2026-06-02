<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-vue-next';
import { useAudioPlayer } from '../../composables/useAudioPlayer';

const {
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  currentIndex,
  playMode,
  togglePlay,
  playByIndex,
  seekTo,
  toggleMute,
  setVolume,
  skipToPrev: globalSkipToPrev,
  skipToNext: globalSkipToNext,
  setPlayMode
} = useAudioPlayer();

const props = defineProps({
  songs: {
    type: Array,
    default: () => []
  }
});

const repeatMode = ref('off');
const isShuffle = ref(false);
const progressRef = ref(null);
const playlistRef = ref(null);
const touchStartY = ref(0);

const formattedCurrentTime = computed(() => formatTime(currentTime.value));
const formattedDuration = computed(() => formatTime(duration.value));
const progressPercent = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function handleSkipToPrev() {
  globalSkipToPrev();
}

function handleSkipToNext() {
  globalSkipToNext();
}

function handlePlaylistClick(index) {
  playByIndex(index);
}

function handleSeekTo(event) {
  if (progressRef.value) {
    const rect = progressRef.value.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    seekTo(percent);
  }
}

function adjustVolume(event) {
  const target = event.target;
  const rect = target.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  setVolume(Math.max(0, Math.min(100, percent * 100)));
}

function toggleRepeat() {
  const modes = ['off', 'repeat', 'repeatOne'];
  const currentModeIndex = modes.indexOf(repeatMode.value);
  repeatMode.value = modes[(currentModeIndex + 1) % modes.length];
  if (repeatMode.value !== 'off') {
    isShuffle.value = false;
    setPlayMode('repeat');
  }
}

function toggleShuffle() {
  isShuffle.value = !isShuffle.value;
  if (isShuffle.value) {
    repeatMode.value = 'off';
    setPlayMode('shuffle');
  } else {
    setPlayMode('repeat');
  }
}

function handlePlaylistWheel(event) {
  const list = playlistRef.value;
  if (!list) return;
  
  const scrollTop = list.scrollTop;
  const scrollHeight = list.scrollHeight;
  const clientHeight = list.clientHeight;
  
  const canScrollUp = scrollTop > 0;
  const canScrollDown = scrollTop < scrollHeight - clientHeight - 10;
  
  if (!canScrollUp && event.deltaY < 0) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  if (!canScrollDown && event.deltaY > 0) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function handlePlaylistTouchStart(event) {
  touchStartY.value = event.touches[0].clientY;
}

function handlePlaylistTouchMove(event) {
  const list = playlistRef.value;
  if (!list) return;
  
  const touchCurrentY = event.touches[0].clientY;
  const deltaY = touchCurrentY - touchStartY.value;
  touchStartY.value = touchCurrentY;
  
  const scrollTop = list.scrollTop;
  const scrollHeight = list.scrollHeight;
  const clientHeight = list.clientHeight;
  
  const canScrollUp = scrollTop > 0;
  const canScrollDown = scrollTop < scrollHeight - clientHeight - 10;
  
  if (!canScrollUp && deltaY > 0) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  if (!canScrollDown && deltaY < 0) {
    event.preventDefault();
    event.stopPropagation();
  }
}

onMounted(() => {
  const list = playlistRef.value;
  if (list) {
    list.addEventListener('wheel', handlePlaylistWheel, { passive: false });
    list.addEventListener('touchstart', handlePlaylistTouchStart, { passive: true });
    list.addEventListener('touchmove', handlePlaylistTouchMove, { passive: false });
  }
});

onUnmounted(() => {
  const list = playlistRef.value;
  if (list) {
    list.removeEventListener('wheel', handlePlaylistWheel);
    list.removeEventListener('touchstart', handlePlaylistTouchStart);
    list.removeEventListener('touchmove', handlePlaylistTouchMove);
  }
});
</script>

<template>
  <div class="music-player">
    <div class="player-content">
      <!-- 歌曲信息 -->
      <div class="song-info" v-if="currentSong">
        <div class="album-cover">
          <img :src="currentSong.cover" :alt="currentSong.name" />
          <div class="cover-overlay" :class="{ playing: isPlaying }">
            <div class="wave-animation" v-if="isPlaying">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="song-details">
          <h3 class="song-name">{{ currentSong.name }}</h3>
          <p class="song-artist">{{ currentSong.artist }}</p>
        </div>
      </div>
      
      <!-- 进度条 -->
      <div class="progress-container">
        <span class="time current">{{ formattedCurrentTime }}</span>
        <div ref="progressRef" class="progress-bar" @click="handleSeekTo">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }">
            <div class="progress-thumb"></div>
          </div>
        </div>
        <span class="time duration">{{ formattedDuration }}</span>
      </div>
      
      <!-- 控制按钮和音量 -->
      <div class="controls-container">
        <!-- 音量控制 -->
        <div class="volume-control">
          <button class="volume-btn" @click="toggleMute">
            <VolumeX v-if="isMuted" :size="16" />
            <Volume2 v-else :size="16" />
          </button>
          <div class="volume-bar" @click="adjustVolume">
            <div class="volume-fill" :style="{ width: (isMuted ? 0 : volume) + '%' }"></div>
          </div>
        </div>
        
        <!-- 控制按钮 -->
        <div class="controls">
          <button class="control-btn" @click="toggleShuffle" :class="{ active: isShuffle }">
            <Shuffle :size="18" />
          </button>
          <button class="control-btn" @click="handleSkipToPrev">
            <SkipBack :size="20" />
          </button>
          
          <button class="play-btn" @click="togglePlay">
            <Play v-if="!isPlaying" :size="28" />
            <Pause v-else :size="28" />
          </button>
          
          <button class="control-btn" @click="handleSkipToNext">
            <SkipForward :size="20" />
          </button>
          <button class="control-btn" @click="toggleRepeat" :class="{ active: repeatMode !== 'off' }">
            <Repeat :size="18" :class="{ 'repeat-all': repeatMode === 'repeat', 'repeat-one': repeatMode === 'repeatOne' }" />
          </button>
        </div>
      </div>
      
      <!-- 播放列表 -->
      <div 
        ref="playlistRef"
        class="playlist custom-scrollbar"
        @wheel="handlePlaylistWheel"
        @touchstart="handlePlaylistTouchStart"
        @touchmove="handlePlaylistTouchMove"
      >
        <div 
          v-for="(song, index) in songs" 
          :key="index" 
          class="playlist-item"
          :class="{ active: index === currentIndex, playing: index === currentIndex && isPlaying }"
          @click="handlePlaylistClick(index)"
        >
          <div class="playlist-number">{{ index + 1 }}</div>
          <div class="playlist-info">
            <span class="playlist-name">{{ song.name }}</span>
            <span class="playlist-artist">{{ song.artist }}</span>
          </div>
        </div>
      </div>
      
      <!-- 版权信息 -->
      <div class="copyright">
        <span>音乐来源 Pixabay，遵循 Pixabay 内容许可协议</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.music-player {
  width: 100%;
  height: 100%;
}

.player-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.song-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.album-cover {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wave-animation {
  display: flex;
  gap: 4px;
}

.wave-animation span {
  width: 3px;
  height: 22px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  animation: wave 0.8s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.8);
}

.wave-animation span:nth-child(2) {
  animation-delay: 0.1s;
}

.wave-animation span:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes wave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
}

.song-details {
  flex: 1;
  overflow: hidden;
}

.song-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 6px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
}

.song-artist {
  font-size: 0.9rem;
  color: rgba(148, 163, 184, 0.9);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 14px;
}

.time {
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.9);
  min-width: 45px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
  border-radius: 3px;
  position: relative;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

.progress-thumb {
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.control-btn {
  background: transparent;
  border: none;
  color: rgba(148, 163, 184, 0.9);
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  color: rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.08);
}

.control-btn.active {
  color: rgba(99, 102, 241, 0.95);
}

.play-btn {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.85), rgba(139, 92, 246, 0.85));
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.98);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 25px rgba(99, 102, 241, 0.4);
  transition: all 0.2s ease;
}

.play-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
}

.controls-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 130px;
  position: absolute;
  left: 0;
}

.volume-btn {
  background: transparent;
  border: none;
  color: rgba(148, 163, 184, 0.9);
  cursor: pointer;
  padding: 5px;
}

.volume-btn:hover {
  color: rgba(255, 255, 255, 0.95);
}

.volume-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  cursor: pointer;
}

.volume-fill {
  height: 100%;
  background: rgba(99, 102, 241, 0.85);
  border-radius: 2px;
  transition: width 0.1s linear;
}

.playlist {
  flex: 1;
  min-height: 120px;
  max-height: 280px;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.playlist::-webkit-scrollbar {
  width: 4px;
}

.playlist::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 2px;
}

.playlist::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.playlist-item:last-child {
  border-bottom: none;
}

.playlist-item:hover {
  background: rgba(255, 255, 255, 0.03);
  padding-left: 8px;
}

.playlist-item.active {
  background: rgba(125, 211, 252, 0.05);
}

.playlist-item.active:hover {
  padding-left: 8px;
}

.playlist-number {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(148, 163, 184, 0.7);
  font-size: 0.75rem;
  font-weight: 500;
  flex-shrink: 0;
}

.playlist-item.active .playlist-number {
  background: rgba(125, 211, 252, 0.3);
  color: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(125, 211, 252, 0.4);
}

.playlist-info {
  flex: 1;
  overflow: hidden;
}

.playlist-name {
  display: block;
  font-size: 0.9rem;
  color: rgba(241, 245, 249, 0.9);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.playlist-artist {
  display: block;
  font-size: 0.8rem;
  color: rgba(100, 116, 139, 0.85);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.repeat-all {
  position: relative;
}

.repeat-all::after {
  content: '';
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.9);
}

.repeat-one {
  position: relative;
}

.repeat-one::after {
  content: '1';
  position: absolute;
  right: -4px;
  bottom: -4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.9);
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.98);
}

.copyright {
  font-size: 0.7rem;
  color: rgba(148, 163, 184, 0.6);
  text-align: center;
  padding-top: 8px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
