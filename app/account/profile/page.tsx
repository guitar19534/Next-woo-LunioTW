"use client";

import { useAccount } from "../layout";
import { User, Mail, MapPin } from "lucide-react";

const BLUE = "#17569E";
const NAVY = "#17284b";

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p style={{ fontSize: 11.5, color: "#9ca3af", marginBottom: 4, fontWeight: 500, letterSpacing: "0.04em" }}>
        {label.toUpperCase()}
      </p>
      <p style={{ fontSize: 14, color: value ? NAVY : "#d1d5db" }}>
        {value || "—"}
      </p>
    </div>
  );
}

export default function ProfilePage() {
  const { user, loading } = useAccount();

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />)}
      </div>
    );
  }

  const billing = user?.billing;
  const shipping = user?.shipping;

  return (
    <div className="space-y-5">
      <h1 className="font-bold" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: NAVY }}>帳號資料</h1>

      {/* Basic info */}
      <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #f0f0f0" }}>
        <div className="flex items-center gap-2 mb-5">
          <User size={15} style={{ color: BLUE }} />
          <p className="font-semibold" style={{ fontSize: 14, color: NAVY }}>基本資料</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-y-5 gap-x-8">
          <Field label="姓名" value={user ? `${user.lastName}${user.firstName}` || user.name : undefined} />
          <Field label="Email" value={user?.email} />
        </div>
      </div>

      {/* Billing address */}
      {billing && (
        <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #f0f0f0" }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Mail size={15} style={{ color: BLUE }} />
              <p className="font-semibold" style={{ fontSize: 14, color: NAVY }}>帳單地址</p>
            </div>
            <a href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/my-account/edit-address/billing/`}
              target="_blank" rel="noreferrer"
              className="text-xs font-medium hover:opacity-70 transition-opacity"
              style={{ color: BLUE }}>
              前往 WP 編輯 →
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-y-5 gap-x-8">
            <Field label="姓名" value={`${billing.last_name ?? ""}${billing.first_name ?? ""}`} />
            <Field label="電話" value={billing.phone} />
            <Field label="Email" value={billing.email} />
            <Field label="縣市" value={`${billing.state ?? ""}${billing.city ?? ""}`} />
            <Field label="地址" value={[billing.address_1, billing.address_2].filter(Boolean).join(" ")} />
            <Field label="郵遞區號" value={billing.postcode} />
          </div>
        </div>
      )}

      {/* Shipping address */}
      {shipping && (
        <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #f0f0f0" }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <MapPin size={15} style={{ color: BLUE }} />
              <p className="font-semibold" style={{ fontSize: 14, color: NAVY }}>配送地址</p>
            </div>
            <a href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/my-account/edit-address/shipping/`}
              target="_blank" rel="noreferrer"
              className="text-xs font-medium hover:opacity-70 transition-opacity"
              style={{ color: BLUE }}>
              前往 WP 編輯 →
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-y-5 gap-x-8">
            <Field label="姓名" value={`${shipping.last_name ?? ""}${shipping.first_name ?? ""}`} />
            <Field label="縣市" value={`${shipping.state ?? ""}${shipping.city ?? ""}`} />
            <Field label="地址" value={[shipping.address_1, shipping.address_2].filter(Boolean).join(" ")} />
            <Field label="郵遞區號" value={shipping.postcode} />
          </div>
        </div>
      )}

      <p className="text-center" style={{ fontSize: 12, color: "#9ca3af" }}>
        如需修改密碼或帳號資料，請前往{" "}
        <a href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/my-account/`} target="_blank" rel="noreferrer"
          style={{ color: BLUE }}>WordPress 帳號頁面</a>
      </p>
    </div>
  );
}
