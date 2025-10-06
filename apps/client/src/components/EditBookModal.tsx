import { CloseOutlined } from "@ant-design/icons";
import type { EditBookModalProps } from "../types";

export default function EditBookModal({
  editingBook,
  setEditingBook,
  setEditFormData,
  editFormData,
  handleInputChange,
  handleSaveEdit,
  isEditing,
}: EditBookModalProps) {
  return (
    <>
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Enhanced Backdrop */}
          <div
            className="absolute inset-0 bg-opacity-20 backdrop-blur-sm"
            onClick={() => {
              setEditingBook(null);
              setEditFormData({});
            }}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white/20 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-white/30 transform transition-all duration-300 scale-100">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  Edit Book
                </h3>
                <p className="text-sm text-gray-600">
                  Update your book details
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingBook(null);
                  setEditFormData({});
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-70 transition-all duration-200 transform hover:scale-110"
              >
                <CloseOutlined className="text-lg" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Book Cover Image
                </label>
                <input
                  type="text"
                  value={editFormData.image || ""}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-sm"
                  placeholder="https://example.com/image.jpg"
                />
                {editFormData.image && (
                  <div className="mt-2 w-16 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={editFormData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "";
                        target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  value={editFormData.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-sm"
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author Name *
                </label>
                <input
                  type="text"
                  value={editFormData.author || ""}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-sm"
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Genre *
                </label>
                <input
                  type="text"
                  value={editFormData.genre || ""}
                  onChange={(e) => handleInputChange("genre", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-sm"
                  placeholder="e.g., Fiction, Romance, Thriller"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Publication Date
                </label>
                <input
                  type="date"
                  value={editFormData.publicationDate || ""}
                  onChange={(e) =>
                    handleInputChange("publicationDate", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setEditingBook(null);
                  setEditFormData({});
                }}
                className="cursor-pointer flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:bg-opacity-70 transition-all duration-300 font-medium transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={
                  isEditing ||
                  !editFormData.title ||
                  !editFormData.author ||
                  !editFormData.genre
                }
                className="cursor-pointer flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl transition-all duration-300 font-medium transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isEditing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
