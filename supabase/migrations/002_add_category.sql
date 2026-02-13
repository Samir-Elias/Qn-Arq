-- Add category column to projects table
ALTER TABLE public.projects
ADD COLUMN category text NOT NULL DEFAULT 'Otros';

-- Index for filtering by category
CREATE INDEX projects_category_idx ON public.projects (category);
