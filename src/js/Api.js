export default class Api {
    constructor(baseUrl, groupId, token) {
        this._baseUrl = `${baseUrl}/${groupId}`;
        this._headers = {
            Authorization: token,
            'Content-Type': 'application/json'
        };
    }

    async _query(path, method, body) {
        try {

            const res = await fetch(`${this._baseUrl}/${path}`, { method, headers: this._headers , body: JSON.stringify(body)});
            if (!res.ok) {
                await Promise.reject(res.status);
            }

            return await res.json();
        } catch(error) {
            console.log(`Произошла ошибка обращения к серверу`, error);
            return undefined;
        }
    }

    async getCards(cb) {
        const cards = await this._query(`cards`, 'GET');
        if (cb) cb(cards);
        return cards;
    }

    async postCard(data, cb) {
        const rData = await this._query(`cards`, 'POST', data);
        if (cb) cb(rData);
        return rData;
    }

    async deleteCard(id, cb) {
        const rData = await this._query(`cards/${id}`, 'DELETE');
        if (cb) cb(rData);
        return rData;
    }

    async getMe(cb) {
        const rData = await this._query(`users/me`, 'GET');
        if (cb) cb(rData);
        return rData;
    }

    async patchMe(data, cb) {
        const rData = await this._query(`users/me`, 'PATCH', data);
        if (cb) cb(rData);
        return rData;
    }

    async patchMeAvatar(data, cb) {
        const rData = await this._query(`users/me/avatar`, 'PATCH', data);
        if (cb) cb(rData);
        return rData;
    }

    async putCardLike(id, cb) {
        const rData = await this._query(`cards/like/${id}`, 'PUT');
        if (cb) cb(rData);
        return rData;
    }

    async deleteCardLike(id, cb) {
        const rData = await this._query(`cards/like/${id}`, 'DELETE');
        if (cb) cb(rData);
        return rData;
    }
}