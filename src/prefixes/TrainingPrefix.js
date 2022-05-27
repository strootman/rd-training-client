const Movies = require('./collections/Movies')
const People = require('./collections/People')
const { query } = require('@simpleview/sv-graphql-client')

const defaultFields = `
	success
	message
`

class TrainingPrefix {

	constructor({ graphUrl, graphServer }) {
		this.name = 'training'
		this._graphUrl = graphUrl
		this._graphServer = graphServer

		this.people = new People({ graphUrl, graphServer })
		this.movies = new Movies({ graphUrl, graphServer })
	}

	// for testing
	async clearDB({ fields = defaultFields, headers, context, input } = {}) {
		return await query({
			url: this._graphUrl,
			query: `mutation training_test_clear_db {
				training {
					training_test_clear_db {
						${fields}
					}
				}
			}`,
			headers,
			clean: true,
			key: 'training.training_test_clear_db'
		})
	}

	// for testing
	async setup({ fields = defaultFields, headers, context, input } = {}) {
		return await query({
			url: this._graphUrl,
			query: `mutation training_test_setup {
				training {
					training_test_setup {
						${fields}
					}
				}
			}`,
			headers,
			clean: true,
			key: 'training.training_test_setup'
		})
	}
}

module.exports = TrainingPrefix
