<template>
	<footer id="footer-4" class="footer division">
		<div class="container grey-color">
			<div class="row">
				<div class="col-xl-2">
					<div class="footer-info">
						<div class="footer-logo">
							<nuxt-link 
								:to="localePath('mainPage')"
								class="footer-logo"
							>
								<span
									
								>
									<img class="footer-logo" src="/logo.png" alt="footer-logo"/>
								</span>
							</nuxt-link>
						</div>
						<p></p>
					</div>	
				</div>
				<div class="col-md-6 col-lg-4 col-xl-4">
					<div class="footer-contacts text-center mb-40">
						<h5 class="h5-sm">
							{{$t('static.addressName')}}
						</h5>
						<p v-html="$t('static.address')"></p>
						<p>
							<span class="yellow-color">
								<a 
									class="d-block mt-15 phone"
									:href="'tel:'+$t('static.phone1full')"
								>
									{{$t('static.phone1')}}
								</a>
							</span>
						</p>
					</div>
				</div>
				<div class="col-md-6 col-lg-4 col-xl-3">
					<div class="footer-info text-center mb-30">
						<h5 class="h5-sm">{{ $t('static.workHoursTitle') }}</h5>
						<p>{{ $t('static.waitForYou') }}</p> 
						<p class="mt-15">
							{{ $t('static.shortDays') }}: {{ $t('static.workHours') }}
						</p>
					</div>
				</div>
				<div class="col-md-12 col-lg-4 col-xl-3">
					<div class="footer-img text-center mb-40">
						<h5 class="h5-sm">Instagram</h5>
						<ul class="text-center clearfix">
							<li><p><a target="_blank" href="https://www.instagram.com/alloro_eat_love/"><i class="fab fa-instagram"></i></a></p></li></ul>	
					</div>
				</div>
			</div>
			<div class="bottom-footer">
				<div class="row d-flex align-items-center">
					<div class="col-12">
						<div class="footer-copyright text-center text-lg-left">
							<p>&copy; Alloro - Eat & Love 2022 - {{ currentYear }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>										
	</footer>
</template>

<script>



export default {
  	components: {
	},
	data(){
		return{
			currentYear: new Date().getFullYear(),
		}
	},
	methods:{
		closeMenu(){
			this.$refs.menuHolder.classList.remove('active')
			this.isActiveBurger = false
		},

	}
}

</script>

<style lang="scss" scoped>
.footer{
	.fa-instagram{
		font-size: 40px;
		transition: all 0.25s ease-in-out;
		&:hover{
			scale: 1.1;
			transition: all 0.25s ease-in-out;
		}
	}
	.phone,
	.footer-logo{
		transition: all 0.25s ease-in-out;
		margin-bottom: 0!important;
		margin: 0 auto;
		display: block;
		text-align: center;
		@media (max-width: 1200px){
			margin-bottom: 15px!important;
		}
		&:hover{
			scale: 1.05;
			transition: all 0.25s ease-in-out;
		}
		img {
			max-height: 135px;
		}
	}
}
</style>