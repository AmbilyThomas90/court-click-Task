export type OrderStatus =
  | "cancelled"
  | "order placed"
  | "payment completed"
  | "processing"
  | "delivered";

export type DocumentType =
  | "Judgement"
  | "Interim Order"
  | "Add Case"
  | "Other";

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface UserInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  userInfo: UserInfo;
  courtComplex: string;
  products: DocumentType;
  orderDate: string;
  status: OrderStatus;
  orderDetails: string;
  tags: Tag[];
  isCopied?: boolean;
  isESign?: boolean;
  isUploaded?: boolean;
}

export interface FilterState {
  court?: string;
  product?: string;
  tags?: string[];
  users?: string[];
  testUsers?: boolean;
}

export interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}
