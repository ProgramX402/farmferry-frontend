"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, AlertCircle, X } from "lucide-react";
import Image from "next/image";

// ---- Types ----
interface Blog {
  _id: string;
  title: string;
  content: string;
  mediaUrl?: string;
  createdAt: string;
}

// ---- Hero Background Image ----
const HERO_BG =
  "/founder.jpg";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // BASE URL
  const BASE_API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://farmferry-backend-n04p.onrender.com";

  const BLOGS_API_URL = `${BASE_API_URL}/api/blogs`;

  // ---- Fetch Blogs ----
  const fetchBlogsFromAPI = async (): Promise<Blog[]> => {
    try {
      const res = await fetch(BLOGS_API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error(`Server responded with ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
      throw err;
    }
  };

  // ---- Load Blogs ----
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchBlogsFromAPI();
        setBlogs(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [BLOGS_API_URL]);

  // ---- Retry ----
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchBlogsFromAPI()
      .then((data) => {
        setBlogs(data);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => setLoading(false));
  };

  // ---- Modal ----
  const openBlogModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBlogModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // ---- Handle Broken Images ----
  const handleImageError = (blogId: string) => {
    setImageErrors((prev) => new Set(prev).add(blogId));
  };

  return (
    <div className="pb-16 bg-gray-50">
      {/* ============================
          HERO SECTION WITH BACKGROUND
      ============================== */}
      <section
        className="
        relative w-full 
        h-[75vh] md:h-[90vh] 
        flex items-center justify-center 
        overflow-hidden
      "
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl"
          >
            Insights That Grow the Future 🌾
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-gray-100 text-lg md:text-2xl leading-relaxed drop-shadow"
          >
            Stay informed with the latest agricultural innovations, stories, and
            expert insights — helping farmers and communities thrive
            sustainably.
          </motion.p>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 w-full h-16 bg-gray-50 rounded-t-[50%]" />
      </section>

      {/* ============================
          ERROR SECTION
      ============================== */}
      {error && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3" size={24} />
              <div>
                <h3 className="text-red-800 font-medium">Failed to load blogs</h3>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <p className="text-red-500 text-xs mt-1">Endpoint: {BLOGS_API_URL}</p>
              </div>
            </div>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </section>
      )}

      {/* ============================
          BLOG CARDS
      ============================== */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-600 text-lg">No blogs available yet.</p>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <motion.div
              key={blog._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
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
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3
                  onClick={() => openBlogModal(blog)}
                  className="text-lg font-bold text-green-900 mb-2 hover:text-green-700 cursor-pointer"
                >
                  {blog.title}
                </h3>

                <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                  <span className="flex items-center gap-1">
                    <User size={16} /> Admin
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
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

      {/* ============================
          MODAL
      ============================== */}
      <AnimatePresence>
        {isModalOpen && selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            onClick={closeBlogModal}
          >
            <div className="flex items-center justify-center min-height-screen px-4 pt-4 pb-20">
              <div className="fixed inset-0 bg-black/75" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white rounded-lg max-w-3xl w-full shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeBlogModal}
                  className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full shadow hover:bg-white"
                >
                  <X size={20} />
                </button>

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
                  <div className="w-full h-64 md:h-96 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">Image unavailable</span>
                  </div>
                )}

                <div className="px-6 py-6">
                  <h2 className="text-3xl font-bold text-green-900 mb-4">
                    {selectedBlog.title}
                  </h2>

                  <div className="flex items-center text-gray-500 text-sm mb-6 space-x-4">
                    <span className="flex items-center gap-1">
                      <User size={16} /> Admin
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(selectedBlog.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="prose text-gray-700">
                    {selectedBlog.content.split("\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
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
