import { Get, Controller, Render, Session, Req, Query, Param, Res } from '@nestjs/common';
import { CategoryService } from 'category/category.service';
import { UserService } from 'user/user.service';
import { ProductService } from 'product/product.service';
import { CartService } from 'cart/cart.service';

@Controller()
export class AppController {
	constructor(private readonly categoryService: CategoryService,
		private readonly productService: ProductService,
		private readonly cartService: CartService,
		private readonly userService: UserService) { }
	
	@Get('user/login')
	@Render('login')
	async loginRender(@Session() session, @Req() req) {
		const res = {}
		const categories = await this.categoryService.all()
		const slider = await this.productService.getLast(3)
		res['categories'] = categories
		res['slider'] = slider
		res['user'] = {}
		res['latest'] = {}
		if (req.query && req.query.latest) {
			res['latest'] = await this.productService.getLastOfCat(3, req.query.latest)
		} else {
			res['latest'] = await this.productService.getLastOfCat(6, 1)
		}
		if (session.user) {
			const user = await this.userService.findById(session.user.id)
			res['user'] = user
			res['cart'] = await this.cartService.findActiveCarts(session.user.id)
			if (res['cart'])
				res['cartItems'] = await this.cartService.getCartItems(res['cart'].id)
			else 
				res['cartItems'] = []
		}
		return res;
	}	
	@Get('order')
	@Render('order')
	async orderRender(@Session() session, @Req() req) {
		const res = {}
		const categories = await this.categoryService.all()
		const slider = await this.productService.getLast(3)
		res['categories'] = categories
		res['slider'] = slider
		res['user'] = {}
		res['latest'] = {}
		if (req.query && req.query.latest) {
			res['latest'] = await this.productService.getLastOfCat(3, req.query.latest)
		} else {
			res['latest'] = await this.productService.getLastOfCat(6, 1)
		}
		if (session.user) {
			const user = await this.userService.findById(session.user.id)
			res['user'] = user
			res['cart'] = await this.cartService.findActiveCarts(session.user.id)
			if (res['cart'])
				res['cartItems'] = await this.cartService.getCartItems(res['cart'].id)
			else 
				res['cartItems'] = []
		}
		return res;
	}	

	

	@Get('cart/deleteitem/:id')
	async deleteItem(@Res() res, @Session() session, @Req() req, @Param() params) {
		await this.cartService.deleteFromCart(params.id, session.user.id)
		const cart = await this.cartService.createCart(session.user.id)
		await this.cartService.computeCartAmount(cart.id)
		res.redirect("/")
	}	
	
	@Get()
	@Render('index')
	async root(@Session() session, @Req() req) {
		
		const res = {}
		const categories = await this.categoryService.all()
		const slider = await this.productService.getLast(3)
		res['categories'] = categories
		res['slider'] = slider
		res['user'] = {}
		res['latest'] = {}
		if (req.query && req.query.latest) {
			res['latest'] = await this.productService.getLastOfCat(3, req.query.latest)
		} else {
			res['latest'] = await this.productService.getLastOfCat(6, 1)
		}
		if (session.user) {
			const user = await this.userService.findById(session.user.id)
			res['user'] = user
			res['cart'] = await this.cartService.findActiveCarts(session.user.id)
			if (res['cart'])
				res['cartItems'] = await this.cartService.getCartItems(res['cart'].id)
			else 
				res['cartItems'] = []
		}
		return res;
	}

	@Get('wishlist')
	@Render('wishlist')
	async wishlist(@Session() session, @Req() req) {
		const res = {}
		const categories = await this.categoryService.all()
		const lastProducts = await this.productService.getLast(3)
		res['lastProducts'] = lastProducts
		res['categories'] = categories
		res['user'] = {}
		if (session.user) {
			const user = await this.userService.findById(session.user.id)
			res['user'] = user
			res['cart'] = await this.cartService.findActiveCarts(session.user.id)
			res['wishlist'] = await this.productService.getWishList(session.user.id)
			if (res['cart'])
				res['cartItems'] = await this.cartService.getCartItems(res['cart'].id)
			else 
				res['cartItems'] = []
		}
		return res;
	}

	@Get('search')
	@Render('search')
	async search(@Session() session, @Req() req, @Query() query) {
		const res = {}
		const categories = await this.categoryService.all()
		const lastProducts = await this.productService.getLast(3)
		res['lastProducts'] = lastProducts
		res['categories'] = categories
		res['user'] = {}
		res['found'] = await this.productService.searchByName(query.key)
		res['foundname'] = query.key
		if (session.user) {
			const user = await this.userService.findById(session.user.id)
			res['user'] = user
			res['cart'] = await this.cartService.findActiveCarts(session.user.id)
			res['wishlist'] = await this.productService.getWishList(session.user.id)
			if (res['cart'])
				res['cartItems'] = await this.cartService.getCartItems(res['cart'].id)
			else 
				res['cartItems'] = []
		}
		return res;
	}

	@Get('category/:id')
	@Render('search')
	async category(@Session() session, @Req() req, @Param() params) {
		const res = {}
		const categories = await this.categoryService.all()
		const lastProducts = await this.productService.getLast(3)
		res['lastProducts'] = lastProducts
		res['categories'] = categories
		res['found'] = await this.productService.findByCategory(params.id)
		res['foundname'] = (await this.categoryService.findById(params.id)).name
		res['user'] = {}
		if (session.user) {
			const user = await this.userService.findById(session.user.id)
			res['user'] = user
			res['cart'] = await this.cartService.findActiveCarts(session.user.id)
			res['wishlist'] = await this.productService.getWishList(session.user.id)
			if (res['cart'])
				res['cartItems'] = await this.cartService.getCartItems(res['cart'].id)
			else 
				res['cartItems'] = []
		}
		return res;
	}
	@Get('product/:id')
	@Render('detail')
	async detail(@Session() session, @Req() req, @Param() params) {
		const res = {}
		const lastProducts = await this.productService.getLast(3)
		res['lastProducts'] = lastProducts
		res['product'] = await this.productService.findById(params.id)
		res['categories'] = await this.productService.findByCategory(res['product'].category.id)
		
		res['user'] = {}
		if (session.user) {
			const user = await this.userService.findById(session.user.id)
			res['user'] = user
			res['cart'] = await this.cartService.findActiveCarts(session.user.id)
			res['wishlist'] = await this.productService.getWishList(session.user.id)
			if (res['cart'])
				res['cartItems'] = await this.cartService.getCartItems(res['cart'].id)
			else 
				res['cartItems'] = []
		}
		return res;
	}
}
