window.onload = () => {
  updateCartCount();
  if (window.location.pathname.includes('menu.html')) {
    switchCategory('soup');
    switchSub('veggie');
  }
  if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
  }
}

//

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'soup';
let currentSub = 'veggie';

const foodItems = {
  noodles: {
    veggie: [
      {
        name: "VEGETARIAN RAMEN",
        ingredients: "Ramen, tofu, vegetables",
        price: 80,
        image: "images/vegetarian-ramen.jpg"
      },
      {
        name: "SOBA DELIGHT",
        ingredients: "Soba, mushrooms, soy",
        price: 75,
        image: "images/soba-delight.jpeg"
      }
    ],
    meat: [
      {
        name: "BEEF NOODLES SOUP",
        ingredients: "Noodles, beef, broth",
        price: 100,
        image: "images/beef-noodle-soup.jpeg"
      }
    ]
  },
  rice: {
    poultry: [
      {
        name: "CHICKEN FRIED RICE",
        ingredients: "Rice, chicken, egg",
        price: 90,
        image: "images/chicken-fried-rice.jpeg"
      }
    ]
  },
  soup: {
    veggie: [
      {
        name: "LOTUS ROOT SOUP",
        ingredients: "Lotus root, daikon, mushroom",
        price: 100,
        image: "images/lotus-root-soup.jpeg"
      },
      {
        name: "SPICY TOMATO SOUP",
        ingredients: "Tomato, greens, chili",
        price: 100,
        image: "images/spicy-tomato-soup.jpeg"
      }
    ]
  },
  salad: {
    seafood: [
      {
        name: "SALMON SALAD",
        ingredients: "salmon, vegetables, sesame",
        price: 175,
        image: "images/salmon-salad.jpeg"
      }
    ]
  },
  sushi: {
    meat: [
      {
        name: "SALMON NIGIRI",
        ingredients: "Salmon, rice",
        price: 120,
        image: "images/salmon-nigiri.jpeg"
      },
      {
        name: "TUNA ROLL",
        ingredients: "Tuna, rice, seaweed",
        price: 100,
        image: "images/tuna-roll.jpeg"
      }
    ]
  }
};

function switchCategory(category) {
  currentCategory = category;
  switchSub(currentSub);
  updateActiveTab('nav-tabs', category);
}

function switchSub(sub) {
  currentSub = sub;
  updateActiveTab('sub-tabs', sub);
  const list = document.getElementById('food-list');
  list.innerHTML = '';

  const categoryData = foodItems[currentCategory];
  if (!categoryData || !categoryData[sub]) return;

  categoryData[sub].forEach(item => {
  const div = document.createElement('div');
  div.className = 'food-card';
  div.innerHTML = `
  <img src="${item.image}" alt="${item.name}" class="food-img" />
  <div class="title-row">
    <h3>${item.name}</h3>
    <small>Available</small>
  </div>
  <p>${item.ingredients}</p>
  <div class="bottom-row">
    <span class="price">${item.price} THB</span>
    <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
  </div>
  `;
  list.appendChild(div);
});
}

function updateActiveTab(tabClass, name) {
  const buttons = document.querySelectorAll(`.${tabClass} button`);
  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase().includes(name.toLowerCase())) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const el = document.getElementById('cart-count');
  let count = 0;
  for (let itemss in cart) {
    count += (cart[itemss]['qty']);
  }
  if (el) el.innerText = count;
}

function checkout() {
  localStorage.removeItem('cart');
  window.location.href = 'order.html';
}

function displayCartItems() {
  const container = document.getElementById('cart-items');
  const totalElem = document.getElementById('total');
  container.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `${item.name} x${item.qty} <span>${item.price * item.qty} THB</span>`;
    container.appendChild(div);
    total += item.price * item.qty;
  });

  totalElem.textContent = `Total: ${total} THB`;
}

function confirmOrder() {
  localStorage.removeItem('cart');
  cart = [];
  window.location.href = 'order.html';
}