export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assignments: {
        Row: {
          assigned_at: string | null
          coordinator_id: string
          evaluator_id: string | null
          id: string
          sub_coordinator_id: string | null
          submission_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          coordinator_id: string
          evaluator_id?: string | null
          id?: string
          sub_coordinator_id?: string | null
          submission_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          coordinator_id?: string
          evaluator_id?: string | null
          id?: string
          sub_coordinator_id?: string | null
          submission_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          submission_id: string
          uploaded_at: string | null
        }
        Insert: {
          document_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          submission_id: string
          uploaded_at?: string | null
        }
        Update: {
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          submission_id?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      license_services: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          processing_days: number | null
          processing_fee: number | null
          required_documents: Json
          required_fields: Json
          service_name: string
          service_type: Database["public"]["Enums"]["license_type"]
          table_requirements: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          processing_days?: number | null
          processing_fee?: number | null
          required_documents?: Json
          required_fields?: Json
          service_name: string
          service_type: Database["public"]["Enums"]["license_type"]
          table_requirements?: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          processing_days?: number | null
          processing_fee?: number | null
          required_documents?: Json
          required_fields?: Json
          service_name?: string
          service_type?: Database["public"]["Enums"]["license_type"]
          table_requirements?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_address: string
          company_email: string
          company_name: string
          company_phone: string
          company_website: string | null
          created_at: string | null
          email: string
          id: string
          pic_email: string
          pic_id_number: string
          pic_name: string
          pic_phone: string
          pic_position: string
          registration_status: Database["public"]["Enums"]["registration_status"]
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          company_address: string
          company_email: string
          company_name: string
          company_phone: string
          company_website?: string | null
          created_at?: string | null
          email: string
          id: string
          pic_email: string
          pic_id_number: string
          pic_name: string
          pic_phone: string
          pic_position: string
          registration_status?: Database["public"]["Enums"]["registration_status"]
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          company_address?: string
          company_email?: string
          company_name?: string
          company_phone?: string
          company_website?: string | null
          created_at?: string | null
          email?: string
          id?: string
          pic_email?: string
          pic_id_number?: string
          pic_name?: string
          pic_phone?: string
          pic_position?: string
          registration_status?: Database["public"]["Enums"]["registration_status"]
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          correction_notes: string | null
          created_at: string | null
          current_reviewer_id: string | null
          id: string
          license_service_id: string
          status: Database["public"]["Enums"]["submission_status"]
          submission_data: Json
          table_data: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          correction_notes?: string | null
          created_at?: string | null
          current_reviewer_id?: string | null
          id?: string
          license_service_id: string
          status?: Database["public"]["Enums"]["submission_status"]
          submission_data?: Json
          table_data?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          correction_notes?: string | null
          created_at?: string | null
          current_reviewer_id?: string | null
          id?: string
          license_service_id?: string
          status?: Database["public"]["Enums"]["submission_status"]
          submission_data?: Json
          table_data?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_license_service_id_fkey"
            columns: ["license_service_id"]
            isOneToOne: false
            referencedRelation: "license_services"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_history: {
        Row: {
          id: string
          notes: string | null
          review_result: Database["public"]["Enums"]["review_result"]
          reviewed_at: string | null
          reviewer_id: string
          reviewer_role: Database["public"]["Enums"]["user_role"]
          submission_id: string
        }
        Insert: {
          id?: string
          notes?: string | null
          review_result: Database["public"]["Enums"]["review_result"]
          reviewed_at?: string | null
          reviewer_id: string
          reviewer_role: Database["public"]["Enums"]["user_role"]
          submission_id: string
        }
        Update: {
          id?: string
          notes?: string | null
          review_result?: Database["public"]["Enums"]["review_result"]
          reviewed_at?: string | null
          reviewer_id?: string
          reviewer_role?: Database["public"]["Enums"]["user_role"]
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_history_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      license_type:
        | "spectrum_license"
        | "infrastructure_permit"
        | "service_authorization"
      registration_status: "pending" | "approved" | "rejected"
      review_result: "approve" | "correction_required"
      submission_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "technical_review"
        | "evaluation"
        | "director_approval"
        | "approved"
        | "correction_required"
        | "completed"
        | "rejected"
      user_role:
        | "client"
        | "admin"
        | "coordinator"
        | "evaluator"
        | "sub_coordinator"
        | "director"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      license_type: [
        "spectrum_license",
        "infrastructure_permit",
        "service_authorization",
      ],
      registration_status: ["pending", "approved", "rejected"],
      review_result: ["approve", "correction_required"],
      submission_status: [
        "draft",
        "submitted",
        "under_review",
        "technical_review",
        "evaluation",
        "director_approval",
        "approved",
        "correction_required",
        "completed",
        "rejected",
      ],
      user_role: [
        "client",
        "admin",
        "coordinator",
        "evaluator",
        "sub_coordinator",
        "director",
      ],
    },
  },
} as const
