
// state
export const state = () => ({
  cartAmount: 0,
  cartSum: 0,
})

// getters
export const getters = {
  countCartAmount: state => state.cartAmount,
  countCartSum: state => state.cartSum,
}

// mutations
export const mutations = {
  SET_CARTAMOUNT(state, cartAmount){
    state.cartAmount = cartAmount
  },

  SET_CARTSUM( state, cartSum ){
    state.cartSum = cartSum
  },

  UPDATE_CARTAMOUNT (state, cartAmount ) {
    state.cartAmount = cartAmount
  },

  UPDATE_CARTSUM (state,  cartSum ) {
    state.cartSum = cartSum
  },
}

// actions
export const actions = {
  setCartAmount({commit}, cartAmount){
		commit('SET_CARTAMOUNT', cartAmount)
	},
  setCartSum({commit}, cartSum){
		commit('SET_CARTSUM', cartSum)
	},
}
