<template>
  <div>
    <ul class="menu-3-list row">
      <!-- MENU ITEM-1 -->
      <li
        class="menu-3-item col-md-6"
        v-for="menuItem in menuItems"
        :key="menuItem.id"
      >
        <template>
          <div class="menu-title-wrapper rel" v-for="index in 1" :key="index">
            <div class="menu-item-title">
              <h5 class="h5-sm">
                {{ menuItem.title }} {{ menuItem.goodsItems[index].weight }}
                {{ itemItem.goodsItems[index].weightKind }}
              </h5>
            </div>
            <div class="menu-item-dots"></div>

            <div class="menu-item-price">
              <span @click="addToCart(item)" class="price">
                {{ item.price }}
                <font-awesome-icon
                  :icon="['fa', 'cart-plus']"
                  class="fa-icon"
                />
              </span>
            </div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
  

<script>
import { mapActions } from "vuex";

export default {
  props: {
    menuItems: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      imagesBaseUrl: process.env.imagesBaseUrl + "storage/",
    };
  },
  methods: {
    addToCart(item) {
      let cart = localStorage.getItem("cart");
      if (!cart) {
        let cart = [];
        const cartItem = {
          id: item.id,
          price: item.price,
          amount: 1,
        };
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        this.countCartNums();
      } else {
        let isNewItem = true;
        let cartList = JSON.parse(localStorage.getItem("cart"));
        cartList.forEach((el) => {
          if (el.id == item.id) {
            el.amount += 1;
            isNewItem = false;
          }
        });
        if (isNewItem) {
          const cartItem = {
            id: item.id,
            price: item.price,
            amount: 1,
          };
          cartList.push(cartItem);
        }
        localStorage.setItem("cart", JSON.stringify(cartList));
        this.countCartNums();
      }
    },
    countCartNums() {
      let cartList = JSON.parse(localStorage.getItem("cart"));
      let cartAmount = 0;
      let cartSum = 0;
      cartList.forEach((el) => {
        cartAmount += el.amount;
        cartSum += el.amount * el.price;
      });
      this.setCartAmount(cartAmount);
      this.setCartSum(cartSum);
    },

    ...mapActions({
      setCartAmount: "cart/setCartAmount",
      setCartSum: "cart/setCartSum",
    }),
  },
};
</script>


<style lang="scss" scoped>
.price_weight {
  max-width: 80%;
  margin: 0 auto 12px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 992px) {
    margin: 0 auto 20px;
  }
}
.price {
  display: flex;
  align-items: center;
  cursor: pointer;
  opacity: 1;
  transition: scale 0.25s ease-in-out;
  font-weight: 700;
  &:hover {
    // opacity: 0.7;
    scale: 1.1;
    transition: scale 0.25s ease-in-out;
  }
  svg {
    margin-left: 10px;
    // color: greenyellow;
    color: #f7be27;
    width: 36px;
    height: 21px;
  }
}
.image_holder {
  img {
    max-width: 250px;
  }
}
.item_holder {
  margin-bottom: 30px;
}
.subItemRow {
  font-weight: 600;
  font-size: 12px;
  text-align: left;
  padding-right: 20px;
}
.image_holder {
  margin-bottom: 20px;
  text-align: center;
}
h5.h5-sm {
  font-size: 1.2rem;
}
</style>


