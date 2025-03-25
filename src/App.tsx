
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import RequireAuth from "@/components/auth/RequireAuth";

// Pages
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected admin routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <RequireAuth requireAdmin={true}>
                      <Dashboard />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/dashboard/add-product" 
                  element={
                    <RequireAuth requireAdmin={true}>
                      <AddProduct />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/dashboard/edit-product/:id" 
                  element={
                    <RequireAuth requireAdmin={true}>
                      <EditProduct />
                    </RequireAuth>
                  } 
                />
                
                <Route path="/about" element={<About />} />
                <Route 
                  path="/checkout" 
                  element={
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
