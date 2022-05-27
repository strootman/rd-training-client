const { query } = require('@simpleview/sv-graphql-client')

class People {

	constructor ({ graphUrl, graphServer }) {
		this._graphUrl = graphUrl
		this._graphServer = graphServer
	}

	async find ({ fields, headers, context, filter }) {
		return await query({
			url: this._graphUrl,
			query: `query FindPeople($filter: training_people_find_input) {
				training {
					training_people_find(filter: $filter) {
						${fields}
					}
				}
			}`,
			headers,
			variables: { filter },
			clean: true,
			key: 'training.training_people_find'
		})
	}

	async insert ({ fields, headers, context, input }) {
		return await query({
			url: this._graphUrl,
			query: `mutation InsertPeople($input: [training_people_insert_input!]!) {
				training {
					training_people_insert(input: $input) {
						${fields}
					}
				}
			}`,
			headers,
			variables: { input },
			clean: true,
			key: 'training.training_people_insert'
		})
	}

	async remove ({ fields, headers, context, filter }) {
		return query({
			url: this._graphUrl,
			query: `mutation RemovePeople($filter: training_people_remove_input) {
				training {
					training_people_remove(filter: $filter) {
						${fields}
					}
				}
			}`,
			headers,
			variables: { filter },
			clean: true,
			key: 'training.training_people_remove'
		})
	}
}


module.exports = People
