"use client";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CmsSidebar, CmsSectionId } from "@/components/admin/cms/CmsSidebar";
import { CmsEditor } from "@/components/admin/cms/CmsEditor";
import { LivePreview } from "@/components/admin/cms/LivePreview";
import { initialCmsState, CmsStorefrontState } from "@/data/mockCmsData";
import { AdminToast } from "@/components/admin/ui";

export default function AdminCmsPage() {
  const [activeSection, setActiveSection] = useState<CmsSectionId>("announcement");
  const [cmsState, setCmsState] = useState<CmsStorefrontState>(initialCmsState);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveSection = (sectionName: string) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast(`${sectionName} changes saved & published live!`);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Header */}
      <AdminPageHeader
        title="Website CMS & Theme Studio"
        subtitle="Customize storefront sections, announcement banners, hero slides, and footer links in real time."
      />

      {/* Split View Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sidebar + Section Form Controls */}
        <div className="lg:col-span-5 flex flex-col md:flex-row gap-4">
          <CmsSidebar activeSection={activeSection} onSelectSection={setActiveSection} />
          <div className="flex-1 min-w-0">
            <CmsEditor
              activeSection={activeSection}
              state={cmsState}
              onChange={setCmsState}
              onSaveSection={handleSaveSection}
            />
          </div>
        </div>

        {/* Right Column: Live Device Viewport Simulator */}
        <div className="lg:col-span-7 sticky top-6">
          <LivePreview state={cmsState} />
        </div>
      </div>
    </div>
  );
}
