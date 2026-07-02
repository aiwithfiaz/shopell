export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          country: string
          created_at: string | null
          full_name: string
          id: string
          is_default: boolean | null
          phone: string
          postal_code: string
          state: string
          user_id: string
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          country?: string
          created_at?: string | null
          full_name: string
          id?: string
          is_default?: boolean | null
          phone: string
          postal_code: string
          state: string
          user_id: string
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          country?: string
          created_at?: string | null
          full_name?: string
          id?: string
          is_default?: boolean | null
          phone?: string
          postal_code?: string
          state?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          image: string | null
          published: boolean | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          logo: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          quantity: number
          user_id: string
          variant_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          quantity?: number
          user_id: string
          variant_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          quantity?: number
          user_id?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          active: boolean | null
          code: string
          created_at: string | null
          expires_at: string | null
          id: string
          maximum_discount: number | null
          minimum_order: number | null
          starts_at: string | null
          type: Database["public"]["Enums"]["coupon_type"]
          usage_count: number | null
          usage_limit: number | null
          value: number
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          maximum_discount?: number | null
          minimum_order?: number | null
          starts_at?: string | null
          type: Database["public"]["Enums"]["coupon_type"]
          usage_count?: number | null
          usage_limit?: number | null
          value: number
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          maximum_discount?: number | null
          minimum_order?: number | null
          starts_at?: string | null
          type?: Database["public"]["Enums"]["coupon_type"]
          usage_count?: number | null
          usage_limit?: number | null
          value?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read_status: boolean | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read_status?: boolean | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read_status?: boolean | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          name: string
          order_id: string
          price: number
          product_id: string
          quantity: number
          sku: string | null
          total: number
          variant_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          order_id: string
          price: number
          product_id: string
          quantity: number
          sku?: string | null
          total: number
          variant_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          order_id?: string
          price?: number
          product_id?: string
          quantity?: number
          sku?: string | null
          total?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_same_as_shipping: boolean | null
          coupon_id: string | null
          created_at: string | null
          discount_amount: number | null
          email: string
          id: string
          notes: string | null
          order_number: string
          phone: string | null
          shipping_address_line1: string
          shipping_address_line2: string | null
          shipping_city: string
          shipping_cost: number | null
          shipping_country: string
          shipping_full_name: string
          shipping_postal_code: string
          shipping_state: string
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax_amount: number | null
          total: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          billing_same_as_shipping?: boolean | null
          coupon_id?: string | null
          created_at?: string | null
          discount_amount?: number | null
          email: string
          id?: string
          notes?: string | null
          order_number: string
          phone?: string | null
          shipping_address_line1: string
          shipping_address_line2?: string | null
          shipping_city: string
          shipping_cost?: number | null
          shipping_country?: string
          shipping_full_name: string
          shipping_postal_code: string
          shipping_state: string
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax_amount?: number | null
          total: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          billing_same_as_shipping?: boolean | null
          coupon_id?: string | null
          created_at?: string | null
          discount_amount?: number | null
          email?: string
          id?: string
          notes?: string | null
          order_number?: string
          phone?: string | null
          shipping_address_line1?: string
          shipping_address_line2?: string | null
          shipping_city?: string
          shipping_cost?: number | null
          shipping_country?: string
          shipping_full_name?: string
          shipping_postal_code?: string
          shipping_state?: string
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number
          tax_amount?: number | null
          total?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          order_id: string
          paid_at: string | null
          payment_method: string
          status: Database["public"]["Enums"]["payment_status"] | null
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          order_id: string
          paid_at?: string | null
          payment_method?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          order_id?: string
          paid_at?: string | null
          payment_method?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          alt: string | null
          created_at: string | null
          id: string
          product_id: string
          sort_order: number | null
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string | null
          id?: string
          product_id: string
          sort_order?: number | null
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string | null
          id?: string
          product_id?: string
          sort_order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          created_at: string | null
          id: string
          name: string
          option1: string | null
          option2: string | null
          option3: string | null
          price: number
          product_id: string
          sku: string | null
          stock_quantity: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          option1?: string | null
          option2?: string | null
          option3?: string | null
          price: number
          product_id: string
          sku?: string | null
          stock_quantity?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          option1?: string | null
          option2?: string | null
          option3?: string | null
          price?: number
          product_id?: string
          sku?: string | null
          stock_quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand_id: string | null
          category_id: string | null
          compare_price: number | null
          cost_price: number | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          low_stock_threshold: number | null
          name: string
          price: number
          rating: number | null
          review_count: number | null
          sales_count: number | null
          short_description: string | null
          sku: string | null
          slug: string
          status: string | null
          stock_quantity: number | null
          tags: string[] | null
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          brand_id?: string | null
          category_id?: string | null
          compare_price?: number | null
          cost_price?: number | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          low_stock_threshold?: number | null
          name: string
          price: number
          rating?: number | null
          review_count?: number | null
          sales_count?: number | null
          short_description?: string | null
          sku?: string | null
          slug: string
          status?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          brand_id?: string | null
          category_id?: string | null
          compare_price?: number | null
          cost_price?: number | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          low_stock_threshold?: number | null
          name?: string
          price?: number
          rating?: number | null
          review_count?: number | null
          sales_count?: number | null
          short_description?: string | null
          sku?: string | null
          slug?: string
          status?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_user_id: string
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          auth_user_id: string
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          approved: boolean | null
          comment: string | null
          created_at: string | null
          id: string
          product_id: string
          rating: number
          title: string | null
          user_id: string
        }
        Insert: {
          approved?: boolean | null
          comment?: string | null
          created_at?: string | null
          id?: string
          product_id: string
          rating: number
          title?: string | null
          user_id: string
        }
        Update: {
          approved?: boolean | null
          comment?: string | null
          created_at?: string | null
          id?: string
          product_id?: string
          rating?: number
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_settings: {
        Row: {
          canonical_url: string | null
          created_at: string | null
          description: string | null
          id: string
          no_index: boolean | null
          og_image: string | null
          page_slug: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          no_index?: boolean | null
          og_image?: string | null
          page_slug: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          canonical_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          no_index?: boolean | null
          og_image?: string | null
          page_slug?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          id: string
          key: string
          type: string | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          type?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          type?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_number: { Args: never; Returns: string }
      get_dashboard_statistics: { Args: never; Returns: Json }
      get_monthly_revenue: { Args: { months?: number }; Returns: Json }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      coupon_type: "percentage" | "fixed"
      order_status:
        | "pending"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded"
      payment_status: "pending" | "paid" | "failed" | "refunded"
      user_role: "customer" | "admin" | "manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      coupon_type: ["percentage", "fixed"],
      order_status: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      payment_status: ["pending", "paid", "failed", "refunded"],
      user_role: ["customer", "admin", "manager"],
    },
  },
} as const