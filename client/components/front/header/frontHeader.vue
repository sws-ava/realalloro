<template>
	<header id="header-1" 
		ref="headerBlock"
		class="header navik-header header-shadow center-menu-1 header-transparent viewport-lg"
		:class="scrollPosition > 200 
			? ' sticky' 
			: ' header-transparent-on'"
		>
			<div class="container">


				<!-- NAVIGATION MENU -->
				<div class="navik-header-container">
					
					<header-contacts />


					<!-- CALL BUTTON -->
				    <div class="callusbtn">
						<a 
							:href="'tel:'+$t('static.phone1full')"
						>
							<i class="fas fa-phone"></i>
						</a>
					</div>

					
					<!-- LOGO IMAGE -->
	                <div class="logo">
						<nuxt-link 
							:to="localePath('mainPage')"
						>
							<span
								@click="closeMenu()"
							>
								<img src="/logo.png" alt="header-logo"/>
							</span>
						</nuxt-link>
					</div>

					
					<!-- BURGER MENU -->
					<div 
						@click="activeBurger"
						class="burger-menu"
						ref="mobileMenu"
					>
						<div class="line-menu line-half first-line"></div>
						<div class="line-menu"></div>
						<div class="line-menu line-half last-line"></div>
					</div>


					<!-- MAIN MENU -->
	                <nav class="navik-menu menu-caret navik-yellow">
	                	<ul class="top-list">
							<li 
								@click="closeMenu()"
							>
								<nuxt-link
									:to="localePath('interior')"
								>
									{{ $t('navigation.interior') }}
								</nuxt-link>
							</li>
							<li 
								@click="closeMenu()"
							>
								<nuxt-link
									:to="localePath('gallery')"
								>
									{{ $t('navigation.gallery') }}
								</nuxt-link>
							</li>
						</ul>
						<div class="logoCenter" style="width: 151.453px;">
							<div 
							:class="scrollPosition > 200 
								? 'logo' 
								: 'logo bgWhite'"
							>
								<nuxt-link 
									:to="localePath('mainPage')"
								>
									<img src="/logo.png" alt="header-logo">
								</nuxt-link>
							</div>
						</div>
						<ul>
							<li 
								@click="closeMenu()"
							>
								<nuxt-link
									:to="localePath('menu')"
								>
									{{ $t('navigation.menu') }}
								</nuxt-link>
							</li>
							<li 
								@click="closeMenu()"
							>
								<nuxt-link
									:to="localePath('contacts')"
								>
									{{ $t('navigation.contacts') }}
								</nuxt-link>
							</li>
							<li class="mobile-locales" @click="closeMenu()">
								<nuxt-link :to="switchLocalePath('ru')">RU</nuxt-link>
								<nuxt-link :to="switchLocalePath('ua')">UA</nuxt-link>
							</li>

							<!-- BASKET ICON -->
							<!-- <li class="basket-ico ico-30">
					        	<a href="cart.html">
					        		<span class="ico-holder"><span class="flaticon-shopping-bag"></span> <em class="roundpoint">2</em></span>
					        	</a>
					        </li> -->

	                    </ul>
	                </nav>	<!-- END MAIN MENU -->


				</div>	<!-- END NAVIGATION MENU -->


			</div>     <!-- End container -->
		</header>	<!-- END HEADER-1 -->




</template>

<script>

import headerContacts from '@/components/front/header/headerContacts.vue';
import frontLocales from '@/components/front/header/frontLocales.vue'


export default {
  	components: {
    	headerContacts,
		frontLocales
	},
	mounted(){
		this.getWidth()
		window.addEventListener('resize', this.adaptiveHandler);
		window.addEventListener('scroll', this.updateScroll);
		
	},
	data(){
		return{
        	scX: '',
			isActiveBurger: false,
			subMenu: false,
			scrollPosition: null
		}
	},
	methods:{
		updateScroll() {
			this.scrollPosition = window.scrollY
		},
		getWidth(){
			this.scX = window.innerWidth
		},
		adaptiveHandler: function (){
			this.scX = window.innerWidth;
		},
		activeBurger() {
			this.isActiveBurger = !this.isActiveBurger;
			this.$refs.headerBlock.classList.toggle('active')
			this.$refs.mobileMenu.classList.toggle('menu-open')
			let body = document.getElementsByTagName('body')[0]
			body.classList.toggle('overfolowHidden')

		},
		activeSubMenu: function() {
			this.subMenu = !this.subMenu;
			this.$refs.subMenuHolder.classList.toggle('active')
		},
		closeMenu(){
			this.$refs.headerBlock.classList.remove('active')
			this.isActiveBurger = false
			this.$refs.mobileMenu.classList.remove('menu-open')
			let body = document.getElementsByTagName('body')[0]
			body.classList.remove('overfolowHidden')
		},
		closeSubMenu(){
			this.$refs.subMenuHolder.classList.remove('active')
			this.subMenu = !this.subMenu;
		},

	}

}

</script>

<style lang="scss" scoped>
.localesHolder {
	margin-top: 10px; 
	text-align: revert; 
	display: flex; 
	justify-content: flex-end; 
	gap: 6px;
	a + a {
		margin-left: 30px;
	}
}
.active nav ul {
	display: block!important;
}
.mobile-locales{
	display: none;
    justify-content: center;
    margin-top: 30px;
	@media (max-width: 1200px){
		display: flex;
	}
	a + a{
		margin-left: 50px;
	}
}
.logo.bgWhite {
	a{
		display: block;
		background: #fff;
		border-radius: 50%;
		padding: 10px;
		margin-top: -13px;
	}
}
</style>