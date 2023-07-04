# Frontend Challenge

Hi! Welcome to the frontend challenge. First and foremost, **read this document carefully**, as we want to make sure all the implementation details are well understood.

## The Challenge

We've decided to run an online store that sells 3 physical products for now. Our current stock consists of the following products:

```
Code         | Name         |  Price
--------------------------------------
TSHIRT       | T-Shirt      |  20.00€
MUG          | Coffee Mug   |   7.50€
CAP          | Cap          |   5.00€
```

Various departments have insisted on the following discounts:

- The sales department thinks a buy 2 get 1 free promotion will work best (buy two of the same product, get one free), and would like to apply this only to `CAP` items.
- The CFO insists that the best way to increase sales is with discounts on bulk purchases (buying x or more of a product, the price of that product is reduced), and requests that if you buy 3 or more `TSHIRT` items the price per unit should be reduced by 25%.

## The Requirements

1. The user should be able to add and remove products from the cart.
1. The user should be able to see the current state of the cart (number of items, discounts, etc.) as they're adding/removing items.
1. The total amount (with discounts applied) should be calculated when the user pushes the `Checkout` button.
1. A modal should open when the user clicks on each product in the cart. This modal should contain the details of the clicked item. You'll find here the [UI design](https://www.figma.com/file/ZxwGXecd3hkXshovOC8lRZ/Shopping-cart-challenge) and all the assets you will need inside `/public` folder.

Examples:

```
Items: CAP, TSHIRT, MUG
Total: 32.50€

Items: CAP, TSHIRT, PEN
Total: 25.00€

Items: TSHIRT, TSHIRT, TSHIRT, CAP, TSHIRT
Total: 65.00€

Items: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT
Total: 62.50€
```

### The solution should

* Be written in Typescript (let us know if this is your first time!)
* Be built using Svelte (or similar component based framework)
* Focus on solving the business problem (less boilerplate!)
* Have a clear structure.
* Be easy to grow with new functionality.

### Bonus Points For

* Unit tests
* Functional tests
* Dealing with money as integers
* Formatting money output
* Useful comments
* Documentation
* Docker images / CI
* Commit messages
