
import test from 'ava'
import Accounts from '../modules/accounts.js'
import Performances from '../modules/performances.js'
import Cart from '../modules/cart.js'

test('REGISTER : register and log in with a valid account', async test => {
	test.plan(1)
	const account = await new Accounts() // no database specified so runs in-memory
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		const login = await account.login('doej', 'password')
		test.is(login, true, 'unable to log in')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		account.close()
	}
})

test('REGISTER : register a duplicate username', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.register('doej', 'password', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message, 'username "doej" already in use', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if blank username', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('', 'password', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message, 'missing field', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if blank password', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', '', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message, 'missing field', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if blank email', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', '')
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message, 'missing field', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if duplicate email', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.register('bloggsj', 'newpassword', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message, 'email address "doej@gmail.com" is already in use', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('LOGIN    : invalid username', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.login('roej', 'password')
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message, 'username "roej" not found', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('LOGIN    : invalid password', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.login('doej', 'bad')
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message, 'invalid password for account "doej"', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('GET PERFORMANCE LISTING    : No Auth Required', async test => {
	test.plan(1)
	const performanceModel = await new Performances('website.db')
	try {
		await performanceModel.getPerformancesListing();
		test.fail('no error thrown')
	} catch (err) {
		test.is(err.message.toString())
	} finally {
		performanceModel.close()
	}
})

test('GET PERFORMANCE DETAIL    : No Auth Required', async test => {
	test.plan(1)
	const performanceModel = await new Performances('website.db')
	try {
		await performanceModel.getPerformancesById(4);
		await performanceModel.getPerformancesById(89);
		test.fail('no error thrown')
	} catch (err) {
		test.is(err.message.toString())
	} finally {
		performanceModel.close()
	}
})

test('ADD PERFORMANCE TO CART    : No Auth Required', async test => {
	test.plan(1)
	const CartModel = await new Cart('website.db')
	try {
		await CartModel.addPerformanceToCart(4, 5, 6, 48);
		test.fail('no error thrown')
	} catch (err) {
		test.is(err.message.toString())
	} finally {
		CartModel.close()
	}
})

test('GET ALL CART AGAINST USER   : No Auth Required', async test => {
	test.plan(1)
	const CartModel = await new Cart('website.db')
	try {
		await CartModel.getCartAgainstUser(4);
		test.fail('no error thrown')
	} catch (err) {
		test.is(err.message.toString())
	} finally {
		CartModel.close()
	}
})

test('DELETE SPECIFIC CART   : No Auth Required', async test => {
	test.plan(1)
	const CartModel = await new Cart('website.db')
	try {
		await CartModel.deleteCart(4, 5);
		test.fail('no error thrown')
	} catch (err) {
		test.is(err.message.toString())
	} finally {
		CartModel.close()
	}
})

test('GET PRODUCTION PLANS   : No Auth Required', async test => {
	test.plan(1)
	const performanceModel = await new Performances('website.db')
	try {
		await performanceModel.getProductionPlansListing();
		test.fail('no error thrown')
	} catch (err) {
		test.is(err.message.toString())
	} finally {
		performanceModel.close()
	}
})
