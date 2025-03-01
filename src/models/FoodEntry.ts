import Database from 'better-sqlite3';
import path from 'path';

// Initialize SQLite database
const db = new Database(path.join(__dirname, '../../food-logger.db'));

// Create food entries table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS food_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    calories INTEGER NOT NULL,
    protein REAL,
    carbs REAL,
    fat REAL,
    date TEXT NOT NULL,
    meal_type TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface FoodEntry {
  id?: number;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  date: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  notes?: string;
  created_at?: string;
}

export default {
  // Get all food entries
  getAll: () => {
    return db.prepare('SELECT * FROM food_entries ORDER BY date DESC, created_at DESC').all();
  },

  // Get food entries by date
  getByDate: (date: string) => {
    return db.prepare('SELECT * FROM food_entries WHERE date = ? ORDER BY created_at DESC').all(date);
  },

  // Get food entries by date range
  getByDateRange: (startDate: string, endDate: string) => {
    return db.prepare('SELECT * FROM food_entries WHERE date BETWEEN ? AND ? ORDER BY date DESC, created_at DESC').all(startDate, endDate);
  },

  // Add a new food entry
  add: (entry: FoodEntry) => {
    const stmt = db.prepare(`
      INSERT INTO food_entries (name, calories, protein, carbs, fat, date, meal_type, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      entry.name,
      entry.calories,
      entry.protein || null,
      entry.carbs || null,
      entry.fat || null,
      entry.date,
      entry.meal_type,
      entry.notes || null
    );
    
    return { id: result.lastInsertRowid, ...entry };
  },

  // Update a food entry
  update: (id: number, entry: Partial<FoodEntry>) => {
    const fields = Object.keys(entry)
      .filter(key => key !== 'id')
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.keys(entry)
      .filter(key => key !== 'id')
      .map(key => (entry as any)[key]);
    
    const stmt = db.prepare(`UPDATE food_entries SET ${fields} WHERE id = ?`);
    stmt.run(...values, id);
    
    return { id, ...entry };
  },

  // Delete a food entry
  delete: (id: number) => {
    return db.prepare('DELETE FROM food_entries WHERE id = ?').run(id);
  },

  // Get summary statistics for a date range
  getSummary: (startDate: string, endDate: string) => {
    return db.prepare(`
      SELECT 
        SUM(calories) as totalCalories,
        AVG(calories) as avgCalories,
        SUM(protein) as totalProtein,
        SUM(carbs) as totalCarbs,
        SUM(fat) as totalFat,
        COUNT(*) as entryCount
      FROM food_entries 
      WHERE date BETWEEN ? AND ?
    `).get(startDate, endDate);
  }
}; 