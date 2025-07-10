import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { 
  Edit3, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { Product } from '../types';
import { useTheme } from '../hooks/useTheme';

interface ProductTableProps {
  products: Product[];
  category?: Product['category'];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const columnHelper = createColumnHelper<Product>();

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  category,
  onEdit,
  onDelete
}) => {
  const { isDarkMode } = useTheme();
  const [globalFilter, setGlobalFilter] = useState('');

  const filteredProducts = useMemo(() => {
    return category 
      ? products.filter(product => product.category === category)
      : products;
  }, [products, category]);

  const columns = useMemo<ColumnDef<Product, any>[]>(() => [
    columnHelper.accessor('image', {
      header: '',
      cell: (info) => (
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          {info.getValue() ? (
            <img
              src={info.getValue()}
              alt={info.row.original.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs text-gray-400">No Image</span>
            </div>
          )}
        </div>
      ),
      enableSorting: false,
      size: 60,
    }),
    columnHelper.accessor('name', {
      header: 'Product',
      cell: (info) => (
        <div>
          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {info.getValue()}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {info.row.original.types}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          getCategoryColor(info.getValue())
        }`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Price',
      cell: (info) => (
        <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          ${info.getValue().toLocaleString()}
        </span>
      ),
    }),
    columnHelper.accessor('rate', {
      header: 'Rating',
      cell: (info) => (
        <div className="flex items-center gap-1">
          <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {info.getValue()}
          </span>
          <span className="text-amber-500">★</span>
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          getStatusColor(info.getValue())
        }`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('miles', {
      header: 'Miles',
      cell: (info) => (
        <span className="text-amber-600 dark:text-amber-400 font-medium">
          {info.getValue().toLocaleString()}
        </span>
      ),
    }),
    columnHelper.accessor('orders', {
      header: 'Orders',
      cell: (info) => (
        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {info.getValue().toLocaleString()}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(info.row.original)}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-400 hover:text-blue-400'
                : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
            }`}
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(info.row.original.id)}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400'
                : 'hover:bg-gray-100 text-gray-600 hover:text-red-600'
            }`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
      size: 80,
    }),
  ], [isDarkMode, onEdit, onDelete]);

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const getCategoryColor = (category: Product['category']) => {
    switch (category) {
      case 'House':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      case 'Cars':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Travel':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Electronics':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Beverage':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'Limited':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <input
          type="text"
          placeholder="Search products..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`text-left py-3 px-4 font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <div className="flex flex-col">
                            <ChevronUp
                              className={`w-3 h-3 ${
                                header.column.getIsSorted() === 'asc'
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                            <ChevronDown
                              className={`w-3 h-3 -mt-1 ${
                                header.column.getIsSorted() === 'desc'
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                } hover:bg-gray-50 dark:hover:bg-gray-700/50`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} results
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-400 disabled:opacity-50'
                : 'hover:bg-gray-100 text-gray-600 disabled:opacity-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className={`px-3 py-1 rounded-lg ${
            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
          }`}>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-400 disabled:opacity-50'
                : 'hover:bg-gray-100 text-gray-600 disabled:opacity-50'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};