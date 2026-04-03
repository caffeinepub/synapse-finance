import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy, useState } from "react";
import {
  AddTransactionModal,
  EditTransactionModal,
} from "./components/AddTransactionModal";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AnalyticsPage from "./pages/AnalyticsPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";

type Page = "dashboard" | "transactions" | "analytics";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className="min-h-screen synapse-bg"
        style={{
          fontFamily: "'Plus Jakarta Sans', Inter, system-ui, sans-serif",
        }}
      >
        {/* Ambient background orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div
            className="absolute"
            style={{
              width: "600px",
              height: "600px",
              top: "-200px",
              left: "-100px",
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "500px",
              height: "500px",
              bottom: "-100px",
              right: "-100px",
              background:
                "radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "400px",
              height: "400px",
              top: "50%",
              right: "20%",
              background:
                "radial-gradient(ellipse, rgba(55,214,255,0.04) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Sidebar */}
        <Sidebar currentPage={currentPage} onNavigate={navigate} />

        {/* Main content area */}
        <div className="ml-60">
          {/* Navbar */}
          <Navbar currentPage={currentPage} />

          {/* Page content */}
          <main className="pt-14 min-h-screen">
            <div className="px-6 py-8 max-w-7xl">
              <AnimatePresence mode="wait">
                {currentPage === "dashboard" && (
                  <DashboardPage key="dashboard" onNavigate={navigate} />
                )}
                {currentPage === "transactions" && (
                  <TransactionsPage key="transactions" />
                )}
                {currentPage === "analytics" && (
                  <AnalyticsPage key="analytics" />
                )}
              </AnimatePresence>
            </div>
          </main>

          {/* Footer */}
          <footer className="px-6 py-5 border-t border-white/5 mt-8">
            <div className="max-w-7xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground/30">
                  Synapse Finance v1.0
                </span>
              </div>
              <p className="text-xs text-muted-foreground/30">
                &copy; {new Date().getFullYear()}. Built with{" "}
                <span className="text-red-400/60">♥</span> using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400/50 hover:text-blue-400/70 transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </footer>
        </div>

        {/* Modals */}
        <AddTransactionModal />
        <EditTransactionModal />

        {/* Toasts */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(10,16,34,0.97)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#EAF0FF",
              fontSize: "13px",
            },
          }}
        />
      </div>
    </TooltipProvider>
  );
}
