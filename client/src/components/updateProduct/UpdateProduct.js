import { useEffect, useState } from "react";
import "./UpdateProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if ( !isValid(id)) {
      toast.error("Invalid Product Id");
      navigate("/");
    }
  },[]);

  const isValid = (id) => {
    return /^[a-fA-F0-9]{24}$/.test(id);
  };

  useEffect(() => {
    const getProduct = async () => {
      let response = await fetch(
        `http://localhost:8000/updatefindproduct/${id}`,
        {
          headers: { authorization: `Bearer ${localStorage.getItem("user")}` },
        }
      );
      response = await response.json();
      if (response.status === 200) {
        const { name, price, category, company } = response.product;
        setInputValue({ name, price, category, company });
      } else {
        toast.error(response.message);
      }
    };

    if (id) {
      getProduct();
    }
  }, []);

  const inputChange = async (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, category, company } = inputValue;
    let response = await fetch(`http://localhost:8000/updateproduct`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company, id }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });
    response = await response.json();
    if (response.status === 201) {
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="form_container">
      <h2 className="form_title">Update Product</h2>
      <form onSubmit={handleSubmit} className="product_form">
        <div className="form_group">
          <label className="form_label" htmlFor="name">
            Name:
          </label>
          <input
            value={inputValue.name}
            onChange={inputChange}
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
            value={inputValue.price}
            onChange={inputChange}
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
            value={inputValue.category}
            onChange={inputChange}
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
            value={inputValue.company}
            onChange={inputChange}
            type="text"
            id="company"
            name="company"
            className="form_input"
            placeholder="Enter company name"
          />
        </div>
        <button type="submit" className="form_button">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
