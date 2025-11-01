"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, AlertCircle, X } from "lucide-react";
import Image from "next/image";

// Define types for better type safety
interface Blog {
  _id: string;
  title: string;
  content: string;
  mediaUrl?: string;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Base API URL
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://farmferry-backend-n04p.onrender.com";
  // Full API endpoint for blogs
  const BLOGS_API_URL = `${BASE_API_URL}/api/blogs`;

  // Function to fetch blogs from the API
  const fetchBlogsFromAPI = async (): Promise<Blog[]> => {
    try {
      console.log("Fetching blogs from:", BLOGS_API_URL);
      
      const res = await fetch(BLOGS_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Add cache busting to prevent caching issues
        cache: "no-store",
      });
      
      if (!res.ok) {
        // Try to get more error details
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log("Fetched blogs:", data);
      return data;
    } catch (err) {
      console.error("Error fetching blogs:", err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchBlogsFromAPI();
        setBlogs(data);
        setError(null);
      } catch (err) {
        // Type assertion to handle unknown error type
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, [BLOGS_API_URL]);

  // Retry function for failed requests
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    
    const fetchBlogs = async () => {
      try {
        const data = await fetchBlogsFromAPI();
        setBlogs(data);
        setError(null);
      } catch (err) {
        // Type assertion to handle unknown error type
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  };

  // Function to open the blog modal
  const openBlogModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Function to close the blog modal
  const closeBlogModal = () => {
    setIsModalOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Clean up body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle image errors
  const handleImageError = (blogId: string) => {
    setImageErrors(prev => new Set(prev).add(blogId));
  };

  return (
    <div className="pb-16 bg-gray-50">
      {/* === Hero Section === */}
      <section className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Use a placeholder image or ensure this image exists in your public folder */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-green-900" />
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Insights That Grow the Future 🌾
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-gray-100 text-lg md:text-xl leading-relaxed"
          >
            Stay informed with the latest agricultural innovations, stories, and
            expert insights — helping farmers and communities thrive sustainably.
          </motion.p>
        </div>

        <div className="absolute bottom-0 w-full h-16 bg-gray-50 rounded-t-[50%]" />
      </section>

      {/* === Error Message === */}
      {error && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3" size={24} />
              <div>
                <h3 className="text-red-800 font-medium">Failed to load blogs</h3>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <p className="text-red-500 text-xs mt-1">API Endpoint: {BLOGS_API_URL}</p>
                <p className="text-red-500 text-xs mt-1">Base URL: {BASE_API_URL}</p>
              </div>
            </div>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </section>
      )}

      {/* === Blog List Section === */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-600 text-lg">No blogs available yet.</p>
            <p className="text-gray-500 text-sm mt-2">API Endpoint: {BLOGS_API_URL}</p>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <motion.div
              // Ensure each blog has a unique key
              key={blog._id || `blog-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full h-48">
                {blog.mediaUrl && !imageErrors.has(blog._id) ? (
                  <Image
                    src={blog.mediaUrl}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(blog._id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-green-900 mb-2 hover:text-green-700 transition-colors cursor-pointer">
                  {blog.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                  <span className="flex items-center gap-1">
                    <User size={16} /> Admin
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.content}
                </p>
                <button 
                  onClick={() => openBlogModal(blog)}
                  className="text-green-700 font-medium hover:underline"
                >
                  Read More →
                </button>
              </div>
            </motion.div>
          ))
        )}
      </section>

      {/* Blog Modal with AnimatePresence */}
      <AnimatePresence>
        {isModalOpen && selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            onClick={closeBlogModal}
          >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-black opacity-75"></div>
              </div>

              {/* Modal panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Close button */}
                  <button
                    onClick={closeBlogModal}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Blog image */}
                  {selectedBlog.mediaUrl && !imageErrors.has(selectedBlog._id) ? (
                    <div className="relative w-full h-64 md:h-96">
                      <Image
                        src={selectedBlog.mediaUrl}
                        alt={selectedBlog.title}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(selectedBlog._id)}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Image unavailable</span>
                    </div>
                  )}

                  {/* Blog content */}
                  <div className="px-6 py-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">
                      {selectedBlog.title}
                    </h2>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-6 space-x-4">
                      <span className="flex items-center gap-1">
                        <User size={16} /> Admin
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />{" "}
                        {new Date(selectedBlog.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-700">
                      {selectedBlog.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}