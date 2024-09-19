import { useState } from "react";
import "./AddProduct.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submitProduct = await fetch("http://localhost:8000/addproduct", {
      method: "POST",
      body: JSON.stringify(inputValue),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });

    submitProduct = await submitProduct.json();
    if (submitProduct.status !== 201) {
      toast.error(submitProduct.message);
    } else {
      toast.success(submitProduct.message);
      setInputValue({
        name: "",
        price: "",
        category: "",
        company: "",
      });
      navigate("/");
    }
  };

  return (
    <div className="form_container">
      <h2 className="form_title">Add Product</h2>
      <form onSubmit={handleSubmit} className="product_form">
        <div className="form_group">
          <label className="form_label" htmlFor="name">
            Name:
          </label>
          <input
            onChange={handleChange}
            value={inputValue.name}
            type="text"
            id="name"
            name="name"
            className="form_input"
            placeholder="Enter product name"
          />
        </div>
        <div className="form_group">
          <label className="form_label" htmlFor="price">
            Price:
          </label>
          <input
            onChange={handleChange}
            value={inputValue.price}
            type="text"
            id="price"
            name="price"
            className="form_input"
            placeholder="Enter product price"
          />
        </div>
        <div className="form_group">
          <label className="form_label" htmlFor="category">
            Category:
          </label>
          <input
            onChange={handleChange}
            value={inputValue.category}
            type="text"
            id="category"
            name="category"
            className="form_input"
            placeholder="Enter product category"
          />
        </div>
        <div className="form_group">
          <label className="form_label" htmlFor="company">
            Company:
          </label>
          <input
            onChange={handleChange}
            value={inputValue.company}
            type="text"
            id="company"
            name="company"
            className="form_input"
            placeholder="Enter company name"
          />
        </div>
        <button type="submit" className="form_button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
