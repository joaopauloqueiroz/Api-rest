const {session, driver} = require("../../../database")

module.exports = {
	create: async (data) => {
		return await session
  .run('CREATE (p:Product $fields) RETURN p', {fields: data})
	  .then(function (result) {
	  	let product = result.records[0].get('p');
	    return ({
	    	id: product.identity.low,
	    	...product.properties
	    })
	    session.close();
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
		return product;
	},

	findOne: async (name) => {
		return await session
		  .run('MATCH (p:Product {name: $field}) RETURN p', { field: name })
			  .then(function (result) {
				  	if(result.records[0]){
				  		let product = result.records[0].get('p');
					  		return ({
					    	id: product.identity.low,
					    	...product.properties
					    })
			  	}
			    return false;
			    session.close();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	},

	find: async (id) => {
		return await session
		  .run('MATCH (p:Product) WHERE id(p) = '+id+' RETURN p')
			  .then(function (result) {
				  	if(result.records[0]){
				  		let product = result.records[0].get('p');
					  		return ({
					    	id: product.identity.low,
					    	...product.properties
					    })
			  	}
			    return false;
			    session.close();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	},

	findAll: async () => {
		return await session
		  .run('MATCH (p:Product) RETURN p')
			  .then(function (result) {
				  	let Product = []
				  	let Products = [];
				  	if(result.records[0]){
				  		for (var i = 0; i < result.records.length; i++) {
				  			Product.push(result.records[i].get('p'))
				  		}
				  		
				  		for (var i = 0; i < Product.length; i++) {
				  			Products.push({
						    	id: Product[i].identity.low,
						    	...Product[i].properties
					    	})
				  		}
					return (Products)
			  	}
			    session.close();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	},

	updateProd: async (id, data) => {
		return await session
		  .run(`MATCH (p:Product) WHERE id(p) = ${id} SET p = $fields RETURN p`, {fields: data})
			  .then(function (result) {
				  	if(result.records[0]){
				  		let product = result.records[0].get('p');
					  		return ({
					    	id: product.identity.low,
					    	...product.properties
					    })
			  	}
			return false;
			session.close();
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}, 

	deleteProd: async (id) => {
		return await session
		  .run(`MATCH (p:Product) WHERE id(p) = ${id} DETACH DELETE p`)
			  .then(function (result) {
					return true;
			session.close();
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
}