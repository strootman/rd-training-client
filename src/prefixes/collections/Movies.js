const { query } = require('@simpleview/sv-graphql-client')

class Movies {

	constructor ({ graphUrl, graphServer }) {
		this._graphUrl = graphUrl
		this._graphServer = graphServer
	}

	async find ({ fields, headers, context, filter }) {
		return await query({
			url: this._graphUrl,
			query: `query FindMovies($filter: training_movies_find_input) {
				training {
					training_movies_find(filter: $filter) {
						${fields}
					}
				}
			}`,
			headers,
			variables: { filter },
			clean: true,
			key: 'training.training_movies_find'
		})
	}

	async insert ({ fields, headers, context, input }) {
		return await query({
			url: this._graphUrl,
			query: `mutation InsertMovies($input: [training_movies_insert_input!]!) {
				training {
					training_movies_insert(input: $input) {
						${fields}
					}
				}
			}`,
			headers,
			variables: { input },
			clean: true,
			key: 'training.training_movies_insert'
		})
	}

	async remove ({ fields, headers, context, filter }) {
		return await query({
			url: this._graphUrl,
			query: `mutation RemoveMovies($filter: training_movies_remove_input) {
				training {
					training_movies_remove(filter: $filter) {
						${fields}
					}
				}
			}`,
			headers,
			variables: { filter },
			clean: true,
			key: 'training.training_movies_remove'
		})
	}
}

module.exports = Movies
