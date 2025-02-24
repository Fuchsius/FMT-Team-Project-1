import React from "react";

const TopFeatures = () => {
  return (
    <div>
      <div class="container mx-auto py-12 px-4">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-purple-800">Our Top Features</h2>
          <h1 class="text-4xl font-bold text-gray-900 mt-2">
            Achieve Your Goal With SkillGro
          </h1>
          <p class="text-gray-500 mt-4 text-sm">
            when an unknown printer took a galley of type and scrambled it to
            make a specimen book has not only five centuries
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div class="bg-blue-200 rounded-full p-4 mb-4">
              <svg
                class="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Expert Tutors
            </h3>
            <p class="text-gray-600 text-sm">
              When An Unknown Printer Took A Galley Offe Type And Scrambled
              Makes.
            </p>
            <span class="text-yellow-400 mt-4 text-sm">✨</span>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-purple-100 hover:shadow-xl transition-shadow duration-300">
            <div class="bg-purple-200 rounded-full p-4 mb-4">
              <svg
                class="w-8 h-8 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM10 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM13.5 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Effective Courses
            </h3>
            <p class="text-gray-600 text-sm">
              When An Unknown Printer Took A Galley Offe Type And Scrambled
              Makes.
            </p>
            <span class="text-yellow-400 mt-4 text-sm">✨</span>
          </div>

          <div class="bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-yellow-100 hover:shadow-xl transition-shadow duration-300">
            <div class="bg-yellow-200 rounded-full p-4 mb-4">
              <svg
                class="w-8 h-8 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Earn Certificate
            </h3>
            <p class="text-gray-600 text-sm">
              When An Unknown Printer Took A Galley Offe Type And Scrambled
              Makes.
            </p>
            <span class="text-yellow-400 mt-4 text-sm">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFeatures;
