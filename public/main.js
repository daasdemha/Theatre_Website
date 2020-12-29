
/* main.js */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')
    const delay = 3000
    document.querySelector('aside').hidden = false
    window.setTimeout(()=>{
      document.querySelector('aside').hidden = true
    }, delay)
})
