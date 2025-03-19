
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Package, Edit, Trash2, Star, Gauge, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import PageWrapper from '@/components/layout/PageWrapper';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { useProducts } from '@/context/ProductContext';

const Dashboard = () => {
  const { products, isLoading, deleteProduct } = useProducts();
  const navigate = useNavigate();

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Calculate dashboard statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price * product.inventory, 0);
  const featuredProducts = products.filter((product) => product.featured).length;
  const lowStockProducts = products.filter((product) => product.inventory < 5).length;

  return (
    <>
      <Header />
      <CartDrawer />
      <PageWrapper>
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-medium mb-1">Dashboard</h1>
              <p className="text-gray-600">Manage your products and inventory</p>
            </div>
            <Button asChild className="mt-4 md:mt-0 bg-giftoria-slate hover:bg-giftoria-slate/90">
              <Link to="/dashboard/add-product">
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="animate-slide-up">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-500">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-giftoria-slate mr-2" />
                  <span className="text-3xl font-medium">{totalProducts}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up [animation-delay:75ms]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-500">Inventory Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-medium">{formatPrice(totalValue)}</div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up [animation-delay:150ms]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-500">Featured Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-giftoria-gold mr-2" />
                  <span className="text-3xl font-medium">{featuredProducts}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up [animation-delay:225ms]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-500">Low Stock Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Gauge className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-3xl font-medium">{lowStockProducts}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Table */}
          <Card className="animate-slide-up [animation-delay:300ms]">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your product catalog here. You can edit, delete or view any product.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-12 bg-gray-200 rounded" />
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded" />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No products yet</h3>
                  <p className="text-gray-500 mb-6">
                    Get started by adding your first product.
                  </p>
                  <Button asChild>
                    <Link to="/dashboard/add-product">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Inventory</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{formatPrice(product.price)}</TableCell>
                          <TableCell className={product.inventory < 5 ? 'text-red-500' : ''}>
                            {product.inventory}
                          </TableCell>
                          <TableCell>
                            {product.featured ? (
                              <Star className="h-4 w-4 text-giftoria-gold" />
                            ) : (
                              '—'
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/product/${product.id}`)}
                                aria-label={`View ${product.name}`}
                              >
                                <ArrowUpRight className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/dashboard/edit-product/${product.id}`)}
                                aria-label={`Edit ${product.name}`}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Delete ${product.name}`}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-500 hover:bg-red-600"
                                      onClick={() => deleteProduct(product.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default Dashboard;
