-- ============================================================
-- Content tables for editable static pages
-- ============================================================

-- Proceso: steps
CREATE TABLE IF NOT EXISTS proceso_pasos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero text NOT NULL,
  titulo text NOT NULL,
  descripcion text NOT NULL DEFAULT '',
  duracion text NOT NULL DEFAULT '',
  orden integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Testimonios
CREATE TABLE IF NOT EXISTS testimonios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  name text NOT NULL,
  project text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  orden integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- FAQ
CREATE TABLE IF NOT EXISTS faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pregunta text NOT NULL,
  respuesta text NOT NULL,
  orden integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- RLS Policies
-- ============================================================

ALTER TABLE proceso_pasos ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonios ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "proceso_pasos_select" ON proceso_pasos FOR SELECT USING (true);
CREATE POLICY "testimonios_select" ON testimonios FOR SELECT USING (true);
CREATE POLICY "faq_items_select" ON faq_items FOR SELECT USING (true);

-- Auth write
CREATE POLICY "proceso_pasos_write" ON proceso_pasos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "testimonios_write" ON testimonios FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "faq_items_write" ON faq_items FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Seed data (existing static content)
-- ============================================================

INSERT INTO proceso_pasos (numero, titulo, descripcion, duracion, orden) VALUES
  ('01', 'Primera consulta', 'Nos juntamos (presencial o por video) para que me cuentes tu idea, el terreno o la propiedad, y lo que necesitás. Sin costo y sin compromiso.', '1 reunión', 1),
  ('02', 'Anteproyecto', 'Desarrollamos la propuesta inicial: plantas, volumetría y materialidad. Acá es donde la idea toma forma visual por primera vez. Se ajusta hasta que esté exactamente como querés.', '2–3 semanas', 2),
  ('03', 'Proyecto ejecutivo', 'Con el anteproyecto aprobado, generamos la documentación técnica completa: planos de arquitectura, cortes, elevaciones, detalles constructivos y memoria descriptiva.', '4–6 semanas', 3),
  ('04', 'Gestión municipal', 'Tramitamos los permisos y aprobaciones municipales necesarios. Coordinamos con el municipio y resolvemos los requisitos administrativos.', 'Variable según municipio', 4),
  ('05', 'Dirección de obra', 'Durante la construcción supervisamos que todo se ejecute conforme al proyecto. Visitas periódicas a obra, coordinación con contratistas y resolución de imprevistos.', 'Duración de la obra', 5)
ON CONFLICT DO NOTHING;

INSERT INTO testimonios (quote, name, project, category, orden) VALUES
  ('Juan Ignacio entendió exactamente lo que queríamos. El proceso fue claro desde el principio y el resultado superó nuestras expectativas. Nuestra casa en Chacras quedó tal cual la imaginamos.', 'Familia Rodríguez', 'Casa en Chacras de Coria', 'Casas', 1),
  ('Muy profesional y comprometido. Nos acompañó en cada etapa de la obra y siempre estuvo disponible para resolver dudas. El duplex quedó impecable.', 'Martín y Lucía', 'Duplex en Godoy Cruz', 'Duplex', 2),
  ('Lo que más me gustó fue la claridad en los tiempos y costos. Nada de sorpresas. El departamento quedó moderno, funcional y dentro del presupuesto.', 'Carolina V.', 'Departamento en Ciudad', 'Departamentos', 3),
  ('La remodelación de nuestra casa vieja fue un desafío y Juan Ignacio lo tomó con mucha energía. Resolvió problemas que no habíamos visto y el resultado es increíble.', 'Familia Pereyra', 'Remodelación en Luján de Cuyo', 'Casas', 4),
  ('Excelente comunicación durante todo el proyecto. Los planos fueron precisos y la documentación completa. Muy recomendable.', 'Arq. Diego M.', 'Documentación técnica', 'Planos', 5),
  ('Juan Ignacio transformó un espacio pequeño en algo que parece el doble de grande. El aprovechamiento es brillante.', 'Valeria S.', 'Departamento en Palermo', 'Departamentos', 6)
ON CONFLICT DO NOTHING;

INSERT INTO faq_items (pregunta, respuesta, orden) VALUES
  ('¿Cuánto cuesta contratar un arquitecto?', 'Los honorarios varían según el tipo y escala del proyecto. En general se calculan como un porcentaje del costo de obra (entre el 8% y el 15%) o por metro cuadrado diseñado. En la primera consulta te damos un presupuesto claro según tu caso.', 1),
  ('¿Cuánto tarda el proyecto en estar listo?', 'El anteproyecto toma 2 a 3 semanas. El proyecto ejecutivo completo, con planos y documentación técnica, entre 4 y 6 semanas más. Todo depende de la complejidad del proyecto y la velocidad de aprobación de ajustes.', 2),
  ('¿Trabajás solo en Mendoza?', 'Principalmente en el Gran Mendoza (Ciudad, Godoy Cruz, Guaymallén, Luján de Cuyo, Maipú, Las Heras). Para proyectos fuera de la provincia evaluamos caso por caso.', 3),
  ('¿Podés hacer solo los planos sin dirigir la obra?', 'Sí. Ofrecemos el servicio de proyecto (planos y documentación) de forma independiente a la dirección de obra. Muchos clientes contratan solo el proyecto y construyen con su propio contratista.', 4),
  ('¿Qué necesito tener antes de contactarte?', 'Con la idea y el terreno (o la propiedad existente) alcanza. No hace falta tener nada cerrado. La primera charla sirve justamente para ordenar las ideas y ver qué es posible según tu presupuesto y necesidades.', 5),
  ('¿Hacés remodelaciones y ampliaciones?', 'Sí. Remodelaciones parciales, reciclados completos y ampliaciones de viviendas existentes. Estos proyectos a veces son más desafiantes que uno nuevo porque hay que trabajar con condicionantes ya construidas.', 6),
  ('¿Cómo sé cuánto me va a costar la obra?', 'Durante el proyecto elaboramos un presupuesto estimado por metro cuadrado. Una vez terminados los planos ejecutivos, podés pedir cotizaciones formales a contratistas. Podemos ayudarte a interpretar y comparar esos presupuestos.', 7),
  ('¿Trabajás con casas prefabricadas o steel frame?', 'Sí. Diseñamos para distintos sistemas constructivos: mampostería tradicional, steel frame, hormigón y sistemas mixtos. La elección del sistema depende del presupuesto, el terreno y los tiempos de cada cliente.', 8)
ON CONFLICT DO NOTHING;
