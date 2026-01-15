import { JSONFilePreset } from 'lowdb/node'

interface Data {
  articles: { id: string; title: string; content: string }[],
  [key:string]: unknown
}

const defaultData: Data = { articles: [] }
const db = await JSONFilePreset('db.json', defaultData)

export default db;