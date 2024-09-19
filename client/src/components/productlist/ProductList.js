import "./ProductList.css";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";



const ProductList = () => {

  const [products, setProducts] = useState([]);
  const [productDelete, setProductDelete] = useState("");
  const [loading, setLoading] = useState(true); // State to control loading spinner
  const navigate = useNavigate();

  useEffect(() => {
    const productsFromDB = async () => {
      let response = await fetch("http://localhost:8000/findproduct",{
        headers:{"authorization":`Bearer ${localStorage.getItem("user")}`}
      });
      response = await response.json();
      if (response.status === 200) {
        setProducts(response.products);
      } else {
        toast.error(response.message);
      }
      setLoading(false); // Hide spinner after fetch completes
    };

    productsFromDB();
  }, []);

  /////////delete product//////////

  const deleteProduct = async () => {
    // if (!productDelete) return; // Avoid delete call if productDelete is empty
    let reponse = await fetch(
      `http://localhost:8000/deleteproduct/${productDelete}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    reponse = await reponse.json();

    if (reponse.status !== 200) {
      toast.error(reponse.message);
    } else {
      toast.success(reponse.message);
      setProducts(products.filter((product) => product._id !== productDelete));
    }
    // Reset productDelete state
    setProductDelete("");
  };
  if (productDelete) {
    deleteProduct();
  }

  const handleRedirectParams = async (id) => {
    navigate(`/update-product/${id}`);
  };

  if (loading) {
    return (
      <div
        style={{ textAlign: "center", marginTop: "200px" }}
        className="spinner-container"
      >
        <ClipLoader color="#00bfff" loading={loading} size={30} />
      </div>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th> Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Company</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>

      {products.map((product, index) => {
        return (
          <tbody key={index}>
            <tr>
              <th>{product.name} </th>
              <th>{product.price}</th>
              <th>{product.category}</th>
              <th>{product.company}</th>
              <th
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                <GrUpdate onClick={() => handleRedirectParams(product._id)} />
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
              >
                <MdDelete onClick={() => setProductDelete(product._id)} />
              </th>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default ProductList;
