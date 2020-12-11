
import Router from 'koa-router'

const router = new Router({ prefix: '/performance' })
import Performances from '../modules/performances.js'
import Cart from '../modules/cart.js'
const dbName = 'website.db'


// async function checkAuth(ctx, next) {
//     console.log('secure router middleware')
//     console.log(ctx.hbs)
//     if (ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
//     await next()
// }

// router.use(checkAuth);

router.get('/:id', async ctx => {
    const performanceModel = await new Performances(dbName)
    const cart = await new Cart(dbName)
    try {

        let performanceId = parseInt(ctx.request.params.id);
        let cartCount = 0
        if (ctx.session && ctx.session.userData && ctx.session.userData.id) {
            cartCount = await cart.getCartAgainstUser(ctx.session.userData.id)
            ctx.hbs.userDetail = ctx.session.userData;

        }
        ctx.hbs.cartCount = cartCount;
        let perforamceDetails = await performanceModel.getPerformancesById(performanceId)
        let perforamceDetailsBySingle = await performanceModel.getAllPerformancesBySinglePerformanceId(performanceId)
        let newArr = [];
        perforamceDetailsBySingle.forEach(element => {
            if (ctx.session && ctx.session.userData && ctx.session.userData.id) {
                element.user_id = ctx.session.userData.id;
            } else {
                element.user_id = null;
            }
            // element.user_id = ctx.session.userData.id || null;
            newArr.push(element);
        });
        ctx.hbs.performanceDetail = perforamceDetails;
        ctx.hbs.performanceDetailBySingle = newArr;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', ctx.hbs)
        await ctx.render('performance_detail', ctx.hbs)
    } catch (err) {
        ctx.hbs.error = err.message
        await ctx.render('error', ctx.hbs)
    }
})

export default router
