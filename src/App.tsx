import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import OwnerLayout from "./layouts/OwnerLayout";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import DiscoverPage from "./pages/main/DiscoverPage";
import SearchPage from "./pages/main/SearchPage";
import ItemDetailPage from "./pages/main/ItemDetailPage";
import CheckoutPage from "./pages/main/CheckoutPage";
import PaymentPage from "./pages/main/PaymentPage";
import BookingsPage from "./pages/main/BookingsPage";
import InboxPage from "./pages/main/InboxPage";
import ChatRoomPage from "./pages/main/ChatRoomPage";
import ProfilePage from "./pages/main/ProfilePage";
import ReviewPage from "./pages/main/ReviewPage";

import OwnerDashboardPage from "./pages/owner/OwnerDashboardPage";
import OwnerListingsPage from "./pages/owner/OwnerListingsPage";
import OwnerNewListingPage from "./pages/owner/OwnerNewListingPage";
import OwnerEditListingPage from "./pages/owner/OwnerEditListingPage";
import OwnerRequestsPage from "./pages/owner/OwnerRequestsPage";
import OwnerWalletPage from "./pages/owner/OwnerWalletPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/discover" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/inbox/:id" element={<ChatRoomPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/review/:bookingId" element={<ReviewPage />} />
      </Route>

      <Route element={<OwnerLayout />}>
        <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
        <Route path="/owner/listings" element={<OwnerListingsPage />} />
        <Route path="/owner/listings/new" element={<OwnerNewListingPage />} />
        <Route path="/owner/listings/:id/edit" element={<OwnerEditListingPage />} />
        <Route path="/owner/requests" element={<OwnerRequestsPage />} />
        <Route path="/owner/wallet" element={<OwnerWalletPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/discover" replace />} />
    </Routes>
  );
}
