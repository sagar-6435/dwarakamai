import { Request, Response } from 'express';
import Gallery from '../models/Gallery';

export const getGallery = async (req: Request, res: Response) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;

    const filter: any = { active: true };
    if (category) filter.category = category;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const gallery = await Gallery.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort('displayOrder');

    const total = await Gallery.countDocuments(filter);

    res.json({
      gallery,
      pagination: {
        total,
        pages: Math.ceil(total / limitNum),
        current: pageNum,
      },
    });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Error fetching gallery' });
  }
};

export const getGalleryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await Gallery.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json({ item });
  } catch (error) {
    console.error('Get gallery item error:', error);
    res.status(500).json({ message: 'Error fetching gallery item' });
  }
};

export const createGalleryItem = async (req: Request, res: Response) => {
  try {
    const { title, description, image, category, displayOrder } = req.body;

    if (!title || !image) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    const item = new Gallery({
      title,
      description,
      image,
      category,
      displayOrder: displayOrder || 0,
    });

    await item.save();

    res.status(201).json({
      message: 'Gallery item created successfully',
      item,
    });
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({ message: 'Error creating gallery item' });
  }
};

export const updateGalleryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, image, category, displayOrder, active } = req.body;

    const item = await Gallery.findByIdAndUpdate(
      id,
      { title, description, image, category, displayOrder, active },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json({
      message: 'Gallery item updated successfully',
      item,
    });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({ message: 'Error updating gallery item' });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await Gallery.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ message: 'Error deleting gallery item' });
  }
};
