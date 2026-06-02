import { ref, computed, watch } from 'vue'

interface Song {
  name: string
  artist: string
  url: string
  cover: string
}

let audioElement: HTMLAudioElement | null = null
let playMode: 'repeat' | 'shuffle' = 'repeat'

const defaultSongs: Song[] = [
  {
    name: 'Water Afro Pop',
    artist: 'Kontraa',
    url: '/music/kontraa-water-afro-pop.mp3',
    cover: '/music/kontraa-water-afro-pop.jpg'
  },
  {
    name: 'No Copyright',
    artist: 'Loksii',
    url: '/music/loksii-no-copyright.mp3',
    cover: '/music/loksii-no-copyright.png'
  },
  {
    name: 'Romantic',
    artist: 'Paulyudin',
    url: '/music/paulyudin-romantic-romantic.mp3',
    cover: '/music/paulyudin-romantic-romantic.png'
  },
  {
    name: 'Better Day',
    artist: 'penguinmusic',
    url: '/music/penguinmusic-better-day.mp3',
    cover: '/music/penguinmusic-better-day.png'
  },
  {
    name: 'Once In Paris',
    artist: 'Pumpupthemind',
    url: '/music/pumpupthemind-once-in-paris.mp3',
    cover: '/music/pumpupthemind-once-in-paris.png'
  },
  {
    name: 'Waterfall',
    artist: 'RomanSenykMusic',
    url: '/music/romansenykmusic-waterfall.mp3',
    cover: '/music/romansenykmusic-waterfall.png'
  },
]

const currentSong = ref<Song | null>(defaultSongs[0] || null)
const isPlaying = ref(false)
const volume = ref(20)
const isMuted = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const songs = ref<Song[]>(defaultSongs)

const currentIndex = computed(() => {
  if (!currentSong.value || songs.value.length === 0) return -1
  return songs.value.findIndex(s => s.url === currentSong.value!.url)
})

function handleEnded() {
  if (songs.value.length === 0) {
    isPlaying.value = false
    return
  }
  if (playMode === 'shuffle') {
    const idx = Math.floor(Math.random() * songs.value.length)
    currentSong.value = songs.value[idx]
    isPlaying.value = true
  } else {
    const idx = currentIndex.value
    if (idx < songs.value.length - 1) {
      currentSong.value = songs.value[idx + 1]
      isPlaying.value = true
    } else {
      currentSong.value = songs.value[0]
      isPlaying.value = true
    }
  }
}

function getAudio(): HTMLAudioElement {
  if (!audioElement) {
    audioElement = new Audio()
    audioElement.volume = isMuted.value ? 0 : volume.value / 100
    if (currentSong.value) {
      audioElement.src = currentSong.value.url
      audioElement.load()
    }
    audioElement.addEventListener('timeupdate', () => {
      if (audioElement) currentTime.value = audioElement.currentTime
    })
    audioElement.addEventListener('loadedmetadata', () => {
      if (audioElement) duration.value = audioElement.duration
    })
    audioElement.addEventListener('ended', () => {
      handleEnded()
    })
  }
  return audioElement
}

watch(currentSong, (song) => {
  if (!song) return
  const audio = getAudio()
  audio.src = song.url
  audio.volume = isMuted.value ? 0 : volume.value / 100
  audio.load()
  if (isPlaying.value) {
    audio.play().catch(() => {})
  }
})

watch(isPlaying, (playing) => {
  const audio = getAudio()
  if (playing) {
    audio.play().catch(() => {})
  } else {
    audio.pause()
  }
})

watch(volume, (v) => {
  const audio = getAudio()
  if (!isMuted.value) {
    audio.volume = v / 100
  }
})

watch(isMuted, (muted) => {
  const audio = getAudio()
  audio.volume = muted ? 0 : volume.value / 100
})

export function useAudioPlayer() {
  function setSongs(list: Song[]) {
    songs.value = list
    if (!currentSong.value && list.length > 0) {
      currentSong.value = list[0]
    }
  }

  function playSong(song: Song) {
    currentSong.value = song
    isPlaying.value = true
  }

  function playByIndex(index: number) {
    if (index >= 0 && index < songs.value.length) {
      currentSong.value = songs.value[index]
      isPlaying.value = true
    }
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value
  }

  function pause() {
    isPlaying.value = false
  }

  function setVolume(v: number) {
    volume.value = v
  }

  function toggleMute() {
    isMuted.value = !isMuted.value
  }

  function seekTo(percent: number) {
    const audio = getAudio()
    if (audio.duration) {
      audio.currentTime = percent * audio.duration
    }
  }

  function skipToPrev() {
    if (songs.value.length === 0) return
    if (playMode === 'shuffle') {
      const idx = Math.floor(Math.random() * songs.value.length)
      playByIndex(idx)
    } else {
      const idx = currentIndex.value > 0 ? currentIndex.value - 1 : songs.value.length - 1
      playByIndex(idx)
    }
  }

  function skipToNext() {
    if (songs.value.length === 0) return
    if (playMode === 'shuffle') {
      const idx = Math.floor(Math.random() * songs.value.length)
      playByIndex(idx)
    } else {
      const idx = currentIndex.value < songs.value.length - 1 ? currentIndex.value + 1 : 0
      playByIndex(idx)
    }
  }

  function setPlayMode(mode: 'repeat' | 'shuffle') {
    playMode = mode
  }

  return {
    currentSong,
    isPlaying,
    volume,
    isMuted,
    songs,
    currentIndex,
    currentTime,
    duration,
    playMode: computed(() => playMode),
    setSongs,
    playSong,
    playByIndex,
    togglePlay,
    pause,
    setVolume,
    toggleMute,
    seekTo,
    skipToPrev,
    skipToNext,
    setPlayMode
  }
}
