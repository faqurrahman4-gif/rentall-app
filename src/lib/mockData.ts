import type { Item, Booking, Conversation, Message, User } from "../types";
import { placeholderImage, avatarImage } from "./utils";

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: "081234567890",
    avatar_url: avatarImage("budi"),
    is_verified: true,
    created_at: "2024-01-15",
  },
  {
    id: "u2",
    name: "Siti Rahma",
    email: "siti@example.com",
    phone: "081298765432",
    avatar_url: avatarImage("siti"),
    is_verified: true,
    created_at: "2024-02-20",
  },
  {
    id: "u3",
    name: "Andi Wijaya",
    email: "andi@example.com",
    phone: "08111112222",
    avatar_url: avatarImage("andi"),
    is_verified: false,
    created_at: "2024-03-10",
  },
  {
    id: "u4",
    name: "Dewi Lestari",
    email: "dewi@example.com",
    phone: "08133334444",
    avatar_url: avatarImage("dewi"),
    is_verified: true,
    created_at: "2024-04-05",
  },
];

export const mockItems: Item[] = [
  {
    id: "i1",
    owner_id: "u2",
    name: "Borongan Perkakas Taman",
    category: "Tools",
    price_per_day: 25000,
    description:
      "Set lengkap perkakas taman: gunting rumput, cangkul, garpu tanah, dan sekop. Kondisi terawat, siap pakai untuk pekerjaan taman rumah Anda.",
    condition: "Baik",
    images: [placeholderImage("tools1"), placeholderImage("tools1b")],
    is_active: true,
    location_lat: -0.4713,
    location_lng: 117.1433,
    created_at: "2024-05-01",
    rating: 4.8,
    review_count: 12,
    distance: 1.2,
  },
  {
    id: "i2",
    owner_id: "u3",
    name: "Kamera Mirrorless Sony A7 III",
    category: "Kamera",
    price_per_day: 150000,
    description:
      "Kamera mirrorless full-frame Sony A7 III dengan lensa 28-70mm. Cocok untuk fotografi dan videografi profesional. Termasuk baterai cadangan dan memory card 64GB.",
    condition: "Sangat Baik",
    images: [placeholderImage("camera1"), placeholderImage("camera1b")],
    is_active: true,
    location_lat: -0.4713,
    location_lng: 117.1433,
    created_at: "2024-05-03",
    rating: 4.9,
    review_count: 34,
    distance: 2.8,
  },
  {
    id: "i3",
    owner_id: "u4",
    name: "Proyektor Mini Portable",
    category: "Elektronik",
    price_per_day: 50000,
    description:
      "Proyektor mini portable dengan resolusi 1080p, cocok untuk nonton bareng atau presentasi. Dilengkapi remote dan kabel HDMI.",
    condition: "Baik",
    images: [placeholderImage("proj1")],
    is_active: true,
    location_lat: -0.4713,
    location_lng: 117.1433,
    created_at: "2024-05-05",
    rating: 4.5,
    review_count: 8,
    distance: 3.5,
  },
  {
    id: "i4",
    owner_id: "u2",
    name: "Tenda Dome 4 Orang",
    category: "Outdoor",
    price_per_day: 40000,
    description:
      "Tenda dome kapasitas 4 orang, tahan hujan dan mudah dipasang. Cocok untuk camping, mendaki, atau acara outdoor. Termasuk tas pembawa.",
    condition: "Baik",
    images: [placeholderImage("tenda1")],
    is_active: true,
    location_lat: -0.4713,
    location_lng: 117.1433,
    created_at: "2024-05-07",
    rating: 4.7,
    review_count: 21,
    distance: 0.8,
  },
  {
    id: "i5",
    owner_id: "u3",
    name: "Vacuum Cleaner Robot",
    category: "Rumah",
    price_per_day: 35000,
    description:
      "Robot vacuum cleaner pintar dengan fitur mapping dan kontrol via aplikasi. Membersihkan lantai dan karpet secara otomatis. Filter HEPA.",
    condition: "Sangat Baik",
    images: [placeholderImage("vacuum1")],
    is_active: true,
    location_lat: -0.4713,
    location_lng: 117.1433,
    created_at: "2024-05-09",
    rating: 4.6,
    review_count: 15,
    distance: 4.1,
  },
  {
    id: "i6",
    owner_id: "u4",
    name: "Drone DJI Mini 3",
    category: "Elektronik",
    price_per_day: 200000,
    description:
      "Drone ringan dengan kamera 4K, cocok untuk aerial photography. Maksimal terbang 38 menit. Termasuk 3 baterai dan remote controller.",
    condition: "Sangat Baik",
    images: [placeholderImage("drone1")],
    is_active: true,
    location_lat: -0.4713,
    location_lng: 117.1433,
    created_at: "2024-05-10",
    rating: 4.9,
    review_count: 27,
    distance: 5.2,
  },
  {
    id: "i7",
    owner_id: "u2",
    name: "Set Perkakas Bor Listrik",
    category: "Tools",
    price_per_day: 30000,
    description:
      "Bor listrik lengkap dengan berbagai mata bor dan obeng. Cocok untuk proyek DIY di rumah. Daya 800W, variable speed.",
    condition: "Baik",
    images: [placeholderImage("bor1")],
    is_active: true,
    location_lat: -0.4713,
    location_lng: 117.1433,
    created_at: "2024-05-11",
    rating: 4.4,
    review_count: 6,
    distance: 1.5,
  },
  {
    id: "i8",
    owner_id: "u4",
    name: "Tas Carrier 60L",
    category: "Outdoor",
    price_per_day: 25000,
    description:
      "Tas carrier 60 liter dengan sistem suspensi nyaman. Cocok untuk hiking dan travelling berhari-hari. Tahan air.",
    condition: "Baik",
    images: [placeholderImage("tas1")],
    is_active: true,
    location_lat: -0.4713,
    location_lng: 117.1433,
    created_at: "2024-05-12",
    rating: 4.7,
    review_count: 11,
    distance: 2.1,
  },
];

