export const products = {
	state: [],
	reducers: {
		setProducts: (s, p) => s = p
	}
}

export const cart = {
	state: JSON.parse(localStorage.getItem('cart')) || [],
	reducers: {
		addToCart: (s, p) => {
			const i = exists(s, p)

			if (i !== -1)
				return s.map(item => {
					if(item.id === p.id) {
						const pU = s[i].quantity += 1
						return { ...item, pU }
					}
					return item
				})
			else {
				p.quantity = 1
				return s.concat([p])
			}
		},
		removeToCart: (s, p) => {
			const i = exists(s, p)

			if (i !== -1)
				return s.map(item => {
					if(item.id === p.id) {
						const subtraction = s[i].quantity - 1
						const pU = (subtraction < 0) ? 0 : s[i].quantity -= 1

						return { ...item, pU }
					}
					return item
				})
			else {
				return s.filter((el) => el.id !== p.id)
			}
		},
		deleteToCart: (s, p) => s.filter((el) => el.id !== p.id)
	}
}

function exists(a, o) {
	for (let i = 0; i < a.length; i++) {
		if (a[i].id === o.id) return i
	}
	return -1
}
