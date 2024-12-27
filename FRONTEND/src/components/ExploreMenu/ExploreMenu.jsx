import React, { useEffect, useState } from "react"
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useParams,useNavigate} from "react-router-dom";
import MenuItem from "../MenuItems/MenuItem";
import "./ExploreMenu.css";
import Map from "../Map/Map";


export default function ExploreMenu(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [foodMenu,setFoodMenu] = useState({
        image: { url: '' ,filename:''},
        name: '',
        schedule: '',
        location: '',
        category: '',
        menu: [],
        geomerty: { coordinates: [72.8517, 19.0968] } 
    })
    const [counts, setCounts] = useState({}); 
    const [cart, setCart] = useState([]);


    const fecthData = async ()=>{
        try{
            const result = await axios.get(`http://localhost:8080/foodTruck/${id}`,{
                withCredentials: true,  
            })
            
            console.log('Fetched Menu:', result);  
            console.log('Fetched Menu Data:', result.data);  
            setFoodMenu(result.data.data); 
            
            
            const initialCounts = {};
               result.data.data.menu.forEach((item) => {
               initialCounts[item._id] = 0;
            });
            setCounts(initialCounts); 
        }
        catch(err){
            console.error("food truck not found", err);
            console.error("Error fetching menu:", err);

        // Redirect if unauthorized
        if (err.response && err.response.status === 401) {
            toast.error("Please log in to access this page.");
            navigate("/login");
        } else {
            toast.error("Food truck not found or failed to fetch data.");
        }
        }
    }

    // const handleCountChange = (menuItemId, delta) => {
    //     setCounts((prevCounts) => {
    //       const newCount = (prevCounts[menuItemId] || 0) + delta;
    //       if (newCount < 0) return prevCounts;
    //       return { ...prevCounts, [menuItemId]: newCount };
    //     });
    // };
    
    const handleCountChange = (menuItemId, delta) => {
        setCounts((prevCounts) => {
          const newCount = (prevCounts[menuItemId] || 0) + delta;
          if (newCount < 0) return prevCounts;
          
          // Update cart if count is greater than 1
          if (newCount > 0) {
            setCart((prevCart) => {
              // Check if item is already in the cart
              const existingItemIndex = prevCart.findIndex(item => item._id === menuItemId);
              if (existingItemIndex !== -1) {
                // Update the existing item
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity = newCount;
                return updatedCart;
              } else {
                // Add new item to the cart
                return [...prevCart, { _id: menuItemId, quantity: newCount }];
              }
            });
          } else {
            // Remove the item from cart if count is zero
            setCart((prevCart) => prevCart.filter(item => item._id !== menuItemId));
          }
    
          return { ...prevCounts, [menuItemId]: newCount };
        });
    };

    const handleAddToCart = async () => {
        try {
            // Prepare the payload for adding items to the cart
            const payload = {
                foodTruckId: id, // id from useParams
                items: cart.map(item => ({
                    menuItemId: item._id,
                    quantity: item.quantity
                }))
            };
    
            // Send the POST request to the backend
            const response = await axios.post("http://localhost:8080/cart/addToCart", payload,{
                withCredentials: true,  
            });
            const data = response.data.data
    
            // Show a success toast and navigate to the Place Order page
            if (response.status === 200) {
                toast.success("Items added to cart successfully!");
                navigate(`/place-order/${id}`); // Redirect to the Place Order page
            }
        } catch (error) {
            console.error("Error adding items to cart:", error);
            toast.error("Failed to add items to cart. Please try again.");
        }
    };

    useEffect(() => {
        fecthData();
        console.log("FoodMenu",foodMenu)
    }, []); 
    
    useEffect(()=>{
        console.log(cart)
    },[cart])

    console.log("Foodmenu",foodMenu)
    console.log("Longitude",foodMenu.geomerty.coordinates[1])
    console.log("Lattitude",foodMenu.geomerty.coordinates[0])
    return(
        <div className="ExploreMenu">
            <div className="foodTruckS">
                <img src={foodMenu.image.url} alt="image"/>
                <div className="foodTruckDetails">
                    <h3>{foodMenu.name}</h3>
                    <p>{foodMenu.schedule}</p>
                    <p>{foodMenu.location}</p>
                    <p>{foodMenu.category}</p>
                </div>
            </div>
            <div className="Menu">
                {foodMenu.length === 0?(
                    <p>No menu item Available</p>
                ):(
                    foodMenu.menu.map((m)=>(
                       <div key={m._id}>
                          <MenuItem _id={m._id} 
                          url={m.image.url} 
                          name={m.name} 
                          price={m.price} 
                          count={counts[m._id] || 0} // Use count for this menu item
                          setCounts={(delta) => handleCountChange(m._id, delta)}
                          />
                       </div>
                    ))
                )}
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add All Selected Items to Cart & Place Order
            </button>

            <Map location={{ 
                lng: foodMenu.geomerty.coordinates[1], 
                lat: foodMenu.geomerty.coordinates[0],}} 
                address={foodMenu.location}
                name={foodMenu.name}/>
            <ToastContainer />
        </div>
    )
}