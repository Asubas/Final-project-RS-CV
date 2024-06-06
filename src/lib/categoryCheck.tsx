import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import NotFound from '../pages/notFound/notFound';

const CATEGORIES = ['tea', 'coffee', 'cocoa'] as const;

type Category = (typeof CATEGORIES)[number];

const CategoryCheck: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  if (!category || !CATEGORIES.includes(category as Category)) {
    return <NotFound />;
  }

  return <Outlet />;
};

export default CategoryCheck;
