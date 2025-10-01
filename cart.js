const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;

  //fix: changed <=  to < to prevent accessing undefineditem.
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  //fix: Added validation for discount rateto avoid invalidvalues.
  if (discountRate < 0 ||discountRate > 1){
    console.warn("Invalid discount rate ,it should be between 0 and 1.");
    return total;//no discount.
  }
  
  return total - total * discountRate; // Bug: Missing validation for discountRate
}

function generateReceipt(cartItems, total) {
  //fix: added NaN case for proper output.
  if (typeof total !=='number' || isNaN(total)){
    total = 0
  }
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  
  receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;



/* 1.Opened the HTML file in the browser and using Developer Tools ,under the console tab I found 
error message like type of error and on which line .
2.In Sources tab I click lines where I want to set  breakpoints ,at the calculateTotal,applyDiscount,
 and generateReceipt functions.
3. Used  debugger statement also to pause execution .
4. By clicking resume script execution ,observed index changing and values of total in each iteration 
 under scope and under watch I observed when i=3 cartItem[3]:undefined 
5. Then in the code removed = sign in side the  for loop of calculateTotal function.
6. Added input validation in applyDiscountto avoid edge case errors.
7.In generateReceipt function added NaN case to get proper output.
8.Tested with empty cart,one item ,edge discount rates in console tab.  */
