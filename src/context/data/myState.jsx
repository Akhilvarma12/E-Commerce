import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { orderBy, Timestamp } from "firebase/firestore/lite";

function myState(props) {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode == "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("All fields are required");
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product added successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };
  const [product, setProduct] = useState([]);
  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);
  const editHandle=(item)=>{
    setProducts(item);
  }
  const updateProduct=async()=>{
    setLoading(true)
    try {
      await setDoc(doc(fireDB,'products',products.id),products);
      toast.success('Product updated successfully');
      getProductData();
      setTimeout(()=>{
        window.location.href='/dashboard'
      },800)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const deleteProduct=async(item)=>{
    setLoading(true)
    try {
      await deleteDoc(doc(fireDB,'products',item.id));
      toast.success('Product deleted successfully');
      setLoading(false)
      getProductData();
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        editHandle,updateProduct,deleteProduct
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default myState;
