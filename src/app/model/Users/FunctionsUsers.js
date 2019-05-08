const {session, driver} = require("../../../database");
module.exports = {
	//create a new user
	create: async (data) => {
		return await session
  .run('CREATE (u:User $fields) RETURN u', {fields: data})
	  .then(function (result) {
	  	let user = result.records[0].get('u');
	    return ({
	    	id: user.identity.low,
	    	...user.properties
	    })
	    session.close();
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	},

	//find user
	findOne: async (email) => {
		return await session
		  .run('MATCH (u:User {email: $email}) RETURN u', { email: email })
			  .then(function (result) {
				  	if(result.records[0]){
				  		let user = result.records[0].get('u');
					  		return ({
					    	id: user.identity.low,
					    	...user.properties
					    })
			  	}
			    return false;
			    session.close();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	},

	//find and update forgot_password
	findByIdAndUpdate: async (param, data) => {
		return await session
		  .run(`MATCH (u:User) WHERE id(u) = ${param} SET u.passwordResetToken = '${data.passwordResetToken}',
		   u.passwordResetExpired = '${data.passwordResetExpired}' RETURN u`)
			  .then(function (result) {
				  	if(result.records[0]){
				  		let user = result.records[0].get('u');
					  		return ({
					    	id: user.identity.low,
					    	...user.properties
					    })
			  	}
			    return false;
			    session.close();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	},

	updateUser: async (email, data) => {
		return await session
		  .run('MATCH (u:User {email: $email}) SET u= $fields RETURN u', {fields: data, email: email})
			  .then(function (result) {
				  	if(result.records[0]){
				  		let user = result.records[0].get('u');
					  		return ({
					    	id: user.identity.low,
					    	...user.properties
					    })
			  	}
			    return false;
			    session.close();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	},

	//find user for id
	find: async (id) => {
		return await session
		  .run('MATCH (u:User) WHERE id(u) = '+id+' RETURN u')
			  .then(function (result) {
				  	if(result.records[0]){
				  		let user = result.records[0].get('u');
					  		return ({
					    	id: user.identity.low,
					    	...user.properties
					    })
			  	}
			    return false;
			    session.close();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	},
}