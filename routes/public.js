
//import { parse } from 'handlebars'
import Router from 'koa-router'

const router = new Router()

import Accounts from '../modules/accounts.js'
import Cart from '../modules/cart.js'
import Performances from '../modules/performances.js'

const dbName = 'website.db'

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
	const performanceModel = await new Performances(dbName)
	try {
		let perforamces = await performanceModel.getPerformancesListing();
		let productionPlans = await performanceModel.getProductionPlansListing();
		ctx.hbs.allPerformances = perforamces
		ctx.hbs.productionPlans = productionPlans
		console.log('< =========== All Performances ===============>', ctx.hbs);
		await ctx.render('index', ctx.hbs)
		// adding new route for production plans view
		//await ctx.render('production_plans', ctx.hbs)
	} catch (err) {
		await ctx.render('error', ctx.hbs)
	}
})


/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('register'))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', async ctx => {
	const account = await new Accounts(dbName)
	try {
		// call the functions in the module
		await account.register(ctx.request.body.user, ctx.request.body.pass, ctx.request.body.email)
		ctx.redirect(`/login?msg=new user "${ctx.request.body.user}" added, you need to log in`)
	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('register', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/login', async ctx => {
	console.log(ctx.hbs)
	await ctx.render('login', ctx.hbs)
})



router.post('/add_to_cart', async ctx => {
	const cart = await new Cart(dbName)
	const performanceModel = await new Performances(dbName)
	try {
		console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaae222222222222222222222222222222', ctx.request.body)
		let cartCount = await cart.getCartAgainstUser(ctx.request.body.user_id, ctx.request.body.performance_id, ctx.request.body.performance_sub_id)
		if (parseInt(cartCount) === 0) {
			let cartCount = await cart.addPerformanceToCart(ctx.request.body.user_id, ctx.request.body.performance_id, ctx.request.body.performance_sub_id, ctx.request.body.cost_selected)
			let perforamces = await performanceModel.getPerformancesListing()
			ctx.hbs.allPerformances = perforamces
			await ctx.render('index', ctx.hbs)
		} else {
			let perforamces = await performanceModel.getPerformancesListing();
			let productionPlans = await performanceModel.getProductionPlansListing();
			ctx.hbs.allPerformances = perforamces
			ctx.hbs.productionPlans = productionPlans
			console.log('< =========== All Performances ===============>', ctx.hbs);
			await ctx.render('index', ctx.hbs)
		}


	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('/', ctx.hbs)
	} finally {
		await cart.close()
	}

})

router.get('/cart_listing', async ctx => {

	const cart = await new Cart(dbName)
	const performanceModel = await new Performances(dbName)
	try {
		let cartList = await cart.cartListing(ctx.session.userData.id)
		console.log('<============== Cart Listing ==================>', cartList)
		ctx.hbs.allCarts = cartList
		await ctx.render('cart_listing', ctx.hbs)


	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('/', ctx.hbs)
	} finally {
		await cart.close()
	}

})

router.get('/delete_cart/:cart_id', async ctx => {
	const cart = await new Cart(dbName)
	try {
		let cartId = parseInt(ctx.request.params.cart_id);
		await cart.deleteCart(ctx.session.userData.id, cartId)
		let cartList = await cart.cartListing(ctx.session.userData.id)
		ctx.hbs.allCarts = cartList
		await ctx.render('cart_listing', ctx.hbs)
	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('/', ctx.hbs)
	} finally {
		await cart.close()
	}
})

router.get('/clear_all_cart', async ctx => {
	const cart = await new Cart(dbName)
	try {

		await cart.deleteCart(ctx.session.userData.id)
		await ctx.render('cart_listing', ctx.hbs)
	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('/', ctx.hbs)
	} finally {
		await cart.close()
	}
})





router.post('/login', async ctx => {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {

		const body = ctx.request.body;
		console.log('<=============== body =============> ', body.user)
		console.log('<=============== body =============> ', body.password)

		let authenticateUser = await account.login(body.user, body.pass)
		ctx.session.authorised = true
		ctx.session.userData = authenticateUser
		const referrer = body.referrer || '/'
		return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.session.userData = null
	ctx.redirect('/?msg=you are now logged out')
})

export default router
