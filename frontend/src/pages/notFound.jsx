import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Home,
  Leaf,
  Search,
  Sprout,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Main Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">

          {/* 404 Heading */}
          <div>
            <h1 className="text-[100px] sm:text-[140px] lg:text-[180px] leading-none font-bold tracking-tight text-green-700">
              404
            </h1>

            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-gray-900">
              Page Not Found
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-base sm:text-lg leading-7 text-gray-500">
              Oops! The page you're looking for doesn't exist
              or may have been moved.
            </p>
          </div>

          {/* Farm Illustration */}
          <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl">
            <div className="relative h-[260px] sm:h-[320px] lg:h-[360px]">

              {/* Background hills */}
              <div className="absolute bottom-0 left-0 h-32 w-full rounded-[50%_50%_0_0] bg-green-100" />

              <div className="absolute bottom-0 left-[15%] h-28 w-[45%] rounded-[50%_50%_0_0] bg-green-200" />

              <div className="absolute bottom-0 right-[5%] h-32 w-[50%] rounded-[50%_50%_0_0] bg-green-100" />

              {/* Windmill */}
              <div className="absolute bottom-16 left-[15%] hidden sm:block">
                <div className="relative">
                  <div className="mx-auto h-28 w-1 bg-gray-400" />

                  <div className="absolute left-1/2 top-0 -translate-x-1/2">
                    <div className="relative h-14 w-14">
                      <span className="absolute left-1/2 top-1/2 h-14 w-1 -translate-x-1/2 -translate-y-1/2 rotate-0 bg-gray-400" />
                      <span className="absolute left-1/2 top-1/2 h-14 w-1 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-gray-400" />
                      <span className="absolute left-1/2 top-1/2 h-14 w-1 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-400" />
                      <span className="absolute left-1/2 top-1/2 h-14 w-1 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-400" />

                      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Barn */}
              <div className="absolute bottom-12 right-[13%] hidden sm:block">
                <div className="relative h-24 w-32 rounded-b-lg bg-green-200 border border-green-300">
                  {/* Roof */}
                  <div className="absolute -top-10 left-[-10px] h-0 w-0 border-l-[76px] border-r-[76px] border-b-[45px] border-l-transparent border-r-transparent border-b-green-700" />

                  {/* Door */}
                  <div className="absolute bottom-0 left-1/2 h-14 w-10 -translate-x-1/2 rounded-t bg-green-700">
                    <div className="absolute right-1 top-1/2 h-1.5 w-1.5 rounded-full bg-white" />
                  </div>

                  {/* Window */}
                  <div className="absolute left-4 top-5 grid h-7 w-7 grid-cols-2 border border-green-700">
                    <span className="border-r border-green-700" />
                    <span />
                    <span className="border-t border-green-700" />
                    <span className="border-l border-t border-green-700" />
                  </div>
                </div>
              </div>

              {/* Sign */}
              <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
                {/* Sign post */}
                <div className="absolute left-1/2 top-20 h-28 w-3 -translate-x-1/2 bg-amber-800" />

                {/* Sign board */}
                <div className="relative flex h-24 w-64 items-center justify-center rounded-lg border-4 border-amber-900 bg-amber-700 px-5 shadow-lg sm:w-72">
                  <p className="text-center text-lg font-medium leading-6 text-white sm:text-xl">
                    Let's get you
                    <br />
                    back on track
                  </p>

                  <Sprout
                    size={18}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white"
                  />
                </div>
              </div>

              {/* Small rocks / plants */}
              <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-end gap-3">
                <div className="h-5 w-10 rounded-full bg-gray-500" />
                <Leaf size={28} className="text-green-700" />
                <div className="h-6 w-12 rounded-full bg-gray-500" />
                <Leaf size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          {/* Helpful Options */}
          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

            <h3 className="text-lg font-semibold text-gray-900">
              You can try:
            </h3>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">

              {/* Dashboard */}
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                  <Home
                    size={24}
                    className="text-green-700"
                  />
                </div>

                <h4 className="mt-4 text-sm font-semibold text-gray-900">
                  Go to Dashboard
                </h4>

                <p className="mt-1 max-w-[180px] text-xs leading-5 text-gray-500">
                  Return to your farm overview.
                </p>
              </div>

              {/* URL */}
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                  <Search
                    size={24}
                    className="text-green-700"
                  />
                </div>

                <h4 className="mt-4 text-sm font-semibold text-gray-900">
                  Check the URL
                </h4>

                <p className="mt-1 max-w-[180px] text-xs leading-5 text-gray-500">
                  Make sure the web address is correct.
                </p>
              </div>

              {/* Resources */}
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                  <BookOpen
                    size={24}
                    className="text-green-700"
                  />
                </div>

                <h4 className="mt-4 text-sm font-semibold text-gray-900">
                  Explore Resources
                </h4>

                <p className="mt-1 max-w-[180px] text-xs leading-5 text-gray-500">
                  Browse helpful farming tips and guides.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                to="/"
                reloadDocument
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-800"
              >
                <Home size={16} />
                Go to Dashboard
              </Link>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <ArrowLeft size={16} />
                Go Back
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-green-50/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-4 text-left">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                <Sprout
                  size={20}
                  className="text-green-700"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Need help?
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  If you believe this is a mistake, please contact
                  our support team.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-700 px-4 py-2.5 text-sm font-medium text-green-700 transition hover:bg-white"
            >
              Contact Support
              <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </section>
    </main>
  );
};

export default NotFound;