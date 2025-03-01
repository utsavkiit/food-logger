import express, { Router } from 'express';
import foodEntryController from '../controllers/foodEntryController';

const router: Router = express.Router();

// Get all food entries
router.get('/', foodEntryController.getAllEntries);

// Get food entries by date range
router.get('/range', foodEntryController.getEntriesByDateRange);

// Get summary statistics
router.get('/summary', foodEntryController.getSummary);

// Get food entries by date
router.get('/:date', foodEntryController.getEntriesByDate);

// Add a new food entry
router.post('/', foodEntryController.addEntry);

// Update a food entry
router.put('/:id', foodEntryController.updateEntry);

// Delete a food entry
router.delete('/:id', foodEntryController.deleteEntry);

export default router; 