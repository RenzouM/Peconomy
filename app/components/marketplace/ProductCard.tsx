"use client";
import Image from "next/image";
import { Product } from "../../data/mockData";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const formatPrice = (price: number, currency: string) => {
    if (currency === "ETH") {
      return `${price} ETH`;
    }
    return `$${price} ${currency}`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={i}
          className="text-yellow-400">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span
          key="half"
          className="text-yellow-400">
          ☆
        </span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span
          key={`empty-${i}`}
          className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group overflow-hidden">
      {/* Product Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>}
          {product.isFeatured && <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">FEATURED</span>}
          {product.isOnSale && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">SALE</span>}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">{product.stock} left</span>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <button
              onClick={e => {
                e.stopPropagation();
                onViewDetails?.(product);
              }}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              View Details
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Creator Info */}
        <div className="flex items-center space-x-2 mb-2">
          <Image
            src={product.creator.avatar}
            alt={product.creator.name}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-sm text-gray-600">{product.creator.name}</span>
          {product.creator.verified && <span className="text-blue-500 text-sm">✓</span>}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price, product.currency)}</span>
            {product.originalPrice && <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice, product.currency)}</span>}
          </div>
          {product.isOnSale && product.originalPrice && <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</span>}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
          {product.tags.length > 2 && <span className="text-gray-400 text-xs px-2 py-1">+{product.tags.length - 2} more</span>}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart?.(product)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
