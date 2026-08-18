"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Users,
  Percent,
  Package,
  RotateCcw,
  Tag,
  Sparkles,
  MapPin,
  CreditCard,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import {
  AnalyticsHeader,
  DateRangeOption,
  KpiCard,
  AnalyticsSection,
  RevenueChart,
  ProductPerformance,
  CategoryPerformance,
  CustomerAnalytics,
  OrderAnalytics,
  PaymentAnalytics,
  InventoryAnalytics,
  CouponAnalytics,
  FestivalAnalytics,
  GeographyTable,
} from "@/components/admin/analytics";
import { AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRangeOption>("30days");
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadAnalytics = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.fetchAnalyticsFromApi({ range: dateRange });
      setAnalyticsData(data);
    } catch (err: any) {
      console.error("Failed to load analytics data:", err);
      showToast("Failed to load analytics data from database.");
      setAnalyticsData(null);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const kpis = analyticsData?.kpis || {};
  const revVal = kpis.totalRevenue || 0;
  const ordVal = kpis.totalOrders || 0;
  const aovVal = kpis.averageOrderValue || 0;
  const custVal = kpis.totalCustomers || 0;
  const convVal = kpis.conversionRate !== null && kpis.conversionRate !== undefined ? `${kpis.conversionRate}%` : "N/A";
  const prodsVal = kpis.productsSold || 0;
  const refVal = kpis.refundsIssued || 0;
  const discVal = kpis.discountsGiven || 0;

  const topKpis = [
    {
      id: "revenue",
      title: "Revenue",
      value: `₹${revVal.toLocaleString("en-IN")}`,
      change: 0,
      tooltip: "Real gross revenue collected after discounts in PostgreSQL",
      icon: DollarSign,
      iconBg: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-700",
    },
    {
      id: "orders",
      title: "Orders",
      value: ordVal.toLocaleString("en-IN"),
      change: 0,
      tooltip: "Total completed transactions stored in PostgreSQL",
      icon: ShoppingBag,
      iconBg: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-700",
    },
    {
      id: "aov",
      title: "Average Order Value",
      value: `₹${aovVal.toLocaleString("en-IN")}`,
      change: 0,
      tooltip: "Mean revenue per transaction",
      icon: TrendingUp,
      iconBg: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-700",
    },
    {
      id: "customers",
      title: "Customers",
      value: custVal.toLocaleString("en-IN"),
      change: 0,
      tooltip: "Registered customer accounts in database",
      icon: Users,
      iconBg: "bg-sky-50 border-sky-200",
      iconColor: "text-sky-700",
    },
    {
      id: "conversion",
      title: "Conversion Rate",
      value: convVal,
      change: 0,
      tooltip: "Unavailable (no traffic/session model in schema)",
      icon: Percent,
      iconBg: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-700",
    },
    {
      id: "products_sold",
      title: "Products Sold",
      value: prodsVal.toLocaleString("en-IN"),
      change: 0,
      tooltip: "Total item units ordered",
      icon: Package,
      iconBg: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-700",
    },
    {
      id: "refunds",
      title: "Refunds Issued",
      value: `₹${refVal.toLocaleString("en-IN")}`,
      change: 0,
      tooltip: "Total cancelled order volume in PostgreSQL",
      icon: RotateCcw,
      iconBg: "bg-rose-50 border-rose-200",
      iconColor: "text-rose-700",
    },
    {
      id: "discounts",
      title: "Discounts Given",
      value: `₹${discVal.toLocaleString("en-IN")}`,
      change: 0,
      tooltip: "Promotional coupon & festival discounts",
      icon: Tag,
      iconBg: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-700",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Analytics Header & Controls */}
      <AnalyticsHeader
        selectedRange={dateRange}
        onRangeChange={(range) => {
          setDateRange(range);
          showToast(`Updated analytics view for time range.`);
        }}
        onExportCSV={() => showToast("Exporting raw analytics metrics to CSV...")}
        onExportReport={() => showToast("Generating PDF Executive Analytics Report...")}
        onPrintReport={() => {
          showToast("Preparing printable report view...");
          window.print();
        }}
      />

      {/* Main KPI Grid or Loading Spinner */}
      {isLoading ? (
        <div className="p-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
          <p className="text-sm font-semibold text-stone-700">Executing database aggregation queries...</p>
        </div>
      ) : (
        <>
          {/* Top 8 KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topKpis.map((kpi) => (
              <KpiCard key={kpi.id} {...kpi} />
            ))}
          </div>

          {/* Sales Analytics */}
          <AnalyticsSection
            title="Sales & Revenue Performance"
            subtitle="Revenue trends, order counts, and average order value over time"
            icon={TrendingUp}
          >
            <RevenueChart />
          </AnalyticsSection>

          {/* Product Analytics */}
          <AnalyticsSection
            title="Product Performance & Sales Trends"
            subtitle="Top selling products, best/worst performing categories, and declining items"
            icon={Package}
          >
            <ProductPerformance />
          </AnalyticsSection>

          {/* Category Analytics */}
          <AnalyticsSection
            title="Category Sales Distribution"
            subtitle="Revenue breakdown across temple items, brassware, puja kits, and sacred books"
            icon={Tag}
          >
            <CategoryPerformance />
          </AnalyticsSection>

          {/* Customer Analytics */}
          <AnalyticsSection
            title="Customer Cohorts & Retention Analytics"
            subtitle="New vs returning customers, repeat purchase rate, and lifetime value"
            icon={Users}
          >
            <CustomerAnalytics />
          </AnalyticsSection>

          {/* Order & Payment Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsSection
              title="Order Status Distribution"
              subtitle="Breakdown of order fulfillments, pending, and cancellations"
              icon={ShoppingBag}
            >
              <OrderAnalytics />
            </AnalyticsSection>

            <AnalyticsSection
              title="Payment Gateway Analytics"
              subtitle="Method breakdown (UPI, COD, Cards) and gateway success rate"
              icon={CreditCard}
            >
              <PaymentAnalytics />
            </AnalyticsSection>
          </div>

          {/* Inventory Analytics */}
          <AnalyticsSection
            title="Inventory & Stock Health"
            subtitle="Stock valuation, turnover velocity, low stock alerts, and out-of-stock items"
            icon={AlertTriangle}
          >
            <InventoryAnalytics />
          </AnalyticsSection>

          {/* Coupon & Promotional Analytics */}
          <AnalyticsSection
            title="Coupon & Marketing Campaign Analytics"
            subtitle="Coupon adoption, total discounts given, and top performing campaigns"
            icon={Tag}
          >
            <CouponAnalytics />
          </AnalyticsSection>

          {/* Festival / Occasion Analytics */}
          <AnalyticsSection
            title="Festival & Occasion Sales Intelligence"
            subtitle="Ramanayam religious festival seasonal sales, orders, and top products"
            icon={Sparkles}
          >
            <FestivalAnalytics />
          </AnalyticsSection>

          {/* Geographical Analytics */}
          <AnalyticsSection
            title="Geographical Distribution (India)"
            subtitle="Customer order volume and revenue across Indian states and top city hubs"
            icon={MapPin}
          >
            <GeographyTable />
          </AnalyticsSection>
        </>
      )}
    </div>
  );
}
