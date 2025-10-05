const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  })
};

if(close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  })
};
// === SELECT ELEMENTS ===
const qtyInputs = document.querySelectorAll(".qty");
const removeButtons = document.querySelectorAll(".remove-item");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartTotalEl = document.getElementById("cart-total");
const couponBtn = document.getElementById("apply-coupon");
const couponInput = document.getElementById("coupon-code");

let discount = 0;

// === FUNCTION TO UPDATE TOTALS ===
function updateTotals() {
  let subtotal = 0;
  const rows = document.querySelectorAll("#cart-body tr");

  rows.forEach((row) => {
    const priceText = row.querySelector(".price").textContent.replace("₹", "").trim();
    const price = parseFloat(priceText);
    const qty = parseInt(row.querySelector(".qty").value);
    const subtotalCell = row.querySelector(".subtotal");

    const itemTotal = price * qty;
    subtotalCell.textContent = "₹" + itemTotal.toFixed(2);

    subtotal += itemTotal;
  });

  let total = subtotal - discount;
  if (total < 0) total = 0;

  cartSubtotalEl.textContent = "₹" + subtotal.toFixed(2);
  cartTotalEl.textContent = "₹" + total.toFixed(2);
}

// === QUANTITY CHANGE ===
qtyInputs.forEach((input) => {
  input.addEventListener("change", updateTotals);
});

// === REMOVE ITEM ===
removeButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.closest("tr").remove();
    updateTotals();
  });
});

// === APPLY COUPON ===
couponBtn.addEventListener("click", () => {
  const code = couponInput.value.trim().toUpperCase();
  let subtotal = parseFloat(cartSubtotalEl.textContent.replace("₹", ""));

  if (code === "SAVE10") {
    discount = subtotal * 0.1;
    alert("Coupon applied! You got 10% off.");
  } else if (code === "SAVE50") {
    discount = 50;
    alert("₹50 discount applied!");
  } else {
    discount = 0;
    alert("Invalid coupon code.");
  }

  updateTotals();
});

// === INITIAL CALC ===
updateTotals();
