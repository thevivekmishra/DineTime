// import {restaurants} from "@/store/restaurants";
// import { collection, doc, setDoc } from "firebase/firestore";
// import { db } from "./firebaseConfig";

// const restaurantData = restaurants

// const uploadData = async () => {
//     try {
//         for (let i = 0; i < restaurantData.length; i++) {
//             const restaurant = restaurantData[i];
//             const docRef = doc(collection(db, "restaurants"), `restaurant_${i + 1}`);
//             await setDoc(docRef, restaurant)
//         }
//         console.log("Restaurant data uploaded ")
//     }
//     catch (error) {
//         console.log("Failed to upload restaurant data ", error);
//     }
// }

// export default uploadData

//go to home tab to upload the data via useEffect 


//uploading carouselImage 

// import {carouselImages} from "@/store/restaurants";
// import { collection, doc, setDoc } from "firebase/firestore";
// import { db } from "./firebaseConfig";

// const restaurantData = carouselImages

// const uploadData = async () => {
//     try {
//         for (let i = 0; i < restaurantData.length; i++) {
//             const restaurant = restaurantData[i];
//             const docRef = doc(collection(db, "carousel"), `carousel_${i + 1}`);
//             await setDoc(docRef, restaurant)
//         }
//         console.log("Restaurant carouselImage data uploaded ")
//     }
//     catch (error) {
//         console.log("Failed to upload restaurant data ", error);
//     }
// }

// export default uploadData


//uploading slots 

import { collection, doc, setDoc } from "firebase/firestore";
import { slots } from "../store/restaurants";
import { db } from "./firebaseConfig";

const restaurantData = slots;

const uploadData = async () => {
  try {
    for (let i = 0; i < restaurantData.length; i++) {
      const restaurant = restaurantData[i];
      const docRef = doc(collection(db, "slots"), `slot_${i + 1}`);
      await setDoc(docRef, restaurant);
    }
    console.log("Data uploaded");
  } catch (e) {
    console.log("Error uploading data", e);
  }
};

export default uploadData;