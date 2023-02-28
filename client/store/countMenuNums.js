import axios from 'axios'

// state
export const state = () => ({
  reviews: 0,
  feedbacks: 0,
  orders: 0,
})

// getters
export const getters = {
  countUnreadedReviews: state => state.reviews,
  countUnreadedFeedbacks: state => state.feedbacks,
  countUnreadedOrders: state => state.orders,
}

// mutations
export const mutations = {
  SET_REVIEWS(state, reviews){
    state.reviews = reviews
  },
  SET_FEEDBACKS(state, feedbacks){
    state.feedbacks = feedbacks
  },

  SET_ORDERS( state, orders ){
    state.orders = orders
  },

  UPDATE_REVIEWS (state, reviews ) {
    state.reviews = reviews
  },

  UPDATE_FEEDBACKS (state,  feedbacks ) {
    state.feedbacks = feedbacks
  },
}

// actions
export const actions = {
  setReviews({commit}, reviews){
		commit('SET_REVIEWS', reviews)
	},
  setFeedbacks({commit}, feedbacks){
		commit('SET_REVIEWS', feedbacks)
	},
  setOrders({commit}, orders){
		commit('SET_ORDERS', orders)
	},
  async getOrders({commit}, orders){
		try {
			const response = await axios.get('/admin/getUnreadedOrders')
      commit('SET_ORDERS', response.data.orders)
		} catch (e) {
			console.log(e)
		}
	},
}
