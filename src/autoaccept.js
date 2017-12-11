/**
 * Handler for filtering invites
 * @callback inviteHandler
 * @param {string} roomId the room ID the event is for
 * @param {string} userId the user ID that invited the client
 * @param {MatrixEvent} event the event that triggered this handler
 * @returns {Promise<boolean>|boolean} returns a boolean (or a promise of a boolean) indicating if the invite should be accepted or not
 */

/**
 * Auto accepts invites for a matrix client
 * @param {MatrixClient} client the matrix client to accept invites for
 * @param {inviteHandler} [fn] optional handler for filtering invites
 */
module.exports = (client, fn) => {
    client.on('event', event => {
        if (event.getType() !== "m.room.member") return;
        if (event.getStateKey() !== client.credentials.userId) return;
        if (event.getContent().membership !== "invite") return;

        let allow = true;
        if (fn) {
            allow = fn(event.getRoomId(), event.getSender(), event);
        }

        if (!allow.then) allow = Promise.resolve(allow);
        allow.then(doAllow => doAllow ? client.joinRoom(event.getRoomId()) : null);
    });
};