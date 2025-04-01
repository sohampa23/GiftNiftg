import React, { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/wishlist/user123") // Replace with actual API rutvi
      .then(response => setWishlist(response.data.wishlist.items))
      .catch(error => console.error("Error fetching wishlist:", error));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1  className="text-2xl font-bold text-center text-red-500">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        wishlist.map((item, index) => (
          <p className="p-3 bg-gray-100 rounded-md shadow" key={index}>Product ID: {item.productId}</p>
        ))
      ) : (
        <p className="mt-4 text-center text-gray-500">Wishlist is empty!</p>
      )}
    </div>
  );
};

export default Wishlist;
