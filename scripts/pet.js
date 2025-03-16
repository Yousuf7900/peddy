// fetching all the pet categories
const petCategories = () => {
    const url = "https://openapi.programming-hero.com/api/peddy/categories";
    fetch(url)
        .then(response => response.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));
}
// category wise pet select
const loadCategoryWise = (category) =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(response => response.json())
        .then(data => displayAllPets(data.data))
        .catch(error => console.log(error))
}
// displaying all the categories
const displayCategories = (categories) => {
    const petCategoryContainer = document.getElementById("petsCategoryContainer");
    categories.forEach(item =>{
        // console.log(item);
        const div = document.createElement("div");
        div.innerHTML = `
            <button onclick="loadCategoryWise('${item.category}')" class="btn bg-white font-bold text-2xl p-6 w-full h-auto rounded-xl loadingSpinner"> 
                <img class="pr-4" src=${item.category_icon}/>
                    ${item.category}s
            </button>
        `;
        petCategoryContainer.append(div);
    })
}

// fetching all the pets
const loadAllPets = () => {
    const url = "https://openapi.programming-hero.com/api/peddy/pets";
    fetch(url)
        .then(response => response.json())
        .then(data => displayAllPets(data.pets))
        .catch(error => console.log(error))
}
// displaying all the pets
const displayAllPets = (pets) => {
    const allPetsCardsContainer = document.getElementById("allPetsCardsContainer");

    // before using onclick function clear the previous data
    allPetsCardsContainer.innerHTML = "";

    // if any category don't have any element
    if(pets.length === 0){
        allPetsCardsContainer.classList.remove("grid");
        // allPetsCardsContainer.classList.add("grid");
        allPetsCardsContainer.innerHTML = `
            <div class="flex flex-col justify-center text-center items-center space-y-5 bg-gray-100 rounded-3xl p-24">
                <img src="images/error.webp" />
                <h2 class="font-black text-4xl">No Information Available</h2>
                <p class="max-w-[60%] text-gray-500">Vai amader ekhane sudhu biral, kukur r khorgosh pawa jay. Pakhi pawa jay na. Onno kono jaygay khuj niye dekhen please.</p>
            </div>
        `
    }
    else{
        allPetsCardsContainer.classList.add("grid");
    }
    // console.log(pets);
    pets.forEach(pet => {
        // console.log(pet);
        // creating cards
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="py-5 border border-gray-300 rounded-xl p-5 h-auto">
                <img class="h-48 w-80 object-cover rounded-lg" src=${pet.image}/>
                <h2 class="font-bold text-xl my-3">${pet.pet_name}</h2>
                <div class="text-gray-600 space-y-1">
                    <p >Breed: ${pet.breed}</p>
                    <p>Birth: ${pet.date_of_birth}</p>
                    <p>Gender: ${pet.gender}</p>
                    <p class="pb-2">Price: ${pet.price}$</p>
                </div>
                <div class="border-t border-gray-300 pt-4 flex flex-wrap flex-col gap-2 lg:flex-row justify-between">
                    <button onclick = "loadPetsById(${pet.petId})" class="btn w-auto rounded-lg  lg:text-lg font-bold text-[#0E7A81]"><img class="w-5" src="https://img.icons8.com/?size=100&id=24816&format=png&color=000000"/></button>
                    <button onclick="displayAdopt()" class="btn w-auto rounded-lg text-lg font-bold text-[#0E7A81]">Adopt</button>
                    <button onclick="loadDetails(${pet.petId})" class="btn w-auto rounded-lg text-lg font-bold text-[#0E7A81]">Details</button>
                </div>
            </div>
        `;
        // append dynamically
        allPetsCardsContainer.append(card);
    })
}

// fetch pets by id
const loadPetsById = (id) => {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayLikedPets(data.petData.image))
        .catch(error => console.log(error))
}

// display pets by liked button
const displayLikedPets = (likedPets) => {
    console.log(likedPets);

    const likedPetsContainer = document.getElementById("likedPetsContainer");
    const likedImg = document.createElement("div");
    likedImg.classList = "pb-5 mx-auto"
    likedImg.innerHTML = `
        <img class="w-auto max-h-32 rounded-md" src = "${likedPets}" />
    `
    likedPetsContainer.append(likedImg);
}
// modal section
const loadDetails = async (petId) => {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const response = await fetch(url);
    const data = await response.json();
    displayModal(data.petData);
}
// display modal data
const displayModal = (petDetails) => {
    console.log(petDetails);
    const modalDetailsContainer = document.getElementById("modal-container");
    modalDetailsContainer.innerHTML = "";
    const modalDetails = document.createElement("div");

    modalDetails.innerHTML = `
        <img class="rounded-md w-full h-full" src="${petDetails.image}"/>
        <h2 class="font-bold text-xl my-3">${petDetails.pet_name}</h2>
        <div class="grid grid-cols-2 border-b pb-4">
            <p class="">Breed: ${petDetails.breed}</p>
            <p class="">Date of Birth: ${petDetails.date_of_birth}</p>
            <p class="">Gender: ${petDetails.gender}</p>
            <p class="">Price: ${petDetails.price}$</p>
            <p class="">Vaccinated Status: ${petDetails.vaccinated_status}</p>
        </div>
        <div class="">
            <h2 class="font-bold text-xl my-3">Details Information</h2>
            <p class="">${petDetails.pet_details}</p>
        </div>
    `;
    document.getElementById("customModal").showModal();
    modalDetailsContainer.append(modalDetails);
}

// adopt button

// extra
document.getElementById("viewMoreButton").addEventListener("click", function(){
    document.getElementById("shopSection").scrollIntoView({ behavior: "smooth" });
});

// calling the functions
petCategories();
loadAllPets();

loadPetsById();
