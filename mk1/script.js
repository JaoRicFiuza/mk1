document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItems = document.getElementById('cart-items');
    const totalAmountElem = document.getElementById('total-amount');
    const checkoutSummary = document.getElementById('checkout-summary');
    const checkoutAmount = document.getElementById('checkout-amount');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = parseFloat(productItem.getAttribute('data-price'));

            const existingProduct = cart.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let totalAmount = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;

            cartItems.innerHTML += `
                <div class="cart-item">
                    <p>${item.name} x ${item.quantity}</p>
                    <p>R$ ${itemTotal.toFixed(2)}</p>
                </div>
            `;
        });

        totalAmountElem.textContent = totalAmount.toFixed(2);
        updateCheckoutSummary(totalAmount);
    }

    function updateCheckoutSummary(totalAmount) {
        checkoutSummary.innerHTML = cart.map(item => `
            <p>${item.name} x ${item.quantity}: R$ ${(item.price * item.quantity).toFixed(2)}</p>
        `).join('');

        checkoutAmount.value = totalAmount.toFixed(2);
    }
});

// Array para armazenar os itens do carrinho
let cart = [];

// Função para adicionar itens ao carrinho
function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    cart.push(product);
    updateCart();
}

// Função para atualizar o carrinho na página
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");

    // Limpa a lista de itens do carrinho
    cartItems.innerHTML = "";

    let total = 0;

    // Adiciona cada item no carrinho
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `<p>${item.name} - R$ ${item.price.toFixed(2)}</p>`;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    // Atualiza o total
    totalAmount.textContent = total.toFixed(2);
}

// Função para limpar o carrinho
function clearCart() {
    cart = []; // Esvazia o array do carrinho
    updateCart(); // Atualiza a interface do carrinho
}

// Event listener para o botão de "Limpar Carrinho"
document.getElementById("clear-cart").addEventListener("click", clearCart);

// Event listeners para os botões "Adicionar ao Carrinho"
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        const productItem = button.closest(".product-item");
        const productName = productItem.querySelector("h3").textContent;
        const productPrice = parseFloat(productItem.getAttribute("data-price"));
        addToCart(productName, productPrice);
    });
});
