// components/RatingModal.tsx

import { RatingModalProps } from "@/types/types";
import React from "react";

const RatingModal = ({
  isModalOpen,
  selectedRating,
  handleRatingChange,
  handleSubmitRating,
  handleClose,
  statusMessage
}: RatingModalProps) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-md">
      <div className="bg-gray-900 p-6 rounded-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-white mb-4">{statusMessage}</h2>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <button
              key={rating}
              className={`p-4 text-2xl font-semibold text-white rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                rating === selectedRating
                  ? "bg-indigo-600 scale-105"
                  : "bg-gray-700 hover:bg-indigo-500"
              }`}
              onClick={() => handleRatingChange(rating)}
            >
              {rating}
            </button>
          ))}
        </div>

        <div className="flex justify-between gap-4">
          <button
            className="w-full py-2 text-lg font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className={`w-full py-2 text-lg font-medium text-white rounded-lg transition-all duration-300 
              ${statusMessage === "Successfully rated ✅" ? 
                "bg-gray-400 cursor-not-allowed opacity-50" : 
                "bg-indigo-600 hover:bg-indigo-700"
            }`}
            onClick={handleSubmitRating}
            disabled={statusMessage === "Successfully rated ✅"}
          >
            {statusMessage === "Successfully rated ✅" ? 'Already voted.' : 'Submit rating'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
