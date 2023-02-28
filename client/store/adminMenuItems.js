import axios from 'axios'


// state
export const state = () => ({
  choosedCategory: '',
  menuItems: [],
  showSpinner: false,
  changePrice: '',
})

// getters
export const getters = {
	
}

// mutations
export const mutations = {
  SET_MENUITEMS(state, menuItems){
    state.menuItems = menuItems
  },
  SET_SHOWSUBITEM(state, subItem){
	state.menuItems.forEach(el => {
		el.items.forEach(element => {
			if(subItem.id == element.id){
				if(subItem.show == true){
					element.show = false
				}else{
					element.show = true
				}
			}
		});
	});
  },
  SET_SHOWITEM(state, item){
	state.menuItems.forEach(el => {
		if(item.id == el.id){
			if(item.show == true){
				el.show = false
			}else{
				el.show = true
			}
		}
	});
  },


  SET_ORDERTOP(state, order){
	state.menuItems.forEach(el => {
		if(el.order == order - 1){
			el.order += 1
		}
		else if(el.order == order){
			el.order -= 1
		}
	})
	state.menuItems.sort((a,b) => a.order - b.order)
  },
  SET_ORDERBOTTOM(state, order){
	state.menuItems.forEach(el => {
		if(el.order == order){ 
			el.order += 1			
		}
		else if(el.order == order + 1){
			el.order -= 1
		}
	})
	state.menuItems.sort((a,b) => a.order - b.order)
  },


  SET_SHOWSPINNER(state, showSpinner){
    state.showSpinner = showSpinner
  },
  SET_CHOOSEDCATEGORY(state, choosedCategory){
    state.choosedCategory = choosedCategory
  },
  
  SET_CHANGEPRICE(state, changePrice){
	state.changePrice = changePrice
  },

  SET_CHANGEPRICEFETCH(state, subItem){
	if(state.changePrice){
		state.menuItems.forEach(el => {
			el.items.forEach(element => {
				if(subItem.id == element.id){
					element.price = state.changePrice
				}
			});
		});
	}
  },

  SET_REMOVEITEM(state, item){
	console.log(item)
	state.menuItems = state.menuItems.filter(a => a.id !== item.id)
  }


}

// actions
export const actions = {

	removeItem({commit}, item){
		commit('SET_REMOVEITEM', item)
	},

	fetchItems({ state, commit }, cat){
	commit('SET_SHOWSPINNER', true)
	setTimeout(() => {
		const menuItems = [
		{
			id:1,
			show: true,
			title:'Том ям коконат',
			items:[
			{id:1, mainItem: 1, order: 1, show: true, weight: 'З ТИГРОВИМИ КРЕВЕТКАМИ ТА КЕШЮ З ТИГРОВИМИ КРЕВЕТКАМИ ТА КЕШЮ', weightKind:'см', price: 50.85},
			{id:2, mainItem: 1, order: 3, show: false, weight: 'З ТИГРОВИМИ КРЕВЕТКАМИ ТА КЕШЮ З ТИГРОВИМИ КРЕВЕТКАМИ ТА КЕШЮ', weightKind:'см', price: 85},
			{id:3, mainItem: 1, order: 2, show: false, weight: 'З ТИГРОВИМИ КРЕВЕТКАМИ ТА КЕШЮ З ТИГРОВИМИ КРЕВЕТКАМИ ТА КЕШЮ', weightKind:'см', price: 150},
			],
			order: 1,
		},
		{
			id:3,
			show: false,
			title:'Яичница с беконом и зеленым салатом',
			items:[
			{id:7, mainItem: 3, order: 1, show: false, weight: '200', weightKind:'г', price: 55},
			],
			order: 2,
		},
		{
			id:2,
			show: false,
			title:'Coca cola',
			items:[
			{id:4,  mainItem: 2, order: 2, show: true, weight: '0.5', weightKind:'л', price: 20},
			{id:5,  mainItem: 2, order: 1, show: true, weight: '1.0', weightKind:'л', price: 45},
			{id:6,  mainItem: 2, order: 3, show: true, weight: '2.0', weightKind:'л', price: 50},
			],
			order: 3,
		},
		{
			id:4,
			show: false,
			title:'Омлет с охотничьими колбасками, сыром Моцарелла и помидорами черри',
			items:[
			{id:8, mainItem: 4, order: 1, show: true, weight: '200', weightKind:'г', price: 75},
			], 
			order: 4,
		},
		]
		menuItems.sort((a,b) => a.order - b.order)

		commit('SET_MENUITEMS', menuItems)
		commit('SET_CHOOSEDCATEGORY', 'All')
		commit('SET_SHOWSPINNER', false)
	}, 500)
	},
	async getItemsByCategory( {state, commit}, catId){
		commit('SET_SHOWSPINNER', true)
		try {
			const responce = await axios.get('/admin/getItemsByCategory', { params:{ catId: catId }})
			responce.data.sort((a,b) => a.order - b.order)
			commit('SET_MENUITEMS', responce.data)
			commit('SET_CHOOSEDCATEGORY', catId)
		} catch (e) {
			console.log('some getItemsByCategory error')
		}
		commit('SET_SHOWSPINNER', false)
	},

	async showSubItem( {commit}, subItem ){
		commit('SET_SHOWSPINNER', true)
		try {
			const responce = await axios.post('/admin/showSubItem',  {subItem: subItem })
			commit('SET_SHOWSUBITEM', subItem)
		} catch (e) {
			console.log('some showSubItem error')
		}
		commit('SET_SHOWSPINNER', false)
	},
	async showItem( {commit}, item){
		commit('SET_SHOWSPINNER', true)
		try {
			const responce = await axios.post('/admin/showItem',  {item: item })
			commit('SET_SHOWITEM', item)
		} catch (e) {
			console.log('some showItem error')
		}
		commit('SET_SHOWSPINNER', false)
	},

	async orderTop({commit}, item){
		commit('SET_SHOWSPINNER', true)
		try {
			const responce = await axios.post('/admin/itemOrderTop',  {item: item })
			console.log(responce.data)
			commit('SET_ORDERTOP', item.order)
		} catch (e) {
			console.log('some orderTop error')
		}
		commit('SET_SHOWSPINNER', false)
	},
	async orderBottom({commit}, item){
		commit('SET_SHOWSPINNER', true)
		try {
			const responce = await axios.post('/admin/itemOrderBottom',  {item: item })
			commit('SET_ORDERBOTTOM', item.order)
		} catch (e) {
			console.log('some orderBottom error')
		}
		commit('SET_SHOWSPINNER', false)
	},

	changePriceHandler({commit},event){
		commit('SET_CHANGEPRICE', event.target.value.replace(',', '.'))
	},
	async changePriceFetch({state, commit}, subItem){
		commit('SET_SHOWSPINNER', true)
		try {
			commit('SET_CHANGEPRICEFETCH', subItem)
			const responce = await axios.post('/admin/changePriceFetch',  {subItem: subItem, price: state.changePrice })
		} catch (e) {
			console.log('some changePriceHandler error')
		}

		document.querySelectorAll('.priceInput').forEach(element => {
			element.setAttribute('disabled', 'disabled')
		});
		
		document.querySelectorAll('.editPrice.d-none').forEach(el => {
			el.classList.remove('d-none')
		})
		document.querySelector('.priceInputFocus').classList.remove('priceInputFocus')
		let targetParent = document.querySelector('.priceRowFocus')
		targetParent.classList.remove('priceRowFocus')
		commit('SET_SHOWSPINNER', false)
	},
}
