import axios from 'axios'

const JUHE_API_KEY_CALENDAR = import.meta.env.VITE_JUHE_API_KEY_CALENDAR
const JUHE_API_KEY_HISTORY = import.meta.env.VITE_JUHE_API_KEY_HISTORY

interface HistoryEvent {
  day: string
  date: string
  title: string
  e_id: string
}

interface CalendarDay {
  holiday?: string
  avoid?: string
  animal?: string
  animalsYear?: string
  desc?: string
  weekday?: string
  week?: string
  suit?: string
  lunarYear?: string
  lunarMonth?: string
  lunarDate?: string
  lunar?: string
  'year-month'?: string
  date?: string
  gzDate?: string
  gzMonth?: string
  gzYear?: string
  lDate?: string
  lMonth?: string
}

interface StorageData<T> {
  data: T
  timestamp: number
}

const STORAGE_EXPIRE_HOURS = 24

const getStoredData = <T>(key: string): StorageData<T> | null => {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      const parsed = JSON.parse(stored) as StorageData<T>
      const expireTime = parsed.timestamp + STORAGE_EXPIRE_HOURS * 60 * 60 * 1000
      if (Date.now() < expireTime) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Failed to get stored data:', e)
  }
  return null
}

const setStoredData = <T>(key: string, data: T): void => {
  try {
    const storageData: StorageData<T> = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(key, JSON.stringify(storageData))
  } catch (e) {
    console.error('Failed to set stored data:', e)
  }
}

export const fetchHistoryEvents = async (month: number, day: number): Promise<HistoryEvent[]> => {
  const dateStr = `${month}/${day}`
  const storageKey = `history_events_${dateStr}`
  
  const stored = getStoredData<HistoryEvent[]>(storageKey)
  if (stored) {
    return stored.data
  }
  
  try {
    const response = await axios.get('/api/history', {
      params: {
        key: JUHE_API_KEY_HISTORY,
        date: dateStr
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    
    if (response.data.error_code === 0 && response.data.result && Array.isArray(response.data.result)) {
      const events = response.data.result
      setStoredData(storageKey, events)
      return events
    }
  } catch (error) {
    console.error('Failed to fetch history events:', error)
  }
  
  return null
}

export const fetchCalendarDay = async (year: number, month: number, day: number): Promise<CalendarDay | null> => {
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  const storageKey = `calendar_day_${dateStr}`
  
  const stored = getStoredData<CalendarDay>(storageKey)
  if (stored) {
    return stored.data
  }
  
  try {
    const response = await axios.get('/api/calendar', {
      params: {
        key: JUHE_API_KEY_CALENDAR,
        date: dateStr,
        detail: 1
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    
    if (response.data.error_code === 0 && response.data.result) {
      const calendarData = response.data.result
      setStoredData(storageKey, calendarData)
      return calendarData
    }
  } catch (error) {
    console.error('Failed to fetch calendar day:', error)
  }
  
  return null
}


