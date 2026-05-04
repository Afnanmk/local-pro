// Database types matching the Supabase schema
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      service_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon_name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon_name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon_name?: string
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          category_id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      service_providers: {
        Row: {
          id: string
          user_id: string
          business_name: string
          description: string | null
          phone: string | null
          email: string | null
          address: string | null
          city: string
          rating: number
          total_reviews: number
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name: string
          description?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          city: string
          rating?: number
          total_reviews?: number
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string
          description?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          city?: string
          rating?: number
          total_reviews?: number
          avatar_url?: string | null
          created_at?: string
        }
      }
      provider_services: {
        Row: {
          provider_id: string
          service_id: string
          base_price: number | null
        }
        Insert: {
          provider_id: string
          service_id: string
          base_price?: number | null
        }
        Update: {
          provider_id?: string
          service_id?: string
          base_price?: number | null
        }
      }
    }
  }
}

// Convenience types for the homepage
export type ServiceCategory = Database['public']['Tables']['service_categories']['Row'] & {
  service_count: number
}

export type ServiceProvider = Database['public']['Tables']['service_providers']['Row'] & {
  primary_service: string | null
}

// Services listing page — service with its category info and provider count
export type ServiceWithCategory = Database['public']['Tables']['services']['Row'] & {
  category_name: string
  category_icon: string
  provider_count: number
}

// Provider listing on /services/[slug] — provider with base_price from junction table
export type ProviderListing = {
  id: string
  business_name: string
  description: string | null
  city: string
  rating: number
  total_reviews: number
  avatar_url: string | null
  base_price: number | null
}

export type ServiceWithProviders = {
  service: {
    id: string
    name: string
    slug: string
    description: string | null
  }
  category: {
    name: string
    icon_name: string
  } | null
  providers: ProviderListing[]
}
