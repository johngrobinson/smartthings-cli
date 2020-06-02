import { LocationItem } from '@smartthings/core-sdk'

import { SelectingInputAPICommand } from '@smartthings/cli-lib'


export default class LocationsDeleteCommand extends SelectingInputAPICommand<LocationItem> {
	static description = 'delete a location'

	static flags = SelectingInputAPICommand.flags

	static args = [{
		name: 'id',
		description: 'location UUID or number in the list',
	}]

	primaryKeyName = 'locationId'
	sortKeyName = 'name'

	async run(): Promise<void> {
		const { args, argv, flags } = this.parse(LocationsDeleteCommand)
		await super.setup(args, argv, flags)

		this.processNormally(args.id,
			async () => await this.client.locations.list(),
			async (id) => { await this.client.locations.delete(id) },
			'location {{id}} deleted')
	}
}
