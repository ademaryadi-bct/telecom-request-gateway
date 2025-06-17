
-- Create enum types for various statuses and roles
CREATE TYPE public.user_role AS ENUM ('client', 'admin', 'coordinator', 'evaluator', 'sub_coordinator', 'director');
CREATE TYPE public.registration_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.submission_status AS ENUM ('draft', 'submitted', 'under_review', 'technical_review', 'evaluation', 'director_approval', 'approved', 'correction_required', 'completed', 'rejected');
CREATE TYPE public.license_type AS ENUM ('spectrum_license', 'infrastructure_permit', 'service_authorization');
CREATE TYPE public.review_result AS ENUM ('approve', 'correction_required');

-- Create profiles table with company and PIC data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  registration_status registration_status NOT NULL DEFAULT 'pending',
  
  -- Company Information
  company_name TEXT NOT NULL,
  company_address TEXT NOT NULL,
  company_phone TEXT NOT NULL,
  company_email TEXT NOT NULL,
  company_website TEXT,
  
  -- PIC (Person in Charge) Information
  pic_name TEXT NOT NULL,
  pic_position TEXT NOT NULL,
  pic_phone TEXT NOT NULL,
  pic_email TEXT NOT NULL,
  pic_id_number TEXT NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create license services table to define different service types and their requirements
CREATE TABLE public.license_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  service_type license_type NOT NULL,
  description TEXT,
  required_documents JSONB NOT NULL DEFAULT '[]', -- Array of required document types
  required_fields JSONB NOT NULL DEFAULT '[]', -- Array of required form fields
  table_requirements JSONB NOT NULL DEFAULT '[]', -- Array of table requirements
  processing_fee DECIMAL(10,2),
  processing_days INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create submissions table
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  license_service_id UUID REFERENCES public.license_services(id) NOT NULL,
  submission_data JSONB NOT NULL DEFAULT '{}', -- Store form data
  table_data JSONB NOT NULL DEFAULT '{}', -- Store table data
  status submission_status NOT NULL DEFAULT 'draft',
  current_reviewer_id UUID REFERENCES auth.users(id),
  correction_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table for file uploads
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflow history table to track the approval process
CREATE TABLE public.workflow_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES auth.users(id) NOT NULL,
  reviewer_role user_role NOT NULL,
  review_result review_result NOT NULL,
  notes TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assignments table for coordinator assignments
CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
  coordinator_id UUID REFERENCES auth.users(id) NOT NULL,
  evaluator_id UUID REFERENCES auth.users(id),
  sub_coordinator_id UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create RLS policies for license services (public read, admin write)
CREATE POLICY "Anyone can view license services" ON public.license_services
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage license services" ON public.license_services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create RLS policies for submissions
CREATE POLICY "Users can view their own submissions" ON public.submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own submissions" ON public.submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions" ON public.submissions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Reviewers can view assigned submissions" ON public.submissions
  FOR SELECT USING (
    auth.uid() = current_reviewer_id OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'coordinator', 'evaluator', 'sub_coordinator', 'director')
    )
  );

CREATE POLICY "Reviewers can update assigned submissions" ON public.submissions
  FOR UPDATE USING (
    auth.uid() = current_reviewer_id OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'coordinator', 'evaluator', 'sub_coordinator', 'director')
    )
  );

-- Create RLS policies for documents
CREATE POLICY "Users can manage their submission documents" ON public.documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.submissions 
      WHERE id = documents.submission_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Reviewers can view submission documents" ON public.documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.submissions s
      JOIN public.profiles p ON p.id = auth.uid()
      WHERE s.id = documents.submission_id 
      AND (s.current_reviewer_id = auth.uid() OR p.role IN ('admin', 'coordinator', 'evaluator', 'sub_coordinator', 'director'))
    )
  );

-- Create RLS policies for workflow history
CREATE POLICY "Users can view their submission workflow" ON public.workflow_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.submissions 
      WHERE id = workflow_history.submission_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Reviewers can view and create workflow history" ON public.workflow_history
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'coordinator', 'evaluator', 'sub_coordinator', 'director')
    )
  );

-- Create RLS policies for assignments
CREATE POLICY "Assigned users can view assignments" ON public.assignments
  FOR SELECT USING (
    auth.uid() IN (coordinator_id, evaluator_id, sub_coordinator_id) OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'coordinator')
    )
  );

CREATE POLICY "Coordinators and admins can manage assignments" ON public.assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'coordinator')
    )
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    company_name, 
    company_address, 
    company_phone, 
    company_email,
    pic_name, 
    pic_position, 
    pic_phone, 
    pic_email, 
    pic_id_number
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'company_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'company_address', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'company_phone', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'company_email', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'pic_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'pic_position', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'pic_phone', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'pic_email', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'pic_id_number', '')
  );

  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample license services
INSERT INTO public.license_services (service_name, service_type, description, required_documents, required_fields, table_requirements, processing_fee, processing_days) VALUES
('Spectrum License Application', 'spectrum_license', 'Application for radio frequency spectrum allocation', 
  '["company_registration", "technical_specification", "equipment_certificate", "site_survey"]',
  '["frequency_range", "power_output", "coverage_area", "technical_justification"]',
  '["equipment_list", "site_locations", "interference_analysis"]',
  5000.00, 45),

('Infrastructure Permit', 'infrastructure_permit', 'Permit for telecommunications infrastructure deployment',
  '["building_permit", "environmental_impact", "safety_certificate", "insurance_proof"]',
  '["tower_height", "location_coordinates", "construction_timeline", "environmental_compliance"]',
  '["equipment_specifications", "maintenance_schedule", "emergency_procedures"]',
  3000.00, 30),

('Service Authorization', 'service_authorization', 'Authorization for new telecommunications service launch',
  '["service_description", "market_analysis", "quality_assurance", "customer_protection"]',
  '["service_type", "target_market", "pricing_structure", "quality_metrics"]',
  '["service_features", "coverage_areas", "performance_indicators"]',
  2000.00, 15);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('submission-documents', 'submission-documents', false);

-- Create storage policy for document uploads
CREATE POLICY "Users can upload their own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'submission-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'submission-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Reviewers can view submission documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'submission-documents' AND
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'coordinator', 'evaluator', 'sub_coordinator', 'director')
    )
  );
