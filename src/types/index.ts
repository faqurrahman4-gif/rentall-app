export type BookingStatus =
  | "requested"
  | "confirmed"
  | "ongoing"
  | "returned"
  | "cancelled";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar_url: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface Item {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  price_per_day: number;
  description: string;
  condition: string;
  images: string[];
  is_active: boolean;
  location_lat: number;
  location_lng: number;
  created_at: string;
  owner?: User;
  rating?: number;
  review_count?: number;
  distance?: number;
}

export interface Booking {
  id: string;
  item_id: string;
  renter_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  service_fee: number;
  status: BookingStatus;
  created_at: string;
  item?: Item;
  renter?: User;
  owner?: User;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  item_id: string | null;
  content: string;
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  reviewed_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar_url: string | null;
  last_message: string;
  last_time: string;
  item_name?: string;
}
