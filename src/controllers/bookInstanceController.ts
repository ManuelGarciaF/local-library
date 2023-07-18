import BookInstance from '../models/bookInstance';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

// Display list of all BookInstances.
export const bookInstanceList = asyncHandler(async (req, res, next) => {
  const bookInstances = await BookInstance.find().populate('book').exec();
  res.render('bookinstances', { bookInstances });
});

// Display detail page for a specific BookInstance.
export const bookInstanceDetail = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id).populate('book').exec();
  res.render('bookinstancedetail', { bookInstance });
});

// Display BookInstance create form on GET.
export const bookInstanceCreateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance create GET');
});

// Handle BookInstance create on POST.
export const bookInstanceCreatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance create POST');
});

// Display BookInstance delete form on GET.
export const bookInstanceDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance delete GET');
});

// Handle BookInstance delete on POST.
export const bookInstanceDeletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance delete POST');
});

// Display BookInstance update form on GET.
export const bookInstanceUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
});

// Handle bookInstance update on POST.
export const bookInstanceUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
});
