export async function fetchAvailableMeals() {
	  const response = await fetch("http://localhost:3000/meals");
    const resData = await response.json();

    if(!response.ok) {
      throw new Error("Failed to fetch meals");
    }
    return resData;
}

// export async function updateUserPlaces(places) {
//     const response = await fetch("http://localhost:3000/user-places", {
//       method: "PUT",
//       body: JSON.stringify({places}),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });

//     const resData = await response.json();
//     if(!response.ok) {
//       throw new Error("Failed to update user data");
//     }

//     return resData.message;
// }

// export async function fetchUserPlaces() {
//     const response = await fetch("http://localhost:3000/user-place");
//     const resData = await response.json();

//     if(!response.ok) {
//       throw new Error("Failed to fetch user places");
//     }

//     return resData.places;
// }