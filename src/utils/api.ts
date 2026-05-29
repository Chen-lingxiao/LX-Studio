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
  
  return getDefaultHistoryEvents(month, day)
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

const getDefaultHistoryEvents = (month: number, day: number): HistoryEvent[] => {
  const defaultEvents: Record<string, HistoryEvent[]> = {
    '5-29': [
      { day: '5/29', date: '1848年05月29日', title: '威斯康星州成为美国第30个州', e_id: '1' },
      { day: '5/29', date: '1917年05月29日', title: '约翰·肯尼迪出生于美国马萨诸塞州', e_id: '2' },
      { day: '5/29', date: '1953年05月29日', title: '珠穆朗玛峰首次被人类登顶', e_id: '3' },
      { day: '5/29', date: '1958年05月29日', title: '阿拉斯加正式成为美国第49个州', e_id: '4' },
      { day: '5/29', date: '1977年05月29日', title: '电影《星球大战》在美国首次上映', e_id: '5' },
      { day: '5/29', date: '2005年05月29日', title: '法国全民公决否决欧盟宪法条约', e_id: '6' }
    ],
    '5-30': [
      { day: '5/30', date: '1431年05月30日', title: '圣女贞德被处决', e_id: '1' },
      { day: '5/30', date: '1778年05月30日', title: '伏尔泰逝世', e_id: '2' },
      { day: '5/30', date: '1903年05月30日', title: '邹容著作《革命军》出版', e_id: '3' },
      { day: '5/30', date: '1925年05月30日', title: '五卅运动爆发', e_id: '4' },
      { day: '5/30', date: '1967年05月30日', title: '埃及六日战争爆发', e_id: '5' },
      { day: '5/30', date: '2008年05月30日', title: '四川汶川地震遇难同胞哀悼日', e_id: '6' }
    ],
    '5-31': [
      { day: '5/31', date: '1879年05月31日', title: '纽约世界博览会开幕', e_id: '1' },
      { day: '5/31', date: '1910年05月31日', title: '南非议会通过《种族隔离法》', e_id: '2' },
      { day: '5/31', date: '1961年05月31日', title: '美国批准使用口服避孕药', e_id: '3' },
      { day: '5/31', date: '1990年05月31日', title: '东德、西德签署统一条约', e_id: '4' },
      { day: '5/31', date: '2005年05月31日', title: '中国成功发射神舟六号载人飞船', e_id: '5' },
      { day: '5/31', date: '2012年05月31日', title: '首位华人宇航员王亚平进入太空', e_id: '6' }
    ],
    '6-1': [
      { day: '6/1', date: '1925年06月01日', title: '中国儿童福利事业的先驱宋庆龄诞生', e_id: '1' },
      { day: '6/1', date: '1942年06月01日', title: '浙赣会战开始', e_id: '2' },
      { day: '6/1', date: '1956年06月01日', title: '中国科学院学部成立', e_id: '3' },
      { day: '6/1', date: '1981年06月01日', title: '中国儿童电影制片厂成立', e_id: '4' },
      { day: '6/1', date: '1988年06月01日', title: '苏共第十九次全国代表会议召开', e_id: '5' },
      { day: '6/1', date: '2001年06月01日', title: '尼泊尔皇室血案', e_id: '6' }
    ]
  }
  
  const key = `${month}-${day}`
  return defaultEvents[key] || [
    { day: `${month}/${day}`, date: '1900年01月01日', title: '历史上的今天发生了重要事件', e_id: '1' },
    { day: `${month}/${day}`, date: '1925年01月01日', title: '著名人物诞辰或逝世', e_id: '2' },
    { day: `${month}/${day}`, date: '1950年01月01日', title: '重要历史事件纪念日', e_id: '3' },
    { day: `${month}/${day}`, date: '1975年01月01日', title: '科技领域重大突破', e_id: '4' },
    { day: `${month}/${day}`, date: '2000年01月01日', title: '新世纪重要事件', e_id: '5' },
    { day: `${month}/${day}`, date: '2020年01月01日', title: '当代重要事件', e_id: '6' }
  ]
}