export const mockBookings: Booking[] = [
  {
    id: "b1",
    item_id: "i2",
    renter_id: "u1",
    owner_id: "u3",
    start_date: "2024-05-20",
    end_date: "2024-05-23",
    total_price: 450000,
    service_fee: 45000,
    status: "ongoing",
    created_at: "2024-05-15",
  },
  {
    id: "b2",
    item_id: "i4",
    renter_id: "u1",
    owner_id: "u2",
    start_date: "2024-05-25",
    end_date: "2024-05-27",
    total_price: 80000,
    service_fee: 8000,
    status: "confirmed",
    created_at: "2024-05-14",
  },
  {
    id: "b3",
    item_id: "i1",
    renter_id: "u1",
    owner_id: "u2",
    start_date: "2024-04-10",
    end_date: "2024-04-12",
    total_price: 50000,
    service_fee: 5000,
    status: "returned",
    created_at: "2024-04-08",
  },
  {
    id: "b4",
    item_id: "i3",
    renter_id: "u1",
    owner_id: "u4",
    start_date: "2024-05-28",
    end_date: "2024-05-29",
    total_price: 50000,
    service_fee: 5000,
    status: "requested",
    created_at: "2024-05-16",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    name: "Andi Wijaya",
    avatar_url: avatarImage("andi"),
    last_message: "Iya, kamera bisa diambil besok jam 9 pagi ya",
    last_time: "10:30",
    item_name: "Kamera Mirrorless Sony A7 III",
  },
  {
    id: "c2",
    name: "Siti Rahma",
    avatar_url: avatarImage("siti"),
    last_message: "Terima kasih sudah kembalikan tendanya!",
    last_time: "09:15",
    item_name: "Tenda Dome 4 Orang",
  },
  {
    id: "c3",
    name: "Dewi Lestari",
    avatar_url: avatarImage("dewi"),
    last_message: "Apakah proyektor bisa disewa 3 hari?",
    last_time: "Kemarin",
    item_name: "Proyektor Mini Portable",
  },
];

export const mockMessages: Message[] = [
  {
    id: "m1",
    sender_id: "u3",
    receiver_id: "u1",
    item_id: "i2",
    content: "Halo, apakah kamera Sony A7 III masih tersedia?",
    created_at: "2024-05-15T10:00:00",
  },
  {
    id: "m2",
    sender_id: "u1",
    receiver_id: "u3",
    item_id: "i2",
    content: "Halo! Iya masih tersedia untuk tanggal itu",
    created_at: "2024-05-15T10:05:00",
  },
  {
    id: "m3",
    sender_id: "u3",
    receiver_id: "u1",
    item_id: "i2",
    content: "Bagus, saya mau sewa untuk 3 hari. Bisa diambil besok?",
    created_at: "2024-05-15T10:10:00",
  },
  {
    id: "m4",
    sender_id: "u1",
    receiver_id: "u3",
    item_id: "i2",
    content: "Bisa! Jam 9 pagi di lokasi yang saya share ya",
    created_at: "2024-05-15T10:15:00",
  },
  {
    id: "m5",
    sender_id: "u3",
    receiver_id: "u1",
    item_id: "i2",
    content: "Iya, kamera bisa diambil besok jam 9 pagi ya",
    created_at: "2024-05-15T10:30:00",
  },
];

export const categories = [
  "Semua",
  "Tools",
  "Kamera",
  "Elektronik",
  "Outdoor",
  "Rumah",
];

export function getItemById(id: string): Item | undefined {
  return mockItems.find((i) => i.id === id);
}

export function getOwnerById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getBookingsByRenter(renterId: string): Booking[] {
  return mockBookings.filter((b) => b.renter_id === renterId);
}

export function getBookingsByOwner(ownerId: string): Booking[] {
  return mockBookings.filter((b) => b.owner_id === ownerId);
}

export function getMessagesByConversation(conversationId: string): Message[] {
  return mockMessages;
}
