<template>
  <div class="mb200"> 
    <div>
			<div 
        class="page-hero-section division"
        style="background-image: url(/images/contacts-page.jpg);"
      >
				<div class="container">	
					<div class="row">	
						<div class="col-lg-12">
							<div class="hero-txt text-center white-color">
								<!-- Breadcrumb -->
								<div id="breadcrumb">
									<div class="row">						
										<div class="col">
											<div class="breadcrumb-nav">
												<nav aria-label="breadcrumb">
												  	<ol class="breadcrumb">
												    	<li class="breadcrumb-item">
                                
                                <nuxt-link 
                                  :to="localePath('mainPage')"
                                  class="footer-logo"
                                >
                                  {{$t('static.mainPage')}}
                                </nuxt-link>
                              </li>
												    	<li class="breadcrumb-item active">
                                {{$t('static.cartTitle')}}
                              </li>
												  	</ol>
												</nav>
											</div>
										</div>
									</div> 
								</div>
								<!-- Title -->
								<h2 class="h2-xl">{{$t('static.cartTitle')}}</h2>
							</div>
						</div>	
					</div>	  
				</div>	  
			</div>	
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <loading v-if="isLoading" />
          <template v-if="items.length">
            <div>
              <h2 class="text-center" style="margin-bottom: 50px; margin-top: 50px;">
                {{$t('static.yourOrder')}}
              </h2>
              <div class="cartItems">
                <div 
                  v-for="item in items" 
                  class="cartItem"
                  :key="item.id"
                >
                  <span class="itemTitle" style="">
                    <template v-if="item.titleMain !== item.title">{{item.titleMain}}</template> {{item.title}} {{item.weight}}{{item.weightKind}}</span>
                  <div class="amountBlock">
                    <font-awesome-icon
                      @click="decrementItem(item)"
                      :icon="['fas', 'minus-circle']"
                      class="icons"
                    />
                    <span class="amount">{{item.amount}}</span>
                    <font-awesome-icon
                      @click="incrementItem(item)"
                      :icon="['fas', 'plus-circle']"
                      class="icons"
                    />
                    <span class="price">{{(item.price  * item.amount).toFixed(2)}} грн</span>
                    <font-awesome-icon
                      @click="removeItem(item)"
                      :icon="['fas', 'trash']"
                      class="icons trashIcon"
                    />
                  </div>
                </div>
                <div class="cartSum">
                  {{$t('static.orderSum')}} <span>{{ totalSum ? totalSum.toFixed(2) : 0.00}}</span> грн
                </div>
              </div>
              <div 
                @click="showDesignOrder()"
                class="designCart"
              >
                {{$t('static.toDesignOrder')}}
              </div>
            </div>
            <template v-if="showDesignOrderBlock">
              <div class="row">
                <div class="col-lg-8 offset-lg-2">
                  <form 
                    class=" contact-form"
                    @submit.prevent
                  >
                    <div class="row cartForm">
                      <div class="col-md-12 col-lg-6">
                        <label for="" class="text-left">
                          {{$t('static.orderName')}}
                        </label>
                        <input 
                          required
                          v-model="formData.name"
                          type="text" 
                          class="form-control"
                        >
                      </div>
                      <div class="col-md-12 col-lg-6">
                        <label for="" class="text-left">
                          {{$t('static.orderPhone')}}
                        </label>
                        <input 
                          v-model="formData.phone"
                          maxlength="13"
                          minlength="13"
                          type="text" 
                          class="form-control"
                        >
                      </div>
                      <div class="col-12">
                        <label for="" class="text-left">
                          {{$t('static.orderAddress')}}
                        </label>
                        <input 
                          required
                          v-model="formData.address"
                          type="text" 
                          class="form-control"
                        >
                      </div>
                      <div class="col-12">
                        <label for="" class="text-left">
                          {{$t('static.orderPersons')}}
                        </label>
                        <input 
                          v-model="formData.persons"
                          type="number" 
                          class="form-control"
                        >
                      </div>
                      <div class="col-12">
                        <label for="" class="text-left">
                          {{$t('static.orderComment')}}
                        </label>
                        <textarea name="" id="" cols="30" rows="10"
                          v-model="formData.comment"
                          class="form-control"
                        ></textarea>
                      </div>
                      <div class="col-12 cartForm">
                        <button
                          type="submit" 
                          @click="checkout()"
                          class="designCart designCartCheckout"
                        >
                          {{$t('static.orderNow')}}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </template>
          </template>
          <template  v-if="noItems">
            <div class="range" style="margin-top: 50px; margin-bottom: 50px; flex-direction: column;">
              <h2 class="text-center" style="margin: 0 auto 50px;">
                {{$t('static.orderEpmty')}}
              </h2>
              <div>
                <nuxt-link 
                  :to="localePath('menu')"
                  class="text-center"
                  style="font-size: 30px; margin-top: 10px; display: block;"
                >
                  {{$t('static.toMenu')}}
                </nuxt-link>
              </div>
            </div>
          </template>
          <template v-if="orderDone">
            <div class="range" style="margin-top: 50px; margin-bottom: 50px;">
              <h2 class="text-center" style="margin: 0 auto 50px;">
                {{$t('static.orderGet')}}
              </h2>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import loading from '@/components/front/loading.vue'
import {  mapActions } from 'vuex'

