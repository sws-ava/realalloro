<template>
  <div class="row">
    <div
      v-for="menuItem in menuItems"
      :key="menuItem.id"
      class="col-lg-6 col-xl-4"
      style="margin-bottom: 30px"
    >
      <div class="menu-6-item bg-white">
        <!-- IMAGE -->
        <div class="menu-6-img rel">
          <div class="hover-overlay">
            <!-- Image -->
            <img
              class="img-fluid"
              :src="imagesBaseUrl + menuItem.picture"
              alt="menu-image"
            />
          </div>
        </div>

        <div class="menu-6-txt rel">
          <h5 class="h5-sm">{{ menuItem.title }}</h5>

          <p class="grey-color">
            {{ menuItem.description }}
          </p>
          <template v-if="menuItem.goodsItems.length > 1">
            <div
              v-for="item in menuItem.goodsItems"
              :key="item.id"
              class="price_weight text_left"
              style="justify-content: space-between; align-items: center"
            >
              <span class="subItemRow">
                {{ item.title }} {{ item.weight }} {{ item.weightKind }}
              </span>
              <span @click="addToCart(item)" class="price">
                {{ item.price }}
                <font-awesome-icon
                  :icon="['fa', 'cart-plus']"
                  class="fa-icon"
                />
              </span>
            </div>
          </template>
          <template v-else>
            <div
              v-for="item in menuItem.goodsItems"
              :key="item.id"
              class="price_weight"
            >
              <span
                style="font-size: 14px; font-weight: 600"
                v-if="item.weight && item.weightKind"
              >
                {{ item.weight }} {{ item.weightKind }}
              </span>
              <span @click="addToCart(item)" class="price">
                {{ item.price }}
                <font-awesome-icon
                  :icon="['fa', 'cart-plus']"
                  class="fa-icon"
                />
              </span>
            </div>
          </template>
        </div>
      </div>
    </div>
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
  //   max-width: 80%;
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
  white-space: nowrap;
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

.menu-6-txt p {
  line-height: 1.1;
}
</style>


