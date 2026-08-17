import React from "react";
import {
  Calendar,
  Clock,
  Filter,
  ChevronDown,
  Leaf,
  ShieldPlus,
  Bird,
  Wrench,
  DollarSign,
  FileText,
  Info,
} from "lucide-react";
import Header from "../components/header";
import Sidebar from "../components/navs/sidebar";
import MobileNav from "../components/navs/mobileNav";

const historyItems = [
  {
    id: 1,
    title: "Tomato harvested",
    description: "Harvested 80 kg of tomatoes from Greenhouse 1.",
    type: "Crop",
    date: "May 24, 2025",
    time: "10:45 AM",
    icon: Leaf,
    iconStyle: "bg-green-50 text-green-600",
    tagStyle: "bg-green-50 text-green-700",
  },
  {
    id: 2,
    title: "Tomato diagnosed",
    description: "Early blight detected on tomato plants in Greenhouse 1.",
    type: "Diagnosis",
    date: "May 22, 2025",
    time: "02:30 PM",
    icon: ShieldPlus,
    iconStyle: "bg-purple-50 text-purple-600",
    tagStyle: "bg-purple-50 text-purple-700",
  },
  {
    id: 3,
    title: "Poultry added",
    description: "Added 30 layers to Poultry House.",
    type: "Livestock",
    date: "May 18, 2025",
    time: "09:15 AM",
    icon: Bird,
    iconStyle: "bg-orange-50 text-orange-600",
    tagStyle: "bg-orange-50 text-orange-700",
  },
  {
    id: 4,
    title: "Equipment added",
    description: "Added a new Water Pump (1 unit).",
    type: "Equipment",
    date: "May 15, 2025",
    time: "11:20 AM",
    icon: Wrench,
    iconStyle: "bg-blue-50 text-blue-600",
    tagStyle: "bg-blue-50 text-blue-700",
  },
  {
    id: 5,
    title: "Maize planted",
    description: "Planted maize seeds on Field B.",
    type: "Crop",
    date: "May 10, 2025",
    time: "08:30 AM",
    icon: Leaf,
    iconStyle: "bg-green-50 text-green-600",
    tagStyle: "bg-green-50 text-green-700",
  },
  {
    id: 6,
    title: "Sale recorded",
    description: "Sold 120 kg of spinach.",
    type: "Sale",
    date: "May 8, 2025",
    time: "04:00 PM",
    icon: DollarSign,
    iconStyle: "bg-yellow-50 text-yellow-600",
    tagStyle: "bg-yellow-50 text-yellow-700",
  },
  {
    id: 7,
    title: "Expense recorded",
    description: "Purchased organic fertilizer.",
    type: "Expense",
    date: "May 5, 2025",
    time: "01:25 PM",
    icon: FileText,
    iconStyle: "bg-red-50 text-red-600",
    tagStyle: "bg-red-50 text-red-700",
  },
];

const emptyStates = [
  {
    id: "equipment",
    title: "No equipment history yet",
    description:
      "Equipment activities will appear here when you add or update equipment on your farm.",
    icon: Wrench,
  },
  {
    id: "finance",
    title: "No finance history yet",
    description:
      "Sales and expenses will appear here when you record financial transactions.",
    icon: DollarSign,
  },
  {
    id: "general",
    title: "No general events yet",
    description:
      "General farm events will appear here when available.",
    icon: Info,
  },
];

const FarmHistory = () => {
  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />
        <main  className="w-full min-w-0 px-4 sm:px-6 py-5 sm:py-6 space-y-5 sm:space-y-6 xl:mt-20 mt-28 xl:mb-0 mb-20 bg-gray-50">

          <div className="mx-auto max-w-5xl">
            {/* Page Header */}
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                  Farm History
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                  A timeline of important activities and events on your farm.
                </p>
              </div>

              {/* Filter */}
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
              >
                <Filter size={17} />
                Filter
                <ChevronDown size={16} className="ml-1 text-gray-400" />
              </button>
            </div>

            {/* Timeline */}
            <div className="relative">

              {/* Vertical line */}
              <div className="absolute bottom-8 left-[19px] top-8 hidden w-px bg-gray-200 sm:block" />

              <div className="space-y-3 sm:space-y-4">

                {historyItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="relative flex gap-3 sm:gap-4"
                    >
                      {/* Timeline Icon */}
                      <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-[42px] sm:w-[42px] ${item.iconStyle}`}
                      >
                        <Icon size={19} />
                      </div>

                      {/* History Card */}
                      <article className="min-w-0 flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-gray-200 hover:shadow-md sm:p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                          {/* Main information */}
                          <div className="min-w-0">
                            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                              {item.title}
                            </h2>

                            <p className="mt-1.5 text-sm leading-6 text-gray-500">
                              {item.description}
                            </p>

                            <span
                              className={`mt-3 inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium ${item.tagStyle}`}
                            >
                              {item.type}
                            </span>
                          </div>

                          {/* Date / Time */}
                          <div className="flex shrink-0 flex-row gap-4 text-xs text-gray-500 lg:min-w-[145px] lg:flex-col lg:items-start lg:gap-2">
                            <span className="flex items-center gap-1.5 whitespace-nowrap">
                              <Calendar size={14} className="text-gray-400" />
                              {item.date}
                            </span>

                            <span className="flex items-center gap-1.5 whitespace-nowrap">
                              <Clock size={14} className="text-gray-400" />
                              {item.time}
                            </span>
                          </div>

                        </div>
                      </article>
                    </div>
                  );
                })}

                {/* Empty States */}
                {emptyStates.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="relative flex gap-3 sm:gap-4"
                    >
                      {/* Empty timeline icon */}
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 sm:h-[42px] sm:w-[42px]">
                        <Icon size={18} />
                      </div>

                      {/* Empty card */}
                      <article className="min-w-0 flex-1 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <h2 className="text-sm font-medium text-gray-500 sm:text-base">
                              {item.title}
                            </h2>

                            <p className="mt-1.5 max-w-2xl text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                              {item.description}
                            </p>
                          </div>

                          <Icon
                            size={42}
                            strokeWidth={1}
                            className="hidden shrink-0 text-gray-200 sm:block"
                          />
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default FarmHistory;