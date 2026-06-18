<script setup>
  import { ref } from 'vue';
  import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Music,
  } from 'lucide-vue-next';
  import { useAudioPlayer } from '../composables/useAudioPlayer';

  const {
    currentSong,
    isPlaying,
    togglePlay,
    toggleMute,
    isMuted,
    skipToPrev,
    skipToNext,
  } = useAudioPlayer();

  const isExpanded = ref(false);
  const hoverTimer = ref(null);

  function handleMouseEnter() {
    if (hoverTimer.value) clearTimeout(hoverTimer.value);
    isExpanded.value = true;
  }

  function handleMouseLeave() {
    hoverTimer.value = setTimeout(() => {
      isExpanded.value = false;
    }, 300);
  }
</script>

<template>
  <div
    class="mini-player"
    :class="{ expanded: isExpanded }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 收起状态：小竖条 -->
    <div class="mini-bar" :class="{ playing: isPlaying }" v-if="!isExpanded">
      <Music :size="14" class="mini-bar-icon" />
      <div class="equalizer" v-if="isPlaying">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>

    <!-- 展开状态 -->
    <div class="mini-content" v-if="isExpanded">
      <!-- 歌曲信息 -->
      <div class="mini-info" v-if="currentSong">
        <img
          :src="currentSong.cover"
          :alt="currentSong.name"
          class="mini-cover"
        />
        <div class="mini-details">
          <span class="mini-name">{{ currentSong.name }}</span>
          <span class="mini-artist">{{ currentSong.artist }}</span>
        </div>
      </div>
      <div class="mini-info" v-else>
        <div class="mini-cover-placeholder">
          <Music :size="16" />
        </div>
        <div class="mini-details">
          <span class="mini-name">未播放</span>
        </div>
      </div>

      <!-- 控制器 -->
      <div class="mini-controls">
        <button class="mini-btn" @click="skipToPrev">
          <SkipBack :size="14" />
        </button>
        <button class="mini-btn play" @click="togglePlay">
          <Play v-if="!isPlaying" :size="16" />
          <Pause v-else :size="16" />
        </button>
        <button class="mini-btn" @click="skipToNext">
          <SkipForward :size="14" />
        </button>
        <button class="mini-btn" @click="toggleMute">
          <VolumeX v-if="isMuted" :size="14" />
          <Volume2 v-else :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .mini-player {
    position: fixed;
    left: 16px;
    bottom: 16px;
    z-index: 1000;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .mini-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(15, 21, 37, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    color: rgba(165, 243, 252, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .mini-bar.playing {
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow:
      0 0 12px rgba(99, 102, 241, 0.2),
      0 0 24px rgba(99, 102, 241, 0.1);
    animation: barGlow 3s ease-in-out infinite;
  }

  @keyframes barGlow {
    0%,
    100% {
      box-shadow:
        0 0 12px rgba(99, 102, 241, 0.2),
        0 0 24px rgba(99, 102, 241, 0.1);
    }
    50% {
      box-shadow:
        0 0 16px rgba(99, 102, 241, 0.35),
        0 0 32px rgba(99, 102, 241, 0.15);
    }
  }

  .mini-bar-icon {
    transition: transform 0.3s ease;
  }

  .mini-bar.playing .mini-bar-icon {
    animation: iconBounce 2s ease-in-out infinite;
  }

  @keyframes iconBounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  .equalizer {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
  }

  .equalizer .bar {
    width: 3px;
    border-radius: 1px;
    background: rgba(99, 102, 241, 0.9);
  }

  .equalizer .bar:nth-child(1) {
    animation: eq1 1.2s ease-in-out infinite;
  }

  .equalizer .bar:nth-child(2) {
    animation: eq2 0.8s ease-in-out infinite;
  }

  .equalizer .bar:nth-child(3) {
    animation: eq3 1s ease-in-out infinite;
  }

  @keyframes eq1 {
    0%,
    100% {
      height: 4px;
    }
    50% {
      height: 14px;
    }
  }

  @keyframes eq2 {
    0%,
    100% {
      height: 10px;
    }
    50% {
      height: 4px;
    }
  }

  @keyframes eq3 {
    0%,
    100% {
      height: 6px;
    }
    50% {
      height: 12px;
    }
  }

  .mini-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    background: rgba(15, 21, 37, 0.9);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    min-width: 200px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .mini-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mini-cover {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    object-fit: cover;
  }

  .mini-cover-placeholder {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(148, 163, 184, 0.5);
  }

  .mini-details {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .mini-name {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.9);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mini-artist {
    font-size: 0.7rem;
    color: rgba(148, 163, 184, 0.8);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mini-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .mini-btn {
    background: transparent;
    border: none;
    color: rgba(148, 163, 184, 0.8);
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mini-btn:hover {
    color: rgba(255, 255, 255, 0.95);
    background: rgba(255, 255, 255, 0.08);
  }

  .mini-btn.play {
    width: 32px;
    height: 32px;
    background: rgba(99, 102, 241, 0.8);
    color: rgba(255, 255, 255, 0.95);
  }

  .mini-btn.play:hover {
    background: rgba(99, 102, 241, 0.9);
  }
</style>
