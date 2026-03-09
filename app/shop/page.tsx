
"use client";

import React, { useEffect, useState, useMemo, ChangeEvent } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import jsPDF from "jspdf";
import { HiX, HiCheckCircle, HiExclamationCircle, HiShoppingCart } from "react-icons/hi";

// Interfaces remain the same
interface Product {
  _id: string;
  name: string;
  price: number;
  stock?: number;
  description?: string;
  image?: { url: string };
  totalSold?: number;
  section: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Toast {
  id: string;
  type: "success" | "error" | "warning";
  message: string;
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [selectedSector, setSelectedSector] = useState<string>("farmProduce");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState<boolean>(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);

  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [quantity, setQuantity] = useState<number>(1);

  // Categories for each section
  const farmProduceCategories = ["all", "tubers", "grains", "livestock", "vegetables"];
  const farmInputCategories = ["all", "machinery", "equipment", "chemical", "seedlings", "medicine"];

  const currentCategories = selectedSector === "farmProduce" 
    ? farmProduceCategories 
    : farmInputCategories;

  // Toast notification system
  const addToast = (type: Toast["type"], message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "products"));
      const data: Product[] = snapshot.docs.map(
        (doc: QueryDocumentSnapshot) => {
          const prodData = doc.data();
          return {
            _id: doc.id,
            name: prodData.name,
            price: prodData.price,
            stock: prodData.stock,
            description: prodData.description,
            image: prodData.image,
            totalSold: prodData.totalSold ?? 0,
            section: prodData.section,
            category: prodData.category,
          };
        }
      );
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
      addToast("error", "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Memoized logic to filter and group products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.section === selectedSector);
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [products, selectedSector, selectedCategory, search]);

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      const { category } = product;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [filteredProducts]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSectorChange = (sector: string) => {
    setSelectedSector(sector);
    setSelectedCategory("all");
  };