export default {
  layout: 'front',
  components:{
    loading,
  },
  data(){
    return{
      items: [],
      formData: {
        phone: '+380',
        persons: 1,
      },
      totalSum: 0,
      totalAmount: 0,
      showDesignOrderBlock: false,
      isLoading: false,
      noItems: false,
      orderDone: false,
    }
  },
  mounted(){
    this.getOrderItems()
  },
  methods:{
    incrementItem(item){
      this.items.forEach(el => {
        if(item.id == el.id){
          el.amount += 1
        }
      })
      let cartList = JSON.parse(localStorage.getItem("cart"))
      cartList.forEach(el => {
        if(el.id == item.id){
          el.amount += 1
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartList));
      this.countTotalSum()
    },
    decrementItem(item){
      this.items.forEach(el => {
        if(item.id == el.id){
          if(el.amount > 1){
            el.amount -= 1    
            let cartList = JSON.parse(localStorage.getItem("cart"))
            cartList.forEach(el => {
              if(el.id == item.id){
                el.amount -= 1
              }
            });
            localStorage.setItem("cart", JSON.stringify(cartList));
          }else{
            this.removeItem(item)
          }
          
        }
      })
      this.countTotalSum()
    },
    removeItem(item){
      this.items = this.items.filter(a => a.id !== item.id)
      let cartList = JSON.parse(localStorage.getItem("cart"))
      let newCartList = []
      cartList.forEach(el => {
        if(el.id !== item.id){
          newCartList.push(el)
        }
      });
      localStorage.setItem("cart", JSON.stringify(newCartList));
      this.countTotalSum()
    },
    countTotalSum(){
      let totalSum = 0
      let totalAmount = 0
        this.items.forEach(el=>{
          totalSum += el.amount * el.price
          totalAmount += el.amount
        })
      this.totalSum = totalSum
      this.totalAmount = totalAmount
      totalSum > 0 ? this.noItems = false : this.noItems = true
      totalAmount > 0 ? this.noItems = false : this.noItems = true

      this.setCartSum(totalSum)
      this.setCartAmount(totalAmount)
      
    },
    async getOrderItems(){
      this.isLoading = true
      this.noItems = false

      let itemsList = JSON.parse(localStorage.getItem("cart"))
      if(itemsList){
        let itemsToServer = []
        itemsList.forEach(el => {
          let itemToServer = {
            id: el.id,
            amount: el.amount
          }
          itemsToServer.push(itemToServer)
        });
        try {
          const response = await axios.post('/getCartItems', { itemsToServer: itemsToServer, locale: this.$i18n.t('static.locale') })
          this.items = response.data

          this.countTotalSum()

        } catch (e) {
        }
      }else{
        this.noItems = true
      }
      
      this.isLoading = false
    },
    showDesignOrder(){
      this.showDesignOrderBlock === false ? this.showDesignOrderBlock = true : this.showDesignOrderBlock = false
    },
    async checkout(){
      if(this.formData.name && this.formData.address && this.formData.phone.length > 9){
        try {
          const order = await axios.post('/setNewOrder',
            {
              items: this.items,
              formData: this.formData,
              totalSum: this.totalSum,
            }
          )
        } catch (e) {
        }

        localStorage.removeItem('cart');
        this.items = []
        this.setCartSum(0)
        this.setCartAmount(0)
        this.orderDone = true
        window.scrollTo({
          top: 0,
        });
        setTimeout(()=>{
          this.orderDone = false
          this.$router.push('/menu')
        }, 5000)
      }
    },
		
		...mapActions({
			setCartAmount: 'cart/setCartAmount',
			setCartSum: 'cart/setCartSum',
		}),
  }

}
</script>


<style lang="scss" scoped>
.cartForm{
  justify-content: center;
  .form-control{
    margin-bottom: 15px;
  }
  textarea{
    resize: none;
  }
  label{
    margin-bottom: 5px;
    text-align: left;
    width: 100%;
  }

}
.cartItems{
  max-width: 800px;
  margin: 0 auto 20px;
}
.cartItem{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    margin-bottom: 20px;
    @media (max-width: 767px){
      flex-direction: column;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 20px;
    }
}
.cartSum{
      border-top: 1px solid rgba(255,255,255,0.6);
      padding-top: 20px;
      font-size: 20px;
      color: #283034;
      span{
        font-weight: 700;
      }
    @media (max-width: 767px){
      border-top: none;
    }
}
.amountBlock{
  display: flex;
  align-items: center;
  justify-content: space-between;
    @media (max-width: 767px){
      margin-top: 10px;
    }
  .amount{
    margin-left: 10px;
    margin-right: 10px;
    line-height: 1;
  }
  .price{    
    margin-left: 20px;
    white-space: nowrap;
    width: 101px;
    @media (max-width: 767px){
      font-size: 18px;
    } 
  }
}
.itemTitle{
  font-size: 18px;
  text-align: left;
  padding-right: 20px;
    @media (max-width: 767px){
      text-align: center;
    }
}
.mb200{
  margin-bottom: 200px;
    @media (max-width: 767px){
      margin-bottom: 100px;
    }
}
.trashIcon {
  margin-left: 10px;
  @media (max-width: 767px){
    margin-left: 30px;
  } 
}
.icons {
  width:17px; 
  height: 17px; 
  cursor: pointer; 
  transition: scale 0.25s ease-in-out;
  &:hover{
    scale: 1.15;
    transition: scale 0.25s ease-in-out;
  }
  @media (max-width: 767px){
    height: 25px;
    width: 25px;
  } 
}
.designCart{
  background-color: #f7be27;
  width: fit-content;
  border-radius: 5px;
  color: #000;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  margin: 50px auto 50px;
  font-weight: 700;
  transition: scale 0.25s ease-in-out;
  &:hover{
    scale: 1.15;
    transition: scale 0.25s ease-in-out;
  }
}

  .designCartCheckout{
    margin: 0 auto 50px;
    outline: none;
    border: none;
  }
</style>
