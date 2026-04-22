-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.project_images (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  image_url text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  device_type character varying DEFAULT 'pc'::character varying CHECK (device_type::text = ANY (ARRAY['tablet'::character varying, 'pc'::character varying, 'mobile'::character varying]::text[])),
  CONSTRAINT project_images_pkey PRIMARY KEY (id),
  CONSTRAINT project_images_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.project_technologies (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  technology_id uuid,
  type character varying DEFAULT 'frontend'::character varying CHECK (type::text = ANY (ARRAY['frontend'::character varying, 'backend'::character varying, 'database'::character varying]::text[])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_technologies_pkey PRIMARY KEY (id),
  CONSTRAINT project_technologies_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id),
  CONSTRAINT project_technologies_technology_id_fkey FOREIGN KEY (technology_id) REFERENCES public.technologies(id)
);
CREATE TABLE public.project_videos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  video_url text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_videos_pkey PRIMARY KEY (id),
  CONSTRAINT project_videos_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL,
  description text,
  cover_image text,
  github_url text,
  domain_url text,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);
CREATE TABLE public.technologies (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  svg_code text NOT NULL,
  percent integer DEFAULT 0 CHECK (percent >= 0 AND percent <= 100),
  category character varying NOT NULL CHECK (category::text = ANY (ARRAY['frontend'::character varying, 'backend'::character varying, 'database'::character varying, 'tools'::character varying]::text[])),
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT technologies_pkey PRIMARY KEY (id)
);
CREATE TABLE public.templates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  site_url text NOT NULL,
  cover_url text,
  tags ARRAY DEFAULT '{}'::text[],
  created_at timestamp with time zone DEFAULT now(),
  user_id uuid,
  CONSTRAINT templates_pkey PRIMARY KEY (id),
  CONSTRAINT templates_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.tools (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  svg_code text NOT NULL,
  percent integer DEFAULT 0 CHECK (percent >= 0 AND percent <= 100),
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT tools_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email character varying NOT NULL UNIQUE,
  role character varying DEFAULT 'user'::character varying CHECK (role::text = ANY (ARRAY['user'::character varying, 'admin'::character varying]::text[])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  password character varying,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);