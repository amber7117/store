import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { IoAdd, IoBagAddSharp, IoRemove } from "react-icons/io5";
import { useCart } from "react-use-cart";

//internal import

import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import { notifyError } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import useGetSetting from "@hooks/useGetSetting";
import Discount from "@components/common/Discount";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@components/modal/ProductModal";
import ImageWithFallback from "@components/common/ImageWithFallBack";
import { handleLogEvent } from "src/lib/analytics";

const ProductCard = ({ product, attributes }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const { globalSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const currency = globalSetting?.default_currency || "$";

  const handleAddItem = (p) => {
    if (p.stock < 1) return notifyError("Insufficient stock!");

    if (p?.variants?.length > 0) {
      setModalOpen(!modalOpen);
      return;
    }
    const { slug, variants, categories, description, ...updatedProduct } =
      product;
    const newItem = {
      ...updatedProduct,
      title: showingTranslateValue(p?.title),
      id: p._id,
      variant: p.prices,
      price: p.prices.price,
      originalPrice: product.prices?.originalPrice,
    };
    addItem(newItem);
  };

  const handleModalOpen = (event, id) => {
    setModalOpen(event);
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden">
            <div className="w-full lg:w-1/3 bg-gray-100 flex items-center justify-center p-6">
              <Image
                src={product.image[0] || "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"}
                alt="product"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
            <div className="w-full lg:w-2/3 p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{showingTranslateValue(product?.title)}</h2>
              <p className="text-gray-600 mb-4">{product?.description?.en || "No description available."}</p>
              <div className="flex items-center mb-4">
                <span className="text-xl font-semibold text-green-500 mr-4">{currency}{product.prices.price}</span>
                {product.prices.originalPrice > product.prices.price && (
                  <span className="text-gray-500 line-through">{currency}{product.prices.originalPrice}</span>
                )}
              </div>
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-600">Stock: {product.stock}</span>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <button
                  className="px-4 py-2 bg-gray-200 rounded text-gray-700"
                  onClick={() => updateItemQuantity(product._id, Math.max(1, items.find((item) => item.id === product._id)?.quantity - 1 || 1))}
                >
                  -
                </button>
                <span>{items.find((item) => item.id === product._id)?.quantity || 1}</span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded text-gray-700"
                  onClick={() => updateItemQuantity(product._id, (items.find((item) => item.id === product._id)?.quantity || 1) + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                onClick={() => handleAddItem(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="group box-border overflow-hidden flex flex-col items-center rounded-md shadow-sm bg-white relative" style={{ width: "200px", height: "360px" }}>
        <div
          onClick={() => {
            handleModalOpen(!modalOpen, product._id);
            handleLogEvent(
              "product",
              `opened ${showingTranslateValue(product?.title)} product modal`
            );
          }}
          className="relative flex justify-center cursor-pointer w-full"
          style={{ height: "280px", padding: "10px" }}
        >
          <div className="relative w-full h-full">
            {product.image[0] ? (
              <ImageWithFallback
                src={product.image[0]}
                alt="product"
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px" }}
              />
            ) : (
              <Image
                src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                fill
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
                sizes="100%"
                alt="product"
                className="object-contain transition duration-150 ease-linear transform group-hover:scale-105"
              />
            )}
          </div>
        </div>
        <div className="w-full px-3 text-center">
          <h2 className="text-heading truncate mt-2 block text-sm font-medium text-gray-600">
            <span className="line-clamp-2">
              {showingTranslateValue(product?.title)}
            </span>
          </h2>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
