import { Request, Response } from 'express';
import FoodEntryModel, { FoodEntry } from '../models/FoodEntry';

export default {
  // Get all food entries
  getAllEntries: async (req: Request, res: Response): Promise<void> => {
    try {
      const entries = FoodEntryModel.getAll();
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error fetching food entries:', error);
      res.status(500).json({ error: 'Failed to fetch food entries' });
    }
  },

  // Get food entries by date
  getEntriesByDate: async (req: Request, res: Response): Promise<void> => {
    try {
      const { date } = req.params;
      const entries = FoodEntryModel.getByDate(date);
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error fetching food entries by date:', error);
      res.status(500).json({ error: 'Failed to fetch food entries' });
    }
  },

  // Get food entries by date range
  getEntriesByDateRange: async (req: Request, res: Response): Promise<void> => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        res.status(400).json({ error: 'Start date and end date are required' });
        return;
      }
      
      const entries = FoodEntryModel.getByDateRange(startDate as string, endDate as string);
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error fetching food entries by date range:', error);
      res.status(500).json({ error: 'Failed to fetch food entries' });
    }
  },

  // Add a new food entry
  addEntry: async (req: Request, res: Response): Promise<void> => {
    try {
      const entry: FoodEntry = req.body;
      
      // Validate required fields
      if (!entry.name || !entry.calories || !entry.date || !entry.meal_type) {
        res.status(400).json({ 
          error: 'Name, calories, date, and meal type are required' 
        });
        return;
      }
      
      const newEntry = FoodEntryModel.add(entry);
      res.status(201).json(newEntry);
    } catch (error) {
      console.error('Error adding food entry:', error);
      res.status(500).json({ error: 'Failed to add food entry' });
    }
  },

  // Update a food entry
  updateEntry: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const entry: Partial<FoodEntry> = req.body;
      
      if (!id) {
        res.status(400).json({ error: 'Entry ID is required' });
        return;
      }
      
      const updatedEntry = FoodEntryModel.update(Number(id), entry);
      res.status(200).json(updatedEntry);
    } catch (error) {
      console.error('Error updating food entry:', error);
      res.status(500).json({ error: 'Failed to update food entry' });
    }
  },

  // Delete a food entry
  deleteEntry: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'Entry ID is required' });
        return;
      }
      
      FoodEntryModel.delete(Number(id));
      res.status(200).json({ message: 'Food entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting food entry:', error);
      res.status(500).json({ error: 'Failed to delete food entry' });
    }
  },

  // Get summary statistics
  getSummary: async (req: Request, res: Response): Promise<void> => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        res.status(400).json({ error: 'Start date and end date are required' });
        return;
      }
      
      const summary = FoodEntryModel.getSummary(startDate as string, endDate as string);
      res.status(200).json(summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      res.status(500).json({ error: 'Failed to fetch summary' });
    }
  }
}; 