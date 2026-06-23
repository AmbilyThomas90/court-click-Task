import { Order, Tag } from "@/types";

export const AVAILABLE_TAGS: Tag[] = [
  { id: "1", name: "Subscription Pending", color: "#6366f1" },
  { id: "2", name: "Follow up Issue for Delete", color: "#ef4444" },
  { id: "3", name: "Sold Case", color: "#10b981" },
  { id: "4", name: "Abnormal User", color: "#f59e0b" },
  { id: "5", name: "Background Check for Case", color: "#3b82f6" },
  { id: "6", name: "Background Check for User", color: "#8b5cf6" },
  { id: "7", name: "Sell Back", color: "#06b6d4" },
  { id: "8", name: "Spam Agent", color: "#ec4899" },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    userId: "91 80885 63796",
    userInfo: {
      id: "91 80885 63796",
      name: "Soji Abraham",
      address: "67/8/8 flat no 8 1st floor, attomyathu road vannala, Kochi, Kerala, 614321",
      phone: "+91 9876543210",
    },
    courtComplex: "Court Complex, Kunnamkulam",
    products: "Judgement",
    orderDate: "7 Feb 2026",
    status: "cancelled",
    orderDetails: "#584834\n12:57 PM\n₹2,500",
    tags: [AVAILABLE_TAGS[0], AVAILABLE_TAGS[2]],
    isESign: false,
  },
  {
    id: "2",
    userId: "91 80885 00000",
    userInfo: {
      id: "91 80885 00000",
      name: "Shaman",
      address: "District Court Complex, Thrissur",
      phone: "+91 9876500001",
    },
    courtComplex: "District Court Thrissur",
    products: "Interim Order",
    orderDate: "7 Feb 2026",
    status: "order placed",
    orderDetails: "#447585\n11:30 AM\n₹150",
    tags: [AVAILABLE_TAGS[0], AVAILABLE_TAGS[3]],
    isESign: false,
  },
  {
    id: "3",
    userId: "91 80885 65793",
    userInfo: {
      id: "91 80885 65793",
      name: "Gopalan",
      address: "District Court Complex, Thrissur",
      phone: "+91 9876565793",
    },
    courtComplex: "District Court Thrissur",
    products: "Other",
    orderDate: "7 Feb 2026",
    status: "payment completed",
    orderDetails: "Auto Petition\nFiled Under Section 13 9\n₹3,500",
    tags: [AVAILABLE_TAGS[1], AVAILABLE_TAGS[4]],
    isESign: false,
  },
  {
    id: "4",
    userId: "91 90000 11111",
    userInfo: {
      id: "91 90000 11111",
      name: "Lakshmi George",
      address: "Ernakulam District Court",
      phone: "+91 9000011111",
    },
    courtComplex: "Ernakulam District Court",
    products: "Judgement",
    orderDate: "8 Feb 2026",
    status: "processing",
    orderDetails: "#123456\n10:00 AM\n₹1,800",
    tags: [AVAILABLE_TAGS[5]],
    isESign: true,
  },
  {
    id: "5",
    userId: "91 90000 22222",
    userInfo: {
      id: "91 90000 22222",
      name: "Rajan Pillai",
      address: "JFCM 1 District Court Thrissur",
      phone: "+91 9000022222",
    },
    courtComplex: "JFCM 1 District Court Thrissur",
    products: "Add Case",
    orderDate: "9 Feb 2026",
    status: "delivered",
    orderDetails: "#789012\n2:30 PM\n₹500",
    tags: [],
    isESign: true,
    isUploaded: true,
  },
];

export const COURT_OPTIONS = [
  { value: "all", label: "All" },
  { value: "court_complex_kunnamkulam", label: "Court Complex, Kunnamkulam" },
  { value: "district_court_thrissur", label: "District Court Thrissur" },
  { value: "jfcm_thrissur", label: "JFCM 1 District Court Thrissur" },
  { value: "ernakulam_district", label: "Ernakulam District Court" },
];

export const PRODUCT_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Judgement", label: "Judgement" },
  { value: "Interim Order", label: "Interim Order" },
  { value: "Add Case", label: "Add Case" },
  { value: "Other", label: "Other" },
];
