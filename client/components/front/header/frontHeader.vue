<template>
      <header class="page-head section-top-15 section-lg-top-0">
        <!-- RD Navbar-->
        <div 
			class="rd-navbar-wrap rd-navbar-variant-1"
		>
          <nav class="rd-navbar rd-navbar-original " 
		  	:class="scX > 767 ? 'rd-navbar-fullwidth' : 'rd-navbar-fixed'"
		  	data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fullwidth" data-md-layout="rd-navbar-fullwidth" 
			data-lg-layout="rd-navbar-fullwidth" data-device-layout="rd-navbar-fixed" data-sm-device-layout="rd-navbar-fixed" 
			data-md-device-layout="rd-navbar-fixed" data-lg-device-layout="rd-navbar-fullwidth" data-lg-stick-up-offset="207px">



            <button 
			
				@click="activeSubMenu"
				:class="{active: subMenu}"
			data-rd-navbar-toggle=".rd-navbar-top-panel" type="submit" class="rd-navbar-collapse-toggle"><span></span></button>
			            <div 
						ref="subMenuHolder"
						class="rd-navbar-top-panel toggle-original-elements">
              <div class="rd-navbar-top-panel-inner">
                <div class="rd-navbar-address">
                  <div class="unit unit-horizontal unit-spacing-xs">
                    <div class="unit-left"><span class="icon icon-xxs mdi mdi-map-marker"></span></div>
                    <div class="unit-body"><a v-html="$t('static.address')" href="#" class="text-base"></a></div>

					<div class="unit-left">
						<a target="_blank" style="padding-left: 2em;" href="https://www.facebook.com/krabisushicafe/">
							<span class="icon icon-sm mdi mdi-facebook"></span>
						</a>
						<a target="_blank" style="padding-left: 2em;" href="https://www.instagram.com/krabicafe/">
							<span class="icon icon-sm mdi mdi-instagram"></span>
						</a>
					</div>
                  </div>
                </div>
                <div class="rd-navbar-address">
                  <div class="unit unit-horizontal unit-spacing-xs">
                    <div class="unit-left"><span class="icon icon-xxs mdi mdi-phone"></span></div>
                    <div class="unit-body">
						<a
							:href="'tel:'+$t('static.phone1full')" 
							class="text-base"
							style="display: block; margin-bottom: 5px;"
						>
							{{$t('static.phone1')}}
						</a>
						<a
							:href="'tel:'+$t('static.phone2full')" 
							class="text-base"
							
						>
							{{$t('static.phone2')}}
						</a>
					</div>
                  </div> 
                  <div class="unit unit-horizontal unit-spacing-xs">
                    <div class="unit-left"><span class="icon icon-xxs mdi mdi-clock"></span></div>
                    <div class="unit-body">
                    	<time datetime="2016">{{ $t('static.workHours') }}</time>
						<div class="localesHolder">
							<div
								@click="closeSubMenu"
							>
								<nuxt-link :to="switchLocalePath('ru')">RU</nuxt-link>
								<nuxt-link :to="switchLocalePath('ua')">UA</nuxt-link>
							</div>
						</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="rd-navbar-main-panel">
              <div class="rd-navbar-inner">
                <!-- RD Navbar Panel-->
                <div class="rd-navbar-panel">
                  <!-- RD Navbar Toggle-->
                  <button
				  	@click="activeBurger"
				  	:class="{active: isActiveBurger}"
				   data-rd-navbar-toggle=".rd-navbar-nav-wrap" type="submit" class="rd-navbar-toggle toggle-original"><span></span></button>
                  <!-- Little logo-->
						<nuxt-link 
							:to="localePath('mainPage')"
							class="little-logo"
						>
							<span
								@click="closeMenu()"
							>
								<img src="/images/logo-mini.png">
							</span>
						</nuxt-link>

				  <!-- RD Navbar Brand-->
                  <div class="rd-navbar-brand">
					
					<nuxt-link 
						:to="localePath('mainPage')"
						class="brand-name" 
					>
						<span title="Кафе Краби, кафе krabi, суши краби, sushi krabi" alt="Кафе Краби, кафе krabi, суши краби, sushi krabi" >Sushi Krabi</span>
						<span>Thai & Japanese Cafe</span>
                    	<div class="rd-navbar-address"></div>
					</nuxt-link>
					<!-- <router-link 
						:to="{ path: '/' }" 
						class="brand-name" 
					>
					</router-link> -->
					<!-- <a href="/" class="brand-name"></a> -->
					</div>
                </div>
              </div>
              <div class="rd-navbar-nav-inner justify-around display-flex align-center">
                <div 
					ref="menuHolder"
				class="rd-navbar-nav-wrap">
                  <!-- RD Navbar Nav-->
					<ul class="rd-navbar-nav">
						
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
								:to="localePath('kontseptsiya')"
							>
								{{ $t('navigation.concept') }}
							</nuxt-link>
						</li>
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
								:to="localePath('delivery')"
							>
								{{ $t('navigation.delivery') }}
							</nuxt-link>
						</li>
						<li 
							@click="closeMenu()"
						>
							<nuxt-link
								:to="localePath('news')"
							>
								{{ $t('navigation.news') }}
							</nuxt-link>
						</li>
						<li 
							@click="closeMenu()"
						>
							<nuxt-link
								:to="localePath('sale')"
							>
								{{ $t('navigation.sale') }}
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
						<li 
							@click="closeMenu()"
						>
							<nuxt-link
								:to="localePath('contacts')"
							>
								{{ $t('navigation.contacts') }}
							</nuxt-link>
						</li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>


</template>

<script>

import frontLocales from '@/components/front/header/frontLocales.vue'


export default {
  	components: {
		frontLocales,
	},
	mounted(){
		this.getWidth()
		window.addEventListener('resize', this.adaptiveHandler);
		
	},
	data(){
		return{
        	scX: '',
			isActiveBurger: false,
			subMenu: false,
		}
	},
	methods:{
		getWidth(){
			this.scX = window.innerWidth
		},
		adaptiveHandler: function (){
			this.scX = window.innerWidth;
		},
		activeBurger: function() {
			this.isActiveBurger = !this.isActiveBurger;
			this.$refs.menuHolder.classList.toggle('active')
		},
		activeSubMenu: function() {
			this.subMenu = !this.subMenu;
			this.$refs.subMenuHolder.classList.toggle('active')
		},
		closeMenu(){
			this.$refs.menuHolder.classList.remove('active')
			this.isActiveBurger = false
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
</style>