import { Construction } from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MobileNav from "../components/mobileNav";

// Reusable — pass a title/message so this same page can cover News & Tips,
// Market Prices, Community, or anything else not built yet.
const ComingSoon = ({ title = "Community", message = "This feature is on the way. Check back soon!" }) => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />
        <div className="w-full p-6 mt-20 mb-20 bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
              <Construction size={28} className="text-green-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            <p className="text-gray-500 text-sm mt-2">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
