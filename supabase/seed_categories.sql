-- Seed: asignar categorías a proyectos existentes
-- Distribuye los proyectos de forma round-robin entre las categorías
-- Ejecutar en Supabase SQL Editor después de la migración 002

WITH numbered AS (
  SELECT
    id,
    ROW_NUMBER() OVER (ORDER BY created_at) AS rn
  FROM public.projects
  WHERE category = 'Otros' OR category IS NULL
)
UPDATE public.projects p
SET category = CASE (n.rn % 4)
  WHEN 1 THEN 'Departamentos'
  WHEN 2 THEN 'Duplex'
  WHEN 3 THEN 'Casas'
  WHEN 0 THEN 'Planos'
END
FROM numbered n
WHERE p.id = n.id;