  const openModal = (product: Product): void => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const addToCart = (product: Product, qty: number): void => {
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        const updated = prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + qty, product.stock ?? qty) }
            : item
        );
        return updated;
      }
      return [...prev, { ...product, quantity: qty }];
    });
    setIsCartOpen(true);
    closeModal();
    addToast("success", `${product.name} added to cart`);
  };

  const removeFromCart = (id: string): void => {
    setCart((prev) => prev.filter((p) => p._id !== id));
    addToast("warning", "Item removed from cart");
  };

  const updateCartQuantity = (id: string, qty: number): void => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: Math.min(qty, item.stock ?? qty) } : item
      )
    );
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      addToast("error", "Cart is empty!");
      return;
    }

    if (!orderForm.name || !orderForm.email || !orderForm.phone) {
      addToast("error", "Please fill in all order details");
      return;
    }

    setIsSubmittingOrder(true);

    try {
      const orderData = {
        customerName: orderForm.name,
        email: orderForm.email,
        phone: orderForm.phone,
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
        totalAmount: cartTotal,
        status: "pending",
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "orders"), orderData);

      for (const item of cart) {
        const productRef = doc(db, "products", item._id);
        const newStock = (item.stock ?? 0) - item.quantity;
        const newSold = (item.totalSold ?? 0) + item.quantity;
        await updateDoc(productRef, {
          stock: newStock >= 0 ? newStock : 0,
          totalSold: newSold,
        });
      }

      let itemsText = "";
      cart.forEach((item) => {
        itemsText += `${item.name} x${item.quantity} - ₦${item.price * item.quantity}\n`;
      });

      const formspreeResponse = await fetch("https://formspree.io/f/xeelgwvr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: orderForm.name,
          email: orderForm.email,
          phone: orderForm.phone,
          items: itemsText,
          total: `₦${cartTotal}`,
        }),
      });

      if (!formspreeResponse.ok) {
        throw new Error("Failed to send email notification");
      }

      generatePDF(orderData);

      setCart([]);
      setOrderForm({ name: "", email: "", phone: "" });
      setIsOrderFormOpen(false);
      fetchProducts();

      addToast("success", "Order submitted successfully!");
    } catch (error: any) {
      console.error("Order submission error:", error);
      addToast("error", "Failed to submit order: " + (error.message || error));
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const generatePDF = (orderData: any) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Order Details", 10, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${orderData.customerName}`, 10, 30);
    doc.text(`Email: ${orderData.email}`, 10, 40);
    doc.text(`Phone: ${orderData.phone}`, 10, 50);
    doc.text("Items:", 10, 60);
    let y = 70;
    orderData.items.forEach((item: any) => {
      doc.text(`${item.name} x${item.quantity} - ₦${item.price * item.quantity}`, 10, y);
      y += 10;
    });
    doc.text(`Total Amount: ₦${orderData.totalAmount}`, 10, y + 10);
    doc.save(`order_${Date.now()}.pdf`);
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-20 flex flex-col md:flex-row relative">
      {/* Toast Notifications */}
      <div className="fixed top-24 right-6 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white animate-fadeIn ${
              toast.type === "success" ? "bg-green-600" :
              toast.type === "error" ? "bg-red-600" : "bg-yellow-600"
            }`}
          >
            {toast.type === "success" && <HiCheckCircle className="text-xl" />}
            {toast.type === "error" && <HiExclamationCircle className="text-xl" />}
            {toast.type === "warning" && <HiExclamationCircle className="text-xl" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="flex-1 px-6 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
            <p className="text-gray-500 mt-1">Browse and discover available products</p>
          </div>
          <button
            onClick={toggleCart}
            className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition flex items-center gap-2"
          >
            <HiShoppingCart className="text-xl" />
            Cart ({cart.length})
          </button>
        </div>

        {/* Sector Selection Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleSectorChange("farmInput")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              selectedSector === "farmInput"
                ? "bg-green-700 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Farm Inputs
          </button>
          <button
            onClick={() => handleSectorChange("farmProduce")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              selectedSector === "farmProduce"
                ? "bg-green-700 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Farm Produce
          </button>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {currentCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <input
            type="text"
            placeholder={`Search in ${selectedSector === "farmInput" ? "Farm Inputs" : "Farm Produce"}...`}
            value={search}
            onChange={handleSearchChange}
            className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-black"
          />
        </div>

        {/* Products Grid - Grouped by Category */}
        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-200 rounded-full p-4 mb-4 inline-block">
              <HiExclamationCircle className="text-gray-500 text-3xl" />
            </div>
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
                    >
                      <div className="h-52 bg-gray-100">
                        {product.image?.url ? (
                          <img
                            src={product.image.url}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-xs text-gray-500 mt-1 capitalize">{product.category}</p>
                        <p className="text-green-700 font-bold mt-1">₦{product.price}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Total Sold: {product.totalSold ?? 0}
                        </p>
                        <button
                          onClick={() => openModal(product)}
                          className="mt-auto w-full bg-green-700 text-white py-2.5 rounded-xl font-medium hover:bg-green-800 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CART SIDEBAR */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl p-6 transform transition-transform ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
              <HiX className="text-2xl" />
            </button>
          </div>
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <HiShoppingCart className="text-gray-300 text-5xl mx-auto mb-4" />
              <p className="text-gray-500">Cart is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex-1">
                    <p className="font-medium text-black">{item.name}</p>
                    <p className="text-black">
                      ₦{item.price} × {item.quantity} = ₦{item.price * item.quantity}
                    </p>
                    <input
                      type="number"
                      min={1}
                      max={item.stock ?? 1}
                      value={item.quantity}
                      onChange={(e) => updateCartQuantity(item._id, Number(e.target.value))}
                      className="w-20 mt-1 border rounded px-2 py-1 text-black"
                    />
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    className="text-red-600 font-bold hover:text-red-700"
                  >
                    <HiX className="text-xl" />
                  </button>
                </div>
              ))}
              <div className="mt-4 border-t pt-2 font-semibold flex justify-between text-black">
                <span>Total:</span>
                <span>₦{cartTotal}</span>
              </div>
            </div>
          )}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={toggleCart}
              className="w-full border border-black py-2.5 rounded-xl text-black font-medium hover:bg-gray-100 transition"
            >
              Close Cart
            </button>
            {cart.length > 0 && (
              <button
                onClick={() => {
                  toggleCart();
                  setIsOrderFormOpen(true);
                }}
                className="w-full bg-black text-white py-2.5 rounded-xl font-medium hover:bg-gray-900 transition"
              >
                Complete Order
              </button>
            )}
          </div>
        </div>

        {/* PRODUCT MODAL */}
        {isModalOpen && selectedProduct && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={closeModal}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden animate-fadeIn"
            >
              <div className="h-80 bg-gray-100">
                {selectedProduct.image?.url ? (
                  <img
                    src={selectedProduct.image.url}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                    <p className="text-green-700 text-xl font-semibold mt-1">₦{selectedProduct.price}</p>
                    <p className="text-gray-500 mt-2 text-sm">
                      Total Sold: {selectedProduct.totalSold ?? 0}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    <HiX />
                  </button>
                </div>

                {selectedProduct.stock !== undefined && (
                  <span
                    className={`inline-block mt-4 px-4 py-1 rounded-full text-sm font-medium ${
                      selectedProduct.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : "Out of stock"}
                  </span>
                )}

                {selectedProduct.description && (
                  <p className="mt-4 text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                )}

                {selectedProduct.stock && selectedProduct.stock > 0 && (
                  <div className="mt-4 flex items-center gap-3">
                    <label className="font-medium text-black">Quantity:</label>
                    <input
                      type="number"
                      min={1}
                      max={selectedProduct.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-20 border rounded px-2 py-1 text-black"
                    />
                  </div>
                )}

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => addToCart(selectedProduct, quantity)}
                    className="flex-1 bg-green-700 text-white py-3 rounded-xl font-medium hover:bg-green-800 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 border border-black py-3 rounded-xl font-medium text-black hover:bg-gray-50 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ORDER FORM WITH EMBEDDED MAP */}
        {isOrderFormOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={() => setIsOrderFormOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden animate-fadeIn p-6 flex flex-col gap-4"
            >
              <h2 className="text-2xl font-bold mb-2 text-black">Complete Your Order</h2>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={orderForm.name}
                onChange={handleOrderFormChange}
                className="w-full px-4 py-2 border rounded text-black"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={orderForm.email}
                onChange={handleOrderFormChange}
                className="w-full px-4 py-2 border rounded text-black"
              />
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                value={orderForm.phone}
                onChange={handleOrderFormChange}
                className="w-full px-4 py-2 border rounded text-black"
              />

              {/* Embedded Google Map */}
              <div className="mt-2">
                <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-300">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.419621919443!2d8.905320875029828!3d9.898965490201327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105373005c01dba5%3A0xd219b052da4f77d8!2sAga%20geoscience%20consulting%20company!5e0!3m2!1sen!2sng!4v1773034322463!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Pickup Location - Aga Geoscience Consulting Company"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Pickup Location: Aga Geoscience Consulting Company
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={submitOrder}
                  disabled={isSubmittingOrder}
                  className={`flex-1 py-2.5 rounded-xl font-medium transition ${
                    isSubmittingOrder
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-green-700 text-white hover:bg-green-800"
                  }`}
                >
                  {isSubmittingOrder ? "Submitting..." : "Submit Order"}
                </button>
                <button
                  onClick={() => setIsOrderFormOpen(false)}
                  className="flex-1 border border-black py-2.5 rounded-xl font-medium text-black hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}