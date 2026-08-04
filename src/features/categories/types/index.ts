export interface CategoryListItem {
  id: string
  name: string
  icon: string | null
  is_system: boolean
}

export interface CategoryListResponse {
  items: CategoryListItem[]
}

export interface CategoryListParams {
  search?: string
}

export interface CategoryCreateRequest {
  name: string
  icon?: string | null
}

export interface CategoryResponse {
  id: string
  name: string
  icon: string | null
  is_system: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CategoryUpdateRequest {
  name?: string
  icon?: string | null
}

/** A category merged with its all-time expense count/total, computed client-side from analytics data. */
export interface CategoryWithStats extends CategoryListItem {
  expense_count: number
  total: string
}
