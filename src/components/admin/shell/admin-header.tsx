export function AdminHeader() {
  return (
    <div className="w-full h-16 border-b border-forest-900/5 bg-white/40 backdrop-blur-xl flex items-center justify-between px-6 md:px-8">
      {/* Mobile Breadcrumb or Title space */}
      <div className="flex items-center gap-4">
        {/* We can inject dynamic breadcrumbs or search here later (Phase 3) */}
      </div>

      <div className="flex items-center gap-4">
        {/* Placeholder for Quick Actions or Notifications */}
      </div>
    </div>
  );
}
