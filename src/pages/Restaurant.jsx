import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api.js";
import { CartContext } from "../contexts/CartContext";

const Restaurant = () => {
  const { id } = useParams();
  const [rest, setRest] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      const res = await API.get(`/restaurants/${id}`);
      setRest(res.data);
    })();
  }, [id]);

  if (!rest) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container py-4">
      <div className="row align-items-center mb-4">
        <div className="col-md-8">
          <h2 className="mb-1">{rest.name}</h2>
          <p className="text-muted">{rest.location}</p>
        </div>
        <div className="col-md-4">
          {rest.image && <img src={rest.image} alt={rest.name} className="img-fluid rounded-3" />}
        </div>
      </div>

      <div className="row">
        {rest.menu?.map(item => (
          <div className="col-md-4 mb-4" key={item._id || item.name}>
            <div className="card h-100 shadow-sm">
              {item.image && <img src={item.image} alt={item.name} className="card-img-top" style={{height:180, objectFit:"cover"}}/>}
              <div className="card-body d-flex flex-column">
                <h5>{item.name}</h5>
                <p className="text-muted mb-1">{item.category}</p>
                <h6 className="mt-auto">₹{item.price}</h6>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => addToCart({ ...item, _id: `${rest._id}-${item.name}`, restaurant: rest.name, qty: 1 })}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
        {(!rest.menu || rest.menu.length === 0) && <p className="text-muted">No items yet.</p>}
      </div>
    </div>
  );
};

export default Restaurant;
