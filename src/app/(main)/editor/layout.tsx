// app/(main)/dashboard/layout.tsx

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        {/* No Navbar here */}
        <main>{children}</main>
      </div>
    )
  }
  